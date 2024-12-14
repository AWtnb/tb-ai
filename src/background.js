/*
https://developer.thunderbird.net/add-ons/hello-world-add-on

https://webextension-api.thunderbird.net/en/128-esr-mv3/index.html

https://github.com/thunderbird/webext-examples/

https://github.com/itagagaki/DeepL-Selected-Text/
*/

const handleMenuClick = async (selectedText) => {
  const [promptData, llmUrlData] = await Promise.all([browser.storage.local.get("promptInput"), browser.storage.local.get("llmUrl")]);

  const prompt = promptData.promptInput || browser.i18n.getMessage("defaultPrompt");
  const llmUrl = llmUrlData.llmUrl || browser.i18n.getMessage("defaultLlmUrl");

  await Promise.all([navigator.clipboard.writeText(prompt.replace("{}", selectedText)), browser.windows.openDefaultBrowser(llmUrl)]).catch((err) => {
    console.error(err);
  });
};

const MENU_ID = "menu-ask-ai";

messenger.menus.removeAll();
messenger.menus.create(
  {
    id: MENU_ID,
    title: browser.i18n.getMessage("contextMenuTitle"),
    contexts: ["selection"],
  },
  () => {
    if (browser.runtime.lastError) {
      console.error(browser.runtime.lastError);
    }
  }
);

messenger.menus.onClicked.addListener(async (info, _) => {
  if (info.menuItemId === MENU_ID) {
    handleMenuClick(info.selectionText);
  }
});
