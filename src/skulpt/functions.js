
let terminal = document.getElementById('terminal-output');

function outputfun(text) {
    if (text === undefined || text === null || text === '') {
        return;
    }
    terminal.innerHTML += text + '>>> ';

}

function inputfun() {
    let responce = prompt('Enter the input');
    return responce;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
export  { outputfun,builtinRead }
