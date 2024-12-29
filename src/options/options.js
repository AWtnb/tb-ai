const DEFAULT_LLM_URL = browser.i18n.getMessage("defaultLlmUrl");
const DEFAULT_PROMPT = browser.i18n.getMessage("defaultPrompt");

const getRegisteredLlmUrl = async () => {
  const storage = await browser.storage.local.get("llmUrl");
  if (storage.llmUrl) {
    return storage.llmUrl;
  }
  return DEFAULT_LLM_URL;
};

const getRegisteredPrompt = async () => {
  const storage = await browser.storage.local.get("promptInput");
  if (storage.promptInput) {
    return storage.promptInput;
  }
  return DEFAULT_PROMPT;
};

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
  const button = document.getElementById("url-save-button");
  const target = e.target;
  if (0 < target.value.length) {
    const u = await getRegisteredLlmUrl();
    button.disabled = u == target.value;
    return;
  }
  button.disabled = true;
  document.getElementById("url-input").placeholder = DEFAULT_LLM_URL;
  registerUrl(DEFAULT_LLM_URL);
});

document.getElementById("prompt-input").addEventListener("keyup", async (e) => {
  const button = document.getElementById("prompt-save-button");
  const target = e.target;
  if (0 < target.value.length) {
    const p = await getRegisteredPrompt();
    button.disabled = p == target.value;
    return;
  }
  button.disabled = true;
  document.getElementById("prompt-input").placeholder = DEFAULT_PROMPT;
  registerPrompt(DEFAULT_PROMPT);
});

document.getElementById("url-save-button").addEventListener("click", (e) => {
  const url = document.getElementById("url-input").value;
  registerUrl(url);
  e.target.disabled = true;
});

document.getElementById("prompt-save-button").addEventListener("click", (e) => {
  const prompt = document.getElementById("prompt-input").value;
  registerPrompt(prompt);
  e.target.disabled = true;
});

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("prompt-input-label").innerText = browser.i18n.getMessage("promptInputLabel");
  document.getElementById("prompt-input-detail").insertAdjacentText("beforeend", browser.i18n.getMessage("promptInputDetail"));
  document.getElementById("url-input").value = await getRegisteredLlmUrl();
  document.getElementById("prompt-input").value = await getRegisteredPrompt();
});
