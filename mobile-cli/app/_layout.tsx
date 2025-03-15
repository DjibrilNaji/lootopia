import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router/stack"

export default function Layout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
