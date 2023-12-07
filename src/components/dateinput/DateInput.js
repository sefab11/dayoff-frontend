import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { Label } from "../label";
import { TextInput as TextInputRNP } from "react-native-paper"



const DateInput = (props) => {
    const {style, label, children, ...rest} = props
    return (
        <View>
            <Label>{label}</Label>
        <TextInputRNP style={{...styles.textInput, ...style}} {...rest}>
            {children}
        </TextInputRNP>
        </View>
    )
    {/*TODO: have a label show with the date on start*/}
    {/*TODO: when click on the label, prompt a new calender screen*/}
    {/*TODO: when calender input is done, return to label with new data*/}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});


export default DateInput;