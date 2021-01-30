import {IActivity} from "../app/modules/activity";
import {v4 as uuid} from 'uuid';

// interface IAction {
//     type: string;
//     payload?: IActivity | string; 
// };

const activitiesReducer = (state: IActivity[] = [], action: any) => {
    switch(action.type){
        case 'FETCH':{
            console.log('FETCH!');
            let activity: IActivity = {
                id: uuid(),
                title: 'hola',
                description: 'holadesc',
                category: 'drinks',
                date: new Date().toString(),
                city: 'mdp',
                venue:'el poli'
            };

            return [activity]; 
            //todo add a GET feth from the backend
        }
        case 'CREATE':{
            console.log('CREATE!');
            return [...state,action.payload];
            //todo add a POST
        }
        case 'UPDATE':{
            console.log('UPDATE!');
            const allOtherActivities = state.filter(act => act.id !== action.payload.id);
            return [...allOtherActivities, action.payload];
            //todo add a PUT
        }
        case 'DELETE':{
            console.log('DELETE!');
            const allOtherActivities = state.filter(act => act.id !== action.payload);
            return allOtherActivities;
            //todo add a DELETE
        }
        
        default:{
            return state;
        }
    }
}


export default activitiesReducer;