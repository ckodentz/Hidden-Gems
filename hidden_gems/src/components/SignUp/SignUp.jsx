import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] =
        useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate email and password
        if (!validateEmail(formData.email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        if (!validatePassword(formData.password)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        if (formData.password !== formData.confirmPassword) {
            setPasswordConfirmationError(true);
            return;
        }
        setPasswordConfirmationError(false);
        // Submit form data
        try {
            const response = await fetch("http://localhost:4000/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const validateEmail = (email) => {
        // Basic email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long
        return password.length >= 8;
    };

    return (
        <main>
            <Container className="d-flex flex-column align-items-center">
                <h1 className="mt-5">Sign Up</h1>

                <Form onSubmit={handleSubmit} className="col-6">
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={emailError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={passwordError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={passwordConfirmationError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Passwords do not match.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>
                <p>
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </Container>
        </main>
    );
}
export default SignUp;
