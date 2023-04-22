import React, { useContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AppNavigations from './AppNavigations'
import AuthNavigations from './AuthNavigations'
import { AuthContext } from '../Context/AuthContex'
import { COLORS } from '../Constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: 'transparent'
  }
}

const Navigation = () => {
  // const [isLoading, setLoading] = useState(false)
  const { isLoading, isUserLoginStatus } = useContext(AuthContext);
  // console.log('isUserLoginStatus--->', isUserLoginStatus);
  if (isLoading) {
    return <View style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
    }}>
      <ActivityIndicator size='small' color={COLORS.brand.primary} />
    </View>
  }
  return (
    <NavigationContainer theme={theme} independent={true}>
      {
        !isUserLoginStatus ? <AuthNavigations /> : <AppNavigations />
      }
      {/* <AuthNavigations /> */}
    </NavigationContainer>
  )
}

export default Navigation