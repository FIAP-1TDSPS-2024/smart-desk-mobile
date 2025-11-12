import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SignupScreenProps {
  navigation: any;
  onSignup: () => void;
}

export default function SignupScreen({
  navigation,
  onSignup,
}: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    workMode: "hybrid",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignup = () => {
    onSignup();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="desktop-outline" size={40} color="#fff" />
          </View>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Comece sua jornada para um trabalho mais saudável
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Empresa (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da empresa"
              value={formData.company}
              onChangeText={(value) => updateFormData("company", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Modelo de Trabalho</Text>
            <View style={styles.pickerContainer}>
              {["remote", "hybrid", "office"].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.pickerOption,
                    formData.workMode === mode && styles.pickerOptionSelected,
                  ]}
                  onPress={() => updateFormData("workMode", mode)}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      formData.workMode === mode &&
                        styles.pickerOptionTextSelected,
                    ]}
                  >
                    {mode === "remote"
                      ? "Remoto"
                      : mode === "hybrid"
                      ? "Híbrido"
                      : "Presencial"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChangeText={(value) => updateFormData("password", value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <Ionicons
              name={acceptTerms ? "checkbox" : "square-outline"}
              size={20}
              color="#4F46E5"
            />
            <Text style={styles.termsText}>
              Concordo com os <Text style={styles.link}>Termos de Uso</Text> e{" "}
              <Text style={styles.link}>Política de Privacidade</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Criar Conta</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#4F46E5",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E1B4B",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    gap: 8,
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
  },
  pickerOptionSelected: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  pickerOptionText: {
    color: "#666",
    fontSize: 14,
  },
  pickerOptionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 8,
  },
  termsText: {
    marginLeft: 8,
    color: "#666",
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    color: "#4F46E5",
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#666",
  },
  loginLink: {
    color: "#4F46E5",
    fontWeight: "600",
  },
});
