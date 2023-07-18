import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import UserMale from "./images/pirate_male.png";
import UserFemale from "./images/pirate_female.png";

function ActiveUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get("https://hidden-gems-backend.onrender.com/users/active-users")
            .then((response) => {
                setUsers(response.data);
            });
    }, [users]);

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <h2 className="mt-3">Active Users</h2>
            <div
                className="active-users border p-3 rounded"
                style={{
                    maxHeight: "200px",
                    overflow: "auto",
                }}
            >
                <ul className="active-user-list d-flex flex-column gap-2">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="col-12 d-flex justify-content-between align-items-center"
                        >
                            <div className="col-4 d-flex flex-row align-items-center">
                                <img
                                    className="user-icon"
                                    s
                                    src={
                                        user.gender === "male"
                                            ? UserMale
                                            : UserFemale
                                    }
                                    alt=""
                                />
                                <span className="username">
                                    {user.userName}
                                </span>
                            </div>
                            <div className="location col-4">
                                Location: {user.location?.coordinates?.[1]},
                                {user.location?.coordinates?.[0]}
                            </div>

                            <Button onClick={() => handleProfileClick(user)}>
                                See Profile
                            </Button>
                        </li>
                    ))}
                </ul>
                {selectedUser && (
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>User Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>User Name: {selectedUser.userName}</p>
                            <p>Email: {selectedUser.email}</p>
                            <p>First Name: {selectedUser.firstName}</p>
                            <p>Last Name: {selectedUser.lastName}</p>
                            <p>
                                Location: {selectedUser.location.coordinates[1]}
                                ,{selectedUser.location.coordinates[0]}
                            </p>
                            <ul>
                                {selectedUser.treasureList.map((treasure) => (
                                    <li key={treasure._id}>{treasure.name}</li>
                                ))}
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
}

export default ActiveUsers;
