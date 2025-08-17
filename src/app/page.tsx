import { Heading } from "@/components";
import { colors } from "@/styles";
import { Box } from "@mui/material";
import { SalesOverviewCard, ListingsOverviewCard, UsersOverviewCard } from "@/components/ui";

export default function Home() {
  return (
    <Box sx={{ margin: "12px 24px 16px 24px" }}>
      <Heading sx={{ fontWeight: 600, fontSize: 20, color: colors.primary.main, marginBottom: 2 }}>Welcome, Adedoyin</Heading>
      <Box sx={{
        display: 'flex',
        flexDirection: "row",
        gap: "21px",
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(65% - 12px)' }, width: "-webkit-fill-available" }}>
          <SalesOverviewCard />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(35% - 12px)' } }}>
          <ListingsOverviewCard />
          <UsersOverviewCard />
        </Box>
      </Box>
    </Box>
  );
}
