import WNGChat from "../common/chat.js"

export default function() {
    Hooks.once("renderChatLog", (chat, html) => {
        WNGChat.chatListeners(html)
    })

    Hooks.on("renderChatMessage", (message, html) => {
        let item = html.find(".rogue-trader.chat.item")
        if (item.length)
        {
            item.attr("draggable", true)
            item[0].addEventListener("dragstart", ev => {
                ev.dataTransfer.setData("text/plain", JSON.stringify({type : "itemFromChat", payload : message.getFlag("rogue-trader", "itemData")}))
            })
        }

    })
}