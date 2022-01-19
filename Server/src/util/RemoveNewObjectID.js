function removeNewObjectID(objectID){
    return objectID.replace(/{|_id|:|new|ObjectId|[(]|[)]|}|\s|"/g,''); // \s is space
}
function removeArrayNewObjectID(arrayObjectID){
    var newArrayObjectID = [];
    for (objectId of arrayObjectID){
        newArrayObjectID.push(removeNewObjectID(objectId.toString()));
    }
    return newArrayObjectID;
}
function addObjectID(objectID){
    return 'ObjectId("'+objectID+'")';
}


module.exports = {
    removeNewObjectID,
    removeArrayNewObjectID,
    addObjectID
}