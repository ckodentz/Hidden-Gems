import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import UserMale from "./images/pirate_male.png";
import UserFemale from "./images/pirate_female.png";

function TopHunters() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:4000/users/top-hunters")
            .then((response) => {
                // sort the users based on the treasureList length
                const sortedUsers = response.data.sort(
                    (a, b) => b.treasureList.length - a.treasureList.length
                );
                setUsers(sortedUsers);
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
            <h2 className="mt-3">Top Hunters</h2>
            <div
                className="top-hunters border p-3 rounded"
                style={{
                    maxHeight: "200px",
                    overflow: "auto",
                }}
            >
                <ol className="top-hunters-list d-flex flex-column gap-2">
                    {users.map((user, index) => (
                        <li
                            key={user._id}
                            className="col-12 d-flex justify-content-between align-items-center"
                        >
                            <div className="col-3">{index + 1}</div>
                            <div className="col-3 d-flex flex-row align-items-center">
                                <img
                                    className="user-icon"
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

                            <div className="col-3 treasure-count">
                                {user.treasureList.length}
                            </div>
                            <Button onClick={() => handleProfileClick(user)}>
                                See Profile
                            </Button>
                        </li>
                    ))}
                </ol>
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
                            <p>Treasures: </p>
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

export default TopHunters;
