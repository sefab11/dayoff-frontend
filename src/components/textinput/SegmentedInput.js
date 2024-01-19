import { TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Label } from "../label"
import { dimensions } from "../../style"
import { useRef, useState } from "react"

[vw, vh, vmin, vmax] = dimensions

const SegmentedInput = (props) => {
    const {style, label, labelStyle, children, ...rest} = props;
    const [verificationCode, setVerificationCode] = useState(Array.from({ length: props.length }, () => ''));
    const segmentRefs = Array.from({ length: props.length }, () => useRef(null));
    let segments = [];

    const onChange = (value, key) => {
        if (key < props.length - 1 && value) {
            segmentRefs[key + 1].current.focus();
        }
        let code = [...verificationCode];
        code[key] = value;
        setVerificationCode(code);

        //pass the code to the parent as well
        props.onCodeChange(code);
    }

    onFocus = (event, key) => {
        if (!verificationCode.join('')) {
            segmentRefs[0].current.focus();
        }
    }

    const onKeyPress = (event, key) => {
        if (key > 0 && !verificationCode[key] && event.key === 'Backspace') {
            segmentRefs[key - 1].current.focus();
        }
    }

    return (
        <View style={{...style}}>
            <Label style={labelStyle}>{label}</Label>
            <View style={styles.segmentGroup}>
                {
                    segmentRefs.map((ref, i) => {
                        return (
                            <TextInput
                                key={i}
                                ref={ref}
                                maxLength={1}
                                textAlign={'center'}
                                autoCapitalize={'characters'}
                                style={{...styles.segment, ...props.segmentStyle}}
                                {...rest}
                                selectTextOnFocus={true}
                                onFocus={e => onFocus(e, i)}
                                onChangeText={value => onChange(value, i)}
                                onKeyPress={({nativeEvent}) => onKeyPress(nativeEvent, i)}
                            />
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    segmentGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    segment: {
        width: 14 * vmin,
        borderRadius: 8,
        fontFamily: 'Lato-Regular',
        padding: 0,
    }
})

export default SegmentedInput;
