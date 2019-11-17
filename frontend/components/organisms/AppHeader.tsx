import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import styled from '@emotion/styled'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            textAlign: 'center',
        },
    }),
)

const AppHeader = () => {
    const classes = useStyles()
    const [auth, setAuth] = React.useState(false)

    console.log(setAuth)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        いい感じのタイトルが入る
                    </Typography>
                    <LoginWrapper>
                        <IconWrapper>
                            <AccountCircle />
                        </IconWrapper>
                        {auth ? <p>Logout</p> : <p>Login</p>}
                    </LoginWrapper>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppHeader

const LoginWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 5em;
`

const IconWrapper = styled.div`
    margin-right: 0.5em;
`