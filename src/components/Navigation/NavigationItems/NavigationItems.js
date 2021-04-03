import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>My Transactions </NavigationItem>
        <NavigationItem link="/">My Advertisements</NavigationItem>
        <NavigationItem link="/">Post New Ad</NavigationItem>
    </ul>
);

export default navigationItems;