import ExchangeCurrency from "../models/exchangeCurrency.model";

import type { ExchangeCurrencyDataType } from "../models/exchangeCurrency.model";

/* Save exchange currency record to DB */
const saveRecord = async (data: ExchangeCurrencyDataType): Promise<void> => {
  const newRecord = new ExchangeCurrency(data);

  await newRecord.save();
};

export default { saveRecord };
