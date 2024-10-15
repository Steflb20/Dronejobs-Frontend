import React, {useState} from 'react';
import {Button} from "../components/shadcn/button";
import {MapPin, Star, User} from "lucide-react";
import {Input} from "../components/shadcn/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/shadcn/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/shadcn/card";
import {Avatar, AvatarFallback, AvatarImage} from "../components/shadcn/avatar";
import {Badge} from "../components/shadcn/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/shadcn/dialog";
import {Calendar} from "../components/shadcn/calendar";

interface Pilot {
    id: number;
    name: string;
    location: string;
    rating: number;
    specialties: string[];
    imageUrl: string;
}

const dronePilots: Pilot[] = [
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

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
    const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
    const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined); // Change here

    const filteredPilots = dronePilots.filter(pilot =>
        pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSpecialty === "all" || pilot.specialties.includes(selectedSpecialty))
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Dronejobs</span>
                    </div>
                    <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex space-x-4">
                    <Input
                        type="text"
                        placeholder="Search pilots..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                    />
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Specialties</SelectItem>
                            <SelectItem value="Aerial Photography">Aerial Photography</SelectItem>
                            <SelectItem value="Surveying">Surveying</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                            <SelectItem value="Cinematography">Cinematography</SelectItem>
                            <SelectItem value="Inspection">Inspection</SelectItem>
                            <SelectItem value="Mapping">Mapping</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPilots.map((pilot) => (
                        <Card key={pilot.id}>
                            <CardHeader>
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
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-1 mb-2">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span>{pilot.rating}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {pilot.specialties.map((specialty, index) => (
                                        <Badge key={index} variant="secondary">{specialty}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" onClick={() => setSelectedPilot(pilot)}>Book Now</Button>
                                    </DialogTrigger>
                                    <DialogContent className={"w-1/4 mx-auto"}>
                                        <DialogHeader>
                                            <DialogTitle>Book {selectedPilot?.name}</DialogTitle>
                                            <DialogDescription>
                                                Select a date to book this drone pilot for your project.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 mx-auto">
                                            <Calendar
                                                mode="single"
                                                selected={bookingDate}
                                                onSelect={(date) => setBookingDate(date)}
                                                className="rounded-md border border-gray-300 shadow-lg p-4"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => {
                                                if (selectedPilot && bookingDate) {
                                                    alert(`Booked ${selectedPilot.name} for ${bookingDate.toDateString()}`);
                                                }
                                            }}>
                                                Confirm Booking
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PilotPage;