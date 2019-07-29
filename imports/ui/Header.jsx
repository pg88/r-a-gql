import React from 'react';
import { Link } from 'react-router-dom'
//MATERIAL STUFF
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import utils  from '../../imports/utils/index';

const Header = () => {
  const classes = utils.useStyles();
  return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              My Photo Voted  - ApolloGraphQL
            </Typography>
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
                    <Link to="/newEntry">
                      <Button variant="contained" color="primary">
                        Begin
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