import React from 'react';
import { Link } from 'react-router-dom'
//MATERIAL STUFF
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';

import utils  from '../../imports/utils/index';

const Header = () => {
  const classes = utils.useStyles();

  return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} edge="start" />
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              My Photo Voted  - ApolloGraphQL
            </Typography>
            <Button variant="outlined" onClick={ () => Meteor.logout() }>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                My Photo Voted
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Here you can add all your images and get voted :) or not :(
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to="/login">
                      <Button variant="contained" color="primary">
                        Login
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/newEntry">
                      <Button variant="contained" color="primary">
                        Begin
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup">
                      <Button variant="contained" color="secondary">
                        SIGN UP
                      </Button>
                    </Link>
                  </Grid>

                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </React.Fragment>
  )
};
export default Header;