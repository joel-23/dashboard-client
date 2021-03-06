import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
// import { withRouter } from "react-router-dom";

import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  colors,
  MenuItem,
  InputLabel,
  Select,
  Drawer,
  Divider,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";
import FilterListIcon from "@material-ui/icons/FilterList";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import axios from "axios";
// import { SearchInput } from "../../../../components";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  // formContainer: { padding: theme.spacing(2) },
  // form: {
  //   padding: theme.spacing(2),
  //   border: "1px solid ",
  //   borderColor: colors.grey[400],
  //   borderRadius: "4px",
  //   display: "flex",
  //   justifyContent: "center",
  // },
  // title: {
  //   marginBottom: "20px",
  // },
  // buttonContainer: {
  //   width: "100%",
  //   height: "100%",
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  //   [theme.breakpoints.down("xs")]: {
  //     justifyContent: "center",
  //   },
  // },
  button: {
    marginLeft: theme.spacing(1),
  },
  drawer: {
    // minWidth: "100%",
    width: "400px",
    // maxWidth: "100%",
    // margin: theme.spacing(2),
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      // justifyContent: "center",
      width: "100%",
    },
  },
  drawerForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, 0),
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  drawerTitle: {
    margin: theme.spacing(3, 0, 1, 0),
  },
  drawerButton: {
    display: "flex",
    justifyContent: "stretch",
  },
  drawerClose: {
    // display: "flex",
    marginLeft: -theme.spacing(2),
  },
}));

const EmployeesToolbar = (props) => {
  var {
    className,
    setFilter,
    setEmployeeTableData,
    employeeTableData,
    ...rest
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    values: {},
  });

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (event) => {
    setFormState({
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleReset = () => {
    setFormState({ values: {} });
    setFilter({ values: {}, filterSearch: false });
    setEmployeeTableData({ ...employeeTableData, page: 0 });
    setOpenDrawer(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    setFilter({ ...formState, filterSearch: true });
    setEmployeeTableData({ ...employeeTableData, page: 0 });
    setOpenDrawer(false);
  };

  //withrouter hoc giving context warning hence using window object
  const handleNewUser = () => {
    // props.history.push("/employees/new");
    window.location.assign("/employees/new");
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={classes.row}>
            {/* <Button className={classes.importButton} size="large">
              Import
            </Button>
            <Button className={classes.exportButton} size="large">
              Export
            </Button> */}
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleNewUser}
            >
              Add Employee
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<FilterListIcon />}
              size="large"
              onClick={handleOpenDrawer}
              // onClick={handleReset}
            >
              Filter
            </Button>
          </div>
        </Grid>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={handleCloseDrawer}
          // onClose={toggleDrawer(anchor, false)}
        >
          <div className={classes.drawer}>
            <div className={classes.drawerClose}>
              <IconButton
                color="primary"
                size="small"
                onClick={handleCloseDrawer}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </div>
            <Typography className={classes.drawerTitle} variant="h2">
              Filter
            </Typography>
            <Divider />
            <form className={classes.drawerForm} onSubmit={handleSubmit}>
              <TextField
                className={classes.input}
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                type="text"
                value={formState.values.name || ""}
                variant="outlined"
              />
              <TextField
                className={classes.input}
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ""}
                variant="outlined"
              />
              <Select
                className={classes.input}
                fullWidth
                label="Gender"
                variant="outlined"
                name="gender"
                value={formState.values.gender || ""}
                onChange={handleChange}
                // labelId="gender"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              <TextField
                className={classes.input}
                fullWidth
                label="Department"
                name="department"
                onChange={handleChange}
                type="text"
                value={formState.values.department || ""}
                variant="outlined"
              />
              {/* <Divider /> */}
              <div className={classes.drawerButton}>
                <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  startIcon={<SearchIcon />}
                  size="large"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  startIcon={<ReplayIcon />}
                  size="large"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </Drawer>
        {/* <Grid item xs={12}>
          <Card className={classes.formContainer}>
            <Typography className={classes.title} variant="h2">
              Filter
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.name || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Select
                    fullWidth
                    label="Gender"
                    variant="outlined"
                    name="gender"
                    value={formState.values.gender || ""}
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.department || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SearchIcon />}
                      size="large"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Search
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      startIcon={<ReplayIcon />}
                      size="large"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      */}
      </Grid>
    </div>
  );
};

EmployeesToolbar.propTypes = {
  className: PropTypes.string,
};

export default EmployeesToolbar;
