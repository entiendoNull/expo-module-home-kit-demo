import * as React from "react";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";
import {
  getAccessoriesAsync,
  useHomeKitPermissions
} from "@/modules/expo-home-kit";
import { useFocusEffect } from "expo-router";
import { HomeKitAccessory } from "@/modules/expo-home-kit/src/ExpoHomeKit.types";
import { ListItem } from "@/components/ListItem";

export default function Index() {
  const [permission, requestPermission] = useHomeKitPermissions();
  const [accessories, setAccessories] = React.useState<HomeKitAccessory[]>([]);

  React.useEffect(() => {
    if (permission?.status !== "granted") {
      return;
    }

    getAccessoriesAsync().then((accessories) => {
      setAccessories(accessories);
    });
  }, [permission]);

  console.log(permission);

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

  // if (permission.status === "granted") {
  //   return (
  //     <View style={styles.permissionContainer}>
  //       <Text style={styles.message}>Permission granted 🎉</Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={accessories}
          style={styles.list}
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>
    </>
  );
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
  },
  list: {
    flex: 1
  },
  flatList: {
    padding: 12
  }
});
