"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Button,
    InputBase,
    Avatar,
    Container,
    styled
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    BellIcon,
    CalculatorIcon,
    CalendarIcon,
    LogoIcon,
    MessagesIcon,
    UserProfileHover,
    SearchIcon
} from '@/components';
import { colors } from '@/styles';
import { navItems } from './nav-items';
import { navIcons } from './nav-icons';

const StyledIcon = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ disabled }) => ({
    color: disabled ? colors.gray.main : colors.white,
    '&:hover': {
        color: colors.white,
    },
    '&.Mui-disabled': {
        color: colors.gray.main,
        opacity: 0.6
    }
}));

const StyledAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== "showUserProfile",
})<{ showUserProfile?: boolean }>(({ showUserProfile }) => ({
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 500,
    fontSize: 23,
    cursor: 'pointer',
    border: showUserProfile ? "4px solid white" : "4px solid transparent",
    transform: showUserProfile ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease"
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

export const Navbar = () => {
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const pathname = usePathname();

    const renderNavItem = (item: { key: string; title: string; href: string; icon: string }) => {
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
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: colors.primary.main }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
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
                            <StyledIcon disabled>
                                <BellIcon />
                            </StyledIcon>
                            <StyledIcon >
                                <CalculatorIcon />
                            </StyledIcon>
                            <StyledIcon >
                                <CalendarIcon />
                            </StyledIcon>
                            <StyledIcon disabled>
                                <MessagesIcon />
                            </StyledIcon>
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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: 320,
                                height: 43,
                                backgroundColor: colors.gray[300],
                                borderRadius: 3,
                                px: 2,
                                border: '1px solid',
                                borderColor: colors.secondary[200],
                                boxShadow: 'none'
                            }}
                        >
                            <SearchIcon sx={{ fontSize: 24, color: colors.gray[400], mr: 1 }} />
                            <InputBase
                                sx={{
                                    flex: 1,
                                    fontSize: 12,
                                    fontWeight: 300,
                                    fontFamily: 'var(--font-euclid-circular-b)',
                                    '& .MuiInputBase-input::placeholder': {
                                        color: colors.gray[200],
                                    }
                                }}
                                placeholder="Search listings, users here..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {searchValue && (
                                <IconButton
                                    onClick={() => setSearchValue('')}
                                    sx={{
                                        p: 0.5,
                                        color: colors.gray[400],
                                        '&:hover': {
                                            color: colors.gray[600]
                                        }
                                    }}
                                >
                                    <CancelIcon sx={{ fontSize: 16, color: colors.gray.main }} />
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        </Box>
    );
};
