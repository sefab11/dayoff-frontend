import { Audio } from 'expo-av';

// Allow the user to play their own voice message
export async function playSound(audioPath) {
  // console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(require(audioPath));
  setSound(sound);

  // console.log('Playing Sound');
  await sound.playAsync();

  sound.setOnPlaybackStatusUpdate(async (status) => {
    if (status.didJustFinish) {
      await sound.unloadAsync();
      // console.log('Sound finished');
    }
  })
}

