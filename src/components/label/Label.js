import { Text } from "react-native-paper"
import { StyleSheet } from "react-native"
import { dimensions } from "../../style"

[vw, vh, vmin, vmax] = dimensions

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
        fontFamily: 'Lato-Bold',
        marginTop: 1 * vh,
        marginBottom: 0.5 * vh
    }
})

export default Label;
