import tesseract from "tesseract.js";
import request from "request";
import fs from "fs";

class OCRScanner {

    /*
    * Will download a remote file and return its name.
    */
    scanRemote(file_url) {
        let url_arr = file_url.split("/");
        let filename = "tmp/" + url_arr[url_arr.length-1];
        let writeStream = fs.createWriteStream(filename);

        request(file_url).pipe(writeStream).on("close", function() {

            tesseract.recognize(filename)
                .progress((p) => { console.log(p) })
                .catch(err => console.error(err))
                .then((result) => {
                    console.log(result.text);
                })
        });
    }
}

export default OCRScanner;