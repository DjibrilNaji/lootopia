import { useState } from "react";
import { SafeAreaView, StyleSheet, Pressable, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { MFAVerificationForm } from "@/src/components/auth/MFAVerificationForm";

export default function Login() {
  const [isMFARequired, setIsMFARequired] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="arrow-left" size={24} color="black" />
        <Text>Retour</Text>
      </Pressable>
      {!isMFARequired ? (
        <LoginForm setIsMFARequired={setIsMFARequired} setEmail={setEmail} />
      ) : (
        <MFAVerificationForm email={email} setIsMFARequired={setIsMFARequired} />
      )}
    </SafeAreaView>
  );
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
});
