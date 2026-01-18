import { useState } from "preact/hooks";

type DnsRecord = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

const RECORD_TYPES = ["A", "AAAA", "CNAME", "TXT", "MX", "NS"] as const;

export default function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState<(typeof RECORD_TYPES)[number]>("A");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup() {
    const trimmed = domain.trim();
    if (!trimmed) {
      setError("Enter a domain first.");
      setRecords([]);
      return;
    }

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const url = new URL("https://cloudflare-dns.com/dns-query");
      url.searchParams.set("name", trimmed);
      url.searchParams.set("type", type);

      const response = await fetch(url.toString(), {
        headers: {
          accept: "application/dns-json"
        }
      });

      if (!response.ok) {
        throw new Error(`Lookup failed with status ${response.status}`);
      }

      const data = await response.json();
      const answer: DnsRecord[] = data.Answer || [];
      setRecords(answer);

      if (!answer.length) {
        setError("No records found for this query.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="tool-section">
      <h2>DNS lookup</h2>
      <p class="tool-text">
        Check DNS records for a domain using public DNS over HTTPS.
      </p>

      <div class="tool-row tool-row-inline">
        <input
          class="tool-value-input tool-value-input-inline"
          value={domain}
          onInput={(event) =>
            setDomain((event.target as HTMLInputElement).value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleLookup();
            }
          }}
          placeholder="example.com"
        />

        <select
          class="tool-select"
          value={type}
          onChange={(event) =>
            setType((event.target as HTMLSelectElement).value as any)
          }
        >
          {RECORD_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        <button
          type="button"
          class="tool-button"
          onClick={handleLookup}
          disabled={loading}
        >
          {loading ? "Looking up..." : "Lookup"}
        </button>

      </div>

      {error && <p class="tool-error">{error}</p>}

      {records.length > 0 && (
        <div class="tool-output">
          <ul class="tool-path-list">
            {records.map((record, index) => (
              <li key={`${record.name}-${record.type}-${index}`}>
                <strong>{record.name}</strong> · type {record.type} · TTL{" "}
                {record.TTL} · {record.data}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
