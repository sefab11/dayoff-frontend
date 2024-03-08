import { StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, View, Image, ScrollView, Text } from "react-native";
import { palette, dimensions } from "../style";
import { useNavigation } from '@react-navigation/native';
import UserService from "../services/UserService";

const { leaveTrip } = UserService;
[vw, vh, vmin, vmax] = dimensions

const UserInfo = (props) => {
    const {name, country, job, pic, isLastMember} = props;
    const navigation = useNavigation();

    return (
    <TouchableOpacity style={styles.memberContainer} borderBottomWidth={isLastMember ? 0 : 1}
    onPress={() => navigation.navigate('UserInfo')}>
        {pic == null
        ? <Text style={styles.emptyProfilePic}>{name[0]}</Text>
        : <Image source={pic} style={styles.profilePic} />
        }
        <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{name}</Text>
            <Text style={styles.memberJob}>{country} - {job}</Text>
        </View>
    </TouchableOpacity>
    )
}


export default GroupInfoScreen = ({ navigation }) => {
    const emailAddress = global.emailAddress;
    const trip = global.currentTrip;


    //TODO: get members data from chatscreen / backend
    const currentUserId = "2";
    const members = [
        {
            id: "1",
            name: 'Jane',
            countryOfOrigin: 'USA',
            job: 'Product Manager @ Apple',
            profilePic: require('../../assets/images/profilePics/1.jpg'),
        },
        {
            id: "2",
            name: 'Gunpei',
            countryOfOrigin: 'UK',
            job: 'Brand Designer @ Meta',
            profilePic: require('../../assets/images/profilePics/2.jpg'),
        },
        {
            id: "3",
            name: 'Peter',
            countryOfOrigin: 'France',
            job: 'Backend Engineer @ Uber',
            profilePic: require('../../assets/images/profilePics/3.jpg'),
        },
        {
            id: "4",
            name: 'Summer',
            countryOfOrigin: 'Canada',
            job: 'Game Developer @ EA Sports',
            profilePic: require('../../assets/images/profilePics/4.jpg'),
        },
        {
            id: "5",
            name: 'Miryam',
            countryOfOrigin: 'USA',
            job: 'Recruiter @ Microsoft',
            profilePic: require('../../assets/images/profilePics/5.jpg'),
        },
        {
            id: "6",
            name: 'Ambuj',
            countryOfOrigin: 'UK',
            job: 'Game Developer @ Rockstar',
            profilePic: require('../../assets/images/profilePics/6.jpg'),
        },
        {
            id: "7",
            name: 'Craig',
            countryOfOrigin: 'Scotland',
            job: 'Front Developer @ DayOff',
            profilePic: null
        },

    ]

    const leaveFromTrip = async () => {
        await leaveTrip(trip.trip_id, emailAddress)
        .then(status => {
            if (status === 200) navigation.replace('Home');
        })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <View style={styles.header}>
                    <TouchableOpacity style={{justifyContent: 'center'}}
                    onPress={() => navigation.goBack()}>
                        <Image style={styles.returnButton}
                        source={require("../../assets/icons/chevron_left.png")} />
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.header1}>Group Info</Text>
                        <Text style={styles.header2}>{members.length} Members</Text>
                    </View>

                    <TouchableOpacity onPress={() => leaveFromTrip()}
                    style={{justifyContent: 'center'}}>
                        <Image style={styles.exitButton}
                        source={require("../../assets/icons/exit.png")} />
                    </TouchableOpacity>
                </View>
                <ScrollView width='100%'>
                    <TouchableWithoutFeedback width='100%'>
                        <View style={styles.members}>
                            {members.map((member) =>
                            <UserInfo name={member.name} country={member.countryOfOrigin}
                            job={member.job} pic={member.profilePic}
                            isLastMember={member.id == members.length}/>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                <View style={styles.footer}>
                    <Text style={styles.message}>
                    Share trip with anyone interested to join directly:{' '}
                    <Text style={styles.link}
                    onPress={() => {}}>
                        dayoff.space/br101
                    </Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: palette.white
    },
    header: {
        width: 100 * vmin,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 2 * vmin,
    },
    headerMain: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    header1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 3.25 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
    },
    header2: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 2 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
        color: palette.grey,
    },

    returnButton: {
        resizeMode: 'contain',
        height: 4 * vh,
    },
    exitButton: {
        resizeMode: 'contain',
        height: 4 * vh,
        tintColor: palette.lightRed,
    },

    members: {
        width: '80%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    memberContainer: {
        borderBottomWidth: 1,
        borderColor: palette.lightGrey,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 2 * vh,
    },
    memberInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 2 * vmin,
    },
    memberName: {
        fontSize: 4.2 * vmin,
        fontFamily: 'Montserrat-Bold',
    },
    memberJob: {
        fontSize: 3.2 * vmin,
        fontFamily: 'Montserrat-SemiBold',
        color: palette.grey,
    },

    profilePic: {
        resizeMode: 'contain',
        width: 12.5 * vmin,
        height: 12.5 * vmin,
        borderRadius: 10 * vmin,
    },
    emptyProfilePic: {
        width: 12.5 * vmin,
        height: 12.5 * vmin,
        borderRadius: 10 * vmin,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: palette.purple,
        color: palette.white,
        fontSize: 4.5 * vmin,
    },

    footer: {
        width: '80%',
        borderTopWidth: 1,
        borderColor: palette.lightGrey,
        paddingTop: 2 * vh,
        paddingBottom: 8 * vh,
    },
    message: {
        fontSize: 3.5 * vmin,
        fontFamily: 'Montserrat-SemiBold',
    },
    link: {
        fontSize: 3.5 * vmin,
        fontFamily: 'Montserrat-SemiBold',
        color: palette.purple,
        textDecorationLine: 'underline',
    },
})