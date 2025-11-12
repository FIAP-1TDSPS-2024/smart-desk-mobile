import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Input, Button, Card } from "../components";

interface PersonalDataScreenProps {
  navigation: any;
}

export default function PersonalDataScreen({
  navigation,
}: PersonalDataScreenProps) {
  const { user, updateUser, deleteUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDate: "",
    address: "",
    company: user?.company || "",
    position: user?.position || "",
    workModel: user?.workMode || "hybrid",
    workHours: "09:00-18:00",
    height: "175",
    weight: "75",
  });

  const handleDeleteUser = () => {
    Alert.alert("Excluir conta", "Tem certeza que deseja excluir sua conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUser();
          } catch (error: any) {
            Alert.alert("Erro", error.message || "Erro ao fazer logout");
          }
        },
      },
    ]);
  };

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        company: user.company || prev.company,
        position: user.position || prev.position,
        workModel: user.workMode || prev.workModel,
      }));
    }
  }, [user]);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update user data in AsyncStorage via AuthContext
      await updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        position: formData.position,
        workMode: formData.workModel,
      });

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao atualizar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Restore original data from user context
    if (user) {
      setFormData({
        ...formData,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
        position: user.position || "",
        workModel: user.workMode || "hybrid",
      });
    }
    setIsEditing(false);
  };

  const calculateBMI = () => {
    const heightM = Number(formData.height) / 100;
    const bmi = Number(formData.weight) / Math.pow(heightM, 2);
    return bmi.toFixed(1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        {!isEditing ? (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <Text style={styles.editButton}>Editar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleCancel} disabled={isLoading}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </Text>
            </View>
            {isEditing && (
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={styles.userName}>{formData.name}</Text>
            <Text style={styles.userPosition}>{formData.position}</Text>
          </View>

          {/* Personal Information */}
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={20} color="#4F46E5" />
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            </View>

            <Input
              label="Nome Completo"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              editable={isEditing}
              placeholder="Seu nome completo"
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              editable={isEditing}
              keyboardType="email-address"
              placeholder="seu@email.com"
            />

            <Input
              label="Telefone"
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="+55 11 99999-9999"
            />

            <Input
              label="Data de Nascimento"
              value={formData.birthDate}
              onChangeText={(value) => updateFormData("birthDate", value)}
              editable={isEditing}
              placeholder="1990-01-01"
            />

            <Input
              label="Endereço"
              value={formData.address}
              onChangeText={(value) => updateFormData("address", value)}
              editable={isEditing}
              placeholder="Cidade, Estado"
              containerStyle={{ marginBottom: 0 }}
            />
          </Card>

          {/* Work Information */}
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="briefcase-outline" size={20} color="#4F46E5" />
              <Text style={styles.sectionTitle}>Informações Profissionais</Text>
            </View>

            <Input
              label="Empresa"
              value={formData.company}
              onChangeText={(value) => updateFormData("company", value)}
              editable={isEditing}
              placeholder="Nome da empresa"
            />

            <Input
              label="Cargo"
              value={formData.position}
              onChangeText={(value) => updateFormData("position", value)}
              editable={isEditing}
              placeholder="Seu cargo"
            />

            <View style={{ marginBottom: 16 }}>
              <Text style={styles.workModeLabel}>Modelo de Trabalho</Text>
              <View style={styles.pickerContainer}>
                {["remote", "hybrid", "office"].map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.pickerOption,
                      formData.workModel === mode &&
                        styles.pickerOptionSelected,
                      !isEditing && styles.pickerOptionDisabled,
                    ]}
                    onPress={() =>
                      isEditing && updateFormData("workModel", mode)
                    }
                    disabled={!isEditing}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        formData.workModel === mode &&
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

            <Input
              label="Horário de Trabalho"
              value={formData.workHours}
              onChangeText={(value) => updateFormData("workHours", value)}
              editable={isEditing}
              placeholder="09:00-18:00"
              containerStyle={{ marginBottom: 0 }}
            />
          </Card>

          {/* Health Information */}
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.healthIcon}>💪</Text>
              <Text style={styles.sectionTitle}>Informações de Saúde</Text>
            </View>

            <View style={styles.row}>
              <Input
                label="Altura (cm)"
                value={formData.height}
                onChangeText={(value) => updateFormData("height", value)}
                editable={isEditing}
                keyboardType="numeric"
                placeholder="175"
                containerStyle={styles.halfWidth}
              />

              <Input
                label="Peso (kg)"
                value={formData.weight}
                onChangeText={(value) => updateFormData("weight", value)}
                editable={isEditing}
                keyboardType="numeric"
                placeholder="75"
                containerStyle={styles.halfWidth}
              />
            </View>

            {formData.height && formData.weight && (
              <View style={styles.bmiCard}>
                <Text style={styles.bmiLabel}>
                  IMC (Índice de Massa Corporal)
                </Text>
                <Text style={styles.bmiValue}>{calculateBMI()} - Normal</Text>
              </View>
            )}
          </Card>

          {isEditing && (
            <Button
              title={isLoading ? "Salvando..." : "Salvar Alterações"}
              onPress={handleSave}
              disabled={isLoading}
              style={styles.saveButton}
            />
          )}

          {/* Danger Zone */}
          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>Zona de Perigo</Text>
            <Text style={styles.dangerDescription}>
              Ações irreversíveis que afetam sua conta
            </Text>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleDeleteUser}
            >
              <Text style={styles.dangerButtonText}>
                Excluir Conta Permanentemente
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
  cancelButton: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    position: "relative",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 52,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  userPosition: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  healthIcon: {
    fontSize: 20,
  },
  workModeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 0,
  },
  halfWidth: {
    flex: 1,
    marginBottom: 0,
  },
  pickerContainer: {
    flexDirection: "row",
    gap: 8,
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    alignItems: "center",
  },
  pickerOptionSelected: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  pickerOptionDisabled: {
    opacity: 0.6,
  },
  pickerOptionText: {
    color: "#6B7280",
    fontSize: 14,
  },
  pickerOptionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  bmiCard: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
  },
  bmiLabel: {
    fontSize: 14,
    color: "#1E1B4B",
    fontWeight: "600",
    marginBottom: 4,
  },
  bmiValue: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
  saveButton: {
    marginBottom: 16,
  },
  dangerSection: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 16,
    padding: 20,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 8,
  },
  dangerDescription: {
    fontSize: 14,
    color: "#B91C1C",
    marginBottom: 16,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  dangerButtonText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});
