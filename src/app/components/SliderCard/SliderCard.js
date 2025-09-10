import React from 'react'
import Link from 'next/link'

// Helper functions for status colors
const  getStatusColor = (color) => {
    switch (color){
        case 'green' : return 'bg-green-500';
        case 'blue' : return 'bg-blue-500';
        case 'green': return 'bg-green-500';
        case 'blue': return 'bg-blue-500';
        case 'yellow': return 'bg-yellow-500';
        case 'purple': return 'bg-purple-500';
        case 'red': return 'bg-red-500';
        default: return 'bg-green-500';
    }
};

const getStatusTextColor = (color) => {
  switch (color) {
    case 'green': return 'text-green-500';
    case 'blue': return 'text-blue-500';
    case 'yellow': return 'text-yellow-500';
    case 'purple': return 'text-purple-500';
    case 'red': return 'text-red-500';
    default: return 'text-green-500';
  }
};

// Parameters (item,index) represent each element in the array and its position
// Map function loops through the data array, giving access to each item one by one
export default function SliderCard({item, index}){
    return(
        <div className ="p-4">
            <div className = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover: -translate-y-2 max-w-sm mx-auto">
                {/* Image Container */}
                <div className = "relative h-64 overflow-hidden">
                    <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />

                    
                </div>
            </div>
        </div>
    )
}