import { View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { palette, flags } from "../../style";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const monthsIndices = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

function formatDate(startDate, endDate) {
  var parsedStartDate = new Date(startDate);
  let sDate = parsedStartDate.getDate();
  if (sDate < 10) sDate = "0" + sDate.toString();
  let sMonth = monthsIndices[parsedStartDate.getMonth() + 1];
  let sYear = parsedStartDate.getYear();

  var parsedEndDate = new Date(endDate);
  let eDate = parsedEndDate.getDate();
  if (eDate < 10) eDate = "0" + eDate.toString();
  let eMonth = monthsIndices[parsedEndDate.getMonth() + 1];
  let eYear = parsedEndDate.getYear();

  if (sMonth == eMonth) {
    return sDate + " - " + eDate + " " + sMonth;
  } else return sDate + " " + sMonth + " - " + eDate + " " + eMonth;
}

const ChatHeader = (props) => {
  const { style, children, images, ...rest } = props;

  const location = global.currentTrip.location;
  location.flag = flags[location.code];
  const date = formatDate(
    global.currentTrip.start_date,
    global.currentTrip.end_date
  );
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.header, ...style }} {...rest}>
      <IconButton
        style={styles.icon}
        icon={require("../../../assets/icons/chevron_left.png")}
        iconColor={palette.black}
        size={4 * vh}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.main}>
        <View style={styles.profilePicsGroup}>{images}</View>
        <View style={styles.mainText}>
          <Image source={location.flag} style={styles.mainImg} />
          {/* shorten location name if too long */}
          <Text style={styles.title}>
            {location.name.length > 10
              ? location.name.substring(0, 10)
              : location.name}{" "}
            | {date}
          </Text>
        </View>
      </View>

      <IconButton
        style={{ ...styles.icon, marginRight: 1 * vh }}
        icon={require("../../../assets/icons/hamburger.png")}
        iconColor={palette.black}
        size={4 * vh}
        onPress={() => navigation.navigate("GroupInfo")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: 100 * vw,
    justifyContent: "space-between",
    paddingBottom: 2 * vh,
    borderBottomWidth: 1,
    borderColor: palette.lightGrey,
  },
  icon: {
    margin: 0,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 2.8 * vh,
    paddingBottom: 0.5 * vh,
    letterSpacing: -0.2 * vh,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainImg: {
    resizeMode: "contain",
    height: "70%",
  },
  mainText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 3 * vh,
  },
  profilePicsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: -2 * vh,
  },
});

export default ChatHeader;
