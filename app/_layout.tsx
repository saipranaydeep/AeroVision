import { Stack } from "expo-router";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </LanguageProvider>
  );
}
