"use client";
import { Box, Button, Stack, styled } from "@mui/material";
import { CardWrapper } from "./CardWrapper";
import { Heading, Paragraph } from "..";
import { colors } from "@/styles";

const StyledStack = styled(Stack)({
    marginTop: -8,
    marginBottom: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
});

export const SalesOverviewCard = () => {
    return (
        <CardWrapper>
            <StyledStack spacing={2}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                    <Heading >Sales Overview</Heading>
                    <Paragraph sx={{ color: colors.gray[500], fontSize: 12 }}>
                        Showing overview Jan 2022 - Sep 2022
                    </Paragraph>
                </Box>
                <Button
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderRadius: "72px",
                        borderColor: colors.gray[550],
                        color: colors.primary.main,
                        fontSize: 14,
                        fontFamily: "var(--font-euclid-circular-b), sans-serif",
                        fontWeight: 400,
                        padding: "12px 24px",

                    }}
                >
                    View Transactions
                </Button>
            </StyledStack>
            <Box sx={{
                height: "200px",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary"
            }}>
                Chart placeholder
            </Box>
        </CardWrapper>
    );
};
