import React, { useState, useEffect, createContext } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/Screens/LoginScreen";
import SignUpScreen from "./src/Screens/SignUpScreen";
import Navigations from "./src/Components/Navigations";

export const UserContext = createContext(null);
export const OnlineContext = createContext(null);

export default function App() {
    const [userId, setUserId] = useState(null);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [isOnline, setIsOnline] = useState(false);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userId");
        setUserId(null);
        setIsOnline(false);
    };

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await AsyncStorage.getItem("userId");
            if (userId) {
                setUserId(userId);
                setIsOnline(true);
            }
        };
        fetchUserId();
    }, []);

    const handleSignup = () => {
        setIsLoginPage(false);
    };

    const handleLogin = (userId) => {
        setUserId(userId);
        setIsOnline(true);
    };

    return (
        <View style={styles.container}>
            <OnlineContext.Provider value={isOnline}>
                {userId ? (
                    <UserContext.Provider value={{ userId, setUserId }}>
                        <Navigations handleLogout={handleLogout} />
                    </UserContext.Provider>
                ) : (
                    <UserContext.Provider value={{ userId, setUserId }}>
                        {isLoginPage ? (
                            <LoginScreen
                                onLogin={handleLogin}
                                onSignup={() => setIsLoginPage(false)}
                            />
                        ) : (
                            <SignUpScreen
                                onSignup={() => setIsLoginPage(true)}
                            />
                        )}
                    </UserContext.Provider>
                )}
            </OnlineContext.Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
