"use client";
import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '@/styles';
import { Heading, Paragraph } from '@/components';
import Image from 'next/image';

interface PropertyListingCardProps {
    title: string;
    subtitle: string;
    imagePaths: string[];
    currentImageIndex: number;
    onImageChange: (index: number) => void;
}

const CardContainer = styled(Box)({
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
        '& .content-overlay': {
            transform: 'translateY(-5px)'
        },
        '& .progress-container': {
            opacity: 1
        }
    }
});

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '280px',
    overflow: 'hidden'
});

const ImageWrapper = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'opacity 0.5s ease-in-out'
});

const GradientOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, #0000000D 0%, #00000099 100%)',
    zIndex: 1,
    transition: 'opacity 0.3s ease-in-out'
});

const ContentOverlay = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    zIndex: 2,
    color: 'white',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out'
});

const ProgressContainer = styled(Box)({
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3,
    transition: 'opacity 0.3s ease-in-out',
    opacity: 0.7
});

const ProgressDot = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: active ? colors.white : colors.gray[150],
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    transform: active ? 'scale(1.2)' : 'scale(1)',
    '&:hover': {
        backgroundColor: active ? colors.white : colors.gray[300],
        transform: 'scale(1.3)'
    }
}));

const StyledParagraph = styled(Paragraph)({
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase',
    marginBottom: '4px',
});

export const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
    title,
    subtitle,
    imagePaths,
    currentImageIndex,
    onImageChange
}) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentImage = imagePaths[currentImageIndex];

    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [currentImageIndex]);

    return (
        <CardContainer>
            <ImageContainer>
                <ImageWrapper sx={{ opacity: isTransitioning ? 0.8 : 1 }}>
                    <Image
                        src={currentImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 
                        (max-width: 1200px) 50vw, 
                        33vw"
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                    <GradientOverlay />
                    <ContentOverlay >
                        <StyledParagraph>
                            {subtitle}
                        </StyledParagraph>
                        <Heading fontSize={18}>
                            {title}
                        </Heading>
                    </ContentOverlay>
                    <ProgressContainer >
                        {imagePaths.map((_, index) => (
                            <ProgressDot
                                key={index}
                                active={index === currentImageIndex}
                                onClick={() => onImageChange(index)}
                            />
                        ))}
                    </ProgressContainer>
                </ImageWrapper>
            </ImageContainer>
        </CardContainer>
    );
};
