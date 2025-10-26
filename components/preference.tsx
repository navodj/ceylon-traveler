// import { createSettingsStyles } from "@/assets/style/setting_style";
// import useTheme from "@/hooks/UseTheme";
// import { Ionicons } from "@expo/vector-icons";
// import { Switch, Text, View } from "react-native";

// const Preferences = () => {
//   const { isDarkMode, toggleDarkMode, colors } = useTheme();
//   const settingsStyles = createSettingsStyles(colors);

//   return (
//     <View>
//       <Text style={settingsStyles.sectionTitle}>Preferences</Text>

//       {/* Dark Mode Toggle - styled like notification toggles */}
//       <View style={settingsStyles.toggleItem}>
//         <View style={settingsStyles.settingLeft}>
//           <Ionicons name="moon-outline" size={20} color={colors.text} style={{ marginRight: 12 }} />
//           <Text style={settingsStyles.toggleLabel}>Dark Mode</Text>
//         </View>
//         <Switch
//           value={isDarkMode}
//           onValueChange={toggleDarkMode}
//           thumbColor="#fff"
//           trackColor={{ false: colors.border, true: colors.primary || "#6366f1" }}
//           ios_backgroundColor={colors.border}
//         />
//       </View>
//     </View>
//   );
// };

// export default Preferences;