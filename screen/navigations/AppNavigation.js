import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View, SafeAreaView, Alert } from 'react-native';
import Login from '../authentication/Login';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Context as AuthenticationContext } from '../context/AuthenticationContext';
import User from '../expense/User';
import ExpenseList from '../expense/ExpenseList';
import AddExpense from '../expense/AddExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PaymentList from '../expense/PaymentList';
import AddPayment from '../expense/AddPayment';
import Setting from '../expense/Setting';
import StackNavigation from '../partnersRepo/source/navigation/StackNavigation';
import SplashScreen from '../authentication/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = ({ }) => {
  const {
    state: { user },
    signin
  } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null)
  const readValue = async (key) => {
    // const v = await AsyncStorage.getItem(key);
    // return v
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setLoggedInUser(jsonValue);
      if (jsonValue !== 'null') {
        signin(jsonValue, '', function (res, err) {
        })
      }

    } catch (e) {
      // error reading value
      return null
    }
  }

  useEffect(() => {
    readValue('loggedIn')
  }, [loggedInUser])


  return (
    <>
      <NavigationContainer>
        {user == null || user == undefined ? (
          <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        ) : (
            <>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                      iconName = 'home';
                    }
                    if (route.name === 'Setting') {
                      iconName = 'gears';
                    }
                    if (route.name === 'Map') {
                      iconName = 'globe';
                    }
                    if (route.name === 'Extended') {
                      iconName = 'xing';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}>
                <Tab.Screen name="Home" component={ExpenseNavigator} />
                <Tab.Screen name="Map" component={PaymentNavigator} />
                {/* <Tab.Screen name="Profile" component={ProfileNavigator} /> */}
                <Tab.Screen name="Setting" component={SettingNavigator} />
                <Tab.Screen name="Extended" component={ExtensionNavigator} />
              </Tab.Navigator>
            </>
          )}
      </NavigationContainer>
    </>
  );
};

const SettingNavigator = ({ navigation }) => {
  const { signout } = useContext(AuthenticationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: true,
          // headerRight: () => (
          //   <Button
          //     onPress={() => {
          //       signout();
          //     }}
          //     title="Signout"
          //     color="#000"
          //   />
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={User}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ExtensionNavigator = ({ navigation }) => {
  const { state: { user }, signout } = useContext(AuthenticationContext);
  return <StackNavigation userData={user} />;
  // <Stack.Navigator>
  //   <Stack.Screen name="ExtensionScreen" component={ExtensionScreen} options={{
  //     headerShown: true,
  //     headerRight: () => (
  //       <Button
  //         onPress={() => {
  //           signout()
  //         }}
  //         title="Signout"
  //         color="#000"
  //       />
  //     )
  //   }} />
  // </Stack.Navigator>
};

const ExpenseNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Expense"
        component={ExpenseList}
        options={{
          headerShown: false,
          //   headerRight: () => (
          //     <Button
          //       onPress={() => {
          //         navigation.navigate('AddExpense');
          //       }}
          //       title="Add Expense"
          //       color="#000"
          //     />
          //   ),
        }}
      />
      {/* <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

const PaymentNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PaymentList"
        component={PaymentList}
        options={{
          headerShown: false,
          //   headerTitle: (props) => <Text>Payment</Text>,
          // headerRight: () => (
          //   <Button
          //     onPress={() => {
          //       navigation.navigate('AddPayment');
          //     }}
          //     title="Add Payment"
          //     color="#000"
          //   />
          // ),
        }}
      />
      <Stack.Screen name="AddPayment" component={AddPayment} />
    </Stack.Navigator>
  );
};

const ExtensionScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Hi Extension SCreen</Text>
    </SafeAreaView>
  );
};

export default AppNavigation;
