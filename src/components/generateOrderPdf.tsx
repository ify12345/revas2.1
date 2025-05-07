/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf';
import { Order } from '@/types/apiResponse';
import { useAppSelector } from '@/redux/store';

// Define types for the PDF generation
type OrderType = 'PO' | 'SO';

interface GenerateOrderPdfProps {
  order: Order;
  type: OrderType;
}

// Function to safely convert values for use in PDF
const safeValue = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return String(value);
};

// Function to safely convert number values
const safeNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return defaultValue;
  }
  return Number(value);
};

// Function to generate and download a PDF for a purchase order or sales order
export const generateOrderPdf = ({ order, type }: GenerateOrderPdfProps) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Set title based on order type
  const title = type === 'PO' ? 'Purchase Order' : 'Sales Order';
  
  // Set up some measurements
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Add heading
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, 30);
  
  // Add header info (invoice number, dates)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Left side: Invoice Number
  doc.text('Invoice Number', margin, 50);
  doc.setFont('helvetica', 'bold');
  // Generate an invoice number based on the order ID
  const orderId = safeValue(order.id, 'ORDER');
  const invoiceNumber = `${type}${orderId.substring(0, 6).toUpperCase()}`;
  doc.text(invoiceNumber, margin, 58);
  
  // Middle: Document Date
  doc.setFont('helvetica', 'normal');
  doc.text('Document Date', margin + contentWidth / 3, 50);
  doc.setFont('helvetica', 'bold');
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, ' / ');
  doc.text(currentDate, margin + contentWidth / 3, 58);
  
  // Right: Due Date
  doc.setFont('helvetica', 'normal');
  doc.text('Due Date', margin + (contentWidth / 3) * 2, 50);
  doc.setFont('helvetica', 'bold');
  doc.text(currentDate, margin + (contentWidth / 3) * 2, 58);
  
  // Add bill information
  const billFromTitle = type === 'PO' ? 'Bill From' : 'Bill To';
  const billToTitle = type === 'PO' ? 'Bill To' : 'Bill From';
  
  // Bill from section
  doc.setFont('helvetica', 'normal');
  doc.text(billFromTitle, margin, 75);
  doc.setFont('helvetica', 'bold');
  doc.text(safeValue(order.supplierName, 'Supplier Name'), margin, 83);
  doc.setFont('helvetica', 'normal');
  doc.text(safeValue(order.location, 'Location'), margin, 91);
  
  // Bill to section
  doc.setFont('helvetica', 'normal');
  doc.text(billToTitle, margin + contentWidth / 3, 75);
  doc.setFont('helvetica', 'bold');
  const buyerName = type === 'PO' ? 
    safeValue(order.companyName, 'Your Company') : 
    safeValue(order.supplierName, 'Supplier Name');
  doc.text(buyerName, margin + contentWidth / 3, 83);
  doc.setFont('helvetica', 'normal');
  const buyerAddress = 'Company Address';
  doc.text(buyerAddress, margin + contentWidth / 3, 91);
  
  // Incoterms
  doc.text('Incoterms', margin + (contentWidth / 3) * 2, 75);
  doc.setFont('helvetica', 'bold');
  doc.text('EXW', margin + (contentWidth / 3) * 2, 83);
  
  // Payment Terms
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Terms', margin, 110);
  doc.setFont('helvetica', 'normal');
  doc.text('50% upon loading of the', margin, 118);
  doc.text('containers and 50% upon', margin, 126);
  doc.text('release of the export', margin, 134);
  doc.text('documents.', margin, 142);
  
  // Payment Instructions
  doc.text('Payment Instructions', margin + contentWidth / 2, 110);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  // Use bullet points
  doc.text('• Payment is due in 1 day.', margin + contentWidth / 2, 118);
  doc.text('• Account Name: REVAS PLASTIC EXCHANGE', margin + contentWidth / 2, 126);
  doc.text('  Dollar account #: 0922451787', margin + contentWidth / 2, 134);
  doc.text('  Bank: GTbank PLC', margin + contentWidth / 2, 142);
  doc.text('• Please note the invoice number in your payment', margin + contentWidth / 2, 150);
  doc.text('  description.', margin + contentWidth / 2, 158);
  
  // Order detail table headers
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const tableY = 175;
  doc.text('Description', margin, tableY);
  doc.text('Quantity', margin + contentWidth * 0.4, tableY);
  doc.text('Unit Price', margin + contentWidth * 0.6, tableY);
  doc.text('Amount', margin + contentWidth * 0.85, tableY);
  
  // Draw a line below headers
  doc.line(margin, tableY + 3, margin + contentWidth, tableY + 3);
  
  // Order detail table content
  doc.setFont('helvetica', 'normal');
  doc.text(safeValue(order.product, 'Product'), margin, tableY + 15);
  
  const capacity = safeNumber(order.capacity, 0);
  doc.text(`${capacity}MT`, margin + contentWidth * 0.4, tableY + 15);
  
  const pricePerTonne = safeNumber(order.pricePerTonne, 0);
  doc.text(`$${pricePerTonne.toFixed(2)}/MT`, margin + contentWidth * 0.6, tableY + 15);
  
  const totalAmount = capacity * pricePerTonne;
  doc.text(`USD $${totalAmount.toFixed(2)}`, margin + contentWidth * 0.78, tableY + 15);
  
  // Delivery line
  doc.text('Delivery', margin + contentWidth * 0.45, tableY + 30);
  doc.text('EXW', margin + contentWidth * 0.85, tableY + 30);
  
  // Line for total
  doc.line(margin, tableY + 35, margin + contentWidth, tableY + 35);
  
  // Total
  doc.setFont('helvetica', 'bold');
  doc.text('Total (excl. VAT)', margin + contentWidth * 0.4, tableY + 45);
  doc.text(`USD $${totalAmount.toFixed(2)}`, margin + contentWidth * 0.78, tableY + 45);
  
  // Add footer
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('www.revas.com', margin + contentWidth * 0.85, 280);
  
  // Save with file name based on type, order ID and date
  const fileName = `${type}-${orderId.substring(0, 6)}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};

// React hook to use within components
export const useOrderPdf = () => {
  const { user } = useAppSelector(state => state.auth);
  
  const generatePdf = (order: Order) => {
    try {
      // Validate order data before generating PDF
      if (!order) {
        throw new Error("Order data is missing");
      }
      
      // Determine if this is a PO or SO based on user role
      const orderType: OrderType = user?.role === 'buyer' ? 'SO' : 'PO';
      generateOrderPdf({ order, type: orderType });
    } catch (error) {
      console.error("Error in PDF generation:", error);
      throw error; // Re-throw to let the component handle the error
    }
  };
  
  return { generatePdf };
};

export default useOrderPdf;