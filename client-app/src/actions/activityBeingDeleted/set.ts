
export const setActivityBeingDeleted = (val: string) =>{
    return {
        type: 'SET_ACTIVITY_BEING_DELETED',
        payload: val
    };
};