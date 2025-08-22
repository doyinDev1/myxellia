"use client"
import React from 'react';
import {
    Box,
    Button,
    Dialog,
    styled,
} from '@mui/material';
import { colors } from '@/styles';
import { BudgetingIcon, Heading, Paragraph, PollIcon, SettingsIcon, TrackIcon } from '@/components';
import Image from 'next/image';

interface BudgetingDialogProps {
    open: boolean;
    onClose: () => void;
}

const features = [
    {
        icon: SettingsIcon,
        title: 'Set up annual budgets by account category',
        description: 'Allocate funds across income and expense lines with full visibility.'
    },
    {
        icon: TrackIcon,
        title: 'Track actuals vs budget in real time',
        description: 'See how your community is performing against plan, month by month.'
    },
    {
        icon: PollIcon,
        title: 'Adjust figures and forecast with ease',
        description: 'Edit amounts, apply percentage changes, or roll forward last year\'s data—all in one place.'
    }
];

const StyledDialog = styled(Dialog)({
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '& .MuiDialog-paper': {
        boxShadow: 'none',
        borderRadius: 10,
        overflow: 'visible',
        width: '100%',
        maxWidth: 438,
        backgroundColor: 'transparent',
    },
});

const DialogHeader = styled(Box)({
    backgroundColor: colors.secondary[600],
    padding: '26px 23px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '-80px',
    zIndex: -1,
});

const DialogContent = styled(Box)({
    width: '386px',
    height: '264px',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
});

const StyledBox = styled(Box)({
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
});

const DialogBody = styled(Box)({
    backgroundColor: 'white',
    padding: '24px 47px',
    borderRadius: '0 0 16px 16px',
});

const FeatureBlock = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '25px',
});

const FeatureContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

const FeatureTitle = styled(Heading)({
    fontWeight: 600,
    fontSize: '16px',
    color: colors.primary.main,
});

const FeatureDescription = styled(Paragraph)({
    fontSize: '12px',
    color: colors.gray[500],
    fontWeight: 400,
});

const CreateBudgetButton = styled(Button)({
    backgroundColor: colors.gray[850],
    color: 'white',
    borderRadius: '50px',
    padding: '12px 0px',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: 'var(--font-euclid-circular-b), sans-serif',
    width: '100%',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: colors.secondary[600],
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
                <DialogContent>
                    <Image
                        src="/assets/images/overlay.png"
                        alt="Budgeting background"
                        fill
                        style={{
                            objectFit: 'fill',
                        }}
                    />
                    <StyledBox>
                        <BudgetingIcon sx={{ color: 'white', fontSize: '80px' }} />
                    </StyledBox>
                </DialogContent>
            </DialogHeader>
            <DialogBody>
                {features.map((feature, index) => (
                    <FeatureBlock key={index}>
                        <feature.icon sx={{ color: colors.gray[750], fontSize: '24px' }} />
                        <FeatureContent>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </FeatureContent>
                    </FeatureBlock>
                ))}
                <CreateBudgetButton onClick={onClose}>
                    Create Budget
                </CreateBudgetButton>
            </DialogBody>
        </StyledDialog>
    );
};
