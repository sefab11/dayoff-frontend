import { StyleSheet, View, Text } from 'react-native'
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';
import { dimensions } from '../../style';
import { palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const TripView = (props) => {
    const {style, label, children, ...rest} = props;

    let trip = {};
    trip.country = 'AU';
    trip.group = [
        {
            name: 'Sefa',
            profilePic: null
        },
        {
            name: 'Puspita',
            profilePic: null
        },
        {
            name: 'Nandini',
            profilePic: null
        },
        {
            name: 'Devarshi',
            profilePic: null
        },
        {
            name: 'Lee',
            profilePic: null
        },
        {
            name: 'Bruno',
            profilePic: null
        },
        {
            name: 'Craig',
            profilePic: null
        },
        {
            name: 'Mary',
            profilePic: null
        }
    ]
    country = CountryCodes.filter(c => c.code == trip.country)[0];    
    
    return (
        <View style={styles.trip}>
            <View style={styles.topGroup}>
                <View style={styles.countryGroup}>
                    {
                        flags[country.code] ?
                        <Image style={styles.icon} source={flags[country.code]} /> :
                        <Text style={styles.countryText}>{country.code}</Text>
                    }
                    <Text style={styles.countryText}>{country.name}</Text>
                </View>
                <Text style={styles.dateText}>11 - 18 Aug</Text>
            </View>
            <Text style={styles.matchedText}>Matched with 8 people:</Text>
            <View style={styles.middleGroup}>
                <View style={styles.profilePicsGroup}>
                    {(() => {
                        const profilePics = [];
                        for(let i = 0; i < trip.group.length; i++) {
                            if(i == 6) break;

                            if(trip.group[i].profilePic)
                                profilePics.push(<Image style={styles.profilePic} key={i}></Image>);
                            else
                                profilePics.push(<Text style={styles.profilePic} key={i}>{trip.group[i].name[0]}</Text>);
                        }
                        return profilePics;
                    })()}
                </View>
                {
                    trip.group.length > 6 ?
                    <Button
                        mode="text"
                        labelStyle={{marginHorizontal: 0}}
                        style={styles.showGroupButton}
                        theme={themes.button}
                    >
                        +{trip.group.length - 6}
                    </Button> :
                    null
                }

            </View>
            <View style={styles.bottomGroup}>
                <Button
                    mode="contained"
                    labelStyle={{marginHorizontal: 0}}
                    style={styles.joinButton}
                    theme={themes.button}
                >
                    Join the trip
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trip: {
        width: 85 * vmin,
        paddingVertical: 4 * vmin,
        paddingHorizontal: 6 * vmin,
        borderColor: palette.lightGrey2,
        borderWidth: 2,
        borderRadius: 18,
        gap: 2 * vmin
    },
    topGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16 * vmin,
        alignItems: 'center',
        marginBottom: 1 * vmin
    },
    countryGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1 * vmin
    },
    countryText: {
        fontFamily: 'Lato-Bold',
        fontSize: 2.2 * vh
    },
    icon: {
        width: 4 * vh,
        resizeMode: 'contain'
    },
    dateText: {
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh
    },
    matchedText: {
        color: palette.grey,
        fontFamily: 'Lato-Regular',
        fontSize: 1.8 * vh
    },
    middleGroup: {
        padding: 0,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 1 * vmin
    },
    profilePicsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: -1 * vh
    },
    profilePic: {
        display: 'flex',
        width: 12 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.purple,
        borderRadius: 6 * vmin,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 6 * vmin,
        color: palette.white,
        borderColor: palette.white,
        borderWidth: 0.8 * vmin,
    },
    showGroupButton: {
        minWidth: 0,
        maxWidth: 5 * vh,
        width: 5 * vh
    },
    bottomGroup: {
        flexDirection: 'row'
    },
    joinButton: {
        width: 35 * vmin,
        height: 12 * vmin,
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default TripView;