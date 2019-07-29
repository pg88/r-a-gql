import React, { Component } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


class SignUp extends Component {

    constructor(props) {
      super(props);
      this.state = this.getInitialState();
    }
    getInitialState() {
      const initialState = {
        formData: {
          email: '',
          password: '',
        },
        disabledButton: false
      };
      return initialState;
    }
    onChange(event) {
      const { formData } = this.state;
      formData[event.target.name] = event.target.value;
      this.setState({ formData });
    }
    handleSubmit() {
      Meteor.loginWithPassword(this.state.formData)
    }
    render() {
      const styles = { padding: '16px' };
      const { formData, disabledButton } = this.state;
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
                <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                  LOG IN
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={ this.handleSubmit }
                >
                  <TextValidator
                      fullWidth
                      name="email"
                      label="Email"
                      value={ formData.email }
                      onChange={ this.onChange.bind(this) }
                      validators={['required', 'isEmail']}
                      errorMessages={['This field is required', 'email is not valid']}
                  />
                  <br />
                  <TextValidator
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      validators={['required']}
                      value={ formData.password }
                      onChange={ this.onChange.bind(this) }
                      errorMessages={['This field is required']}
                  />
                  <br/>
                  <Typography variant="caption" align="left" color="textPrimary" gutterBottom>
                    *Please complete all the fields on the form for sign up <br/>
                  </Typography>
                  <br/>
                  <Button
                      color="primary"
                      variant="outlined"
                      disabled={ disabledButton }
                      onClick={ () => this.handleSubmit() }
                  >
                    {
                      (disabledButton && 'Your form is submitted!')
                      || (!disabledButton && 'LOG IN')
                    }
                  </Button>
                </ValidatorForm>


              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    }
}

export default SignUp