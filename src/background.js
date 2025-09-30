// background.js (module)
import { config } from "./modules/config/enviroment.js";

chrome.runtime.onStartup.addListener(() => {
  console.log("Start Extension");
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "hubspot_account_detected") {
    chrome.storage.local.get({ email: "" }, async (data) => {
      const { email } = await data;
      const record = {
        ...msg,
        email: email || null,
      };

      console.log(record);
      try {
        const res = await fetch(`${config.API_URL}/api/tracker`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });

        if (!res.ok) {
          console.log(`Request failed with status ${res.status}`);
          return;
        }

        const data = await res.json();
        console.log("Saved to API:", data);
        return data;
      } catch (err) {
        console.error("Error posting to API:", err);
      }
    });
  }
});