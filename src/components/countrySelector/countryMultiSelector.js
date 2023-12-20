import SectionedMultiSelect from "react-native-sectioned-multi-select";
import CountryCodes from '../../../assets/CountryCodes.json'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from "react";



const CountryMultiSelector = (props) => {
    const {style, children, ...rest} = props;

    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems({ selectedItems });
    };
    
    return (
        <SectionedMultiSelect
          items={CountryCodes}
          IconRenderer={Icon}
          uniqueKey="code"
          selectText="Choose countries..."
          showDropDowns={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
        />
    )
}

export default CountryMultiSelector;
