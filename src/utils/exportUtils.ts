// src/utils/exportUtils.ts
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* --------------------------------------------------
   TYPE SAFETY HELPER
-------------------------------------------------- */

const isHTMLElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement;
};

/* --------------------------------------------------
   PDF STYLING HELPER (From your working code)
-------------------------------------------------- */

const applyPDFStyles = (element: HTMLElement) => {
  element.style.backgroundColor = "#ffffff";
  element.style.color = "#000000";
  element.style.fontFamily = "Arial, sans-serif";
  element.style.padding = "20px";

  const tables = element.querySelectorAll("table");
  tables.forEach((table) => {
    if (!isHTMLElement(table)) return;

    table.style.cssText = `
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 10px 0 !important;
      font-family: Arial, sans-serif !important;
    `;

    const thElements = table.querySelectorAll("th");
    thElements.forEach((th) => {
      if (!isHTMLElement(th)) return;
      th.style.cssText = `
        background-color: #f8f9fa !important;
        border: 1px solid #dee2e6 !important;
        padding: 12px 8px !important;
        text-align: left !important;
        font-weight: bold !important;
        color: #212529 !important;
        font-size: 14px !important;
      `;
    });

    const tdElements = table.querySelectorAll("td");
    tdElements.forEach((td) => {
      if (!isHTMLElement(td)) return;
      td.style.cssText = `
        border: 1px solid #dee2e6 !important;
        padding: 10px 8px !important;
        color: #212529 !important;
        font-size: 14px !important;
        background-color: white !important;
      `;
    });
  });

  const cards = element.querySelectorAll(
    ".card, .glass-card, .stat-card, .kpi-card, [class*='card']"
  );
  cards.forEach((card) => {
    if (!isHTMLElement(card)) return;
    card.style.cssText = `
      background: white !important;
      border: 1px solid #e0e0e0 !important;
      border-radius: 4px !important;
      padding: 16px !important;
      margin: 10px 0 !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
    `;
  });

  const allElements = element.querySelectorAll("*");
  allElements.forEach((el) => {
    if (isHTMLElement(el)) {
      el.style.color = "#000000";
      if ("fill" in el.style) {
        (el.style as any).fill = "#000000";
      }
      if ("stroke" in el.style) {
        (el.style as any).stroke = "#000000";
      }
    }
  });
};

/* --------------------------------------------------
   SIMPLE TABLE EXTRACTION ONLY
-------------------------------------------------- */

interface TableData {
  headers: string[];
  rows: string[][];
  title: string;
}

const extractTableData = (): TableData[] => {
  const element = document.getElementById("main-content");
  if (!element) return [];

  const tables: TableData[] = [];
  const tableElements = element.querySelectorAll("table");

  tableElements.forEach((table, index) => {
    const tableData: TableData = {
      title: `Table ${index + 1}`,
      headers: [],
      rows: [],
    };

    // Get table title from surrounding elements
    const parentCard = table.closest(
      '[class*="card"], [class*="ChartCard"], div, section'
    );
    if (parentCard) {
      const titleEl = parentCard.querySelector(
        'h3, h4, h5, [class*="title"], [class*="heading"]'
      );
      if (titleEl) {
        tableData.title = titleEl.textContent?.trim() || tableData.title;
      }
    }

    // Extract headers from thead
    const thead = table.querySelector("thead");
    if (thead) {
      const headerRow = thead.querySelector("tr");
      if (headerRow) {
        headerRow.querySelectorAll("th").forEach((cell) => {
          tableData.headers.push(cell.textContent?.trim() || "");
        });
      }
    }

    // If no headers in thead, try first row with th elements
    if (tableData.headers.length === 0) {
      const firstRow = table.querySelector("tr");
      if (firstRow) {
        firstRow.querySelectorAll("th").forEach((cell) => {
          tableData.headers.push(cell.textContent?.trim() || "");
        });
      }
    }

    // If still no headers, check first row with td elements (might be used as headers)
    if (tableData.headers.length === 0) {
      const firstRow = table.querySelector("tr");
      if (firstRow) {
        const cells = firstRow.querySelectorAll("td");
        if (cells.length > 0) {
          cells.forEach((cell) => {
            tableData.headers.push(cell.textContent?.trim() || "");
          });
        }
      }
    }

    // Extract data rows
    let rowsToProcess: NodeListOf<Element>;

    if (thead) {
      // If we have a thead, get rows from tbody
      const tbody = table.querySelector("tbody");
      rowsToProcess = tbody
        ? tbody.querySelectorAll("tr")
        : table.querySelectorAll("tr:not(thead tr)");
    } else if (tableData.headers.length > 0) {
      // If we found headers in first row, skip that row
      rowsToProcess = table.querySelectorAll("tr:not(:first-child)");
    } else {
      // No headers found, use all rows
      rowsToProcess = table.querySelectorAll("tr");
    }

    rowsToProcess.forEach((tr) => {
      const rowData: string[] = [];
      tr.querySelectorAll("td").forEach((cell) => {
        rowData.push(cell.textContent?.trim() || "");
      });

      // Only add if row has content
      if (rowData.length > 0 && rowData.some((cell) => cell.length > 0)) {
        tableData.rows.push(rowData);
      }
    });

    // Clean up headers - remove empty ones
    tableData.headers = tableData.headers.filter(
      (header) => header.trim().length > 0
    );

    // Only add table if we have data
    if (tableData.headers.length > 0 || tableData.rows.length > 0) {
      tables.push(tableData);
    }
  });

  return tables;
};

