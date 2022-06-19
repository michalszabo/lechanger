import { Formik } from "formik";
import { Input, Select } from "@chakra-ui/react";

import type { FC } from "react";
import type { ApiErrorItemType } from "@shared-types";
import type { AvailableCurrenciesType } from "@/types";
import type { FormFieldsType } from "./types";

import { useExchangeCurrency } from "./hooks";
import { isFormFieldInvalid } from "./utilities";
import { Result } from "./components";

interface Props {
  availableCurrencies: AvailableCurrenciesType;
}

const ExchangeForm: FC<Props> = ({ availableCurrencies }) => {
  const {
    data,
    error: hookError,
    handleSubmit,
    isLoading
  } = useExchangeCurrency();

  return (
    <>
      <Formik
        initialValues={
          {
            amount: 500,
            originalCurrency: availableCurrencies.short[0],
            destinationCurrency: availableCurrencies.short[1]
          } as FormFieldsType
        }
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <form autoComplete="off" onSubmit={formikProps.handleSubmit}>
            <Input
              placeholder="500"
              name="amount"
              value={formikProps.values.amount}
              isDisabled={isLoading}
              isRequired
              onChange={formikProps.handleChange}
              isInvalid={isFormFieldInvalid({
                fieldName: "amount",
                formikErrors: formikProps.errors,
                hookErrors: hookError?.errors as ApiErrorItemType[]
              })}
              type="number"
              min={1}
            />

            <Select
              name="originalCurrency"
              value={formikProps.values.originalCurrency}
              onChange={formikProps.handleChange}
              isInvalid={isFormFieldInvalid({
                fieldName: "originalCurrency",
                formikErrors: formikProps.errors,
                hookErrors: hookError?.errors as ApiErrorItemType[]
              })}
            >
              {availableCurrencies.short.map((currency, index) => (
                <option value={currency} key={currency}>
                  {availableCurrencies.long[index]}
                </option>
              ))}
            </Select>

            <Select
              name="destinationCurrency"
              value={formikProps.values.destinationCurrency}
              onChange={formikProps.handleChange}
              isInvalid={isFormFieldInvalid({
                fieldName: "destinationCurrency",
                formikErrors: formikProps.errors,
                hookErrors: hookError?.errors as ApiErrorItemType[]
              })}
            >
              {availableCurrencies.short.map((currency, index) => (
                <option value={currency} key={currency}>
                  {availableCurrencies.long[index]}
                </option>
              ))}
            </Select>

            {/* {props.errors. && <div id="feedback">{props.errors.name}</div>} */}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>

      {data && <Result data={data} />}
    </>
  );
};

export default ExchangeForm;
