import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

export default function CustomizedTables() {
  const [records, setRecords] = React.useState([]);
  const rows = [];
  React.useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch("http://localhost:4000/students");
      const data = await response.json();
      setRecords(data);
    };

    fetchRecords();
  }, []);

  records.map((item) =>
    rows.push(
      createData(item.name, item.fatherName, item.mobileNumber, item.cnic)
    )
  );

  return (
    <Container
      style={{
        marginTop: "80px",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom textAlign={"center"}>
        Student Records
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} textAlign={"center"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Father Name</StyledTableCell>
                  <StyledTableCell align="center">Phone Number</StyledTableCell>
                  <StyledTableCell align="center">CNIC</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.carbs}
                    </StyledTableCell>
                    <StyledTableCell align="center" spacing="10">
                      <ButtonGroup
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button variant="contained" color="success">
                          Enrolled
                        </Button>
                        <Button variant="text" >
                          <DeleteIcon color="error" />
                        </Button>
                        <Button variant="text">
                          <CreateIcon color="primary" />
                        </Button>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
