"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import validator from "validator";
import { DataGrid, GridCellModes, useGridApiContext } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

import useGetUsers from "../../../utils/swr/getUsers.js";
import useUpdateUserById from "../../../utils/fetch/updateUserById.js";

const EditToolbar = ({
  selectedCellParams,
  cellMode,
  cellModesModel,
  setCellModesModel,
}) => {
  const handleSaveOrEdit = async () => {
    if (!selectedCellParams) return;

    const { id, field, value } = selectedCellParams;

    // Do not permit to edit field `id`.
    if (field === "id") return;

    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });

      // Use validator to avoid xss attacks.
      const safeData = {
        id: validator.escape(id),
        field: validator.escape(field),
        data: validator.escape(value),
      };

      console.log("safeData: ", safeData);

      const res = await useUpdateUserById(safeData);

      if (!res.ok) throw new Error("Can not update user !");
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) return;

    const { id, field } = selectedCellParams;

    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: {
          mode: GridCellModes.View,
          ignoreModifications: Boolean(true),
        },
      },
    });
  };

  const handleMouseDown = (e) => e.preventDefault(); // Keep focus in the cell.

  return (
    <Box
      className="flex justify-center text-white"
      sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams || selectedCellParams.field === "id"}
        variant="contained"
        color="success"
        startIcon={cellMode === "edit" ? null : <EditIcon />}
        endIcon={cellMode === "edit" ? <SendIcon /> : null}
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>

      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        variant="contained"
        color="error"
        sx={{ ml: 1 }}
        startIcon={<CancelIcon />}
      >
        Cancel
      </Button>
    </Box>
  );
};

const SelectEditInputCell = (props) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    if (isValid) {
      // Use validator to avoid xss attacks.
      const safeData = {
        id: validator.escape(id),
        field: validator.escape(field),
        data: validator.escape(event.target.value),
      };

      const res = await useUpdateUserById(safeData);

      if (res.error) throw new Error(res.error.message);

      // Close editing cell.
      apiRef.current.stopCellEditMode({ id, field });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>ADMIN</option>
      <option>USER</option>
    </Select>
  );
};

const renderEditCell = (params) => {
  if (params.field === "role") return <SelectEditInputCell {...params} />;
};

const columns = [
  { field: "id", headerName: "ID", width: 240 },
  {
    field: "name",
    headerName: "Name",
    width: 130,
    editable: Boolean(true),
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    editable: Boolean(true),
  },
  {
    field: "role",
    headerName: "Role",
    width: 90,
    editable: Boolean(true),
    renderEditCell: renderEditCell,
  },
];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const { data, error } = useGetUsers();

  if (error) throw new Error(error);

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data]);

  const handleCloseSnackBar = () => setSnackbar(null);

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleCellFocus = useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;

    setSelectedCellParams({ id, field });
  }, []);

  const handleCellChange = useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    const value = event.target.value;

    setSelectedCellParams({ id, field, value });
  }, []);

  const cellMode = useMemo(() => {
    if (!selectedCellParams) return "view";

    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = useCallback(
    (_, event) => {
      if (cellMode === "edit") {
        // Prevent calling event.preventDefault() if Tab is pressed on a cell in edit mode.
        event.defaultMuiPrevented = Boolean(true);
      }
    },
    [cellMode]
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={"w-screen lg:w-[800px] sm:w-screen h-[400px]"}>
        <DataGrid
          className="bg-color-2"
          style={{ color: "white" }}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: Boolean(true) }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onCellKeyDown={handleCellKeyDown}
          cellModesModel={cellModesModel}
          onCellModesModelChange={(model) => setCellModesModel(model)}
          components={{ Toolbar: EditToolbar }}
          componentsProps={{
            toolbar: {
              cellMode,
              selectedCellParams,
              setSelectedCellParams,
              cellModesModel,
              setCellModesModel,
            },
            cell: { onFocus: handleCellFocus, onChange: handleCellChange },
          }}
        />

        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackBar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackBar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default Admin;
