import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Button } from "../components";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  recommended?: boolean;
  buttonText: string;
  features: Array<{ text: string; included: boolean }>;
}

export default function PremiumScreen() {
  const plans: Plan[] = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Para começar sua jornada",
      buttonText: "Plano Atual",
      features: [
        { text: "Medições básicas", included: true },
        { text: "Histórico de 7 dias", included: true },
        { text: "Alertas de postura", included: true },
        { text: "Análises avançadas", included: false },
        { text: "Relatórios exportáveis", included: false },
        { text: "Suporte prioritário", included: false },
      ],
    },
    {
      name: "Premium",
      price: "R$ 29,90",
      period: "/mês",
      description: "Tudo que você precisa",
      recommended: true,
      buttonText: "Assinar Agora",
      features: [
        { text: "Todas as medições", included: true },
        { text: "Histórico ilimitado", included: true },
        { text: "Alertas personalizados", included: true },
        { text: "Análises avançadas com IA", included: true },
        { text: "Relatórios em PDF", included: true },
        { text: "Integração com dispositivos IoT", included: true },
      ],
    },
    {
      name: "Empresarial",
      price: "R$ 99,90",
      period: "/mês",
      description: "Para equipes de até 10 pessoas",
      buttonText: "Falar com Vendas",
      features: [
        { text: "Tudo do Premium", included: true },
        { text: "Dashboard para gestores", included: true },
        { text: "Relatórios da equipe", included: true },
        { text: "Suporte prioritário 24/7", included: true },
        { text: "Treinamento personalizado", included: true },
        { text: "API para integrações", included: true },
      ],
    },
  ];

  const benefits = [
    {
      icon: "flash",
      title: "Alertas Inteligentes",
      description: "Notificações em tempo real baseadas em IA",
    },
    {
      icon: "trending-up",
      title: "Análises Avançadas",
      description: "Insights detalhados sobre sua saúde",
    },
    {
      icon: "shield-checkmark",
      title: "Privacidade Total",
      description: "Seus dados são 100% protegidos",
    },
    {
      icon: "notifications",
      title: "Lembretes Personalizados",
      description: "Configure alertas do seu jeito",
    },
    {
      icon: "trophy",
      title: "Metas de Saúde",
      description: "Defina e acompanhe seus objetivos",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="diamond" size={64} color="#FCD34D" />
        <Text style={styles.headerTitle}>Upgrade para Premium</Text>
        <Text style={styles.headerSubtitle}>
          Desbloqueie todo o potencial do Smart-Desk e cuide melhor da sua saúde
          no trabalho
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Plans */}
          {plans.map((plan, index) => (
            <Card
              key={index}
              style={
                plan.recommended
                  ? [styles.planCard, styles.planCardRecommended]
                  : styles.planCard
              }
            >
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>⭐ Recomendado</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, fIndex) => (
                  <View key={fIndex} style={styles.featureRow}>
                    <Ionicons
                      name={
                        feature.included ? "checkmark-circle" : "close-circle"
                      }
                      size={20}
                      color={feature.included ? "#10B981" : "#D1D5DB"}
                    />
                    <Text
                      style={[
                        styles.featureText,
                        !feature.included && styles.featureTextDisabled,
                      ]}
                    >
                      {feature.text}
                    </Text>
                  </View>
                ))}
              </View>

              <Button
                title={plan.buttonText}
                onPress={() => console.log(`Selected plan: ${plan.name}`)}
                variant={plan.recommended ? "primary" : "secondary"}
                style={styles.planButton}
              />
            </Card>
          ))}

          {/* Benefits */}
          <Card style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>Por que Premium?</Text>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <View style={styles.benefitIconContainer}>
                  <Ionicons
                    name={benefit.icon as any}
                    size={20}
                    color="#4F46E5"
                  />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Support */}
          <Text style={styles.supportText}>
            Dúvidas? Entre em contato: suporte@smartdesk.com
          </Text>
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
    backgroundColor: "#4F46E5",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#C7D2FE",
    textAlign: "center",
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  planCard: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    position: "relative",
  },
  planCardRecommended: {
    borderColor: "#4F46E5",
  },
  recommendedBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 8,
  },
  recommendedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  planHeader: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
  },
  planPeriod: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
    gap: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#111827",
    flex: 1,
  },
  featureTextDisabled: {
    color: "#9CA3AF",
  },
  planButton: {
    marginTop: 0,
  },
  benefitsCard: {
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  benefitRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  testimonialCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  testimonialHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#C7D2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  testimonialAvatarText: {
    fontSize: 24,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  testimonialRole: {
    fontSize: 14,
    color: "#6B7280",
  },
  testimonialText: {
    fontSize: 14,
    color: "#374151",
    fontStyle: "italic",
    lineHeight: 20,
    marginBottom: 12,
  },
  testimonialStars: {
    flexDirection: "row",
    gap: 4,
  },
  star: {
    fontSize: 16,
  },
  supportText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
  },
  bottomPadding: {
    height: 20,
  },
});
