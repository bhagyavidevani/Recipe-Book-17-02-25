import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";

const SignUpFailed = (msg) => {
  return {
    type: "SIGNUP_REJ",
    payload: msg,
  };
};

const SignUpSucces = () => {
  return {
    type: "SIGNUP_SUC",
  };
};
const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUC",
  };
};
const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUC",
    payload: user,
  };
};

const loginSuc = (user) => {
  return {
    type: "LOGIN_SUC",
    payload: user
  };
};

const loginFail = (msg) => {
  return {
    type: "LOGIN_FAIL",
    payload: msg
  };
};

export const loginUserAsync = (data) => {
  return async (dispatch) => {
    // console.log(data);
    let userRef = await signInWithEmailAndPassword(
      auth,
      data.Email,
      data.Password
    );
    // console.log(userRef);
    dispatch(loginSuccess(userRef.user));
  };
};

export const addNewUserAsync = (data) => {
  return async (dispatch) => {
    try {
      let newUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(newUser);
      dispatch(SignUpSucces());
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Firebase Failed if");
        dispatch(SignUpFailed("Already SignUp, Please Login !!!"));
      } else {
        console.log("Firebase Failed else");
        dispatch(SignUpFailed(error.message));
      }
    }
  };
};

export const logOutAsync = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logoutSuccess());
  };
};

export const googleLoginAsync = () => {
  return async (dispatch) => {
    try {
      const auth =getAuth();
      let provider = new GoogleAuthProvider();
      console.log('Starting Google login...');
      const userRef = await signInWithPopup(auth, provider);
      const user = userRef.user;
      console.log('Google login successful:', user);
      user.id = user.uid;
      dispatch(loginSuc(user)); 
    } catch (error) {
      console.error('Google login failed:', error);
      dispatch(loginFail(error.message)); 
    }
  };
};
