import { TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Label } from "../label"
import { useState } from "react"

const PasswordInput = (props) => {
    const {style, label, children, ...rest} = props;

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    
    return (
        <View>
            <Label>{label}</Label>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={{...styles.textInput, ...style}}
                {...rest}
                right={
                    <TextInput.Icon
                        icon={secureTextEntry ? 'eye-off' : 'eye'}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                }
            >
                {children}
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 8,
        fontFamily: 'Lato-Regular'
    },
    icon: {
        backgroundColor: 'red'
    }
})

export default PasswordInput;
