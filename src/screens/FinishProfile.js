import React, {useLayoutEffect} from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Image } from "react-native";
import { Button, HeaderBack, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default FinishProfile = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => null, // This hides the back arrow
        });
      }, [navigation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Finish Profile</HeaderBack>
                      {/* Add photo section */}
                      <View style={styles.profileImageContainer}>
                       {/* Add photo section */}
        
          <Button
            onPress={() => {
              // Add your logic for handling the camera button press here
              console.log('Camera button pressed');
            }}
            mode="contained"
            theme={themes.button}
           
          >
          
         
          </Button>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Country of Residence" placeholder='United States'/>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Job Title & Company" placeholder='eg.Software Developer @ Google'/>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="LinkedIn Profile URL" placeholder=''/>
                </View>
                <Button
                    onPress={() => {}}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                >
                    Done
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    profileImageContainer: {
   
      },
      icon: {
        width: 20, 
        height: 20, 
        marginRight: 10, 
      },
    inputGroup: {
        gap: 3.5 * vh
    },
    textInput: {
        width: 80 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.white
    },
    button: {
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    }
})