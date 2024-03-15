import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { palette, themes } from "../../style";

// README: old component, not used anymore


const EmailModal = ({exitFunc}) => {

    const Section = (props) => {
        const titleText = props.title;
        const subtitleText = props.subtitle;

        return (
        <>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{subtitleText}</Text>
            {/*TODO: add in function that is called on button press*/}
            <TouchableOpacity
                onPress={() => console.log("TBA form on press")}
                mode="contained"
                style={styles.button}
            >
                <Text
                    style={{
                        fontFamily: 'Lato-Regular',
                        color: palette.white,
                        fontWeight: '600',
                    }}
                >
                    Fill Out Form
                </Text>
            </TouchableOpacity>
        </>
        )
    }



    return (
    <View style={styles.modalPage}>
        <View style={styles.iconContainer} >
            <TouchableOpacity onPress={() => exitFunc()} >
                <Image
                    source={require("../../../assets/icons/x.png")}
                    resizeMode={'center'}
                    marginRight={-12.5}
                />
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
        height: "5%",
        alignItems: 'flex-end',
        justifyContent: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 2.5 * vh,
        marginBottom: 5 * vh,
        backgroundColor: palette.purple,
        borderRadius: 8,
    },
});


export default EmailModal;