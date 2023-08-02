import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../../App";
import axios from "axios";
import { TextInput, Button, Text, RadioButton } from "react-native-paper";

export default function ProfileScreen() {
    const { userId, setUserId } = useContext(UserContext);
    const [user, setUser] = useState(null);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (user) {
            setUserName(user?.userName || "");
            setEmail(user?.email || "");
            setFirstName(user?.firstName || "");
            setLastName(user?.lastName || "");
            setGender(user?.gender || "");
        }
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/users/${userId}`
                );
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleLogout = async () => {
        try {
            await axios.put(`http://localhost:4000/users/isOnline/${userId}`, {
                isOnline: false,
            });
        } catch (error) {
            console.log(error);
        }
        setUserId(null);
    };

    const handleSubmit = async () => {
        try {
            await axios.put(
                `http://localhost:4000/users/update-profile/${user._id}`,
                {
                    userName,
                    password,
                    email,
                    firstName,
                    lastName,
                    gender,
                }
            );
            alert("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            alert("Error updating profile");
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <TextInput
                        style={styles.input}
                        label="Username"
                        value={userName}
                        onChangeText={setUserName}
                        autoCapitalize="none"
                        mode="outlined"
                    />
                    <TextInput
                        label="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                        secureTextEntry
                        mode="outlined"
                    />
                    <TextInput
                        label="Email Address"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        mode="outlined"
                    />
                    <TextInput
                        label="First Name"
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Enter first name"
                        mode="outlined"
                    />

                    <TextInput
                        label="Last Name"
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Enter last name"
                        mode="outlined"
                    />
                    <View style={styles.radioGroup}>
                        <View style={styles.radioOption}>
                            <RadioButton
                                value="male"
                                status={
                                    gender === "male" ? "checked" : "unchecked"
                                }
                                onPress={() => setGender("male")}
                            />
                            <Text style={styles.radioText}>Male</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton
                                value="female"
                                status={
                                    gender === "female"
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setGender("female")}
                            />
                            <Text style={styles.radioText}>Female</Text>
                        </View>
                    </View>

                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={handleSubmit}
                    >
                        Update
                    </Button>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button
                style={styles.button}
                mode="contained"
                onPress={handleLogout}
            >
                Log Out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
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
