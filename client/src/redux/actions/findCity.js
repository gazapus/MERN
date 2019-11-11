export const type = 'findCiy';

const findCity = idCity => {
    return{
        type,
        payload: idCity
    };
};


export default findCity;