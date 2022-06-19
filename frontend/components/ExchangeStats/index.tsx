import type { FC } from "react";
import type { ApiStatsDataType } from "@shared-types";

import { useExchangeStats } from "./hooks";

interface Props {
  data: ApiStatsDataType;
}

const ExchangeStats: FC<Props> = ({ data: defaultData }) => {
  const { data } = useExchangeStats({ defaultData });

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default ExchangeStats;
