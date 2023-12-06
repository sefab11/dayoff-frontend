import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { Label } from "../label";


const DateInput = (props) => {
    const [labelSelected, setLabelSelected] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    //on date selected in the calender, switch back to the label
    const onDateChange = (date) => {
        setSelectedDate(date);
        setLabelSelected(false);
    }

    //to switch between label and calender
    const onLabelPress = () => {
        setLabelSelected(!labelSelected);
    }

    function deliverComponent() {
        if (labelSelected){
            return (
            <CalendarPicker onDateChange={onDateChange} />
            );
        }
    }

    //TODO: have a label show with the date on start
    //TODO: when click on the label, prompt a new calender screen
    //TODO: when calender input is done, return to label with new data

    return (
    <View>
        <Pressable onPress={onLabelPress}>
            <Label>{selectedDate} </Label>
        </Pressable>
        {deliverComponent}
    </View>
    );
}



export default DateInput;