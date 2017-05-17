import tesseract from "tesseract.js";
import request from "request";
import fs from "fs";

class OCRScanner {

    /*
     *
     */
    scanRemote(file_url) {
        let url_arr = file_url.split("/");
        let filename = "tmp/" + url_arr[url_arr.length-1];
        let writeStream = fs.createWriteStream(filename);

        return new Promise((resolve, reject) => {
                    request(file_url).pipe(writeStream).on("close", () => {
                        tesseract.recognize(filename)
                            .progress((p) => { console.log(p)})
                            .catch(err => reject(err))
                            .then((result) => {
                                resolve(result.text);
                            })
                    });
                }
        );
    }
}

export default OCRScanner;