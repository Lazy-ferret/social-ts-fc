import React, { ReactNode } from 'react'
import { PostsType } from '../../../types/types'
import { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import AddPostForm from './AddPostForm/AddPostForm'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/reduxStore'
import { actions } from '../../../redux/profileReducer'

const MyPosts: React.FC = () => {
    
    const posts: Array<PostsType> = useSelector((state: AppStateType) => state.profilePage.posts)

    const dispatch = useDispatch()

    const postsElements: ReactNode = posts
        .reverse()
        .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id} />)

    const onAddPost = (values: AddPostFormValuesType) => {
        dispatch(actions.addPost(values.newPostText))
        values.newPostText = ''
    }

    return (
        <div className={s.posts_block}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo
