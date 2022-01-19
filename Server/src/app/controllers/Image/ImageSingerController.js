const path = require('path');
var fs = require('fs');

class ImageSingerController {

    // [GET] / 
    index(req, res) {
       res.json({error: true, message: 'Notthing Happened hihihi!!!!'});
    }

    // [GET] /imagesinger/:imageName
    display(req, res) {
        const imageName = req.params.imageName;
        const pathImageSinger = path.join(__dirname, '../../../','public','image', 'singer', imageName);

       
        var extname = path.extname(pathImageSinger);
        var contentType = 'text/html';
        switch (extname) {
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }
        fs.readFile(pathImageSinger, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    res.json({message: 'error ENOENT'});
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end(); 
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });

    }
}

module.exports = new ImageSingerController;