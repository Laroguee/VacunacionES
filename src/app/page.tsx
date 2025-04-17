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
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
    { name: 'Home', icon: 'home' },
    { name: 'Add Patient', icon: 'plusCircle' },
    { name: 'Search Patient', icon: 'search' },
    { name: 'Vaccine Registration', icon: 'edit' },
    { name: 'Print Vaccination History', icon: 'fileText' },
    { name: 'National Vaccination Scheme', icon: 'slidersHorizontal' },
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
        setFirstNameError("First Name is required");
        hasErrors = true;
    } else {
        setFirstNameError("");
    }

    if (!lastName) {
        setLastNameError("Last Name is required");
        hasErrors = true;
    } else {
        setLastNameError("");
    }

    if (!dui) {
        setDuiError("DUI is required");
        hasErrors = true;
    } else {
        setDuiError("");
    }

    if (!dob) {
        setDobError("Date of Birth is required");
        hasErrors = true;
    } else {
        setDobError("");
    }

    if (!phone) {
        setPhoneError("Phone Number is required");
        hasErrors = true;
    } else {
        setPhoneError("");
    }

    if (!address) {
        setAddressError("Address is required");
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
        description: duiValidationResult.errorMessage || "Invalid DUI",
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
    };

    onPatientAdded(patientData);

    toast({
      title: "Success",
      description: "Patient added successfully!",
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
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
           {firstNameError && <p className="text-red-500 text-xs">{firstNameError}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          {lastNameError && <p className="text-red-500 text-xs">{lastNameError}</p>}
        </div>
        <div>
          <Label htmlFor="dui">DUI (########-#)</Label>
          <Input type="text" id="dui" placeholder="########-#" value={dui} onChange={(e) => setDui(e.target.value)} />
           {duiError && <p className="text-red-500 text-xs">{duiError}</p>}
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
           {dobError && <p className="text-red-500 text-xs">{dobError}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
           {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
           {addressError && <p className="text-red-500 text-xs">{addressError}</p>}
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Add Patient</Button>
        </div>
      </form>
    </div>
  );
}

// Search Patient Form Component
function SearchPatientForm({ patients }: { patients: any[] }) {
  const [searchName, setSearchName] = useState("");
  const [searchDUI, setSearchDUI] = useState("");
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (!searchName && !searchDUI) {
          toast({
              title: "Warning",
              description: "Please enter a name or DUI to search.",
          });
          return;
      }

      const results = patients.filter(patient =>
          (searchName && (patient.firstName.toLowerCase().includes(searchName.toLowerCase()) || patient.lastName.toLowerCase().includes(searchName.toLowerCase()))) ||
          (searchDUI && patient.dui === searchDUI)
      );

      setSearchResults(results);

      if (results.length === 0) {
          toast({
              title: "Information",
              description: "No matching patients found.",
          });
      } else {
          toast({
              title: "Success",
              description: "Patient(s) found!",
          });
      }
  };

  return (
      <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Patient</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                  <Label htmlFor="searchName">Name</Label>
                  <Input type="text" id="searchName" placeholder="Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
              </div>
              <div>
                  <Label htmlFor="searchDUI">DUI</Label>
                  <Input type="text" id="searchDUI" placeholder="DUI" value={searchDUI} onChange={(e) => setSearchDUI(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                  <Button type="submit">Search Patient</Button>
              </div>
          </form>

          {searchResults.length > 0 && (
              <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Search Results</h3>
                  <ul>
                      {searchResults.map((patient, index) => (
                          <li key={index} className="mb-2 p-3 border rounded">
                              <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
                              <p><strong>DUI:</strong> {patient.dui}</p>
                              <p><strong>Date of Birth:</strong> {patient.dob}</p>
                              <p><strong>Phone:</strong> {patient.phone}</p>
                              <p><strong>Address:</strong> {patient.address}</p>
                          </li>
                      ))}
                  </ul>
              </div>
          )}
      </div>
  );
}

// Vaccine Registration Form Component
function VaccineRegistrationForm({vaccinationScheme}: {vaccinationScheme: VaccineData[]}) {
  const [patientName, setPatientName] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [nextAppointment, setNextAppointment] = useState("");
  const { toast } = useToast();

   const [nextAppointmentError, setNextAppointmentError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!patientName || !vaccineType || !vaccineDate) {
      toast({
        title: "Warning",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

     let hasErrors = false;

     if (!nextAppointment) {
         setNextAppointmentError("Next Appointment Date is required");
         hasErrors = true;
     } else {
         setNextAppointmentError("");
     }

     if (hasErrors) {
         return;
     }


    // Placeholder for actual vaccine registration logic
    console.log("Vaccine registration submitted:", {
      patientName,
      vaccineType,
      vaccineDate,
      nextAppointment,
    });



    toast({
      title: "Success",
      description: "Vaccine registered successfully!",
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Vaccine Registration</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="patientName">Patient Name</Label>
          <Input type="text" id="patientName" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
         <div>
             <Label htmlFor="vaccineType">Vaccine Type</Label>
             <Select onValueChange={setVaccineType} defaultValue={vaccineType}>
                 <SelectTrigger id="vaccineType">
                     <SelectValue placeholder="Select a vaccine" />
                 </SelectTrigger>
                 <SelectContent>
                     {vaccinationScheme.map((vaccine, index) => (
                         <SelectItem key={index} value={vaccine.vaccine}>{vaccine.vaccine}</SelectItem>
                     ))}
                 </SelectContent>
             </Select>
         </div>
        <div>
          <Label htmlFor="vaccineDate">Vaccine Date</Label>
          <Input type="date" id="vaccineDate" value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="nextAppointment">Next Appointment Date</Label>
          <Input type="date" id="nextAppointment" value={nextAppointment} onChange={(e) => setNextAppointment(e.target.value)}/>
           {nextAppointmentError && <p className="text-red-500 text-xs">{nextAppointmentError}</p>}
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Register Vaccine</Button>
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
        <DialogTitle>Add New Vaccine</DialogTitle>
        <DialogDescription>
          Add a new vaccine to the national vaccination scheme.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="ageStage">Age/Stage</Label>
          <Input
            type="text"
            id="ageStage"
            placeholder="Age/Stage"
            value={ageStage}
            onChange={(e) => setAgeStage(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="vaccine">Vaccine</Label>
          <Input
            type="text"
            id="vaccine"
            placeholder="Vaccine"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Add Vaccine</Button>
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
        <DialogTitle>Edit Vaccine</DialogTitle>
        <DialogDescription>
          Edit the vaccine details in the national vaccination scheme.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="editAgeStage">Age/Stage</Label>
          <Input
            type="text"
            id="editAgeStage"
            placeholder="Age/Stage"
            value={ageStage}
            onChange={(e) => setAgeStage(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="editVaccine">Vaccine</Label>
          <Input
            type="text"
            id="editVaccine"
            placeholder="Vaccine"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
          </DialogClose>
          <Button type="submit">Update Vaccine</Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
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

  // Function to add a new vaccine
  const handleVaccineAdded = (newVaccine: VaccineData) => {
    setVaccinationScheme(prevScheme => [...prevScheme, newVaccine]);
    setOpenAddVaccine(false);
  };

  // Function to update a vaccine
  const handleVaccineUpdated = (updatedVaccine: VaccineData) => {
    setVaccinationScheme(prevScheme =>
      prevScheme.map(vaccine =>
        vaccine.ageStage === selectedVaccine?.ageStage ? updatedVaccine : vaccine
      )
    );
    setOpenEditVaccine(false);
    setSelectedVaccine(null);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Home':
        return <p>Welcome to the VacunaciónES application!</p>;
      case 'Add Patient':
        return <AddPatientForm onPatientAdded={handlePatientAdded} />;
      case 'Search Patient':
        return <SearchPatientForm patients={patients} />;
      case 'Vaccine Registration':
        return <VaccineRegistrationForm vaccinationScheme={vaccinationScheme} />;
      case 'Print Vaccination History':
        return <p>Print Vaccination History content will be here.</p>;
      case 'National Vaccination Scheme':
        return (
          <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">National Vaccination Scheme</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Vaccine</Button>
                </DialogTrigger>
                <AddVaccineDialog onVaccineAdded={handleVaccineAdded} />
              </Dialog>
            <Table>
              <TableCaption>Recommended vaccinations at different stages of life.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Age/Stage</TableHead>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinationScheme.map((vaccine, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{vaccine.ageStage}</TableCell>
                    <TableCell>{vaccine.vaccine}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedVaccine(vaccine)}>
                            <Icons.edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {selectedVaccine && (
                          <EditVaccineDialog
                            vaccineData={selectedVaccine}
                            onVaccineUpdated={handleVaccineUpdated}
                            onCancel={() => {
                              setOpenEditVaccine(false);
                              setSelectedVaccine(null);
                            }}
                          />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return <p>Welcome to the VacunaciónES application!</p>;
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
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will log you out of the application.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
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
          <p className="text-center text-sm">Medical Staff</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton onClick={() => handleMenuSelect(item.name)}>
                    {item.icon === 'home' && <Icons.home className="mr-2 h-4 w-4" />}
                    {item.icon === 'plusCircle' && <Icons.plusCircle className="mr-2 h-4 w-4" />}
                    {item.icon === 'search' && <Icons.search className="mr-2 h-4 w-4" />}
                    {item.icon === 'edit' && <Icons.edit className="mr-2 h-4 w-4" />}
                    {item.icon === 'fileText' && <Icons.fileText className="mr-2 h-4 w-4" />}
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


