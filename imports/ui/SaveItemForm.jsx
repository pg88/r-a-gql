import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import gql from 'graphql-tag'
import { Mutation, graphql } from 'react-apollo'
import QUERY from '../../imports/api/query/resolutionsQuery';

const CREATE_RESOLUTION = gql`
  mutation PostMutation($name: String!) {
      createResolutions(name: $name ) {
          _id
      }
  }
`

class SaveItemForm extends Component {
  state = {
      name: '',
  };

  render() {
    const { name } = this.state
    return (
        <div>
          <input type="text"
                 ref={ input => (this.Name) = input }
                 onChange={e => this.setState({ name : e.target.value })}
          ></input>

          <Mutation mutation={ CREATE_RESOLUTION }
                    variables={{ name }}
                    refetchQueries={() => [
                        {
                            query: QUERY,
                            //variables: { username: username },
                        }
                    ]}
                    awaitRefetchQueries={true}
          >
            { postMutation => <button onClick={ postMutation }>Submit</button>}
          </Mutation>
        </div>
    );
  }
}

export default SaveItemForm;