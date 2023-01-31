import React from 'react'
import { connect } from 'react-redux'
import { logout } from './../../redux/authReducer'
import { AppStateType } from './../../redux/reduxStore'
import Header, { HeaderDispatchPropsType, HeaderStatePropsType } from './Header'

class HeaderContainer extends React.Component<HeaderDispatchPropsType & HeaderStatePropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<HeaderStatePropsType, HeaderDispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer)