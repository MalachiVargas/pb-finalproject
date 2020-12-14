/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Tab extends Component {
    render() {
        const { isSelected, children } = this.props;
        if (isSelected) {
            return <div>{children}</div>;
        }
        return null;
    }
}

export default Tab;
