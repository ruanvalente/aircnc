import React, { useState } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

import api from '../services/api'

export default function Book ({ navigation }) {
  const [date, setDate] = useState('')
  const id = navigation.getParam('id')

  async function hanldeSubmit () {
    const user_id = await AsyncStorage.getItem('user')
    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    )
    Alert.alert('Solicitação de reserva enviada.')

    navigation.navigate('List')
  }

  function handleCancel () {
    navigation.navigate('List')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder='Qual data você quer reservar ?'
        placeholderTextColor='#999'
        autoCapitalize='none'
        autoCorrect={false}
        value={date}
        onChangeText={dateInput => setDate(dateInput)}
      />
      <TouchableOpacity onPress={hanldeSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancelar reserva</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: Platform.OS === 'android' ? 50 : SafeAreaView
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
  cancelButton: {
    minWidth: 300,
    height: 42,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 15
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
