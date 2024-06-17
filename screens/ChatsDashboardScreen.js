import React, { useEffect, useState } from 'react'
import { Text, View, Button, ScrollView, ActivityIndicator, Alert } from 'react-native'
import {NEXT_PUBLIC_PUSHER_KEY} from '@env'
import messages from '../utils/messages'
import AuthLogin from '../actions/login'
import useFetchUser from '../hooks/useFetchUser'


const ChatsDashboardScreen = () => {
  const {IdUser} = useFetchUser()
}


export default ChatsDashboardScreen
