import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Drawer from './Drawer';
import { connect } from 'react-redux';

class HomePage extends Component {

    static propTypes = {
        employeeDetailsStack: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            employeeDetails: {},
            employeeIndex: null,
        };
    }

    onEditEmployee = (employeeIndex) => () => {
        this.toggleDrawer();
        this.setState({ employeeDetails: this.props.employeeDetailsStack[employeeIndex], employeeIndex });
    }

    getEmployees = () => {
        if (this.props.employeeDetailsStack && this.props.employeeDetailsStack.length) {
            return this.props.employeeDetailsStack.map((employee, index) => {
                return (
                    <div className="card-container" key={JSON.stringify(employee) + index}>
                        <img alt="employee" src={require('../image/emp-4.jpg')} />
                        <div className="emp-details-icon">
                            <div className="emp-name-design-wrapper">
                                <div>
                                    <div className="emp-name">{employee.fullName}</div>
                                    <div className="emp-designation">{employee.email}</div>
                                </div>
                                <div className="edit" onClick={this.onEditEmployee(index)}></div>
                            </div>
                            <div className="tax-amt-wrapper">
                                <div className="taxable-inc-container">
                                    <div className="taxable-inc">{employee.taxableIncome}</div>
                                    <div className="taxable-inc-lable">Taxable Income</div>
                                </div>
                                <div className="tax-payable-container">
                                    <div className="tax-payable">{employee.taxPayable}</div>
                                    <div className="tax-payable-lable">Tax Payable</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return <span style={{ fontWeight: 'normal', fontSize: '29px' }}>No Employees added yet</span>;

    }

    toggleDrawer = () => {
        if (this.state.show) {
            this.setState({ employeeDetails: {}, employeeIndex: null });
        }
        this.setState({ show: !this.state.show });
    }

    render() {
        return (
            <div className="app-container">
                <Header />
                <div className="home-page-container">
                    <div className="employee-details">{this.getEmployees()}</div>
                    <button className="add-employee" onClick={this.toggleDrawer}>Add Employee</button>
                    <Drawer
                        show={this.state.show}
                        toggleDrawer={this.toggleDrawer}
                        employeeDetails={this.state.employeeDetails}
                        employeeIndex={this.state.employeeIndex}
                    />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    employeeDetailsStack: state.employee.employeeDetailsStack,
});

export default connect(mapStateToProps)(HomePage);
