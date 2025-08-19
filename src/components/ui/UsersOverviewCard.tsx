import { MetricsOverviewCard, UsersIcon } from "@/components";
import { colors } from "@/styles";

const usersMetrics = [
    { label: "Total", value: "20.1k" },
    { label: "Riders", value: "8.5k" },
    { label: "Subscribers", value: "7.5k" }
];

export const UsersOverviewCard = () => {
    return (
        <MetricsOverviewCard
            title="Users Overview"
            icon={<UsersIcon sx={{ fontSize: 24, color: colors.secondary.main }} />}
            metrics={usersMetrics}
        />
    );
};
