import React, { useEffect, useState } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

    return (
        <>
            <img src={message.photo} alt='user_photo' style={{width: '30px'}} />
            <b>{message.userName}</b>
            {message.message}
            <hr />
        </>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    
    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default ChatPage