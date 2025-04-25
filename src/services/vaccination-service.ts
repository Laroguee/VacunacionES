import { db } from '@/firebase';
import { doc,  collection, getDocs, addDoc} from 'firebase/firestore';

export const updatePatientVaccination = async (patientId: string, vaccination: any) => {
    try {
        const vaccinationsCollection = collection(db, 'vaccinations');
        const newVaccination = {
            ...vaccination,
            patientId: patientId
        };
        await addDoc(vaccinationsCollection, newVaccination);
    } catch (error) {
        console.error("Error adding vaccination:", error);
        throw error;
    }
};

export const getAllVaccinations = async () => {
    const vaccinationsCollection = collection(db, 'vaccinations');
    const snapshot = await getDocs(vaccinationsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
