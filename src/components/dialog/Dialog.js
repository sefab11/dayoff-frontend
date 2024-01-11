import { View } from 'react-native';
import { Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

const BasicDialog = (props) => {
  const {visible, setVisible, label, details, actions, children, ...rest} = props;

  return (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text>{label}</Text>
              <Text>{details}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              {children}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default BasicDialog;