"use client";

import { useCallback, useEffect, useState } from "react";
import validator from "validator";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import useGetUsers from "../../../utils/swr/getUsers.js";
import useUpdateUserById from "../../../utils/fetch/updateUserById.js";

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

const EditInputCell = ({ params, setSnackbar }) => {
  console.log("params: ", params);
  const { id, error, field, value } = params;
  const apiRef = useGridApiContext();

  if (error) setSnackbar({ children: error.message, severity: "error" });

  const handleChange = async (event) => {
    console.log("onChange event: ", event);
    if (event.code && event.code === "Backspace") {
      return null;
    }

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

      console.log("safeData: ", safeData);

      // const res = await useUpdateUserById(safeData);
      //
      // if (res.error) throw new Error(res.error.message);

      // Close editing cell.
      apiRef.current.stopCellEditMode({ id, field });
    }
  };

  return <Input value={value} onChange={handleChange} size="small" autoFocus />;
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const { data, error } = useGetUsers();

  if (error) throw new Error(error);

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data]);

  const renderEditCell = (params) => {
    const inputFields = ["name", "email"];

    if (params.field === "role") return <SelectEditInputCell {...params} />;

    if (inputFields.includes(params.field))
      return <EditInputCell params={params} setSnackbar={setSnackbar} />;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 240 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: Boolean(true),
      renderEditCell: renderEditCell,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      editable: Boolean(true),
      renderEditCell: renderEditCell,
    },
    {
      field: "role",
      headerName: "Role",
      width: 90,
      editable: Boolean(true),
      renderEditCell: renderEditCell,
    },
  ];

  const handleCloseSnackBar = () => setSnackbar(null);

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

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
          checkboxSelection
          experimentalFeatures={{ newEditingApi: Boolean(true) }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
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
