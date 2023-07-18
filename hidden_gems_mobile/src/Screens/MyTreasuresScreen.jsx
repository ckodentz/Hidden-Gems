import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import axios from "axios";
import { UserContext } from "../../App";
import { List } from "react-native-paper";

export default function MyTreasures() {
    const { userId } = useContext(UserContext);
    const [treasures, setTreasures] = useState([]);

    useEffect(() => {
        const fetchTreasures = async () => {
            try {
                const response = await axios.get(
                    `https://hidden-gems-backend.onrender.com/users/my-treasure/${userId}`
                );
                setTreasures(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTreasures();
    }, [userId]);

    return (
        <SafeAreaView>
            {treasures.length === 0 ? (
                <Text>No treasures found.</Text>
            ) : (
                treasures.map((treasure) => (
                    <List.Item
                        key={treasure.id}
                        title={treasure.reward}
                        left={(props) => (
                            <List.Icon {...props} icon="map-marker" />
                        )}
                        description={
                            <>
                                <Text>
                                    Latitude: {treasure.location.coordinates[0]}
                                </Text>
                                <Text>
                                    Longitude:
                                    {treasure.location.coordinates[1]}
                                </Text>
                            </>
                        }
                        style={styles.listItem}
                    />
                ))
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});
