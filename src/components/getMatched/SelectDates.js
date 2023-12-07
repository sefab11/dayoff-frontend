import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
//import { format } from "date-fns";

const SelectDates = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2023-11-07T12:00:00.000Z"));
  const [endDate, setEndDate] = useState(new Date("2023-11-10T12:00:00.000Z"));
  const [isChecked, setChecked] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    console.log("start: " , startDate);
    console.log("end: " , endDate);
  };

  //dateSelected parameter will have the date
  //dateType parameter will have either "START_DATE" or "END_DATE"
  function onDateSelected(dateSelected, dateType){
    console.log(dateSelected);
    console.log(dateType);
    //on start date changed null will be returned after the date so ignore those calls
    if (dateSelected == null || dateType == null) return;

    if (dateType == "START_DATE") setStartDate(dateSelected);
    else if (dateType == "END_DATE") setEndDate(dateSelected);
  }


  //for formatting the string in the Text components
  function formatDate(startDate, endDate){
    var start = startDate.toString().split(" ");
    var end = endDate.toString().split(" ");

    var startDay = start[2];
    var startMonth = start[1];
    var endDay = end[2];
    var endMonth = end[1];

    if (startMonth == endMonth){
        return (startDay + " - " + endDay + " " + startMonth);
    }
    else return (startDay + " " + startMonth + " - " + endDay + " " + endMonth);
    }


  return (
    <View style={styles.selectDateWrap}>
      <View>
        <Text style={styles.headingText}>
          Select all your days off for the year
        </Text>
      </View>
      <View>
        <Text style={styles.message}>
          Which weeks of the months are you taking days off to go on a trip
        </Text>
      </View>
      <View>
        <View style={styles.calenderIconContainer}>
          <Text style={styles.textContainer}>{formatDate(startDate, endDate)}</Text>
          <Text style={styles.textContainer}>02 - 10 Oct</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/welcome_screen/blackCalender.png")}
            />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                onDateChange={onDateSelected}
                selectedDayColor="#503cc8"
                selectedDayTextColor="#ffffff"
              />
              <TouchableOpacity onPress={toggleModal}>
                <Text>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.checkboxContainer}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4630EB' : undefined}/>
        <Text style={styles.checkText}>I’m flexible with my dates</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  selectDateWrap:{
    paddingTop:5,
    paddingBottom:35,
    borderBottomWidth:1,
    borderBottomColor:'#D7D7D7'
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

  message: {
    marginTop: 1.5 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  buttonGroup: {
    gap: 2 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
  },
  calenderIconContainer: {
    flexDirection: "row",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "space-between",
    lineHeight: "27px",
  },
  textContainer: {
    color: "#A9A9A9",
    backgroundColor: "#F2F0F0",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  checkboxContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15,
  },
  checkText:{
    paddingLeft:10,
    fontFamily: "Lato-Regular",
    fontSize: 4 * vmin,
    fontWeight: "600",
    color: "#000000",
    letterSpacing: 1.5
  }
});

export default SelectDates;
