import { React, useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../../style";
import { StyleSheet } from "react-native";
import CalenderModal from "./CalenderModal";


const monthsIndices = {
    1: 'Jan', 2: 'Feb', 3: 'Mar',
    4: 'Apr', 5: 'May', 6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep',
    10: 'Oct', 11: 'Nov', 12: 'Dec',
}


const DateLabel = (props) => {
    const { date, index, isChecked, removeDate } = props;
    const startDate = date[0];
    const endDate = date[1];

    //for formatting the string in the Text components
    function formatDate(startDate, endDate){
        var parsedStartDate = new Date(startDate);
        let sDate = parsedStartDate.getDate();
        if (sDate < 10) sDate = "0" + sDate.toString();
        let sMonth = monthsIndices[parsedStartDate.getMonth()+1];
        let sYear = parsedStartDate.getYear();


        var parsedEndDate = new Date(endDate);
        let eDate = parsedEndDate.getDate();
        if (eDate < 10) eDate = "0" + eDate.toString();
        let eMonth = monthsIndices[parsedEndDate.getMonth()+1];
        let eYear = parsedEndDate.getYear();

        if (sMonth == eMonth){
            return (sDate + " - " + eDate + " " + sMonth);
        }
        else return (sDate + " " + sMonth + " - " + eDate + " " + eMonth);
    };

    return (
    <View style={styles.dateContainer}
    backgroundColor={!isChecked ? palette.lightPurple : palette.lightGrey2}
    key={index}>
        <Text style={!isChecked ? styles.dateTextActive : styles.dateTextInactive}>
            {formatDate(startDate, endDate)}
        </Text>

        <TouchableOpacity onPress={() => removeDate(date)}>
            <Image style={styles.xIcon}
            tintColor={!isChecked ? palette.black : palette.grey}
            source={require("../../../../assets/icons/x.png")} />
        </TouchableOpacity>
    </View>
    )

}


const SelectManyDates = (props) => {
    //passed in properties
    const {title, titleStyle, label, labelStyle, boxWidth, isFlexible} = props;

    //track the array of dates that are added
    //called array but more like list as items are added dynamically
    const [dates, setDates] = useState(props.init);

    console.log(dates);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isChecked, setChecked] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    //update dates in parent
    useEffect(() => {
        props.onSelectDate(dates);
    }, [dates])

    function updateDates(newDate){
        //makes sure no repeat dates are added
        if (dates.includes(newDate) || newDate.includes("undefined")) return;

        //push new date to array, and update react component
        dates.push(newDate);
        setDates(dates);
    }

    //remove the date from dates and update state
    function removeDate(dateId){
        if (isChecked) return;

        dates.splice(dates.indexOf(dateId), 1);
        setDates(dates => [...dates]);

        setStartDate('');
        setEndDate('');
    }

    const toggleModal = () => {
        if (isChecked) return;

        setModalVisible(!isModalVisible);
        if (!isModalVisible) return;

        //add new data when calender is closed
        const newDate = [startDate, endDate];
        updateDates(newDate);
    }

    //dateSelected parameter will have the date
    //dateType parameter will have either "START_DATE" or "END_DATE"
    function onDateSelected(dateSelected, dateType){
        //on start date changed null will be returned after the date so ignore those calls
        if (dateSelected == null || dateType == null) return;

        if (dateType == "START_DATE") setStartDate(dateSelected);
        else if (dateType == "END_DATE") setEndDate(dateSelected);
    };


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
            width={boxWidth}>
                {dates == null ? null
                : dates.map((date, index) =>
                <DateLabel
                date={date}
                index={index} isChecked={isChecked}
                removeDate={removeDate} />
                )}


                <TouchableOpacity onPress={toggleModal}
                style={{marginLeft: 'auto', alignSelf: 'center'}}>
                    <Image style={styles.icon}
                    tintColor={!isChecked ? palette.purple : palette.grey}
                    source={require("../../../../assets/icons/calendar.png")} />
                </TouchableOpacity>
            </View>
            {/* Modal */}
            <CalenderModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            onDateSelected={onDateSelected}
            />
        </View>
        {isFlexible
        ?
        <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}
            color={isChecked ? palette.purple : undefined} />
            <Text style={styles.checkText}>I haven’t decided yet</Text>
        </View>
        : null
        }
    </View>
    )
};


const styles = StyleSheet.create({
  selectDateWrap: {
    paddingTop:5,
    paddingBottom:35,
    borderBottomWidth:1,
    borderBottomColor:'#D7D7D7',
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
    marginTop: 15,
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
    backgroundColor: 'white',
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

export default SelectManyDates;
