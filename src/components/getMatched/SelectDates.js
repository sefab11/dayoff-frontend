import { useState } from "react";
import { View, Keyboard, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
const SelectDates = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate,setStartDate] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
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
            <Text style={styles.textContainer}>10 - 18 Aug</Text>
            <Text style={styles.textContainer}>02 - 10 Oct</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/welcome_screen/calender.png")}
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
                onDateChange={this.onDateChange} 
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
  calenderIconContainer:{
    flexDirection: 'row',
    borderColor:'#D7D7D7',
    borderWidth:1,
    padding:10,
    paddingLeft:15,
    paddingRight:15,
    marginTop:15,
    borderRadius:5,
    justifyContent:'space-between',
    lineHeight:'27px',
  },
  textContainer:{
    color:'#A9A9A9',
    backgroundColor:'#D7D7D7',
    padding:5,
    borderRadius:5,
    paddingLeft:15,
    paddingRight:15,
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
});

export default SelectDates;
