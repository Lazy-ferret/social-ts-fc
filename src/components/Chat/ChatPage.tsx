/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppStateType } from '../../redux/reduxStore'

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
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

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

const AddMessageForm: React.FC = () => {
    const dispatch: any = useDispatch()
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}

export default ChatPage