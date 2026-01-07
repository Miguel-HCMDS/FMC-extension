const sendMessage = async (message) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  chrome.tabs.sendMessage(tab.id, message);
};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateCounter") {
    document.getElementById("counter").textContent =
      `${msg.current} / ${msg.total}`;
  }
});

document.getElementById("findBtn").addEventListener("click", async () => {
  const rows = document.querySelectorAll(".row");
  const words = [];

  rows.forEach(row => {
    const checkbox = row.querySelector("input[type='checkbox']");
    const input = row.querySelector("input[type='text']");
    if (checkbox.checked && input.value.trim()) {
      words.push(input.value.trim());
    }
  });

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["finder2.js"]
    },
    () => {
      sendMessage({ action: "find", words });
    }
  );
});

document.getElementById("nextBtn").addEventListener("click", () => {
  sendMessage({ action: "next" });
});

document.getElementById("prevBtn").addEventListener("click", () => {
  sendMessage({ action: "prev" });
});