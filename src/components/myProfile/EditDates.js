import { View, Text, StyleSheet,Image } from "react-native";

export default EditDates = () => {
  return (
    <View>
      <Text style={styles.headingText}>Edit days off calendar</Text>
      <View style={styles.dateContainer}>
        <View>
            <Text>11 - 18 Nov</Text>
        </View>
        <View>
            <Text>02 - 10 Jan</Text>
        </View>
        <View>
            <Image
            
              source={require("../../../assets/images/welcome_screen/calender.png")}
            />
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
  dateContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
