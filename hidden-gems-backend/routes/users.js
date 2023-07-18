const router = require("express").Router();
let User = require("../models/users.model");
const bcrypt = require("bcrypt");

router.route("/active-users").get((req, res) => {
    User.find({ isAdmin: false, isOnline: true }) // add isOnline true filter
        .populate({
            path: "treasureList",
            match: { status: "claimed" },
        })
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/top-hunters").get((req, res) => {
    User.find({ treasureList: { $exists: true }, isAdmin: false })
        .populate({
            path: "treasureList",
            match: { status: "claimed" },
        })
        .sort({ "treasureList.length": -1 })
        .limit(10)
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
});

router.route("/sign-up").post((req, res) => {
    const { userName, email, password, gender, isAdmin, isOnline, location } =
        req.body;

    if (!userName || !email || !password || !gender) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const saltRounds = 10; // Number of salt rounds for bcrypt to use

    const newUser = new User({
        userName,
        email,
        password: bcrypt.hashSync(password, saltRounds), // Encrypt the password
        gender,
        isAdmin,
        isOnline,
        location,
    });

    newUser
        .save()
        .then(() => res.json({ message: "User added successfully!" }))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    User.findOne({ userName })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare password with hashed password using bcrypt
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }
                if (!result) {
                    return res
                        .status(401)
                        .json({ message: "Invalid credentials" });
                }

                user.isOnline = true;
                user.save();

                res.json(user);
            });
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update-profile/:id").put((req, res) => {
    const { id } = req.params;
    const { userName, password, email, firstName, lastName, gender } = req.body;

    const updateUser = {};

    if (userName) {
        updateUser.userName = userName;
    }

    if (password) {
        updateUser.password = password;
    }

    if (email) {
        updateUser.email = email;
    }

    if (firstName) {
        updateUser.firstName = firstName;
    }

    if (lastName) {
        updateUser.lastName = lastName;
    }

    if (gender) {
        updateUser.gender = gender;
    }

    User.findByIdAndUpdate(id, updateUser, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        });
});

router.route("/update-location/:id").put((req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    User.findByIdAndUpdate(
        id,
        {
            location: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
        },
        { new: true }
    )
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        });
});

router.put("/isOnline/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const isOnline = req.body.isOnline;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        user.isOnline = isOnline;
        await user.save();
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

router.put("/add-treasure", async (req, res) => {
    try {
        const { userId, treasureId } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { treasureList: treasureId } },
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/my-treasure/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate(
            "treasureList"
        );
        res.json(user.treasureList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
