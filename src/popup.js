import { renderLogs } from "./modules/utils/index.js";

const list = document.getElementById("list");
const emailInput = document.getElementById("email");
const emailForm = document.getElementById("email-section");

// Load saved email
chrome.storage.local.get({ email: "" }, (data) => {
  if (data.email) {
    emailInput.value = data.email;
  }
  console.log(data.email);
});

// Save email
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;
  chrome.storage.local.set({ email }, () => {
    console.log("Email saved:", email);
    // Render accounts
    renderLogs({ currentEmail:email, node:list });
  });
});

// Render accounts
renderLogs({ node:list });