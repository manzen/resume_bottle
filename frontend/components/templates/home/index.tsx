import * as React from 'react'
import styled from '@emotion/styled'
import { StyledFirebaseAuth } from 'react-firebaseui'
import * as firebase from 'firebase/app'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import Main from '../layouts/Main'

const Home = () => {
    const [user, setUser] = React.useState<any>(null)
    const router = useRouter()
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    }

    React.useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: firebase.User | null) => setUser(user))
        return (): void => {
            unregisterAuthObserver()
        }
    }, [])

    React.useEffect(() => {
        console.log(user)
    }, [user])

    const handleMoveNext = () => {
        router.push('/register')
    }

    return (
        <Wrapper>
            <Main>
                <React.Fragment>
                    {!user ? (
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    ) : (
                        <Inner>
                            <StartButton variant="contained" color="primary" onClick={handleMoveNext}>
                                はじめる
                            </StartButton>
                        </Inner>
                    )}
                </React.Fragment>
            </Main>
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.div``

const Inner = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const StartButton = styled(Button)`
    position: absolute;
    width: 140px;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
`
