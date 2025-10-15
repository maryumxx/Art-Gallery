"use client";
import { Heart, Calendar, Tag, Sparkles } from "lucide-react";
import React, { useState } from 'react';

// --- 1. Define the TypeScript Interface for Art Data ---
interface ArtPiece {
  id: number;
  name: string;
  date: string;
  status: "Sold" | "Available"; // Union type for specific statuses
  imageUrl: string;
}

// --- 2. Mock Art Data (Now typed using ArtPiece[]) ---
const mockArt: ArtPiece[] = [
  { 
    id: 1, 
    name: "Koal Chibi (Custom)", 
    date: "10-10-2025", 
    status: "Sold", 
    imageUrl: "1.jpg" 
  },
  { 
    id: 2, 
    name: "Hyena Chibi (Custom)", 
    date: "09-10-2025", 
    status: "Sold", 
    imageUrl: "2.jpg" 
  },
  { 
    id: 3, 
    name: "Hybrid Chibi (Custom)", 
    date: "15-9-2025", 
    status: "Sold", 
    imageUrl: "3.jpg" 
  },
  { 
    id: 4, 
    name: "Jiggly Puff Halloween Adopt (Premade)", 
    date: "05-10-2025", 
    status: "Available", 
    imageUrl: "4.jpg" 
  },
  { 
    id: 5, 
    name: "Business Branding of Chloe's Bakeshop (Custom)", 
    date: "7-10-25", 
    status: "Sold", 
    imageUrl: "5.jpg" 
  },
  { 
    id: 6, 
    name: "Business Branding of Chloe's Bakeshop (Custom)", 
    date: "7-10-25", 
    status: "Sold", 
    imageUrl: "6.jpg" 
  },
  { 
    id: 7, 
    name: "Cute Goth Bunny Chibi Adopt (Premade)", 
    date: "30-9-25", 
    status: "Available", 
    imageUrl: "7.jpg" 
  },
  { 
    id: 8, 
    name: "Cute Cat-fish Hybrid Goth Chibi Adopt (Premade) ", 
    date: "30-9-25", 
    status: "Available", 
    imageUrl: "8.jpg" 
  },
  { 
    id: 9, 
    name: "Cute Fox Mantis Goth Chibi Adopt (Premade)", 
    date: "30-9-25", 
    status: "Available", 
    imageUrl: "9.jpg" 
  },
  { 
    id: 10, 
    name: "Cute Fox Mantis Goth Chibi Adopt (Premade)", 
    date: "30-9-25", 
    status: "Available", 
    imageUrl: "10.jpg" 
  },
  { 
    id: 11, 
    name: "Cute Opossum Goth Chibi Adopt (Premade)", 
    date: "30-9-25", 
    status: "Available", 
    imageUrl: "11.jpg" 
  },
  { 
    id: 12, 
    name: "Koal Reference Sheet (Custom)", 
    date: "14-8-25", 
    status: "Sold", 
    imageUrl: "12.jpg" 
  },
  { 
    id: 13, 
    name: "Bolt Reference Sheet (Custom)", 
    date: "3-7-25", 
    status: "Sold", 
    imageUrl: "13.jpg" 
  },
  { 
    id: 14, 
    name: "Dangling Chibi Keychain (Base, Premade)", 
    date: "5-7-25", 
    status: "Available", 
    imageUrl: "14.jpg" 
  },
  { 
    id: 15, 
    name: "Panda Chibi (Custom)", 
    date: "14-10-25", 
    status: "Sold", 
    imageUrl: "15.jpg" 
  },
  { 
    id: 16, 
    name: "Drew the Dog Chibi (Custom)", 
    date: "12-10-25", 
    status: "Sold", 
    imageUrl: "16.jpg" 
  },
  { 
    id: 17, 
    name: "Charmander Pokemon Adopt Halloween Batch (Premade)", 
    date: "5-10-25", 
    status: "Available", 
    imageUrl: "17.jpg" 
  },
];

// --- 3. Define the component's Props type ---
interface ArtCardProps {
  art: ArtPiece;
}

// --- Art Card Component (Now correctly typed and with touch events) ---
const ArtCard = ({ art }: ArtCardProps) => {
  const [isTouched, setIsTouched] = useState(false);

  // Determine text color based on status
  const statusColor = art.status === "Sold" ? "text-red-500" : "text-green-500";
  const statusBg = art.status === "Sold" ? "bg-red-100" : "bg-green-100";

  // Handler for touch events (mobile friendly overlay display)
  const handleTouch = (active: boolean) => {
    setIsTouched(active);
  };

  // Class to control overlay visibility based on hover (desktop) or touch (mobile)
  const overlayClass = `opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isTouched ? '!opacity-100' : ''}`;

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg group transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onTouchStart={() => handleTouch(true)} // Touch start shows overlay
      onTouchEnd={() => setTimeout(() => handleTouch(false), 2000)} // Touch end hides after a pause
    >
      {/* Art Image Container: w-full and aspect-square ensures fluid size */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">
        <img 
          src={art.imageUrl} 
          alt={art.name} 
          width="600" 
          height="600"
          className="object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-30" 
          loading="lazy" 
          // Fallback in case local images are not found
          onError={(e) => {
             e.currentTarget.onerror = null; 
             e.currentTarget.src = `https://placehold.co/600x600/C4A7F8/ffffff?text=Image+${art.id}`; 
          }}
        />
      </div>

      {/* Overlay Content on Hover/Touch */}
      <div className={`absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 bg-pink-300/90 backdrop-blur-sm ${overlayClass}`}>
        {/* Adjusted title size for responsiveness on smaller screens */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">{art.name}</h3>
        
        <div className="space-y-3">
          
          {/* Date */}
          <p className="flex items-center text-white text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2 text-yellow-300" />
            Created: {art.date}
          </p>

          {/* Status */}
          <p className={`flex items-center text-white text-sm font-medium`}>
            <Tag className={`w-4 h-4 mr-2 ${statusColor}`} />
            Status: 
            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusBg} ${statusColor}`}>
              {art.status}
            </span>
          </p>

          {/* Cute Icon Decoration */}
          <Heart className="w-6 h-6 mx-auto text-white mt-4 animate-bounce" fill="white" />
        </div>
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-yellow-50 p-4 sm:p-8">
        
      {/* --- 1. Hero Section: Evelyn's Art Space --- */}
      <header className="py-16 text-center">
        {/* Sparkle Icon */}
        <Sparkles className="w-12 h-12 mx-auto text-purple-600 mb-4 animate-pulse" />
        
        {/* Image Title: Centered and Responsive */}
        <img 
          src="heroWeb.png" 
          className="w-full max-w-lg mx-auto block mb-4" 
          alt="Evelyn's Art Space Title Image" 
        />
        
        <p className="text-xl text-purple-800 italic">
          A collection of dreams in pastel and pigment.
        </p>
      </header>
    
      {/* --- 2. Gallery Section --- */}
      <main className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b-2 border-pink-300 pb-2">
          The Gallery
        </h2>
        
        {/* Responsive Grid: 1 column on mobile, 2 on sm (tablet), 3 on lg (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockArt.map(art => (
            <ArtCard key={art.id} art={art} />
          ))}
        </div>
      </main>

      {/* --- 3. Simple Footer Decoration --- */}
      <footer className="mt-20 py-6 text-center text-purple-700 text-sm">
        <p>&copy; {new Date().getFullYear()} Evelyn's Art Space. All rights reserved. <Heart className="inline w-4 h-4 text-red-400" fill="currentColor" /></p>
      </footer>

    </div>
  );
}
