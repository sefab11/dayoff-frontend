import { Image as ImageRNP } from "react-native-paper"

const Image = (props) => {
    const {style, children, ...rest} = props
    return (
        <ImageRNP style={{...style}} {...rest}>
            {children}
        </ImageRNP>
    )
}

export default Image;
