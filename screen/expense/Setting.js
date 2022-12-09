import React, { useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Context as AuthenticationContext } from '../context/AuthenticationContext';
import { saveValue } from '../authentication/Login';

const Enteries = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'My Payment',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'My Alerts',
  },
  {
    id: '58694a0f-3da1-47f-bd96-145571e29d72',
    title: 'Service Advisories',
  },
  {
    id: 'bd7acbea-c1b1-51c2-aed5-3ad53abb28ba',
    title: 'About Us',
  },
  {
    id: '3ac68afc-c605-49d3-a4f8-fbd91aa97f63',
    title: 'Contact Us',
  },
  {
    id: '58694a0f-3da1-50f-bd96-145571e29d72',
    title: 'Site Policies',
  },
  {
    id: '58694a0f-3da1-52f-bd96-145571e29d72',
    title: 'Logout',
  },
];

const Setting = () => {
  const { signout } = useContext(AuthenticationContext)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {Enteries.map((entry, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (entry.title === 'Logout') {
                    saveValue('loggedIn', null)
                    signout(function (res, err) {

                    });
                  }
                }}
                style={styles.button}>
                <Text style={styles.item}>{entry.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    marginTop: 5,
    fontWeight: '600',
  },
  button: {
    borderColor: '#000000',
    //backgroundColor: 'red',
    margin: 5,
  },
});

export default Setting;
