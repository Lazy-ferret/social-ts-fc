import React from 'react'
import { useSelector } from 'react-redux'
import { getIsFetching } from '../../redux/users-selectors'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}

export default UsersPage
