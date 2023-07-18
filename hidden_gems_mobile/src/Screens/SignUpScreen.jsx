import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";

export default function SignUpScreen({ onSignup }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("male");

    const handleSignUp = () => {
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        // Send POST request to server
        fetch("https://hidden-gems-backend.onrender.com/users/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                email: email,
                password: password,
                gender: gender,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle response data here
                console.log(data);
                Alert.alert("Success", "Signup successful!", [
                    { text: "OK", onPress: () => onSignup() },
                ]);
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                label="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                mode="outlined"
            />

            <TextInput
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
            />
            <View style={styles.radioGroup}>
                <View style={styles.radioOption}>
                    <RadioButton
                        value="male"
                        status={gender === "male" ? "checked" : "unchecked"}
                        onPress={() => setGender("male")}
                        defaultChecked
                    />
                    <Text style={styles.radioText}>Male</Text>
                </View>
                <View style={styles.radioOption}>
                    <RadioButton
                        value="female"
                        status={gender === "female" ? "checked" : "unchecked"}
                        onPress={() => setGender("female")}
                    />
                    <Text style={styles.radioText}>Female</Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                mode="outlined"
            />

            <TextInput
                style={styles.input}
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                mode="outlined"
            />

            <Button
                style={styles.button}
                mode="contained"
                onPress={handleSignUp}
            >
                Sign Up
            </Button>

            <Text style={styles.linkContainer}>
                Already have an account?
                <Text style={styles.link} onPress={() => onSignup()}>
                    Log In
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
        height: 48,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        width: "80%",
        height: 48,
        borderRadius: 5,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    linkContainer: {
        margin: 10,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 16,
    },
    radioOption: {
        marginHorizontal: 20,
    },
});
