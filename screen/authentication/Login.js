import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Context as AuthenticationContext } from '../context/AuthenticationContext';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const {signup, signin} = useContext(AuthenticationContext);
  const { signin } = useContext(AuthenticationContext)
  const [data, setData] = React.useState({
    userName: '',
    password: '',
    check_textInput: false,
    secureTextEntry: true,
  });

  const userEmails = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com']

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        userName: val,
        check_textInput: true,
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInput: false,
      });
    }
  };

  const passwordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const logIn = (userName, password) => {

    if (userEmails.includes(userName)) {
      signin(userName, password, function (result, error) {
        console.log('signin_result===>', { result, error })
        if (userEmails.includes(result.email)) {
          saveValue('loggedIn', result.email);
        }
      });
    } else {
      Alert.alert('Invailid Credential')
    }

  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFD580" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Good to see you again !!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.footer}>
          <Text style={styles.text_footer}> Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 35 }]}> Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => passwordChange(val)}
            />
            <TouchableOpacity onPress={updateSecuretextEntry}>
              {data.secureTextEntry ? (
                <FontAwesome name="eye-slash" color="grey" size={20} />
              ) : (
                  <FontAwesome name="eye" color="grey" size={20} />
                )}
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity>
            <Text style={{ color: '#2F96E6', marginTop: 15 }}>
              Forgot Password
            </Text>
          </TouchableOpacity> */}

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                logIn(data.userName, data.password);
              }}
              style={styles.signIn}>
              <LinearGradient
                colors={['#666666', '#2F96E6']}
                style={styles.signIn}>
                <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
}
export const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${key}`, `${value}`);
  } catch (e) {
    // saving error
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   image: {
//     marginBottom: 40,
//   },

//   inputView: {
//     backgroundColor: '#00000080',
//     borderRadius: 10,
//     width: '80%',
//     height: 45,
//     marginBottom: 10,
//     alignItems: 'center',
//   },

//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//   },

//   // forgot_button: {
//   //   height: 30,
//   //   marginBottom: 30,
//   // },

//   loginBtn: {
//     width: '80%',
//     borderRadius: 25,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     textShadowColor: '#FFFFFF',
//     // borderRadius:10,
//     borderColor: 'black',
//     backgroundColor: '#000019',
//   },
//   loginText: {
//     color: '#FFFFFF',
//   },
// });

/*
 return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> }

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#FFFFFF"
          autoCapitalize={'none'}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={{
        margin: 30
      }}>
        <Text>{error}</Text>

      </View>

      <TouchableOpacity style={styles.loginBtn}
      onPress={()=>{


        if(email.length > 0  && password.length){
          signin(email, password , function(result, error){
            if(result){
              setError("Signin successful")
            }else{

              if(error?.code === 50){
                setError("User not found, signup please" )
              }else{
                setError("Something went wrong, try again")
              }

            }
        })
         }else{
          setError("Please enter email and password")
         }


      }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}   onPress={()=>{
       if(email.length > 0  && password.length){
        signup(email, password, function(result, error){
          if(error != null || error  != undefined){
            if(error?.code === 49){
              setError("User already exists, try login " )
            }else{
              setError("Something went wrong")
            }

          }else{
            setError("Signup successful")
            signin(email, password , function(result, error){
              if(result){
                setError("Signin successful")
              }else{
                setError("Signin Failed")
              }});
          }
        })
       }else{
        setError("Please enter email and password")

       }


      }}>
        <Text style={styles.loginText}>SIGNUP</Text>
      </TouchableOpacity>
    </View>
  );
*/
