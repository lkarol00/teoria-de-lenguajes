var stdin = process.openStdin();
var terminales = [], noTerminales = [], i = 1, texto, maxNTerm, maxTerm, texto, producciones = {};
var terminal, noTerminal, lD = false, nLD = false, err = false, salida = false;
console.log("Para terminar de ingresar la gramática, escriba q.\n"+i+"."); 

const expNTerminales = new RegExp(/<[A-Z]>/, 'g');
const expRegular = new RegExp(/<[A-Z]>->[a-z]*<[A-Z]>/, 'g');
const expRegularC = new RegExp(/<[A-Z]>->((<[A-Z]>)|([a-z]))*/, 'g');
const expRegularT = new RegExp(/<[A-Z]>->[a-z]/, 'g');
const expRegularLambda = new RegExp(/<[A-Z]>->λ/, 'g');

stdin.addListener("data", data => {
    prod = data.toString().replace(/ /g, "");

    if (prod.match(expRegular) || prod.match(expRegularT) || prod.match(expRegularLambda)) lD = true;
    else if ( prod.match(expRegularC) ) nLD = true; 
    else err = true;
    console.log(lD, nLD, err)

    salida = prod === "q\r\n";

    [texto, maxNTerm] = buscarNoTerminales(prod);
    maxTerm = buscarTerminales(texto);

    if(maxTerm || maxNTerm){
        console.log("El número de terminales o no terminales es incorrecto.\n");
        limpiar();
    } else if ((!verify(terminales, noTerminales, prod) || err) &&  !salida) {
        if(i !== 1)console.log("La producción tiene errores de sintaxis.");
        console.log(i+".");
        err = false;
    } else {
        if(!salida){
            producciones[i] = {NoTerminal: prod.substr(0, 3), Terminal: prod.substr(5, 1), Resto: prod.substr(6, prod.length)};
            i++;
        } else {
            if(nLD) console.log('La gramática no de la forma lineal derecha.');
            else if (lD) console.log('La gramática es de la forma lineal derecha');
            else console.log("No ha ingresado ninguna gramática.")
            imprimir();
            limpiar();
        }
        if (!salida) console.log(i + '.');
    }
});

function limpiar(){
    s = false, q = false, nLD = false, err = false;
    i = 1;
    maxNTerm = false, maxTerm = false, texto = "";
    terminales = [], noTerminales = [];
    producciones = {}
    console.log("Presione enter para ingresar otra gramática.");
}

function buscarNoTerminales(cadena){
    var car, term, arr = [], i = cadena.length, nArr = [];
    cadena = cadena.replace("->","");
    while(i > 0){
        car = cadena.indexOf("<");
        if(car === -1) break;
        term = cadena.substr(car, 3);
        cadena = cadena.replace(term, "");
        noTerminales.push(term);
        i--;
    }
    noTerminales = Array.from(new Set(noTerminales));
    return [cadena, noTerminales.length > 5 ? true : false];
}

function buscarTerminales(cadena){
    var caracteres, arr = [], nArr = [];
    caracteres = cadena.split("");
    arr = caracteres.filter(caracter => (caracter === "a" || caracter === "b" || caracter === "c" || caracter === "d" || caracter === "e" || caracter === "f" || caracter === "g" || caracter === "h" || caracter === "λ" || caracter === "i" || caracter === "j" || caracter === "k" || caracter === "l" || caracter === "m" || caracter === "n" || caracter === "o" || caracter === "p" || caracter === "q" || caracter === "r" || caracter === "s" || caracter === "t" || caracter === "u" || caracter === "v" || caracter === "w" || caracter === "x" || caracter === "y" || caracter === "z"));
    terminales = terminales.concat(arr);
    if(terminales.indexOf("λ") !== -1) terminales.splice(terminales.indexOf("λ"), 1);
    terminales = Array.from(new Set(terminales));
    return terminales.length > 3 ? true : false; 
}

function verify(term, nTerm, cadena){
    term.forEach(t => cadena = cadena.replaceAll(t, ""));
    cadena = cadena.replaceAll("λ", "");
    nTerm.forEach(nt => cadena = cadena.replaceAll(nt, ""));
    return cadena.length === 4 ? true : false; 
}

function imprimir(){
    for(k in producciones){
        console.log(k+"."+ producciones[k].NoTerminal+"->"+producciones[k].Terminal+producciones[k].Resto);
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};