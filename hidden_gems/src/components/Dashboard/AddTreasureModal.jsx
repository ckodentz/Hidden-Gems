import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function AddTreasureModal({ show, onHide }) {
    const [name, setName] = useState("");
    const [riddle, setRiddle] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [radius, setRadius] = useState("");
    const [code, setCode] = useState("");
    const [reward, setReward] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTreasure = {
            name,
            riddle,
            location: {
                type: "Point",
                coordinates: [Number(longitude), Number(latitude)],
            },

            radius,
            code,
            reward,
        };
        axios
            .post("http://localhost:4000/treasures/add", newTreasure)
            .then((response) => {
                console.log(response.data);
                onHide();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Treasure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mt-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treasure name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="riddle" className="mt-3">
                        <Form.Label>Riddle</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Enter treasure riddle"
                            value={riddle}
                            onChange={(event) => setRiddle(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="latitude" className="mt-3">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treasure latitude"
                            value={latitude}
                            onChange={(event) =>
                                setLatitude(event.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="longitude" className="mt-3">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treasure longitude"
                            value={longitude}
                            onChange={(event) =>
                                setLongitude(event.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="radius" className="mt-3">
                        <Form.Label>Radius</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter treasure radius"
                            value={radius}
                            onChange={(event) => setRadius(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clue" className="mt-3">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter treasure clue"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="reward" className="mt-3">
                        <Form.Label>Reward</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treasure reward"
                            value={reward}
                            onChange={(event) => setReward(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTreasureModal;
