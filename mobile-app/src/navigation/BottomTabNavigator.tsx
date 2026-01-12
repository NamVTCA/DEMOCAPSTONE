// mobile-app/src/navigation/BottomTabNavigator.tsx
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Pressable,
  Vibration,
} from "react-native";
import * as Haptics from "expo-haptics";
import { RootState } from "../store/index-store";

// Screens - Using new organized structure
import {
  HomeScreen,
  SearchTripsScreen,
  MyBookingsScreen,
  BusTrackingScreen,
  ProfileScreen,
  DriverHomeScreen,
} from "../screens/index-screen";

const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const activeColor = "#1976d2";
  const inactiveColor = "gray";

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          marginBottom: Math.max(insets.bottom, 6),
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          // Haptic feedback: use expo-haptics if available, otherwise fallback to Vibration
          try {
            if (Platform.OS !== "web" && Haptics && Haptics.impactAsync) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                () => {}
              );
            } else {
              Vibration.vibrate(10);
            }
          } catch {
            // ignore
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // choose icon
        let iconName: keyof typeof Ionicons.glyphMap = "help-outline";
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === "SearchTrips") {
          iconName = isFocused ? "search" : "search-outline";
        } else if (route.name === "MyBookings") {
          iconName = isFocused ? "bookmark" : "bookmark-outline";
        } else if (route.name === "BusTracking") {
          iconName = isFocused ? "location" : "location-outline";
        } else if (route.name === "Profile") {
          iconName = isFocused ? "person" : "person-outline";
        } else if (route.name === "Driver") {
          iconName = isFocused ? "person" : "person-outline";
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={typeof label === "string" ? label : route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{ color: "#e3f2fd", borderless: false }}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
          >
            <Ionicons
              name={iconName}
              size={26}
              color={isFocused ? activeColor : inactiveColor}
            />
            {isFocused && (
              <View style={styles.labelContainer}>
                <Text style={[styles.label, { color: activeColor }]}>
                  {typeof label === "string" ? label : route.name}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isDriver = !!user?.roles?.includes("driver");

  useEffect(() => {
    // debug
    // console.log("BottomTabNavigator - isDriver:", isDriver);
  }, [isDriver]);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="SearchTrips"
        component={SearchTripsScreen}
        options={{
          tabBarLabel: "Tìm chuyến xe",
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          tabBarLabel: "Chuyến đi của tôi",
        }}
      />
      <Tab.Screen
        name="BusTracking"
        component={BusTrackingScreen}
        options={{
          tabBarLabel: "Theo dõi xe",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Hồ sơ",
        }}
      />
      {isDriver && (
        <Tab.Screen
          name="Driver"
          component={DriverHomeScreen}
          options={{
            tabBarLabel: "Tài xế",
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 14,
  },
  tabItemActive: {
    backgroundColor: "#e3f2fd",
  },
  labelContainer: {
    marginTop: 4,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default BottomTabNavigator;
