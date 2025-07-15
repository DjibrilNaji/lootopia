import { StyleSheet, Text, View } from "react-native"
import React from "react"

import useRegister from "@/src/client/hook/useRegister"
import { RegisterFormFields } from "@/src/components/auth/RegisterFormFields"


export function RegisterForm() {
  const { mutate, isPending, successMessage, apiError } = useRegister()

  return (
    <View style={styles.form}>
      <Text style={styles.title}>S'inscrire</Text>

      {apiError && <Text style={styles.errorText}>{apiError}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

      <RegisterFormFields isPending={isPending} mutate={mutate} />
    </View>
  )
}

const styles = StyleSheet.create({
  form: { flex: 1, padding: 20, justifyContent: "center", gap: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333"
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#E63946",
    fontSize: 16
  },
  successText: {
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#38A169",
    fontSize: 16
  }
})
