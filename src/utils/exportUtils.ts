import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = async () => {
  const element = document.getElementById('main-content');
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  
  const date = new Date().toISOString().split('T')[0];
  pdf.save(`PQ_Dashboard_Report_${date}.pdf`);
};

export const exportToExcel = async () => {
  const element = document.getElementById('main-content');
  if (!element) return;

  // Extract tables from the page
  const tables = element.querySelectorAll('table');
  const workbook = XLSX.utils.book_new();

  if (tables.length > 0) {
    tables.forEach((table, index) => {
      const worksheet = XLSX.utils.table_to_sheet(table);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Sheet${index + 1}`);
    });
  } else {
    // Create a summary sheet with visible text content
    const data: string[][] = [];
    
    // Extract KPI cards data
    const kpiCards = element.querySelectorAll('[class*="card"]');
    kpiCards.forEach((card) => {
      const title = card.querySelector('h3, [class*="title"]')?.textContent;
      const value = card.querySelector('[class*="value"], .text-2xl, .text-3xl')?.textContent;
      if (title && value) {
        data.push([title, value]);
      }
    });

    if (data.length === 0) {
      data.push(['Dashboard Report', new Date().toLocaleDateString()]);
      data.push(['No tabular data found on this page']);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  }

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `PQ_Dashboard_Report_${date}.xlsx`);
};
