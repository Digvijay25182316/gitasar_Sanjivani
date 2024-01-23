import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { activitiesData } from "./data";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "FirstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "LastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "programName",
    headerName: "Program Name",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.FirstName || ""} ${params.row.LastName || ""}`,
  },
  {
    field: "courseCode",
    headerName: "Course Code",
    width: 110,
    editable: true,
  },
  {
    field: "sessionName",
    headerName: "Session Name",
    width: 110,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    editable: true,
  },
  {
    field: "typeofActivity",
    headerName: "Activity Type",
    width: 110,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 110,
    editable: true,
  },
];

export default function DataGridDemo() {
  return (
    <div>
      <DataGrid
        rows={activitiesData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
