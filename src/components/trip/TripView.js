import { StyleSheet, View } from "react-native"

const TripView = (props) => {
    const {style, label, children, ...rest} = props;
    
    return (
        <View style={styles.trip}>
            <View>
                <Icon />
                <Text>Australia</Text>
                <Text>11 - 18 Aug</Text>
            </View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    trip: {
        borderRadius: 8,
        fontFamily: 'Lato-Regular'
    },
    icon: {

    }
})

export default TripView;