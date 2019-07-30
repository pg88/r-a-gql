import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'


import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ErrorView from './Error.jsx';

const MOST_VOTED_QUERY = gql`
  query mostVoted {
    mostVoted {
      _id
    }
  }
`
const MOST_MISVOTED_QUERY = gql`
  query mostMisVoted {
    mostMisVoted {
      _id
    }
  }
`

class EntriesHighLights extends Component {
  setId(data) {
    console.log("MOST_VOTED__", data);
  }
  render() {
    return(
        <React.Fragment>

          <Grid
              container
              spacing={ 2 }
              direction="row"
              justify="flex-end"
              alignItems="center"
          >
            <Grid item>
              <Query query={ MOST_VOTED_QUERY }
                     onCompleted={ data => this.setId(data) }
              >
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress/>
                  if (error) return <ErrorView message={error}/>
                  const hasData = data.mostVoted === null;
                  return(
                      <Button
                        color="primary"
                        variant="outlined"
                        disabled={ hasData }
                      >
                          {
                            !hasData ? (
                                <Link to={`/details/${data.mostVoted._id}`}>
                                  All times's Most Voted
                                </Link>
                            ) : `All times's Most Voted`
                          }
                      </Button>
                  )
                  }
                }
              </Query>
            </Grid>
            <Grid item>
              <Query query={ MOST_MISVOTED_QUERY }
                     onCompleted={ data => this.setId(data) }
              >
                {({ loading, error, data }) => {
                    if (loading) return <CircularProgress/>
                    if (error) return <ErrorView message={error}/>
                    const hasData = data.mostMisVoted === null;
                    return(
                        <Button
                            color="secondary"
                            variant="outlined"
                            disabled={ hasData }
                        >
                          {
                            !hasData ? (
                                <Link to={`/details/${data.mostMisVoted._id}`}>
                                  All times's Most Misvoted
                                </Link>
                            ) : `All times's Most Misvoted`
                          }
                        </Button>
                    )
                  }
                }
              </Query>
            </Grid>
          </Grid>
        </React.Fragment>
    )
  }
}

export default EntriesHighLights