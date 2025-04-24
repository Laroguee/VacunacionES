// src/components/SearchPatientForm.tsx
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SearchPatientFormProps {
  patients: any[];
  vaccinations: any[];
  onPatientUpdated: (patient: any) => void;
  onVaccineUpdated: (vaccination: any) => void;
  onDeleteVaccine: (vaccination: any) => void;
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

function SearchPatientForm({
  patients,
  vaccinations,
  onPatientUpdated,
  onVaccineUpdated,
  onDeleteVaccine,
  setSearchResults,
}: SearchPatientFormProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = patients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const dui = patient.dui.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) || dui.includes(searchQuery.toLowerCase());
    });
    setSearchResults(results);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Buscar Paciente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar Paciente</DialogTitle>
          <DialogDescription>
            Busque un paciente por nombre o DUI.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="searchQuery" className="text-right">
              Buscar
            </label>
            <input
              id="searchQuery"
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Buscar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SearchPatientForm;
```
```typescript
// src/components/AddPatientForm.tsx
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function AddPatientForm({ patients, onPatientAdded }: { patients: any[]; onPatientAdded: (patient: any) => void }) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [dui, setDui] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");

    const [firstNameError, setFirstNameError] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const [duiError, setDuiError] = React.useState("");
    const [dobError, setDobError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    const [addressError, setAddressError] = React.useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Form validation
        let hasErrors = false;

        if (!firstName) {
            setFirstNameError("El nombre es requerido");
            hasErrors = true;
        } else {
            setFirstNameError("");
        }

        if (!lastName) {
            setLastNameError("El apellido es requerido");
            hasErrors = true;
        } else {
            setLastNameError("");
        }

        if (!dui) {
            setDuiError("El DUI es requerido");
            hasErrors = true;
        } else {
            setDuiError("");
        }

        if (!dob) {
            setDobError("La fecha de nacimiento es requerida");
            hasErrors = true;
        } else {
            setDobError("");
        }

        if (!phone) {
            setPhoneError("El teléfono es requerido");
            hasErrors = true;
        } else {
            setPhoneError("");
        }

        if (!address) {
            setAddressError("La dirección es requerida");
            hasErrors = true;
        } else {
            setAddressError("");
        }

        if (hasErrors) {
            return;
        }

        const newPatient = {
            firstName,
            lastName,
            dui,
            dob,
            phone,
            address,
            vaccinations: [],
        };

        onPatientAdded(newPatient);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Agregar Paciente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar Paciente</DialogTitle>
                    <DialogDescription>
                        Complete todos los campos para agregar un nuevo paciente.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="firstName" className="text-right">
                            Nombres
                        </label>
                        <input
                            id="firstName"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {firstNameError && <p className="text-red-500">{firstNameError}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="lastName" className="text-right">
                            Apellidos
                        </label>
                        <input
                            id="lastName"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {lastNameError && <p className="text-red-500">{lastNameError}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="dui" className="text-right">
                            DUI
                        </label>
                        <input
                            id="dui"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            value={dui}
                            onChange={(e) => setDui(e.target.value)}
                        />
                        {duiError && <p className="text-red-500">{duiError}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="dob" className="text-right">
                            Fecha de nacimiento
                        </label>
                        <input
                            id="dob"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        {dobError && <p className="text-red-500">{dobError}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="phone" className="text-right">
                            Teléfono
                        </label>
                        <input
                            id="phone"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneError && <p className="text-red-500">{phoneError}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="address" className="text-right">
                            Dirección
                        </label>
                        <input
                            id="address"
                            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {addressError && <p className="text-red-500">{addressError}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddPatientForm;