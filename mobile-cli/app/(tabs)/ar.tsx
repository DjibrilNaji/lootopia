import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants
} from "@reactvision/react-viro"
import { useState } from "react"
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<"ui" | "ar">("ui")
  const router = useRouter();

  if (viewMode === "ar") {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: HelloWorldSceneAR }}
          style={StyleSheet.absoluteFill}
        />
  
        <View style={styles.backButtonContainer}>
          <Pressable onPress={() => router.replace("/")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.backButtonText}>Retour</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scanner AR</Text>
      <Pressable style={styles.cameraButton} onPress={() => setViewMode("ar")}>
      <Ionicons name="camera" size={20} color="#ffff" />
        <Text style={styles.cameraButtonText}>Activer la Caméra</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initialisation...")

  function onInitialized(state: any, reason: ViroTrackingReason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Bienvenue dans l'AR ✨")
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldText}
      />
    </ViroARScene>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20
  },
  cameraButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center'
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 8
  },
  helloWorldText: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
  },
  
})
