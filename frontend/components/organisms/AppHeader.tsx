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
            paddingLeft: '2em',
            textAlign: 'center',
        },
    }),
)

const AppHeader = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        紙々のあそび選考
                    </Typography>
                    <LoginWrapper>
                        <IconWrapper>
                            <AccountCircle />
                        </IconWrapper>
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
`

const IconWrapper = styled.div`
    margin-right: 0.5em;
`
