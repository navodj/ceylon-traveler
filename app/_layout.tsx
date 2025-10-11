import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/UseTheme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
