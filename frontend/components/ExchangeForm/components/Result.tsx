import type { FC } from "react";
import type { ApiExchangeSuccessDataType } from "@shared-types";

interface Props {
  data: ApiExchangeSuccessDataType;
}

const Result: FC<Props> = ({ data }) => (
  <div>
    <div>{JSON.stringify(data)}</div>
  </div>
);

export default Result;
