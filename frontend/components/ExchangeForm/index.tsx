import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Flex,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";

import type { FC } from "react";
import type { ApiErrorItemType } from "@shared-types";
import type { AvailableCurrenciesType } from "@/types";
import type { FormFieldsType } from "./types";

import { useExchangeCurrency } from "./hooks";
import { getFieldError } from "./utilities";
import { Result } from "./components";

const exchangeFormSchema = Yup.object().shape({
  amount: Yup.number()
    .test("'amount muset be greater than 0'", (value) => !!value && value > 0)
    .required("'amount' is required"),
  originalCurrency: Yup.string().required(
    "Pick original currency for exchange"
  ),
  destinationCurrency: Yup.string().required(
    "Pick destination currency for exchange"
  )
});

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
      <Box
        _notLast={{
          mb: { base: 10, xl: 20 }
        }}
      >
        <Formik
          initialValues={
            {
              amount: 500,
              originalCurrency: availableCurrencies.short[0],
              destinationCurrency: availableCurrencies.short[1]
            } as FormFieldsType
          }
          onSubmit={handleSubmit}
          validationSchema={exchangeFormSchema}
        >
          {(formikProps) => (
            <form autoComplete="off" onSubmit={formikProps.handleSubmit}>
              <Flex
                flexDirection={{ base: "column", xl: "row" }}
                gap={{ base: 10, xl: 5 }}
                mb={10}
              >
                <FormControl
                  variant="floating"
                  id="amount"
                  isRequired
                  isInvalid={
                    !!getFieldError({
                      fieldName: "amount",
                      formikErrors: formikProps.errors,
                      hookErrors: hookError?.errors as ApiErrorItemType[]
                    })
                  }
                >
                  <Input
                    _focusVisible={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 1px #FF0080"
                    }}
                    placeholder="500"
                    name="amount"
                    value={formikProps.values.amount}
                    isDisabled={isLoading}
                    isRequired
                    onChange={formikProps.handleChange}
                    type="number"
                    min={1}
                    size="lg"
                  />

                  <FormLabel>Amount</FormLabel>

                  <FormErrorMessage color="pink.100" fontSize="md">
                    {getFieldError({
                      fieldName: "amount",
                      formikErrors: formikProps.errors,
                      hookErrors: hookError?.errors as ApiErrorItemType[]
                    })}
                  </FormErrorMessage>
                </FormControl>

                {[
                  { name: "originalCurrency", label: "Original currency" },
                  { name: "destinationCurrency", label: "Destination currency" }
                ].map(({ name, label }) => (
                  <FormControl
                    key={name}
                    variant="floating"
                    id={name}
                    isRequired
                    isInvalid={
                      !!getFieldError({
                        fieldName: name,
                        formikErrors: formikProps.errors,
                        hookErrors: hookError?.errors as ApiErrorItemType[]
                      })
                    }
                  >
                    <Select
                      name={name}
                      value={formikProps.values[name as keyof FormFieldsType]}
                      onChange={formikProps.handleChange}
                      isDisabled={isLoading}
                      size="lg"
                      _focusVisible={{
                        borderColor: "pink.500",
                        boxShadow: "0 0 0 1px #FF0080"
                      }}
                    >
                      {availableCurrencies.short.map((currency, index) => (
                        <option value={currency} key={currency}>
                          {availableCurrencies.long[index]}
                        </option>
                      ))}
                    </Select>

                    <FormLabel>{label}</FormLabel>

                    <FormErrorMessage color="pink.100" fontSize="md">
                      {getFieldError({
                        fieldName: name,
                        formikErrors: formikProps.errors,
                        hookErrors: hookError?.errors as ApiErrorItemType[]
                      })}
                    </FormErrorMessage>
                  </FormControl>
                ))}
              </Flex>

              <Box textAlign="right">
                <Button
                  isLoading={isLoading}
                  colorScheme="pink"
                  size="lg"
                  type="submit"
                >
                  Exchange
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      {data && <Result data={data} />}
    </>
  );
};

export default ExchangeForm;
