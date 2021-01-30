export const increment = (amount:number = 0) =>{
    return {
        type: 'INCREMENT',
        payload: amount
    };
};