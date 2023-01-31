import React from 'react'
import { useSelector } from 'react-redux'
// @ts-ignore
import { getIsFetching } from '../../redux/users-selectors.ts'
// @ts-ignore
import Users from './Users.tsx'
// @ts-ignore
import Preloader from '../common/Preloader/Preloader.tsx'

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
