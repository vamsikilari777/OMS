import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import baseURL from "../../config";

const Appointments = () => {
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
      const response = await fetch(`${baseURL}/doctor/getAllAppointments`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Patient ID",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "first_name",
        header: "User Name",
        size: 80,
      },
      {
        accessorKey: "date_of_appointment",
        header: "Date of Appointment",
        size: 80,
      },
      {
        accessorKey: "time_of_appointment",
        header: "Time of Appointment",
        size: 80,
      },
      {
        accessorKey: "status", //normal accessorKey
        header: "Status",
        size: 80,
      },
      {
        accessorKey: "appointment_type", //normal accessorKey
        header: "Appointment Type",
        size: 80,
      },
    ],
    []
  );

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data} />
      </ThemeProvider>
    </div>
  );
};

export default Appointments;
