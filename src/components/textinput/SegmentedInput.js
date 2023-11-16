import { TextInput } from "react-native-paper"
import { StyleSheet, View, Text } from "react-native"
import { Label } from "../label"
import { dimensions } from "../../style"

[vw, vh, vmin, vmax] = dimensions

const SegmentedInput = (props) => {
    const {style, label, children, ...rest} = props;

    let segments = [];
    for (let i = 0; i < props.number; i++) {
        segments.push(
            <TextInput key={i} style={{...styles.segment, ...props.segmentStyle}} {...rest} />
        )
    }

    return (
        <View style={{...style}}>
            <Label>{label}</Label>
            <View style={styles.segmentGroup}>
                {segments}
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
        fontFamily: 'Lato-Regular'
    }
})

export default SegmentedInput;
