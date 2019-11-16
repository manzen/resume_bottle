import * as React from 'react'
import styled from '@emotion/styled'
import Main from '../layouts/Main'
import Uploader from '../../molecules/Uploader'

const Home = () => {
    return (
        <Wrapper>
            <Main>
                <Uploader />
            </Main>
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.div``
