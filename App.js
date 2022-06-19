import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Map from './src/screens/Map';
import CadastroUser from './src/screens/CadastroUser';
import CadastroPet from './src/screens/CadastroPost';
import { Provider as StoreProvider } from 'react-redux';
import { LogBox } from 'react-native';
import store from './src/services/store'
import Feed from './src/screens/Feed';
import Sobre from './src/screens/Sobre';
import Faq from './src/screens/Faq';

LogBox.ignoreLogs([
  'AsyncStorage'
])

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>

          <Stack.Screen
            name="Login"
            component={Login}
            options={
              { title: "Login", headerTitleAlign: "center" }
            }
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={
              { title: "Feed", headerTitleAlign: "center" }
            }
          />
          <Stack.Screen
            name="Faq"
            component={Faq}
            options={
              { title: "Faq", headerTitleAlign: "center" }
            }
          />
          <Stack.Screen
            name="Sobre"
            component={Sobre}
            options={
              { title: "Sobre", headerTitleAlign: "center" }
            }
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={
              { title: "Maps", headerTitleAlign: "center" }
            }
          />
          <Stack.Screen
            name="CadastroUser"
            component={CadastroUser}
            options={
              { title: "Registro de Usuários" }
            }
          />
          <Stack.Screen
            name="CadastroPost"
            component={CadastroPet}
            options={
              {
                title: "Postar algo",
                headerTitleStyle: {
                  fontSize: 15
                }
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}


