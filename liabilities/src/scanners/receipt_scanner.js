class ReceiptScanner {
  
  /*
   * Will scan the text output of the OCR scan for the highest
   * float number (payed money) and return that on promise.
   */
  extractTotalPrice(ocr_scan) {
    
    let max_price = 0;
    let lines = ocr_scan.split("\n");
    
    return new Promise((resolve, reject) => {
      lines.forEach((l) => {
        let words = l.split(" ");
        
        words.forEach((w) => {
          if (w.match(/^\d+[\.,]\d\d$/g)) {
            console.log('Found Price: ', w);
            let parsed = parseFloat(w.replace(',', '.'));
            if (parsed && parsed > max_price) {
              max_price = parsed;
            }
          }
        });
      });
      console.log("Highest price: " + max_price);
      resolve(max_price);
    });
  }
}

export default ReceiptScanner;