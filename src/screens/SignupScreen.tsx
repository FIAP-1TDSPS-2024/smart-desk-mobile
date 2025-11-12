import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Input, PasswordInput, Button, Card } from "../components";

interface SignupScreenProps {
  navigation: any;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    workMode: "hybrid",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
      valid = false;
    }

    if (!acceptTerms) {
      Alert.alert(
        "Atenção",
        "Você deve aceitar os termos de uso para continuar"
      );
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        workMode: formData.workMode,
      });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      // Navigation is handled automatically by AuthContext state change
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
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

        <Card style={styles.formContainer}>
          <Input
            label="Nome Completo"
            placeholder="Seu nome"
            value={formData.name}
            onChangeText={(value) => updateFormData("name", value)}
            error={errors.name}
            editable={!isLoading}
          />

          <Input
            label="Email"
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(value) => updateFormData("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
          />

          <Input
            label="Empresa (opcional)"
            placeholder="Nome da empresa"
            value={formData.company}
            onChangeText={(value) => updateFormData("company", value)}
            editable={!isLoading}
          />

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.workModeLabel}>Modelo de Trabalho</Text>
            <View style={styles.pickerContainer}>
              {["remote", "hybrid", "office"].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.pickerOption,
                    formData.workMode === mode && styles.pickerOptionSelected,
                  ]}
                  onPress={() => updateFormData("workMode", mode)}
                  disabled={isLoading}
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

          <PasswordInput
            label="Senha"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChangeText={(value) => updateFormData("password", value)}
            error={errors.password}
            editable={!isLoading}
          />

          <PasswordInput
            label="Confirmar Senha"
            placeholder="Digite a senha novamente"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData("confirmPassword", value)}
            error={errors.confirmPassword}
            editable={!isLoading}
          />

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAcceptTerms(!acceptTerms)}
            disabled={isLoading}
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

          <Button
            title={isLoading ? "Criando..." : "Criar Conta"}
            onPress={handleSignup}
            disabled={isLoading}
            style={{ marginBottom: 20 }}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
            >
              <Text style={styles.loginLink}>Faça login</Text>
            </TouchableOpacity>
          </View>
        </Card>
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
    marginBottom: 30,
  },
  workModeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
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
