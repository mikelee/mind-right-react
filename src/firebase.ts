import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDVNc_hcsOwjf8SbHvbvgs9MdPd7ZVyftQ',
  authDomain: 'mind-right-d74a0.firebaseapp.com',
  projectId: 'mind-right-d74a0',
  storageBucket: 'mind-right-d74a0.appspot.com',
  messagingSenderId: '553059270622',
  appId: '1:553059270622:web:042404e32dffee986b674f',
  measurementId: 'G-4J6LVW0T80'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

interface UserData {
  email: string | null,
  uid: string
}

export const addNewUser = async (userData: UserData) => {
  try {
    await addDoc(collection(db, 'users'), {
      ...userData
    });
  } catch (error) {
    console.log(error)
  }
}