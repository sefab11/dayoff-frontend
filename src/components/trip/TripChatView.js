import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Button } from "../button";
import { Image } from "../image";
import CountryCodes from "../../../assets/CountryCodes.json";
import { themes, flags } from "../../style";
import { dimensions } from "../../style";
import { palette } from "../../style";
import {
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";

[vw, vh, vmin, vmax] = dimensions;

function formatDate(startDate, endDate) {
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

  var parsedStartDate = new Date(startDate);
  let sDate = parsedStartDate.getDate();
  if (sDate < 10) sDate = "0" + sDate.toString();
  let sMonth = monthsIndices[parsedStartDate.getMonth() + 1];
  let sYear = parsedStartDate.getYear();

  console.log(sDate + sMonth + sYear);

  var parsedEndDate = new Date(endDate);
  let eDate = parsedEndDate.getDate();
  if (eDate < 10) eDate = "0" + eDate.toString();
  let eMonth = monthsIndices[parsedEndDate.getMonth() + 1];
  let eYear = parsedEndDate.getYear();

  console.log(eDate + eMonth + eYear);

  if (sMonth == eMonth) {
    return sDate + " - " + eDate + " " + sMonth;
  } else return sDate + " " + sMonth + " - " + eDate + " " + eMonth;
}

const formatTime = (time) => {
  // if theres no time then return null
  if (!time) return null;

  // if theres a date then parse it and format it into hh:mm am/pm
  var parsedTime = new Date(time);
  var formattedTime = "";
  const hours = parsedTime.getHours();
  if (hours < 10 || (hours > 12 && hours < 22)) formattedTime += "0";

  formattedTime += parsedTime
    .toLocaleTimeString()
    .replace(/([\d]:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  return formattedTime;
};

const TripChatView = (props) => {
  const { style, label, children, ...rest } = props;
  const { trip, messages } = props;

  const country = trip.location;
  const date = formatDate(trip.start_date, trip.end_date);

  console.log(trip);
  console.log(messages);
  var lastMessage = {};
  try {
    if (messages.length > 0) lastMessage = messages[messages.length - 1];
  } catch (e) {}

  // TODO: work out how to get number of unread messages?
  const unread = 11;

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // update the current trip and navigate to chat screen
        global.currentTrip = trip;
        navigation.navigate("Chat");
      }}
    >
      <View style={{ ...styles.chat, ...style }}>
        {flags[country.code] ? (
          <Image style={styles.flagIcon} source={flags[country.code]} />
        ) : (
          <Text style={styles.countryText}>{country.code}</Text>
        )}
        <View style={styles.middleGroup}>
          <Text style={styles.countryText}>
            {country?.name?.length > 10
              ? country.name.substring(0, 10)
              : country.name}{" "}
            | {date}
          </Text>
          {lastMessage && lastMessage.sender && lastMessage.message ? (
            <View style={styles.messageGroup}>
              <Text style={styles.authorText}>{lastMessage.sender}: </Text>
              <Text style={styles.messageText}>
                {lastMessage.sender.length + lastMessage.message.length > 24
                  ? lastMessage.message.substring(
                      0,
                      24 - lastMessage.sender.length
                    ) + "..."
                  : lastMessage.message}
              </Text>
            </View>
          ) : null}
        </View>
        {
          <View style={styles.rightGroup}>
            <Text style={styles.timeText}>
              {formatTime(lastMessage.timestamp)}
            </Text>
            <Text style={styles.notification}>
              {unread > 0 ? (unread > 9 ? "9+" : unread) : null}
            </Text>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    width: 85 * vmin,
    paddingVertical: 3 * vh,
    borderTopStyle: "solid",
    borderTopColor: palette.lightGrey,
    borderTopWidth: 1,
    gap: 5 * vmin,
    alignItems: "center",
  },
  countryText: {
    fontFamily: "Lato-Bold",
    fontSize: 2.2 * vh,
  },
  flagIcon: {
    width: 5 * vh,
    resizeMode: "contain",
  },
  middleGroup: {
    padding: 0,
    flexDirection: "column",
    alignContent: "flex-start",
    gap: 1 * vh,
  },
  rightGroup: {
    marginLeft: "auto",
    padding: 0,
    flexDirection: "column",
    gap: 1 * vh,
    alignItems: "flex-end",
  },
  messageGroup: {
    flexDirection: "row",
  },
  authorText: {
    fontFamily: "Lato-Regular",
    fontSize: 2 * vh,
    color: palette.black,
  },
  messageText: {
    fontFamily: "Lato-Regular",
    fontSize: 2 * vh,
    color: palette.grey,
  },
  timeText: {
    fontFamily: "Lato-Regular",
    fontSize: 1.8 * vh,
    color: palette.grey,
  },
  notification: {
    width: 3.2 * vh,
    height: 3.2 * vh,
    backgroundColor: palette.purple,
    color: palette.white,
    borderRadius: 1.6 * vh,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Lato-Bold",
    fontSize: 1.8 * vh,
  },
});

export default TripChatView;
