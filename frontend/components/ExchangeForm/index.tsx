import { Formik, ErrorMessage as FormikErrorMessage } from "formik";
import {
  Box,
  Flex,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage as ChakraErrorMessage,
  Button
} from "@chakra-ui/react";

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
        >
          {(formikProps) => (
            <form autoComplete="off" onSubmit={formikProps.handleSubmit}>
              <Flex
                flexDirection={{ base: "column", xl: "row" }}
                gap={{ base: 10, xl: 5 }}
                mb={10}
              >
                <FormControl variant="floating" id="amount" isRequired>
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
                    isInvalid={isFormFieldInvalid({
                      fieldName: "amount",
                      formikErrors: formikProps.errors,
                      hookErrors: hookError?.errors as ApiErrorItemType[]
                    })}
                    type="number"
                    min={1}
                    size="lg"
                  />
                  <FormLabel>Amount</FormLabel>

                  <FormikErrorMessage name="amount">
                    {(message) => (
                      <ChakraErrorMessage>{message}</ChakraErrorMessage>
                    )}
                  </FormikErrorMessage>
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
                  >
                    <Select
                      name={name}
                      value={formikProps.values[name as keyof FormFieldsType]}
                      onChange={formikProps.handleChange}
                      isDisabled={isLoading}
                      isInvalid={isFormFieldInvalid({
                        fieldName: name,
                        formikErrors: formikProps.errors,
                        hookErrors: hookError?.errors as ApiErrorItemType[]
                      })}
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

                    <FormikErrorMessage name={name}>
                      {(message) => (
                        <ChakraErrorMessage>{message}</ChakraErrorMessage>
                      )}
                    </FormikErrorMessage>
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
