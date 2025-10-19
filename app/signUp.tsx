import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Checkbox } from 'react-native-paper';




const SignUp = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    const handleSignUp = () => {
        // Add your sign up logic here
        console.log('Sign up attempted with:', { name, email, password, newsletter });

        // Navigate to userinputs.tsx after successful sign up
        router.push('/userinputs');
    };

    const handleLogin = () => {
        router.push('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header with Time */}


            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.textInput, styles.passwordInput]}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoComplete="password"
                            />
                            <TouchableOpacity
                                style={styles.showButton}
                                onPress={togglePasswordVisibility}
                            >
                                <Text style={styles.showButtonText}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Newsletter Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <Checkbox.Android
                            status={newsletter ? 'checked' : 'unchecked'}
                            onPress={() => setNewsletter(!newsletter)}
                            color="#4A90E2"
                        />
                        <Text style={styles.checkboxLabel}>
                            I would like to receive your newsletter and other promotional information.
                        </Text>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[
                            styles.signUpButton,
                            (!name || !email || !password) && styles.signUpButtonDisabled
                        ]}
                        onPress={handleSignUp}
                        disabled={!name || !email || !password}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    loginLink: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '600',
    },
    formSection: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 70,
    },
    showButton: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    showButtonText: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '600',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
        lineHeight: 20,
    },
    signUpButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#4A90E2',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    signUpButtonDisabled: {
        backgroundColor: '#CCCCCC',
        shadowColor: '#CCCCCC',
        shadowOpacity: 0.3,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    forgotPasswordContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '500',
    },
});

export default SignUp;
