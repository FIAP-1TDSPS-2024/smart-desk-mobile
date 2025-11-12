import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MeasurementsScreenProps {
  navigation: any;
}

export default function MeasurementsScreen({
  navigation,
}: MeasurementsScreenProps) {
  const measurements = [
    {
      id: 1,
      title: "Postura",
      value: 78,
      status: "good",
      trend: "up",
      icon: "🧘",
      description: "Boa postura nas últimas 4h",
      lastUpdate: "2 min atrás",
    },
    {
      id: 2,
      title: "Tempo Sentado",
      value: 45,
      status: "warning",
      trend: "down",
      icon: "⏱️",
      description: "2h 15min sem pausa",
      lastUpdate: "Agora",
    },
    {
      id: 3,
      title: "Iluminação",
      value: 92,
      status: "excellent",
      trend: "up",
      icon: "💡",
      description: "Nível ideal de luz",
      lastUpdate: "5 min atrás",
    },
    {
      id: 4,
      title: "Temperatura",
      value: 85,
      status: "good",
      trend: "up",
      icon: "🌡️",
      description: "22°C - Ambiente confortável",
      lastUpdate: "1 min atrás",
    },
    {
      id: 5,
      title: "Estresse",
      value: 35,
      status: "warning",
      trend: "down",
      icon: "🧠",
      description: "Nível moderado detectado",
      lastUpdate: "10 min atrás",
    },
    {
      id: 6,
      title: "Altura da Tela",
      value: 68,
      status: "good",
      trend: "up",
      icon: "🖥️",
      description: "Ajuste recomendado",
      lastUpdate: "30 min atrás",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return { bg: "#ECFDF5", border: "#A7F3D0", text: "#065F46" };
      case "good":
        return { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF" };
      case "warning":
        return { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E" };
      case "alert":
        return { bg: "#FEF2F2", border: "#FCA5A5", text: "#991B1B" };
      default:
        return { bg: "#F9FAFB", border: "#E5E7EB", text: "#374151" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Medições</Text>
          <Text style={styles.headerSubtitle}>Monitoramento em tempo real</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Overall */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Score Geral de Ergonomia</Text>
          <Text style={styles.scoreValue}>72/100</Text>
          <View style={styles.scoreTrend}>
            <Ionicons name="trending-up" size={20} color="#fff" />
            <Text style={styles.scoreTrendText}>+5 pontos esta semana</Text>
          </View>
        </View>

        {/* Alert */}
        <View style={styles.alertCard}>
          <Ionicons name="warning-outline" size={20} color="#F59E0B" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Atenção!</Text>
            <Text style={styles.alertText}>
              Você está sentado há mais de 2 horas. Faça uma pausa de 5 minutos.
            </Text>
          </View>
        </View>

        {/* Measurements */}
        <View style={styles.measurementsContainer}>
          {measurements.map((measurement) => {
            const colors = getStatusColor(measurement.status);
            return (
              <View
                key={measurement.id}
                style={[
                  styles.measurementCard,
                  {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.measurementHeader}>
                  <View style={styles.measurementInfo}>
                    <Text style={styles.measurementIcon}>
                      {measurement.icon}
                    </Text>
                    <View>
                      <Text style={styles.measurementTitle}>
                        {measurement.title}
                      </Text>
                      <Text style={styles.measurementDescription}>
                        {measurement.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.measurementValue}>
                    <Ionicons
                      name={
                        measurement.trend === "up"
                          ? "trending-up"
                          : "trending-down"
                      }
                      size={16}
                      color={measurement.trend === "up" ? "#10B981" : "#EF4444"}
                    />
                    <Text style={styles.measurementPercent}>
                      {measurement.value}%
                    </Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${measurement.value}%`,
                        backgroundColor: colors.text,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.measurementUpdate}>
                  {measurement.lastUpdate}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Premium CTA */}
        <View style={styles.premiumCard}>
          <Text style={styles.premiumIcon}>✨</Text>
          <Text style={styles.premiumTitle}>Desbloqueie Recursos Premium</Text>
          <Text style={styles.premiumText}>
            Análises avançadas, alertas personalizados e muito mais
          </Text>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() => navigation.navigate("Premium")}
          >
            <Text style={styles.premiumButtonText}>Ver Planos</Text>
          </TouchableOpacity>
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
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scoreCard: {
    backgroundColor: "#4F46E5",
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  scoreLabel: {
    color: "#C7D2FE",
    fontSize: 14,
    marginBottom: 8,
  },
  scoreValue: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
  },
  scoreTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreTrendText: {
    color: "#fff",
    fontSize: 16,
  },
  alertCard: {
    backgroundColor: "#FFFBEB",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FCD34D",
    flexDirection: "row",
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#78350F",
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: "#92400E",
  },
  measurementsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  measurementCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  measurementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  measurementInfo: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  measurementIcon: {
    fontSize: 32,
  },
  measurementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  measurementDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  measurementValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  measurementPercent: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  measurementUpdate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  premiumCard: {
    backgroundColor: "#9333EA",
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  premiumIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  premiumTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  premiumText: {
    color: "#E9D5FF",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  premiumButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  premiumButtonText: {
    color: "#9333EA",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 20,
  },
});
