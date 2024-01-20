import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";


const ShowSelectedDate = (props) => {
    //passed in properties
    const {title, titleStyle, label, labelStyle, boxWidth, initialDates} = props;

    //track the array of dates that are added
    //called array but more like list as items are added dynamically
    const [dates, setDates] = useState(initialDates);

    return (
    <View style={styles.selectDateWrap}>
        <View>
            <Text style={titleStyle}>{title}</Text>
        </View>

        <View>
            <Text style={labelStyle}>{label}</Text>
        </View>

        <View style={styles.calenderIconContainer} width={boxWidth}>
            {dates == null ? null
            :
            dates.map((date, index) =>
            <View style={styles.dateContainer}
            backgroundColor={palette.lightGrey2}
            key={index}>
                <Text style={styles.dateTextInactive}>{date}</Text>

                <TouchableOpacity onPress={() => {}}>
                    <Image style={styles.xIcon}
                    tintColor={palette.grey}
                    source={require("../../../assets/icons/x.png")} />
                </TouchableOpacity>
            </View>
            )}

            <TouchableOpacity onPress={() => {}}
            style={{marginLeft: 'auto', alignSelf: 'center'}}>
                <Image style={styles.icon}
                tintColor={palette.grey}
                source={require("../../../assets/icons/calendar.png")} />
            </TouchableOpacity>
        </View>
        {/* no modal or checkbox required */}
    </View>
    );
};


const styles = StyleSheet.create({
  selectDateWrap: {
    paddingTop:5,
    paddingBottom:0,
    borderBottomWidth:0,
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
    marginTop: 0,
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

export default ShowSelectedDate;
