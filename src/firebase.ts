import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, DocumentData, FieldPath, getDocs, getFirestore, orderBy, OrderByDirection, query, updateDoc, where } from 'firebase/firestore';

export const firebaseConfig = {
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

export const addDocument = async (collectionName: string, documentData: any) => {
    const collectionRef = collection(db, collectionName);

    await addDoc(collectionRef, documentData);
}

export const getDocuments = async (uid: string, collectionName: string, orderByType: { field: string | FieldPath, direction: OrderByDirection }) => {
    const collectionRef = collection(db, collectionName);
    const collectionQuery = query(collectionRef, where('userId', '==', uid), orderBy(orderByType.field, orderByType.direction));
    const documentsSnapshot = await getDocs(collectionQuery);

    const documents: DocumentData = [];

    documentsSnapshot.forEach(doc => {
        const data = {
            id: doc.id,
            ...doc.data()
        }

        documents.push(data);
    })

    return documents;
}

export const updateDocument = async (collectionName: string, id: string, updatedData: any) => {
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, {...updatedData});
}

export const deleteDocument = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);

    await deleteDoc(docRef);
}