import { ChatMessageType, chatAPI } from './../api/chat-api'
import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { Dispatch } from 'redux'

const MESSAGES_RECIEVED = 'social-network/chat/MESSAGES_RECIEVED'

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECIEVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        default:
            return state
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECIEVED, payload: messages
    } as const),
}

let _newMessageHandler: (((messages: ChatMessageType[]) => void) | null) = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer
