import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import PusherClient from 'pusher-js';
import {NEXT_PUBLIC_PUSHER_KEY} from '@env';
import messages from '../utils/messages';
import AuthLogin from '../actions/login';
import useFetchUser from '../hooks/useFetchUser';


const ChatsDashboardScreen = () => {
  const {IdUser} = useFetchUser();

  const pusher = new PusherClient(
    NEXT_PUBLIC_PUSHER_KEY,
    { cluster: 'sa1', channelAuthorization: { 
      endpoint: 'https://www.changas.site/auth/pusher',
      transport: 'ajax',
      params: { id_user: IdUser } } }
  )
  const channel = pusher.subscribe(`presence-31`)
  
  channel.bind('pusher:subscription_error', () => {
    Alert.alert('Error', messages.error.fail_subscription);
  })

};


export default ChatsDashboardScreen;
