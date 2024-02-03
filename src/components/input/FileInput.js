import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";


const LinkLabel = (props) => {
    const { link, removeLink } = props;

    return (
    <View style={styles.dateContainer}
    backgroundColor={palette.lightPurple}>
        <Text style={styles.dateTextActive}>
            {link}
        </Text>

        <TouchableOpacity onPress={() => removeLink()}>
            <Image style={styles.xIcon}
            tintColor={palette.black}
            source={require("../../../assets/icons/x.png")} />
        </TouchableOpacity>
    </View>
    );
}


const FileInput = (props) => {
    //passed in properties
    const {title, titleStyle, label, labelStyle, boxWidth, initialLink} = props;

    const [links, setLinks] = useState(initialLink);

    function updateLinks(newLink){
        if (links.includes(newLink) || newLink.includes("undefined")) return;
        //reassign dates to a 1-length arr
        setLinks(newLink);
        //update prop in parent, only send value, not array
        props.onSelectLink(newLink);
    }

    //only 1 date allowed, so reassign dates to an empty arr
    function removeLink(){
        setLinks('');
    }

    function toggleModal(){
        console.log("open file selector");
    }



    return (
    <View style={styles.selectDateWrap}>
        <View>
            <Text style={titleStyle}>{title}</Text>
        </View>

        <View>
            <Text style={labelStyle}>{label}</Text>
        </View>

        <View>
            <View style={styles.calenderIconContainer} width={boxWidth}>
                {links == '' ? null
                :
                <LinkLabel link={links} removeLink={removeLink} />}

                {/*marginLeft keeps it as the last component in the flexbox, padding makes it
                  slightly bigger so that flexbox doesn't expand on a new date on a new row
                */}
                <TouchableOpacity onPress={toggleModal}
                                  style={{marginLeft: 'auto',
                                  alignSelf: 'center'}}
                >
                    <Image style={styles.icon}
                           tintColor={palette.purple}
                           source={require("../../../assets/icons/upload.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
  selectDateWrap: {
    paddingTop:5,
    paddingBottom:0,
    borderBottomWidth:0,
    borderBottomColor:'#D7D7D7',
  },
  calenderBottom: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 10,
  },
  confirmButton: {
    backgroundColor: palette.purple,
    width: 40 * vmin,
    height: 10 * vmin,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    color: palette.white,
  },
  calenderIconContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    justifyContent: "flex-start",
    lineHeight: "27px",
    marginTop: 0,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 5,
    height: 10 * vmin,
  },
  dateTextActive: {
    color: palette.purple,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dateTextInactive: {
    color: palette.grey,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    resizeMode: 'center',
    height: 4 * vh,
    width: 4 * vh,
  },
  xIcon: {
    resizeMode: 'contain',
    height: 1.5 * vh,
    width: 1.5 * vh,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  checkboxContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15,
  },
  checkText:{
    paddingLeft:10,
    fontFamily: "Lato-Regular",
    fontSize: 4 * vmin,
    fontWeight: "600",
    color: "#000000",
    letterSpacing: 1.5,
  }
});

export default FileInput;
