import * as React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import * as firebase from 'firebase'
import Main from '../layouts/Main'
import Uploader from '../../molecules/Uploader'
import { ngrokURL } from '../../../assets/api'

const Register = () => {
    const [uploadData, setUploadData] = React.useState<string | undefined>(undefined)
    const [user, setUser] = React.useState<any>(null)
    const router = useRouter()
    const handleSetFile = (data: string) => {
        setUploadData(data)
    }

    const handleMoveNext = () => {
        if (!(uploadData && user)) return
        const params = new URLSearchParams()
        params.append('email', user.email)
        params.append('resume', uploadData)
        fetch(`${ngrokURL}api/upload`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            credentials: 'omit', // include, same-origin, *omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params, // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
        })
        setTimeout(() => {
            router.push('/result')
        }, 3000)
    }

    React.useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: firebase.User | null) => setUser(user))
        return (): void => {
            unregisterAuthObserver()
        }
    }, [])

    React.useEffect(() => {
        console.log(user?.email)
    }, [user])

    return (
        <Wrapper>
            <Main>
                <React.Fragment>
                    <Headline>UPLOAD</Headline>
                    <Uploader onSetFile={handleSetFile} />
                    {uploadData && user && (
                        <SendButton variant="contained" color="primary" onClick={handleMoveNext}>
                            おくる
                        </SendButton>
                    )}
                </React.Fragment>
            </Main>
        </Wrapper>
    )
}

export default Register

const Wrapper = styled.div``

const Headline = styled.h1`
    font-size: 24px;
    margin: 40px auto 80px;
    text-align: center;
    opacity: 0.87;
`

const SendButton = styled(Button)`
    display: block;
    width: 140px;
    margin: 40px auto;
`
