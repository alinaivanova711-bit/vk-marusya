import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/auth";

export const useMe = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchMe,
    retry: false,
  });
};