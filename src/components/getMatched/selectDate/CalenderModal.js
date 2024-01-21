import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";


const CalenderModal = (props) => {
    const { isModalVisible, onDateSelected, toggleModal } = props;

    return (
    <Modal
    isVisible={isModalVisible}
    animationOut="slideInUp"
    animationOut="slideOutDown">
        <View style={styles.modalContainer}>
            <View style={styles.calenderContainer}>
                <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                onDateChange={onDateSelected}
                selectedDayColor={palette.purple}
                selectedDayTextColor={palette.white}
                />

                <View style={styles.calenderBottom}>
                    <TouchableOpacity style={styles.confirmButton}
                    onPress={toggleModal}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  calenderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  calenderBottom: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 10,
  },
  confirmButton: {
    backgroundColor: palette.purple,
    width: 40 * vmin,
    height: 10 * vmin,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    color: palette.white,
  },
})

export default CalenderModal;