import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../src/shared/utils/yupLocale";

const HomeFiltersType = yup.object().shape({
  techStacks: yup.array(),
  topics: yup.array(),
  seniority: yup.string(),
  englishLevel: yup.string(),
  startDate: yup.date(),
});

export const HomeTypeResolver = yupResolver(HomeFiltersType);
