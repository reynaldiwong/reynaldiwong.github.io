import { useState } from "preact/hooks";

function normalizeHost(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      return url.hostname;
    }
  } catch {
  }

  if (/\s/.test(trimmed)) {
    return null;
  }

  if (!trimmed.includes(".")) {
    return null;
  }

  return trimmed.replace(/\/+$/, "");
}

export default function SSLChecker() {
  const [host, setHost] = useState("");
  const [error, setError] = useState("");
  function handleOpen() {
    const normalized = normalizeHost(host);
    if (!normalized) {
      setError("Enter a valid hostname like example.com.");
      return;
    }

    setError("");
    const url =
      "https://www.ssllabs.com/ssltest/analyze.html?d=" +
      encodeURIComponent(normalized);
    window.open(url, "_blank", "noopener");
  }

  return (
    <div class="tool-section">
      <h2>SSL checker</h2>
      <p class="tool-text">
        Open an SSL Labs report for a hostname in a new tab.
      </p>

      <div class="tool-row tool-row-inline">
        <input
          class="tool-value-input tool-value-input-inline"
          value={host}
          onInput={(event) =>
            setHost((event.target as HTMLInputElement).value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleOpen();
            }
          }}
          placeholder="example.com"
        />
        <button
          type="button"
          class="tool-button"
          onClick={handleOpen}
        >
          Check
        </button>
      </div>

      {error && <p class="tool-error">{error}</p>}

      <p class="tool-note">
        Powered by ssllabs.com (Qualys SSL Labs).
      </p>
    </div>
  );
}
