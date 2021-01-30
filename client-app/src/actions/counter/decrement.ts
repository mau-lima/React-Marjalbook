export const decrement = (amount:number = 0 ) =>{
    return {
        type: 'DECREMENT',
        payload: amount
    };
};