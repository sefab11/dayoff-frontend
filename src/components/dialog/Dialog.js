import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Label, Image } from "..";
import { palette, themes } from "../../style";


const Dialog = ({title, details, buttonLabel, onButtonPress}) => {
    return (
    <View style={styles.modalPage}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{details}</Text>
      <Button
        onPress={onButtonPress}
        mode='contained'
        theme={themes.button}
        style={styles.button}
      >
        {buttonLabel}
      </Button>
    </View>
    );
}

const styles = StyleSheet.create({
  modalPage: {
    padding: 2 * vh,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    width: 35 * vmin,
    height: 14 * vmin,
    justifyContent: 'center',
    paddingBottom: 0.5 * vmin,
    marginTop: 2 * vh
  },

});


export default Dialog;