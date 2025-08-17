"use client";
import React from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '@/styles';
import { Heading, Paragraph } from '../typography';
import { DownTrendIcon, UpTrendIcon } from '../svgs';

interface MetricCardProps {
    value: string;
    label: string;
    trend: {
        value: string;
        isPositive: boolean;
    };
    color: string;
    trendColor?: {
        positive?: string;
        negative?: string;
    };
}

const CardContainer = styled(Box)({
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '13px 15px',
    border: `1px solid ${colors.secondary[200]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});


const TrendContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '10px',
    fontWeight: 400,
});

const TrendArrow = styled(Box)({
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const TrendValue = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isPositive" && prop !== "positiveColor" && prop !== "negativeColor",
})<{ isPositive: boolean, positiveColor: string, negativeColor: string }>(({ isPositive, positiveColor, negativeColor }) => ({
    color: isPositive ? positiveColor : negativeColor,
    fontSize: '10px',
    fontWeight: 400
}));

export const MetricCard: React.FC<MetricCardProps> = ({
    value,
    label,
    trend,
    color,
    trendColor
}) => {
    const defaultPositiveColor = colors.secondary[100];
    const defaultNegativeColor = colors.error[500];

    const positiveColor = trendColor?.positive || defaultPositiveColor;
    const negativeColor = trendColor?.negative || defaultNegativeColor;

    return (
        <CardContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <Heading sx={{ color, fontSize: 19, fontWeight: 600 }}>
                        {value}
                    </Heading>

                    <Box sx={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>

                        <Paragraph sx={{ color: colors.gray[400], fontWeight: 500, fontSize: 10 }}>
                            {label}
                        </Paragraph>
                        <TrendContainer>
                            <TrendArrow >
                                {trend.isPositive ? (
                                    <UpTrendIcon sx={{ fontSize: 12, color: positiveColor }} />
                                ) : (
                                    <DownTrendIcon sx={{ fontSize: 12, color: negativeColor }} />
                                )}
                            </TrendArrow>
                            <TrendValue isPositive={trend.isPositive} positiveColor={positiveColor} negativeColor={negativeColor}>
                                {trend.value}
                            </TrendValue>
                        </TrendContainer>
                    </Box>
                </Box>
            </Box>
        </CardContainer>
    );
};
