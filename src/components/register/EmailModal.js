import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Label, Image } from "..";
import { palette, themes } from "../../style";


const EmailModal = ({exitFunc}) => {

    const Section = (props) => {
        const titleText = props.title;
        const subtitleText = props.subtitle;

        return (
        <>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{subtitleText}</Text>
            <Button
                //TODO: add in function that is called on button press
                onPress={() => console.log("TBA form on press")}
                mode='contained'
                compact={true}
                theme={themes.button}
                style={styles.button}
            >
                Fill Out Form
            </Button>
        </>
        )
    }



    return (
    <View style={styles.modalPage}>
        <View style={styles.iconContainer} >
            <TouchableOpacity onPress={() => exitFunc()} >
                <Image source={require("../../../assets/icons/x.png")} />
            </TouchableOpacity>
        </View>


        <View style={styles.sectionContainer} borderBottomWidth={2} >
            <Section
                title="Professionals without work email"
                subtitle="Fill out this quick form for verifications to be able to use your personal email to sign up"
            />
        </View>

        <View style={styles.sectionContainer}>
            <Section
                title="Students without work email"
                subtitle="Fill out this quick form for verifications to be able to use your school email to sign up"
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    modalPage: {
        backgroundColor: palette.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    iconContainer: {
        display: 'flex',
        width: "100%",
        height: "7%",
        alignItems: 'flex-end',
    },
    sectionContainer: {
        margin: 20,
        paddingBottom: 0,
        borderColor: palette.lightGrey,
    },
    title: {
        alignSelf: "center",
        width: 70 * vmin,
        fontFamily: "Lato-Regular",
        fontSize: 4.4 * vmin,
        fontWeight: "700",
        color: "#000000",
    },
    subtitle: {
        marginTop: 1 * vh,
        alignSelf: "center",
        width: 70 * vmin,
        fontFamily: "Lato-Regular",
        fontSize: 3.2 * vmin,
        color: palette.grey,
    },
    button: {
        width: 30 * vmin,
        height: 10 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 2.5 * vh,
        marginBottom: 5 * vh,
    },
});


export default EmailModal;