import { useState, useEffect } from 'react';

interface UseAutoRotationProps {
    items: Array<{ id: number; imagePaths: string[] }>;
    intervalMs?: number;
    autoStart?: boolean;
}

export const useAutoRotation = ({ 
    items, 
    intervalMs = 5000, 
    autoStart = true 
}: UseAutoRotationProps) => {
    const [currentIndices, setCurrentIndices] = useState<{ [key: number]: number }>(() => {
        const initial: { [key: number]: number } = {};
        items.forEach(item => {
            initial[item.id] = 0;
        });
        return initial;
    });

    const [isAutoRotating, setIsAutoRotating] = useState(autoStart);

    const handleManualChange = (itemId: number, newIndex: number) => {
        setCurrentIndices(prev => ({
            ...prev,
            [itemId]: newIndex
        }));
    };

    const startAutoRotation = () => setIsAutoRotating(true);
    const stopAutoRotation = () => setIsAutoRotating(false);
    const toggleAutoRotation = () => setIsAutoRotating(prev => !prev);

    useEffect(() => {
        if (!isAutoRotating) return;

        const interval = setInterval(() => {
            setCurrentIndices(prev => {
                const newState = { ...prev };
                items.forEach(item => {
                    newState[item.id] = (newState[item.id] + 1) % item.imagePaths.length;
                });
                return newState;
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [items, intervalMs, isAutoRotating]);

    return {
        currentIndices,
        handleManualChange,
        isAutoRotating,
        startAutoRotation,
        stopAutoRotation,
        toggleAutoRotation
    };
};
