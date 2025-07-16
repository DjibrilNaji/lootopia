import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

import { SignInType, SignupType } from "@/src/types/form"
import { Controller, useForm } from "react-hook-form"


interface LoginFormFieldsProps {
  isPending: boolean
  mutate: (data: SignInType) => void
}

export function LoginFormFields({ isPending, mutate }: LoginFormFieldsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleLogin = (data: SignInType) => {
    mutate(data)
  }

  return (
    <>
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

      <Pressable style={styles.button} onPress={handleSubmit(handleLogin)}>
        {isPending && <ActivityIndicator size="small" color="white" />}

        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
})
