"use client"
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Button,
    IconButton,
    InputBase,
    styled,
    Toolbar,
    Tooltip
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    BellIcon,
    BudgetingDialog,
    CalculatorIcon,
    CalendarWidget,
    CalendarIcon,
    LogoIcon,
    MessagesIcon,
    SearchIcon,
    UserProfileHover
} from '@/components';
import { colors } from '@/styles';
import { navItems } from './nav-items';
import { navIcons } from './nav-icons';

const StyledIcon = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ disabled }) => ({
    color: colors.white,
    padding: '0px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    '&:hover': {
        cursor: disabled ? 'not-allowed' : 'pointer',
    },
}));

const StyledAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => !["showUserProfile"].includes(prop as string),
})<{ showUserProfile?: boolean }>(({ showUserProfile }) => ({
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 500,
    fontSize: 23,
    cursor: 'pointer',
    fontFamily: 'var(--font-euclid-circular-b)',
    border: showUserProfile ? "4px solid white" : "4px solid transparent",
    transform: showUserProfile ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: `0 0 0 4px ${colors.gray[100]}`,
    }
}));

const StyledNavItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
    textTransform: 'none',
    color: active ? colors.primary.main : colors.gray[400],
    backgroundColor: active ? colors.gray[300] : 'transparent',
    '&:hover': {
        backgroundColor: colors.gray[300],
        color: 'black'
    },
    fontFamily: 'var(--font-euclid-circular-b), sans-serif',
    borderRadius: '8px',
    padding: '9px 32px',
    fontWeight: active ? 600 : 400,
    fontSize: 14,
    transition: 'all 0.2s ease'
}));

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '320px',
    height: '43px',
    background: colors.gray[300],
    borderRadius: "12px",
    padding: '0 16px',
    border: '1px solid',
    borderColor: colors.secondary[200],
    boxShadow: 'none'
});

const StyledTooltip = styled(({ className, ...props }: React.ComponentProps<typeof Tooltip>) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    '& .MuiTooltip-tooltip': {
        fontFamily: 'var(--font-euclid-circular-b), sans-serif',
        backgroundColor: colors.gray[850],
        color: colors.white,
        fontSize: '12px',
        fontWeight: 500,
        padding: '8px 12px',
        borderRadius: '8px',
        '& .MuiTooltip-arrow': {
            color: colors.gray[850],
        },
    },
});

export const Navbar = () => {
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showBudgetingDialog, setShowBudgetingDialog] = useState(false);
    const [showCalendarWidget, setShowCalendarWidget] = useState(false);
    const pathname = usePathname();

    const renderNavItem = useCallback((item: { key: string; title: string; href: string; icon: string }) => {
        const Icon = navIcons[item.icon as keyof typeof navIcons];
        const active = pathname === item.href;

        return (
            <Link key={item.key} href={item.href} style={{ textDecoration: 'none' }}>
                <StyledNavItem active={active}>
                    {Icon && <Icon sx={{ mr: 1, fontSize: 20, color: active ? colors.primary.main : colors.gray[400] }} />}
                    {item.title}
                </StyledNavItem>
            </Link>
        );
    }, [pathname]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: colors.primary.main }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: 0, height: '82px' }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gridColumn: '1 / 2',
                                cursor: 'pointer'
                            }}>
                                <LogoIcon sx={{ color: 'white', width: 154, height: 26 }} />
                            </Box>
                        </Link>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <StyledTooltip title="Notifications" placement="bottom" arrow>
                                <StyledIcon disabled>
                                    <BellIcon />
                                </StyledIcon>
                            </StyledTooltip>
                            <StyledTooltip title="Budgeting" placement="bottom" arrow>
                                <StyledIcon onClick={() => setShowBudgetingDialog(true)}>
                                    <CalculatorIcon />
                                </StyledIcon>
                            </StyledTooltip>
                            <StyledTooltip title="Calendar" placement="bottom" arrow>
                                <StyledIcon onClick={() => setShowCalendarWidget(!showCalendarWidget)}>
                                    <CalendarIcon />
                                </StyledIcon>
                            </StyledTooltip>
                            <StyledTooltip title="Messages" placement="bottom" arrow>
                                <StyledIcon disabled>
                                    <MessagesIcon />
                                </StyledIcon>
                            </StyledTooltip>
                            <Box sx={{ position: 'relative' }}>
                                <StyledAvatar
                                    onMouseEnter={() => setShowUserProfile(true)}
                                    onMouseLeave={() => setShowUserProfile(false)}
                                >
                                    D
                                </StyledAvatar>
                                {showUserProfile && (
                                    <UserProfileHover
                                        name="Dylan Frank"
                                        email="dylanfran96@gmail.com"
                                    />
                                )}
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: colors.gray[100] }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', padding: "14px 0" }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            gridColumn: '1 / 2'
                        }}>
                            {navItems.map(renderNavItem)}
                        </Box>
                        <StyledBox>
                            <SearchIcon sx={{ fontSize: 24, color: colors.gray[400], mr: 1 }} />
                            <InputBase
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 300,
                                    fontFamily: 'var(--font-euclid-circular-b)',
                                    '& .MuiInputBase-input::placeholder': {
                                        color: colors.gray[200],
                                    }
                                }}
                                placeholder="Search listings, users here..."
                                value={searchValue}
                                fullWidth
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {searchValue && (
                                <IconButton
                                    onClick={() => setSearchValue('')}
                                    sx={{ p: 0.5, color: colors.gray[400] }} >
                                    <CancelIcon sx={{ fontSize: 16, color: colors.gray.main }} />
                                </IconButton>
                            )}
                        </StyledBox>
                    </Toolbar>
                </Container>
            </Box>
            <BudgetingDialog
                open={showBudgetingDialog}
                onClose={() => setShowBudgetingDialog(false)}
            />
            <CalendarWidget
                open={showCalendarWidget}
                onClose={() => setShowCalendarWidget(false)}
            />
        </Box>
    );
};
