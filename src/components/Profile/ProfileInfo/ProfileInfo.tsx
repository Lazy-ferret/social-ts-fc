import React, { ChangeEvent, useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import styles from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import userPhoto from './../../../assets/images/user.jpg'
import ProfileDataForm from './ProfileDataForm'
import ProfileData from './ProfileData'
import { ProfileType } from '../../../types/types'

export type ProfileInfoPropsType = {
    profile: ProfileType | null
    savePhoto: (file: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    updateProfile: (profile: ProfileType) => Promise<any>
    error: string | null
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ profile, savePhoto, isOwner, status, updateStatus, updateProfile, error }) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const saveFormData = (formData: ProfileType) => {
        updateProfile(formData)
            .then(() => setEditMode(false))
    }

    return (
        <div >
            <div >
                <img className={styles.profilePhoro} src={profile.photos.large || userPhoto} alt='profile_photo' />
                {isOwner && <input type='file' onChange={onMainPhotoChanged} />}
                {editMode
                    ? <ProfileDataForm
                        profile={profile}
                        // @ts-ignore
                        saveFormData={saveFormData}
                        error={error} />
                    : <ProfileData profile={profile}
                        isOwner={isOwner}
                        toEditMode={() => setEditMode(true)} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo