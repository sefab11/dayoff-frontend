import { TextInput as TextInputRNP } from "react-native-paper"
import { StyleSheet } from "react-native"
import React, { useState } from "react";
import { themes } from "../../style"


const MessageInput = (props) => {
    const {style, ...rest} = props;

    return (
        <TextInputRNP style={{...styles.textInput, ...style}} theme={themes.textInput}
        mode='outlined' {...rest} value={props.value} onChangeText={text => props.setValue(text)}
        /* on enter key update that message is done */
        onSubmitEditing={props.sentMessage} />
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 12 * vmin,
        width: 60 * vmin,
        borderRadius: 8,
        fontFamily: 'Lato-Regular'
    }
})

export default MessageInput;
