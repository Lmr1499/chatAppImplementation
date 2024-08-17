const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

// Endpoint to generate and view user overview report as PDF
router.get("/user-overview/report", async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin");

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50 });
    const stream = new PassThrough();
    doc.pipe(stream);

    // Title Page
    doc.fontSize(24).text("User Overview Report", {
      align: "center",
      underline: true,
    });

    doc.moveDown();
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, {
      align: "center",
    });

    doc.moveDown(2);
    doc.fontSize(16).text("List of Users", {
      align: "center",
      underline: true,
    });

    doc.moveDown();

    // Table Header
    doc.fontSize(12).font("Helvetica-Bold");
    const headers = ["No.", "Name", "Email", "Role"];
    const columnWidths = [30, 150, 200, 100];
    let x = 50;
    headers.forEach((header, index) => {
      doc.text(header, x, doc.y, { width: columnWidths[index], align: "left" });
      x += columnWidths[index];
    });

    doc.moveDown();

    // User Data
    doc.fontSize(12).font("Helvetica");
    users.forEach((user, index) => {
      const { name, email, isAdmin } = user;
      const role = isAdmin ? "Admin" : "User";

      x = 50;

      // Display row data
      doc.text(`${index + 1}.`, x, doc.y, {
        width: columnWidths[0],
        align: "left",
      });
      doc.text(name, x + columnWidths[0], doc.y, {
        width: columnWidths[1],
        align: "left",
      });
      doc.text(email, x + columnWidths[0] + columnWidths[1], doc.y, {
        width: columnWidths[2],
        align: "left",
      });
      doc.text(
        role,
        x + columnWidths[0] + columnWidths[1] + columnWidths[2],
        doc.y,
        { width: columnWidths[3], align: "left" }
      );

      doc.moveDown(1);
    });

    // End PDF
    doc.end();

    // Set headers to display the PDF in the browser
    res.setHeader(
      "Content-Disposition",
      "inline; filename=user-overview-report.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");
    stream.pipe(res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
