
import React, { Component } from 'react';
import axios from '../../axios';
import classes from "./AdvListing.css";
import Advertise from '../../components/Advertise/Advertise';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import NewPayment from '../../containers/NewPayment/NewPayment';
import { Redirect } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class AdvListing extends Component {
  state = {
    filter: "",
    listOfAdvs: [],
    loading: false,
    error: false,
    addupdatead: false,
  }



  addUpdateHandler = () => {
    this.setState({ addupdatead: true });
  }

  addUpdateCancelHandler = () => {
    this.setState({ addupdatead: false });
    // <Redirect to="/ads" />
  }
  filterHandler = event => {
    this.setState({ filter: event.target.value });
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios.get('/advertise.json')
      .then(response => {
        const ads = response.data;
        const updatedAdvs = [];
        for (let key in ads) {
          updatedAdvs.push({
            ...ads[key],
            id: key
          });
        }
        this.setState({ listOfAdvs: updatedAdvs.reverse() });
        this.setState({ loading: false });
      })
      .catch(error => {

      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/view-transaction/' + id);
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/view-transaction/' + id);
  }
  onAddAdvertisementHandler = () => {

    this.setState({ addupdatead: true });
  }

  onSaveAdvertise = (ad) => {
    this.setState({ loading: true });
    const updatedAdvs = [ad, ...this.state.listOfAdvs];
    this.setState({ listOfAdvs: updatedAdvs });
    this.setState({ loading: false });
  }

  render() {
    let columns = [{
      dataField: 'title',
      text: 'Title'
    }, {
      dataField: 'description',
      text: 'Description'
    }, {
      dataField: 'location',
      text: 'Location'
    }, {
      dataField: 'createdBy',
      text: 'Created By'
    }];
    let list = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    // let list
    const { filter, listOfAdvs } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const advList = listOfAdvs.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    // if(advList.length) {
    //   this.setState({ listOfAdvs: advList });
    // }
    if (this.state.loading) {
      list = <Spinner />;
    }
    if (!this.state.error && !this.state.loading) {
      list = advList.map(adv => {
        return (
          <Advertise
            key={adv.id}
            title={adv.title}
            description={adv.description}
            location={adv.location}
            createdBy={adv.createdBy} />
        );
      });
    }

    return (
      <div>
        <Modal show={this.state.addupdatead} modalClosed={this.addUpdateCancelHandler}>
          <NewPayment onSaveAd={(ad) => this.onSaveAdvertise(ad)} isModal="true" modalClosed={this.addUpdateCancelHandler}></NewPayment>
        </Modal>
        <div className={classes.pageHeader}>
          <h2>My Transactions</h2>

          <div><input className={classes.searchInput} value={filter} placeholder="Search Advertise..." onChange={this.filterHandler} /></div>
          <button variant="primary" type="button" onClick={this.onAddAdvertisementHandler} className="btn btn-primary btn-sm">Make Payment</button>
        </div>
        {/* <section className={classes.listOfAdvs}>
          {!list.length ? <p> Advertisement(s)not added yet. Please add new Ad.</p> : list}
        </section> */}
        <section className={classes.listOfAdvs}>
          <BootstrapTable responsive="sm" size="sm" variant="dark" striped hover condensed keyField='title' data={listOfAdvs} columns={columns} />
        </section>
        {/* <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> */}
      </div>
    );
  }
}

export default AdvListing;