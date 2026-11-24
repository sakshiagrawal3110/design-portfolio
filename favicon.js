// Set the portfolio favicon filename here. It applies to every HTML page.
const PORTFOLIO_FAVICON = "briefcase.png";

const scriptUrl = document.currentScript?.src;
if (scriptUrl) {
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = new URL(PORTFOLIO_FAVICON, scriptUrl).href;
  if (!favicon.isConnected) {
    document.head.appendChild(favicon);
  }
}
