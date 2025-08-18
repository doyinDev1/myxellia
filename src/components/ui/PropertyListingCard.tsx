"use client";
import React from 'react';
import Image from 'next/image';
import { Box, styled } from '@mui/material';
import { Heading, Paragraph } from '../typography';
import { colors } from '@/styles';

interface PropertyListingCardProps {
    title: string;
    subtitle: string;
    imagePath: string;
    imageCount: number;
    currentImageIndex: number;
    onImageChange: (index: number) => void;
}

const CardContainer = styled(Box)({
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.02)'
    }
});

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '280px',
    overflow: 'hidden'
});

const GradientOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, #0000000D 0%, #00000099 100%)',
    zIndex: 1
});

const ContentOverlay = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    zIndex: 2,
    color: 'white'
});

const ProgressContainer = styled(Box)({
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3,
});

const ProgressDot = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: active ? colors.white : colors.gray[150],
    transition: 'background-color 0.2s ease',
    cursor: 'pointer'
}));

export const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
    title,
    subtitle,
    imagePath,
    imageCount,
    currentImageIndex,
    onImageChange
}) => {
    return (
        <CardContainer>
            <ImageContainer>
                <Image
                    src={imagePath}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <GradientOverlay />
                <ContentOverlay>
                    <Paragraph
                        sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                            display: 'block'
                        }}
                    >
                        {subtitle}
                    </Paragraph>
                    <Heading
                        sx={{
                            fontSize: '18px',
                            fontWeight: 600
                        }}
                    >
                        {title}
                    </Heading>
                </ContentOverlay>
                <ProgressContainer>
                    {Array.from({ length: imageCount }, (_, index) => (
                        <ProgressDot
                            key={index}
                            active={index === currentImageIndex}
                            onClick={() => onImageChange(index)}
                        />
                    ))}
                </ProgressContainer>
            </ImageContainer>
        </CardContainer>
    );
};
