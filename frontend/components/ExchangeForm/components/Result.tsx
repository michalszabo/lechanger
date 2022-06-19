import { Box } from "@chakra-ui/react";

import type { FC } from "react";
import type { ApiExchangeSuccessDataType } from "@shared-types";

interface Props {
  data: ApiExchangeSuccessDataType;
}

const Result: FC<Props> = ({ data }) => {
  const { query, result, info } = data;

  return (
    <Box color="white">
      <Box mb={2} fontSize="md" fontWeight="500">
        <Box as="span">{query.amount} </Box>
        <Box as="span">{query.from} =</Box>
      </Box>

      <Box mb={2} fontSize="3xl" fontWeight="900">
        <Box as="span">{result} </Box>
        <Box as="span">{query.to}</Box>
      </Box>

      <Box mb={2} fontSize="md">
        <Box as="span">Rate: </Box>
        <Box as="span">
          1 {query.to} = {info.rate} {query.from}
        </Box>
      </Box>
    </Box>
  );
};

export default Result;
