import React, { Component } from 'react';

import Aux from '../Auxillary';
import classes from './Layout.css';
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        isAuthorised: true
    }

    render () {
        return (
            <Aux>
               {/* {this.state.isAuthorised ? <Toolbar  /> : null }  */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;