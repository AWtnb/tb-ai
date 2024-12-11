const handleMenuClick = async (selectedText) => {
  const mod = await import("./default.js");

  const [promptData, llmUrlData] = await Promise.all([browser.storage.local.get("promptInput"), browser.storage.local.get("llmUrl")]);

  const prompt = promptData.promptInput || mod.DEFAULT_PROMPT;
  const llmUrl = llmUrlData.llmUrl || mod.DEFAULT_LLM_URL;

  await Promise.all([navigator.clipboard.writeText(prompt.replace("{}", selectedText)), browser.windows.openDefaultBrowser(llmUrl)]).catch((err) => {
    console.error(err);
  });
};

const MENU_ID = "menu-ask-ai";

messenger.menus.removeAll();
messenger.menus.create(
  {
    id: MENU_ID,
    title: "Copy with prompt and ask AI",
    contexts: ["selection"],
  },
  () => {
    if (browser.runtime.lastError) {
      console.error(browser.runtime.lastError);
    }
  }
);

messenger.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === MENU_ID) {
    handleMenuClick(info.selectionText);
  }
});
