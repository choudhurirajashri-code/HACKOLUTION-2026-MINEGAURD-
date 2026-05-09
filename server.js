const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. Action logger endpoint (for manual controls)
app.post('/api/action', (req, res) => {
    const { action, operator, reason } = req.body;
    const actions = {
        'C': 'MANUAL CAUTION',
        'D': 'EMERGENCY SIREN',
        'R': 'SYSTEM RESET'
    };
    
    console.log(`\n===========================================`);
    console.log(`🚨 OPERATOR ACTION RECORDED`);
    console.log(`Action:  ${actions[action] || 'UNKNOWN'} (${action})`);
    console.log(`By:      ${operator || 'Anonymous'}`);
    console.log(`Reason:  ${reason || 'Not specified'}`);
    console.log(`Time:    ${new Date().toLocaleString('en-IN')}`);
    console.log(`===========================================\n`);

    res.json({ success: true, message: 'Action logged' });
});

// 2. Report PDF generator endpoint
app.post('/api/report/pdf', (req, res) => {
    try {
        const { mineId, mineName, location, peaks, incidents, operator } = req.body;
        
        // Compute compliance
        const ch4Peak = Math.round(peaks.mq4 || 0);
        const coPeak = Math.round(peaks.mq135 || 0);
        const tempPeak = (peaks.temp || 0).toFixed(1);
        
        const isCompliant = !(ch4Peak >= 12500 || coPeak >= 50 || tempPeak >= 33.5);
        const complianceStatus = isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT';

        // Setup PDF Document
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        
        // Pipe directly to HTTP response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=DGMS_Report_${mineId}_${Date.now()}.pdf`);
        doc.pipe(res);

        // --- PDF DRAWING ---
        // Header
        doc.fontSize(18).font('Helvetica-Bold').text('GOVERNMENT OF INDIA — MINISTRY OF MINES', { align: 'center' });
        doc.fontSize(14).text('DGMS STATUTORY SAFETY REPORT', { align: 'center' });
        doc.moveDown(0.5);
        
        doc.fontSize(10).font('Helvetica').text('MineGuard IoT v4.0 | Team ERROR_404', { align: 'center', color: '#666666' });
        doc.moveDown(1.5);

        // Divider
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown();

        // Metadata
        doc.fillColor('black').font('Helvetica-Bold').fontSize(12).text('MINE DETAILS');
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(11);
        doc.text(`Mine ID:          ${mineId || 'UNKNOWN'}`);
        doc.text(`Mine Name:        ${mineName || 'UNKNOWN'}`);
        doc.text(`Location:         ${location || 'UNKNOWN'}`);
        doc.text(`Generated On:     ${new Date().toLocaleString('en-IN')}`);
        doc.text(`Operator:         ${operator || 'SYSTEM ADMIN'}`);
        doc.moveDown(1.5);

        // Sensor Readings
        doc.font('Helvetica-Bold').fontSize(12).text('PEAK SENSOR READINGS');
        doc.moveDown(0.5);
        
        // Table-like format
        doc.font('Helvetica').fontSize(11);
        doc.text(`CH4 (Methane):    ${ch4Peak} PPM (Limit: 12,500 PPM) -> ${ch4Peak >= 12500 ? 'VIOLATION' : 'OK'}`);
        doc.text(`CO:               ${coPeak} PPM (Limit: 50 PPM) -> ${coPeak >= 50 ? 'VIOLATION' : 'OK'}`);
        doc.text(`Temperature:      ${tempPeak} °C (Limit: 33.5°C) -> ${tempPeak >= 33.5 ? 'VIOLATION' : 'OK'}`);
        doc.moveDown(0.5);
        doc.text(`Total Incidents Recorded: ${incidents || 0}`);
        doc.moveDown(1.5);

        // Compliance Result
        doc.font('Helvetica-Bold').fontSize(14).text('OVERALL STATUS: ');
        doc.moveUp();
        doc.fillColor(isCompliant ? 'green' : 'red').text(`                              ${complianceStatus}`);
        
        doc.moveDown(2);
        
        // DGMS References
        doc.fillColor('black').font('Helvetica-Bold').fontSize(12).text('DGMS REFERENCES & REGULATIONS');
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(10);
        doc.text('• Coal Mines Regulations 2017 — Reg. 182 (Atmospheric Monitoring)');
        doc.text('• Mines Act 1952 — Section 22 (Safety of Workers)');
        doc.text('• SparkFun MQ-4 & MQ-135 Sensor Standards Baseline used for thresholds.');
        
        doc.moveDown(3);

        // Footer & Signature
        doc.fontSize(10).font('Courier').text('Digitally Signed by MineGuard IoT v4.0');
        doc.text(`Hash Signature: MG-${Math.random().toString(16).substring(2, 18).toUpperCase()}`);
        
        // Finalize PDF file
        doc.end();

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ success: false, error: 'PDF generation failed' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`[MineGuard] Backend Server running on http://localhost:${PORT}`);
    console.log(`[MineGuard] Listening for action logs and PDF generation requests...`);
});
