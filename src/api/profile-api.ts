// @ts-ignore
import { instance } from "./api.ts"
import { PhotosType, ProfileType } from "../types/types"
import { APIResponseType } from "./api"

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance
            .get<ProfileType>(`profile/${userId}`)
            .then((response: { data: any }) => response.data)
    },
    getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`).then((response: { data: any }) => response.data)
    },
    updateStatus(status: string) {
        return instance
            .put<APIResponseType>(`profile/status`, { status: status }).then((response: { data: any }) => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance
            .put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response: { data: any }) => response.data)
    },
    updateProfile(profile: ProfileType) {
        return instance
            .put(`profile`, profile).then((response: { data: any }) => response.data)
    }
}