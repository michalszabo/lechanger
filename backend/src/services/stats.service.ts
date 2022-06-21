import type {
  ApiStatsDataType,
  ApiTopDestinationCurrencyType
} from "@shared-types";

import ExchangeCurrency from "../models/exchangeCurrency.model";

/* Get stats currency record from DB */
const getData = async (): Promise<ApiStatsDataType> => {
  const basicStatsAggregation = await ExchangeCurrency.aggregate([
    {
      $group: {
        _id: null,
        // Collection length
        conversionsLength: { $sum: 1 },
        // usdAmount summed up
        totalAmountConvertedUSD: { $sum: "$usdAmount" }
      }
    }
  ]);

  // Count top destination currency
  const topDestinationCurrencyAggregation = await ExchangeCurrency.aggregate([
    {
      $unwind: "$destinationCurrency"
    },
    { $sortByCount: "$destinationCurrency" },
    { $limit: 1 }
  ]);

  const [basicStats] = basicStatsAggregation as ApiStatsDataType[];
  const [topDestinationCurrency] =
    topDestinationCurrencyAggregation as ApiTopDestinationCurrencyType[];

  if (!basicStats || !topDestinationCurrency) throw Error("No stats available");

  const formatedStats: ApiStatsDataType = {
    conversionsLength: basicStats?.conversionsLength,
    totalAmountConvertedUSD: basicStats?.totalAmountConvertedUSD,
    topDestinationCurrency
  };

  return formatedStats;
};

export default { getData };
