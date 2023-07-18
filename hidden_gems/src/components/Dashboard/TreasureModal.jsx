import React from "react";
import { Modal, Button } from "react-bootstrap";

function TreasureModal({ show, onHide, treasure }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{treasure.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Riddle: {treasure.riddle}</p>
                <p>
                    Location: {treasure.location.coordinates[0]},{" "}
                    {treasure.location.coordinates[1]}
                </p>
                <p>Radius: {treasure.radius}</p>
                <p>Reward: {treasure.reward}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TreasureModal;
