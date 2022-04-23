(function(designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var metaEl,
		metaElCon;
	var styleText,
		remStyle = document.createElement("style");
	var tid;

	function refreshRem() {
		// var width = parseInt(window.screen.width); // uc��bug
		var width = docEl.getBoundingClientRect().width;
		if (!maxWidth) {
			maxWidth = 540;
		};
		if (width > maxWidth) { // �Ա�������������540����Ļ�£�����100%�͸�10rem��һ����
			width = maxWidth;
		}
		var rem = width * 100 / designWidth;
		// var rem = width / 10; // ���Ҫ����vw�Ļ��ֳ�10�� �Ա�����
		//docEl.style.fontSize = rem + "px"; //�ɵ���������uc�������������л�������ʱ������font-size�ı�ǩ�������õ�bug
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	// ���� viewport ���еĻ��޸� û�еĻ�����
	metaEl = doc.querySelector('meta[name="viewport"]');
	// 20171219�޸ģ����� viewport-fit=cover ����������iphoneX
	metaElCon = "width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no,viewport-fit=cover";
	if(metaEl) {
		metaEl.setAttribute("content", metaElCon);
	}else{
		metaEl = doc.createElement("meta");
		metaEl.setAttribute("name", "viewport");
		metaEl.setAttribute("content", metaElCon);
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		}else{
			var wrap = doc.createElement("div");
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
			wrap = null;
		}
	}

	//Ҫ�� wiewport ���úú����ִ�� refreshRem����Ȼ refreshRem ��ִ��2�Σ�
	refreshRem();

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}

	win.addEventListener("resize", function() {
		clearTimeout(tid); //��ִֹ������
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // ��������˵�ʱ�����¼���
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(750, 750);