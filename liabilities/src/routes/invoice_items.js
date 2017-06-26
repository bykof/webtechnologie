import express from "express";
import Invoice from "../models/invoice";
import InvoiceItem from "../models/invoice_item";


let router = express.Router();

router.route("/")
/*
 * Will create role on the invoice for the user.
 * User ID can't already exist for the invoice. If it does, it's role has to be
 * changed with the PUT method.
 * invoice_id: ID of the invoice on which items shall be attached on.
 * user_id: ID of the user to be attached.
 * role: Role of the attached user. Either creditor (get money) or debtor (give money).
 * advanced_money: The money the credit has advanced for the invoice.
 */
  .post((req, res) => {
    
    ['invoice_id', 'user_id', 'role', 'advanced_price'].forEach(
      (key) => {
        if (!(key in req.body) && !req.body[key]) return res.status(400).json({[key]: 'missing'});
      }
    );
    
    // Check if passed invoice id exists.
    Invoice.count({_id: req.body.invoice_id}, (err, count) => {
      if (count <= 0) {
        return res.status(400).json({
          id: "Invoice with this ID not found."
        });
      }
      else {
        // Create the item.
        let new_invoice_item = InvoiceItem({
          invoice_id: req.body.invoice_id,
          user_id: req.body.user_id,
          role: req.body.role,
        });
        
        if (new_invoice_item.role === "creditor") {
          new_invoice_item.advanced_price = req.body.advanced_price;
        }
        
        new_invoice_item.save(
          (err) => {
            if (err) return res.status(400).json({"error": err});
            
            // Search invoice and add invoice item.
            Invoice.findOne(
              {
                _id: new_invoice_item.invoice_id
              },
              (error, invoice_found) => {
                if (err) return res.status(400).json(error);
                
                if (invoice_found) {
                  invoice_found.invoice_items.push(new_invoice_item);
                  
                  invoice_found.save(
                    (err) => {
                      if (err) return res.status(400).json({"error": err});
                      
                      return res.json({
                        invoice_item_id: new_invoice_item._id
                      })
                    }
                  );
                }
              }
            );
          }
        );
      }
    })
  })
  
  /*
   * Will update the role of the user. Can only be changed from creditor to debtor
   * or vice versa.
   * invoice_item_id: Required.
   */
  .put((req, res) => {
    if (!req.body["invoice_item_id"]) {
      return res.json({
        "invoice_item_id": "Missing."
      });
    }
    
    InvoiceItem.count({_id: req.body["invoice_item_id"]}, (err, count) => {
      if (count <= 0) {
        return res.json({
          "id": "Invoice item with this ID not found."
        });
      }
      else {
        InvoiceItem.findOne({
            _id: req.body["invoice_item_id"]
          },
          (err, item_found) => {
            if (item_found) {
              item_found.role = req.body["role"];
              
              item_found.save((err) => {
                if (err) return res.json({"error": err});
                else {
                  return res.json({
                    invoice_item_id: item_found._id
                  })
                }
              });
            }
          });
      }
    })
  })
  
  /*
   * Will delete an invoice item if it exists.
   */
  .delete((req, res) => {
    if (!req.body["invoice_item_id"]) {
      return res.json({
        "invoice_item_id": "Missing."
      });
    }
    
    InvoiceItem.count({_id: req.body["invoice_item_id"]}, (err, count) => {
      if (count <= 0) {
        return res.json({
          "id": "Invoice item with this ID not found."
        });
      }
      else {
        InvoiceItem.findOne({
            _id: req.body["invoice_item_id"]
          },
          (err, item_found) => {
            if (item_found) {
              item_found.delete((err) => {
                if (err) return res.json({"error": err});
                else {
                  return res.json({
                    invoice_item_id: "Deleted"
                  })
                }
              });
            }
          });
      }
    })
  });
export default router;