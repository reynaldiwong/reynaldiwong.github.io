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
            <h2>JSON Formatter & Validator</h2>
            <p class="tool-text">
              Format messy JSON, validate syntax, and explore data structures.
            </p>
          </div>
          <button
            type="button"
            class="tool-button tool-button-ghost"
            onClick={() => setShowNotes(true)}
          >
            Privacy & Tips
          </button>
        </div>
        <textarea
          class="tool-input"
          value={input}
          onInput={(event) => setInput((event.target as HTMLTextAreaElement).value)}
          placeholder='{
  "project": "Rey Website",
  "status": "active",
  "features": ["tools", "blog"],
  "meta": {
    "author": "Reynaldiwong",
    "year": 2025
  }
}'
        />
        <div class="tool-row" style="justify-content: flex-end;">
          <button type="button" class="tool-button" onClick={handleFormat}>
            Format JSON
          </button>
        </div>
        {validation === "valid" && !error && (
          <p class="tool-status tool-status-valid pt-3">Valid JSON ✔</p>
        )}
        {validation === "invalid" && error && (
          <p class="tool-status tool-status-invalid pt-3">
            Invalid JSON: {error}
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
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre>{formatted}</pre>
          </div>
        )}
      </div>

      <div class="tool-section">
        <h2>JSON Path Finder</h2>
        <p class="tool-text">
          Search for keys or values to generate their JSON paths.
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
            placeholder='e.g. "value", 123, or true'
          />
          <button type="button" class="tool-button" onClick={handleFindPaths}>
            Find Paths
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
          <p class="tool-text">No matches found.</p>
        )}
      </div>

      {showNotes && (
        <div class="tool-dialog-backdrop" onClick={() => setShowNotes(false)}>
          <div
            class="tool-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 class="tool-dialog-title">Privacy & Usage</h3>
            <p class="tool-text">
              <strong>100% Client-Side:</strong> Your data never leaves your browser. All processing happens locally on your device.
            </p>
            <br />
            <p class="tool-text">
              While safe, it's best practice not to paste sensitive tokens or production secrets into any browser tool.
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
