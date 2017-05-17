import request from "request";
import fs from "fs";

class OCRScanner {

    /*
    * Will download a remote file and return its path.
    */
    downloadImage(file_url) {
        let url_arr = file_url.split("/");
        let filename = url_arr[url_arr.length-1];

        let writeStream = fs.createWriteStream(filename);

        request(file_url).pipe(writeStream).on("close", function() {
            console.log(file_url, 'saved to', filename)
        });
    }
}

export default OCRScanner;