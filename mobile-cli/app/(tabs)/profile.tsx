import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 10 }}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>
          Connectez-vous pour commencer à planifier votre prochaine chasse au trésor
        </Text>
      </View>

      <View style={{ gap: 15 }}>
        <Link href="/login" style={styles.button}>
          <Text style={styles.buttonLabel}>Connexion</Text>
        </Link>

        <View style={{ flexDirection: "row", gap: 6 }}>
          <Text>Vous n'avez pas de compte ?</Text>
          <Link href="/register" asChild>
            <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>Inscription</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    gap: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "500"
  },
  subtitle: {
    fontSize: 16,
    color: "gray"
  },
  button: {
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: "rgb(110, 84, 52)"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
})
