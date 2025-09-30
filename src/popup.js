import { formatDate } from "./modules/utils/index.js";

const emailInput = document.getElementById("email");
const emailForm = document.getElementById("email-section");

// Load saved email
chrome.storage.local.get({ email: "" }, data => {
  if (data.email) {
    emailInput.value = data.email;
  }
  console.log(data.email);
});

// Save email
emailForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;
  chrome.storage.local.set({ email }, () => {
    console.log("Email saved:", email);
  });
});

// Render accounts
/* chrome.storage.local.get({ accounts: [] }, data => {
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.accounts.forEach(acc => {
    const article = document.createElement("article");
    article.innerHTML = `
      <header>Hub ID: <strong>${acc.hubId}</strong></header>
      <p><small>${acc.url}</small></p>
      <footer>${formatDate(acc.ts)}</footer>
    `;
    list.appendChild(article);
  });
}); */