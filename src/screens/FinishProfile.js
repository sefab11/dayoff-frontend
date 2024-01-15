import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, Header, TextInput, PhotoInput, LinkedinInput } from '../components';
import { SelectCountries } from "../components";
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const FinishProfile = ({ navigation }) => {
    /*TODO: 'required' values are FALSE to be able to run through the app quickly
        when releasing/ testing the input validation change the 'required' values to TRUE
    */
    const [inputs, setInputs] = useState([
        {'value': useState(''), 'required': false,  'valid': useState(null)},
        {'value': useState(''), 'required': false,  'valid': useState(null)},
    ])

    function updateInput(index, text){
        inputs[index]['value'][0] = text;
        inputs[index]['value'][1](text);
    }

    function areInputsValid(){
        //check if the country is a valid one / replace input with dropdown
        var countryValid = isCountryValid();
        inputs[0]['valid'][0] = countryValid;
        inputs[0]['valid'][1](countryValid);

        var jobValid = isProfessionValid();
        inputs[1]['valid'][0] = jobValid;
        inputs[1]['valid'][1](jobValid);

        return (
           (inputs[0]['valid'][0] || !inputs[0]['required'])
        && (inputs[1]['valid'][0] || !inputs[1]['required'])
        );
    }

    function isCountryValid(){
        /*TODO: check if country is valid?
                or change the textinput to a dropdown selector
        */
        return inputs[0]['value'][0] != '';
    }

    function isProfessionValid(){
        //may not need any validation
        return inputs[1]['value'][0] != '';
    }

    function finishProfile(){
        if (areInputsValid()) navigation.navigate('GetMatched');
        else console.log('missing some inputs');
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
            <View>
                <Header>Finish Profile</Header>
                <Text style={styles.headingMessage}>Your profile helps us verify you and also builds trust among other DayOff members.</Text>
            </View>
            <PhotoInput width={40 * vmin} camRatio={'30%'}>
                <Text style={styles.addPhotoText}>Add Photo</Text>
            </PhotoInput>

            <View style={styles.inputGroup}>
                <View>
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label='Country of Residence*' placeholder='United States'
                    value={inputs[0]['value']} onChangeText={text => updateInput(0, text)}/>
                    <Text style={styles.invalidMessage}>
                        {inputs[0]['valid'][0] || inputs[0]['valid'][0] == null
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
                        {inputs[1]['valid'][0] || inputs[1]['valid'][0] == null
                        ? ''
                        : 'Invalid profession.'
                        }
                    </Text>
                </View>

                <View marginTop={20}>
                    <LinkedinInput horMargin={10} verMargin={3}/>
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
