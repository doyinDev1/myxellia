"use client";
import React from 'react';
import { Box } from '@mui/material';
import { PropertyListingCard } from '@/components';
import { useAutoRotation } from '@/hooks';

const propertyListings = [
    {
        id: 1,
        subtitle: "MOST CLICKED",
        title: "Urban Prime Plaza Premiere",
        imagePaths: [
            "/assets/images/div1img01.png",
            "/assets/images/div2img01.jpg",
            "/assets/images/div3img01.png"
        ]
    },
    {
        id: 2,
        subtitle: "MOST WATCHLISTED",
        title: "Urban Prime Plaza Premiere",
        imagePaths: [
            "/assets/images/div2img02.jpg",
            "/assets/images/div1img01.png",
            "/assets/images/div2img01.jpg",
            "/assets/images/div1img01.png",
            "/assets/images/div3img01.png"
        ]
    },
    {
        id: 3,
        subtitle: "HOTTEST LISTING",
        title: "Urban Prime Plaza Premiere",
        imagePaths: [
            "/assets/images/div3img01.png",
            "/assets/images/div2img02.jpg",
            "/assets/images/div1img01.png",
            "/assets/images/div3img01.png",
            "/assets/images/div2img01.jpg"
        ]
    }
];

export const PropertyListingsSection: React.FC = () => {
    const {
        currentIndices,
        handleManualChange,
    } = useAutoRotation({
        items: propertyListings,
        intervalMs: 5000,
        autoStart: true
    });

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
                        imagePaths={property.imagePaths}
                        currentImageIndex={currentIndices[property.id]}
                        onImageChange={(index) => handleManualChange(property.id, index)}
                    />
                ))}
            </Box>
        </Box>
    );
};
