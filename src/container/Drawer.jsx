import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import AddEmployee from './AddEmployee';

class Drawer extends Component {

    static propTypes = {
        show: PropTypes.bool,
        toggleDrawer: PropTypes.func.isRequired,
        employeeDetails: PropTypes.shape({}),
        employeeIndex: PropTypes.number,
    }

    static defaultProps = {
        show: false,
        employeeDetails: {},
        employeeIndex: 0,
    }

    render() {
        return (
            <Fragment>
                {this.props.show ? <div className="full-height-width" onClick={this.props.toggleDrawer} /> : null}
                <div className={`drawer-container ${this.props.show ? 'open' : ''}`}>
                    <AddEmployee
                        onClosePanel={this.props.toggleDrawer}
                        show={this.props.show}
                        employeeDetails={this.props.employeeDetails}
                        employeeIndex={this.props.employeeIndex}
                    />
                </div>
            </Fragment>
        )
    }
}

export default Drawer;