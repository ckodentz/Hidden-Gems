import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Dimensions, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import userIcon from "../../assets/pirate_male.png";
import treasureIcon from "../../assets/treasure-chest.png";
import Markers from "../Components/Markers";

import { UserContext } from "../../App";

export default function Home() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [activeTreasures, setActiveTreasures] = useState([]);
    const [alertedTreasures, setAlertedTreasures] = useState({});
    const { userId } = useContext(UserContext);

    const updateLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation(coords);

            // Make API call to update user location in MongoDB
            axios.put(`http://localhost:4000/users/update-location/${userId}`, {
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setTimeout(updateLocation, 5000); // call recursively after 5 seconds
        }
    };

    useEffect(() => {
        updateLocation();
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/treasures/active-treasures")
            .then((response) => {
                setActiveTreasures(response.data);
            });
    }, [activeTreasures]);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    useEffect(() => {
        activeTreasures.forEach((foundTreasure) => {
            if (location && !alertedTreasures[foundTreasure._id]) {
                const distance = haversine(
                    location.latitude,
                    location.longitude,
                    foundTreasure.location.coordinates[1],
                    foundTreasure.location.coordinates[0]
                );
                if (distance <= foundTreasure.radius) {
                    Alert.alert(
                        "There's a treasure around this area!!!!",
                        `Clue:  ${foundTreasure.riddle} Did you found it?`,
                        [
                            {
                                text: "Found it!",
                                onPress: () =>
                                    Alert.prompt(
                                        `Enter the code`,
                                        "You found the treasure! Let everyone know it was you who found the treasure.",
                                        [
                                            {
                                                text: "Submit",
                                                onPress: (code) => {
                                                    if (
                                                        code ==
                                                        foundTreasure.code
                                                    ) {
                                                        axios
                                                            .put(
                                                                `http://localhost:4000/treasures/update-treasure/${foundTreasure._id}`,
                                                                {
                                                                    status: "claimed",
                                                                }
                                                            )
                                                            .then(() => {
                                                                axios
                                                                    .put(
                                                                        `http://localhost:4000/users/add-treasure`,
                                                                        {
                                                                            treasureId:
                                                                                foundTreasure._id,
                                                                            userId: userId,
                                                                        }
                                                                    )
                                                                    .then(
                                                                        () => {
                                                                            Alert.alert(
                                                                                "Code matches!",
                                                                                `You have successfully claimed your ${foundTreasure.reward}`
                                                                            );
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (
                                                                            error
                                                                        ) => {
                                                                            console.error(
                                                                                error
                                                                            );
                                                                            Alert.alert(
                                                                                "Error",
                                                                                "There was an error claiming the treasure. Please try again later."
                                                                            );
                                                                        }
                                                                    );
                                                            });
                                                    } else {
                                                        Alert.alert(
                                                            "Code does not match!",
                                                            "Sorry, the code you entered is incorrect."
                                                        );
                                                        // Perform action when code does not match
                                                    }
                                                },
                                            },
                                        ]
                                    ),
                            },
                            {
                                text: "No",
                                onPress: () => {
                                    setAlertedTreasures((prevState) => ({
                                        ...prevState,
                                        [foundTreasure._id]: true,
                                    }));
                                },
                                 style: "cancel",
                            },
                        ]
                    );

                    setAlertedTreasures((prevState) => ({
                        ...prevState,
                        [foundTreasure._id]: true,
                    }));
                }
            }
        });
    }, [location, activeTreasures, alertedTreasures]);

    const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth radius in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000; // Distance in meters
    };

    return (
        <SafeAreaView style={styles.container}>
            {location && (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                >
                    <Markers
                        latitude={location.latitude}
                        longitude={location.longitude}
                        image={userIcon}
                    />

                    {activeTreasures.map((treasure) => (
                        <React.Fragment key={treasure._id}>
                            <Markers
                                latitude={treasure.location.coordinates[1]}
                                longitude={treasure.location.coordinates[0]}
                                image={treasureIcon}
                                radius={treasure.radius}
                            />
                        </React.Fragment>
                    ))}
                </MapView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        minWidth: Dimensions.get("window").width,
        minHeight: Dimensions.get("window").height,
    },
});
