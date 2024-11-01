import { Tabs } from "expo-router";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Truyện Tranh",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"home-sharp"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Thể loại",
          headerTitle: "Thể Loại",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name={"category"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Tìm kiếm",
          headerTitle: "Tìm Kiếm",
          tabBarIcon: ({ color }) => (
            <AntDesign name={"search1"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(comic)/comics/[id]"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
