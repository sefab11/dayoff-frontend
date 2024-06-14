import { Alert } from 'react-native';

const showAlert = ({props}) => {
  Alert.alert(
    props.title,
    props.message,
    [
      {
        text: 'Close',
        style: 'cancel',
      },
    ],
    {
      cancelable: true
    },
  );
}

export default showAlert;