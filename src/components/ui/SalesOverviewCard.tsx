"use client";
import { Box, Button, Grid, Stack, styled } from "@mui/material";
import { CardWrapper } from "./CardWrapper";
import { Heading, Paragraph } from "..";
import { colors } from "@/styles";
import { BarChart } from "./BarChart";
import { MetricCard } from "./MetricCard";

const StyledStack = styled(Stack)({
    marginTop: -8,
    marginBottom: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
});

const TimeFilterButton = styled(Button)({
    textTransform: "none",
    borderRadius: "8px",
    fontSize: 12,
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

const chartData = [
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
];

const bars = [
    { key: "category1", color: "#3B82F6", name: "Category 1" },
    { key: "category2", color: "#10B981", name: "Category 2" },
    { key: "category3", color: "#EF4444", name: "Category 3" },
];

export const SalesOverviewCard = () => {
    return (
        <CardWrapper>
            <StyledStack spacing={2}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                    <Heading >Sales Overview</Heading>
                    <Paragraph sx={{ color: colors.gray[500], fontSize: 12 }}>
                        Showing overview Jan 2022 - Sep 2022
                    </Paragraph>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            borderRadius: "72px",
                            borderColor: colors.gray[550],
                            color: colors.primary.main,
                            fontSize: 14,
                            fontFamily: "var(--font-euclid-circular-b), sans-serif",
                            fontWeight: 400,
                            padding: "12px 24px",
                        }}
                    >
                        View Transactions
                    </Button>
                    <Stack direction="row" spacing={1}>
                        <TimeFilterButton disableRipple>
                            1 Week
                        </TimeFilterButton>
                        <TimeFilterButton disableRipple>
                            1 Month
                        </TimeFilterButton>
                        <TimeFilterButton disableRipple className="active">
                            1 Year
                        </TimeFilterButton>
                    </Stack>
                </Box>
            </StyledStack>
            <Box sx={{
                display: "flex",
                gap: "11px",
                marginTop: 2,
                alignItems: "flex-start"
            }}>
                <Box sx={{ flex: 1, height: "180px", width: "100%" }}>
                    <BarChart
                        data={chartData}
                        xAxisKey="month"
                        bars={bars}
                        height={180}
                        yAxisDomain={[0, 50]}
                        yAxisTicks={[0, 10, 20, 30, 40, 50]}
                        showGrid={false}
                        showTooltip={true}
                    />
                </Box>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    flex: 1
                }}>
                    <MetricCard
                        value="₦120,000,000.00"
                        label="Total Inflow"
                        trend={{ value: "2.5%", isPositive: true }}
                        color={colors.secondary.main}
                    />
                    <MetricCard
                        value="₦50,000,000.00"
                        label="MRR"
                        trend={{ value: "2.5%", isPositive: true }}
                        color={colors.secondary[100]}
                    />
                    <MetricCard
                        value="₦200,000,000.00"
                        label="Commission Revenue"
                        trend={{ value: "0.5%", isPositive: true }}
                        color={colors.secondary[300]}
                        trendColor={{ positive: colors.secondary[300], negative: colors.error[500] }}
                    />
                    <MetricCard
                        value="₦100,000,000.00"
                        label="GMV"
                        trend={{ value: "0.5%", isPositive: false }}
                        color={colors.error[500]}
                        trendColor={{ positive: colors.secondary[300], negative: colors.error[500] }}
                    />
                </Box>
            </Box>
        </CardWrapper>
    );
};
