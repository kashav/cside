# security-detection-methods

Build a 3rd party client-side script that does the following:

1. Detect any data exfiltration attempts to common sensitive fields such as credit card input fields, login credentials,
1. Detects and reports inline-script injection. Also upload the content to an endpoint via a beacon.
1. Detect when javascript adds an event listener to a DOM item.
1. Differentiate a client-side script injected by a browser extension from a script that was loaded as a result of the server side code.

### To test:

Run `npm run build-dev` and open `test/index.html` in your browser.