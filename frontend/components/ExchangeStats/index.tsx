import { Box, Button } from "@chakra-ui/react";

import type { FC } from "react";
import type { ApiStatsDataType } from "@shared-types";

import { useExchangeStats } from "./hooks";
import { StatsItem } from "./components";

interface Props {
  data: ApiStatsDataType;
}

const ExchangeStats: FC<Props> = ({ data: defaultData }) => {
  const {
    data: {
      conversionsLength,
      topDestinationCurrency,
      totalAmountConvertedUSD
    },
    handleUpdateStats,
    isLoading
  } = useExchangeStats({ defaultData });

  return (
    <Box textAlign="center" color="white">
      <Box mb={10}>
        {[
          { title: "Total amount of conversions", value: conversionsLength },
          {
            title: "Top destination currency",
            // eslint-disable-next-line no-underscore-dangle
            value: `${topDestinationCurrency._id} (${topDestinationCurrency.count}x)`
          },
          {
            title: "Total amount converted to USD",
            value: totalAmountConvertedUSD
          }
        ].map(({ title, value }) => (
          <StatsItem key={title} title={title} value={value} />
        ))}
      </Box>

      <Button
        onClick={handleUpdateStats}
        isLoading={isLoading}
        colorScheme="pink"
        size="lg"
        type="submit"
      >
        Update stats
      </Button>
    </Box>
  );
};

export default ExchangeStats;
