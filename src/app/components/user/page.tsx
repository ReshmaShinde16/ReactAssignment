"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  fetchUsersSuccess,
  addUser,
  deleteUser,
  updateUser,
} from "../../redux/slices/userSlices"; // Updated import
import { UserData } from "../../interface/userData";
import { RootState } from "../../store/store";
import { Delete, Edit } from "@mui/icons-material";

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.users.users);
  console.log("userData", userData);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users: UserData[] = JSON.parse(storedUsers);
      dispatch(fetchUsersSuccess(users));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          const users: UserData[] = data.map(
            (user: { id: number; name: string; email: string }) => ({
              id: user.id,
              name: user.name,
              email: user.email,
            })
          );
          dispatch(fetchUsersSuccess(users));
          localStorage.setItem("users", JSON.stringify(users));
        });
    }
  }, [dispatch]);

  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) return;

    const newUser: UserData = {
      id: userData.length + 1,
      name: newUserName,
      email: newUserEmail,
    };
    dispatch(addUser(newUser));
    saveUsersToLocalStorage([...userData, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
    const updatedUsers = userData.filter((user) => user.id !== id);
    saveUsersToLocalStorage(updatedUsers);
  };

  const handleEditUser = (id: number) => {
    const userToEdit = userData.find((user) => user.id === id);
    if (userToEdit) {
      setEditUserId(id);
      setNewUserName(userToEdit.name);
      setNewUserEmail(userToEdit.email);
      setOpen(true);
    }
  };

  const handleUpdateUser = () => {
    if (!newUserName || !newUserEmail || editUserId === null) return;

    const updatedUser: UserData = {
      id: editUserId,
      name: newUserName,
      email: newUserEmail,
    };
    dispatch(updateUser(updatedUser));
    const updatedUsers = userData.map((user) =>
      user.id === editUserId ? updatedUser : user
    );
    saveUsersToLocalStorage(updatedUsers);
    setNewUserName("");
    setNewUserEmail("");
    setEditUserId(null);
    setOpen(false);
  };

  const saveUsersToLocalStorage = (users: UserData[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div className="flex flex-col w-full p-4 pl-[198px] pr-[98px]">
      <div className="flex justify-between items-center mt-6 mb-6">
        <div className="text-[22px] font-bold">User Table</div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editUserId ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <TextField
            className="mb-4"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            label="Name"
            fullWidth
            required
          />
          <TextField
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            label="Email"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="border border-[2px] bg-[lightgray] text-black border-black"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="text-[black] bg-[lightblue]"
            onClick={editUserId ? handleUpdateUser : handleAddUser}
          >
            {editUserId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <button
                    className="text-[gray]"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="text-[gray]"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Delete />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
