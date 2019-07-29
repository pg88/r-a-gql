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

const DETAIL_QUERY = gql`
  query resolutionLookUp($id: String!) {
      resolutionLookUp(_id: $id) {
        name
        _id
        url
        likes
        dislikes
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
  }
  render() {
      const id = this.props.match.params.id
      const styles = {
        padding: '16px'
      };
      return(
          <Query query={ DETAIL_QUERY } variables={{ id }}>
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
                        <Favorite fontSize="small" /> { data.resolutionLookUp.likes  } <br/>
                        <Clear fontSize="small" /> { data.resolutionLookUp.dislikes ? data.resolutionLookUp.dislikes : 0   }
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        { data.resolutionLookUp.description }
                      </Typography>
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Mutation mutation={ INCREASE_VOTES }
                                    variables={{ id }}
                          >
                            { UpdateVotes =>
                                <Button variant="outlined" size="large" color="primary" onClick={ UpdateVotes }>
                                  <Favorite fontSize="small" />  Vote
                                </Button>
                            }
                          </Mutation>
                        </Grid>
                        <Grid item>
                          <Mutation mutation={ INCREASE_MISVOTES }
                                    variables={{ id }}
                          >
                            { UpdateMisVotes =>
                                <Button variant="outlined" size="large" color="secondary" onClick={ UpdateMisVotes }>
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

