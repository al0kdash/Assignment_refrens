import {Dimensions, Platform} from 'react-native';

const SCREEN_HEIGHT =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : Dimensions.get('window').height <= 550
    ? 667
    : Dimensions.get('window').height;
const SCREEN_WIDTH = 375;

const {height, width} = Dimensions.get('window');

export default function (units = 1) {
  return (width / SCREEN_WIDTH) * units;
}

const verticalScale = size => (height / SCREEN_HEIGHT) * size;

export {verticalScale};
