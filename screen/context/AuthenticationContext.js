import authenticationContextReducer from "./AuthenticationContextReducer";
import createDataContext from './createDataContext';
import { Alert } from "react-native";
import { saveValue } from "../authentication/Login";

const signin = (dispatch) => async (email, password, callback) => {
    try {
        dispatch({
            type: "signin",
            email,
            password
        })
        callback({
            email, password
        }, null)

    } catch (error) {
        callback(null, error)
    }
}

const signup = (dispatch) => async (email, password, callback) => {
    try {
        callback({
            email, password
        }, null)

    } catch (error) {
        callback(null, error)
    }
}


const signout = (dispatch) => async (callback) => {
    try {
        // if (app.currentUser == null) {
        // Alert.alert("Logout done")
        saveValue('loggedIn', null)
        dispatch({
            type: "signout",
            user: null
        });
        callback({}, null)
        // return;
        // }
        // await app.currentUser.logOut();
        // dispatch({
        //     type: "signout",
        //     user: null
        // });
    } catch (error) {
        console.log("signout==>", error)
        // callback(null, error)
    }
}



export const { Provider, Context } = createDataContext(
    authenticationContextReducer,
    {
        signup,
        signout,
        signin,

    },
    {
        user: null,
        // user: { name: '' },
    },
);
