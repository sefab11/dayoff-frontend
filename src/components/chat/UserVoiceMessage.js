import { Text, View, StyleSheet } from "react-native"; 
import { dimensions, palette } from '../../style';
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "react-native-paper";

// Allow the play voice messages sent by other users
[vw, vh, vmin, vmax] = dimensions

// Reminder: IOS Reqs npx pod-install and relevant packages
const UserVoiceMessage = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const { style, children, ...rest } = props;
    const { time, audioSource } = props;

    const audioRef = useRef(new Audio(audioSource))
    
    const togglePlayPause = () => {
        const audio = audioRef.current; 
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play() 
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
                <div style={styles.message}>
                    <Button mode="contained" onPress={() => {togglePlayPause()
                    }}>
                    <FontAwesomeIcon 
                    icon="fa-regular fa-waveform-lines"
                    />
                    </Button>
                </div>
            </View>
            <Text style={styles.timeText}>{time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        width: 85 * vmin,
    },
    messageBubble: {
        alignSelf: 'flex-end',
        backgroundColor: palette.purple,
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomRightRadius: 0,
        pointerEvents: cursor
    },
    message: {
        color: palette.white,
        fontFamily: "Lato-Regular",
        fontSize: 4.5 * vmin,
    },
    timeText: {
        color: palette.grey,
        fontSize: 3.8 * vmin,
        paddingTop: 1 * vh,
        alignSelf: 'flex-end',
    }
})

export default UserVoiceMessage;