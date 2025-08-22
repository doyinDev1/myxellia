import { Box } from '@mui/material';
import { colors } from '@/styles';
import { Paragraph } from '../typography';

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        dataKey: string;
        value: number;
        color: string;
    }>;
    label?: string;
    bars: Array<{
        key: string;
        color: string;
        name: string;
    }>;
}

export const CustomTooltip = ({ active, payload, label, bars }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray[100]}`,
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}>
                <Box sx={{
                    fontSize: '12px',
                    color: colors.gray[800],
                    marginBottom: '4px'
                }}>
                    {label}
                </Box>
                {payload.map((entry, index: number) => {
                    const bar = bars.find((b: { key: string; color: string; name: string }) => b.key === entry.dataKey);
                    return (
                        <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '11px',
                            color: colors.gray[700]
                        }}>
                            <Box sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '2px',
                                backgroundColor: bar?.color || entry.color
                            }} />
                            <Paragraph sx={{ color: colors.gray[800] }}>{bar?.name || entry.dataKey}:</Paragraph>
                            <Paragraph sx={{ color: colors.gray[800] }}>{entry.value}m</Paragraph>
                        </Box>
                    );
                })}
            </Box>
        );
    }
    return null;
};
