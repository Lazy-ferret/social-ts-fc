import { actions } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/reduxStore'
import { ComponentType } from 'react'


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { addMessage: actions.addMessage }),
    withAuthRedirect
)(Dialogs)