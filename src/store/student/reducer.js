import * as actions from './actions';

const initialState = {
    students: [],
    student: null,
    updated: false
};

const reducer = (state = initialState, action) => {
    console.log(state,action);
    switch(action.type) {
        case actions.GET_STUDENTS:
            return {
                ...state,
                students: action.students
            }
        case actions.ADD_STUDENT:
            return {
                ...state,
                student: {}
            }
        case actions.UPDATE_STUDENT:
            return {
                ...state,
                student: {}
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