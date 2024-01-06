import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

const Splash = ({loading}) => {
  const animationRef = useRef<LottieView>(null)
  const fantasyPosition = useRef(new Animated.Value(-100)).current;
  const sportsPosition = useRef(new Animated.Value(100)).current;
  
  useEffect(() => {
    animationRef.current?.play(50, 120);
    Animated.parallel([
      Animated.timing(fantasyPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(sportsPosition, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fantasyPosition, sportsPosition])
  

  return (
    <View style = {[StyleSheet.absoluteFillObject, styles.container, {display: loading ? "flex" : "none" } ]}>
      <Animated.Text
        style={{
          fontWeight: '800',
          fontSize: 45,
          color: 'yellow',
          transform: [{ translateX: fantasyPosition }],
        }}
      >
        Fantasy
      </Animated.Text>
      <Animated.Text
        style={{
          fontWeight: '800',
          fontSize: 40,
          color: 'red',
          transform: [{ translateX: sportsPosition }],
        }}
      >
        Sports
      </Animated.Text>
      <LottieView ref = {animationRef} source={require('../../assets/Animation - 1704517175947.json')} style = {{height: 300, width: '100%'}} autoPlay loop/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    zIndex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ACACAC', opacity: 1
  }
})