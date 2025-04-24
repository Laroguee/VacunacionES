// src/components/VaccineRegistrationForm.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function VaccineRegistrationForm({
  patient,
  vaccinations,
  onVaccineAdded,
}: {
  patient: any;
  vaccinations: any[];
  onVaccineAdded: (patient: any, vaccine: any) => void;
}) {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [dateError, setDateError] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasErrors = false;

    if (!name) {
      setNameError("El nombre es requerido");
      hasErrors = true;
    } else {
      setNameError("");
    }

    if (!date) {
      setDateError("La fecha es requerida");
      hasErrors = true;
    } else {
      setDateError("");
    }

    if (hasErrors) {
      return;
    }
    const newVaccination = {
      name,
      date,
    };
    onVaccineAdded(patient, newVaccination);
  };

  return (
    <Dialog open={!!patient}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Vacuna</DialogTitle>
          <DialogDescription>
            Agregue una nueva vacuna al paciente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Nombre
            </label>
            <input
              id="name"
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right">
              Fecha
            </label>
            <input
              id="date"
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {dateError && <p className="text-red-500">{dateError}</p>}
          </div>

          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default VaccineRegistrationForm;