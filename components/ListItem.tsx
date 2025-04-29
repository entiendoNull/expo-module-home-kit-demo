import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { IconSymbol } from "./IconSymbol.ios";
import { HomeKitAccessory } from "@/modules/expo-home-kit/src/ExpoHomeKit.types";

interface ListItemProps {
  item: HomeKitAccessory;
  onPress?: (item: HomeKitAccessory) => void;
}

export function ListItem({ item, onPress }: ListItemProps) {
  function pressItemHandler() {
    onPress?.(item);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={pressItemHandler}>
      <View style={styles.mainInfo}>
        <Text style={styles.accessoryName}>{item.name}</Text>
        <View style={styles.reachable}>
          <Text style={styles.reachableText}>
            {item.isReachable ? "Connected" : "Disconnected"}
          </Text>
          <IconSymbol
            name={item.isReachable ? "checkmark" : "xmark"}
            color={item.isReachable ? "#34C759" : "#FF3B30"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    boxShadow: "0px 0px 12px 2px rgba(210,210,210,0.30);",
    justifyContent: "center"
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  accessoryName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000"
  },
  reachable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16
  },
  reachableText: {
    fontSize: 12,
    color: "#8E8E93",
    marginRight: 4
  }
});
