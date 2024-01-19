import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, Header, TextInput, PhotoInput, LinkedinInput } from '../components';
import { SelectCountries } from "../components";
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { FinishProfileValidationService } from "../services/ValidationService";

const { isCountryValid, isProfessionValid, handlePhoto,
        handleLinkedin } = FinishProfileValidationService;

const FinishProfile = ({ navigation }) => {
    function generateInputs(numInputs){
        var arr = [];
        /*
            valid elements and value elements need to be states so that they
            are updated in the component.
            required values don't need to be states as they are constants.
        */
        /*TODO: 'required' values are FALSE to be able to run through the app quickly
            when releasing/ testing the input validation change the 'required' values to TRUE
        */
        for (let i = 0; i < numInputs; i++){
            var [value, setValue] = useState('');
            var [valid, setValid] = useState(null);
            var required = false;
            var newInput = {
                'value': value, 'setValue': setValue,
                'valid': valid, 'setValid': setValid,
                'required': required
            }
            arr.push(newInput);
        }
        return arr;
    }

    function areInputsValid(){
        //check if the country is a valid one / replace input with dropdown
        var countryValid = isCountryValid(inputs[0]['value']);
        inputs[0]['valid'] = countryValid;
        inputs[0]['setValid'](countryValid);

        var jobValid = isProfessionValid(inputs[1]['value']);
        inputs[1]['valid'] = jobValid;
        inputs[1]['setValid'](jobValid);

        return (
           (inputs[0]['valid'] || !inputs[0]['required'])
        && (inputs[1]['valid'] || !inputs[1]['required'])
        );
    }

    function updateInput(index, text){
        inputs[index]['value'] = text;
        inputs[index]['setValue'](text);
    }

    function finishProfile(){
        if (areInputsValid()) navigation.navigate('GetMatched');
        else console.log('missing some inputs');
    }

    const [inputs, setInputs] = useState(generateInputs(3));
    inputs[2]['required'] = false;

    const handleLinkedin = (data) => {
        if (data){
            console.log("linkedin added");
            inputs[2]['valid'] = true;
            inputs[2]['setValid'](true);
        }
        else console.log("linkedin not added");
    }

    const handlePhoto = (data) => {
        if (data) console.log("photo added");
        else console.log("no photo added");
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
            <View>
                <Header>Finish Profile</Header>
                <Text style={styles.headingMessage}>Your profile helps us verify you and also builds trust among other DayOff members.</Text>
            </View>
            <PhotoInput width={40 * vmin} camRatio={'30%'}
                onPhotoSelected={(data) => handlePhoto(data)}
            >
                <Text style={styles.addPhotoText}>Add Photo</Text>
            </PhotoInput>

            <View style={styles.inputGroup}>
                <View>
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label='Country of Residence*' placeholder='United States'
                    value={inputs[0]['value']} onChangeText={text => updateInput(0, text)}/>
                    <Text style={styles.invalidMessage}>
                        {inputs[0]['valid'] || inputs[0]['valid'] == null
                        ? ''
                        : 'Invalid Country.'
                        }
                    </Text>
                </View>

                <View>
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label='Job Title & Company*' placeholder='eg.Software Developer @ Google'
                    value={inputs[1]['value']} onChangeText={text => updateInput(1, text)}/>
                    <Text style={styles.invalidMessage}>
                        {inputs[1]['valid'] || inputs[1]['valid'] == null
                        ? ''
                        : 'Invalid profession.'
                        }
                    </Text>
                </View>

                <View marginTop={20}>
                    <LinkedinInput horMargin={10} verMargin={3}
                    onComponentPress={(data) => handleLinkedin(data)}
                    />
                </View>

                {/*
                <TextInput style={styles.textInput} theme={themes.textInput}
                mode='outlined' label='LinkedIn Profile URL' placeholder=''
                value={inputs[2]} onChangeText={text => updateInput(2, text)}/>
                */}

            </View>
            <Button  onPress={() => finishProfile()} mode='contained' theme={themes.button} style={styles.button}>
                Done
            </Button>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 5 * vh,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.white,
  },
  headingMessage:{
    marginTop: 3 * vh,
    alignSelf: 'center',
    width: 85 * vmin,
    fontFamily: 'Lato-Regular',
    fontSize: 3.8 * vmin,
    color: palette.grey
    
  },
  profileImageContainer: {
    alignItems: 'center',
   
    
  },

  icon: {
    width: 40,
    height: 35,
  },
  addPhotoButton: {
    alignItems:'center',
    justifyContent:'center',
    width: 40 * vmin,
    height: 40 * vmin,
    backgroundColor:'#EDEBFA',
    borderRadius: 20 * vmin,
  
  },
  addPhotoText: {
    marginTop: 15,
    fontSize:18,
    color:'#503CC8',
    fontWeight:'700'
  },
  inputGroup: {
    gap: 3.5 * vh,
  },
  textInput: {
    width: 80 * vmin,
    height: 12 * vmin,
    backgroundColor: palette.white,
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    justifyContent: 'center',
    paddingBottom: 0.5 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
  invalidMessage: {
    color: 'red',
    textAlign: 'left',
    flexWrap: 'wrap',
    width: 80 * vmin,
  }
});

export default FinishProfile;
