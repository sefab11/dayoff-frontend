import { View, Text, StyleSheet,Image } from "react-native";

export default EditDates = () => {
  return (
    <View>
      <Text style={styles.headingText}>Edit days off calendar</Text>
      <View style={styles.dateContainer}>
        
            <Text style={styles.textContainer}>11 - 18 Nov</Text>
      
  
            <Text style={styles.textContainer}>02 - 10 Jan</Text>
      
        <View>
            <Image
              style={styles.icon}
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
    marginTop: 2.5 * vh,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textContainer: {
    color: "#A9A9A9",
    backgroundColor: "#F2F0F0",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
