import React from "react";
import { Image, View } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default function Markers({ latitude, longitude, image, radius }) {
    return (
        <View>
            <Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}
            >
                <Image source={image} style={{ width: 40, height: 40 }} />
            </Marker>
            {radius && (
                <Circle
                    center={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    radius={radius}
                    fillColor="rgba(0, 255, 0, 0.2)"
                    strokeColor="rgba(0, 255, 0, 0.5)"
                    strokeWidth={2}
                />
            )}
        </View>
    );
}
