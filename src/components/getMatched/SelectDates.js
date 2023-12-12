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

  const subtitleStyle = props.subtitleStyle;
  var subtitleType;
  if (subtitleStyle == null || subtitleStyle == 1) subtitleType = styles.message;
  else if (subtitleStyle == 2) subtitleType = styles.message2;

  //track the array of dates that are added
  //called array but more like list as items are added dynamically
  const [dates, setDates] = useState([]);


  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2023-11-07T12:00:00.000Z"));
  const [endDate, setEndDate] = useState(new Date("2023-11-10T12:00:00.000Z"));
  const [isChecked, setChecked] = useState(false);

  //either pushes a new date or makes the 0th index the new date
  //depending on whether the multipleDates property is passed as true or false
  function updateDates(newDate){
    if (allowMultipleDates) setDates(dates => [...dates, newDate]);
    else setDates([newDate]);

    //makes it so that whenever theres a first date added, the default date is removed
    //and replaced by the new date
    //default date comes back once theres no dates added
    if (dates[0] == ""){
        dates.shift();
        setDates(dates => [...dates]);
    }
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

    setStartDate(new Date("2023-11-07T12:00:00.000Z"));
    setEndDate(new Date("2023-11-10T12:00:00.000Z"))
  };

  function deliverDateLabels(){
    if (dates == null) return;
    //ensures that theres always at least one element so that the calender icon is fixed to
    //the right of the label

    if (dates.length <= 0){
        setDates(dates => [""]);
    }

    const dateComponents = dates.map((date) =>
        <View>
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
        <Text style={styles.headingText}>
            {title}
        </Text>
    </View>
    );
  };

  function enableSubheader(subheaderOpt){
    if (subheaderOpt == null) return;

    if (subtitleStyle == 1){
        return (
        <View>
            <Text style={styles.message}>
                {subtitle}
            </Text>
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

    //if checked then grey out the label and box
    console.log(isChecked);

    return (
    <View style={styles.checkboxContainer}>
    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? palette.purple : undefined} />
        <Text style={styles.checkText}>I’m flexible with my dates</Text>
    </View>
    );
  };


  //FOR TESTING, REMOVE FOR FINAL BUILD
  function testFunc(){
    updateDates("07 - 10 Nov");
  }

  function testFuncB(){
    removeDate(dates[0]);
  }
  //END OF TEST METHODS



  return (
    <View style={enableUnderLine(showLine)}>
      {enableHeader(title)}
      {enableSubheader(subtitle)}
      <View>
        <View style={styles.calenderIconContainer} borderWidth={boxBorderSize}>
          {deliverDateLabels()}
          <TouchableOpacity onPress={toggleModal}>
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

      {/*TEST COMPONENTS, MAKES TESTING EASIER*/}
      <View>
        <TouchableOpacity onPress={testFunc}>
            <Text>Add test</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={testFuncB}>
            <Text>Remove test</Text>
        </TouchableOpacity>
      </View>
      {/*END OF TEST COMPONENTS*/}
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
    justifyContent: "space-between",
    lineHeight: "27px",
  },
  textContainerActive: {
    color: palette.purple,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textContainerInactive: {
    color: palette.grey,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
    alignSelf: 'flex-end',
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
