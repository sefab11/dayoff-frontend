import {View,Image, StyleSheet} from 'react-native';

export default VisitedCountries = () =>{
    return(
  <View>
    <Image source={require("../../../assets/images/profileScreen/AustraliaFlag.png")}/>
    <Image source={require("../../../assets/images/profileScreen/FranceFlag.png")}/>
    <Image source={require("../../../assets/images/profileScreen/JapanFlag.png")}/>
    <Image source={require("../../../assets/images/profileScreen/BrazilFlag.png")}/>
  </View>
)
    }
const styles = StyleSheet.create({

})