import React, { Component } from 'react'
//MATERIAL UI STUFF
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//GRAPHQL STUFF
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import utils  from '../../imports/utils/index';


const SEND_SUBMISSION = gql`
  mutation SendSubmission($name: String!, $shortDescription: String!, $url: String!, $description: String!) {
    createResolutions(name: $name, shortDescription: $shortDescription, url: $url, description: $description) {
      _id
      name
    }
  }
`

class SubmitPhoto extends Component {
    constructor(props) {
      super(props)
      this.state = {
        url: "",
        name: "",
        description: "",
        shortDescription: "",
        likes:0,
        dislikes:0
      }
    }
    onChange(event) {
      if (event.target.value) {
        this.setState({ [event.target.name] : event.target.value })
      }

    }

    render() {
      const { url, name, description, shortDescription, likes, dislikes } = this.state;
      return (
        <React.Fragment>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center"
              >
            <Grid item xs={6}>
              <Paper>
                <Typography variant="subtitle2" align="left" color="textPrimary" gutterBottom>
                  Submit your entry
                </Typography>
                <Typography variant="caption" align="left" color="textPrimary" gutterBottom>
                  *Please complete all the fields on the form for your submission
                </Typography>
                <div>
                  <TextField
                      required
                      fullWidth
                      name="name"
                      onChange={ this.onChange.bind(this)  }
                      id="title-required"
                      label="Title"
                      placeholder="Title "
                      margin="normal"
                  />
                  <TextField
                      required
                      fullWidth
                      label="URL"
                      name="url"
                      id="url-required"
                      onChange={ this.onChange.bind(this)  }
                      placeholder="Please add a valid url please..."
                      margin="normal"
                  />
                  <TextField
                      required
                      fullWidth
                      name="shortDescription"
                      id="short-required"
                      label="Short Description"
                      multiline
                      onChange={ this.onChange.bind(this)  }
                      placeholder="Please add a catchy short description in 90 characters please..."
                      margin="normal"
                  />
                  <TextField
                      required
                      fullWidth
                      name="description"
                      id="description-required"
                      onChange={ this.onChange.bind(this)  }
                      label="Description"
                      multiline
                      placeholder="Please add a catchy and long explained description please... "
                      margin="normal"
                  />
                  <Mutation
                      mutation={ SEND_SUBMISSION }
                      variables={{ url, name, description, shortDescription }}
                  >
                      { SendSubmission =>
                          <Button variant="outlined" color="primary" onClick={ SendSubmission }>
                            SAVE
                          </Button>
                      }
                  </Mutation>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      )
  }
}

export default SubmitPhoto;