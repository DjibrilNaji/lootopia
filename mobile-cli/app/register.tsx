import { Entypo } from "@expo/vector-icons"
import { router } from "expo-router"
import { Pressable, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="arrow-left" size={24} color="black" />
        <Text>Retour</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  backButton: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})
