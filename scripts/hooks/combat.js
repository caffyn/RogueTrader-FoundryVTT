export default function() {
    Hooks.on("updateCombat", (combat, data) => {
        if (combat.current.round == 1 && combat.current.turn == 0)
        {
            let chatData = {
                content : `<div class="rogue-trader chat"><h3>New Combat - Battlecries</h3>`
            }
            //ChatMessage.applyRollMode(chatData, "gmroll")
            let postMessage = false
            for(let combatant of combat.combatants)
            {
                let battlecries = combatant.actor.getItemTypes("ability").filter(i => i.abilityType == "battlecry")
                if (battlecries.length)
                {
                    chatData.content += `<br><b>${combatant.name}</b> - ${battlecries.map(i => i.name).join(", ")}`
                    postMessage = true;
                }
            }

            chatData.content += "</div>"
            if (postMessage)
                ChatMessage.create(chatData)
        }
    })
}