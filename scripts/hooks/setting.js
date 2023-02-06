export default function () {
  Hooks.on("updateSetting", (setting) => {
    if(setting.key == "rogue-trader.glory" || setting.key == "rogue-trader.ruin")
    {
      game.counter.render(true)
    }
  })
}