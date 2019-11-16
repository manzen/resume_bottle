import * as React from 'react'
import Head from 'next/head'
import { AppBar } from '@material-ui/core'

type Props = {
    children: JSX.Element | string
}

const Main = (props: Props) => {
    const { children } = props
    return (
        <React.Fragment>
            <Head>
                <title>resume-bottle</title>
            </Head>
            <AppBar />
            {children}
        </React.Fragment>
    )
}

export default Main
