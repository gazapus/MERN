const defaultState = {
  saludo: "Hola Mundo",
  valor: 1
}

function reducer(state = defaultState, action){
    switch(action.type){
        case 'holaMundo': {
            return {
              saludo: "hola mundo",
              valor: ++state.valor
            }
        }
        case 'chauMundo': {
            return {
              saludo: "chau mundo",
              valor: --state.valor
            }
        }
        default:
             return state;
    }
}

export default reducer;