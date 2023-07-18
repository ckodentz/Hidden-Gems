import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import TopHunters from "../Screens/TopHuntersScreen";
import MyTreasures from "../Screens/MyTreasuresScreen";

const Drawer = createDrawerNavigator();

export default function Navigations() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Top Hunters" component={TopHunters} />
                <Drawer.Screen name="My Treasures" component={MyTreasures} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
