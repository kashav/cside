function recursivelySearchChildNodesForScriptNode(node, foundScriptCallback) {
  if (node.nodeName === "SCRIPT") {
    foundScriptCallback(node);
  } else if (node.childNodes !== null) {
    node.childNodes.forEach((childNode) => {
      recursivelySearchChildNodesForScriptNode(childNode, foundScriptCallback);
    });
  }
}

export function observeNewScriptNodesInDocument(foundScriptNodeCallback) {
  const target = document.documentElement || document.body;

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        recursivelySearchChildNodesForScriptNode(node, foundScriptNodeCallback);
      });
    });
  });

  observer.observe(target, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  window.addEventListener("beforeunload", () => {
    observer.disconnect();
  });
}
