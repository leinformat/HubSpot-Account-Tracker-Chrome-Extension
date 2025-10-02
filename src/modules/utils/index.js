import { config } from "../config/enviroment.js";

export const formatDate = timestamp => {
  const d = new Date(timestamp);
  return d.toLocaleString();
};

export const renderLogs = async({ currentEmail, node } = {}) => {
  const list = node
  list.innerHTML = "";

  try {
    // Get email from storage if not passed
    let email = currentEmail;
    if (!email) {
      const data = await new Promise(resolve => {
        chrome.storage.local.get({ email: "" }, resolve);
      });
      email = data.email;
    }

    if (!email) throw new Error("Email not set");

    // Call API
    const response = await fetch(`${config.API_URL}/api/tracker/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filter: { email },
        sort: { field: "timestamp", order: -1 },
        limit: 20,
      }),
    });

    const dataResponse = await response.json();
    const dataLogs = dataResponse.data || [];

    if (!dataLogs.length) throw new Error("No logs found");

    // Render logs
    dataLogs.forEach((acc) => {
      const article = document.createElement("article");
      article.innerHTML = `
        <header>
          Portal ID: <strong>${acc.portatId}</strong> - 
          Portal Name: <strong>${acc.portalName}</strong>
        </header> 
        <p><small>${acc.url}</small></p>
        <footer>${formatDate(acc.timestamp)}</footer>
      `;
      list.appendChild(article);
    });

  } catch (error) {
    const article = document.createElement("article");
    article.style.padding = "0";
    article.innerHTML = `
      <header style="margin-bottom:0;text-align:center;">
        <strong>${error.message}</strong>
      </header>
    `;
    list.appendChild(article);
  }
}