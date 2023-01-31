import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileInfoPropsType } from './ProfileInfo/ProfileInfo'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile: React.FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfile, error }) => {

    return (
        <div >
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                savePhoto={savePhoto}
                updateProfile={updateProfile}
                error={error} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile 