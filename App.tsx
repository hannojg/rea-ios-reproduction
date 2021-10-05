import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedReaction, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

const {width} = Dimensions.get("window");

const App = () => {
  const textAnimationValue = useSharedValue(0);

  // start animation on mount
  useEffect(() => {
    textAnimationValue.value = withRepeat(
      withSequence(withTiming(1, { duration: 3000 }), withTiming(0, { duration: 3000 })),
    -1)
  }, []);

  const animContainerStyle = useAnimatedStyle(() => ({
    width: '100%',
  }), [textAnimationValue])

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(textAnimationValue.value, [0, 1], [0, width]) }
    ],
    color: interpolateColor(textAnimationValue.value, [0, 1], ["red", "green"])
  }), [textAnimationValue])

  useAnimatedReaction(() => textAnimationValue.value === 1,
  (isFinished) => {
    if (isFinished) {
      console.log('One animation round done!');
    }
  }, [textAnimationValue])

  return (
    <View style={styles.container}>
      <Animated.View style={animContainerStyle}>
        <AnimatedText style={animatedTextStyle}>This text is being animated</AnimatedText>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
