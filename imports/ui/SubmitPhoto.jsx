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
      super(props);
      this.state = this.getInitialState();
    }
    getInitialState() {
      const initialState = {
        url: "",
        name: "",
        description: "",
        shortDescription: "",
        disabledButton: true,
        urlRegex: new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi),
      };
      return initialState;
    }
    onChange(event) {
      if (event.target.value) {
        /*if(event.target.name === "url") {
          const isValidUrl = event.target.value.match(this.state.urlRegex);
          if (isValidUrl === null) return false
        }*/
        this.setState({ [event.target.name] : event.target.value });
        /*for (var key in this.state) {
          this.setState({ disabledButton : !this.state[key]  });
        }*/
      }
    }
    reset() {
      this.setState(this.getInitialState());
    }

    render() {
      const { url, name, description, shortDescription } = this.state;
      const styles = { padding: '16px' };
      return (
        <React.Fragment >
          <Grid container
                style={ styles }
                direction="row"
                justify="center"
                alignItems="center"
              >
            <Grid item xs={6}>
              <Paper style={ styles }>
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
                      value={ this.state.name }
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
                      value={ this.state.url }
                      onChange={ this.onChange.bind(this)  }
                      placeholder="Please add a valid url please..."
                      margin="normal"
                  />
                  <TextField
                      required
                      fullWidth
                      multiline
                      id="short-required"
                      name="shortDescription"
                      label="Short Description"
                      value={ this.state.shortDescription }
                      onChange={ this.onChange.bind(this) }
                      placeholder="Please add a catchy short description in 90 characters please..."
                      margin="normal"
                  />
                  <TextField
                      required
                      fullWidth
                      multiline
                      name="description"
                      label="Description"
                      id="description-required"
                      value={ this.state.description }
                      onChange={ this.onChange.bind(this) }
                      placeholder="Please add a catchy and long explained description please... "
                      margin="normal"
                  />
                  <Mutation
                      mutation={ SEND_SUBMISSION }
                      variables={{ url, name, description, shortDescription }}
                      update={
                        (store, { data }) => {
                          if (data.createResolutions._id) {
                            this.reset()
                          }
                        }
                      }
                  >
                      { SendSubmission =>
                          <Button variant="outlined"
                                  color="primary"
                                  disabled={ this.state.disabledButton }
                                  onClick={ SendSubmission }
                          >
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