document.getElementById("url-save-button").addEventListener("click", function () {
  const url = document.getElementById("url-input").value;
  if (0 < String(url).trim().length) {
    browser.storage.local.set({ llmUrl: url });
  }
});

document.getElementById("prompt-save-button").addEventListener("click", function () {
  const prompt = document.getElementById("prompt-input").value;
  if (0 < String(prompt).trim().length) {
    browser.storage.local.set({ promptInput: prompt });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const mod = await import("../default.js");

  browser.storage.local.get("llmUrl").then((result) => {
    const urlInput = document.getElementById("url-input");
    if (result.llmUrl) {
      urlInput.value = result.llmUrl;
    } else {
      urlInput.value = mod.DEFAULT_LLM_URL;
    }
  });

  browser.storage.local.get("promptInput").then((result) => {
    const promptInput = document.getElementById("prompt-input");
    if (result.promptInput) {
      promptInput.value = result.promptInput;
    } else {
      promptInput.value = mod.DEFAULT_PROMPT;
    }
  });
});
