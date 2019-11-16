import * as React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import Main from '../layouts/Main'
import Uploader from '../../molecules/Uploader'

const Register = () => {
    const [isUpload, setIsUpload] = React.useState(false)
    const router = useRouter()
    const handleSetFile = (bool: boolean) => {
        console.log(bool)
        setIsUpload(bool)
    }

    const handleMoveNext = () => {
        router.push('/result')
    }

    return (
        <Wrapper>
            <Main>
                <React.Fragment>
                    <Headline>UPLOAD</Headline>
                    <Uploader onSetFile={handleSetFile} />
                    {isUpload && (
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
