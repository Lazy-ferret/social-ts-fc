
type MessagesReceivedSubsciberType = (messages: ChatMessageType[]) => void
type StatusChangedSubsciberType = (status: StatusType) => void

export type StatusType = 'pending' | 'ready' | 'error'
type EventNameType = 'messages-received' | 'status-changed'

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

let subscribers = {
    'messages-received': [] as MessagesReceivedSubsciberType[],
    'status-changed': [] as StatusChangedSubsciberType[]
}

let ws: WebSocket | null = null

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', sendMessageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribeersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribeersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', sendMessageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const openHandler = () => {
    notifySubscribeersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribeersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const closeHandler = () => {
    notifySubscribeersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const sendMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNameType, callback: MessagesReceivedSubsciberType | StatusChangedSubsciberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNameType, callback: MessagesReceivedSubsciberType | StatusChangedSubsciberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

