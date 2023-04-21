import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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
    return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
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