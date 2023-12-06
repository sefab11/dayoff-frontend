import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';


import { Label } from "../label";


const DateInput = (props) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    //TODO: have a label show with the date on start
    //TODO: when click on the label, prompt a new calender screen
    //TODO: when calender input is done, return to label with new data

    return (
    <View style={styles.container}>
        <CalendarPicker onDateChange={setSelectedStartDate} />

        <View>
            <Label>Selected date: { selectedStartDate } </Label>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});

export default DateInput;