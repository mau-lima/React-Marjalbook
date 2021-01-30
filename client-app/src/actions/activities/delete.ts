export const deleteActivity = (id:string) =>{
    return {
        type: 'DELETE',
        payload: id
    };
};