"use client"
import React, { useState } from 'react';
import {
    Box,
    IconButton,
    styled,
} from '@mui/material';
import { addMonths, format, subMonths } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { ChevronLeftIcon, Paragraph } from '@/components';
import { useTransition } from '@/hooks';
import { colors } from '@/styles';

interface CalendarWidgetProps {
    open: boolean;
    onClose: () => void;
}

const CalendarContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ open }) => ({
    position: 'fixed',
    top: "64px",
    right: open ? '0' : '-100%',
    width: '400px',
    maxWidth: '100%',
    height: '100vh',
    zIndex: 1000,
    transition: 'right 0.3s ease-in-out',
}));

const CalendarOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const CalendarContent = styled(Box)({
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    maxWidth: '100%',
    height: '100vh',
    backgroundColor: '#000000',
});

const CalendarHeader = styled(Box)({
    backgroundColor: colors.secondary[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 23px',
});

const HeaderLeft = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const HeaderTitle = styled(Paragraph)({
    fontSize: '16px',
    fontWeight: 600,
    color: colors.white,
});

const CloseButton = styled(IconButton)({
    width: '32px',
    height: '32px',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

const MonthNavigation = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '17px 25px',
    gap: '15px',
});

const MonthYearText = styled(Paragraph)({
    fontSize: '16px',
    fontWeight: 600,
    color: colors.white,
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
});

const NavigationButton = styled(IconButton)({
    width: '30px',
    height: '30px',
    color: '#ffffff',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.1)',
    },
    '&:active': {
        transform: 'scale(0.95)',
    },
});

const CalendarGrid = styled(Box)({
    padding: '0 24px 24px',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
});

const WeekDaysHeader = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 50px)',
    transition: 'opacity 0.3s ease-in-out',
});

const WeekDay = styled(Box)({
    fontSize: '7.58px',
    fontWeight: 600,
    padding: '5.68px 0 5.68px 5.68px',
    color: colors.gray[250],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'left',
    width: '50px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: '0.47px solid #242424',
    "&:first-of-type": {
        borderTopLeftRadius: '8px',
    },
    "&:last-of-type": {
        borderTopRightRadius: '8px',
    },
});

const CalendarDays = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isTransitioning',
})<{ isTransitioning?: boolean }>(({ isTransitioning }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 50px)',
    transition: 'all 0.4s ease-in-out',
    opacity: isTransitioning ? 0.7 : 1,
    transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
}));

const DayCell = styled(Box, {
    shouldForwardProp: (prop) => !['selected', 'today'].includes(prop as string),
})<{ selected?: boolean; today?: boolean; }>(({ selected, today }) => ({
    width: '50px',
    height: '90px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-euclid-circular-b), sans-serif',
    border: '0.47px solid #242424',
    padding: '5.68px 0 0 5.68px',
    position: 'relative',
    zIndex: 1,

    ...(today && !selected && {
        border: `2px solid ${colors.secondary[400]}`,
    }),

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.02)',
    },
}));

const PillBackground = styled(Box, {
    shouldForwardProp: (prop) => !['selected', 'isFirstDayOfMonth'].includes(prop as string),
})<{ selected: boolean; isFirstDayOfMonth: boolean }>(({ selected, isFirstDayOfMonth }) => ({
    position: 'absolute',
    top: '5.68px',
    left: '5.68px',
    width: isFirstDayOfMonth ? '40px' : '28px',
    height: '20px',
    backgroundColor: selected ? colors.secondary[400] : 'transparent',
    borderRadius: '12px',
    zIndex: 0,
    transition: 'all 0.3s ease-in-out',
}));

const DayText = styled(Paragraph, {
    shouldForwardProp: (prop) => !['selected', 'outside'].includes(prop as string),
})<{ selected: boolean; outside: boolean }>(({ selected, outside }) => ({
    fontSize: '9.94px',
    fontWeight: selected ? 600 : 500,
    color: selected ? '#ffffff' : (outside ? colors.gray[650] : colors.gray[250]),
    margin: 0,
    padding: 0,
    top: selected ? '3px' : '0px',
    left: selected ? '9px' : '0px',
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
}));

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
    open,
    onClose,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 16));

    const { isTransitioning, startTransition } = useTransition({ duration: 200 });

    const handlePreviousMonth = () => {
        startTransition(() => {
            setCurrentDate(subMonths(currentDate, 1));
        });
    };

    const handleNextMonth = () => {
        startTransition(() => {
            setCurrentDate(addMonths(currentDate, 1));
        });
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const totalDays = 42;

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }

        return days;
    };

    const calendarDays = generateCalendarDays();
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT'];

    return (
        <CalendarContainer open={open}>
            <CalendarOverlay onClick={onClose} />
            <CalendarContent>
                <CalendarHeader>
                    <HeaderLeft>
                        <CloseButton onClick={onClose}>
                            <ArrowBackIcon />
                        </CloseButton>
                        <HeaderTitle>Calendar</HeaderTitle>
                    </HeaderLeft>
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                </CalendarHeader>
                <MonthNavigation>
                    <NavigationButton onClick={handlePreviousMonth}>
                        <ChevronLeftIcon sx={{ color: colors.gray[250], fontSize: '14px' }} />
                    </NavigationButton>
                    <MonthYearText sx={{
                        opacity: isTransitioning ? 0.5 : 1,
                        transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
                    }}>
                        {format(currentDate, 'MMMM yyyy')}
                    </MonthYearText>
                    <NavigationButton onClick={handleNextMonth}>
                        <ChevronLeftIcon sx={{ color: colors.gray[250], fontSize: '14px', transform: 'rotate(180deg)' }} />
                    </NavigationButton>
                </MonthNavigation>

                <CalendarGrid>
                    <WeekDaysHeader>
                        {weekDays.map((day) => (
                            <WeekDay key={day}>{day}</WeekDay>
                        ))}
                    </WeekDaysHeader>
                    <CalendarDays isTransitioning={isTransitioning}>
                        {calendarDays.map((date, index) => {
                            const isSelected = selectedDate &&
                                date.getDate() === selectedDate.getDate() &&
                                date.getMonth() === selectedDate.getMonth() &&
                                date.getFullYear() === selectedDate.getFullYear();
                            const isToday = date.getDate() === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear();
                            const isOutside = date.getMonth() !== currentDate.getMonth();
                            const isFirstDayOfMonth = date.getDate() === 1;

                            return (
                                <DayCell
                                    key={index}
                                    selected={isSelected}
                                    today={isToday}
                                    onClick={() => handleDateSelect(date)}
                                >
                                    <PillBackground selected={isSelected} isFirstDayOfMonth={isFirstDayOfMonth} />
                                    <DayText selected={isSelected} outside={isOutside}>
                                        {isFirstDayOfMonth ? `${format(date, 'MMM')} ${date.getDate()}` : date.getDate()}
                                    </DayText>
                                </DayCell>
                            );
                        })}
                    </CalendarDays>
                </CalendarGrid>
            </CalendarContent>
        </CalendarContainer>
    );
};
