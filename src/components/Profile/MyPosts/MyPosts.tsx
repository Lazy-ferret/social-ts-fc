import React from 'react'
import { PostsType } from '../../../types/types'
import { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import AddPostForm from './AddPostForm/AddPostForm'
import s from './MyPosts.module.css'
import Post from './Post/Post'

export type MyPostsStatePropsType = {
    posts: Array<PostsType>
}
export type MyPostsDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostsStatePropsType & MyPostsDispatchPropsType> = (props) => {
    const postsElements = [...props.posts]
        .reverse()
        .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id} />)

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
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
