
type SubsciberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

let subscribers = [] as SubsciberType[]
let ws: WebSocket | null = null

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', sendMessageHandler)
}

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const sendMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', sendMessageHandler)
        ws?.close()
    },
    subscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

