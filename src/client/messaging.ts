import lodash from 'lodash';
const { memoize } = lodash;
import { getMessaging,getToken } from "firebase/messaging";

import { initFirebase } from './firebase';

const MESSAGING_PUBLIC_KEY = 'BA9Nx6H9Qki422FegfXCpTAUORHtmiZ1CNpwo12tz1tFYZxhcm5BRjNYTwqHgXvZTOD5diMz35yUodmsWMBA15M';

export const initMessaging = memoize(()=>{
    const { app } = initFirebase();
    const messaging = getMessaging(app);


    function getRegistrationToken() {
      return new Promise((resolve, reject)=>{
        getToken(messaging, { vapidKey: MESSAGING_PUBLIC_KEY }).then((currentToken) => {
          if (currentToken) {
            resolve(currentToken);
          } else {
            reject('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          reject(err);
        });
      })

    }

    return {getRegistrationToken}
})