/* --------------------------------------------------
   EXCEL EXPORT - ONLY TABLE SHEET
-------------------------------------------------- */

export const exportToExcel = (): boolean => {
  try {
    console.log("=== EXPORTING TO EXCEL (Table Only) ===");

    const tables = extractTableData();
    const workbook = XLSX.utils.book_new();

    // ============ ONLY SHEET: TABLE DATA ============
    if (tables.length > 0) {
      // Create one sheet per table
      tables.forEach((table, tableIndex) => {
        const tableSheetData: any[][] = [];

        // Add title and metadata
        tableSheetData.push([table.title.toUpperCase()]);
        tableSheetData.push([`Generated: ${new Date().toLocaleString()}`]);
        tableSheetData.push([]); // Empty row

        // Add headers if available
        if (table.headers.length > 0) {
          tableSheetData.push(table.headers);
        } else if (table.rows.length > 0) {
          // Generate default headers based on column count
          const maxColumns = Math.max(...table.rows.map((row) => row.length));
          const defaultHeaders = Array.from(
            { length: maxColumns },
            (_, i) => `Column ${i + 1}`
          );
          tableSheetData.push(defaultHeaders);
        }

        // Add all rows
        table.rows.forEach((row) => {
          tableSheetData.push(row);
        });

        // Add summary
        if (table.rows.length > 0) {
          tableSheetData.push([]); // Empty row
          tableSheetData.push(["SUMMARY", "", "", "", ""]);
          tableSheetData.push([
            "Total Rows:",
            table.rows.length.toString(),
            "",
            "",
            "",
          ]);
          tableSheetData.push([
            "Total Columns:",
            Math.max(
              table.headers.length,
              table.rows[0]?.length || 0
            ).toString(),
            "",
            "",
            "",
          ]);

          // Try to calculate numeric totals for each column
          const columnTotals: number[] = [];
          const columnAverages: number[] = [];
          const columnCounts: number[] = [];

          table.rows.forEach((row) => {
            row.forEach((cell, colIndex) => {
              // Try to extract number from cell (remove non-numeric characters except decimal point)
              const num = parseFloat(cell.replace(/[^\d.-]/g, ""));
              if (!isNaN(num)) {
                columnTotals[colIndex] = (columnTotals[colIndex] || 0) + num;
                columnCounts[colIndex] = (columnCounts[colIndex] || 0) + 1;
              }
            });
          });

          // Calculate averages
          columnTotals.forEach((total, colIndex) => {
            if (total !== undefined && columnCounts[colIndex] > 0) {
              columnAverages[colIndex] = total / columnCounts[colIndex];
            }
          });

          // Add column statistics
          columnTotals.forEach((total, colIndex) => {
            if (total !== undefined && colIndex < table.headers.length) {
              const header =
                table.headers[colIndex] || `Column ${colIndex + 1}`;
              tableSheetData.push([
                `${header} Total:`,
                total.toFixed(2),
                "",
                "",
                "",
              ]);
              if (columnAverages[colIndex] !== undefined) {
                tableSheetData.push([
                  `${header} Average:`,
                  columnAverages[colIndex].toFixed(2),
                  "",
                  "",
                  "",
                ]);
              }
            }
          });
        }

        const tableSheet = XLSX.utils.aoa_to_sheet(tableSheetData);

        // Auto-size columns
        const maxCols = Math.max(...tableSheetData.map((row) => row.length));
        const colWidths = Array(maxCols).fill({ wch: 20 });
        tableSheet["!cols"] = colWidths;

        // Use table title as sheet name (truncate if too long)
        let sheetName = table.title;
        if (sheetName.length > 31) {
          // Excel sheet name max 31 chars
          sheetName = sheetName.substring(0, 28) + "...";
        }
        // Replace invalid characters
        sheetName = sheetName.replace(/[\\/*?:[\]]/g, "_");

        XLSX.utils.book_append_sheet(
          workbook,
          tableSheet,
          sheetName || `Table ${tableIndex + 1}`
        );
      });
    } else {
      // No tables found
      const noTablesData = [
        ["NO TABLES FOUND"],
        [""],
        ["No HTML tables were found in the dashboard."],
        [""],
        ["Please ensure:"],
        ["1. The dashboard contains <table> elements", ""],
        ["2. Tables are properly structured with headers", ""],
        ["3. Data is loaded before exporting", ""],
        [""],
        [`Generated: ${new Date().toLocaleString()}`, ""],
      ];

      const noTablesSheet = XLSX.utils.aoa_to_sheet(noTablesData);
      noTablesSheet["!cols"] = [{ wch: 50 }, { wch: 30 }];
      XLSX.utils.book_append_sheet(workbook, noTablesSheet, "No Tables");
    }

    const filename = `Plant_KPI_Tables_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, filename);

    console.log(`✅ Excel export complete: ${filename}`);
    console.log(`📋 Tables extracted: ${tables.length}`);
    console.log(`📄 Sheets created: ${workbook.SheetNames.length}`);

    return true;
  } catch (error) {
    console.error("❌ Excel export failed:", error);
    return false;
  }
};

/* --------------------------------------------------
   PDF EXPORT - SINGLE PAGE (From your working code)
-------------------------------------------------- */

export const exportToPDF = async (): Promise<boolean> => {
  console.log("=== EXPORTING TO PDF ===");

  try {
    const dashboard = document.getElementById("main-content");
    if (!dashboard) throw new Error("Dashboard not found");

    const originalStyles = dashboard.style.cssText;
    const originalScroll = { x: window.scrollX, y: window.scrollY };

    window.scrollTo(0, 0);
    await wait(1000);

    applyPDFStyles(dashboard);

    const canvas = await html2canvas(dashboard, {
      backgroundColor: "#ffffff",
      scale: 1.5,
      useCORS: true,
      logging: false,
      allowTaint: true,
      onclone: (clonedDoc, clonedElement) => {
        const allElements = clonedElement.querySelectorAll("*");
        allElements.forEach((el) => {
          if (isHTMLElement(el)) {
            el.style.color = "#000000";
            if ("fill" in el.style) {
              (el.style as any).fill = "#000000";
            }
            if ("stroke" in el.style) {
              (el.style as any).stroke = "#000000";
            }
            el.style.backgroundColor =
              el.style.backgroundColor === "transparent"
                ? "white"
                : el.style.backgroundColor;
          }
        });
      },
    });

    dashboard.style.cssText = originalStyles;
    window.scrollTo(originalScroll.x, originalScroll.y);

    const A4_WIDTH_MM = 210;
    const marginMM = 10;
    const contentWidthMM = A4_WIDTH_MM - 2 * marginMM;

    const imgWidthMM = contentWidthMM;
    const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width;

    const headerHeightMM = 20;
    const footerHeightMM = 10;
    const totalHeightMM = headerHeightMM + imgHeightMM + footerHeightMM;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [A4_WIDTH_MM, totalHeightMM],
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFontSize(20);
    pdf.setTextColor(33, 37, 41);
    pdf.text("Plant KPI Dashboard Report", pageWidth / 2, 8, {
      align: "center",
    } as any);

    pdf.setFontSize(10);
    pdf.setTextColor(108, 117, 125);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 14, {
      align: "center",
    } as any);

    pdf.addImage(
      canvas.toDataURL("image/png", 1.0),
      "PNG",
      marginMM,
      headerHeightMM,
      imgWidthMM,
      imgHeightMM
    );

    pdf.setFontSize(8);
    pdf.setTextColor(108, 117, 125);
    pdf.text("Plant KPI Dashboard", pageWidth / 2, pageHeight - 5, {
      align: "center",
    } as any);

    const filename = `Plant_KPI_Dashboard_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    pdf.save(filename);

    console.log(`PDF export complete: ${filename}`);
    return true;
  } catch (error) {
    console.error("PDF export failed:", error);

    try {
      return await exportToPDFSimple();
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw error;
    }
  }
};

/* --------------------------------------------------
   SIMPLE PDF EXPORT (Fallback)
-------------------------------------------------- */

export const exportToPDFSimple = async (): Promise<boolean> => {
  try {
    console.log("=== USING SIMPLE PDF EXPORT ===");

    const dashboard = document.getElementById("main-content");
    if (!dashboard) throw new Error("Dashboard not found");

    await wait(500);

    const canvas = await html2canvas(dashboard, {
      backgroundColor: "#ffffff",
      scale: 1,
      useCORS: true,
      logging: false,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      10,
      10,
      imgWidth,
      imgHeight
    );

    pdf.setFontSize(16);
    pdf.text("Plant KPI Dashboard", pageWidth / 2, 5, {
      align: "center",
    } as any);

    pdf.setFontSize(10);
    pdf.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth / 2,
      pageHeight - 5,
      { align: "center" } as any
    );

    const filename = `Dashboard_Simple_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;
    pdf.save(filename);

    console.log(`Simple PDF export saved: ${filename}`);
    return true;
  } catch (error) {
    console.error("Simple PDF export failed:", error);
    throw error;
  }
};

/* --------------------------------------------------
   OTHER EXPORT FUNCTIONS (Keep as before)
-------------------------------------------------- */

export const exportToPNG = async (): Promise<boolean> => {
  try {
    console.log("=== EXPORTING TO PNG ===");

    const dashboard = document.getElementById("main-content");
    if (!dashboard) throw new Error("Dashboard not found");

    await wait(500);

    const canvas = await html2canvas(dashboard, {
      backgroundColor: "#ffffff",
      scale: 1,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png", 1.0);
    link.download = `Plant_KPI_Dashboard_${new Date()
      .toISOString()
      .slice(0, 10)}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("PNG export completed");
    return true;
  } catch (error) {
    console.error("PNG export failed:", error);
    throw error;
  }
};

export const exportToCSV = (): boolean => {
  try {
    console.log("=== EXPORTING TO CSV ===");

    const dashboard = document.getElementById("main-content");
    if (!dashboard) throw new Error("Dashboard not found");

    const table = dashboard.querySelector("table");
    let csvContent = "";

    if (table) {
      const rows: string[][] = [];

      const headers = Array.from(
        table.querySelectorAll("thead th, thead td")
      ).map((th) => th.textContent?.trim() || "");

      if (headers.length > 0) {
        rows.push(headers);
      }

      table.querySelectorAll("tbody tr").forEach((tr) => {
        const rowData = Array.from(tr.querySelectorAll("td")).map((td) => {
          const text = td.textContent?.trim() || "";
          if (text.includes(",") || text.includes('"') || text.includes("\n")) {
            return `"${text.replace(/"/g, '""')}"`;
          }
          return text;
        });
        if (rowData.length > 0) {
          rows.push(rowData);
        }
      });

      csvContent = rows.map((row) => row.join(",")).join("\n");
    } else {
      csvContent = `Plant KPI Dashboard Export\n`;
      csvContent += `Generated: ${new Date().toLocaleString()}\n`;
      csvContent += `No tables found in dashboard\n`;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Plant_KPI_Data_${new Date().toISOString().slice(0, 10)}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("CSV export completed");
    return true;
  } catch (error) {
    console.error("CSV export failed:", error);
    throw error;
  }
};

export const exportAllFormats = async (): Promise<boolean> => {
  try {
    console.log("=== EXPORTING ALL FORMATS ===");

    const results = await Promise.allSettled([
      exportToPDF(),
      exportToExcel(),
      exportToPNG(),
    ]);

    const successes = results.filter(
      (result) => result.status === "fulfilled"
    ).length;
    console.log(
      `Export completed: ${successes}/${results.length} formats successful`
    );

    return successes > 0;
  } catch (error) {
    console.error("Combined export failed:", error);
    throw error;
  }
};

export const prepareChartsForExport = async (): Promise<void> => {
  await wait(500);
  console.log("Charts prepared for export");
};

export const exportToPDFOnePage = exportToPDF;

export const quickExport = async (
  format: "pdf" | "excel" | "png" | "csv" = "pdf"
): Promise<boolean> => {
  switch (format) {
    case "pdf":
      return await exportToPDF();
    case "excel":
      return exportToExcel();
    case "png":
      return await exportToPNG();
    case "csv":
      return exportToCSV();
    default:
      return await exportToPDF();
  }
};

export const takeDashboardSnapshot = async (): Promise<string> => {
  const dashboard = document.getElementById("main-content");
  if (!dashboard) throw new Error("Dashboard not found");

  const canvas = await html2canvas(dashboard, {
    backgroundColor: "#ffffff",
    scale: 1,
    useCORS: true,
    logging: false,
  });

  return canvas.toDataURL("image/png");
};

export default {
  exportToPDF,
  exportToPDFSimple,
  exportToExcel,
  exportToPNG,
  exportToCSV,
  exportAllFormats,
  prepareChartsForExport,
  exportToPDFOnePage,
  quickExport,
  takeDashboardSnapshot,
};
