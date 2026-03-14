import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Text, View } from "react-native";
import { AttendanceProvider } from "../context/AttendanceContext";
function RootLayoutNav() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading... </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // ✅ User logged in - show tabs (protected)
        <Stack.Screen name="(tabs)" />
      ) : (
        // ❌ User not logged in - show auth
        <Stack.Screen name="auth" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AttendanceProvider>
          <RootLayoutNav />
      </AttendanceProvider>
    </AuthProvider>
  );
}
