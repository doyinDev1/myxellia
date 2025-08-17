import React from 'react';
import { Paper } from '@mui/material';
import { colors } from '@/styles';
import { Paragraph } from '..';

interface UserProfileHoverProps {
    name: string;
    email: string;
}

export const UserProfileHover: React.FC<UserProfileHoverProps> = ({ name, email }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                top: '100%',
                right: 0,
                mt: 1,
                p: 1.5,
                minWidth: 200,
                borderRadius: 2,
                zIndex: 1000,
                backgroundColor: colors.gray[100],
            }}
        >
            <Paragraph fontWeight={600} fontSize={16} >
                {name}
            </Paragraph>
            <Paragraph sx={{ color: colors.gray[200], fontSize: 14 }}>
                {email}
            </Paragraph>
        </Paper>
    );
};
