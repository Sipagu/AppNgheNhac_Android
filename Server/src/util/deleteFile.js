const {pathSongMusic, pathUserImage} = require('./path');
const {pathSongImage} = require('./path');
const {pathSingerImage} = require('./path');
const {pathPlaylistImage} = require('./path');
const {pathAlbumImage} = require('./path');
const {pathCategoryImage} = require('./path');
var fs = require('fs');

function deleteSong(fileName){
    const path = pathSongMusic + fileName;
    deleteFile(path);
}

function deleteSongImage(fileName){
    const path = pathSongImage + fileName;
    deleteFile(path);
}
function deleteSingerImage(fileName){
    const path = pathSingerImage + fileName;
    deleteFile(path);
}
function deletePlaylistImage(fileName){
    const path = pathPlaylistImage + fileName;
    deleteFile(path);
}
function deleteAlbumImage(fileName){
    const path = pathAlbumImage + fileName;
    deleteFile(path);
}
function deleteAvatarUser(fileName) {
    const path = pathUserImage + fileName;
    deleteFile(path)
}
function deleteCategoryImage(fileName) {
    const path = pathCategoryImage + fileName;
    deleteFile(path)
}

function deleteFile(path){
    fs.stat(path, function (err, stats) {
        console.log(stats); //here we got all information of file in stats variable
        if (err) {
            return console.error(err);
        }
        fs.unlink(path,function(err){
             if(err) return console.log(err);
             console.log('file deleted successfully');
        });  
     });
}

module.exports = {
    deleteSong,
    deleteSongImage,
    deleteSingerImage,
    deletePlaylistImage,
    deleteAlbumImage,
    deleteAvatarUser,
    deleteCategoryImage
}