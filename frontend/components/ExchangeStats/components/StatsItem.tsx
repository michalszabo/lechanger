import { Heading, Box } from "@chakra-ui/react";

import type { FC } from "react";

interface Props {
  title: string;
  value: string | number;
}

const StatsItem: FC<Props> = ({ title, value }) => (
  <Box
    _notLast={{
      mb: { base: 8, xl: 10 }
    }}
  >
    <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} mb={2}>
      {title}
    </Heading>
    <Box fontSize="3xl" fontWeight="700">
      {value}
    </Box>
  </Box>
);

export default StatsItem;
