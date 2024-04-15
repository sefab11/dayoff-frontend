import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { themes } from "../../style";
import { dimensions } from "../../style";
import { palette } from "../../style";

export default ProfileInfo = () => {
    return (
        <View style={styles.profileInfoContainer}>
            {/* container for country of residence
             TODO: change to text input */}
            <TouchableOpacity style={styles.infoContainer}>
                <View>
                    <Text style={styles.headingText}>Country of Residence</Text>
                </View>

                <View style={styles.countryContainer}>
                    <Text style={styles.message}>United States</Text>
                    <Image
                    source={require("../../../assets/icons/pencil.png")}
                    tintColor={palette.purple}
                    style={styles.editIcon}
                    />
                </View>
            </TouchableOpacity>

            {/* container for job
             TODO: change to text input */}
            <View style={styles.infoContainer}>
                <Text style={styles.headingText}>Job Title & Company</Text>
                <View style={styles.countryContainer}>
                    <Text style={styles.message}>Product Designer, Facebook</Text>
                    <Image
                    source={require("../../../assets/icons/pencil.png")}
                    tintColor={palette.purple}
                    style={styles.editIcon}
                    />
                </View>
            </View>

            {/* container for linked
             TODO: change to text input */}
            <View style={styles.infoContainer}>
                <Text style={styles.headingText}>My LinkedIn URL</Text>
                <View style={styles.countryContainer}>
                    <Text style={styles.message}>Linkedin.com/jessss</Text>
                    <Image
                    source={require("../../../assets/icons/pencil.png")}
                    tintColor={palette.purple}
                    style={styles.editIcon}
                    />
                </View>
            </View>
      
        </View>
    );
};

const styles = StyleSheet.create({
  profileInfoContainer: {
    paddingTop: 5,
    width: 85 * vmin,
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderColor: "#D7D7D7",
    marginBottom:20,
    paddingTop:25
  },
  infoContainer:{
    marginBottom:15
  },
  headingText: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
  message: {
    marginTop: 1.5 * vh,
    alignSelf: "center",
    width: 78 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  countryContainer: {
    flexDirection: "row",
    marginLeftLeft: 5,
  },
  editIcon: {
    resizeMode: 'contain',
    height: 2 * vh,
    width: 2 * vh,
  }
});
