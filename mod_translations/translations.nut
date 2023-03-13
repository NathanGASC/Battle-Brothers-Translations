this.translations <- {
	ID = "mod_translations",
	Version = "1.0.0",
	Name = "Translations",

	Dictionary = {
		en = ::new("mod_translations/translations/en.nut"),
		fr = ::new("mod_translations/translations/fr.nut"),
	}

	CurrentLanguage = null
	
	m = {
		JSHandle = null,
	}

	function connect()
	{
		this.m.JSHandle = ::UI.connect("Translations", this);
	}

	function onLanguageUpdate()
	{
		//Will have to rerender everything if possible. In case it's not possible restart the game
		//Should be possible by rewriting some .nut folders :/
	}

	function setLang(lang){
		if(!(lang in this.Dictionary)){
			//::Console.error("The language " + lang + " don't exist in ur translations. Language change stoped.")
			return
		}
		//::Console.log("Lang set to " + lang)
		this.CurrentLanguage = lang;
	}
	
	function getCurrentLang() {
		return this.CurrentLanguage;
	}

	function get(key){
		if(!(this.CurrentLanguage in this.Dictionary)){
			return "I18N LANG NOT FOUND : " + this.CurrentLanguage
		}
		if(!(key in this.Dictionary[this.CurrentLanguage])){
			return "I18N KEY NOT FOUND : " + key
		}
		return this.Dictionary[this.CurrentLanguage][key]
	}

	function getFromLang(langAndKey){
		local lang = langAndKey[0]
		local key = langAndKey[1]

		if(!(lang in this.Dictionary)){
			return "I18N LANG NOT FOUND : " + this.CurrentLanguage
		}
		if(!(key in this.Dictionary[lang])){
			return "I18N KEY NOT FOUND : " + key
		}
		return this.Dictionary[lang][key]
	}

	function getReverseFromLang(langAndValue){
		local lang = langAndValue[0]
		local value = langAndValue[1]

		if(!(lang in this.Dictionary)){
			return "I18N LANG NOT FOUND : " + lang
		}

		foreach(key,val in this.Dictionary[lang]){
			if(val == value) return key
		}
	}

	function getReverse(value){
		if(!(this.CurrentLanguage in this.Dictionary)){
			return "I18N LANG NOT FOUND : " + this.CurrentLanguage
		}

		foreach(key,val in this.Dictionary[this.CurrentLanguage]){
			if(val == value) return key
		}

		return this.Dictionary[this.CurrentLanguage][key]
	}
};