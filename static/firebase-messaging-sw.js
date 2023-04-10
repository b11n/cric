importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    'appId': "1:118555486401:web:e2d5903212a7b683f08c40",
    'apiKey': "AIzaSyCNNBiUk8vJCF5a9CnnW1Xc4ftXIQw_rqk",
    'projectId': "cric-eafdb",
    'messagingSenderId': '118555486401'
  });

const messaging = firebase.messaging();