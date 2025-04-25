import { db } from '@/firebase';
import { doc, updateDoc, arrayUnion} from 'firebase/firestore';

export const updatePatientVaccinationField = async (patientId: string, vaccination: any) => {
    try {
        const patientRef = doc(db, 'patients', patientId);
        await updateDoc(patientRef, {
            vaccinations: arrayUnion(vaccination)
        });
    } catch (error) {
        console.error("Error adding vaccination to patient:", error);
        throw error;
    }
};
