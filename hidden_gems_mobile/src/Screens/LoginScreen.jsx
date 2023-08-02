import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, ActivityIndicator, Text } from "react-native-paper";
import axios from "axios";

import { OnlineContext } from "../../App";

export default function LoginScreen({ onLogin, onSignup }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isOnline = useContext(OnlineContext);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:4000/users/login",
                { userName, password }
            );

            if (response.status === 200) {
                onLogin(response.data._id);

                // Make PUT request to update isOnline to true
                await axios.put(
                    `http://localhost:4000/users/isOnline/${response.data._id}`,
                    { isOnline: true }
                );
            }
        } catch (error) {
            setError("An error occurred while logging in");
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                label="Username"
                mode="outlined"
                autoCapitalize="none"
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                label="Password"
                mode="outlined"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            {isLoading ? (
                <ActivityIndicator animating={true} />
            ) : (
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={handleLogin}
                >
                    Log In
                </Button>
            )}
            {error && <Text>{error}</Text>}

            <Text style={styles.linkContainer}>
                Doesn't have an account?
                <Text style={styles.link} onPress={onSignup}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
    input: {
        width: "80%",
        marginBottom: 16,
    },
    button: {
        width: "80%",
        height: 48,
        borderRadius: 5,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
    },
    linkContainer: {
        margin: 10,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
        paddingLeft: 10,
    },
});
