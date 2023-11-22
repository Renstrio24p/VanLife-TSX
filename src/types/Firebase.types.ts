import { FirebaseOptions } from "firebase/app";

export interface FirebaseTypes extends FirebaseOptions {
    apiKey: string | undefined,
    authDomain: string | undefined,
    projectId: string | undefined,
    storageBucket: string | undefined,
    messagingSenderId: string | undefined,
    appId: string | undefined
}