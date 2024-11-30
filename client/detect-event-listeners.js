function recordEventListenerAdded(element, eventType) {
  console.table({
    type: "DETECTED_NEW_EVENT_LISTENER",
    element: element.outerHTML,
    eventType,
  });
}

// Detect when javascript adds an event listener to a DOM item.
export function initEventListenerDetection() {
  const originalAddEventListener = Element.prototype.addEventListener;

  Element.prototype.addEventListener = function (
    type,
    listener,
    useCapture = false,
  ) {
    recordEventListenerAdded(this, type);
    originalAddEventListener.call(this, type, listener, useCapture);
  };
}
