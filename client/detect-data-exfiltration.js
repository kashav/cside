function recordInputElementValueRead(inputElement, value) {
  console.table({
    type: "DETECTED_DATA_EXFILTRATION",
    element: inputElement.outerHTML,
    elementValue: value,
  });
}

// Detect any data exfiltration attempts to common sensitive fields such as
// credit card input fields, login credentials,
export function initDataExfiltrationDetection() {
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  );

  Object.defineProperty(HTMLInputElement.prototype, "value", {
    get: function () {
      const value = originalDescriptor.get.call(this);
      // We can also inspect the input field and decide if this is a
      // sensitive field based on various heuristics.
      recordInputElementValueRead(this, value);
      return value;
    },
    set: function (newValue) {
      originalDescriptor.set.call(this, newValue);
    },
  });
}
