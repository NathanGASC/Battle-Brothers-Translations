::Translations <- ::new("mod_translations/translations.nut");

::mods_registerJS("ui/translations.js");
::mods_registerCSS("ui/css/translations.css");

::mods_registerMod(::Translations.ID, ::Translations.Version "Translate the game in your language");
::mods_queue(::Translations.ID, ::MSU.ID + ",>" + ::Console.ID , function()
{        
    ::mods_hookExactClass("ui/screens/menu/modules/main_menu_module", function(o)
    {
        local connectBackend = o.connectBackend;
        o.connectBackend <- function()
        {
            connectBackend()
            ::Console.log("Translations SQ connecting to Translations JS")
            ::Translations.connect();
            ::Console.log("Translations SQ connected to Translations JS")

            ::Translations.setLang("en")
        }
    });
});