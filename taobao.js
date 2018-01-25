var doing = true;
var run = false;
var step = 0;
var content = '';

var fso = new ActiveXObject("Scripting.FileSystemObject");
var ie = WScript.createObject('InternetExplorer.Application', 'ie_');

function ie_NavigateComplete2(pDisp, URL) {
	if (URL.indexOf('https://s.taobao.com') === 0)
		run = true;
}

var ie_OnQuit = function() {
	doing = false;
}

ie.visible = true;
ie.navigate('about:blank');

while (doing) {
	
	WScript.sleep(100);
	
	if (run && ie.document.body && ie.document.body.innerHTML) {

		var reg = /info__itemanchor\".+?>(.*?)</g;
		var found = false;
		var result;
		
		while ((result = reg.exec(ie.document.body.innerHTML)) !== null) {
			if (content.indexOf(result[1]) < 0)
				content += result[1] + ',';
			found = true;
		}
		if (found) {
			var file = fso.OpenTextFile("taobao.txt", 2, true);
			file.writeLine(content.replace(/,/g, "\r\n"));
			file.close();
			if (step === 0) {
				ie.document.parentWindow.eval("location.href += '&s=60'");
				step++;
			} else {
				step = 0;
				content = '';
			}
			run = false;
		}
		if (ie.document.body.innerHTML.indexOf('item-not-found') > 0) {
			run = false;
		}
	}
}
/*
https://msdn.microsoft.com/en-us/library/aa752084
https://s.taobao.com/search?spm=a230r.1.14.362.588f3da2x1sTn0&type=samestyle&app=i2i&rec_type=1&uniqpid=-720741305&nid=558331379555
https://s.taobao.com/search?spm=a230r.1.14.362.588f3da2x1sTn0&type=samestyle&app=i2i&rec_type=1&uniqpid=-720741305&nid=558331379555&s=60
*/