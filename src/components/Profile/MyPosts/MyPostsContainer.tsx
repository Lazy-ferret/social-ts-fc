import { actions } from '../../../redux/profileReducer'
import MyPostsMemo from './MyPosts'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/reduxStore'
import { MyPostsDispatchPropsType, MyPostsStatePropsType } from './MyPosts'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MyPostsContainer = connect<MyPostsStatePropsType, MyPostsDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostCreator
})(MyPostsMemo)

export default MyPostsContainer