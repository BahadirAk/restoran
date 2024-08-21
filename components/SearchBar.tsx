import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SearchBar({term, onTermChange, onTermSubmit}) {
  return (
    <View style={styles.background}>
      <AntDesign style={styles.icon} name="search1" size={30} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Ara"
        placeholderTextColor={"gray"}
        autoCorrect={false}
        autoCapitalize="none"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    margin: 10,
    height: 50,
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});
