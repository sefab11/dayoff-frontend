import { Dimensions } from 'react-native'

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

export const dimensions = [vw, vh, vmin, vmax];