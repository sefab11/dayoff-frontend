import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { dimensions, palette } from '../../style';
import { MessageInput } from '../textinput';
import React, { useState, useEffect } from "react";

[vw, vh, vmin, vmax] = dimensions

const ChatFooter = (props) => {
    const {style, ...rest} = props;

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        // send message to chat screen
        props.setSentMessage(message);

        setMessage("");
    }

    return (
        <View style={{...styles.footer, ...style}} {...rest}>
            <IconButton
                style={{...styles.icon, padding: 10}}
                icon={require('../../../assets/icons/plus.png')}
                iconColor={palette.purple}
                size={3 * vh}
                /* TODO: add image to message on press */
                onPress={() => {}}
            />
            {/* TODO: return message on enter */}
            <MessageInput
                value={message}
                setValue={setMessage}
                sentMessage={sendMessage}
            />
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/smile.png')}
                iconColor={palette.purple}
                size={3 * vh}
                /* TODO: add emoji to message on press */
                onPress={() => {}}
            />
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/mic.png')}
                iconColor={palette.purple}
                size={3 * vh}
                /* TODO: add voice recording to message */
                onPress={() => {}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        width: 100 * vw,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 4 * vmin
    },
    icon: {
        margin: 0
    }
})

export default ChatFooter;