export const deleteActivity = (id:number) =>{
    return {
        type: 'DELETE',
        payload: id
    };
};