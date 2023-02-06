export async function migrateWorld() {
    const schemaVersion = 7;
    const worldSchemaVersion = Number(game.settings.get("rogue-trader", "worldSchemaVersion"));
    if (worldSchemaVersion !== schemaVersion && game.user.isGM) {
        ui.notifications.info("Upgrading the world, please wait...");
            for (let actor of game.actors.contents) {
                try {
                    const update = migrateActorData(actor.data);
                    if (!isObjectEmpty(update)) {
                        console.log(`Migrating ${actor.name}`)
                        await actor.update(update);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
            for (let item of game.items.contents) {
                try {
                    console.log(`Migrating ${item.name}`)
                    const update = migrateItemData(item.data);
                    if (!isObjectEmpty(update)) {
                        console.log(`Migrating ${item.name}`)
                        await item.update(update);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        game.settings.set("rogue-trader", "worldSchemaVersion", schemaVersion);
        ui.notifications.info("Upgrade complete!");
    }
};

function migrateActorData(actor) {
    const updateData = {}
    return updateData;
}


function migrateItemData(item) {
    return {}
// const updateData = {_id : item._id};
// updateData.effects = item.effects.map(migrateEffectData)
// let regex = /\*?\[(\d)\](.+?)</gm
// if (typeof item.data.potency == "string")
// {
//     let potencies = [];
//     let matches = Array.from(item.data.potency.matchAll(regex));
//     for(let match of matches)
//     {
//         let potencyObj = {}
//         potencyObj.cost = parseInt(match[1]) || 1
//         potencyObj.single = match[0].includes("*")
//         potencyObj.description = match[2].split("").filter(c => c != "*").join("").trim();
//         if (potencyObj.description.includes("+1 ED"))
//             potencyObj.property = "damage.ed.number"
//         potencies.push(potencyObj);
//     }
//     updateData["data.potency"] = potencies;
// }
    return updateData;
}

function migrateEffectData(effect)
{
    let effectData = effect.toObject()
    let description = getProperty(effectData, "flags.rogue-trader.description")
    effectData.changes.forEach((change, i) => {
        if (change.mode == 0)
        {
            change.mode = 6
            setProperty(effectData, `flags.rogue-trader.changeCondition.${i}`, {description, script:""})
        }
    })
    return effectData
}