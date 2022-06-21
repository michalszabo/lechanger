import type { FormikErrors } from "formik";
import type { ApiErrorItemType } from "@shared-types";

import type { FormFieldsType } from "../types";

interface Props {
  fieldName: string;
  formikErrors: FormikErrors<FormFieldsType>;
  hookErrors: ApiErrorItemType[] | undefined;
}

const getFieldError = ({
  fieldName,
  formikErrors,
  hookErrors
}: Props): string | null => {
  const formikError = Object.entries(formikErrors).find(
    ([key]) => key === fieldName
  );

  if (formikError) {
    const [, value] = formikError;

    return value;
  }

  const hooksError = hookErrors?.find(({ param }) => param === fieldName);

  if (hooksError) {
    const { msg } = hooksError;

    return msg;
  }

  return null;
};

export default getFieldError;
