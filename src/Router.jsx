import React from 'react'
import { Router } from '@reach/router'

import { UserContext } from './Providers'
import { SigninPage, SearchPage } from './Pages'

export const RouterComponent = props => {
    const userContext = React.useContext(UserContext)
    if (userContext.user.email === '') {
        return (
            <Router>
                <SigninPage path='/' />
            </Router>
        )
    }

    return (
        <Router>
            <SearchPage path='/' />
        </Router>
    )
}
