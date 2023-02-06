export default function () {
  game.settings.register("rogue-trader", "worldSchemaVersion", {
    name: "World Version",
    hint: "Used to automatically upgrade worlds data when the system is upgraded.",
    scope: "world",
    config: false,
    default: 0,
    type: Number,
  });

  game.settings.register('rogue-trader', 'initiativeRollOption', {
    name: 'I Wanna Roll!',
    hint: 'Determine Initiative by rolling as described on page 177 in the Core Rulebook',
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register('rogue-trader', 'playerCounterEdit', {
    name: 'Allow Players To Edit Glory',
    hint: 'Players will be able to change Glory counter values manually.',
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register('rogue-trader', 'glory', {
    name: 'Glory',
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
  });


  game.settings.register('rogue-trader', 'ruin', {
    name: 'Ruin',
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
  });

  game.settings.register('rogue-trader', 'counterPosition', {
    name: 'Counter Position',
    scope: 'client',
    config: false,
    default: {},
    type: Object,
  });


  game.settings.register('rogue-trader', 'bugReportName', {
    name: 'Bug Report Name',
    scope: 'world',
    config: false,
    default: "",
    type: String,
  });
}