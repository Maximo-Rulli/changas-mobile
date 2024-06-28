import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default function LoadingScreen() {
  const animation = useRef(null)

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/loading.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
})
