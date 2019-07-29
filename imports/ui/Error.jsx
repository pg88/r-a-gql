import React, { Component } from 'react'
import ErrorIcon from '@material-ui/icons/error';
import Typography from '@material-ui/core/Typography';


class Error extends  Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <div>
          <Typography variant="h4" align="center">
             We are sorry, but something happened to us. It's not you :).
          </Typography>

          <Typography variant="h5" align="center">
            <ErrorIcon/> Here comes the techy message
          </Typography>
          <Typography variant="body1" align="center">
            { this.props.message }
          </Typography>
        </div>
    )
  }
}


export default Error