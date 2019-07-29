import gql from 'graphql-tag'

const QUERY = gql`
  query Resolutions
  {
    resolutions {
        shortDescription
        name
        _id
        url
    }
  }`

module.exports = QUERY;