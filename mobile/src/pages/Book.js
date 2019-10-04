import React from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  AsyncStorage
} from 'react-native'

export default function Book ({ navigation }) {
  const id = navigation.getParam('id')
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 40 : SafeAreaView
  }
})
