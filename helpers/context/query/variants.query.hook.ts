import { useQuery } from "@tanstack/react-query";
import {
  fetchVariants,
  VariantQueryParams,
} from "@/helpers/request/variants.request.query";

export function useVariants(params: VariantQueryParams) {
  return useQuery({
    queryKey: ["variants", params],
    queryFn: () => fetchVariants(params),
  });
}
