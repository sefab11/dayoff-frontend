import { useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, Header, TextInput } from '../components';
import SelectDates from '../components/getMatched/SelectDates';
import SelectCountries from '../components/getMatched/SelectCountries';
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';

const GetMatchedScreen = ({ navigation }) => {

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = date => {
      setSelectedDate(date);
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View>
        <Header>Get Matched</Header>
        <Text style={styles.message}>This enables us to match you with others going to the same country at the same dates as you.</Text>
        </View>
        <SelectDates title={"Select all your days off for the year"} subtitle={"Which weeks of the months are you taking days off to go on a trip"} isFlexible={true}/>
        <SelectCountries/>
        <View style={styles.buttonGroup}>
        <Button onPress={() => navigation.replace('Home')} mode='contained' theme={themes.button} style={styles.button}>
          Done
        </Button>
        </View>
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
        backgroundColor: palette.white
    },
    message: {
        marginTop: 3 * vh,
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.8 * vmin,
        color: palette.grey
    },
    segmentedInput: {
        width: 80 * vmin
    },
    segment: {
        height: 17 * vmin,
        backgroundColor: palette.white,
        fontSize: 5 * vmin
    },
    buttonGroup: {
        gap: 2 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin
    }
})

export default GetMatchedScreen;
