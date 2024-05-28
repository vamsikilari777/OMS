import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import baseURL from "../../config";

const Hospital = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/hospitals`); // Corrected URL
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const response = await fetch(`${baseURL}/admin/hospitals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        fetchData();
        setCreateModalOpen(false);
      } else {
        console.error("Error creating hospital:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/hospitals/${row.original.hospital_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        fetchData();
        exitEditingMode();
      } else {
        console.error("Error updating hospital:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  const handleDeleteRow = async (row) => {
    if (
      window.confirm(`Are you sure you want to delete ${row.original.name}?`)
    ) {
      try {
        const response = await fetch(
          `${baseURL}/admin/hospitals/${row.original.hospital_id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchData();
        } else {
          console.error("Error deleting hospital:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "hospital_id",
        header: "Hospital ID",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Hospital Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["name"],
          helperText: validationErrors["name"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({ ...prevErrors, name: "" })),
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["address"],
          helperText: validationErrors["address"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              address: "",
            })),
        },
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["phone_number"],
          helperText: validationErrors["phone_number"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              phone_number: "",
            })),
        },
      },
    ],
    [validationErrors]
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            editingMode="modal"
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={() => setValidationErrors({})}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                {isMobile ? "New" : "Add Hospital"}
              </Button>
            )}
          />
          <CreateNewAccountModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            isMobile={isMobile}
          />
        </div>
      </ThemeProvider>
    </>
  );
};

const CreateNewAccountModal = ({ open, onClose, onSubmit, isMobile }) => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add Hospital</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              // background: '#5B5B5B'
            }}
          >
            <TextField
              label="Hospital Name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <TextField
              label="Address"
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              value={values.phone_number}
              onChange={(e) =>
                setValues({ ...values, phone_number: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          {isMobile ? "Create" : "Add Hospital"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Hospital;
