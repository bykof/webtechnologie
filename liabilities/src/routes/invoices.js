import express from "express";
import ocrScanner from "../scanners/ocr_scanner";
import receiptScanner from "../scanners/receipt_scanner";
import Invoice from "../models/invoice";


let router = express.Router();

router.route("/")
/*
 * Will return full receipt info. Requires:
 * invoice_id.
 */
  .get((req, res) => {
    /* Dev options */
    if (req.query.dev == "all") {
      Invoice.find({},
        (err, doc) => {
          if (doc) res.json(doc);
        });
    }
    else if (!req.query.id) {
      res.json({
        "id": "Missing. Please pass with id=value."
      });
    }
    else {
      Invoice.findOne({
          _id: req.query.id
        },
        (err, doc) => {
          if (doc) res.json(doc);
        });
    }
  })
  
  /*
   * Will be called from front-end service.
   * Will create a liability based on a bill. Requires:
   * file_url: The url of the uploaded receipt.
   * user_id: The user who is creating the Invoice.
   */
  .post((req, res) => {
    // If user id is not given return an error response
    if (!req.body.user_id) {
      return res.status(400).json(
        {
          "user_id": "Missing"
        }
      );
    }
    
    let ocr_scanner = new ocrScanner();
    let receipt_scanner = new receiptScanner();
    
    // Create an new invoice
    let new_invoice = Invoice({
      file_url: req.body.file_url,
      user_id: req.body.user_id,
      group_id: req.body.group_id,
      total_price: req.body.total_price
    });
    
    // Create a function to save the invoice and return the response
    function save_invoice() {
      new_invoice.save(
        (err) => {
          if (err) return res.json({"error": err});
          
          return res.json({invoice: new_invoice});
        }
      );
    }
    
    if (req.body.file_url) {
      ocr_scanner.scanRemote(req.body.file_url).then(
        (result) => {
          receipt_scanner.extractTotalPrice(result).then(
            (result) => {
              // Set the price of the model and save
              new_invoice.total_price = result;
              return save_invoice();
            }
          ).catch(
            (error) => {
              console.log(error);
              return res.json({
                "error": error
              });
            }
          );
        }
      ).catch(
        (error) => {
          console.error(error);
          return  res.json({
            "error": error
          });
        }
      );
    } else {
      return save_invoice();
    }
    
  })
  
  .put((req, res) => {
    if (!req.body["id"]) {
      res.json({
        "id": "Missing."
      });
    }
    if (!req.body["total_price"]) {
      res.json({
        "total_price": "Missing."
      });
    }
    else {
      Invoice.findOne({_id: req.body["id"]}, (err, invoice_found) => {
        if (invoice_found) {
          if (req.body["total_price"])
            invoice_found.total_price = req.body["total_price"];
          
          invoice_found.save((err) => {
            if (err) res.json({"error": err});
            else res.json(invoice_found);
          });
        }
      })
    }
  });

export default router;