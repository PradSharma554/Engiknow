import api from "../../lib/api";

class IngestRepository {
  static instance = null;

  static getInstance() {
    if (!IngestRepository.instance) {
      IngestRepository.instance = new IngestRepository();
    }
    return IngestRepository.instance;
  }

  async ingestText({ title, text, type, sourceUrl, workspaceId }) {
    const { data } = await api.post("/ingest/text", {
      title,
      text,
      type,
      sourceUrl,
      workspaceId,
    });
    return data;
  }

  async getIngestions(workspaceId) {
    const { data } = await api.get(`/ingest/${workspaceId}`);
    return data;
  }

  async getIngestionById(documentId) {
    const { data } = await api.get(`/ingest/detail/${documentId}`);
    return data;
  }
}

export const ingestRepository = IngestRepository.getInstance();
