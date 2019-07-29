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
  mutation SendSubmission($name: String!, $shortDescription: String!, $ownerName: String!, $email: String!,  $url: String!, $description: String!, $created: Date) {
    createResolutions(name: $name, shortDescription: $shortDescription, ownerName: $ownerName, email: $email, url: $url, description: $description, created: $created) {
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
        formData: {
          url: '',
          name: '',
          email: '',
          ownerName: '',
          description: '',
          shortDescription: ''
        },
        submitted: false,
        disabledButton: false,
      };
      return initialState;
    }
    onChange(event) {
      const { formData } = this.state;
      formData[event.target.name] = event.target.value;
      this.setState({ formData });
    }
    handleSubmit() {

    }
    reset() {
      this.setState(this.getInitialState());
    }

    render() {
      const { url, name, description, shortDescription, ownerName, email } = this.state.formData;
      const { formData, disabledButton, submitted } = this.state;
      const created = Date.now();
      const styles = { padding: '16px' };
      let submmitedMessage;
      if (submitted) {
        submmitedMessage = <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
          Your entry was successfully submitted.
        </Typography>
      }
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
                { submmitedMessage }
                <div>
                  <ValidatorForm
                      ref="form"
                      onSubmit={ this.handleSubmit }
                  >
                    <TextValidator
                        fullWidth
                        name="email"
                        label="Your Email"
                        disabled={ submitted }
                        value={ formData.email }
                        onChange={ this.onChange.bind(this) }
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                    />
                    <TextValidator
                        fullWidth
                        name="ownerName"
                        label="Your Name"
                        disabled={ submitted }
                        value={ formData.ownerName }
                        onChange={ this.onChange.bind(this) }
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        fullWidth
                        name="name"
                        disabled={ submitted }
                        label="Your Photo Title"
                        value={ formData.name }
                        onChange={ this.onChange.bind(this) }
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        fullWidth
                        name="url"
                        label="Your photo URL"
                        disabled={ submitted }
                        value={ formData.url }
                        onChange={ this.onChange.bind(this) }
                        validators={['required', 'matchRegexp:(http[s]?://.*.(?:png|jpg|gif|svg|jpeg))']}
                        errorMessages={['This field is required', 'URL image is not valid']}
                    />
                    <TextValidator
                        disabled={ submitted }
                        fullWidth
                        multiline
                        name="description"
                        label="description"
                        value={ formData.description }
                        onChange={ this.onChange.bind(this) }
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        disabled={ submitted }
                        fullWidth
                        multiline
                        name="shortDescription"
                        label="shortDescription"
                        value={ formData.shortDescription }
                        onChange={ this.onChange.bind(this) }
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />

                    <br/><br/>
                    <Mutation
                        mutation={ SEND_SUBMISSION }
                        variables={{ url, name, description, shortDescription, ownerName, email, created }}
                        update={
                        (store, { data }) => {
                          if (data.createResolutions._id) {
                            this.reset();
                            this.setState({ submitted: true })
                          }
                        }
                      }
                    >
                      { SendSubmission =>
                          <Button variant="outlined"
                                  color="primary"
                                  disabled={ disabledButton || submitted }
                                  onClick={ SendSubmission }
                          >
                            SAVE
                          </Button>
                      }
                    </Mutation>

                  </ValidatorForm>

                </div>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      )
  }
}

export default SubmitPhoto;