export const initializeHandlebars = () => {
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
};

function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/rogue-trader/template/actor/tab/effects.html",
    "systems/rogue-trader/template/item/tab/bonus.html",
    "systems/rogue-trader/template/item/tab/effects.html",
    "systems/rogue-trader/template/actor/tab/combat.html",
    "systems/rogue-trader/template/actor/tab/gear.html",
    "systems/rogue-trader/template/actor/tab/notes.html",
    "systems/rogue-trader/template/actor/tab/notes-threat.html",
    "systems/rogue-trader/template/actor/tab/settings.html",
    "systems/rogue-trader/template/actor/tab/stats.html",
    "systems/rogue-trader/template/actor/tab/talents.html",
    "systems/rogue-trader/template/chat/roll/base/dice-container.html",
    "systems/rogue-trader/template/chat/roll/base/base-result.html",
    "systems/rogue-trader/template/chat/roll/base/base-roll.html",
    "systems/rogue-trader/template/chat/roll/base/base-buttons.html",
    "systems/rogue-trader/template/chat/roll/common/common-result.html",
    "systems/rogue-trader/template/chat/roll/common/common-buttons.html",
    "systems/rogue-trader/template/chat/roll/corruption/corruption-result.html",
    "systems/rogue-trader/template/chat/roll/corruption/corruption-buttons.html",
    "systems/rogue-trader/template/chat/roll/power/power-result.html",
    "systems/rogue-trader/template/chat/roll/power/power-buttons.html",
    "systems/rogue-trader/template/chat/roll/resolve/resolve-result.html",
    "systems/rogue-trader/template/chat/roll/weapon/weapon-result.html",
    "systems/rogue-trader/template/chat/roll/weapon/weapon-buttons.html",
    "systems/rogue-trader/template/chat/roll/determination/determination-result.html",
    "systems/rogue-trader/template/chat/roll/stealth/stealth-result.html",
    "systems/rogue-trader/template/chat/roll/mutation/mutation-result.html",
    "systems/rogue-trader/template/chat/roll/mutation/mutation-buttons.html",
    "systems/rogue-trader/template/apps/combatant-list.html",
    //"systems/rogue-trader/template/partials/damage.html",
  ];
  return loadTemplates(templatePaths);
}

function registerHandlebarsHelpers() {
  Handlebars.registerHelper("removeMarkup", function (text) {
      const markup = /<(.*?)>/gi;
      return text.replace(markup, "");
  });

  Handlebars.registerHelper("ifIsGM", function (options) {
      return game.user.isGM ? options.fn(this) : options.inverse(this)
  })

  Handlebars.registerHelper("isGM", function (options) {
      return game.user.isGM
  })

  Handlebars.registerHelper("config", function (key) {
      return game.wng.config[key]
  })

  Handlebars.registerHelper("configLookup", function (obj, key) {
      return game.wng.config[obj][key]
  })


  Handlebars.registerHelper("enrich", function (string) {
    return  TextEditor.enrichHTML(string, {async: false})
})


  Handlebars.registerHelper("array", function (array, cls) {
    if (typeof cls == "string")
        return array.map(i => `<a class="${cls}">${i}</a>`).join(`,`)
    else
        return array.join(", ")
})
}
