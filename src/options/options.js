const registerPrompt = (prompt) => {
  if (0 < String(prompt).trim().length) {
    browser.storage.local.set({ promptInput: prompt });
  }
};

const registerUrl = (url) => {
  if (0 < String(url).trim().length) {
    browser.storage.local.set({ llmUrl: url });
  }
};

document.getElementById("url-input").addEventListener("keyup", async (e) => {
  if (0 < e.target.value.length) {
    return;
  }
  document.getElementById("url-save-button").disabled = true;
  const mod = await import("../default.js");
  document.getElementById("url-input").placeholder = mod.DEFAULT_LLM_URL;
  registerUrl(mod.DEFAULT_LLM_URL);
});

document.getElementById("prompt-input").addEventListener("keyup", async (e) => {
  if (0 < e.target.value.length) {
    return;
  }
  document.getElementById("prompt-save-button").disabled = true;
  const mod = await import("../default.js");
  document.getElementById("prompt-input").placeholder = mod.DEFAULT_PROMPT;
  registerPrompt(mod.DEFAULT_PROMPT);
});

document.getElementById("url-save-button").addEventListener("click", () => {
  const url = document.getElementById("url-input").value;
  registerUrl(url);
});

document.getElementById("prompt-save-button").addEventListener("click", () => {
  const prompt = document.getElementById("prompt-input").value;
  registerPrompt(prompt);
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
