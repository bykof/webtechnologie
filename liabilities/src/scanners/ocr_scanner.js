import tesseract from "tesseract.js";
import easyimage from "easyimage";
import request from "request";
import fs from "fs";

class OCRScanner {

    /*
    * Will crop the image to 50% in width in order to speed
    * up OCR scanning (less image = less time).
    */
    cropAndOverride(file_path) {
        console.log("Cropping image...");
        return new Promise((resolve, reject) => {
            easyimage.info(file_path)
                .then((info_obj => {
                    // Crop image
                    easyimage.crop({
                        src: file_path,
                        dst: file_path,
                        cropwidth: info_obj.width,
                        x: info_obj.width/2,
                    }).then(
                        (image) => {
                            resolve(image);
                        },
                        (err) => {
                            reject(err);
                        })
                }))
        });
    }

    /*
     * Will download the passed file_url to a local folder and
     * then proceed to ocr the image on promise.
     */
    scanRemote(file_url) {
        console.log("Downloading file...");

        let url_arr = file_url.split("/");
        let filename = "tmp/" + url_arr[url_arr.length-1];
        let writeStream = fs.createWriteStream(filename);

        return new Promise((resolve, reject) => {
                    request(file_url).pipe(writeStream).on("close", () => {
                        this.cropAndOverride(filename)
                            .catch((error) => {
                                console.error(error);
                            })
                            .then((image) => {
                                console.log("Crop successful...");
                                // OCR scan
                                tesseract.recognize(filename)
                                    .progress((p) => { console.log(p)})
                                    .catch(err => reject(err))
                                    .then((result) => {
                                        resolve(result.text);
                                    })
                            })
                    });
                }
        );
    }
}

export default OCRScanner;