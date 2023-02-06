import { Level4TextPageSheet } from "../apps/journal-sheet"

export default function () {
  Hooks.on("init", () => {

    game.counter = new game.wng.RuinGloryCounter()

    game.socket.on("system.rogue-trader", async data => {
      if (data.type == "setCounter" && game.user.isGM) {
        game.settings.set("rogue-trader", data.payload.type, data.payload.value)
      }
    })

    Level4TextPageSheet._removeNoTOC();
  })


}