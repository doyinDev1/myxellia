"use client";
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { colors } from '@/styles';
import { Box } from '@mui/material';
import { CustomTooltip } from './CustomTooltip';

export interface BarChartData {
    [key: string]: string | number;
}

export interface BarChartProps {
    data: BarChartData[];
    xAxisKey: string;
    bars: Array<{
        key: string;
        color: string;
        name: string;
    }>;
    height?: number;
    yAxisDomain?: [number, number];
    yAxisTicks?: number[];
    showGrid?: boolean;
    showXGrid?: boolean;
    showYGrid?: boolean;
    showTooltip?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    xAxisKey,
    bars,
    height = 300,
    yAxisDomain = [0, 50],
    yAxisTicks = [0, 10, 20, 30, 40, 50],
    showGrid = false,
    showXGrid = false,
    showYGrid = false,
    showTooltip = true,
}) => {
    return (
        <Box sx={{ width: "calc(100% + 60px)", height: "100%" }}>
            <ResponsiveContainer width="100%" height={height} style={{ marginLeft: "-40px" }}>
                <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barGap={3} >
                    {(showGrid || showXGrid || showYGrid) && (
                        <CartesianGrid
                            strokeDasharray="2 2"
                            stroke="#f0f0f0"
                            horizontal={showGrid || showYGrid}
                            vertical={showGrid || showXGrid}
                        />
                    )}
                    <XAxis
                        dataKey={xAxisKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, color: colors.secondary[200] }}
                    />
                    <YAxis
                        axisLine={true}
                        tickLine={false}
                        tick={{ fontSize: 12, color: colors.secondary[200], }}
                        domain={yAxisDomain}
                        ticks={yAxisTicks}
                        tickFormatter={(value) => `${value}m`}

                    />
                    {showTooltip && (
                        <Tooltip content={<CustomTooltip bars={bars} />} />
                    )}
                    {bars.map((bar) => (
                        <Bar
                            key={bar.key}
                            dataKey={bar.key}
                            fill={bar.color}
                            radius={[0, 0, 0, 0]}
                            barSize={4}
                            name={bar.name}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </Box>
    );
};
