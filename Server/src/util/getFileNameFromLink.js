function getFileName(path){
    return path.split("/").pop();
}

module.exports ={
    getFileName
}