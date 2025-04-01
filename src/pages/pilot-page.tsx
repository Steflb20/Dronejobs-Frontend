'use client';

import * as React from 'react';
import { Button } from "../components/shadcn/button";
import { MapPin, Star, User, Plus, Trash2, CalendarIcon } from 'lucide-react';
import { Input } from "../components/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/shadcn/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/shadcn/avatar";
import { Badge } from "../components/shadcn/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/shadcn/dialog";
import { Calendar } from "../components/shadcn/calendar";
import {useEffect, useState} from 'react';
import { Label } from "../components/shadcn/label";
import { format } from 'date-fns';
import axios from "axios";

interface Booking {
    id: number;
    date: Date;
    pilotId: number;
}

interface Pilot {
    id: number;
    name: string;
    location: string;
    rating: number;
    specialties: string[];
    imageUrl: string;
}

const initialDronePilots: Pilot[] = [
    { id: 1, name: "John Doe", location: "New York", rating: 4.8, specialties: ["Aerial Photography", "Surveying"], imageUrl: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", location: "Los Angeles", rating: 4.9, specialties: ["Real Estate", "Cinematography"], imageUrl: "/placeholder.svg" },
    { id: 3, name: "Mike Johnson", location: "Chicago", rating: 4.7, specialties: ["Inspection", "Mapping"], imageUrl: "/placeholder.svg" },
    { id: 4, name: "Emily Brown", location: "Houston", rating: 4.6, specialties: ["Agriculture", "Thermal Imaging"], imageUrl: "/placeholder.svg" },
    { id: 5, name: "David Lee", location: "Miami", rating: 4.9, specialties: ["Event Coverage", "3D Modeling"], imageUrl: "/placeholder.svg" },
    { id: 6, name: "Sarah Wilson", location: "Seattle", rating: 4.8, specialties: ["Search and Rescue", "Wildlife Monitoring"], imageUrl: "/placeholder.svg" },
    { id: 7, name: "Thomas Müller", location: "Dobl-Zwaring", rating: 3.9, specialties: ["3D Modeling", "Aerial Photography"], imageUrl: "/placeholder.svg" },
    { id: 8, name: "Lukas Hofer", location: "St. Stefan ob Stainz", rating: 5.0, specialties: ["Search and Rescue", "Cinematography"], imageUrl: "/placeholder.svg" },
    { id: 9, name: "Paul Vallant", location: "Straßgang", rating: 4.2, specialties: ["Thermal Imaging", "3D Modeling"], imageUrl: "/placeholder.svg" },
    { id: 10, name: "Andreas Schrotter", location: "Hitzendorf", rating: 4.3, specialties: ["Agriculture", "Wildlife Monitoring"], imageUrl: "/placeholder.svg" },
];

const PilotPage = () => {
    const [dronePilots, setDronePilots] = useState<Pilot[]>(initialDronePilots);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
    const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
    const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingConfirmation, setBookingConfirmation] = useState<string | null>(null);

    const [newUser, setNewUser] = useState<Omit<Pilot, 'id'>>({
        name: "",
        location: "",
        rating: 0,
        specialties: [],
        imageUrl: "/placeholder.svg"
    });
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [pilotToDelete, setPilotToDelete] = useState<Pilot | null>(null);
    const [isBookingsDialogOpen, setIsBookingsDialogOpen] = useState(false);
    const [selectedPilotBookings, setSelectedPilotBookings] = useState<Pilot | null>(null);

    /*useEffect(() => {
        axios.get("http://localhost:5000/api/dronepilot/all")
            .then(result => {
                console.log(result.data);
                setDronePilots(result.data);

            })
    }, []);*/

    useEffect(() => {
        axios.get("https://api.kadrone1.uber.space/api/dronepilot/all")
            .then(result => {
                console.log("Received data:", result.data);

                // Transformiere die Daten so, dass specialties ein string[] ist
                const transformedPilots: Pilot[] = result.data.map((pilot: any) => ({
                    id: pilot.id,
                    name: pilot.name,
                    location: pilot.location,
                    rating: pilot.rating,
                    specialties: pilot.specialties.map((s: any) => s.name), // Nur den Namen extrahieren
                    imageUrl: pilot.imageUrl || "/placeholder.svg" // Falls kein Bild vorhanden ist
                }));

                setDronePilots(transformedPilots);
            })
            .catch(error => {
                console.error("Error fetching drone pilots:", error);
            });
    }, []);




    useEffect(() => {
        if (bookingConfirmation) {
            const timer = setTimeout(() => {
                setBookingConfirmation(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [bookingConfirmation]);

    const filteredPilots = dronePilots.filter(pilot =>
        pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSpecialty === "all" || pilot.specialties.includes(selectedSpecialty))
    );

    /*const handleAddUser = () => {
        const newPilot: Pilot = {
            ...newUser,
            id: dronePilots.length + 1,
            specialties: newUser.specialties.filter(s => s !== ""),
        };
        setDronePilots([...dronePilots, newPilot]);
        setNewUser({
            name: "",
            location: "",
            rating: 0,
            specialties: [],
            imageUrl: "/placeholder.svg"
        });
        setIsAddUserDialogOpen(false);
    };*/

    /*const handleAddUser = () => {
        axios.post("http://localhost:5000/api/dronepilot/save", {
            "aboutMe": "",
            "name": newUser.name,
            "location": newUser.location,
            "rating": 0,
            "specialties": newUser.specialties
        })
            .then(response => {
                console.log("User added:", response.data);

                // Neuen Piloten zur Liste hinzufügen
                setDronePilots([...dronePilots, response.data]);

                // Eingabeformular zurücksetzen
                setNewUser({
                    name: "",
                    location: "",
                    rating: 0,
                    specialties: [],
                    imageUrl: "/placeholder.svg"
                });

                setIsAddUserDialogOpen(false);
            })
            .catch(error => {
                console.error("Error adding user:", error);
            });
    };*/

    const handleAddUser = () => {
        axios.post("https://api.kadrone1.uber.space/api/dronepilot/save", newUser)
            .then(response => {
                console.log("User added:", response.data);

                // Falls specialties ein Array von Objekten ist, nur die Namen extrahieren
                const newPilot: Pilot = {
                    id: response.data.id,
                    name: response.data.name,
                    location: response.data.location,
                    rating: response.data.rating,
                    specialties: response.data.specialties.map((s: any) => typeof s === "string" ? s : s.name),
                    imageUrl: response.data.imageUrl || "/placeholder.svg"
                };

                setDronePilots([...dronePilots, newPilot]);
                setNewUser({
                    name: "",
                    location: "",
                    rating: 0,
                    specialties: [],
                    imageUrl: "/placeholder.svg"
                });

                setIsAddUserDialogOpen(false);
            })
            .catch(error => {
                console.error("Error adding user:", error);
            });
    };



    const handleDeletePilot = (pilot: Pilot) => {
        setPilotToDelete(pilot);
        setIsDeleteDialogOpen(true);
    };

    /*const confirmDeletePilot = () => {
        if (pilotToDelete) {
            setDronePilots(dronePilots.filter(p => p.id !== pilotToDelete.id));
            setBookings(bookings.filter(b => b.pilotId !== pilotToDelete.id));
            setIsDeleteDialogOpen(false);
            setPilotToDelete(null);
        }
    };*/

    const confirmDeletePilot = () => {
        if (pilotToDelete) {
            axios.delete(`https://api.kadrone1.uber.space/api/dronepilot/deleteById/${pilotToDelete.id}`)
                .then(() => {
                    console.log(`Pilot mit ID ${pilotToDelete.id} gelöscht`);

                    // Nach erfolgreicher Löschung im Backend auch aus dem State entfernen
                    setDronePilots(dronePilots.filter(p => p.id !== pilotToDelete.id));
                    setBookings(bookings.filter(b => b.pilotId !== pilotToDelete.id));
                    setIsDeleteDialogOpen(false);
                    setPilotToDelete(null);
                })
                .catch(error => {
                    console.error("Fehler beim Löschen des Piloten:", error);
                });
        }
    };


    const handleBooking = () => {
        if (selectedPilot && bookingDate) {
            const newBooking: Booking = {
                id: bookings.length + 1,
                date: bookingDate,
                pilotId: selectedPilot.id
            };
            setBookings([...bookings, newBooking]);
            setBookingConfirmation(`You have booked ${selectedPilot.name} for ${format(bookingDate, 'MMMM dd, yyyy')}`);
            setBookingDate(undefined);
            setSelectedPilot(null);
        }
    };

    const handleViewBookings = (pilot: Pilot) => {
        setSelectedPilotBookings(pilot);
        setIsBookingsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold" data-testid="cypress-title">Dronejobs Test +++++</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <Plus className="h-5 w-5" />
                                    <span>Add User</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of the new drone pilot.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                            className="col-span-3"
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="location" className="text-right">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            value={newUser.location}
                                            onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                                            className="col-span-3"
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="specialties" className="text-right">
                                            Specialties
                                        </Label>
                                        <Input
                                            id="specialties"
                                            value={newUser.specialties.join(", ")}
                                            onChange={(e) => setNewUser({...newUser, specialties: e.target.value.split(", ")})}
                                            className="col-span-3"
                                            placeholder="Separate with commas"
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAddUser}>Add User</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button variant="ghost" className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {bookingConfirmation && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                        {bookingConfirmation}
                    </div>
                )}
                <div className="mb-8 flex space-x-4">
                    <Input
                        type="text"
                        placeholder="Search pilots..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                    />
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty} >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Specialties</SelectItem>
                            <SelectItem value="Aerial Photography">Aerial Photography</SelectItem>
                            <SelectItem value="Surveying">Surveying</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                            <SelectItem value="Cinematography">Cinematic</SelectItem>
                            <SelectItem value="Inspection">FPV</SelectItem>
                            <SelectItem value="Mapping">Mapping</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPilots.map((pilot) => (
                        <Card key={pilot.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={pilot.imageUrl} alt={pilot.name} />
                                            <AvatarFallback>{pilot.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle>{pilot.name}</CardTitle>
                                            <CardDescription className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {pilot.location}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeletePilot(pilot)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-1 mb-2">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span>{ pilot.rating === 0 ? "No review yet" : pilot.rating }</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {pilot.specialties.map((specialty, index) => (
                                        <Badge key={index} variant="secondary">{specialty}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="flex-1 mr-2" onClick={() => setSelectedPilot(pilot)}>Book Now</Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-1/4 mx-auto">
                                        <DialogHeader>
                                            <DialogTitle>Book {selectedPilot?.name}</DialogTitle>
                                            <DialogDescription>
                                                Select a date to book this drone pilot for your project.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Calendar
                                                mode="single"
                                                selected={bookingDate}
                                                onSelect={(date) => setBookingDate(date)}
                                                className="rounded-md border mx-auto w-2/3"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleBooking}>Confirm Booking</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline" className="flex-1" onClick={() => handleViewBookings(pilot)}>
                                    <CalendarIcon className="mr-2 h-4 w-4" /> View Bookings
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {pilotToDelete?.name}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDeletePilot}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isBookingsDialogOpen} onOpenChange={setIsBookingsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Bookings for {selectedPilotBookings?.name}</DialogTitle>
                        <DialogDescription>
                            Here are all the bookings for this pilot.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {bookings.filter(b => b.pilotId === selectedPilotBookings?.id).length > 0 ? (
                            bookings.filter(b => b.pilotId === selectedPilotBookings?.id).map(booking => (
                                <div key={booking.id} className="mb-2">
                                    {format(booking.date, 'MMMM dd, yyyy')}
                                </div>
                            ))
                        ) : (
                            <p>No bookings for this pilot yet.</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsBookingsDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PilotPage;