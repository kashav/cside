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
      recordInputElementValueRead(this, value);
      return value;
    },
    set: function (newValue) {
      originalDescriptor.set.call(this, newValue);
    },
  });
}
