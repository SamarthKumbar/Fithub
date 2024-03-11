import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  table: {
    minWidth: 650,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://fithub-2.onrender.com/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("https://fithub-2.onrender.com/exercises/" + id)
      .then((response) => {
        console.log(response.data);
        setExercises(exercises.filter((el) => el._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id, updatedExercise) => {
    axios
      .post(`https://fithub-2.onrender.com/exercises/update/${id}`, updatedExercise)
      .then((response) => {
        console.log("Exercise updated:", response.data);
        // Optionally, you can update the state or perform any other actions
      })
      .catch((error) => {
        console.error("Error updating exercise:", error);
      });
  };

  // Function to handle changes in the form fields
  const handleChange = (event, index, key) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][key] = event.target.value;
    setExercises(updatedExercises);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Dashboard
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Users</StyledTableCell>
                  <StyledTableCell align="right">Activity</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <input
                        type="text"
                        value={row.username}
                        onChange={(event) => handleChange(event, index, "username")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(event) => handleChange(event, index, "description")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <input
                        type="number"
                        value={row.duration}
                        onChange={(event) => handleChange(event, index, "duration")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <input
                        type="date"
                        value={row.date.substring(0, 10)}
                        onChange={(event) => handleChange(event, index, "date")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        color="secondary"
                        onClick={() => deleteExercise(row._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => handleUpdate(row._id, row)}
                      >
                        Update
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
