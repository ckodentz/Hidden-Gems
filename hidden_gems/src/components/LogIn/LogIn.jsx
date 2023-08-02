import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../auth";

function LogIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/users/login",
                {
                    userName: userName,
                    password: password,
                }
            );
            console.log(response.data);
            // Redirect to dashboard page

            auth.login(userName);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Container className="d-flex flex-column align-items-center">
                <h1 className="mt-5">Login</h1>
                <Form onSubmit={handleSubmit} className="col-6">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="text-center mt-3">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                </Form>
                {/* <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p> */}
            </Container>
        </main>
    );
}

export default LogIn;
