import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as employeeActions from '../action/employeeActions'
import isEmpty from 'lodash/isEmpty';


class AddEmployee extends Component {

    static propTypes = {
        onClosePanel: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        employeeDetails: PropTypes.shape({}),
        employeeIndex: PropTypes.number,
    }

    static defaultProps = {
        employeeIndex: null,
    }


    constructor(props) {
        super(props);
        this.state = {
            employeeDetails: {},
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.show && isEmpty(state.employeeDetails)) {
            return { employeeDetails: props.employeeDetails }
        }
        return null;
    }

    onSubmit = () => {
        this.props.employeeActions.setEmployeeDetails(this.state.employeeDetails, this.props.employeeIndex);
        this.props.onClosePanel();
        this.setState({ employeeDetails: {} });
    }

    getPayableTax = (taxableIncome) => {
        let taxableIncomeNew;
        let tax;

        if (taxableIncome <= 250000) {
            return '';
        } else if (taxableIncome > 250000 && taxableIncome <= 500000) {
            return (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
            taxableIncomeNew = taxableIncome - 250000; // No tax
            tax = 250000 * 0.05; // 5% tax
            taxableIncomeNew = (taxableIncomeNew - 250000);

            tax = tax + (taxableIncomeNew * 0.2); // 20% tax
            return tax;
        } else {
            taxableIncomeNew = taxableIncome - 250000; // No tax
            tax = 250000 * 0.05; // 5% tax
            taxableIncomeNew = (taxableIncomeNew - 250000);

            tax = tax + (500000 * 0.2); // 20% tax
            taxableIncomeNew = (taxableIncomeNew - 500000);

            tax = tax + (taxableIncomeNew * 0.3); // 30% tax
            return tax;
        }
    }

    onChange = (e) => {
        const employeeDetails = { ...this.state.employeeDetails };
        employeeDetails[e.target.name] = e.target.value;


        if (e.target.name === 'grossSalary') {
            const taxableIncome = +e.target.value - (+employeeDetails.investment || 0);

            employeeDetails.taxableIncome = taxableIncome;
            employeeDetails.taxPayable = this.getPayableTax(taxableIncome);
        } else if (e.target.name === 'investment') {
            const investment = +e.target.value > 150000 ? 150000 : +e.target.value;
            const taxableIncome = (+employeeDetails.grossSalary || 0) - investment;

            employeeDetails.taxableIncome = taxableIncome;
            employeeDetails.taxPayable = this.getPayableTax(taxableIncome);
        }

        this.setState({
            employeeDetails
        });
    }

    render() {

        const { employeeDetails } = this.state;

        return (
            <div className="add-employee-panel">
                <div className="close" onClick={this.props.onClosePanel} />
                <div>
                    <div className="label">FULL NAME</div>
                    <input type="text" key="full-name" name="fullName" className="textfield" value={employeeDetails.fullName || ''} onChange={this.onChange} />
                </div>
                <div>
                    <div className="label">EMAIL ID</div>
                    <input type="email" key="email" className="textfield" name="email" value={employeeDetails.email || ''} onChange={this.onChange} />
                </div>
                <div className="salary">
                    <div className="label">GROSS SALARY</div>
                    <input type="number" key="gross-salary" name="grossSalary" className="textfield" value={employeeDetails.grossSalary || ''} onChange={this.onChange} />
                </div>
                <div className="salary">
                    <div className="label">INVESTMENT</div>
                    <input type="number" key="investment" name="investment" className="textfield" value={employeeDetails.investment || ''} onChange={this.onChange} />
                </div>
                <div className="salary">
                    <div className="label">Taxable Income</div>
                    <input type="number" key="taxable-income" name="taxableIncome" disabled className="textfield" value={employeeDetails.taxableIncome || ''} />
                </div>
                <div className="salary">
                    <div className="label">Tax Payable</div>
                    <input type="number" key="tax-payable" name="taxPayable" disabled className="textfield" value={employeeDetails.taxPayable || ''} />
                </div>
                <button
                    className="submit"
                    onClick={this.onSubmit}
                    disabled={!employeeDetails.fullName || !employeeDetails.email || !employeeDetails.grossSalary}
                >
                    SUBMIT
                </button>
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     employeeDetailsSta: state.employee.employeeDetails,
// });

const mapDispatchToProps = dispatch => ({
    employeeActions: bindActionCreators(employeeActions, dispatch),
});

export default connect(null, mapDispatchToProps)(AddEmployee);