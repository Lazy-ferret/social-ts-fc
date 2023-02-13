/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
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
    const status = useSelector((state: AppStateType) => state.chat.status)



    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some Error occured. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [autoScroll, setAutoScroll] = useState(true)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 10) {
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <>
            <img src={message.photo} alt='user_photo' style={{ width: '30px' }} />
            <b>{message.userName}</b>
            {message.message}
            <hr />
        </>
    )
})

const AddMessageForm: React.FC = () => {
    const dispatch: any = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
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
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}

export default ChatPage