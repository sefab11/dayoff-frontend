import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Label } from "..";


const SelectDates = (props) => {
  //passed in properties
  const title = props.title;
  const subtitle = props.subtitle;
  const isFlexibleOptionEnabled = props.isFlexible;
  const showLine = props.showLine;
  const allowMultipleDates = props.multipleDates;
  const boxBorderSize = props.showBorder ? 1 : 0;
  const boxWidth = props.boxWidth;

  const subtitleStyle = props.subtitleStyle;
  var subtitleType;
  if (subtitleStyle == null || subtitleStyle == 1) subtitleType = styles.message;
  else if (subtitleStyle == 2) subtitleType = styles.message2;

  //track the array of dates that are added
  //called array but more like list as items are added dynamically
  const [dates, setDates] = useState([]);


  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isChecked, setChecked] = useState(false);

  //either pushes a new date or makes the 0th index the new date
  //depending on whether the multipleDates property is passed as true or false
  function updateDates(newDate){
    //makes sure no repeat dates are added
    if (dates.includes(newDate) || newDate.includes("undefined")) return;
    if (allowMultipleDates) setDates(dates => [...dates, newDate]);
    else setDates([newDate]);
  };

  //removes the date clicked on and updates the dates array state
  function removeDate(date){
    dates.splice(dates.indexOf(date), 1);
    setDates(dates => [...dates]);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    //when disabling the calender, add a new date to dates
    if (!isModalVisible) return;

    //add new date when calender is closed
    const newDate = formatDate(startDate, endDate);
    updateDates(newDate);

    setStartDate("");
    setEndDate("")
  };

  function deliverDateLabels(){
    if (dates == null) return;
    //ensures that theres always at least one element so that the calender icon is fixed to
    //the right of the label

    const dateComponents = dates.map((date, index) =>
        <View key={index}>
            <TouchableOpacity onPress={() => removeDate(date)}>
                <Text style={!isChecked ? styles.textContainerActive : styles.textContainerInactive}
                backgroundColor={!isChecked ? palette.lightPurple : palette.lightGrey2}>
                {date}
                </Text>
            </TouchableOpacity>
        </View>
        );

    return dateComponents;
  };

  //dateSelected parameter will have the date
  //dateType parameter will have either "START_DATE" or "END_DATE"
  function onDateSelected(dateSelected, dateType){
    //on start date changed null will be returned after the date so ignore those calls
    if (dateSelected == null || dateType == null) return;

    if (dateType == "START_DATE") setStartDate(dateSelected);
    else if (dateType == "END_DATE") setEndDate(dateSelected);
  };


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
  };

  //for enabling or disabling the line underneath the component
  //the line is due to the selectDateWrap container and is changed to
  //null style when there shouldn't be a checkbox
  function enableUnderLine(showLine){
    if (!showLine) return null;

    return (styles.selectDateWrap);
  };

  function enableHeader(headerOpt){
    if (headerOpt == null) return;

    return (
    <View>
        <Text style={styles.headingText}>{title}</Text>
    </View>
    );
  };

  function enableSubheader(subheaderOpt){
    if (subheaderOpt == null) return;

    if (subtitleStyle == 1){
        return (
        <View>
            <Text style={styles.message}>{subtitle}</Text>
        </View>
        );
    }
    else if (subtitleStyle == 2){
        return (
        <View>
            <Label>{subtitle}</Label>
        </View>
        );
    };
  };

  //to either render or not render the flexible option checkbox
  function enableFlexibleOption(flexibleOpt){
    if (!flexibleOpt) return;

    return (
    <View style={styles.checkboxContainer}>
    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? palette.purple : undefined} />
        <Text style={styles.checkText}>I’m flexible with my dates</Text>
    </View>
    );
  };


  return (
    <View style={enableUnderLine(showLine)}>
      {enableHeader(title)}
      {enableSubheader(subtitle)}
      <View>
        <View style={styles.calenderIconContainer}
        borderWidth={boxBorderSize}
        marginTop={subtitleStyle == 2 ? 0 : 15}
        width={boxWidth}>
          {deliverDateLabels()}
          {/*marginLeft keeps it as the last component in the flexbox, padding makes it
            slightly bigger so that flexbox doesn't expand on a new date on a new row
          */}
          <TouchableOpacity onPress={toggleModal} style={{marginLeft: 'auto', padding: allowMultipleDates ? 5 : 0}}>
            <Image
              style={styles.icon}
              tintColor={!isChecked ? palette.purple : palette.grey}
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
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {enableFlexibleOption(isFlexibleOptionEnabled)}
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
  calenderIconContainer: {
    width: 90 * vmin,
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "flex-start",
    lineHeight: "27px",
  },
  textContainerActive: {
    color: palette.purple,
    fontWeight: 'bold',
    fontSize: 3.8 * vmin,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    height: 10 * vmin,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textContainerInactive: {
    color: palette.grey,
    fontWeight: 'bold',
    fontSize: 3.8 * vmin,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
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

export default SelectDates;
