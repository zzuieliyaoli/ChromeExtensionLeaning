chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.contents) {
  	document.activeElement.value = msg.contents;
    alert("释放成功！");  
  }
});