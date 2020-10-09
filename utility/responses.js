const errorResponse = (err, res, code, message) => {
    if(err) console.log(err);
    res.writeHead(code, {'Content-Type': 'application/json'})
    let errorMessage = {error: true, message: message}
    res.end(JSON.stringify(errorMessage));
}

const objectResponse = (res, code, object) => {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object));
}

const headResponse = (res, code) => {
    res.writeHead(code);
    res.end();
}

module.exports = {errorResponse, objectResponse, headResponse}