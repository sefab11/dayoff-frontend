import { View, Text, StyleSheet, Image } from "react-native";
import { SelectDates } from "..";

export default EditDates = () => {
  return (
    <View style={styles.editDatesContainer}>
      <Text style={styles.headingText}>Edit days off calendar</Text>
      <View style={styles.dateContainer}>
        {/*TODO: ass in dateinput that prompts calender on press*/}
        <SelectDates
            title={null}
            subtitle={null}
            isFlexible={false}
            showLine={false}
            multipleDates={true}
            showBorder={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editDatesContainer:{
    marginBottom:20,
  },
  headingText: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
  dateContainer: {
    marginTop: 2.5 * vh,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    color: "#503CC8",
    backgroundColor: "#EEECFA",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
