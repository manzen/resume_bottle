import * as React from 'react'
import Head from 'next/head'
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import firebase from '../../../assets/utils/firebaseApp'
import AppHeader from '../../organisms/AppHeader'

type Props = {
    children: JSX.Element | string
}

const Main = (props: Props) => {
    const { children } = props

    const theme = createMuiTheme({
        palette: {
            primary: blue,
        },
    })

    React.useEffect(() => {
        firebase.analytics()
    }, [])


    return (
        <React.Fragment>
            <Head>
                <title>resume-bottle</title>
            </Head>
            <Global
                styles={css`
                    ${emotionReset}
                `}
            />
            <ThemeProvider theme={theme}>
                <AppHeader />
                {children}
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Main
