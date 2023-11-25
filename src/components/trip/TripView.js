import { StyleSheet, View, Text } from 'react-native'
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';

const TripView = (props) => {
    const {style, label, children, ...rest} = props;

    let trip = {};
    trip.country = 'AU';
    country = CountryCodes.filter(c => c.code == trip.country)[0];    
    
    return (
        <View style={styles.trip}>
            <View>
                {
                    flags[country.code] ?
                    <Image style={styles.icon} source={flags[country.code]} /> :
                    <Text>{country.code}</Text>
                }
                <Text>{country.name}</Text>
                <Text>11 - 18 Aug</Text>
            </View>
            <Text>Matched with 8 people:</Text>
            <View>
                <View>

                </View>
                <Button
                    onPress={() => {}}
                    mode='text'
                    theme={themes.button}
                    style={styles.button}
                >
                    +2
                </Button>
            </View>
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