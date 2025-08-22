import { useState, useCallback } from 'react';

interface UseTransitionProps {
    duration?: number;
    onTransitionStart?: () => void;
    onTransitionEnd?: () => void;
}

export const useTransition = ({ 
    duration = 200, 
    onTransitionStart, 
    onTransitionEnd 
}: UseTransitionProps = {}) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = useCallback((callback: () => void) => {
        setIsTransitioning(true);
        onTransitionStart?.();
        
        setTimeout(() => {
            callback();
            setIsTransitioning(false);
            onTransitionEnd?.();
        }, duration);
    }, [duration, onTransitionStart, onTransitionEnd]);

    const setTransitioning = useCallback((state: boolean) => {
        setIsTransitioning(state);
    }, []);

    return {
        isTransitioning,
        startTransition,
        setTransitioning
    };
};
