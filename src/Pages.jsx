import React from 'react'

import { auth, firestore } from './firebase'
import { UserContext, PhasesContext } from './Providers'
import { LoadingComponent, PhaseCard } from './Components'

export const SearchPage = props => {
    const phasesContext = React.useContext(PhasesContext)
    const userContext = React.useContext(UserContext)
    const [keyword, setKeyword] = React.useState('')
    const keywordInput = React.useRef(null)
    const [engPhase, setEngPhase] = React.useState('')
    const [phases, setPhases] = React.useState([])
    const [isSearching, setIsSearching] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    async function signout(event) {
        event.preventDefault()
        await auth().signOut()
        window.location = '/'
    }

    async function addSearchKeyword(event) {
        setIsLoading(true)
        event.preventDefault()
        const db = firestore()
        await db.collection('phases').add({
            th: keyword,
            en: engPhase,
        })
        await getAllPhases()
        setEngPhase('')
        setKeyword('')
        setIsLoading(false)
    }

    function handleSearchKeyword(event) {
        event.preventDefault()
        setKeyword(event.target.value)
    }

    function handleAddPhase(event) {
        setEngPhase(event.target.value)
        setIsSearching(false)
    }

    async function handleDeletePhase(event) {
        setIsLoading(true)
        event.preventDefault()
        const db = firestore()
        await db.collection('phases').doc(event.target.name).delete()
        await getAllPhases()
    }

    function submitSearchValue(event) {
        event.preventDefault()
        const filterPhases = phases.filter(phase => {
            return phase.th.includes(keyword)
        })
        setPhases(filterPhases)
        setIsSearching(true)
    }

    function resetSearchValue() {
        setPhases(phasesContext.phases)
        setKeyword('')
        keywordInput.current.value = ''
        setIsSearching(false)
    }

    async function getAllPhases() {
        setIsLoading(true)
        let documents = []
        const db = firestore()
        const query = await db.collection('phases').get()
        query.forEach(document => {
            documents.push({
                uid: document.id,
                ...document.data()
            })
        })
        phasesContext.setPhases(documents)
        setPhases(documents)
        setIsLoading(false)
        setIsSearching(false)
    }

    React.useEffect(() => {
        if (phasesContext.phases.length === 0) {
            getAllPhases()
        } else {
            setPhases(phasesContext.phases)
        }

        return () => { }
    }, [])

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8' >
            <div className="max-w-md flex flex-row items-center justify-between w-full my-5">
                <p>Welcome, {userContext.user.email}</p>
                <button className='px-3 py-2 bg-gray-400 rounded-md text-white font-bold' onClick={signout}>Sign Out</button>
            </div>
            <div className="max-w-md flex flex-row items-center justify-between w-full">
                <input
                    type="text"
                    placeholder='Search'
                    className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleSearchKeyword}
                    ref={keywordInput}
                />
                <button className='px-3 py-2 bg-blue-400 rounded-md text-white font-bold' onClick={submitSearchValue}>Search</button>
                <button className='px-3 py-2 bg-red-400 rounded-md text-white font-bold' onClick={resetSearchValue}>Reset</button>
                <button className='px-3 py-2 bg-yellow-400 rounded-md text-white font-bold' onClick={getAllPhases}>Refresh</button>
            </div>
            <div className='max-w-md flex flex-row items-center justify-between w-full'>
                {
                    keyword !== '' &&
                    <React.Fragment>
                        <div className='my-5'>Add new word</div>
                        <div className='my-5 max-w-md flex flex-row items-center justify-between w-full'>
                            <p><span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs text-white font-bold mr-3">{keyword}</span></p>
                            <input type="text" placeholder='English phase' className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleAddPhase} />
                            <button className='px-3 py-2 bg-green-400 rounded-md text-white font-bold' onClick={addSearchKeyword}>Add</button>
                        </div>
                    </React.Fragment>
                }
            </div>
            {
                isLoading && (
                    <div className="max-w-md w-full flex flex-col">
                        <div className='self-center mt-5'><LoadingComponent /></div>
                    </div>
                )
            }
            {
                isSearching ? (
                    <div className="max-w-md w-full flex flex-col">
                        {
                            phases.map(phase => {
                                return <PhaseCard key={phase.uid} {...phase} onDelete={handleDeletePhase} />
                            })
                        }
                    </div>
                ) :
                (
                    <p>Please search something</p>
                )
            }
        </div>
    )
}

export const SigninPage = props => {
    const userContext = React.useContext(UserContext)
    const INIT_STATUS = {
        title: '',
        subTitle: '',
    }
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [status, setStatus] = React.useState(INIT_STATUS)
    const HeroImage = React.useMemo(() => {
        return (
            <svg width="102.5" height="101" viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)" />
                <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)" />
                <defs>
                    <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#41D1FF" />
                        <stop offset="1" stopColor="#BD34FE" />
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFEA83" />
                        <stop offset="0.0833333" stopColor="#FFDD35" />
                        <stop offset="1" stopColor="#FFA800" />
                    </linearGradient>
                </defs>
            </svg>
        )
    }, [])

    function handleInput(event) {
        event.preventDefault()
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const userCertificate = await auth().signInWithEmailAndPassword(email, password)
            handleUserContext(userCertificate.user)
        } catch (error) {
            setStatus({
                title: 'Error certificate, Please Sign in again',
                subTitle: error.message,
            })
            setTimeout(() => {
                setStatus(INIT_STATUS)
            }, 3000)
        }
        setIsLoading(false)
    }

    function handleUserContext(user) {
        userContext.setUser({
            uid: user.uid,
            email: user.email,
            firstName: '',
            lastName: '',
            lastActive: 1,
        })
    }

    React.useEffect(() => {
        function unsubscribe() {
            auth().onAuthStateChanged(user => {
                if (user) {
                    setStatus({
                        title: `Hello !!!`,
                        subTitle: `Welcome back, ${user.email}`,
                    })
                    handleUserContext(user)
                } else {
                    setIsLoading(false)
                }
            })
        }

        unsubscribe()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {
                status.title !== ''
                    ? (
                        <div className='absolute top-6 animate-pulse'>
                            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                <div className="flex">
                                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                    <div>
                                        <p className="font-bold">{`${status.title}`}</p>
                                        <p className="text-sm">{`${status.subTitle}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                    <React.Fragment />
            }
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-col items-center justify-center">
                    {HeroImage}
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                        On The Tip Of My Tongue
                    </h2>
                </div>
                {
                    isLoading ?
                        (
                            <div className="flex items-center justify-center">
                                <LoadingComponent />
                            </div>
                        ) :
                        (
                            <form className="mt-8 space-y-6">
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">Email address</label>
                                        <input id="email-address" name="email" type="email" onChange={handleInput} autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input id="password" name="password" type="password" onChange={handleInput} autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        )
                }
            </div>
        </div>
    )
}
