import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MeasurementsScreen from "./src/screens/MeasurementsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import PremiumScreen from "./src/screens/PremiumScreen";
import PersonalDataScreen from "./src/screens/PersonalDataScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Measurements") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Premium") {
            iconName = focused ? "diamond" : "diamond-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Measurements" options={{ tabBarLabel: "Medições" }}>
        {(props) => <MeasurementsScreen navigator={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{ tabBarLabel: "Premium" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => (
                  <SignupScreen
                    {...props}
                    onSignup={() => setIsLoggedIn(true)}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen
                name="PersonalData"
                component={PersonalDataScreen}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
