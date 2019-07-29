import React from 'react';
import Typography from '@material-ui/core/Typography';
import utils from '../../imports/utils/index';

const Footer = () => {
  const classes = utils.useStyles();
  return(
      <React.Fragment>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            My Photo Voted
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            REACT GRAPHQL APOLLO STACK CODING CHALLENGE
          </Typography>
        </footer>
      </React.Fragment>
  )
}
export default Footer;