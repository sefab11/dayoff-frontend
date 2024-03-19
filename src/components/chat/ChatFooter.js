import { IconButton } from 'react-native-paper';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { dimensions, palette } from '../../style';
import { MessageInput } from '../textinput';
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker from 'rn-emoji-keyboard'

[vw, vh, vmin, vmax] = dimensions

const ChatFooter = (props) => {
    const {style, ...rest} = props;

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const [showEmojis, setShowEmojis] = useState(false);
    const toggleShowEmojis = () => setShowEmojis(!showEmojis);

    const sendMessage = () => {
        // send message to chat screen
        props.setSentMessage(message);

        setMessage("");
    }

    useEffect(() => {
        //TODO: whenever image is updated then prepend it to the message
        console.log(image)
    }, [image])



    return (
        <View style={{...styles.footer, ...style}} {...rest} paddingBottom={showEmojis ? 40 * vh: 4 * vmin}>
            {// dont show regular footer when emojis selected
            showEmojis ?
            <EmojiPicker onEmojiSelected={(e) => {
                // TODO: update message on emoji selected
                console.log(e);
                toggleShowEmojis();
            }}
            open={showEmojis}
            onClose={() => toggleShowEmojis()} />
            :
            <>
                <IconButton
                    style={{...styles.icon, padding: 10}}
                    icon={require('../../../assets/icons/plus.png')}
                    iconColor={palette.purple}
                    size={3 * vh}
                    /* TODO: add image to message on press */
                    onPress={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: false,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled){
                            setImage(result.assets[0].uri);
                        }
                    }}
                />
                <MessageInput
                    /* returns sentMessage on enter */
                    value={message}
                    setValue={setMessage}
                    sentMessage={sendMessage}
                />
                <IconButton
                    style={styles.icon}
                    icon={require('../../../assets/icons/smile.png')}
                    iconColor={palette.purple}
                    size={3 * vh}
                    /* toggle emoji selector */
                    onPress={() => toggleShowEmojis()}
                />
                <IconButton
                    style={styles.icon}
                    icon={require('../../../assets/icons/mic.png')}
                    iconColor={palette.purple}
                    size={3 * vh}
                    /* TODO: add voice recording to message */
                    onPress={() => {}}
                />
            </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
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