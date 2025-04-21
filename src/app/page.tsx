'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateDui } from "@/services/dui-validator";
import { useToast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import html2canvas from 'html2canvas';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for actual authentication logic
    if (username === "doctor" && password === "password") {
      onLogin();
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center mb-6">
              <h1 className="text-3xl font-bold mb-2">VacunaciónES</h1>
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg" // Replace with the actual path to your flag image
                  alt="Bandera de El Salvador"
                  className="w-20 h-12 object-contain"
              />
          </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
    { name: 'Inicio', icon: 'home' },
    { name: 'Agregar Paciente', icon: 'plusCircle' },
    { name: 'Buscar Paciente', icon: 'search' },
    { name: 'Registro de Vacuna', icon: 'edit' },
    { name: 'Esquema Nacional de Vacunación', icon: 'slidersHorizontal' },
];

// Add Patient Form Component
function AddPatientForm({ onPatientAdded }: { onPatientAdded: (patient: any) => void }) {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dui, setDui] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

   const [firstNameError, setFirstNameError] = useState("");
   const [lastNameError, setLastNameError] = useState("");
   const [duiError, setDuiError] = useState("");
   const [dobError, setDobError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [addressError, setAddressError] = useState("");


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        setPhoneError("El número de teléfono es requerido");
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


    const duiValidationResult = await validateDui(dui);
    if (!duiValidationResult.isValid) {
      toast({
        title: "Error",
        description: duiValidationResult.errorMessage || "DUI inválido",
        variant: "destructive",
      });
      return;
    }

    // Create patient object
    const patientData = {
      firstName,
      lastName,
      dui,
      dob,
      phone,
      address,
      vaccinations: [], // Initialize with an empty array for vaccinations
    };

    onPatientAdded(patientData);

    toast({
      title: "Éxito",
      description: "¡Paciente agregado exitosamente!",
    });

    // Clear the form
    setFirstName("");
    setLastName("");
    setDui("");
    setDob("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Paciente</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="firstName">Nombre</Label>
          <Input type="text" id="firstName" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
           {firstNameError && <p className="text-red-500 text-xs">{firstNameError}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Apellido</Label>
          <Input type="text" id="lastName" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          {lastNameError && <p className="text-red-500 text-xs">{lastNameError}</p>}
        </div>
        <div>
          <Label htmlFor="dui">DUI (########-#)</Label>
          <Input type="text" id="dui" placeholder="########-#" value={dui} onChange={(e) => setDui(e.target.value)} />
           {duiError && <p className="text-red-500 text-xs">{duiError}</p>}
        </div>
        <div>
          <Label htmlFor="dob">Fecha de Nacimiento</Label>
          <Input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
           {dobError && <p className="text-red-500 text-xs">{dobError}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Número de Teléfono</Label>
          <Input type="tel" id="phone" placeholder="Número de Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)}/>
           {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input type="text" id="address" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)}/>
           {addressError && <p className="text-red-500 text-xs">{addressError}</p>}
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Agregar Paciente</Button>
        </div>
      </form>
    </div>
  );
}

// Search Patient Form Component
function SearchPatientForm({ patients, vaccinations, onPatientUpdated, onVaccineUpdated, onDeleteVaccine, setSearchResults }: { patients: any[], vaccinations: any[], onPatientUpdated: (patient: any) => void, onVaccineUpdated: (vaccination: any) => void, onDeleteVaccine: (vaccination: any) => void, setSearchResults: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [searchName, setSearchName] = useState("");
    const [searchDUI, setSearchDUI] = useState("");
    const { toast } = useToast();
    const [searchResultsLocal, setSearchResultsLocal] = useState<any[]>([]);
    const [editingPatient, setEditingPatient] = useState<string | null>(null); // Track which patient is being edited
    const [editedFirstName, setEditedFirstName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedDob, setEditedDob] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedAddress, setEditedAddress] = useState("");

    const [editingVaccine, setEditingVaccine] = useState<string | null>(null);
    const [editedVaccineType, setEditedVaccineType] = useState("");
    const [editedVaccineDate, setEditedVaccineDate] = useState("");
    const [editedDoseNumber, setEditedDoseNumber] = useState("");
    const [editedLotNumber, setEditedLotNumber] = useState("");
    const [editedObservation, setEditedObservation] = useState("");


    const generateImage = async (patient: any) => {
        const element = document.getElementById('vaccination-history-' + patient.dui);

        if (!element) {
            toast({
                title: "Error",
                description: "No se pudo encontrar el historial de vacunación para exportar.",
                variant: "destructive",
            });
            return;
        }
        const patientInfo = document.createElement('div');
        patientInfo.style.textAlign = 'center';
        patientInfo.style.fontSize = '16px';
        patientInfo.style.marginBottom = '10px';
        patientInfo.innerHTML = `<strong>${patient.firstName} ${patient.lastName}</strong><br/>DUI: ${patient.dui}`;

        element.insertBefore(patientInfo, element.firstChild);

        try {
            const canvas = await html2canvas(element);
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `${patient.firstName}_${patient.lastName}_vaccination_history.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating image:", error);
            toast({
                title: "Error",
                description: "Error al generar la imagen.",
                variant: "destructive",
            });
        } finally {
            element.removeChild(patientInfo);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!searchName && !searchDUI) {
            toast({
                title: "Advertencia",
                description: "Por favor, ingrese un nombre o DUI para buscar.",
            });
            return;
        }

        let results = patients.filter(patient =>
            (searchName && (patient.firstName.toLowerCase().includes(searchName.toLowerCase()) || patient.lastName.toLowerCase().includes(searchName.toLowerCase()))) ||
            (searchDUI && patient.dui === searchDUI)
        );

        // Add vaccination data to the search results
        results = results.map(patient => {
            const patientVaccinations = vaccinations.filter(vaccination => vaccination.patientDUI === patient.dui);
            return { ...patient, vaccinations: patientVaccinations };
        });


        setSearchResults(results);
        setSearchResultsLocal(results);

        if (results.length === 0) {
            toast({
                title: "Información",
                description: "No se encontraron pacientes que coincidan.",
            });
        } else {
            toast({
                title: "Éxito",
                description: "¡Paciente(s) encontrado(s)!",
            });
        }
    };

    const enableEditing = (patient: any) => {
        setEditingPatient(patient.dui);
        setEditedFirstName(patient.firstName);
        setEditedLastName(patient.lastName);
        setEditedDob(patient.dob);
        setEditedPhone(patient.phone);
        setEditedAddress(patient.address);
    };

    const cancelEditing = () => {
        setEditingPatient(null);
    };

    const saveChanges = (patient: any) => {
        // Prepare updated patient data
        const updatedPatient = {
            ...patient,
            firstName: editedFirstName,
            lastName: editedLastName,
            dob: editedDob,
            phone: editedPhone,
            address: editedAddress,
        };

        onPatientUpdated(updatedPatient);  // Update the patient

        setEditingPatient(null); // Exit editing mode
        toast({
            title: "Éxito",
            description: "¡Información del paciente actualizada exitosamente!",
        });
    };

    const enableVaccineEditing = (vaccination: any) => {
        setEditingVaccine(vaccination.vaccineType);
        setEditedVaccineType(vaccination.vaccineType);
        setEditedVaccineDate(vaccination.vaccineDate);
        setEditedDoseNumber(vaccination.doseNumber);
        setEditedLotNumber(vaccination.lotNumber);
        setEditedObservation(vaccination.observation);
    };

    const cancelVaccineEditing = () => {
        setEditingVaccine(null);
    };

     const saveVaccineChanges = (vaccination: any) => {
         // Prepare updated vaccination data
         const updatedVaccination = {
             ...vaccination,
             vaccineType: editedVaccineType,
             vaccineDate: editedVaccineDate,
             doseNumber: editedDoseNumber,
             lotNumber: editedLotNumber,
             observation: editedObservation,
         };

         onVaccineUpdated(updatedVaccination);  // Update the vaccination

         setEditingVaccine(null); // Exit editing mode
         toast({
             title: "Éxito",
             description: "¡Información de la vacuna actualizada exitosamente!",
         });
     };

    const handleDeleteVaccine = (vaccination: any) => {
        // Update vaccinations state
        onDeleteVaccine(vaccination);

        setSearchResults(prevResults =>
            prevResults.map(result => {
                if (result.dui === vaccination.patientDUI) {
                    return {
                        ...result,
                        vaccinations: result.vaccinations.filter(v => v !== vaccination)
                    };
                }
                return result;
            })
        );
        toast({
            title: "Éxito",
            description: "¡Vacuna eliminada exitosamente!",
        });
    };


    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Buscar Paciente</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="searchName">Nombre</Label>
                    <Input type="text" id="searchName" placeholder="Nombre" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="searchDUI">DUI</Label>
                    <Input type="text" id="searchDUI" placeholder="DUI" value={searchDUI} onChange={(e) => setSearchDUI(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <Button type="submit">Buscar Paciente</Button>
                </div>
            </form>

            {searchResultsLocal.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Resultados de la Búsqueda</h3>
                    <ul>
                        {searchResultsLocal.map((patient, index) => (
                            <li key={index} className="mb-2 p-3 border rounded">
                                {editingPatient === patient.dui ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor={`firstName-${patient.dui}`}>Nombre</Label>
                                                <Input
                                                    type="text"
                                                    id={`firstName-${patient.dui}`}
                                                    value={editedFirstName}
                                                    onChange={(e) => setEditedFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`lastName-${patient.dui}`}>Apellido</Label>
                                                <Input
                                                    type="text"
                                                    id={`lastName-${patient.dui}`}
                                                    value={editedLastName}
                                                    onChange={(e) => setEditedLastName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`dob-${patient.dui}`}>Fecha de Nacimiento</Label>
                                                <Input
                                                    type="date"
                                                    id={`dob-${patient.dui}`}
                                                    value={editedDob}
                                                    onChange={(e) => setEditedDob(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`phone-${patient.dui}`}>Número de Teléfono</Label>
                                                <Input
                                                    type="tel"
                                                    id={`phone-${patient.dui}`}
                                                    value={editedPhone}
                                                    onChange={(e) => setEditedPhone(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`address-${patient.dui}`}>Dirección</Label>
                                                <Input
                                                    type="text"
                                                    id={`address-${patient.dui}`}
                                                    value={editedAddress}
                                                    onChange={(e) => setEditedAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <Button onClick={() => saveChanges(patient)}>Guardar</Button>
                                            <Button variant="secondary" onClick={cancelEditing}>Cancelar</Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <p>
                                                <strong>Nombre:</strong> {patient.firstName} {patient.lastName}, <strong>DUI:</strong> {patient.dui}
                                            </p>
                                            <div>
                                                <Button variant="outline" size="icon" onClick={() => enableEditing(patient)}>
                                                    <Icons.edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p><strong>Fecha de Nacimiento:</strong> {patient.dob}, <strong>Teléfono:</strong> {patient.phone}, <strong>Dirección:</strong> {patient.address}</p>
                                    </>
                                )}


                                <div id={`vaccination-history-${patient.dui}`}>
                                    {patient.vaccinations && patient.vaccinations.length > 0 && (
                                        <>
                                            <h4 className="text-lg font-bold mt-2">Historial de Vacunación:</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nº</TableHead>
                                                        <TableHead>Vacuna</TableHead>
                                                        <TableHead>Fecha Aplicación</TableHead>
                                                        <TableHead>Dosis</TableHead>
                                                        <TableHead>Lote</TableHead>
                                                        <TableHead>Observaciones</TableHead>
                                                        <TableHead>Acciones</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {patient.vaccinations.map((vaccination, vacIndex) => (
                                                        <TableRow key={vacIndex}>
                                                            <TableCell>{vacIndex + 1}</TableCell>
                                                            {editingVaccine === vaccination.vaccineType ? (
                                                                <>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="text"
                                                                            value={editedVaccineType}
                                                                            onChange={(e) => setEditedVaccineType(e.target.value)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="date"
                                                                            value={editedVaccineDate}
                                                                            onChange={(e) => setEditedVaccineDate(e.target.value)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="text"
                                                                            value={editedDoseNumber}
                                                                            onChange={(e) => setEditedDoseNumber(e.target.value)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="text"
                                                                            value={editedLotNumber}
                                                                            onChange={(e) => setEditedLotNumber(e.target.value)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="text"
                                                                            value={editedObservation}
                                                                            onChange={(e) => setEditedObservation(e.target.value)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button onClick={() => saveVaccineChanges(vaccination)}>Guardar</Button>
                                                                        <Button variant="secondary" onClick={cancelVaccineEditing}>Cancelar</Button>
                                                                    </TableCell>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <TableCell>{vaccination.vaccineType}</TableCell>
                                                                    <TableCell>{vaccination.vaccineDate}</TableCell>
                                                                    <TableCell>{vaccination.doseNumber}</TableCell>
                                                                    <TableCell>{vaccination.lotNumber}</TableCell>
                                                                    <TableCell>{vaccination.observation}</TableCell>
                                                                    <TableCell>
                                                                        <Button variant="outline" size="icon" onClick={() => enableVaccineEditing(vaccination)}>
                                                                            <Icons.edit className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button variant="outline" size="icon" onClick={() => handleDeleteVaccine(vaccination)}>
                                                                            <Icons.trash className="h-4 w-4" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </>
                                                            )}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </>
                                    )}
                                </div>
                                <Button onClick={() => generateImage(patient)}>Descargar Imagen</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Vaccine Registration Form Component
function VaccineRegistrationForm({vaccinationScheme, patients, onVaccineRegistered}: {vaccinationScheme: VaccineData[], patients: any[], onVaccineRegistered: (vaccination: any) => void}) {
  const [patientName, setPatientName] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [nextAppointment, setNextAppointment] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [doseNumber, setDoseNumber] = useState("");
  const [observation, setObservation] = useState("");
  const { toast } = useToast();

   const [nextAppointmentError, setNextAppointmentError] = useState("");

   const handleVaccineRegistration = (event: React.FormEvent) => {
       event.preventDefault();

       if (!patientName || !vaccineType || !vaccineDate) {
           toast({
               title: "Advertencia",
               description: "Por favor, complete todos los campos.",
               variant: "destructive",
           });
           return;
       }

       let hasErrors = false;

       if (!nextAppointment) {
           setNextAppointmentError("La fecha de la próxima cita es requerida");
           hasErrors = true;
       } else {
           setNextAppointmentError("");
       }

       if (hasErrors) {
           return;
       }

       // Find the patient object based on the selected patientName
       const patient = patients.find(p => `${p.firstName} ${p.lastName}` === patientName);

       if (!patient) {
           toast({
               title: "Error",
               description: "Paciente seleccionado no encontrado.",
               variant: "destructive",
           });
           return;
       }

        // Create vaccine registration object
        const vaccineData = {
            patientDUI: patient.dui,
            vaccineType,
            vaccineDate,
            nextAppointment,
            lotNumber,
            doseNumber,
            observation
        };

        onVaccineRegistered(vaccineData); // Pass the new vaccination data to the parent

       toast({
           title: "Éxito",
           description: "¡Vacuna registrada exitosamente!",
       });
   };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Registro de Vacuna</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleVaccineRegistration}>
           <div>
               <Label htmlFor="patientName">Nombre del Paciente</Label>
               <Select onValueChange={setPatientName} defaultValue={patientName}>
                   <SelectTrigger id="patientName">
                       <SelectValue placeholder="Seleccione un paciente" />
                   </SelectTrigger>
                   <SelectContent>
                       {patients.map((patient, index) => (
                           <SelectItem key={index} value={`${patient.firstName} ${patient.lastName}`}>
                               {patient.firstName} {patient.lastName}
                           </SelectItem>
                       ))}
                   </SelectContent>
               </Select>
           </div>
         <div>
             <Label htmlFor="vaccineType">Tipo de Vacuna</Label>
             <Select onValueChange={setVaccineType} defaultValue={vaccineType}>
                 <SelectTrigger id="vaccineType">
                     <SelectValue placeholder="Seleccione una vacuna" />
                 </SelectTrigger>
                 <SelectContent>
                     {vaccinationScheme.map((vaccine, index) => (
                         <SelectItem key={vaccine.vaccine} value={vaccine.vaccine}>{vaccine.vaccine}</SelectItem>
                     ))}
                  </SelectContent>
             </Select>
         </div>
        <div>
          <Label htmlFor="vaccineDate">Fecha de Vacunación</Label>
          <Input type="date" id="vaccineDate" value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="nextAppointment">Fecha de la Próxima Cita</Label>
          <Input type="date" id="nextAppointment" value={nextAppointment} onChange={(e) => setNextAppointment(e.target.value)}/>
           {nextAppointmentError && <p className="text-red-500 text-xs">{nextAppointmentError}</p>}
        </div>
          <div>
              <Label htmlFor="lotNumber">Número de Lote</Label>
              <Input type="text" id="lotNumber" placeholder="Número de Lote" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)}/>
          </div>
          <div>
              <Label htmlFor="doseNumber">Número de Dosis</Label>
              <Input type="text" id="doseNumber" placeholder="Número de Dosis" value={doseNumber} onChange={(e) => setDoseNumber(e.target.value)}/>
          </div>
          <div>
              <Label htmlFor="observation">Observación (Opcional)</Label>
              <Input type="text" id="observation" placeholder="Observación" value={observation} onChange={(e) => setObservation(e.target.value)}/>
          </div>
        <div className="md:col-span-2">
          <Button type="submit">Registrar Vacuna</Button>
        </div>
      </form>
    </div>
  );
}

// Vaccine Data Type
interface VaccineData {
  ageStage: string;
  vaccine: string;
}

//Component to Add Vaccine
function AddVaccineDialog({ onVaccineAdded }: { onVaccineAdded: (vaccine: VaccineData) => void }) {
  const [ageStage, setAgeStage] = useState("");
  const [vaccine, setVaccine] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onVaccineAdded({ ageStage, vaccine });
    setAgeStage("");
    setVaccine("");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Agregar Nueva Vacuna</DialogTitle>
        <DialogDescription>
          Agregue una nueva vacuna al esquema nacional de vacunación.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="ageStage">Edad/Etapa</Label>
          <Input
            type="text"
            id="ageStage"
            placeholder="Edad/Etapa"
            value={ageStage}
            onChange={(e) => setAgeStage(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="vaccine">Vacuna</Label>
          <Input
            type="text"
            id="vaccine"
            placeholder="Vacuna"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Agregar Vacuna</Button>
        </div>
      </form>
    </DialogContent>
  );
}

// Component to Edit Vaccine
function EditVaccineDialog({ vaccineData, onVaccineUpdated, onCancel }: { vaccineData: VaccineData, onVaccineUpdated: (vaccine: VaccineData) => void, onCancel: () => void }) {
  const [ageStage, setAgeStage] = useState(vaccineData.ageStage);
  const [vaccine, setVaccine] = useState(vaccineData.vaccine);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onVaccineUpdated({ ageStage, vaccine });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Vacuna</DialogTitle>
        <DialogDescription>
          Edite los detalles de la vacuna en el esquema nacional de vacunación.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="editAgeStage">Edad/Etapa</Label>
          <Input
            type="text"
            id="editAgeStage"
            placeholder="Edad/Etapa"
            value={ageStage}
            onChange={(e) => setAgeStage(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="editVaccine">Vacuna</Label>
          <Input
            type="text"
            id="editVaccine"
            placeholder="Vacuna"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancelar
              </Button>
          </DialogClose>
          <Button type="submit">Actualizar Vacuna</Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Inicio');
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([
    // { firstName: 'John', lastName: 'Doe', dui: '12345678-9', dob: '2000-01-01', phone: '1234-5678', address: 'Some Address', vaccinations: [] } //Example
  ]);
  const [vaccinations, setVaccinations] = useState<any[]>([])
  const [vaccinationScheme, setVaccinationScheme] = useState<VaccineData[]>([
    { ageStage: 'Recién Nacidos/as', vaccine: 'BCG, HB (Hepatitis B)' },
    { ageStage: '2, 4 y 6 meses', vaccine: 'Pentavalente, Polio mielitis, Rotavirus, Neumococo 13 Valente' },
    { ageStage: '12 meses', vaccine: 'Triple viral tipo SPR, Refuerzo de Neumococo 13 Valente' },
    { ageStage: '15 meses', vaccine: 'Hepatitis A, Varicela' },
    { ageStage: '18 meses', vaccine: 'Hexavalente, Triple viral tipo SPR' },
    { ageStage: '24 meses', vaccine: 'Hepatitis A' },
    { ageStage: '4 años', vaccine: 'DPT, Polio oral, Varicela' },
    { ageStage: 'Niños y Niñas de 9 y 10 años', vaccine: 'VPH Cuadrivalente' },
    { ageStage: 'Adolescentes y Adultos', vaccine: 'Td (Tétanos y Difteria)' },
    { ageStage: 'Mujeres Embarazadas', vaccine: 'Tdpa, Td, Influenza Tetravalente' },
    { ageStage: 'Adultos Mayores, Grupos de Riesgo y Personas con Enfermedades Crónicas', vaccine: 'Td, HB (Hepatitis B), Neumococo 23 Valente, Influenza Tetravalente' },
    { ageStage: 'Otras Vacunas', vaccine: 'Fiebre Amarilla, Antirrábica Humana, SARS Cov-2' },
  ]);

  //Add Vaccine State
  const [openAddVaccine, setOpenAddVaccine] = useState(false);

  //Edit Vaccine State
  const [openEditVaccine, setOpenEditVaccine] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineData | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMenuSelect = (menuName: string) => {
    setSelectedMenu(menuName);
  };

   const handlePatientAdded = (newPatient: any) => {
       setPatients(prevPatients => [...prevPatients, newPatient]);
   };

  const handleVaccineRegistered = (newVaccination: any) => {
      setVaccinations(prevVaccinations => [...prevVaccinations, newVaccination]);

      // Update the patient's vaccination history
      setPatients(prevPatients => {
          return prevPatients.map(patient => {
              if (patient.dui === newVaccination.patientDUI) {
                  return {
                      ...patient,
                      vaccinations: [...(patient.vaccinations || []), newVaccination]
                  };
              }
              return patient;
          });
      });
  };

    // Function to update a patient
    const handlePatientUpdated = (updatedPatient: any) => {
        setPatients(prevPatients => {
            return prevPatients.map(patient => {
                if (patient.dui === updatedPatient.dui) {
                    return updatedPatient;
                }
                return patient;
            });
        });
        setSearchResults(prevResults => {
            return prevResults.map(result => {
                if (result.dui === updatedPatient.dui) {
                    return updatedPatient;
                }
                return result;
            });
        });
    };

     const handleVaccineUpdated = (updatedVaccination: any) => {
         setVaccinations(prevVaccinations => {
             return prevVaccinations.map(vaccination => {
                 if (vaccination.vaccineType === updatedVaccination.vaccineType) {
                     return updatedVaccination;
                 }
                 return vaccination;
             });
         });

         setPatients(prevPatients => {
             return prevPatients.map(patient => {
                 if (patient.dui === updatedVaccination.patientDUI) {
                     const updatedVaccinations = patient.vaccinations.map(vaccination => {
                         if (vaccination.vaccineType === updatedVaccination.vaccineType) {
                             return updatedVaccination;
                         }
                         return vaccination;
                     });
                     return { ...patient, vaccinations: updatedVaccinations };
                 }
                 return patient;
             });
         });

         setSearchResults(prevResults => {
             return prevResults.map(result => {
                 if (result.dui === updatedVaccination.patientDUI) {
                     const updatedVaccinations = result.vaccinations.map(vaccination => {
                         if (vaccination.vaccineType === updatedVaccination.vaccineType) {
                             return updatedVaccination;
                         }
                         return vaccination;
                     });
                     return { ...result, vaccinations: updatedVaccinations };
                 }
                 return result;
             });
         });
     };
    const handleDeleteVaccine = (vaccinationToDelete: any) => {
        // Update vaccinations state
        setVaccinations(prevVaccinations =>
            prevVaccinations.filter(vaccination => vaccination !== vaccinationToDelete)
        );

        // Update patients state
        setPatients(prevPatients =>
            prevPatients.map(patient => {
                if (patient.dui === vaccinationToDelete.patientDUI) {
                    return {
                        ...patient,
                        vaccinations: patient.vaccinations.filter(vaccination => vaccination !== vaccinationToDelete)
                    };
                }
                return patient;
            })
        );

        // Update searchResults state
        setSearchResults(prevResults =>
            prevResults.map(result => {
                if (result.dui === vaccinationToDelete.patientDUI) {
                    return {
                        ...result,
                        vaccinations: result.vaccinations.filter(vaccination => vaccination !== vaccinationToDelete)
                    };
                }
                return result;
            })
        );
    };

  // Function to add a new vaccine
  const handleVaccineAdded = (newVaccine: VaccineData) => {
    setVaccinationScheme(prevScheme => [...prevScheme, newVaccine]);
    setOpenAddVaccine(false);
  };

  // Function to update a vaccine
  const handleVaccineUpdatedScheme = (updatedVaccine: VaccineData) => {
    setVaccinationScheme(prevScheme =>
      prevScheme.map(vaccine =>
        vaccine.ageStage === selectedVaccine?.ageStage ? updatedVaccine : vaccine
      )
    );
    setOpenEditVaccine(false);
    setSelectedVaccine(null);
  };

    const handleVaccineDeletedScheme = (vaccineToDelete: VaccineData) => {
        setVaccinationScheme(prevScheme =>
            prevScheme.filter(vaccine => vaccine !== vaccineToDelete)
        );
    };

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Inicio':
        return <p>¡Bienvenido a la aplicación VacunaciónES!</p>;
      case 'Agregar Paciente':
        return <AddPatientForm onPatientAdded={handlePatientAdded} />;
      case 'Buscar Paciente':
        return <SearchPatientForm patients={patients} vaccinations={vaccinations} onPatientUpdated={handlePatientUpdated} onVaccineUpdated={handleVaccineUpdated} onDeleteVaccine={handleDeleteVaccine} setSearchResults={setSearchResults} />;
      case 'Registro de Vacuna':
        return <VaccineRegistrationForm vaccinationScheme={vaccinationScheme} patients={patients} onVaccineRegistered={handleVaccineRegistered} />;
      case 'Esquema Nacional de Vacunación':
        return (
          <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Esquema Nacional de Vacunación</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Agregar Nueva Vacuna</Button>
                </DialogTrigger>
                <AddVaccineDialog onVaccineAdded={handleVaccineAdded} />
              </Dialog>
            <Table>
              <TableCaption>Vacunas recomendadas en diferentes etapas de la vida.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Edad/Etapa</TableHead>
                  <TableHead>Vacuna</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinationScheme.map((vaccine, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{vaccine.ageStage}</TableCell>
                    <TableCell>{vaccine.vaccine}</TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => setSelectedVaccine(vaccine)}>
                                        <Icons.edit className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                {selectedVaccine && (
                                    <EditVaccineDialog
                                        vaccineData={selectedVaccine}
                                        onVaccineUpdated={handleVaccineUpdatedScheme}
                                        onCancel={() => {
                                            setOpenEditVaccine(false);
                                            setSelectedVaccine(null);
                                        }}
                                    />
                                )}
                            </Dialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Icons.trash className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Está seguro de que desea eliminar esta vacuna?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción eliminará la vacuna del esquema nacional de vacunación.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleVaccineDeletedScheme(vaccine)}>Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return <p>¡Bienvenido a la aplicación VacunaciónES!</p>;
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="md:pl-64 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between p-4 md:pl-64">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-2xl font-bold">VacunaciónES</h1>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                Cerrar Sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                ¿Está seguro?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Cerrar Sesión</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </nav>
        <div className="flex-1 p-4">
          {/* Main content area - replace with actual content */}
          {renderContent()}
        </div>
      </div>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <img
            src="https://picsum.photos/64/64"
            alt="Logo"
            className="rounded-full w-16 h-16 mx-auto"
          />
          <p className="text-center text-sm">Personal Médico</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menú</SidebarGroupLabel>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton onClick={() => handleMenuSelect(item.name)}>
                    {item.icon === 'home' && <Icons.home className="mr-2 h-4 w-4" />}
                    {item.icon === 'plusCircle' && <Icons.plusCircle className="mr-2 h-4 w-4" />}
                    {item.icon === 'search' && <Icons.search className="mr-2 h-4 w-4" />}
                    {item.icon === 'edit' && <Icons.edit className="mr-2 h-4 w-4" />}
                    {item.icon === 'slidersHorizontal' && <Icons.slidersHorizontal className="mr-2 h-4 w-4" />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-center text-xs">
            © {new Date().getFullYear()} VacunaciónES
          </p>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
