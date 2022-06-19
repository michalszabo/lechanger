import type { FormikErrors } from "formik";
import type { ApiErrorItemType } from "@shared-types";

import type { FormFieldsType } from "../types";

interface Props {
  fieldName: string;
  formikErrors: FormikErrors<FormFieldsType>;
  hookErrors: ApiErrorItemType[];
}

const isFormFieldInvalid = ({
  fieldName,
  formikErrors,
  hookErrors
}: Props): boolean => {
  const hasFormikError = Object.entries(formikErrors).find(
    ([key]) => key === fieldName
  );

  if (hasFormikError) return true;

  const hasHookError = hookErrors?.find(({ value: key }) => key === fieldName);

  if (hasHookError) return true;

  return false;
};

export default isFormFieldInvalid;
