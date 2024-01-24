import { createCsvWriter } from "csv-writer";

function convertToCSV(data) {
  const csvWriter = createCsvWriter({
    path: "output.csv",
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
  });

  csvWriter.writeRecords(data);
}

export function downloadCSV(data, filename) {
  const csvata = convertToCSV(data);
  const blob = new Blob([csvata], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
