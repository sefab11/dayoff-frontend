import { IconButton } from 'react-native-paper';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, palette } from '../../style';
import { MessageInput } from '../textinput';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import EmojiPicker from 'rn-emoji-keyboard';

import { startRecording, stopRecording } from './RecordMessage';
import { playSound } from './PlayMessage';

[vw, vh, vmin, vmax] = dimensions;

const ChatFooter = (props) => {
  const { style, ...rest } = props;

  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState([]);

  const [showEmojis, setShowEmojis] = useState(false);
  const toggleShowEmojis = () => setShowEmojis(!showEmojis);

  const sendMessage = () => {
    // send message to chat screen
    props.setSentMessage({
      msg: audio ? null : message,
      attachments: image != null ? image : null,
      audio: message ? null : audio,
    });
    setMessage('');
    setImage(null);
    setAudio(null);
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
    setImage(result);
  };

  return (
    <View
      style={{ ...styles.footer, ...style }}
      {...rest}
      paddingBottom={showEmojis ? 40 * vh : 4 * vmin}
    >
      {
        // Don't show regular footer when emojis selected
        showEmojis ? (
          <EmojiPicker
            onEmojiSelected={(e) => {
              //console.log(e);
              setMessage((msg) => msg + e.emoji);
              toggleShowEmojis();
            }}
            open={showEmojis}
            onClose={() => toggleShowEmojis()}
          />
        ) : (
          <>
            <IconButton
              style={{ ...styles.icon, padding: 10 }}
              icon={require('../../../assets/icons/plus.png')}
              iconColor={palette.purple}
              size={3 * vh}
              /* TODO: add image to message on press */
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: false,
                  aspect: [4, 3],
                  quality: 1,
                });

                if (!result.canceled) {
                  setImage(result.assets[0].uri);
                  //console.log(result.assets[0].uri);
                }
              }}
            />
            <MessageInput
              /* returns sentMessage on enter */
              value={message}
              setValue={setMessage}
              sentMessage={sendMessage}
            />
            <IconButton
              style={styles.icon}
              icon={require('../../../assets/icons/smile.png')}
              iconColor={palette.purple}
              size={3 * vh}
              /* toggle emoji selector */
              onPress={() => toggleShowEmojis()}
            />
            <TouchableWithoutFeedback>
              <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/mic.png')}
                iconColor={palette.purple}
                size={3 * vh}
                onPressIn={() => {
                  startRecording();
                }}
                onPressOut={() => {
                  // toggle popup
                  let audioFile = stopRecording();
                  setAudio(audioFile)
                  // console.log("User has released the screen")
                  return (
                    <>
                      <Button 
                       title={'Play'}
                       onPress={playSound(audioFile)}></Button>
                    </>
                  );
                }}
              />
            </TouchableWithoutFeedback>

            <IconButton
              style={styles.icon}
              icon={require('../../../assets/icons/attachment.png')}
              iconColor={palette.purple}
              size={3 * vh}
              // add the file in the input to the attachment
              onPress={() => {
                setAttachment(attachment);
              }}
            />
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: 100 * vw,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 4 * vmin,
  },
  icon: {
    margin: 0,
  },
});

export default ChatFooter;
