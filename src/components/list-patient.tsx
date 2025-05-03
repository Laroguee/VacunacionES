'use client'
import React, { useState } from "react";
import { VaccineData } from "@/types/vaccine";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react'

interface PatientData {
    id: string;
    name: string;
    dui: string;
    cellphone: string;
    vaccinations?: VaccineData[];
}

interface ListPatientProps {
    patients: PatientData[];
    onVaccineRegistered: (vaccineData: VaccineData) => void;

}

const ListPatient: React.FC<ListPatientProps> = ({ patients, onVaccineRegistered }) => {
    const [showVaccinations, setShowVaccinations] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

    
    const handleShowVaccinations = (patient: PatientData) => {
        setSelectedPatient(patient);
        setShowVaccinations(true);
    };

    const handleCloseVaccinations = () => {
        setShowVaccinations(false);
        setSelectedPatient(null);
    }

    const uniquePatients = new Set<string>();
    const patientsWithoutDuplicates = patients.filter((patient) => {
        if (uniquePatients.has(patient.dui)) return false;
        uniquePatients.add(patient.dui);
        return true;
    });
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Listado de Pacientes</h2>
            <ul className="space-y-4">{patientsWithoutDuplicates.map(patient => (
                <li key={patient.id} className="border p-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            <Button onClick={() => handleShowVaccinations(patient)}>Ver Vacunas</Button>
                        </div>
                        <p>DUI: {patient.dui}</p>
                        <p>Teléfono: {patient.cellphone}</p>
                    </li>
                ))}
            </ul>            
            {showVaccinations && selectedPatient && selectedPatient.vaccinations && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md relative">
                        <Button className="absolute top-2 right-2" onClick={handleCloseVaccinations}><X size={16}/></Button>
                        <h3 className="text-lg font-semibold mb-4">Vacunas de {selectedPatient.name}</h3>
                        {selectedPatient.vaccinations.length > 0 ? (
                            <ul className="space-y-2">
                                {selectedPatient.vaccinations.map(vaccine => (
                                    <li key={vaccine.lotNumber}>
                                        <p>Tipo: {vaccine.vaccineType}</p>
                                        <p>Fecha: {vaccine.vaccineDate}</p>
                                        <p>Lote: {vaccine.lotNumber}</p>
                                        <p>Dosis: {vaccine.doseNumber}</p>
                                        <p>Observación: {vaccine.observation}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay vacunas registradas</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListPatient;