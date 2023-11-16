import { Image as ImageRNP } from "react-native"

const Image = (props) => {
    const {style, children, ...rest} = props
    return (
        <ImageRNP resizeMode='center' style={{...style}} {...rest}>
            {children}
        </ImageRNP>
    )
}

export default Image;
