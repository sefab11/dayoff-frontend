import { View, Text, StyleSheet } from "react-native";

export default EditDates = () => {
  return (
    <View>
      <Text style={styles.headingText}>Edit days off calendar</Text>
      <View>
        <View>
            <Text>11 -18 Nov</Text>
        </View>
        <View>
            <Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
});
