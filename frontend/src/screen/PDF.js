import React from "react";
import Pdf from "react-to-pdf";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import "./PDF.css";

const ref = React.createRef();

export const PDF = ({ billInfo, qty, grand, gst, name, phone, tracking }) => {
  let subTotal;
  let gstcont = parseInt(gst);
  let GrandTotal = grand + gstcont;

  return (
    <>
      <div className="Post" ref={ref}>
        <div className="container">
          <div className="brand-section">
            <div className="row">
              <div className="col-6">
                {/* <h1 className="text-white">Ukken Vasthralaya</h1> */}
                <img
                  src="images/UK-Logo.png"
                  width="130px"
                  height="auto"
                  style={{ color: "white" }}
                />
              </div>
              <div className="col-6">
                <div className="company-details">
                  <p className="text-white">Ukken Vasthrala</p>
                  <p className="text-white">Vellangallur - 680662</p>
                  <p className="text-white">Phone : 9526613151</p>
                </div>
              </div>
            </div>
          </div>

          <div className="body-section">
            <div className="row">
              <div className="col-6">
                <h2 className="heading">Invoice No:- {tracking}</h2>
                <p className="sub-heading">Tracking No. {tracking} </p>
                <p className="sub-heading">
                  Billing Date:{" "}
                  {`${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`}{" "}
                </p>
                {/* <p className="sub-heading">Billing Date: 20-20-2021 </p> */}
              </div>
              <div className="col-6">
                <p className="sub-heading">Full Name: {name}</p>
                <p className="sub-heading">Phone Number: {phone}</p>
              </div>
            </div>
          </div>

          <div className="body-section">
            <h3 className="heading">Ordered Items</h3>
            <br />
            <table className="table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="w-20">Size</th>
                  <th className="w-20">Discount</th>
                  <th className="w-20">Rate</th>
                  <th className="w-20">Quantity</th>
                  <th className="w-20">Amount</th>
                </tr>
              </thead>
              <tbody>
                {billInfo &&
                  billInfo.map((data) => {
                    let qtyRate = data.SellingPrice * data.qtyVal;
                    // grand = grand + qtyRate - data.SellingPrice;
                    //

                    subTotal = data.SellingPrice * data.qtyVal - data.Discount;
                    return (
                      <tr>
                        <td>{data.ProductName}</td>
                        <td>{data.Size}</td>
                        <td>{data.Discount}</td>
                        <td>{data.SellingPrice.toLocaleString("en-US")}</td>
                        <td>{data.qtyVal}</td>
                        <td>{subTotal.toLocaleString("en-US")}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <td colspan="3" className="text-right">
                    Sub Total
                  </td>
                  <td>{grand.toLocaleString("en-US")}</td>
                </tr>
                <tr>
                  <td colspan="3" className="text-right">
                    GST Total
                  </td>
                  <td>{gst}</td>
                </tr>
                <tr>
                  <td colspan="3" className="text-right">
                    Grand Total
                  </td>
                  <td>{GrandTotal.toLocaleString("en-US")}</td>
                </tr>
              </tbody>
            </table>
            <br />
            {/* <h3 className="heading">Payment Status: Paid</h3>
            <h3 className="heading">Payment Mode: Cash on Delivery</h3> */}
          </div>

          <div className="body-section">
            <p>
              &copy; Copyright 2021 - ukkensVasthralaya. All rights reserved.
              <a
                href="https://www.ukkensVasthralaya.com/"
                className="float-right"
              >
                https://www.ukkensVasthralaya.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => (
          <Button
            style={{ marginLeft: "35px", marginTop: "10px" }}
            colorScheme="red"
            onClick={toPdf}
          >
            Download as PDF
          </Button>
        )}
      </Pdf>
    </>
  );
};

{
}
