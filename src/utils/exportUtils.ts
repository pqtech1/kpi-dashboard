import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ChartData {
  name: string;
  data: Record<string, string | number>[];
}

// Extract data from the page for export
const extractPageData = () => {
  const element = document.getElementById('main-content');
  if (!element) return { tables: [], charts: [], kpis: [] };

  // Extract KPI data
  const kpis: { title: string; value: string; trend?: string }[] = [];
  const kpiCards = element.querySelectorAll('[class*="stat-card"], .glass-card');
  kpiCards.forEach((card) => {
    const title = card.querySelector('p.text-muted-foreground, .text-sm')?.textContent?.trim();
    const value = card.querySelector('.text-2xl, .text-3xl, .font-bold')?.textContent?.trim();
    if (title && value) {
      kpis.push({ title, value });
    }
  });

  // Extract table data
  const tables: { headers: string[]; rows: string[][] }[] = [];
  const tableElements = element.querySelectorAll('table');
  tableElements.forEach((table) => {
    const headers: string[] = [];
    const rows: string[][] = [];
    
    table.querySelectorAll('thead th').forEach((th) => {
      headers.push(th.textContent?.trim() || '');
    });
    
    table.querySelectorAll('tbody tr').forEach((tr) => {
      const row: string[] = [];
      tr.querySelectorAll('td').forEach((td) => {
        row.push(td.textContent?.trim() || '');
      });
      if (row.length > 0) rows.push(row);
    });
    
    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  });

  // Extract chart titles for reference
  const charts: ChartData[] = [];
  const chartCards = element.querySelectorAll('[class*="ChartCard"], .recharts-wrapper');
  chartCards.forEach((card) => {
    const title = card.closest('[class*="card"]')?.querySelector('h3, [class*="title"]')?.textContent?.trim();
    if (title) {
      charts.push({ name: title, data: [] });
    }
  });

  return { tables, charts, kpis };
};

export const exportToPDF = async () => {
  const element = document.getElementById('main-content');
  if (!element) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(33, 37, 41);
  pdf.text('Production Quality Dashboard Report', margin, yPosition);
  yPosition += 10;

  // Date
  pdf.setFontSize(10);
  pdf.setTextColor(108, 117, 125);
  pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, margin, yPosition);
  yPosition += 15;

  // Extract data
  const { tables, kpis } = extractPageData();

  // KPIs Section
  if (kpis.length > 0) {
    pdf.setFontSize(14);
    pdf.setTextColor(33, 37, 41);
    pdf.text('Key Performance Indicators', margin, yPosition);
    yPosition += 8;

    const kpiData = kpis.map(kpi => [kpi.title, kpi.value]);
    
    autoTable(pdf, {
      startY: yPosition,
      head: [['Metric', 'Value']],
      body: kpiData,
      margin: { left: margin, right: margin },
      styles: { 
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      tableWidth: pageWidth - (margin * 2),
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 15;
  }

  // Tables Section
  tables.forEach((table, index) => {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(12);
    pdf.setTextColor(33, 37, 41);
    pdf.text(`Data Table ${index + 1}`, margin, yPosition);
    yPosition += 6;

    autoTable(pdf, {
      startY: yPosition,
      head: table.headers.length > 0 ? [table.headers] : undefined,
      body: table.rows,
      margin: { left: margin, right: margin },
      styles: { 
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
      },
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      tableWidth: pageWidth - (margin * 2),
      columnStyles: {
        0: { cellWidth: 'auto' },
      },
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 15;
  });

  // Capture charts as images
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(14);
  pdf.setTextColor(33, 37, 41);
  pdf.text('Charts & Visualizations', margin, yPosition);
  yPosition += 10;

  // Capture the main content as an image for charts
  try {
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image across multiple pages if needed
    let remainingHeight = imgHeight;
    let sourceY = 0;

    while (remainingHeight > 0) {
      const availableHeight = pageHeight - yPosition - margin;
      const heightToDraw = Math.min(remainingHeight, availableHeight);
      
      if (heightToDraw > 20) {
        pdf.addImage(
          imgData, 
          'PNG', 
          margin, 
          yPosition, 
          imgWidth, 
          imgHeight,
          undefined,
          'FAST'
        );
      }

      remainingHeight -= heightToDraw;
      sourceY += heightToDraw;

      if (remainingHeight > 0) {
        pdf.addPage();
        yPosition = margin;
      }
    }
  } catch (error) {
    console.error('Error capturing charts:', error);
  }

  const date = new Date().toISOString().split('T')[0];
  pdf.save(`PQ_Dashboard_Report_${date}.pdf`);
};

export const exportToExcel = async () => {
  const element = document.getElementById('main-content');
  if (!element) return;

  const workbook = XLSX.utils.book_new();
  const { tables, kpis } = extractPageData();

  // Summary Sheet with KPIs
  const summaryData: (string | number)[][] = [
    ['Production Quality Dashboard Report'],
    [`Generated: ${new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`],
    [''],
    ['Key Performance Indicators'],
    ['Metric', 'Value'],
  ];

  kpis.forEach(kpi => {
    summaryData.push([kpi.title, kpi.value]);
  });

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Set column widths
  summarySheet['!cols'] = [
    { wch: 30 },
    { wch: 20 },
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // Data Tables
  if (tables.length > 0) {
    tables.forEach((table, index) => {
      const tableData: string[][] = [];
      if (table.headers.length > 0) {
        tableData.push(table.headers);
      }
      tableData.push(...table.rows);

      const worksheet = XLSX.utils.aoa_to_sheet(tableData);
      
      // Auto-size columns
      const maxWidths = tableData.reduce((acc, row) => {
        row.forEach((cell, i) => {
          const len = String(cell).length;
          acc[i] = Math.max(acc[i] || 10, len);
        });
        return acc;
      }, [] as number[]);
      
      worksheet['!cols'] = maxWidths.map(w => ({ wch: Math.min(w + 2, 50) }));

      XLSX.utils.book_append_sheet(workbook, worksheet, `Data ${index + 1}`);
    });
  }

  // Chart Data Sheet (placeholder with available metrics)
  const chartDataSheet: (string | number)[][] = [
    ['Chart Data Export'],
    [''],
    ['Note: Chart visualizations are graphical representations.'],
    ['For detailed chart data, please refer to the source data tables above.'],
    [''],
    ['Available Metrics:'],
  ];

  kpis.forEach(kpi => {
    chartDataSheet.push([`• ${kpi.title}: ${kpi.value}`]);
  });

  const chartSheet = XLSX.utils.aoa_to_sheet(chartDataSheet);
  chartSheet['!cols'] = [{ wch: 50 }];
  XLSX.utils.book_append_sheet(workbook, chartSheet, 'Chart Info');

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `PQ_Dashboard_Report_${date}.xlsx`);
};
