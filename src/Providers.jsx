import React from 'react'

//#region search provider
const INIT_SEARCH_STORE = {
    keyword: '',
}

export const SearchContext = React.createContext(INIT_SEARCH_STORE)

export const SearchContextComponent = props => {
    const [keyword, setKeyword] = React.useState(INIT_SEARCH_STORE)
    const value = {
        keyword,
        setKeyword,
    }
    return (
        <SearchContext.Provider value={value}>
            { props.children }
        </SearchContext.Provider>
    )
}
//#endregion

//#region phases provider
const INIT_PHASES_STORE = []

export const PhasesContext = React.createContext(INIT_PHASES_STORE)

export const PhasesContextComponent = props => {
    const [phases, setPhases] = React.useState(INIT_PHASES_STORE)
    const value = {
        phases,
        setPhases,
    }
    return (
        <PhasesContext.Provider value={value}>
            { props.children }
        </PhasesContext.Provider>
    )
}
//#endregion

//#region user provider
const INIT_USER_STORE = {
    uid: '',
    email: '',
    firstName: '',
    lastName: '',
    lastActive: 1,
}

export const UserContext = React.createContext(INIT_USER_STORE)

export const UserContextComponent = props => {
    const [user, setUser] = React.useState(INIT_USER_STORE)
    const value = {
        user,
        setUser,
    }
    return (
        <UserContext.Provider value={value}>
            { props.children }
        </UserContext.Provider>
    )
}
//#endregion