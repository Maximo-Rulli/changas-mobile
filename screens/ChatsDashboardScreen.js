import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { getUserChats } from '../actions/getUserChats'
import useFetchUser from '../hooks/useFetchUser'
import chatFormatDate from '../utils/chatFormatDate'
import UserIcon from '../assets/icons/Usuario.svg'
import LoadingScreen from './LoadingScreen'

const ChatsDashboardScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState()
  const {IdUser, username} = useFetchUser()

  useEffect(() => {
    async function loadUserChats() {
      if (IdUser) {
        setLoading(true)
        setChats(await getUserChats(IdUser))
        setLoading(false)
      }
    }
    loadUserChats()
  }, [IdUser])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingScreen/>
      </View>
    )
  }

  return (
    <ScrollView>
      {chats.length !== 0 ? (
        chats.map((chat, index) => (
          
          <TouchableOpacity key={index} style={styles.container}
          onPress={() => {
            navigation.navigate('Chat', {IdChat: chat.id_chat, OtherUsername: (chat.id_user1 === IdUser ? chat.username_2 : chat.username_1), OtherUser: (chat.id_user1 === IdUser ? chat.id_user2 : chat.id_user1), id_user1: chat.id_user1 })
          }}>
              <View style={styles.avatarContainer}>
                <UserIcon style={styles.avatar}/>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.username}>{chat.username_1 === username ? chat.username_2 : chat.username_1}</Text>
                <Text style={styles.lastMessageTime}>{chatFormatDate(chat.last_message)}</Text>
              </View>
            {(chat.id_user1 === IdUser ? !chat.read_user_1 : !chat.read_user_2) && <View style={styles.onlineIndicator} />}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noChatsText}>Usted no ha iniciado ninguna conversación</Text>
      )}
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    height: 30,
    width: 30,
    marginLeft: 10,
    marginTop: 5
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#D9D9D9',
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 12,
    color: '#888',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  noChatsText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: '#999',
    },
  })

export default ChatsDashboardScreen
