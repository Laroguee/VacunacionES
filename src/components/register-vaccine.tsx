'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { VaccineData } from '@/types/vaccine';
import { PatientData } from '@/types/patient';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface RegisterVaccineProps {
  onVaccineRegistered: (vaccineData: VaccineData) => void;
  patients: PatientData[];
}

const RegisterVaccine: React.FC<RegisterVaccineProps> = ({ onVaccineRegistered, patients }) => {
  const [vaccineType, setVaccineType] = useState<string>('');
  const [vaccineDate, setVaccineDate] = useState<Date | undefined>(new Date());
  const [nextAppointment, setNextAppointment] = useState<Date | undefined>(new Date());
  const [lotNumber, setLotNumber] = useState<string>('');
  const [doseNumber, setDoseNumber] = useState<string>('');
  const [observation, setObservation] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

  useEffect(() => {
    if (patients.length > 0) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  const handleVaccineRegistered = () => {
    if (!selectedPatient) {
      console.error('No patient selected');
      return;
    }
    const vaccineData = {
      patientDUI: selectedPatient.dui,
      vaccineType,
      vaccineDate,
      nextAppointment,
      lotNumber,
      doseNumber,
      observation,
    };
    onVaccineRegistered(vaccineData);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Agregar Vacuna</h2>      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <Label htmlFor="patient">Paciente</Label>
          <Select onValueChange={(value) => setSelectedPatient(patients.find(p => p.dui === value) || null)}>
            <SelectTrigger id="patient">
              <SelectValue placeholder="Selecciona un paciente" />
            </SelectTrigger>          
            <SelectContent>
              {patients.map(patient => (
                <SelectItem key={patient.dui} value={patient.dui}>{patient.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="vaccineType">Tipo de Vacuna</Label>
          <Input id="vaccineType" type="text" value={vaccineType} onChange={(e) => setVaccineType(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="vaccineDate">Fecha de Vacunación</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] pl-3 text-left font-normal',
                  !vaccineDate && 'text-muted-foreground'
                )}
              >
                {vaccineDate ? format(vaccineDate, 'PPP') : <span>Selecciona la fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={vaccineDate}
                onSelect={setVaccineDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="nextAppointment">Próxima Cita</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] pl-3 text-left font-normal',
                  !nextAppointment && 'text-muted-foreground'
                )}
              >
                {nextAppointment ? format(nextAppointment, 'PPP') : <span>Selecciona la fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={nextAppointment}
                onSelect={setNextAppointment}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="lotNumber">Número de Lote</Label>
          <Input id="lotNumber" type="text" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="doseNumber">Número de Dosis</Label>
          <Input id="doseNumber" type="text" value={doseNumber} onChange={(e) => setDoseNumber(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="observation">Observación</Label>
          <Input id="observation" type="text" value={observation} onChange={(e) => setObservation(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleVaccineRegistered} className="w-full col-span-full mt-4">Registrar Vacuna</Button>
    </div>
  );
};

export default RegisterVaccine;