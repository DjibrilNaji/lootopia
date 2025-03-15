import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgb(110, 84, 52)",
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="ar"
        options={{
          title: "AR",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="camera" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
        }}
      />
    </Tabs>
  )
}
