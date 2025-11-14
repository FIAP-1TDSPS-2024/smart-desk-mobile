import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationsScreenProps {
  navigation: any;
}

export default function NotificationsScreen({
  navigation,
}: NotificationsScreenProps) {
  const notifications = [
    {
      id: 1,
      type: "alert",
      icon: "warning",
      iconColor: "#EF4444",
      iconBg: "#FEF2F2",
      title: "Alerta de Febre Detectada",
      message:
        "Temperatura corporal elevada detectada: 39°C. Recomendamos que você descanse e consulte um médico se os sintomas persistirem.",
      time: "Agora",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      icon: "time-outline",
      iconColor: "#F59E0B",
      iconBg: "#FFFBEB",
      title: "Tempo Sentado Prolongado",
      message:
        "Você está sentado há mais de 2 horas. Faça uma pausa de 5 minutos.",
      time: "15 min atrás",
      read: false,
    },
    {
      id: 3,
      type: "info",
      icon: "bulb-outline",
      iconColor: "#3B82F6",
      iconBg: "#EFF6FF",
      title: "Iluminação Ajustada",
      message: "A iluminação foi ajustada automaticamente para o nível ideal.",
      time: "1 hora atrás",
      read: true,
    },
    {
      id: 4,
      type: "success",
      icon: "checkmark-circle-outline",
      iconColor: "#10B981",
      iconBg: "#ECFDF5",
      title: "Meta de Postura Atingida",
      message:
        "Parabéns! Você manteve uma boa postura por 4 horas consecutivas.",
      time: "2 horas atrás",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Notificações</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationCardUnread,
              ]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: notification.iconBg },
                ]}
              >
                <Ionicons
                  name={notification.icon as any}
                  size={24}
                  color={notification.iconColor}
                />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color="#D1D5DB"
            />
            <Text style={styles.emptyStateTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptyStateText}>
              Você está em dia! Não há notificações pendentes.
            </Text>
          </View>
        )}

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
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSpacer: {
    width: 40,
  },
  unreadBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  notificationsContainer: {
    padding: 20,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  notificationCardUnread: {
    borderColor: "#4F46E5",
    borderWidth: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4F46E5",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});
