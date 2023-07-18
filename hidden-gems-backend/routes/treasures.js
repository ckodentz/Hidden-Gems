const router = require("express").Router();
const Treasure = require("../models/treasures.model");

// Get list of active treasures
router.route("/active-treasures").get((req, res) => {
    Treasure.find({ status: "active" })
        .then((treasures) => res.json(treasures))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
});

// Add new treasure
router.route("/add").post((req, res) => {
    const { name, riddle, code, location, radius, reward } = req.body;

    if (!name || !riddle || !code || !location || !radius) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newTreasure = new Treasure({
        name,
        riddle,
        code,
        location,
        radius,
        reward,
        status: "active",
    });

    newTreasure
        .save()
        .then(() => res.json({ message: "Treasure added successfully!" }))
        .catch((err) => res.status(400).json({ message: "Error: " + err }));
});

router.put("/update-treasure/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedTreasure = await Treasure.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedTreasure) {
            return res.status(404).json({ message: "Treasure not found" });
        }

        res.json(updatedTreasure);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
