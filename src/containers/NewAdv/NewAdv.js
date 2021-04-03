import React, { Component } from 'react';
import axios from '../../axios';
// D:\my-data\ReactTrainingUdemy\xor-mart\src\axios.js
import { Redirect } from 'react-router-dom';

import classes from './NewPayment.css';

class NewPayment extends Component {
    state = {
        title: '',
        description: '',
        createdBy: 'Admin',
        location: '',
        submitted: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    postAdDataHandler = () => {
        const data = {
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            createdBy: 'Admin'//this.state.createdBy
        };
        axios.post('/advertise.json', data)
            .then(response => {
                if(this.props.isModal)  {
                    this.props.onSaveAd(data)
                }
                this.props.isModal ? this.props.modalClosed() : this.props.history.replace('/view-transaction');

            });
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/view-transaction" />;
        }
        return (
            <div className={classes.NewAd}>
                {redirect}
                <h2>Post New Advertisements</h2>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Description</label>
                <textarea rows="4" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} />
                <label>Select Location</label>
                <select value={this.state.location} onChange={(event) => this.setState({ location: event.target.value })}>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Gurgaon">Gurgaon</option>
                </select>
                <button onClick={this.postAdDataHandler}>Add Advertisement</button>
            </div>
        );
    }
}

export default NewPayment;