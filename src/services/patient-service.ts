import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where, doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const patientsCollection = collection(db, 'patients');
const vaccinesCollection = collection(db, 'vaccines');

export const getAllPatients = async () => {  
    try {
      const snapshot = await getDocs(patientsCollection);
      const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return patients;
    } catch (error) {
      console.error("Error in getAllPatients:", error);
      throw error;
    }
};

export const addPatient = async (patientData: any) => {
  const patientWithTimestamp = {
    ...patientData,
    createdAt: serverTimestamp() // Add the server timestamp
  };
  const docRef = await addDoc(patientsCollection, patientWithTimestamp);
  return { id: docRef.id, ...patientWithTimestamp };
};
export const checkDuplicateDUI = async (dui: string) => {
  const q = query(patientsCollection, where("dui", "==", dui));
  const querySnapshot = await getDocs(q);
    const isDuplicate = !querySnapshot.empty;
  return isDuplicate;
};

export const updatePatient = async (id: string, patientData: any) => {
    const patientDocRef = doc(patientsCollection, id);
    await updateDoc(patientDocRef, patientData);
};

export const deletePatient = async (id: string) => {
  const patientDocRef = doc(patientsCollection, id);
  await deleteDoc(patientDocRef);
};

export const deleteVaccineFromPatient = async (patientId: string, vaccinationToDelete: any) => {
    const patientDocRef = doc(patientsCollection, patientId);
    const patientSnapshot = await getDoc(patientDocRef);
    if (!patientSnapshot.exists()) {
        throw new Error(`Patient with ID ${patientId} not found`);
    }
    const currentPatientData = patientSnapshot.data();
    const updatedVaccinations = currentPatientData.vaccinations.filter((vaccination: any) => vaccination.vaccineType !== vaccinationToDelete.vaccineType && vaccination.vaccineDate !== vaccinationToDelete.vaccineDate);
    await updateDoc(patientDocRef, { vaccinations: updatedVaccinations });
};

export const getAllVaccines = async () => {
    const snapshot = await getDocs(vaccinesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addVaccine = async (vaccineData: any) => {
    const docRef = await addDoc(vaccinesCollection, vaccineData);
    return { id: docRef.id, ...vaccineData };
};

export const updateVaccine = async (id: string, vaccineData: any) => {
    const vaccineDocRef = doc(vaccinesCollection, id);
    await updateDoc(vaccineDocRef, vaccineData);
};

export const deleteVaccine = async (id: string) => {
    const vaccineDocRef = doc(vaccinesCollection, id);
    await deleteDoc(vaccineDocRef);
};