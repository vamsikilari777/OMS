import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import baseURL from "../../config";

const PatientList = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Switches the palette to dark mode
    },
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/doctor/patients`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      accessorKey: "patient_id",
      header: "Patient ID",
      enableEditing: false,
      size: 80,
    },
    { accessorKey: "name", header: "Patient Name", size: 80 },
    { accessorKey: "age", header: "Age", size: 80 },
    { accessorKey: "gender", header: "Gender", size: 80 },
    { accessorKey: "diseases", header: "Diseases", size: 80 },
  ];

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data} />
      </ThemeProvider>
    </div>
  );
};

export default PatientList;
