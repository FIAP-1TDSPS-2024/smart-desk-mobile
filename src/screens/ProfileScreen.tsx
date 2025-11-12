import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileScreenProps {
  navigation: any;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const stats = [
    { label: "Score Médio", value: "72/100", icon: "📊" },
    { label: "Dias Ativos", value: "45", icon: "🔥" },
    { label: "Pausas Hoje", value: "8", icon: "⏸️" },
  ];

  const menuItems = [
    {
      icon: "person-outline",
      label: "Dados Pessoais",
      action: () => navigation.navigate("PersonalData"),
    },
    {
      icon: "business-outline",
      label: "Informações da Empresa",
      action: () => {},
    },
    {
      icon: "briefcase-outline",
      label: "Modelo de Trabalho",
      action: () => {},
    },
    {
      icon: "settings-outline",
      label: "Configurações",
      action: () => navigation.navigate("Settings"),
    },
    { icon: "help-circle-outline", label: "Ajuda e Suporte", action: () => {} },
    {
      icon: "shield-checkmark-outline",
      label: "Privacidade e Segurança",
      action: () => {},
    },
  ];

  const achievements = ["🏆", "🎯", "💪", "🌟", "🔥"];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>João da Silva</Text>
          <Text style={styles.userEmail}>joao.silva@email.com</Text>
          <View style={styles.planBadge}>
            <Text style={styles.planText}>Plano Gratuito</Text>
            <TouchableOpacity>
              <Ionicons name="diamond-outline" size={16} color="#FCD34D" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Menu Items */}
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index !== menuItems.length - 1 && styles.menuItemBorder,
                ]}
                onPress={item.action}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color="#4F46E5"
                    />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Achievements */}
          <View style={styles.achievementsCard}>
            <Text style={styles.achievementsTitle}>Conquistas Recentes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.achievementsContainer}>
                {achievements.map((emoji, index) => (
                  <View key={index} style={styles.achievementBadge}>
                    <Text style={styles.achievementEmoji}>{emoji}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.versionText}>Smart-Desk v1.0.0</Text>
        </View>
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
    backgroundColor: "#4F46E5",
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#A5B4FC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E1B4B",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#C7D2FE",
    marginBottom: 12,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  planText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    marginTop: -60,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#111827",
  },
  achievementsCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  achievementsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  achievementBadge: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  achievementEmoji: {
    fontSize: 32,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 40,
  },
});
