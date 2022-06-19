import type { ApiStatsDataType } from "@shared-types";

interface Props {
  defaultData: ApiStatsDataType;
}

interface Output {
  data: unknown;
}

const useExchangeStats = ({ defaultData }: Props): Output => {
  console.log(defaultData);

  return {
    data: "TODO"
  };
};

export default useExchangeStats;
