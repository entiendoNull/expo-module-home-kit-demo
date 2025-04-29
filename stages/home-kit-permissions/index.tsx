import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useHomeKitPermissions } from "@/modules/expo-home-kit";

export default function Index() {
  const [permission, requestPermission] = useHomeKitPermissions();

  if (!permission) {
    return <View />;
  }

  if (permission.status === "undetermined") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to use HomeKit
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (permission.status === "denied") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>Permission denied</Text>
      </View>
    );
  }

  if (permission.status === "granted") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>Permission granted 🎉</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7"
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    fontSize: 20,
    textAlign: "center"
  }
});
