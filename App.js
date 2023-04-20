import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from "react-native";
import Navigation from './src/Navigations/Navigation.js';
import { AuthProvider } from './src/Context/AuthContex.js';
import NetInfo from "@react-native-community/netinfo";
import { notificationListner, requestUserPermission } from './src/Services/NotificationServices.js';
import RemotePushController from './src/Services/RemotePushController.js';
const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    requestUserPermission()
    notificationListner()
  }, [])


  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      Alert.alert(
        'No Internet',
        'Please check your internet connection and try again.',
        [{ text: 'OK', onPress: () => null }]
      );
    }
  }, [isConnected]);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, [])

  return (
    <AuthProvider>
      <RemotePushController />
      <Navigation />
    </AuthProvider>
  )
}

export default App;