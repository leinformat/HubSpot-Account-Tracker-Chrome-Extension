// contentScript.js
function getHubIdFromUrl(url = location.href) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const hubIdCandidate = parts[1];

      if (/^\d+$/.test(hubIdCandidate)) {
        let portalName = '';
        const accountBtn = document.querySelector("#hs-global-toolbar-accounts > span");
        if(accountBtn) portalName = accountBtn.textContent.trim();

        return { portalId:hubIdCandidate,portalName };
      }
    }
    throw new Error("Invalid URL");
  } catch (e) {
    console.log("Invalid URL", e);
    return { portalId:'',portalName:'' };
  }
}

function detectHubId() {
  window.addEventListener("load", (e) => {
    setTimeout(() => {
      const { portalId, portalName } = getHubIdFromUrl();
      if (portalId) {
        chrome.runtime.sendMessage({
          type: "hubspot_account_detected",
          portalId,
          portalName,
          url: location.href,
          timestamp: Date.now(),
          eventDate: new Date().toLocaleString(),
        });
      }
    }, 2000);
  });
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