import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur la page d'accueil !</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10
  }
})
