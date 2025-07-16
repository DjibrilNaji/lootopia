import { LoaderCircle } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OtpInput } from 'react-native-otp-entry';

interface MFAVerificationFormFieldProps {
  email: string;
  setIsMFARequired: (value: boolean) => void;
  mutate: (data: { email: string; inputCode: string }) => void;
  isPending?: boolean;
}

export function MFAVerificationFormField({
  email,
  setIsMFARequired,
  mutate,
  isPending = false
}: MFAVerificationFormFieldProps) {
  const [inputCode, setInputCode] = useState("");

  const handleSubmit = () => {
    if (inputCode.length === 6) {
      mutate({ email, inputCode });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification en 2 étapes</Text>
      <Text style={styles.subtitle}>Entrez le code à 6 chiffres envoyé à {email}</Text>

      <View style={styles.otpContainer}>
        <OtpInput
          autoFocus
          onTextChange={setInputCode}
          numberOfDigits={6}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpInput,
            focusedPinCodeContainerStyle: styles.focusedOtpInput
          }}
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.button, (isPending || inputCode.length !== 6) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isPending || inputCode.length !== 6}
        >
          {isPending ? (
            <LoaderCircle size={24} color="white" style={styles.loader} />
          ) : (
            <Text style={styles.buttonText}>Vérifier</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.outlineButton]}
          onPress={() => setIsMFARequired(false)}
        >
          <Text style={[styles.buttonText, styles.outlineButtonText]}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32
  },
  otpContainer: {
    marginBottom: 32
  },
  otpInput: {
    width: 45,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc'
  },
  focusedOtpInput: {
    borderColor: '#2563eb'
  },
  buttonGroup: {
    gap: 12
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  disabledButton: {
    opacity: 0.7
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563eb'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600'
  },
  outlineButtonText: {
    color: '#2563eb'
  },
  loader: {
    marginVertical: 2
  }
});
