import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, Header, TextInput, PhotoInput, LinkedinInput } from '../components';
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const FinishProfile = ({ navigation }) => {
    //for validating whether the fields have been entered
    //for running through the flow quicker, change the required value to false
    const [inputs, setInputs] = useState([
        {'val': '', 'required': true},
        {'val': '', 'required': true},
        {'val': '', 'required': false},
    ])
    function updateInputs(index, value){
        if (index == 0)      setInputs([value,     inputs[1], inputs[2]]);
        else if (index == 1) setInputs([inputs[0], value,     inputs[2]]);
        else if (index == 2) setInputs([inputs[0], inputs[1], value]);
    }

    function areInputsValid(){
        //TODO: check if fields are valid
        //first check if any required field is empty
        for (let i = 0; i < inputs.length; i++){
            if (inputs[i]['val'] == '' && inputs[i]['required']) return false;
        }
        //check if the country is a valid one / replace input with SelectCountry
        if (!isCountryValid()) return false;
        //EITHER have dropdown for list of professions? or no validation

        return true;
    }

    function isCountryValid(){
        /*TODO: check if country is valid?
                or change the textinput to a dropdown selector
        */
        return true;
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
                <TextInput style={styles.textInput} theme={themes.textInput}
                mode='outlined' label='Country of Residence*' placeholder='United States'
                value={inputs[0]} onChangeText={text => updateInputs(0, text)}/>

                <TextInput style={styles.textInput} theme={themes.textInput}
                mode='outlined' label='Job Title & Company*' placeholder='eg.Software Developer @ Google'
                value={inputs[1]} onChangeText={text => updateInputs(1, text)}/>

                <View marginTop={20}>
                    <LinkedinInput horMargin={10} verMargin={5}/>
                </View>

                {/*
                <TextInput style={styles.textInput} theme={themes.textInput}
                mode='outlined' label='LinkedIn Profile URL' placeholder=''
                value={inputs[2]} onChangeText={text => updateInputs(2, text)}/>
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
    width: 70 * vmin,
    height: 14 * vmin,
    justifyContent: 'center',
    paddingBottom: 0.5 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
});

export default FinishProfile;
