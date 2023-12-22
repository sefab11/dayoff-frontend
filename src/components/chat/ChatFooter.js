import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { dimensions, palette } from '../../style';
import { MessageInput } from '../textinput';

[vw, vh, vmin, vmax] = dimensions

const ChatFooter = (props) => {
    const {style, ...rest} = props;

    return (
        <View style={{...styles.footer, ...style}} {...rest}>
            <IconButton
                style={{...styles.icon, padding: 10}}
                icon={require('../../../assets/icons/plus.png')}
                iconColor={palette.purple}
                size={3 * vh}
                onPress={() => {}}
            />
            <MessageInput />
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/smile.png')}
                iconColor={palette.purple}
                size={3 * vh}
                onPress={() => {}}
            />
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/mic.png')}
                iconColor={palette.purple}
                size={3 * vh}
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