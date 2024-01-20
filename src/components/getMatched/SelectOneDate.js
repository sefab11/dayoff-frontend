import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";


const SelectOneDate = (props) => {
    //passed in properties
    const {title, titleStyle, label, labelStyle, boxWidth, isFlexible} = props;

    const [dates, setDates] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isChecked, setChecked] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    function updateDates(newDate){
        if (dates.includes(newDate) || newDate.includes("undefined")) return;
        //reassign dates to a 1-length arr
        dates[0] = newDate;
        setDates([newDate]);
        //update prop in parent, only send value, not array
        props.onSelectDate(newDate);
    }

    //only 1 date allowed, so reassign dates to an empty arr
    function removeDate(){
        if (isChecked) return;

        setDates([]);
    }

    const toggleModal = () => {
        if (isChecked) return;

        setModalVisible(!isModalVisible);
        if (!isModalVisible) return;
        //add a new formatted date when disabling the calender
        const newDate = formatDate(startDate, endDate);
        updateDates(newDate);
        setStartDate('');
        setEndDate('');
    }

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

    function deliverDateLabels(){
        if (dates == null) return;
        dates.forEach((date) => console.log(date));

        const dateComponents = dates.map((date, index) => {
            <View style={styles.dateContainer}
                  backgroundColor={!isChecked ? palette.lightPurple : palette.lightGrey2}
                  key={index}
            >
                <Text style={!isChecked ? styles.dateTextActive : styles.dateTextInactive}>
                    {date}
                </Text>

                <TouchableOpacity onPress={() => removeDate()}>
                    <Image style={styles.xIcon}
                           tintColor={!isChecked ? palette.black : palette.grey}
                           source={require("../../../assets/icons/x.png")}
                    />
                </TouchableOpacity>
            </View>
        });

        return dateComponents;
    }

    //params dateSelected: date, dateType: 'START_DATE'/'END_DATE'
    function onDateSelected(dateSelected, dateType){
        if (dateSelected == null || dateType == null) return;

        if (dateType == 'START_DATE') setStartDate(dateSelected);
        else if (dateType == 'END_DATE') setEndDate(dateSelected);
    }


    return (
    <View style={styles.selectDateWrap}>
        <View>
            <Text style={titleStyle}>{title}</Text>
        </View>

        <View>
            <Text style={labelStyle}>{label}</Text>
        </View>

        <View>
            <View style={styles.calenderIconContainer}
                  borderWidth={1}
                  marginTop={0}
                  width={boxWidth}
            >
                {deliverDateLabels()}
                {/*marginLeft keeps it as the last component in the flexbox, padding makes it
                  slightly bigger so that flexbox doesn't expand on a new date on a new row
                */}
                <TouchableOpacity onPress={toggleModal}
                                  style={{marginLeft: 'auto',
                                  alignSelf: 'center'}}
                >
                    <Image style={styles.icon}
                           tintColor={!isChecked ? palette.purple : palette.grey}
                           source={require("../../../assets/icons/calendar.png")}
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
                            selectedDayColor={palette.purple}
                            selectedDayTextColor={palette.white}
                        />
                        <View style={styles.calenderBottom}>
                            <TouchableOpacity onPress={toggleModal} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        {isFlexible
        ?
        <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? palette.purple : undefined} />
                <Text style={styles.checkText}>I’m flexible with my dates</Text>
        </View>
        : null
        }
    </View>
    );
};


const styles = StyleSheet.create({
  selectDateWrap: {
    paddingTop:5,
    paddingBottom:35,
    borderBottomWidth:1,
    borderBottomColor:'#D7D7D7',
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
  calenderIconContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    justifyContent: "flex-start",
    lineHeight: "27px",
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 5,
    height: 10 * vmin,
  },
  dateTextActive: {
    color: palette.purple,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dateTextInactive: {
    color: palette.grey,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    resizeMode: 'center',
    height: 4 * vh,
    width: 4 * vh,
  },
  xIcon: {
    resizeMode: 'contain',
    height: 1.5 * vh,
    width: 1.5 * vh,
    marginHorizontal: 10,
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
    letterSpacing: 1.5,
  }
});

export default SelectOneDate;
