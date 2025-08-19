"use client";
import { Box, IconButton, styled } from "@mui/material";
import { Heading, ListingsOverviewCard, MessageIcon, PropertyListingsSection, SalesOverviewCard, UsersOverviewCard } from "@/components";
import { colors } from "@/styles";

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: "row",
    gap: "21px",
    flexWrap: 'wrap',
    alignItems: 'center'
});

const CTAContainer = styled(Box)({
    position: 'fixed',
    bottom: '212px',
    right: '40px',
    zIndex: 3,
});

const StyledIconButton = styled(IconButton)({
    backgroundColor: colors.secondary[700],
    border: '1px solid #FFFFFF33',
    color: colors.white,
    padding: '16px',
    borderRadius: '50%',
    width: '58px',
    height: '58px',
    '&:hover': {
        backgroundColor: colors.secondary[700],
        color: colors.white,
    }
});

export const Dashboard = () => {
    return (
        <Box sx={{ margin: "12px 24px 16px 24px" }}>
            <Heading sx={{ fontWeight: 600, fontSize: 20, color: colors.primary.main, marginBottom: 2 }}>Welcome, Ahmed</Heading>
            <StyledBox>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(68% - 12px)' }, width: "-webkit-fill-available" }}>
                    <SalesOverviewCard />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(32% - 12px)' }, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <ListingsOverviewCard />
                    <UsersOverviewCard />
                </Box>
            </StyledBox>
            <PropertyListingsSection />
            <CTAContainer>
                <StyledIconButton>
                    <MessageIcon />
                </StyledIconButton>
            </CTAContainer>
        </Box>
    )
};