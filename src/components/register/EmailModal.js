import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button } from "..";
import { palette, themes } from "../../style";


const EmailModal = () => {

    const Section = (props) => {
        const titleText = props.title;
        const subtitleText = props.subtitle;

        return (
        <View style={styles.modalSection}>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{subtitleText}</Text>
            <Button theme={themes.button} style={styles.button}>Fill Out Form</Button>
        </View>
        )
    }



    return (
    <View style={styles.modalPage}>
        <Section title="Professionals without work email" subtitle="Fill out this quick form for verifications to be able to use your personal email to sign up" />
        <Section title="Students without work email" subtitle="Fill out this quick form for verifications to be able to use your school email to sign up" />
    </View>
    );
}

const styles = StyleSheet.create({
    modalPage: {
        backgroundColor: palette.white,
    },
    modalSection: {
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 10,
    },
    button: {
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    }
});


export default EmailModal;