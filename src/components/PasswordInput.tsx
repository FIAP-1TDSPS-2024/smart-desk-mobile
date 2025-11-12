import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps extends Omit<TextInputProps, "secureTextEntry"> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function PasswordInput({
  label,
  error,
  containerStyle,
  style,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.inputContainer, error && styles.inputContainerError]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconButton}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  inputContainerError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  iconButton: {
    padding: 12,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});
