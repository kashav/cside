import { initDataExfiltrationDetection } from "./detect-data-exfiltration";
import { initInlineScriptInjectionDetection } from "./detect-inline-script-injection";
import { initEventListenerDetection } from "./detect-event-listeners";

initDataExfiltrationDetection();
initInlineScriptInjectionDetection();
initEventListenerDetection();
