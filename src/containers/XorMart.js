import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import classes from "./XorMart.css";
import TransactionsListing from './TransactionsListing/TransactionsListing';
import MyAdvListing from './MyAdvs/MyAdvs';

import asyncComponent from '../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
import Logo from '../components/Logo/Logo';
import Login from '../containers/Login/Login';

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPayment/NewPayment');
});

class XorMart extends Component {
  state = {
    auth: false,
    isLogout: false
  }
  loginSubmit(isLogin) {
    isLogin === '1' ? this.setState({ auth: true }) : this.setState({ auth: false })
  }

  onLogoutClick() {
    this.setState({ auth: false });
    this.setState({ isLogout: true });
  }
  render() {
    let redirect = null;
    if (this.state.isLogout) {
      redirect = <Redirect to="/" />;
    }
    return (
      <div>
        {redirect}
        {this.state.auth ? <header className={classes.Toolbar}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <ul className={classes.NavigationItems}>
              <li className={classes.NavigationItem}><NavLink
                to="/view-transaction/"
                exact
                activeClassName={classes.active}
              >My Transactions</NavLink></li>

              <li className={classes.NavigationItem}><NavLink to={{
                pathname: '/make-payment',
                hash: '#submit',
                search: '?quick-submit=true'
              }} activeClassName={classes.active}>Make Payment</NavLink></li>

              <li className={classes.NavigationItem}><NavLink to={{
                pathname: '/my-ads',
              }} activeClassName={classes.active}>Profile Details</NavLink></li>

              <li className={classes.NavigationItem}> <button variant="primary" type="button" onClick={() => this.onLogoutClick()} className="btn btn-primary btn-sm">Logout</button>
              </li>
            </ul>
          </nav>
        </header> : null}
        {this.state.auth ?
          <Switch>

            <Route path="/make-payment" component={AsyncNewPost} />
            <Route path="/view-transaction" component={TransactionsListing} />
            <Route path="/my-ads" component={MyAdvListing} />

            <Route
              exact
              path="/"
              render={() => {
                return (
                  this.state.auth ?
                    <Redirect to="/view-transaction" /> :
                    <h1>Not found</h1>
                )
              }}
            />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
          : null}

        {!this.state.auth ? <Login onSubmit={(isLoginsubmit) => this.loginSubmit(isLoginsubmit)}  ></Login > : null
        }
      </div>
    );
  }
}

export default XorMart;