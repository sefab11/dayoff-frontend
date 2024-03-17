import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../../style";
import { StyleSheet } from "react-native";


const formatDate = (startDate, endDate) => {
    const monthNames = {
        0: 'Jan', 1: 'Feb',
        2: 'Mar', 3: 'Apr',
        4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug',
        8: 'Sep', 9: 'Oct',
        10: 'Nov', 11: 'Dec'
    };

    //parse the details of each string date inputs
    //convert to date then get date, month, year of each
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const dateDetails = {
        startDate: parsedStartDate.getDate(),
        startMonth: monthNames[parsedStartDate.getMonth()],
        endDate: parsedEndDate.getDate(),
        endMonth: monthNames[parsedEndDate.getMonth()],
    }

    var dateString = "";
    //check if months are the same
    if (dateDetails.startMonth == dateDetails.endMonth){
        //change the string as day1 - day2 month
        dateString = dateDetails.startDate + " - " + dateDetails.endDate
        + " " + dateDetails.startMonth;
    }
    else{
        //change the string as day1 month1 - day2 month2
        dateString = dateDetails.startDate + " " + dateDetails.startMonth + " - "
        + dateDetails.endDate + " " + dateDetails.endMonth;
    }

    return dateString;
}


const DateLabel = (props) => {
    const { date, index } = props;

    return (
    <View style={styles.dateContainer}
    backgroundColor={palette.lightGrey2}
    key={index}>
        <Text style={styles.dateTextInactive}>{formatDate(date[0], date[1])}</Text>
    </View>
    )
}


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
            : dates.map((date, index) =>
            <DateLabel date={date} index={index} />
            )}
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
  dateTextInactive: {
    color: palette.grey,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 5 * vmin,
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
});

export default ShowSelectedDate;
