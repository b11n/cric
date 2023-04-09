import { auth as authStore } from '../store/auth';

import { initDatabase } from './db';

export function isFeatureEnabled(featureName: string): Promise<boolean> {
    const {getFeatureUsers} = initDatabase();
    return new Promise((resolve, reject)=>{

        authStore.subscribe(async (user) => {
           const users = await getFeatureUsers(featureName);
           if(users && users.users.indexOf(user?.uid) >= 0 ){
            resolve(true);
           }else{
            resolve(false);
           }
        })
    })

}