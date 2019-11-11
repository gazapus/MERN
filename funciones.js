module.exports.primeraLetraAMayuscula = function (str) {
    //Declaracion de un arreglo de cadenas que copiara al arreglo original pero con las palabras capitalizadas
    let arregloStr = [];
    let letraPrevia = " ";
    for (let i = 0; i < str.length; i++) {
        //Si la letra anterior a la actual que se esta recorriendo fue un espacio entonces esta sera mayuscula ya que es una nueva palabra
        if (letraPrevia == " ") {
            arregloStr.push(str[i].toUpperCase());
        } else {
            arregloStr.push(str[i]);
        }
        letraPrevia = str[i];
    }
    //Declaracion de un nuevo string que contendrÃ¡ los valores del arreglo con las palabras capitalizadas
    let nuevoStr = "";
    for (letra of arregloStr) {
        nuevoStr += letra;
    }
    return nuevoStr;
}
