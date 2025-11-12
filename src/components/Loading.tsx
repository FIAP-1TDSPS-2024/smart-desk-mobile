import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
});
