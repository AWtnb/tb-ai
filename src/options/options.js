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

const DEFAULT_LLM_URL = browser.i18n.getMessage("defaultLlmUrl");
const DEFAULT_PROMPT = browser.i18n.getMessage("defaultPrompt");

document.getElementById("url-input").addEventListener("keyup", async (e) => {
  if (0 < e.target.value.length) {
    document.getElementById("url-save-button").disabled = false;
    return;
  }
  document.getElementById("url-save-button").disabled = true;
  document.getElementById("url-input").placeholder = DEFAULT_LLM_URL;
  registerUrl(DEFAULT_LLM_URL);
});

document.getElementById("prompt-input").addEventListener("keyup", async (e) => {
  if (0 < e.target.value.length) {
    document.getElementById("prompt-save-button").disabled = false;
    return;
  }
  document.getElementById("prompt-save-button").disabled = true;
  document.getElementById("prompt-input").placeholder = DEFAULT_PROMPT;
  registerPrompt(DEFAULT_PROMPT);
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
  document.getElementById("prompt-input-label").innerText = browser.i18n.getMessage("promptInputLabel");
  document.getElementById("prompt-input-detail").insertAdjacentText("beforeend", browser.i18n.getMessage("promptInputDetail"));

  browser.storage.local.get("llmUrl").then((result) => {
    const urlInput = document.getElementById("url-input");
    if (result.llmUrl) {
      urlInput.value = result.llmUrl;
    } else {
      urlInput.value = DEFAULT_LLM_URL;
    }
  });

  browser.storage.local.get("promptInput").then((result) => {
    const promptInput = document.getElementById("prompt-input");
    if (result.promptInput) {
      promptInput.value = result.promptInput;
    } else {
      promptInput.value = DEFAULT_PROMPT;
    }
  });
});
