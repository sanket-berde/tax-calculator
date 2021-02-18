import constant from '../constants'
const initialState = {
    employeeDetailsStack: (localStorage.getItem('employeeDetailsStack') && JSON.parse(localStorage.getItem('employeeDetailsStack'))) || [],
}

export default function employeeReducer(currentState, {
    type,
    payload
}) {
    const state = currentState || initialState;
    switch (type) {

        case constant.SET_EMPLOYEES:
            const employeeDetailsStack = [...state.employeeDetailsStack];
            if (payload.employeeIndex || payload.employeeIndex === 0) {
                employeeDetailsStack[payload.employeeIndex] = payload.employeeDetails;
            } else {
                employeeDetailsStack.push(payload.employeeDetails);
            }

            localStorage.setItem('employeeDetailsStack', JSON.stringify(employeeDetailsStack));
            return {
                employeeDetailsStack,
            };

        default:
            return state;
    }
}