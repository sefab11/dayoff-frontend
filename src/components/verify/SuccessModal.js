import {View, Text, StyleSheet, Image, TouchableWithoutFeedback} from "react-native";
import Modal from "react-native-modal";
import { palette, themes } from "../../style";


const BulletPoint = (props) => {
    const {text, color, style} = props;

    return (
    <View style={style}>
        <Text style={{color: color}}>{'\u2B24'} </Text>
        <Text marginRight={10}>{text}</Text>
    </View>
    )
}


const SuccessModal = (props) => {
    const {transparent, isVisible, onBackdropPress} = props;


    return (
    <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <Modal
        style={styles.modal}
        transparent={transparent}
        isVisible={isVisible}>
            <View style={styles.mainContainer}>
                <View style={styles.iconContainer}>
                    <Image source={require("../../../assets/icons/success.png")} />
                    <Text style={styles.successTitle} >Verification Successful</Text>
                </View>

                <View style={styles.bulletPoints}>
                    <Text style={styles.title}>More Safety Features Coming:</Text>

                    <BulletPoint style={styles.bulletPoint}
                    text='Users will submit in-app recorded video intro to their profile page.'
                    color={palette.lightGreen} />
                    <BulletPoint style={styles.bulletPoint}
                    text='See how many people your travel buddies have traveled with on DayOff to increase trust.'
                    color={palette.lightGreen} />
                    <BulletPoint style={styles.bulletPoint}
                    text='See your travel buddies mutual friends with you and their relationship with them.'
                    color={palette.lightGreen} />
                    <BulletPoint style={styles.bulletPoint}
                    text='Share your trip live location with family and friends.'
                    color={palette.lightGreen} />
                    <BulletPoint style={styles.bulletPoint}
                    text='Find emergency service contact numbers in your trip info.'
                    color={palette.lightGreen} />
                </View>
            </View>
        </Modal>
    </TouchableWithoutFeedback>
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
    },
    iconContainer: {
        borderBottomWidth: 1,
        borderColor: palette.lightGrey,
        alignItems: 'center',
        padding: 30,
        width: '90%',
        alignSelf: 'center',
    },
    successTitle: {
        fontSize: 4 * vmin,
        fontWeight: 'bold',
        marginVertical: 10,
        color: palette.lightGreen,
    },
    bulletPoints: {
        paddingTop: 30,
        paddingBottom: 30,
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 4 * vmin,
        fontWeight: 'bold',
        margin: 10,
    },
    bulletPoint: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row'
    },
})

export default SuccessModal;