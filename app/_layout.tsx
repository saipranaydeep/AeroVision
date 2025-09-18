import { Stack } from "expo-router";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LoadingProvider } from "./contexts/LoadingContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </LoadingProvider>
    </LanguageProvider>
  );
}
