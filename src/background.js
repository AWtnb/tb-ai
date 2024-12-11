const handleButtonClick = async () => {
  const mod = await import("./default.js");

  const [promptData, llmUrlData] = await Promise.all([browser.storage.local.get("promptInput"), browser.storage.local.get("llmUrl")]);

  const prompt = promptData.promptInput || mod.DEFAULT_PROMPT;
  const llmUrl = llmUrlData.llmUrl || mod.DEFAULT_LLM_URL;

  const selectedText = await messenger.Helper.getSelectedText().catch((err) => {
    console.error("Error getting selected text:", err);
    return "";
  });

  await Promise.all([navigator.clipboard.writeText(prompt.replace("{}", selectedText)), browser.windows.openDefaultBrowser(llmUrl)]).catch((err) => {
    console.error(err);
  });
};

browser.action.onClicked.addListener(handleButtonClick);
