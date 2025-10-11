// import React, { useState } from "react";
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// type FormData = {
//   name: string;
//   age: string;
//   country: string;
//   passportNumber: string;
//   contactNumber: string;
//   whatsappNumber: string;
//   email: string;
//   emergencyContact: string;
// };

// type Errors = Partial<Record<keyof FormData, string>>;

// const PersonData = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     age: "",
//     country: "",
//     passportNumber: "",
//     contactNumber: "",
//     whatsappNumber: "",
//     email: "",
//     emergencyContact: "",
//   });

//   const [errors, setErrors] = useState<Errors>({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required.";
//     if (!formData.age || isNaN(formData.age)) newErrors.age = "Age must be a number.";
//     if (!formData.contactNumber || isNaN(formData.contactNumber))
//       newErrors.contactNumber = "Contact number must be numeric.";
//     if (!formData.whatsappNumber || isNaN(formData.whatsappNumber))
//       newErrors.whatsappNumber = "WhatsApp number must be numeric.";
//     if (!formData.emergencyContact || isNaN(formData.emergencyContact))
//       newErrors.emergencyContact = "Emergency contact must be numeric.";
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email must be a valid email address.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       Alert.alert("Success", "Data saved successfully!");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Personal Data</Text>
//       {Object.keys(formData).map((field) => (
//         <View key={field} style={styles.inputContainer}>
//           <Text style={styles.label}>{field.replace(/([A-Z])/g, " $1")}</Text>
//           <TextInput
//             style={styles.input}
//             value={formData[field]}
//             onChangeText={(text) => setFormData({ ...formData, [field]: text })}
//             keyboardType={
//               ["age", "contactNumber", "whatsappNumber", "emergencyContact"].includes(field)
//                 ? "numeric"
//                 : "default"
//             }
//           />
//           {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
//         </View>
//       ))}
//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save</Text>
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
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default PersonData;