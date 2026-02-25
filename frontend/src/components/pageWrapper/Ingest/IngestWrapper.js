import {
  UploadCloud,
  CheckCircle,
  FileText,
  Link as LinkIcon,
  Loader2,
  Database,
  PlusCircle,
  Eye,
} from "lucide-react";

export default function IngestWrapper({
  title,
  setTitle,
  sourceUrl,
  setSourceUrl,
  content,
  setContent,
  handleSubmit,
  isSubmitting,
  ingestions,
  activeIngestId,
  setActiveIngestId,
  activeIngestData,
  isFetchingIngest,
}) {
  return (
    <div className="flex h-full bg-slate-950/50">
      {/* Sidebar for Past Ingests */}
      <div className="w-64 border-r border-slate-800/60 bg-slate-900/30 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-800/60">
          <button
            onClick={() => setActiveIngestId(null)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Ingestion
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {ingestions && ingestions.length > 0 ? (
            ingestions.map((ingest) => (
              <button
                key={ingest._id}
                onClick={() => setActiveIngestId(ingest._id)}
                className={`w-full text-left truncate px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeIngestId === ingest._id
                    ? "bg-slate-800 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate text-sm">{ingest.title}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center mt-4">
              No recent ingestions
            </p>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto w-full relative">
        <div className="p-8 max-w-4xl mx-auto w-full">
          {activeIngestId ? (
            // View Active Ingestion Details
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <DatabaseIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold text-slate-100">
                  Ingestion Details
                </h1>
              </div>
              {isFetchingIngest || !activeIngestData ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">
                      {activeIngestData.title}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Type: {activeIngestData.type} | ID: {activeIngestData._id}
                    </p>
                  </div>

                  {activeIngestData.sourceUrl && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-1">
                        Source URL
                      </h3>
                      <a
                        href={activeIngestData.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="w-4 h-4" />
                        {activeIngestData.sourceUrl}
                      </a>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Extracted/Raw Data
                    </h3>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 max-h-96 overflow-y-auto whitespace-pre-wrap text-sm text-slate-300">
                      {activeIngestData.content || "No raw text recorded."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // New Ingestion Form
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <DatabaseIcon className="w-8 h-8 text-blue-500" />
                  Knowledge Ingestion
                </h1>
                <p className="text-slate-400 mt-2">
                  Paste company knowledge, PR summaries, or documentation to
                  embed it into the Vector Database.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" /> Document
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-3 text-slate-200 outline-none transition-all placeholder:text-slate-600"
                      placeholder="e.g. Q4 Marketing Strategy"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-slate-400" /> Source URL
                      (Optional)
                    </label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-3 text-slate-200 outline-none transition-all placeholder:text-slate-600"
                      placeholder="https://notion.so/..."
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    {sourceUrl
                      ? "Raw Content (Optional if URL provided)"
                      : "Raw Content *"}
                  </label>
                  <textarea
                    required={!sourceUrl}
                    rows={12}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-3 text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-y"
                    placeholder="Paste your markdown, text, or documentation here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <p className="text-xs text-slate-500 text-right">
                    Plain text or Markdown supported
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Embedding to
                      Pinecone...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-5 h-5" /> Ingest Knowledge
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DatabaseIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);
