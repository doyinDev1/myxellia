"use client";
import { useState } from "react";
import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import { CardWrapper } from "./CardWrapper";
import { BarChart, ChevronLeftIcon, Heading, MetricCard, Paragraph } from "@/components";
import { colors } from "@/styles";

const StyledStack = styled(Stack)({
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: `1px solid ${colors.secondary[200]}`,
    paddingBottom: "12px",
});

const TimeFilterButton = styled(Button)({
    textTransform: "none",
    borderRadius: "8px",
    fontSize: 14,
    fontFamily: "var(--font-euclid-circular-b), sans-serif",
    fontWeight: 400,
    padding: "6px 16px",
    minWidth: "auto",
    backgroundColor: colors.white,
    color: colors.gray[400],
    "&.active": {
        backgroundColor: colors.gray[300],
        fontWeight: 600,
        fontSize: 14,
        "&:hover": {
            backgroundColor: colors.gray[300],
        }
    }
});

const NavigationButton = styled(IconButton)({
    backgroundColor: colors.gray[300],
    color: colors.gray[600],
    width: "18px",
    height: "18px",
    "&:hover": {
        backgroundColor: colors.gray[400],
    },
    "&:disabled": {
        backgroundColor: colors.gray[300],
        color: colors.gray[400],
        cursor: "not-allowed"
    }
});

const chartData = {
    week: [
        { day: "Mon", category1: 8, category2: 6, category3: 2 },
        { day: "Tue", category1: 12, category2: 9, category3: 4 },
        { day: "Wed", category1: 15, category2: 11, category3: 3 },
        { day: "Thu", category1: 10, category2: 8, category3: 5 },
        { day: "Fri", category1: 18, category2: 14, category3: 6 },
        { day: "Sat", category1: 22, category2: 16, category3: 7 },
        { day: "Sun", category1: 14, category2: 12, category3: 4 },
    ],
    month: [
        { week: "Week 1", category1: 35, category2: 27, category3: 9 },
        { week: "Week 2", category1: 28, category2: 22, category3: 7 },
        { week: "Week 3", category1: 42, category2: 31, category3: 12 },
        { week: "Week 4", category1: 38, category2: 29, category3: 8 },
    ],
    year: [
        { month: "Jan", category1: 35, category2: 27, category3: 9 },
        { month: "Feb", category1: 5, category2: 27, category3: 9 },
        { month: "Mar", category1: 14, category2: 6, category3: 3 },
        { month: "Apr", category1: 14, category2: 25, category3: 9 },
        { month: "May", category1: 4, category2: 2, category3: 7 },
        { month: "Jun", category1: 36, category2: 47, category3: 5 },
        { month: "Jul", category1: 24, category2: 36, category3: 17 },
        { month: "Aug", category1: 15, category2: 5, category3: 18 },
        { month: "Sep", category1: 35, category2: 27, category3: 6 },
        { month: "Oct", category1: 35, category2: 27, category3: 6 },
        { month: "Nov", category1: 11, category2: 17, category3: 9 },
        { month: "Dec", category1: 33, category2: 29, category3: 1 },
    ]
};

const StyledButton = styled(Button)({
    textTransform: "none",
    borderRadius: "72px",
    border: "1px solid",
    borderColor: colors.gray[550],
    color: colors.primary.main,
    fontSize: 14,
    fontFamily: "var(--font-euclid-circular-b), sans-serif",
    fontWeight: 400,
    padding: "12px 24px",
    marginTop: "-15px"
});

const StyledBox = styled(Box)({
    display: "flex",
    gap: "23px",
    marginTop: "16px",
    alignItems: "center"
});

const bars = [
    { key: "category1", color: colors.secondary.main, name: "Total Inflow" },
    { key: "category2", color: colors.secondary[100], name: "MRR" },
    { key: "category3", color: colors.error[500], name: "GMV" },
];

const timePeriods = [
    { key: "week", label: "1 Week", xAxisKey: "day" },
    { key: "month", label: "1 Month", xAxisKey: "week" },
    { key: "year", label: "1 Year", xAxisKey: "month" }
];

