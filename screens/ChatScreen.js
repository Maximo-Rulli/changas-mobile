import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, 
  TouchableOpacity, FlatList, 
  ActivityIndicator, TextInput, Keyboard,
  StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import useFetchUser from '../hooks/useFetchUser'
import { getMessages } from '../actions/getMessages'
import ListIcon from '../assets/icons/Lista.svg'
import SendIcon from '../assets/icons/Enviar.svg'

const ChatScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [keyboardType, setKeyboardType] = useState()

  const { IdUser, username } = useFetchUser()
  const { IdChat, OtherUsername, OtherUser, id_user1 } = route.params
  const UserNumber = (OtherUser !== id_user1 ? 1 : 2)

  useEffect(() => {
    async function loadMessages() {
      if (IdUser) {
        setLoading(true)
        const fetchedMessages = await getMessages(IdChat)
        setMessages(fetchedMessages.content)
        setLoading(false)
      }
    }
    loadMessages()
  }, [IdUser])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user_num === UserNumber
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUser : styles.otherUser]}>
        <Text style={[styles.messageText, isCurrentUser ? styles.currentUserText : undefined]}>{item.message}</Text>
      </View>
    )
  }

  const handleButtonPress = () => {
    if (keyboardType === 'contracts'){
      setKeyboardType('hide')
    }
    else if (keyboardType === 'default') {
      setKeyboardType('contracts')
      Keyboard.dismiss()
    }
    else {
      setKeyboardType('contracts')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
          automaticallyAdjustKeyboardInsets
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position': undefined}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleButtonPress}>
            <ListIcon style={styles.listIconContainer} width={20} height={20} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#A6E5B1"
            onFocus={() => {
              setKeyboardType('default') 
            }}
          />
          <TouchableOpacity>
            <SendIcon style={styles.sendIconContainer} width={30} height={30} />
          </TouchableOpacity>
        </View>
        {keyboardType === 'contracts' && 
        <View style={styles.contractsKeyboard}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateContract', { IdUser: IdUser, OtherUser: OtherUser })} style={styles.contractsButton}>
            <Text>Crear contrato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contractsButton}>
            <Text>Contratos</Text>
          </TouchableOpacity>
        </View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  sendIconContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
    paddingBottom: 60
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  currentUser: {
    backgroundColor: '#0D804D',
    alignSelf: 'flex-end',
  },
  otherUser: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-start',
  },
  currentUserText: {
    color: '#F5F5F5',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7747',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    backgroundColor: '#267044',
    marginLeft: 20,
    borderRadius: 5
  },
  iconContainer: {
    marginLeft: 15
  },
  contractsKeyboard: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  contractsButton: {
    padding: 10,
    backgroundColor: '#08A045',
    borderRadius: 5,
  },
})

export default ChatScreen
