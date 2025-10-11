// import React, { useState } from "react";
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// const Auth = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.currentPassword) newErrors.currentPassword = "Current password is required.";
//     if (!formData.newPassword) newErrors.newPassword = "New password is required.";
//     if (formData.newPassword !== formData.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       Alert.alert("Success", "Password updated successfully!");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Change Password</Text>
//       {Object.keys(formData).map((field) => (
//         <View key={field} style={styles.inputContainer}>
//           <Text style={styles.label}>{field.replace(/([A-Z])/g, " $1")}</Text>
//           <TextInput
//             style={styles.input}
//             value={formData[field]}
//             onChangeText={(text) => setFormData({ ...formData, [field]: text })}
//             secureTextEntry
//           />
//           {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
//         </View>
//       ))}
//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
//         <Text style={styles.buttonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   error: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   backButton: {
//     backgroundColor: "#6c757d",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Auth;