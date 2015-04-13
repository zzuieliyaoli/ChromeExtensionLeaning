
// background.js用于拓展鼠标右键的功能

var urls = [];

function onClickHandler(info, tab) {

  // 鼠标右键点击link类型，出现相应菜单条
  // 点击相应菜单条则执行操作
  if (info.menuItemId == "link") {
    urls.push(info.linkUrl);
    console.log(info.linkUrl);
  }

  // 鼠标右键点击editable类型，出现相应菜单条
  // 点击相应菜单条则执行操作
  if (info.menuItemId == "editable") {
    if (urls.length == 0) {
      alert("您还未收集任何链接！");
      return false;
    }
    var urlsString = urls.join(" " + "\n");

    // 传递给content.js收集的链接
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
          contents: urlsString
        });  
    });
  }

   if (info.menuItemId == "urlsEmpty") {
    if(urls.length == 0){
      alert("您还未收集任何链接！");
    }else{
      urls = [];
      alert("收集的链接已清空！");
    }
   }
};

// 鼠标右键菜单条的点击事件处理程序
chrome.contextMenus.onClicked.addListener(onClickHandler);

// 根据contexts类型，创建鼠标右键菜单条
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "link",
    title: "收集此链接",
    contexts: ["link"],
  });

  chrome.contextMenus.create({
    id: "editable",
    title: "释放全部链接",
    contexts: ["editable"],
  });

  var page = chrome.contextMenus.create({
    id:"page",
    title: "Urls Copy Tool",
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "urlsEmpty",
    title: "清空收集的链接",
    contexts: ["page"],
    parentId:"page"
  });

});


