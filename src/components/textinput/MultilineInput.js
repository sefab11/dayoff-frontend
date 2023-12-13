import { TextInput as TextInputRNP } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Label } from "../label"

const MultilineInput = (props) => {
    const {style, label, children, ...rest} = props
    return (
        <View>
            <Label>{label}</Label>
        <TextInputRNP multiline={true} style={{...styles.textInput, ...style}} {...rest}>
            {children}
        </TextInputRNP>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 8,
        fontFamily: 'Lato-Regular'
    }
})

export default MultilineInput;
