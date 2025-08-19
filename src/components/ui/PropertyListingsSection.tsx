"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PropertyListingCard } from '@/components';

const propertyListings = [
    {
        id: 1,
        subtitle: "MOST CLICKED",
        title: "Urban Prime Plaza Premiere",
        imagePath: "/assets/images/div1img01.png",
        imageCount: 2
    },
    {
        id: 2,
        subtitle: "MOST WATCHLISTED",
        title: "Urban Prime Plaza Premiere",
        imagePath: "/assets/images/div2img02.jpg",
        imageCount: 5
    },
    {
        id: 3,
        subtitle: "HOTTEST LISTING",
        title: "Urban Prime Plaza Premiere",
        imagePath: "/assets/images/div3img01.png",
        imageCount: 5
    }
];

export const PropertyListingsSection: React.FC = () => {
    const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>({
        1: 0,
        2: 0,
        3: 0
    });

    const handleImageChange = (propertyId: number, imageIndex: number) => {
        setCurrentImages(prev => ({
            ...prev,
            [propertyId]: imageIndex
        }));
    };
    return (
        <Box sx={{ marginTop: "20px" }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px'
            }}>
                {propertyListings.map((property) => (
                    <PropertyListingCard
                        key={property.id}
                        subtitle={property.subtitle}
                        title={property.title}
                        imagePath={property.imagePath}
                        imageCount={property.imageCount}
                        currentImageIndex={currentImages[property.id]}
                        onImageChange={(index) => handleImageChange(property.id, index)}
                    />
                ))}
            </Box>
        </Box>
    );
};
