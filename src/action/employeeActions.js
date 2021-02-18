import constant from '../constants/index';

export const setEmployeeDetails = (employeeDetails, employeeIndex) => dispatch => {
    dispatch({
        type: constant.SET_EMPLOYEES,
        payload: {
            employeeDetails,
            employeeIndex
        }
    });
}