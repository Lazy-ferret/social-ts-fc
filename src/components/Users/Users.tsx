/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
// @ts-ignore
import Paginator from '../common/Paginator/Paginator.tsx'
// @ts-ignore
import User from './User.tsx'
import { UserType } from './../../types/types'
// @ts-ignore
import UsersSearchForm from './UsersSearchForm.tsx'
// @ts-ignore
import { FilterType, requestUsers, follow, unfollow, actions } from '../../redux/usersReducer.ts'
import { useDispatch, useSelector } from 'react-redux'
import {
    getUsers,
    getFollowingInProgress,
    getTotalUsersCount,
    getCurrentPage,
    getPageSize,
    getUsersFilter
    // @ts-ignore
} from './../../redux/users-selectors.ts'

type PropsType = {}

const Users: React.FC<PropsType> = () => {
    const users: Array<UserType> = useSelector(getUsers)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const currentPage: number = useSelector(getCurrentPage)
    const pageSize: number = useSelector(getPageSize)
    const filter: FilterType = useSelector(getUsersFilter)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(actions.deleteUsers())
        }
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <div>
                {
                    users.map(user => <User user={user}
                        followingInProgress={followingInProgress}
                        unfollow={unfollowUser}
                        follow={followUser}
                        key={user.id} />)
                }
            </div>
        </div>
    )
}

export default Users