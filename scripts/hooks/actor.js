export default function() {
    Hooks.on("updateActor", (actor, data, options, userId) => {
        if (userId == game.user.id)
        {
            if (actor.combat.wounds.value && actor.getFlag("rogue-trader", "autoWounded"))
            {
                if (!actor.hasCondition("wounded"))
                    actor.addCondition("wounded")
            }
            else if (actor.hasCondition("wounded") && actor.getFlag("rogue-trader", "autoWounded"))
                actor.removeCondition("wounded")
    
    
            if (actor.combat.shock.value > actor.combat.shock.max && actor.getFlag("rogue-trader", "autoExhausted"))
            {
                if (!actor.hasCondition("exhausted"))
                    actor.addCondition("exhausted", {"rogue-trader.auto" : true}) // Auto flag for auto deletion
            }
            else if (actor.hasCondition("exhausted") && actor.getFlag("rogue-trader", "autoExhausted")) // If not auto added, don't auto delete
            {
                if (actor.hasCondition("exhausted").getFlag("rogue-trader", "auto"))
                    actor.removeCondition("exhausted")
            }
        }
    })
}