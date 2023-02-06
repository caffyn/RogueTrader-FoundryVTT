
export class WrathAndGloryCombat extends Combat {
    async _preCreate(data, options, user) {
        super._preCreate(data, options, user)
        this.updateSource({"turn" : null})
    }
    async startCombat() {
        return this.update({round: 1}); // Don't update turn, that must be chosen
    }

    async setTurn(combatantId) 
    {
        let newTurn = this.turns.findIndex(c => c.id == combatantId)
        let newActiveCombatant = this.combatants.get(combatantId)

        let combatants = []
        if (this.combatant)
            combatants.push(this.combatant.setComplete())
        
        combatants.push(newActiveCombatant.setCurrent())
        // Update new turn, and combatant flags in one update
        await this.update({turn: newTurn, combatants})
    }

    async nextRound() {
        let advanceTime = Math.max(this.turns.length - (this.turn || 0), 0) * CONFIG.time.turnTime;
        advanceTime += CONFIG.time.roundTime;
        let combatants = this.combatants.map(c => c.setPending())
        return this.update({round: this.round + 1, turn : null, combatants}, {advanceTime});
      }
}



export class WrathAndGloryCombatant extends Combatant {

    async _preCreate(data, options, user) {
        super._preCreate(data, options, user)

        if (this.isDefeated)
        {
            this.updateSource({"defeated" : true})
        }
        // "pending" , "complete", "current"
        this.updateSource({"flags.rogue-trader.combatStatus" : "pending", "turn" : null})
    }



    get isCurrent() 
    {
        return this.getFlag("rogue-trader", "combatStatus") == "current" && !this.isDefeated
    }

    get isPending()
    {
        return this.getFlag("rogue-trader", "combatStatus") == "pending" && !this.isDefeated
    }

    get isComplete()
    {
        return this.getFlag("rogue-trader", "combatStatus") == "complete" && !this.isDefeated
    }

    
    setCurrent() 
    {
        let data = this.toObject()
        setProperty(data, "flags.rogue-trader.combatStatus", "current")
        return data
    }

    setPending()
    {
        let data = this.toObject()
        setProperty(data, "flags.rogue-trader.combatStatus", "pending")
        return data
    }

    setComplete()
    {
        let data = this.toObject()
        setProperty(data, "flags.rogue-trader.combatStatus", "complete")
        data.active = false;
        return data
    }


}