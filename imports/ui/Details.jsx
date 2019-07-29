import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
//MATERIAL UI STUFF
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//COMPONENTS AND UTILS STUFF
import utils from '../../imports/utils/index';
import ErrorView from './Error.jsx';
import moment from "moment";

const DETAIL_QUERY = gql`
  query resolutionLookUp($id: String!) {
      resolutionLookUp(_id: $id) {
        name
        _id
        url
        likes
        created
        dislikes
        ownerName
        description
    }
  }
`

const INCREASE_VOTES = gql`
  mutation UpdateVotes($id: String!) {
    updateVotes(id: $id) {
      _id
    }
  }
`
const INCREASE_MISVOTES = gql`
  mutation UpdateMisVotes($id: String!) {
    updateMisVotes(id: $id) {
      _id
    }
  }
`


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    const initialState = {
      disableMisvote: false,
      disableVote: false
    };
    return initialState;
  }
  setVotes(data) {
    if(data.resolutionLookUp) {
      this.setState( { likes: data.resolutionLookUp.likes, dislikes: data.resolutionLookUp.dislikes, })
    }
  }
  render() {
      const id = this.props.match.params.id
      const styles = { padding: '16px' }
      return(
          <Query query={ DETAIL_QUERY }
                 variables={{ id }}
                 onCompleted={ data => this.setVotes(data) }
          >
            {({ loading, error, data }) => {
              if (loading) return <CircularProgress/>
              if (error) return <ErrorView message={error}/>

              return (
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <img src={data.resolutionLookUp.url} alt={data.resolutionLookUp.name} width="100%"/>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper style={ styles }>
                      <Typography component="h3" variant="h4" align="left" color="textPrimary" gutterBottom>
                        { data.resolutionLookUp.name }
                      </Typography>
                      <Typography variant="body2" align="left" gutterBottom>
                        <Favorite fontSize="small" /> { this.state.likes  } <br/>
                        <Clear fontSize="small" /> { this.state.dislikes ? this.state.dislikes : 0   }
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        { data.resolutionLookUp.description }
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        Submitted by { data.resolutionLookUp.ownerName }, on { moment(data.resolutionLookUp.created).format('MMM Do YY, h:mm:ss a') }
                      </Typography>
                      <br/>
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Mutation mutation={ INCREASE_VOTES }
                                    variables={{ id }}
                                    update={
                                      (store, { data }) => {
                                          this.setState( { likes: this.state.likes + 1 })
                                          this.setState( { disableVote: true })
                                      }
                                    }
                          >
                            { UpdateVotes =>
                                <Button variant="outlined"
                                        size="large"
                                        color="primary"
                                        onClick={ UpdateVotes }
                                        disabled={ this.state.disableVote }
                                >
                                  <Favorite fontSize="small" />  Vote
                                </Button>
                            }
                          </Mutation>
                        </Grid>
                        <Grid item>
                          <Mutation mutation={ INCREASE_MISVOTES }
                                    variables={{ id }}
                                    update={
                                      (store, { data }) => {
                                          this.setState( { dislikes: this.state.dislikes + 1 })
                                          this.setState( { disableMisvote: true })
                                      }
                                    }
                          >
                            { UpdateMisVotes =>
                                <Button variant="outlined"
                                        size="large"
                                        color="secondary"
                                        disabled={ this.state.disableMisvote }
                                        onClick={ UpdateMisVotes }>
                                  <Clear fontSize="small" />  Vote
                                </Button>
                            }
                          </Mutation>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )
            }}
          </Query>
      )
  }
}

export default Details

