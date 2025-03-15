import { Entypo } from "@expo/vector-icons"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import useRegister from "@/src/client/hook/useRegister"
import { SignupType } from "@/src/types/form"

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const { mutate, isPending, successMessage, apiError } = useRegister()

  const handleRegister = (data: SignupType) => {
    mutate(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="arrow-left" size={24} color="black" />
        <Text>Retour</Text>
      </Pressable>

      <View style={styles.form}>
        <Text style={styles.title}>S'inscrire</Text>

        {apiError && <Text style={styles.errorText}>{apiError}</Text>}
        {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Le nom d'utilisateur est obligatoire"
              },
              minLength: {
                value: 5,
                message: "Le nom d'utilisateur doit contenir au moins 5 caractères"
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Le nom d'utilisateur ne peut contenir que des lettres et des chiffres"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.username ? styles.inputError : null]}
                placeholder="Entrez votre nom d'utilisateur"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholderTextColor="grey"
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.fieldError}>{errors.username.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: {
                value: true,
                message: "L'email est obligatoire"
              },
              minLength: {
                value: 1,
                message: "L'email est obligatoire"
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "L'email est invalide"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Entrez votre email"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="grey"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: {
                value: true,
                message: "Le mot de passe est obligatoire"
              },
              minLength: {
                value: 10,
                message: "Le mot de passe doit contenir au moins 10 caractères"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                message:
                  "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password ? styles.inputError : null]}
                placeholder="Entrez votre mot de passe"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholderTextColor="grey"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}
        </View>

        <Pressable style={styles.button} onPress={handleSubmit(handleRegister)}>
          {isPending && <ActivityIndicator size="small" color="white" />}

          <Text style={styles.buttonText}>S'inscrire</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  form: { flex: 1, padding: 20, justifyContent: "center", gap: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "black"
  },
  inputError: { borderColor: "#E63946" },
  inputContainer: { gap: 8 },

  label: { fontSize: 16, fontWeight: "500", color: "#555" },
  fieldError: { color: "#E63946", fontSize: 12 },

  button: {
    backgroundColor: "#6E5434",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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
  },
  backButton: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})
