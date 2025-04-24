import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export const addVaccineToScheme = async (vaccine: any) => {
  const docRef = await addDoc(collection(db, 'vaccinationScheme'), vaccine);
  return { id: docRef.id, ...vaccine };
};