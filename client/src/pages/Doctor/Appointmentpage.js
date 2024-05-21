import React, { useEffect, useState, useMemo } from "react"; // Imported necessary hooks and components from React
import { MaterialReactTable } from "material-react-table"; // Imported the MaterialReactTable component
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Imported MUI theme & components
import baseURL from "../../config"; // Imported baseURL config file

const Appointments = () => {
  
  const darkTheme = createTheme({    // Created a dark theme using MUI's createTheme function
    palette: {
      mode: "dark",                  // Sets the theme mode to dark
    },
  });

  
  const [data, setData] = useState([]);  // Using useState hook for storing fetched data

                                 
  useEffect(() => {
    fetchData();                     // using useEffect hook to fetch data
  }, []);

  
  const fetchData = async () => {    //  This is a function to fetch appointment data from the API
    try {
      const response = await fetch(`${baseURL}/doctor/getAllAppointments`); // Fetching data from the API
      const data = await response.json(); // Parsing the JSON response (converting the text into object)
      setData(data); // Updating the state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error); // Findouting the errors
    }
  };

  
  const columns = useMemo(     // useMemo hook to memoize the column definitions(to increase the performance )
    () => [
      {
        accessorKey: "id", // Column for patient ID
        header: "Patient ID", // Header text for the column
        enableEditing: false, // Disables editing for this column (we cant edit this column)
        size: 80, // sets Width of the column
      },
      {
        accessorKey: "first_name", // Column for user's first name
        header: "User Name", // Header text for the column
        size: 80,  // sets Width of the column
      },
      {
        accessorKey: "date_of_appointment", // Column for the appointment date
        header: "Date of Appointment", // Header text for the column
        size: 80,  //sets Width of the column
      },
      {
        accessorKey: "time_of_appointment", // Column for the appointment time
        header: "Time of Appointment", // Header text for the column
        size: 80,  // sets Width of the column
      },
      {
        accessorKey: "status", // Column for the appointment status
        header: "Status", // Header text for the column
        size: 80,  // sets Width of the column
      },
      {
        accessorKey: "appointment_type", // Column for the type of appointment
        header: "Appointment Type", // Header text for the column
        size: 80, // sets Width of the column
      },
    ],
    [] // Empty dependency array ensures this is only created once
  );

  return (
    <div>
                                         
      <ThemeProvider theme={darkTheme}> {/* Applying the dark theme to the table */}                                       
        <MaterialReactTable columns={columns} data={data} />  {/* Rendering the table with the columns and data */}
      </ThemeProvider>
    </div>
  );
};

export default Appointments; // Exporting the component 
