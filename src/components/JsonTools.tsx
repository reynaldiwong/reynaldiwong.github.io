import { useState } from "preact/hooks";

type JsonValue = unknown;

function deepEqual(a: JsonValue, b: JsonValue): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function findPaths(root: JsonValue, target: JsonValue): string[] {
  const paths: string[] = [];

  function visit(node: JsonValue, path: string) {
    if (deepEqual(node, target)) {
      paths.push(path || "$");
    }

    if (node && typeof node === "object") {
      if (Array.isArray(node)) {
        node.forEach((item, index) => {
          const nextPath = path === "$" ? `$[${index}]` : `${path}[${index}]`;
          visit(item, nextPath);
        });
      } else {
        Object.entries(node).forEach(([key, value]) => {
          const nextPath = path === "$" ? `$.${key}` : `${path}.${key}`;
          visit(value, nextPath);
        });
      }
    }
  }

  visit(root, "$");
  return paths;
}

function parseSearchValue(raw: string): JsonValue {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

export default function JsonTools() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [validation, setValidation] = useState<"idle" | "valid" | "invalid">(
    "idle"
  );
  const [showNotes, setShowNotes] = useState(false);

  function handleFormat() {
    try {
      const value = JSON.parse(input);
      const pretty = JSON.stringify(value, null, 2);
      setFormatted(pretty);
      setError("");
      setPaths([]);
      setValidation("valid");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setFormatted("");
      setPaths([]);
      setValidation("invalid");
    }
  }

  function handleFindPaths() {
    try {
      const value = JSON.parse(input);
      const target = parseSearchValue(search);
      const matches = findPaths(value, target);
      setPaths(matches);
      setError("");
      if (!formatted) {
        const pretty = JSON.stringify(value, null, 2);
        setFormatted(pretty);
      }
      setValidation("valid");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setPaths([]);
      setValidation("invalid");
    }
  }

  async function handleCopy() {
    if (!formatted) {
      return;
    }
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div class="tool">
      <div class="tool-section">
        <div class="tool-section-header">
          <div class="tool-section-header-main">
            <h2>JSON formatter and validator</h2>
            <p class="tool-text">
              Paste JSON, then format and validate it before searching for
              values.
            </p>
          </div>
          <button
            type="button"
            class="tool-button tool-button-ghost"
            onClick={() => setShowNotes(true)}
          >
            Read Me
          </button>
        </div>
        <textarea
          class="tool-input"
          value={input}
          onInput={(event) => setInput((event.target as HTMLTextAreaElement).value)}
          placeholder='{"example": ["value", 1, true]}'
        />
        <button type="button" class="tool-button" onClick={handleFormat}>
          Format and validate
        </button>
        {validation === "valid" && !error && (
          <p class="tool-status tool-status-valid pt-3">JSON is valid ✔</p>
        )}
        {validation === "invalid" && error && (
          <p class="tool-status tool-status-invalid pt-3">
            JSON is invalid: {error}
          </p>
        )}
        {formatted && !error && (
          <div class="tool-output">
            <div class="tool-output-header">
              <button
                type="button"
                class="tool-button tool-button-small"
                onClick={handleCopy}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre>{formatted}</pre>
          </div>
        )}
      </div>

      <div class="tool-section">
        <h2>Find JSON paths for a value</h2>
        <p class="tool-text">
          Enter a value to search for. You can type raw text or a JSON value
          such as 1, true, or "text".
        </p>
        <div class="tool-row tool-row-inline">
          <input
            class="tool-value-input tool-value-input-inline"
            value={search}
            onInput={(event) =>
              setSearch((event.target as HTMLInputElement).value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleFindPaths();
              }
            }}
            placeholder='Example: "value" or 1 or true'
          />
          <button type="button" class="tool-button" onClick={handleFindPaths}>
            Find paths
          </button>
        </div>
        {paths.length > 0 && (
          <div class="tool-output">
            <ul class="tool-path-list">
              {paths.map((path) => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </div>
        )}
        {!error && paths.length === 0 && search.trim() && (
          <p class="tool-text">No matching values found in the current JSON.</p>
        )}
      </div>

      {showNotes && (
        <div class="tool-dialog-backdrop" onClick={() => setShowNotes(false)}>
          <div
            class="tool-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 class="tool-dialog-title">JSON security</h3>
            <p class="tool-text">
              This formatter runs entirely in your browser. Your JSON is not
              sent to any server or third-party API, and all parsing happens
              locally on your device.
            </p>
            <br />
            <p class="tool-text">
              Even so, It's highly recommended to avoid pasting secrets or sensitive data here.
            </p>
            <div class="tool-dialog-actions">
              <button
                type="button"
                class="tool-button"
                onClick={() => setShowNotes(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
