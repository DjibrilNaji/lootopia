import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { MFAVerificationFormField } from "@/src/components/auth/MFAVerificationFormField";
import useMFA from "@/src/client/hook/useMFA";

interface MFAVerificationFormProps {
  email: string;
  setIsMFARequired: (isRequired: boolean) => void;
}

export function MFAVerificationForm({ email, setIsMFARequired }: MFAVerificationFormProps) {
  const { mutate, successMessage, apiError, isPending } = useMFA();
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, [successMessage]);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Vérifier le code</Text>
      {apiError && <Text style={styles.errorText}>{apiError}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
      <MFAVerificationFormField
        mutate={mutate}
        email={email}
        setIsMFARequired={setIsMFARequired}
        isPending={isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, padding: 20, justifyContent: "center", gap: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333", marginBottom: 20 },
  errorText: {
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#E63946",
    fontSize: 16,
    marginBottom: 10
  },
  successText: {
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#38A169",
    fontSize: 16,
    marginBottom: 10
  }
});
