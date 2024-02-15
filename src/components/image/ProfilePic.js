import { Image as ImageRNP } from "react-native"

//TODO: add navigation on click to navigate to users info screen

const ProfilePic = (props) => {
    const {style, children, ...rest} = props
    return (
        <ImageRNP resizeMode='center' style={{...style}} {...rest}>
            {children}
        </ImageRNP>
    )
}

export default ProfilePic;
