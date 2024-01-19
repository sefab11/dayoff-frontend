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
    const [photo, setPhoto] = useState({
        'value': null,
        'valid': null,
        'required': false,
    });
    const [country, setCountry] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [job, setJob] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [linkedin, setLinkedin] = useState({
        'value': null,
        'valid': null,
        'required': false,
    });


    function areInputsValid(){
        //check if the country is a valid one / replace input with dropdown
        country.valid = isCountryValid(country.value);
        //check if job is valid
        job.valid = isProfessionValid(job.value);

        //for testing
        console.log(photo);
        console.log(country);
        console.log(job);
        console.log(linkedin);


        return (
           (photo.valid    || !photo.required)
        && (country.valid  || !country.required)
        && (job.valid      || !job.required)
        && (linkedin.valid || !linkedin.required)
        );
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
            <PhotoInput width={40 * vmin} camRatio={'30%'}
                onPhotoSelected={(data) => handlePhoto(data)}
            >
                <Text style={styles.addPhotoText}>Add Photo</Text>
            </PhotoInput>

            <View style={styles.inputGroup}>
                <View>
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label='Country of Residence*' placeholder='United States'
                    value={country.value}
                    onChangeText={text => setCountry(country =>
                        Object.assign({}, country, {'value': text}))
                    }
                    />

                    <Text style={styles.invalidMessage}>
                        {country.valid || country.valid == null
                        ? ''
                        : 'Invalid Country.'
                        }
                    </Text>

                </View>

                <View>
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label='Job Title & Company*' placeholder='eg.Software Developer @ Google'
                    value={job.value}
                    onChangeText={text => setJob(job =>
                        Object.assign({}, job, {'value': text}))
                    }
                    />

                    <Text style={styles.invalidMessage}>
                        {job.valid || job.valid == null
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
