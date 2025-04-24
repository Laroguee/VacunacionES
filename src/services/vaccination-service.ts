import { db } from '@/firebase';
import { doc, updateDoc, arrayUnion} from 'firebase/firestore';

export const updatePatientVaccination = async (patientId: string, vaccination: any) => {
  console.log("Attempting to update vaccination for patient:", patientId, vaccination);
  try {
    const patientRef = doc(db, 'patients', patientId);
    await updateDoc(patientRef, {
      vaccinations: arrayUnion(vaccination)
    });
    console.log("Vaccination added successfully for patient:", patientId);
  } catch (error) {
    console.error("Error adding vaccination:", error);
    throw error;
  }
};
