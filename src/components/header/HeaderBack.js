import { View, Text } from "react-native";

const HeaderBack = (props) => {
    const {style, children, ...rest} = props
    return (
        <View style={{...style}} {...rest}>
            <Text>{children}</Text>
        </View>
    )
}

export default HeaderBack;