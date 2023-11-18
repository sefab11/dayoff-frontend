
import { View, Keyboard, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Button, Header, TextInput } from '../components';
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';

const GetMatchedScreen = ({ navigation }) => {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View>
        <Header>Get Matched</Header>
        <Text style={styles.headingMessage}>This enables us to match you with others going to the same country at the same dates as you.</Text>
        </View> 
     
        <Button onPress={() => {}} mode='contained' theme={themes.button} style={styles.button}>
          Done
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

});

export default GetMatchedScreen;
