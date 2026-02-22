import { useMutation } from "@tanstack/react-query";
import { ingestRepository } from "../../Repositories/ingest/ingestRepository";

export function useIngestTextMutation(options = {}) {
  return useMutation({
    mutationFn: (params) => ingestRepository.ingestText(params),
    ...options,
  });
}
