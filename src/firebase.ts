import { useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from './constants';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey: 'BF_CepDzGtSt0NgAbuFy0rVMVl1cweyR3SBIbN9FprYP7aTKFkdb09eDK4kVkqbGIbXxvhBntWqbMjixrX4DF2g',
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
