import React, { useEffect, useState } from "react"; // Importing necessary hooks from React
import { MaterialReactTable } from "material-react-table"; // Importing MaterialReactTable component
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Importing functions to create and apply a theme
import baseURL from "../../config"; // Importing the baseURL configuration file

const PatientList = () => {
  // Creating a dark theme using Material-UI's createTheme function
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Switches the palette to dark mode
    },
  });

  const [data, setData] = useState([]);  // State for storing patient data

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to fetch patient data from the server
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/doctor/patients`); // Making an API request to fetch patient data
      const data = await response.json(); // Parsing the JSON response
      setData(data); // Setting the data state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error); // Handling errors
    }
  };

  // Defining the columns for the table
  const columns = [
    {
      accessorKey: "patient_id", // Key in the data object for this column
      header: "Patient ID", // Header text for this column
      enableEditing: false, // Disabling editing for this column
      size: 80, // Setting the size for this column
    },
    { accessorKey: "name", header: "Patient Name", size: 80 },
    { accessorKey: "age", header: "Age", size: 80 },
    { accessorKey: "gender", header: "Gender", size: 80 },
    { accessorKey: "diseases", header: "Diseases", size: 80 },
  ];

  return (
    <div>
      <ThemeProvider theme={darkTheme}> {/* Applying the dark theme */}
        <MaterialReactTable columns={columns} data={data} /> {/* Rendering the table with the columns and data */}
      </ThemeProvider>
    </div>
  );
};

export default PatientList; // Exporting the PatientList component as the default export
