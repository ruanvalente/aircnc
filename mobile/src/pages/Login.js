import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native'

import logo from '../assets/logo.png'
import api from '../services/api'

export default function Login ({ navigation }) {
  const [email, setEmail] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List')
      }
    }, [])
  })
  async function handleSubmit () {
    const response = await api.post('/sessions', {
      email
    })
    const { _id } = response.data
    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('techs', techs)

    navigation.navigate('List')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder='Seu e-email'
          placeholderTextColor='#999'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={textEmail => setEmail(textEmail)}
        />
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder='Tecnologias de interesse'
          autoCapitalize='words'
          placeholderTextColor='#999'
          autoCorrect={false}
          value={techs}
          onChangeText={textTechs => setTechs(textTechs)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Encontrar spots</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 4
  },
  button: {
    minWidth: 300,
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  }
})
