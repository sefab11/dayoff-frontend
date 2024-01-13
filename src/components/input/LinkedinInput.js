import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../";
import { StyleSheet } from "react-native";
import { React, useState } from "react";
import { palette, themes } from "../../style";

const LinkedinInput = (props) => {
    const marginHorizontal = props.horMargin;
    const marginVertical = props.verMargin;


    return (
    <>
        <TouchableOpacity
            style={styles.connectContainer}
            //TODO: function call to connect to linkedin
            onPress={() => console.log("TBA connect linkedin on press")}
        >
            <Image
                source={require("../../../assets/icons/linkedin.png")}
                tintColor={palette.linkedinBlue}
                style={{
                    height: 5 * vh,
                    width: 5 * vh,
                    marginLeft: marginHorizontal, marginRight: marginHorizontal,
                    marginTop: marginVertical, marginBottom: marginVertical,
                }}
            />

            <View paddingRight={10} >
                <Text style={styles.connectText}>Connect your Linkedin</Text>
            </View>

        </TouchableOpacity>
    </>
    )
}

const styles = StyleSheet.create({
    connectContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.lightGrey,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    connectText: {
        color: palette.linkedinBlue,
        fontWeight: 'bold',
        fontSize: 4 * vmin,
    },
})


export default LinkedinInput;