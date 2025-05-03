'use client'
import React, { useState } from 'react';
import { PatientData } from '@/types/patient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { isValidDUI } from '@/services/dui-validator';
interface FormCreatePatientProps {
    onPatientCreated: (patientData: PatientData) => void;
}

const FormCreatePatient: React.FC<FormCreatePatientProps> = ({ onPatientCreated }) => {
    const [name, setName] = useState('');
    const [dui, setDui] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [tutorName, setTutorName] = useState('');
    const [tutorRelationship, setTutorRelationship] = useState('');    
    const [duiError, setDuiError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        if (!isValidDUI(dui)) {
            setDuiError('DUI inválido');
            return;
        }else{
            setDuiError('');
        }

        event.preventDefault();
        const newPatient: PatientData = {
            name,
            dui,
            cellphone,
            ...(tutorName && tutorRelationship && {
                tutorInfo: {
                    name: tutorName,
                    relationship: tutorRelationship,
                },
            }),
        };
        onPatientCreated(newPatient);
        setName('');
        setDui('');
        setCellphone('');
        setTutorName('');
        setTutorRelationship('');
    };

    return (        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
                <h2 className="text-2xl font-bold mb-4">Agregar Paciente</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                         <Label htmlFor="dui">DUI</Label>
                         <Input
                             type="text"
                             id="dui"
                             value={dui}
                             onChange={(e) => {
                                setDui(e.target.value);
                                setDuiError(''); // Limpiar el error al cambiar el valor
                            }}
                             required
                         />
                         {duiError && <p className='text-red-500 text-sm'>{duiError}</p>}
                    </div>
                    <div>
                        <Label htmlFor="cellphone">Teléfono</Label>
                        <Input
                            type="text"
                            id="cellphone"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="tutorName">Nombre del Tutor Legal</Label>
                        <Input
                            type="text"
                            id="tutorName"
                            value={tutorName}
                            onChange={(e) => setTutorName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tutorRelationship">Parentesco con el Paciente</Label>
                        <Input
                            type="text"
                            id="tutorRelationship"
                            value={tutorRelationship}
                            onChange={(e) => setTutorRelationship(e.target.value)}
                        />
                    </div>
                    <Button className="w-full col-span-full" type="submit">Agregar</Button>
                </form>
            </div>
        </div>
    );
};

export default FormCreatePatient;