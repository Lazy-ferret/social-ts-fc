import React, { ComponentType } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile } from './../../redux/profileReducer'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import withRouter from '../../hoc/WithRouter'
import { AppStateType } from './../../redux/reduxStore'
import { ProfileType } from '../../types/types'

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}
type PropsType = {
    params: any
    history: any
}

class ProfileContainer extends React.Component<MapStatePropsType & MapDispatchPropsType & PropsType> {

    updateProfile() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                error={this.props.error}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                updateProfile={this.props.updateProfile}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error
})

export default compose<ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)