import SectionedMultiSelect from "react-native-sectioned-multi-select";
import CountryCodes from '../../../assets/CountryCodes.json'

const CountryMultiSelector = (props) => {
    const {style, children, ...rest} = props
    
    return (
        <SectionedMultiSelect
            items={{}}
        />
    )
}

export default CountryMultiSelector;
