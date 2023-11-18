import React, { useLayoutEffect } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, HeaderBack, TextInput } from '../components';
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';

const FinishProfile = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <HeaderBack>Finish Profile</HeaderBack>
        <Text style={styles.heading}>Your profile helps us verify you and also builds trust among other DayOff members.</Text>
       
          <View style={styles.addPhotoButton} onPress={() => console.log('Camera button pressed')}>
              <Image style={styles.icon} source={require('../../assets/images/welcome_screen/camera.png')} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
          </View>
        
        <View style={styles.inputGroup}>
          <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label='Country of Residence' placeholder='United States' />
          <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label='Job Title & Company' placeholder='eg.Software Developer @ Google' />
          <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label='LinkedIn Profile URL' placeholder='' />
        </View>
        <Button onPress={() => {}} mode='contained' theme={themes.button} style={styles.button}>
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
  heading:{
    
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
