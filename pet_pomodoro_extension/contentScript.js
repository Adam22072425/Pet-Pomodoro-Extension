const floatingButton = document.createElement("div");
floatingButton.id = "floatingButton";
floatingButton.innerHTML = `
  <img src="${chrome.runtime.getURL("images/cat-icon.png")}" alt="Cat Icon" style="width: 50px; height: 50px; cursor: pointer;">
`;
document.body.appendChild(floatingButton);

const style = document.createElement("style");
style.textContent = `
  #floatingButton {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    border-radius: 50%;
  }
`;
document.head.appendChild(style);

floatingButton.addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("popup.html");
  iframe.style.position = "fixed";
  iframe.style.bottom = "80px";
  iframe.style.right = "20px";
  iframe.style.width = "320px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";
  iframe.style.zIndex = "1001";

  document.body.appendChild(iframe);

  window.addEventListener("click", (e) => {
    if (!iframe.contains(e.target) && e.target !== floatingButton) {
      iframe.remove();
    }
  });
});
