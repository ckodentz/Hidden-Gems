import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import Treasure from "./images/treasure-chest.png";
import TreasureModal from "./TreasureModal";
import AddTreasureModal from "./AddTreasureModal";

function ActiveTreasures() {
    const [treasures, setTreasures] = useState([]);
    const [selectedTreasure, setSelectedTreasure] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        axios
            .get(
                "https://hidden-gems-backend.onrender.com/treasures/active-treasures"
            )
            .then((response) => {
                setTreasures(response.data);
            });
    }, [treasures]);

    const handleDetailsClick = (treasure) => {
        setSelectedTreasure(treasure);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleAddClose = () => {
        setShowAddModal(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between mt-3 mb-1">
                <h2>Active Treasures</h2>
                <Button onClick={handleAddClick}>ADD</Button>
            </div>
            <div
                className="active-treasures border p-3 rounded mb-5"
                style={{
                    maxHeight: "200px",
                    overflow: "auto",
                }}
            >
                <ul className="active-treasures-list d-flex flex-column gap-2">
                    {treasures.map((treasure) => (
                        <li
                            key={treasure._id}
                            className="col-12 d-flex justify-content-between align-items-center"
                        >
                            <div className="col-4 d-flex flex-row align-items-center">
                                <img
                                    className="user-icon"
                                    src={Treasure}
                                    alt=""
                                />
                                <span className="username">
                                    {treasure.name}
                                </span>
                            </div>
                            <div className="col-4 location">
                                Location: {treasure.location.coordinates[0]}
                                {treasure.location.coordinates[1]}
                            </div>
                            <Button
                                onClick={() => handleDetailsClick(treasure)}
                            >
                                See Details
                            </Button>
                        </li>
                    ))}
                </ul>
                {selectedTreasure && (
                    <TreasureModal
                        show={showModal}
                        onHide={handleClose}
                        treasure={selectedTreasure}
                    />
                )}
                <AddTreasureModal show={showAddModal} onHide={handleAddClose} />
            </div>
        </>
    );
}

export default ActiveTreasures;
