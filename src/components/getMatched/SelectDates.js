import { useState } from "react";
import { View, Keyboard, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
const SelectDates = () => {
  const [isModalVisible, setModalVisible] = useState(false);

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
        <View>
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Adjust the height of the modal container
    width: "100%", // Adjust the width of the modal container
  },

  // Additional style for the calendar container
  calendarContainer: {
    backgroundColor: "white", // Set a background color if needed
    borderRadius: 10, // Optional: add border radius for rounded corners
    padding: 20, // Optional: add padding for inner content
  },
});

export default SelectDates;