const metrics = {
    week: [
        {
            value: "₦150,000,000.00",
            label: "Total Inflow",
            trend: { value: "3.2%", isPositive: true },
            color: colors.secondary.main
        },
        {
            value: "₦110,000,000.00",
            label: "MRR",
            trend: { value: "1.8%", isPositive: true },
            color: colors.secondary[100]
        },
        {
            value: "₦150,000,000.00",
            label: "Commission Revenue",
            trend: { value: "4.1%", isPositive: true },
            color: colors.secondary[300],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        },
        {
            value: "₦150,000,000.00",
            label: "GMV",
            trend: { value: "2.3%", isPositive: false },
            color: colors.error[500],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        }
    ],
    month: [
        {
            value: "₦180,000,000.00",
            label: "Total Inflow",
            trend: { value: "2.8%", isPositive: true },
            color: colors.secondary.main
        },
        {
            value: "₦65,000,000.00",
            label: "MRR",
            trend: { value: "2.1%", isPositive: true },
            color: colors.secondary[100]
        },
        {
            value: "₦320,000,000.00",
            label: "Commission Revenue",
            trend: { value: "3.5%", isPositive: true },
            color: colors.secondary[300],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        },
        {
            value: "₦150,000,000.00",
            label: "GMV",
            trend: { value: "1.7%", isPositive: false },
            color: colors.error[500],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        }
    ],
    year: [
        {
            value: "₦120,000,000.00",
            label: "Total Inflow",
            trend: { value: "2.5%", isPositive: true },
            color: colors.secondary.main
        },
        {
            value: "₦50,000,000.00",
            label: "MRR",
            trend: { value: "2.5%", isPositive: true },
            color: colors.secondary[100]
        },
        {
            value: "₦200,000,000.00",
            label: "Commission Revenue",
            trend: { value: "0.5%", isPositive: true },
            color: colors.secondary[300],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        },
        {
            value: "₦100,000,000.00",
            label: "GMV",
            trend: { value: "0.5%", isPositive: false },
            color: colors.error[500],
            trendColor: { positive: colors.secondary[300], negative: colors.error[500] }
        }
    ]
};

export const SalesOverviewCard = () => {
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState(2);
    const currentPeriod = timePeriods[currentPeriodIndex];
    const currentData = chartData[currentPeriod.key as keyof typeof chartData];

    const handlePrevious = () => {
        setCurrentPeriodIndex((prev) => (prev > 0 ? prev - 1 : timePeriods.length - 1));
    };

    const handleNext = () => {
        setCurrentPeriodIndex((prev) => (prev < timePeriods.length - 1 ? prev + 1 : 0));
    };

    const getPeriodLabel = () => {
        switch (currentPeriod.key) {
            case "week":
                return "Showing overview for current week";
            case "month":
                return "Showing overview for current month";
            case "year":
                return "Showing overview Jan 2022 - Sep 2022";
            default:
                return "";
        }
    };

    const isLastPeriod = currentPeriodIndex === timePeriods.length - 1;
    const isFirstPeriod = currentPeriodIndex === 0;

    return (
        <CardWrapper>
            <StyledStack spacing={2}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignSelf: "flex-start" }}>
                    <Heading >Sales Overview</Heading>
                    <Paragraph sx={{ color: colors.gray[500], fontSize: 12 }}>
                        {getPeriodLabel()}
                    </Paragraph>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "17px" }}>
                    <StyledButton>View Transactions</StyledButton>
                    <Stack direction="row" spacing={1}>
                        {timePeriods.map((period, index) => (
                            <TimeFilterButton
                                key={period.key}
                                disableRipple
                                className={index === currentPeriodIndex ? "active" : ""}
                                onClick={() => setCurrentPeriodIndex(index)}
                            >
                                {period.label}
                            </TimeFilterButton>
                        ))}
                    </Stack>
                </Box>
            </StyledStack>
            <StyledBox>
                <Box sx={{ height: "180px", width: "100%", position: "relative" }}>
                    <BarChart
                        data={currentData}
                        xAxisKey={currentPeriod.xAxisKey}
                        bars={bars}
                        height={180}
                        yAxisDomain={[0, 50]}
                        yAxisTicks={[0, 10, 20, 30, 40, 50]}
                        showGrid={false}
                        showTooltip={true}
                    />
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "-25px",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        marginLeft: "10px"
                    }}>
                        <NavigationButton
                            onClick={handlePrevious}
                            disabled={isFirstPeriod}
                        >
                            <ChevronLeftIcon sx={{ fontSize: 7, color: isFirstPeriod ? colors.gray[200] : colors.gray[600] }} />
                        </NavigationButton>
                    </Box>
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        right: "-10px",
                        transform: "translateY(-50%)",
                        zIndex: 1
                    }}>
                        <NavigationButton onClick={handleNext} disabled={isLastPeriod} >
                            <ChevronLeftIcon sx={{ fontSize: 7, transform: "rotate(180deg)", color: isLastPeriod ? colors.gray[200] : colors.gray[600] }} />
                        </NavigationButton>
                    </Box>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, flex: 1 }}>
                    {metrics[currentPeriod.key as keyof typeof metrics].map((metric, index) => (
                        <MetricCard
                            key={index}
                            value={metric.value}
                            label={metric.label}
                            trend={metric.trend}
                            color={metric.color}
                            trendColor={metric.trendColor}
                        />
                    ))}
                </Box>
            </StyledBox>
        </CardWrapper>
    );
};
