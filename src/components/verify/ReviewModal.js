import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import { palette, themes } from "../../style";


const ReviewModal = (props) => {
    const {transparent, isVisible, onBackdropPress} = props;


    return (
    <Modal
    style={styles.modal}
    transparent={transparent}
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}>
        <View style={styles.mainContainer}>
            <View style={{width: '100%', height: '7.5%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => props.onPress()}>
                    <Image
                    source={require("../../../assets/icons/x.png")}
                    resizeMode={'center'}
                    />
                </TouchableOpacity>
            </View>

            <Image source={require("../../../assets/icons/clock.png")} />
            <Text style={styles.title}>We are Reviewing your documents</Text>
            <Text style={styles.message}>It can take 1-5 working days to get feedback</Text>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        width: '80%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        backgroundColor: palette.white,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 50,
    },
    title: {
        fontSize: 4.2 * vmin,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'left',
    },
    message: {
        fontSize: 3.2 * vmin,
        fontWeight: 'normal',
        color: palette.grey,
    }
})

export default ReviewModal;