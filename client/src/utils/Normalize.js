import { Dimensions, PixelRatio } from 'react-native';

// iPhone 11/12/13/14/15/16 (6.1") çizgisi için iyi referans: 390x844
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const scale = size => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = size => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * moderateScale: scale ile sabit boyut arasında yumuşak geçiş sağlar
 * factor: 0..1 (0 = hiç ölçekleme yok, 1 = tam ölçek)
 */
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * normalize: özellikle font-size için iyi
 * PixelRatio.roundToNearestPixel ile daha düzgün render
 */
export const normalize = (size, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(moderateScale(size, factor));
