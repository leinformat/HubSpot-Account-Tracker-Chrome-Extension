// contentScript.js
function getHubIdFromUrl(url = location.href) {
  try {
    let portalName = '';
    const accountBtn = document.querySelector("#hs-global-toolbar-accounts > span");
    if(accountBtn) portalName = accountBtn.textContent.trim();

    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const hubIdCandidate = parts[1];
      if (/^\d+$/.test(hubIdCandidate)) {
        return { portatId:hubIdCandidate,portalName };
      }
    }
  } catch (e) {
    console.error("Invalid URL", e);
  }
  return null;
}

function detectHubId() {
  const {portatId,portalName} = getHubIdFromUrl();
  if (portatId) {
    chrome.runtime.sendMessage({
      type: "hubspot_account_detected",
      portatId,
      portalName,
      url: location.href,
      timestamp: Date.now()
    });
  }
}

detectHubId();

(function patchHistory() {
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(this, arguments);
    setTimeout(detectHubId, 100);
  };
  window.addEventListener("popstate", () => setTimeout(detectHubId, 100));
})();