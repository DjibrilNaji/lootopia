import { useForm, Controller } from "react-hook-form"
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native"
import { useLogin } from "@/src/client/hook/useLogin"
import { router } from "expo-router"

interface LoginFormProps {
  setIsMFARequired: (v: boolean) => void
  setEmail: (v: string) => void
}

export function LoginForm({ setIsMFARequired, setEmail }: LoginFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" }
  })

  const { mutate, apiError, isPending } = useLogin({
    onSuccess: (data) => {
      console.log("[LoginForm] onSuccess data:", data)
      router.push("/") // ou router.replace("/") selon ton besoin
    },
    onMFARequired: () => {
      console.log("[LoginForm] MFA requis, switch MFA")
      setIsMFARequired(true)
    },
  })

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Connexion</Text>
      {apiError && <Text style={styles.errorText}>{apiError}</Text>}

      <View style={styles.inputGroup}>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email requis" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              placeholder="Email"
            />
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Mot de passe</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Mot de passe requis" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              placeholder="Mot de passe"
            />
          )}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={handleSubmit((data) => {
          console.log("[LoginForm] handleSubmit data:", data)
          setEmail(data.email) 
          mutate(data)
        })}
      >
        <Text style={styles.buttonText}>{isPending ? "Connexion..." : "Se connecter"}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  form: { padding: 20, gap: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  inputGroup: { gap: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
  button: {
    backgroundColor: "#6E5434",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: { color: "white", fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center" }
})
