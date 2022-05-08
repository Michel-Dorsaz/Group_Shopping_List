import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import { Avatar, Icon} from 'react-native-elements';
import GroupsScreen  from'./navigation/GroupsScreen';
import NewGroupScreen from './navigation/NewGroupScreen';
import ProfilScreen from './navigation/ProfilScreen';
import ProfilImageSelectionScreen from'./navigation/ProfilImageSelectionScreen';
import LoginScreen from './navigation/LoginScreen';
import RegisterScreen from './navigation/RegisterScreen';
import JoinGroupScreen from './navigation/JoinGroupScreen';
import ListsScreen from './navigation/ListsScreen';
import NewListScreen from './navigation/NewListScreen';
import FullImageScreen from './navigation/FullImageScreen';
import NewItemScreen from './navigation/NewItemScreen';
import ItemParamsScreen from './navigation/ItemParamsScreen';
import ItemsListScreen from './navigation/ItemsListScreen';
import MapScreen from './navigation/MapScreen';
import { UserStateProvider } from './utils/UserContext'
import { styles }  from './utils/Styles';
import { UserStateContext } from './utils/UserContext';

export default function App() {

  const Tab = createNativeStackNavigator();


  return (
    <UserStateProvider>
      <NavigationContainer>

          <Tab.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'lightyellow'       
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold'
              },
              headerTitleAlign: 'center'
            }}
          >
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
            <Tab.Screen name="Groups" component={GroupsScreen} />
            <Tab.Screen name="Your profil" component={ProfilScreen} />
            <Tab.Screen name="Your profil picture" component={ProfilImageSelectionScreen} />
            <Tab.Screen name="New group" component={NewGroupScreen} />
            <Tab.Screen name="Join group" component={JoinGroupScreen} />
            <Tab.Screen name="Lists" component={ListsScreen} />
            <Tab.Screen name="New list" component={NewListScreen} />
            <Tab.Screen name="New item" component={NewItemScreen} />
            <Tab.Screen name="Item params" component={ItemParamsScreen} />
            <Tab.Screen name="Items list" component={ItemsListScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Image" component={FullImageScreen} />
        
          </Tab.Navigator>       
      </NavigationContainer>
    </UserStateProvider>
  );
}


