"use client";
import { Box, Link, styled } from "@mui/material";
import { ReactNode } from "react";
import { colors } from "@/styles";
import { Paragraph } from "@/components";

interface OverviewCardProps {
    title: string;
    icon: ReactNode;
    viewAll?: boolean;
    children?: ReactNode;
}

const StyledBox = styled(Box)({
    height: "163px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    border: "1px solid",
    borderColor: colors.secondary[200],
    backgroundColor: "white",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
});

const WrapperBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray[700],
    borderBottom: "1px solid",
    borderColor: colors.secondary[200],
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "13px 16px",
});

const BottomBox = styled(Box)({
    display: "flex",
    gap: 4,
    padding: "20px 16px 16px 16px",
    justifyContent: "space-between",
});

export const OverviewCard = ({ title, icon, viewAll = true, children }: OverviewCardProps) => {
    return (
        <StyledBox>
            <WrapperBox>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {icon}
                    <Paragraph sx={{ fontWeight: 500, fontSize: 14, color: colors.gray[800] }}>
                        {title}
                    </Paragraph>
                </Box>
                {viewAll && (
                    <Link
                        href="#"
                        sx={{
                            textDecoration: "none",
                            color: colors.secondary.main,
                            fontSize: "14px",
                            fontWeight: 500,
                            "&:hover": {
                                textDecoration: "underline"
                            }
                        }}
                    >
                        View all &gt;
                    </Link>
                )}
            </WrapperBox>
            <BottomBox>
                {children}
            </BottomBox>
        </StyledBox>
    );
};
