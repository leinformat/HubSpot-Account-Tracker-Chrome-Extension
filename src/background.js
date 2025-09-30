// background.js (module)
chrome.runtime.onStartup.addListener(() => {
  console.log("Start Extension");
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "hubspot_account_detected") {
    chrome.storage.local.get({ email: "" }, async (data) => {
      const record = {
        ...msg,
        email: data.email || null,
      };

      try {
        const res = await fetch("http://localhost:4000/api/tracker", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
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