/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from './../../types/types'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow, actions } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getUsers,
    getFollowingInProgress,
    getTotalUsersCount,
    getCurrentPage,
    getPageSize,
    getUsersFilter
} from './../../redux/users-selectors'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

type PropsType = {}

type ParamsType = {
    page?: string
    count?: string
    term?: string
    friend?: string
}

const Users: React.FC<PropsType> = () => {
    const users: Array<UserType> = useSelector(getUsers)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const currentPage: number = useSelector(getCurrentPage)
    const pageSize: number = useSelector(getPageSize)
    const filter: FilterType = useSelector(getUsersFilter)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    // todo: type dispatch
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()  

    useEffect(() => {   
        const queryParams: ParamsType = {}
        if (!!filter.term) queryParams.term = filter.term
        if(filter.friend !== null) queryParams.friend = String(filter.friend)
        if (currentPage !== 1) queryParams.page = String(currentPage)

        const query = new URLSearchParams(location.search)    
        const queryPage = query.get('page')
        const queryTerm = query.get('term')
        const queryFriend = query.get('friend')
    
        let actualPage = currentPage
        if (!!queryPage) actualPage = Number(queryPage)

        let actualFilter = filter
        if (!!queryTerm) actualFilter = {...actualFilter, term: queryTerm}

        switch (queryFriend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break
            default:
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [location.search]) 

    useEffect (() => {
        const queryParams: ParamsType = {}
        if (!!filter.term) queryParams.term = filter.term
        if(filter.friend !== null) queryParams.friend = String(filter.friend)
        if (currentPage !== 1) queryParams.page = String(currentPage)
    
        const navigator =  (pathname: string, params: ParamsType ) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
        navigator("/users", queryParams)
    }, [filter, currentPage, pageSize])

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
