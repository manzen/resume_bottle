import * as React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Main from '../layouts/Main'

const Result = () => {
    return (
        <Wrapper>
            <Main>
                <React.Fragment>
                    <Headline>Sending…</Headline>
                    <SendingWrapper>
                        <BottleImage src="/img/bottle.png" alt="" width={100} />
                        <WaveImage />
                    </SendingWrapper>
                </React.Fragment>
            </Main>
        </Wrapper>
    )
}

export default Result

const waveMove = keyframes`
  0% {
     background-position-x: 0;
  }
  100% {
     background-position-x: -451px;
  }
`

const bottleMove = keyframes`
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0);
  }
`

const Wrapper = styled.div``

const Headline = styled.h1`
    font-size: 24px;
    margin: 40px auto 80px;
    text-align: center;
    opacity: 0.87;
`

const SendingWrapper = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(220, 233, 244, 0.5);
`

const BottleImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -83px 0 0 -50px;
    animation: ${bottleMove} 2s linear infinite;
`
const WaveImage = styled.div`
    position: absolute;
    top: 50%;
    width: 451px;
    height: 191px;
    background-image: url('/img/wave.png');
    background-repeat: repeat-x;
    animation: ${waveMove} 7s linear infinite;
`
