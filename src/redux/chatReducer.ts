import { ChatMessageType, chatAPI, StatusType } from './../api/chat-api'
import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { Dispatch } from 'redux'
import { v4 as uuidv4 } from 'uuid'

const MESSAGES_RECIEVED = 'social-network/chat/MESSAGES_RECIEVED'
const STATUS_CHANGED = 'social-network/chat/STATUS_CHANGED'

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

type MessageType = ChatMessageType & { id: string }

const initialState = {
    messages: [] as MessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECIEVED:
            return {
                ...state,
                messages: [...state.messages,
                ...action.payload.messages
                    .map(m => ({ ...m, id: uuidv4() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECIEVED, payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED, payload: status
    } as const),
}

let _newMessageHandler: (((messages: ChatMessageType[]) => void) | null) = null
let _statusChangedHandler: (((status: StatusType) => void) | null) = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer
