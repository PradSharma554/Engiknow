import { useMutation, useQuery } from "@tanstack/react-query";
import { ingestRepository } from "../../Repositories/ingest/ingestRepository";

export function useIngestTextMutation(options = {}) {
  return useMutation({
    mutationFn: (params) => ingestRepository.ingestText(params),
    ...options,
  });
}

export function useGetIngestions(workspaceId, options = {}) {
  return useQuery({
    queryKey: ["ingestions", workspaceId],
    queryFn: () => ingestRepository.getIngestions(workspaceId),
    enabled: !!workspaceId,
    ...options,
  });
}

export function useGetIngestionById(documentId, options = {}) {
  return useQuery({
    queryKey: ["ingestionDetail", documentId],
    queryFn: () => ingestRepository.getIngestionById(documentId),
    enabled: !!documentId,
    ...options,
  });
}
