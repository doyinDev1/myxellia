"use client"        
import React from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    styled,
} from '@mui/material';
import { CalculatorIcon } from '@/components/svgs';

interface BudgetingDialogProps {
    open: boolean;
    onClose: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiBackdrop-root': {
        backdropFilter: 'blur(3px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    '& .MuiDialog-paper': {
        borderRadius: 16,
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'visible',
        width: '100%',
        margin: theme.spacing(2),
        maxWidth: 500,
        backgroundColor: 'transparent',
    },
}));

const DialogHeader = styled(Box)({
    backgroundColor: '#1e3a8a',
    padding: '40px 32px',
    borderRadius: '16px 16px 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
});

const DialogBody = styled(Box)({
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '0 0 16px 16px',
});

const FeatureBlock = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '24px',
    '&:last-child': {
        marginBottom: '32px',
    },
});

const FeatureIcon = styled(Box)({
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    flexShrink: 0,
});

const FeatureContent = styled(Box)({
    flex: 1,
});

const FeatureTitle = styled(Typography)({
    fontWeight: 600,
    fontSize: '16px',
    color: '#1f2937',
    marginBottom: '8px',
    lineHeight: 1.4,
});

const FeatureDescription = styled(Typography)({
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.5,
});

const CreateBudgetButton = styled(Button)({
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    width: '100%',
    '&:hover': {
        backgroundColor: '#374151',
    },
});

export const BudgetingDialog: React.FC<BudgetingDialogProps> = ({
    open,
    onClose,
}) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            aria-labelledby="budgeting-dialog-title"
        >
            <DialogHeader>
                <Box
                    sx={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CalculatorIcon sx={{ color: 'white', fontSize: '40px' }} />
                </Box>
            </DialogHeader>

            <DialogBody>
                <FeatureBlock>
                    <FeatureIcon>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                position: 'relative',
                                '&::before, &::after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    border: '2px solid #9ca3af',
                                },
                                '&::before': {
                                    top: '0',
                                    left: '0',
                                },
                                '&::after': {
                                    bottom: '0',
                                    right: '0',
                                },
                            }}
                        />
                    </FeatureIcon>
                    <FeatureContent>
                        <FeatureTitle>Set up annual budgets by account category</FeatureTitle>
                        <FeatureDescription>
                            Allocate funds across income and expense lines with full visibility.
                        </FeatureDescription>
                    </FeatureContent>
                </FeatureBlock>

                <FeatureBlock>
                    <FeatureIcon>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '4px',
                                    height: '8px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '2px',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '4px',
                                    width: '4px',
                                    height: '12px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '2px',
                                },
                            }}
                        />
                    </FeatureIcon>
                    <FeatureContent>
                        <FeatureTitle>Track actuals vs budget in real time</FeatureTitle>
                        <FeatureDescription>
                            See how your community is performing against plan, month by month.
                        </FeatureDescription>
                    </FeatureContent>
                </FeatureBlock>

                <FeatureBlock>
                    <FeatureIcon>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '4px',
                                    height: '16px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '2px',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '8px',
                                    width: '4px',
                                    height: '12px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '2px',
                                },
                            }}
                        />
                    </FeatureIcon>
                    <FeatureContent>
                        <FeatureTitle>Adjust figures and forecast with ease</FeatureTitle>
                        <FeatureDescription>
                            Edit amounts, apply percentage changes, or roll forward last year&apos;s data—all in one place.
                        </FeatureDescription>
                    </FeatureContent>
                </FeatureBlock>

                <CreateBudgetButton onClick={onClose}>
                    Create Budget
                </CreateBudgetButton>
            </DialogBody>
        </StyledDialog>
    );
};
