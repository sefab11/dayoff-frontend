import { View, Text, Image, StyleSheet } from "react-native";

export default EditCountries = () => {
  const countries = [
    {
      id: "1",
      image: require("../../../assets/images/welcome_screen/Spain.png"),
    },
    {
      id: "2",
      image: require("../../../assets/images/welcome_screen/Brazil.png"),
    },
    {
      id: "3",
      image: require("../../../assets/images/welcome_screen/Japan.png"),
    },
    {
        id: "4",
        image: require("../../../assets/images/welcome_screen/Japan.png"),
      },
 
  ];

  return (
    <View style={styles.EditCountriesContainer}>
      <View>
        <Text style={styles.headingText}>Countries you wish to visit</Text>
      </View>
      <View style={styles.countriesCContainer}>
        {countries.map((country) => (
          <View style={styles.country} key={country.id}>
            <Image style={styles.icon} source={country.image} />
          </View>
        ))}
          <Image
            source={require("../../../assets/images/welcome_screen/edit.png")}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EditCountriesContainer: {
    paddingTop: 5,
    width: 85 * vmin,
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
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
  countriesCContainer: {
    flexDirection: "row",
    flexWrap:'wrap',
    marginTop: 25,
    alignItems:'center',
    justifyContent:'space-between'
    
  },
  country: {
    backgroundColor: "#EEECFA",
    width: `${85 / 3}%`,
    padding:10,
    alignItems:'center',
    marginBottom: 10,
  },
});
