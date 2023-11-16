import { Text } from "react-native-paper"
import { StyleSheet } from "react-native"

const Label = (props) => {
    const {style, children, ...rest} = props
    return (
        <Text style={{...styles.label, ...style}} {...rest}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Bold'
    }
})

export default Label;
