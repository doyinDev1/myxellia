import { colors } from "@/styles";
import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface CardWrapperProps {
    children: ReactNode;
    sx?: SxProps;
}

export const CardWrapper = ({ children, sx }: CardWrapperProps) => {
    return (
        <Box
            sx={{
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: colors.secondary[200],
                backgroundColor: "white",
                ...sx
            }}
        >
            {children}
        </Box>
    );
};
