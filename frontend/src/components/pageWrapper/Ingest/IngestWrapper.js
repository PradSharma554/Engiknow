import {
  UploadCloud,
  CheckCircle,
  FileText,
  Link as LinkIcon,
  Loader2,
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
}) {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <DatabaseIcon className="w-8 h-8 text-blue-500" />
          Knowledge Ingestion
        </h1>
        <p className="text-slate-400 mt-2">
          Paste company knowledge, PR summaries, or documentation to embed it
          into the Vector Database.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Document Title *
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
            Raw Content *
          </label>
          <textarea
            required
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
