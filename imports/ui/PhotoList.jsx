import React from 'react';
import { Link } from 'react-router-dom'
//MATERIAL UI STUFF
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


//GRAPHQL STUFF
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import QUERY from '../../imports/api/query/resolutionsQuery';

//COMPONENTS AND UTILS STUFF
import ErrorView from './Error.jsx';
import EntriesHighLights from './EntriesHighLights.jsx';
import utils from '../../imports/utils/index';


const PhotoList = ({ data }) => {

  if (data.loading) return <CircularProgress/>;
  if (data.error) <ErrorView message={data.error}></ErrorView>

  const classes = utils.useStyles();
  return(
      <React.Fragment>
        <CssBaseline />
        <EntriesHighLights/>

        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {data.resolutions.map(card => (
                  <Grid item key={card._id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                          className={classes.cardMedia}
                          image={ card.url }
                          title={ card.title }
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          { card.name }
                        </Typography>
                        <Typography>
                          { card.shortDescription }...
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/details/${card._id}` } className="ml1 no-underline black">
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
  )

}

export default graphql(QUERY)(PhotoList);