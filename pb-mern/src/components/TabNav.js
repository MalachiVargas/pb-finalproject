/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class TabNav extends Component {
    render() {
        const { selected, tabs, setSelected, children } = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        {tabs.map((tab) => {
                            const active = tab === selected ? 'active' : '';
                            return (
                                <li className="tab col s4 " key={tab}>
                                    <a
                                        href={`#${tab}`}
                                        className={active}
                                        onClick={() => setSelected(tab)}
                                    >
                                        {tab}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    {children}
                </div>
            </div>
        );
    }
}

export default TabNav;
