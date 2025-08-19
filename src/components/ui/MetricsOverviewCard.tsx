"use client";
import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import { colors } from "@/styles";
import { Heading, Paragraph, OverviewCard } from "@/components";

const StyledHeading = styled(Heading)({
    color: colors.gray[900],
    fontSize: 24
});

const StyledParagraph = styled(Paragraph)({
    color: colors.gray[600],
    fontWeight: 500,
    fontSize: 14
});

const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 16
});

interface Metric {
    label: string;
    value: string | number;
    color?: string;
}

interface MetricsOverviewCardProps {
    title: string;
    icon: ReactNode;
    metrics: Metric[];
}

export const MetricsOverviewCard = ({ title, icon, metrics }: MetricsOverviewCardProps) => {
    return (
        <OverviewCard
            title={title}
            icon={icon}
        >
            {metrics.map((metric, index) => (
                <StyledBox key={index}>
                    <StyledParagraph>
                        {metric.label}
                    </StyledParagraph>
                    <StyledHeading sx={{ color: metric.color || colors.gray[900] }}>
                        {metric.value}
                    </StyledHeading>
                </StyledBox>
            ))}
        </OverviewCard>
    );
};
