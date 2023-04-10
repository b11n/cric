import { auth as authStore } from '../store/auth';

import { initDatabase } from './db';

export function isFeatureEnabled(featureName: string): Promise<boolean> {
    const {getFeatureUsers} = initDatabase();
    return new Promise((resolve, reject)=>{

        authStore.subscribe(async (user) => {
           const users = await getFeatureUsers(featureName);
           if(hasNotifications()){
            resolve(true);
           }else{
            resolve(false);
           }
        })
    })

}

function hasNotifications() {
    if ('PushManager' in window) {
        return true;
      } else {
        return false;
      }
}