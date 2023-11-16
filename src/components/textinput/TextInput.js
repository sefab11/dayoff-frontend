import { TextInput as TextInputRNP } from "react-native-paper"
import { StyleSheet } from "react-native"

const TextInput = (props) => {
    const {style, children, ...rest} = props
    return (
        <TextInputRNP style={{...styles.textInput, ...style}} {...rest}>
            {children}
        </TextInputRNP>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 8,
        fontFamily: 'Lato-Regular'
    }
})

export default TextInput;
