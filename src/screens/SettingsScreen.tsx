import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsScreenProps {
  navigation: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    postureAlerts: true,
    breakReminders: true,
    dailyReport: true,
    weeklyReport: false,
    darkMode: false,
    reducedMotion: false,
    soundEnabled: true,
    vibration: true,
    dataCollection: true,
    anonymousAnalytics: false,
    shareWithEmployer: false,
    autoMonitoring: true,
    smartAlerts: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    Alert.alert("Configuração atualizada");
  };

  const SettingRow = ({
    icon,
    title,
    description,
    settingKey,
  }: {
    icon: string;
    title: string;
    description: string;
    settingKey: keyof typeof settings;
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={settings[settingKey]}
        onValueChange={(value) => updateSetting(settingKey, value)}
        trackColor={{ false: "#D1D5DB", true: "#A5B4FC" }}
        thumbColor={settings[settingKey] ? "#4F46E5" : "#f4f3f4"}
      />
    </View>
  );

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
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Notifications */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#4F46E5"
              />
              <Text style={styles.sectionTitle}>Notificações</Text>
            </View>
            <SettingRow
              icon="notifications"
              title="Notificações Push"
              description="Receba alertas em tempo real"
              settingKey="pushNotifications"
            />
            <SettingRow
              icon="mail"
              title="Notificações por Email"
              description="Resumos enviados por email"
              settingKey="emailNotifications"
            />
            <SettingRow
              icon="body"
              title="Alertas de Postura"
              description="Avisos quando sua postura está ruim"
              settingKey="postureAlerts"
            />
            <SettingRow
              icon="timer"
              title="Lembretes de Pausa"
              description="Notificações para fazer pausas"
              settingKey="breakReminders"
            />
            <SettingRow
              icon="today"
              title="Relatório Diário"
              description="Resumo do dia às 18h"
              settingKey="dailyReport"
            />
            <SettingRow
              icon="calendar"
              title="Relatório Semanal"
              description="Análise semanal às segundas"
              settingKey="weeklyReport"
            />
          </View>

          {/* Display */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color="#4F46E5"
              />
              <Text style={styles.sectionTitle}>Exibição e Aparência</Text>
            </View>
            <SettingRow
              icon="moon"
              title="Modo Escuro"
              description="Tema escuro para menos cansaço visual"
              settingKey="darkMode"
            />
            <SettingRow
              icon="contract"
              title="Reduzir Animações"
              description="Menos movimento na interface"
              settingKey="reducedMotion"
            />
          </View>

          {/* Sound */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="volume-high-outline" size={20} color="#4F46E5" />
              <Text style={styles.sectionTitle}>Som e Vibração</Text>
            </View>
            <SettingRow
              icon="musical-notes"
              title="Sons Ativados"
              description="Sons para notificações e alertas"
              settingKey="soundEnabled"
            />
            <SettingRow
              icon="phone-portrait"
              title="Vibração"
              description="Feedback tátil"
              settingKey="vibration"
            />
          </View>

          {/* Monitoring */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="desktop-outline" size={20} color="#4F46E5" />
              <Text style={styles.sectionTitle}>Monitoramento</Text>
            </View>
            <SettingRow
              icon="sync"
              title="Monitoramento Automático"
              description="Detecta quando você está trabalhando"
              settingKey="autoMonitoring"
            />
            <SettingRow
              icon="flash"
              title="Alertas Inteligentes"
              description="IA adapta alertas ao seu padrão"
              settingKey="smartAlerts"
            />
          </View>

          {/* Privacy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#4F46E5"
              />
              <Text style={styles.sectionTitle}>Privacidade e Segurança</Text>
            </View>
            <SettingRow
              icon="analytics"
              title="Coleta de Dados"
              description="Permite melhorar o serviço"
              settingKey="dataCollection"
            />
            <SettingRow
              icon="eye-off"
              title="Análises Anônimas"
              description="Dados sem identificação pessoal"
              settingKey="anonymousAnalytics"
            />
            <SettingRow
              icon="business"
              title="Compartilhar com Empresa"
              description="Dados agregados para gestão"
              settingKey="shareWithEmployer"
            />
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Ver Política de Privacidade</Text>
            </TouchableOpacity>
          </View>

          {/* Data Management */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="server-outline" size={20} color="#4F46E5" />
              <Text style={styles.sectionTitle}>Gerenciamento de Dados</Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonContent}>
                <Text style={styles.actionButtonTitle}>Exportar Dados</Text>
                <Text style={styles.actionButtonDescription}>
                  Baixe todos os seus dados em JSON
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonContent}>
                <Text style={styles.actionButtonTitle}>Limpar Cache</Text>
                <Text style={styles.actionButtonDescription}>
                  Liberar 45 MB de espaço
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}
            >
              <View style={styles.actionButtonContent}>
                <Text style={styles.dangerButtonTitle}>
                  Apagar Todos os Dados
                </Text>
                <Text style={styles.dangerButtonDescription}>
                  Ação irreversível
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>

          {/* About */}
          <View style={styles.aboutSection}>
            <View style={styles.aboutIcon}>
              <Ionicons name="flash" size={24} color="#fff" />
            </View>
            <Text style={styles.aboutTitle}>Smart-Desk</Text>
            <Text style={styles.aboutVersion}>Versão 1.0.0</Text>
            <View style={styles.aboutLinks}>
              <TouchableOpacity>
                <Text style={styles.aboutLink}>Termos de Uso</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.aboutLink}>Política de Privacidade</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.aboutLink}>Licenças de Código Aberto</Text>
              </TouchableOpacity>
            </View>
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
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
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
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  linkButton: {
    paddingTop: 16,
  },
  linkText: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionButtonContent: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  actionButtonDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerButtonTitle: {
    fontSize: 16,
    color: "#991B1B",
    marginBottom: 4,
  },
  dangerButtonDescription: {
    fontSize: 14,
    color: "#B91C1C",
  },
  aboutSection: {
    backgroundColor: "#EEF2FF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  aboutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  aboutLinks: {
    gap: 8,
    alignItems: "center",
  },
  aboutLink: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});
