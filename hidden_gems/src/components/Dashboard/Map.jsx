import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import axios from "axios";

import maleHunter from "./images/pirate_male.png";
import treasureChest from "./images/treasure-chest.png";

function Map() {
    const [users, setUsers] = useState([]);
    const [activeTreasures, setActiveTreasures] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/users/active-users")
            .then((response) => {
                setUsers(response.data);
            });
    }, [users]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/treasures/active-treasures")
            .then((response) => {
                setActiveTreasures(response.data);
            });
    }, [activeTreasures]);

    const containerStyle = {
        height: "400px",
    };

    const treasureCoordinates = activeTreasures.reduce((acc, treasure) => {
        const coords = treasure.location.coordinates;
        const key = `${coords[0]},${coords[1]}`;
        acc[key] = acc[key] ? acc[key] + 1 : 1;
        return acc;
    }, {});

    const center = Object.keys(treasureCoordinates).reduce(
        (acc, key) => {
            const coords = key.split(",");
            if (treasureCoordinates[key] > acc.count) {
                acc.count = treasureCoordinates[key];
                acc.location = {
                    lat: parseFloat(coords[1]),
                    lng: parseFloat(coords[0]),
                };
            }
            return acc;
        },
        { count: 0, location: { lat: 0, lng: 0 } }
    ).location;

    return (
        <div className="mt-5">
            <LoadScript googleMapsApiKey="AIzaSyAsMULxzPfdN53q2WCnSIQJswO8Exfn0zw">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                >
                    {users.map((user) => (
                        <Marker
                            key={user._id}
                            position={{
                                lat:
                                    user.location &&
                                    user.location.coordinates &&
                                    user.location.coordinates[1],
                                lng:
                                    user.location &&
                                    user.location.coordinates &&
                                    user.location.coordinates[0],
                            }}
                            icon={{
                                url: maleHunter,
                                scaledSize: new window.google.maps.Size(25, 25),
                            }}
                        />
                    ))}
                    {activeTreasures.map((treasure) => (
                        <Marker
                            key={treasure._id}
                            position={{
                                lat: treasure.location.coordinates[1],
                                lng: treasure.location.coordinates[0],
                            }}
                            icon={{
                                url: treasureChest,
                                scaledSize: new window.google.maps.Size(25, 25),
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default Map;
