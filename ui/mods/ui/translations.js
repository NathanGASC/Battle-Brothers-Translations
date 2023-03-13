var Translations = function () {
	this.mSQHandle = null
	this.mID = "Translations";

	this.watchedElement = []
}

Translations.prototype.onConnection = function (_handle) {
	this.create($('.root-screen'));
	this.mSQHandle = _handle;
}

Translations.prototype.create = function (_parentDiv) {
};

Translations.prototype.get = function (key, callback) {
	SQ.call(this.mSQHandle, 'get', key, function (translation) {
		if (callback) callback(translation)
	});
};

Translations.prototype.getReverse = function (value, callback) {
	SQ.call(this.mSQHandle, 'getReverse', value, function (translation) {
		if (callback) callback(translation)
	});
};

Translations.prototype.getFromLang = function (key, lang, callback) {
	SQ.call(this.mSQHandle, 'getFromLang', [key, lang], function (translation) {
		if (callback) callback(translation)
	});
};

Translations.prototype.getReverseFromLang = function (value, lang, callback) {
	SQ.call(this.mSQHandle, 'getReverseFromLang', [lang, value], function (translation) {
		if (callback) callback(translation)
	});
};

Translations.prototype.getCurrentLang = function (callback) {
	SQ.call(this.mSQHandle, 'getCurrentLang', null, function (lang) {
		if (callback) callback(lang)
	});
};

Translations.prototype.setLang = function (lang, callback) {
	i18n.getCurrentLang(function (oldLang) {
		SQ.call(this.mSQHandle, 'setLang', lang, function () {
			if (callback) callback()
			this.onLangChange(oldLang, lang)
		}.bind(this));
	}.bind(this));
};

Translations.prototype.onLangChange = function (oldLang, newLang){
	console.log("on lang change " + oldLang + " -> " + newLang)
	this.watchedElement.forEach(function (element) {
		var text = $(element).html()
		this.getReverseFromLang(text, oldLang, function (key) {
			if(key == null || key == undefined) return;
			i18n.get(key, function (translatedText) {
				$(element).html(translatedText)
			}.bind(this))
		}.bind(this))
	}.bind(this))

}

Translations.prototype.watch = function (element) {
	this.watchedElement.push(element)
}

window.i18n = new Translations()

$(document).on('DOMNodeInserted', function(e) {
	var element = e.target
	if(hasAncestorWithId(element, "console"))return;
	
	function observe(element) {
		if(!i18n.watchedElement.includes(element)){ 
			i18n.watchedElement.push(element);
		}
		$(element).children().each(function (i,_element) {
			observe(_element)
		})
	}
	
	observe(element)
});

traverseDOM(document.body, function(element){
	if(hasAncestorWithId(element, "console"))return;
	i18n.watchedElement.push(element);
})

if (!Array.prototype.includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/) {
		'use strict';
		var O = Object(this);
		var len = parseInt(O.length) || 0;
		if (len === 0) {
		return false;
		}
		var n = parseInt(arguments[1]) || 0;
		var k;
		if (n >= 0) {
		k = n;
		} else {
		k = len + n;
		if (k < 0) {
			k = 0;
		}
		}
		var currentElement;
		while (k < len) {
		currentElement = O[k];
		if (searchElement === currentElement ||
			(searchElement !== searchElement && currentElement !== currentElement)) {
			return true;
		}
		k++;
		}
		return false;
	};
}

registerScreen("Translations", window.i18n);

function hasAncestorWithId(element, id) {
	var parent = element.parentNode;

	while (parent !== null) {
		if (parent.id === id) {
		return true;
		}
		parent = parent.parentNode;
	}

	return false;
}

function traverseDOM(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
	  traverseDOM(node, func);
	  node = node.nextSibling;
	}
  }