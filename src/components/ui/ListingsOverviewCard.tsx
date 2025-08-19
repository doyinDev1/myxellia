import { HomeIcon, MetricsOverviewCard } from "@/components";
import { colors } from "@/styles";

const listingsMetrics = [
    { label: "Total", value: "1.8k" },
    { label: "Active", value: "80" },
    { label: "Archived", value: "1k" }
];

export const ListingsOverviewCard = () => {
    return (
        <MetricsOverviewCard
            title="Listings Overview"
            icon={<HomeIcon sx={{ fontSize: 24, color: colors.secondary.main }} />}
            metrics={listingsMetrics}
        />
    );
};
