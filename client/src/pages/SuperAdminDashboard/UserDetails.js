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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import baseURL from "../../config";

const UserDetails = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Switches the palette to dark mode
    },
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/users`);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateNewRow = async (values) => {
    try {
      const response = await fetch(`${baseURL}/admin/register`, {
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
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    try {
      const response = await fetch(`${baseURL}/admin/users/${row.original.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        fetchData();
        exitEditingMode();
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteRow = async (row) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${row.original.username}?`
      )
    ) {
      try {
        const response = await fetch(
          `${baseURL}/admin/users/${row.original.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchData();
        } else {
          console.error("Error deleting user:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors["email"],
          helperText: validationErrors["email"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" })),
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["role"],
          helperText: validationErrors["role"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({ ...prevErrors, role: "" })),
        },
      },
      {
        accessorKey: "hospital_name",
        header: "Hospital Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["hospital_name"],
          helperText: validationErrors["hospital_name"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              location: "",
            })),
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors["location"],
          helperText: validationErrors["location"],
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              location: "",
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
              <Box sx={{ display: "flex", gap: "0.1rem" }}>
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
                {isMobile ? "New" : "Create New User"}
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
    username: "",
    email: "",
    role: "",
    hospital_name: "",
    location: "",
  });

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New User</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              label="User Name"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                label="Role"
                value={values.role}
                onChange={(e) => setValues({ ...values, role: e.target.value })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="reception">Reception</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Hospital Name"
              value={values.hospital_name}
              onChange={(e) =>
                setValues({ ...values, hospital_name: e.target.value })
              }
            />
            <TextField
              label="Location"
              value={values.location}
              onChange={(e) =>
                setValues({ ...values, location: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          {isMobile ? "Create" : "Create New User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// const validateRequired = (value) => !!value.trim();
// const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default UserDetails;
