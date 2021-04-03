
import React, { Component } from 'react';
import axios from '../../axios';
import classes from "./MyAdvs.css";
import Advertise from '../../components/Advertise/Advertise';

class MyAdvListing extends Component {
  state = {
    listOfAdvs: []
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/advertise.json')
      .then(response => {
        const ads = response.data;
        const updatedAdvs = [];
        for (let key in ads) {
          if (ads[key].createdBy === 'Admin') {
            updatedAdvs.push({
              ...ads[key],
              id: key
            });
          }
        }

        console.log('updatedAdvs', updatedAdvs)
        this.setState({ listOfAdvs: updatedAdvs });
      })
      .catch(error => {
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/view-transaction/' + id);
  }

  render() {
    let listOfAdvs = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      listOfAdvs = this.state.listOfAdvs.map(adv => {
        return (
          <Advertise
            key={adv.id}
            title={adv.title}
            description={adv.description}
            createdBy={adv.createdBy} />
          // clicked={() => this.postSelectedHandler( adv.id )} 
        );
      });
    }

    return (
      <div>
        <div className={classes.pageHeader}>
          <h2>My Advertisements</h2>
        </div>
        <section className={classes.listOfAdvs}>
          {listOfAdvs}
        </section>
      </div>
    );
  }
}

export default MyAdvListing;