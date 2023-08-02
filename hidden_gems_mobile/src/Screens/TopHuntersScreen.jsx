import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import axios from "axios";

export default TopHunters = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:4000/users/top-hunters")
            .then((response) => {
                // sort the users based on the treasureList length
                const sortedUsers = response.data.sort(
                    (a, b) => b.treasureList.length - a.treasureList.length
                );
                setUsers(sortedUsers);
            });
    }, [users]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                    setSelectedUser(item);
                    setModalVisible(true);
                }}
            >
                <View style={styles.rankContainer}>
                    <Text>{index + 1}</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.username}>{item.userName}</Text>
                </View>
                <View style={styles.treasureContainer}>
                    <Text>{item.treasureList.length}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.topHunters}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.modalHeaderText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalUsername}>
                            Username: {selectedUser?.userName}
                        </Text>
                        <Text style={styles.userDetail}>
                            Email Address: {selectedUser?.email}
                        </Text>
                        <Text style={styles.userDetail}>
                            First Name:{selectedUser?.firstName}
                        </Text>
                        <Text style={styles.userDetail}>
                            Last Name: {selectedUser?.lastName}
                        </Text>
                        <Text style={styles.userDetail}>Treasure List</Text>
                        <FlatList
                            data={selectedUser?.treasureList}
                            renderItem={({ item }) => (
                                <Text style={styles.treasureName}>
                                    {item.name}
                                </Text>
                            )}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = {
    topHunters: {
        marginTop: 20,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#e9e9e9",
        padding: 10,
        borderRadius: 5,
    },
    rankContainer: {
        width: "15%",
        alignItems: "center",
    },
    userContainer: {
        width: "40%",
        flexDirection: "row",
        alignItems: "center",
    },
    userIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
        paddingLeft: 20,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue",
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalUsername: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    userDetail: {
        fontSize: 18,
        marginBottom: 10,
    },
    treasureListItem: {
        marginBottom: 20,
    },
    treasureName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue",
    },
};
