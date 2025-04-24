'use client'
import React, { useState } from 'react';
import { PatientData } from '@/types/patient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
interface FormCreatePatientProps {
    onPatientCreated: (patientData: PatientData) => void;
}

const FormCreatePatient: React.FC<FormCreatePatientProps> = ({ onPatientCreated }) => {
    const [name, setName] = useState('');
    const [dui, setDui] = useState('');
    const [cellphone, setCellphone] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newPatient: PatientData = {
            name,
            dui,
            cellphone,
        };
        onPatientCreated(newPatient);
        setName('');
        setDui('');
        setCellphone('');
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
                    <div>
                        <Label htmlFor="dui">DUI</Label>
                        <Input
                            type="text"
                            id="dui"
                            value={dui}
                            onChange={(e) => setDui(e.target.value)}
                            required
                        />
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
                    <Button className="w-full col-span-full" type="submit">Agregar</Button>
                </form>
            </div>
        </div>
    );
};

export default FormCreatePatient;