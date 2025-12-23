import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  BackHandler,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

const { width } = Dimensions.get("window");

const ErrorPopup = ({ visible, error, onRetry, onDismiss }) => {
  const { selectedLanguage } = useLanguage();
  const t = (key) => getTranslation(key, selectedLanguage);

  // Determine error type and message
  const getErrorInfo = (error) => {
    if (!error) {
      return {
        title: t("errorTitle"),
        message: t("unknownError"),
        icon: "alert-circle",
        color: "#ef4444",
      };
    }

    const errorMessage = error.message || error.toString().toLowerCase();

    // Network/Internet errors
    if (
      errorMessage.includes("network") ||
      errorMessage.includes("internet") ||
      errorMessage.includes("connection") ||
      errorMessage.includes("timeout") ||
      errorMessage.includes("unreachable") ||
      error.code === "NETWORK_ERROR" ||
      error.code === "ECONNABORTED"
    ) {
      return {
        title: t("networkErrorTitle"),
        message: t("networkErrorMessage"),
        icon: "wifi-off",
        color: "#f59e0b",
      };
    }

    // Server errors (5xx)
    if (error.response?.status >= 500) {
      return {
        title: t("serverErrorTitle"),
        message: t("serverErrorMessage"),
        icon: "server",
        color: "#ef4444",
      };
    }

    // Client errors (4xx)
    if (error.response?.status >= 400 && error.response?.status < 500) {
      return {
        title: t("clientErrorTitle"),
        message: t("clientErrorMessage"),
        icon: "alert-triangle",
        color: "#f97316",
      };
    }

    // Location errors
    if (
      errorMessage.includes("location") ||
      errorMessage.includes("permission")
    ) {
      return {
        title: t("locationErrorTitle"),
        message: t("locationErrorMessage"),
        icon: "map-pin",
        color: "#8b5cf6",
      };
    }

    // Data parsing errors
    if (errorMessage.includes("json") || errorMessage.includes("parse")) {
      return {
        title: t("dataErrorTitle"),
        message: t("dataErrorMessage"),
        icon: "file-x",
        color: "#ef4444",
      };
    }

    // Default error
    return {
      title: t("errorTitle"),
      message: error.message || t("unknownError"),
      icon: "alert-circle",
      color: "#ef4444",
    };
  };

  const errorInfo = getErrorInfo(error);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleBackButton = () => {
    handleDismiss();
    return true; // Prevent default back button behavior
  };

  React.useEffect(() => {
    if (visible) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackButton
      );
      return () => backHandler.remove();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Error Icon */}
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${errorInfo.color}20` },
            ]}
          >
            <Feather name={errorInfo.icon} size={48} color={errorInfo.color} />
          </View>

          {/* Error Title */}
          <Text style={styles.title}>{errorInfo.title}</Text>

          {/* Error Message */}
          <Text style={styles.message}>{errorInfo.message}</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {onRetry && (
              <TouchableOpacity
                style={[styles.button, styles.retryButton]}
                onPress={handleRetry}
                activeOpacity={0.8}
              >
                <Feather name="refresh-cw" size={16} color="#fff" />
                <Text style={styles.retryButtonText}>{t("retryButton")}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.dismissButton]}
              onPress={handleDismiss}
              activeOpacity={0.8}
            >
              <Text style={styles.dismissButtonText}>{t("dismissButton")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    maxWidth: width * 0.9,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dismissButton: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  dismissButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ErrorPopup;
