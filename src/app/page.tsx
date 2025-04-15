"use client";

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
function AddPatientForm() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dui, setDui] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFirstName(parsedData.firstName || "");
      setLastName(parsedData.lastName || "");
      setDui(parsedData.dui || "");
      setDob(parsedData.dob || "");
      setPhone(parsedData.phone || "");
      setAddress(parsedData.address || "");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const duiValidationResult = await validateDui(dui);
    if (!duiValidationResult.isValid) {
      toast({
        title: "Error",
        description: duiValidationResult.errorMessage || "Invalid DUI",
        variant: "destructive",
      });
      return;
    }

    // Save data to local storage
    const patientData = {
      firstName,
      lastName,
      dui,
      dob,
      phone,
      address,
    };
    localStorage.setItem("patientData", JSON.stringify(patientData));

    console.log("Form submitted:", patientData);

    toast({
      title: "Success",
      description: "Patient added successfully!",
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="dui">DUI (########-#)</Label>
          <Input type="text" id="dui" placeholder="########-#" value={dui} onChange={(e) => setDui(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Add Patient</Button>
        </div>
      </form>
    </div>
  );
}

// Search Patient Form Component
function SearchPatientForm() {
  const [searchName, setSearchName] = useState("");
  const [searchDUI, setSearchDUI] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Placeholder for actual search logic
    console.log("Search submitted:", {
      searchName,
      searchDUI,
    });

    if (!searchName && !searchDUI) {
      toast({
        title: "Warning",
        description: "Please enter a name or DUI to search.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Patient found!",
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Patient</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6"  onSubmit={handleSubmit}>
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
    </div>
  );
}

// Vaccine Registration Form Component
function VaccineRegistrationForm() {
  const [patientName, setPatientName] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [nextAppointment, setNextAppointment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Placeholder for actual vaccine registration logic
    console.log("Vaccine registration submitted:", {
      patientName,
      vaccineType,
      vaccineDate,
      nextAppointment,
    });

    if (!patientName || !vaccineType || !vaccineDate) {
      toast({
        title: "Warning",
        description: "Please fill in all fields.",
      });
      return;
    }

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
          <Input type="text" id="vaccineType" placeholder="Vaccine Type" value={vaccineType} onChange={(e) => setVaccineType(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="vaccineDate">Vaccine Date</Label>
          <Input type="date" id="vaccineDate" value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="nextAppointment">Next Appointment Date</Label>
          <Input type="date" id="nextAppointment" value={nextAppointment} onChange={(e) => setNextAppointment(e.target.value)}/>
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Register Vaccine</Button>
        </div>
      </form>
    </div>
  );
}


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMenuSelect = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Home':
        return <p>Welcome to the VacunaciónES application!</p>;
      case 'Add Patient':
        return <AddPatientForm />;
      case 'Search Patient':
        return <SearchPatientForm />;
      case 'Vaccine Registration':
        return <VaccineRegistrationForm />;
      case 'Print Vaccination History':
        return <p>Print Vaccination History content will be here.</p>;
      case 'National Vaccination Scheme':
        return <p>National Vaccination Scheme content will be here.</p>;
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
