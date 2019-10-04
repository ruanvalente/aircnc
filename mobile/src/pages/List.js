import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List () {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs
        .split(',')
        .map(storagedTechs => storagedTechs.trim())
      setTechs(techsArray)
    })
  }, [])
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? 50 : SafeAreaView,
    alignSelf: 'center'
  }
})
