import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: (data: { label?: string }) => {
      if (data?.label) {
        return `${data.label} is a required field`;
      }
      return "This field is required";
    },
    notType: (data: { type?: string }) => {
      if (data?.type) {
        return `This field must be of type ${data.type}`;
      }
      return "Invalid type";
    },
  },
  number: {
    positive: (data: { label?: string }) => {
      return `${data?.label || "This field"} must be a positive number`;
    },
    moreThan: ({ more }: { more: number }) =>
      `The value must be greater than ${more}`,
    min: ({ min }: { min: number }) => `The minimum value is ${min}`,
    max: ({ max }: { max: number }) => `The maximum value is ${max}`,
  },
  string: {
    matches: (data: { label?: string }) => {
      return `Invalid format for ${data?.label || "this field"}`;
    },
    email: () => "Invalid email format",
    min: ({ min }: { min: number }) =>
      `The minimum length is ${min} characters`,
    max: ({ max }: { max: number }) =>
      `The maximum length is ${max} characters`,
  },
  array: {
    min: ({ min, label }: { min: number; label?: string }) => {
      return `Select ${min} or more ${label || "items"}`;
    },
  },
});

export default yup;
