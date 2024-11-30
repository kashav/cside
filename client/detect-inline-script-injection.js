import { observeNewScriptNodesInDocument } from "./utils";

const LOG_URL = "https://kashav.ca/cside/injected-scripts";

// Detects and reports inline-script injection. Also upload the content to an
// endpoint via a beacon.
export function initInlineScriptInjectionDetection() {
  observeNewScriptNodesInDocument(async (scriptNode) => {
    let scriptContent = null;
    let src = null;
    let isExtensionScript = false;
    let isInlineScript = false;

    const srcAttr = scriptNode.attributes.getNamedItem("src");
    if (srcAttr) {
      src = srcAttr.value;

      // Fetch the content of the remote script.
      const response = await fetch(src);
      scriptContent = await response.text();

      // Differentiate a client-side script injected by a browser extension from
      // a script that was loaded as a result of the server side code.
      isExtensionScript = !!src.match(/(chrome-extension|moz-extension)\:\/\//);
    } else if (scriptNode.childNodes?.[0]?.data) {
      scriptContent = scriptNode.childNodes[0].data;
      isInlineScript = true;
    }

    // Upload the script content.
    if (scriptContent) {
      console.table({
        type: "DETECTED_SCRIPT_INJECTION",
        src,
        isInlineScript,
        isExtensionScript,
        scriptContent,
      });

      const payload = JSON.stringify({
        src: src || "inline_script",
        script: scriptContent,
      });
      const blob = new Blob([payload], { type: "application/json" });

      try {
        navigator.sendBeacon(LOG_URL, blob);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
