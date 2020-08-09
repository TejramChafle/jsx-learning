import * as actions from './actions';

const initialState = {
    students: [],
    updated: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    // console.log(state, action);
    switch(action.type) {
        case actions.GET_STUDENTS:
            return {
                ...state,
                students: action.students,
                error: action.error
            }
        case actions.ADD_STUDENT:
            return {
                ...state,
                student: action.student
            }
        case actions.UPDATE_STUDENT:
            return {
                ...state,
                student: action.student,
                error: action.error
            }
        case actions.DELETE_STUDENT:
            console.log(action);
            return {
                ...state,
                updated: action.updated
            }
        default:
            return state;
    }
}

export default reducer;