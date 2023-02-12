import React, { useEffect, useState } from 'react'

type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

const ChatPage: React.FC = () => {
    return (
        <>
            <div>
                Chat
            </div>
            <Chat />
        </>

    )
}

const Chat: React.FC = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    const sendMessageHandler = (e: MessageEvent) => {
        let newMessages = JSON.parse(e.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    useEffect(() => {
        wsChannel?.addEventListener('message', sendMessageHandler)

        return () => {
            wsChannel?.removeEventListener('message', sendMessageHandler)
        }
    }, [wsChannel])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

    return (
        <>
            <img src={message.photo} alt='user_photo' style={{ width: '30px' }} />
            <b>{message.userName}</b>
            {message.message}
            <hr />
        </>
    )
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [readyState, setReadyState] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyState('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyState !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default ChatPage