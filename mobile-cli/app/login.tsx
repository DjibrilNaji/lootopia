import { StyleSheet, Text, View } from "react-native"

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Connexion screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
