import React from 'react';
import MaterialTable from 'material-table';
import * as moment from 'moment';
import 
    { 
        makeStyles,
        createMuiTheme,
        MuiThemeProvider
    } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import 
    { 
        LinearProgress,
        IconButton,
        Button,
        Dialog,
        TextField,
        DialogTitle,
        DialogContent,
        DialogContentText,
        DialogActions,
        Typography,
        Paper,
        Grid,
        InputLabel,
        MenuItem,
        FormControl,
        Select,
        FormHelperText,
        Slide
    } from '@material-ui/core';
import { KeyboardDateTimePicker,KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { bugreport_url } from "../constant";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

    //Alert transition left
    const TransitionLeft = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
    });

    //Alert transition left
    const TransitionUp = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    function fromDBDate(datestring) {
      return moment(datestring,'DD-MM-YYYY').format('YYYY-MM-DD')
    }
    
    function toDBDate(datestring) {
      return moment(datestring,'YYYY-MM-DD').format('YYYY-MM-DD')
    }
    

    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiMenuItem: {
          // Name of the rule
          root: {
            // Some CSS
            fontSize: 15,
          },
        },
        MuiSelect:{
          root: {
            // Some CSS
            fontSize: 15,
          },
        },
        MuiTableCell: {
          root: {
           padding:2,
          }
        },
        MuiTableRow: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 0.5)"
            }
          }
        },
        MuiExpansionPanel :{
          root: {
            fontSize: 11,
            border: '1px solid rgba(0, 0, 0, .125)',
            boxShadow: 'none',
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&:before': {
              display: 'none',
            },
            '&$expanded': {
              margin: 'auto',
            },
          },
        },
        ExpansionPanelSummary :{
          root: {
            fontSize: 11,
            backgroundColor: 'rgba(0, 0, 0, .03)',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
            marginBottom: -1,
            minHeight: 56,
            '&$expanded': {
              minHeight: 44,
            },
          },
          content: {
            fontSize: 11,
            margin:10,
            '&$expanded': {
              margin: 10,
            },
          },
        },
        MuiExpansionPanelDetails:{
          root: {
            padding:'2px',
            fontSize: 11
          }
        },
        MuiTypography:{
          body1:{
            fontSize: 15,
          }
        },
        MuiExpansionPanelSummary:{
          root:{
            padding:2
          },
          content: {
            fontSize: 11,
            margin:10,
            '&$expanded': {
              margin: 5,
            },
          },
        },
        MuiDialogTitle:{
          root:{
            padding: '10px 10px',
            color:'#ffffff'
  
          }
        },
        MuiDialog:{
          paperWidthSm:{
            maxWidth:800
          }
        },
        MuiDialogContent:{
          root:{
            padding:'0px'
          }
        }
      },
    });
  
  const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        paddingLeft:'5%',
      },
      div_root:{
        width: '100%',
        size:'sm',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      TableCell_custom:{
        padding:5,
        fontSize:12
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: 4,
        color: theme.palette.grey[500],
      },
      checkButton: {
        marginTop:36,
        padding:0
      },
      viewDioTitle:{
        backgroundColor:'#3f51b5',
        color:'#fffff !important',
      },
      viewFormaValidationDioTitle:{
        backgroundColor:'#e53935',
        color:'#fffff !important',
      },
      TableRowBackgroundColor:{
        '&:hover': {
          backgroundColor: '#fab700',
        },
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        fontSize:15
      },
      formErrorColor: {
       color:"red"
      },
      formPaddingTop:{
        paddingTop:9
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      datetextField: {
        paddingTop:'10px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 271,
      },
      timetextField: {
        paddingTop:'10px',
      },
      GridPaddingTop:{
        paddingTop:'36px'
      },
      tableRow: {
        hover: {
           backgroundColor:'#eed35a',
          }
       },
       custom_fontsize:{
        fontSize:15
       },
       icon_color:{
         color:"#f50057"
       },
       icon_add_color:{
        color:"#1976d2"
      }
       
    }));
  

const emptyObj = {
  ID :'',
  Date_Raised:'',
  Bug_Id:'',
  Snow_No:'',
  Description:'',
  Type:'',
  Status:'',
  Hotfix_Date:'',
  Production_Date:'',
  Comments:'',
}

const assignEmptyValues = (rows)=> {
  return rows.map(row => Object.assign({},emptyObj,row));
}

export default function BugReport() {
    const classes = useStyles();
    const [rows,setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [rowData,setRowData] = React.useState({});
    const [editopen, setEditOpen] = React.useState(false);
    const [addopen, setAddOpen] = React.useState(false);
    const [isLoading,setIsLoading] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [alertdeleteopen,setAlertDeleteOpen] = React.useState(false);
    const [formvalidationopen,setFormValidationOpen] = React.useState(false);
    const [formerrorvalidationopen,setFormErrorValidationOpen] = React.useState(false);
    const [isDeleteLoading,setIsDeleteLoading] = React.useState(false);
    const [isLoadingDialog,setIsLoadingDialog] = React.useState(false);
    const [formvalidationerrors,setFormValidationErrors] = React.useState({});
    const [tabvalue, setTabValue] = React.useState('1');

    //set field values
    const setFieldValue = (name,value) =>{
      const updated = {
        ...rowData,
        [name] : value
      }
      setRowData(updated);
    }

    const handleBugDateChange = (date) => {
      if(date === null)
      setFieldValue("Date_Raised","")
      else
      setFieldValue("Date_Raised",toDBDate(date))
    };
    const handleHotfixDateChange = (date) => {
      if(date === null)
      setFieldValue("Hotfix_Date","")
      else
      setFieldValue("Hotfix_Date",toDBDate(date))
    };
    const handleProductionDateChange = (date) => {
      if(date === null)
      setFieldValue("Production_Date","")
      else
      setFieldValue("Production_Date",toDBDate(date))
    };
    
    
    // Ajax Call Starts here
    React.useEffect(() => {
      setIsLoading(true);
      fetch(bugreport_url)
      .then(res => res.json())
      .then((result)=>{
        setRows(assignEmptyValues(result));
      }).catch((error) =>{
        console.log(error);
      })
      .finally(()=>{
        setIsLoading(false);
      })
    },[]
    )

    const handleEditClickOpen = (selectedRow,rowData) => {
      setSelectedRow(selectedRow);
      setRowData(Object.assign({},emptyObj,{
        "ID":rowData.ID,
        "Date_Raised":rowData.Date_Raised,
        "Bug_Id":rowData.Bug_Id,
        "Snow_No":rowData.Snow_No,
        "Description":rowData.Description,
        "Type":rowData.Type,
        "Status":rowData.Status,
        "Hotfix_Date":(rowData.Hotfix_Date == "") ? null : rowData.Hotfix_Date,
        "Production_Date":(rowData.Production_Date == "") ? null : rowData.Production_Date,
        "Comments":rowData.Comments,
      }));
      console.log("Before open edit data -->"+JSON.stringify(rowData));
      setEditOpen(true); 
    };

    const handleAddClickOpen = () => {
      setRowData(Object.assign({},emptyObj,{
        "Date_Raised":moment().format('YYYY-MM-DD'),
        "Bug_Id":"",
        "Snow_No":"",
        "Description":"",
        "Type":"",
        "Status":"",
        "Hotfix_Date":null,
        "Production_Date":null,
        "Comments":"",
      }));
      setAddOpen(true); 
    };
    
    //Delete Popup alert
    const HandleDeleteMaintenanceOpen = (selectedRow) =>{
      var temp = '';
      for (var i = 0; i < selectedRow.length; i++) {
        var object = selectedRow[i];
        for (var property in object) {
          if(property === 'ID'){
            temp = temp += object[property]+',';
          }
        }
      }
      setSelected(temp.replace(/,\s*$/, ""))
      setAlertDeleteOpen(true);
    }

    const handleAlertDeleteClose = () =>{
      setAlertDeleteOpen(false);
    }
    
    const handleAlertDeleteCancelClose = () =>{
      setAlertDeleteOpen(false);
    }
       
    const handleAlertDeleteSuccessOpen = () =>{
      setFormValidationOpen(true);
      setFormValidationErrors({"headerStyle":"classes.viewDioTitle","title":"Validation success","message":" Selected record deleted successfully"})
    }
    const handleAlertFormValidationClose = () =>{
      setFormValidationOpen(false);
    }
    const handleAlertErrorFormValidationClose = () =>{
      setFormErrorValidationOpen(false);
    }

    const HandleAddBugReportClose = () =>{
      setAddOpen(false);
    }
    const HandleEditBugReportClose = () =>{
      setEditOpen(false);
    }

const handleDeleteSubmitClose = (items) => {
  //alert("selected check box items"+items.selected);
  setIsDeleteLoading(true);
  fetch(bugreport_url+items.selected, { 
    method: "DELETE",
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response => response.json()) 
  .then(result => {
    if(result.success === 1){
      MaintenanceLoadingAfterSuccess();
      setAlertDeleteOpen(false);
      handleAlertDeleteSuccessOpen();
      setSelected([]);
    }else{
      alert("Technical error occurred. please contact admin team.")
    }
  }).catch((error) =>{
    console.log(error);
  })
  .finally(()=>{
    setIsDeleteLoading(false);
  });        
}

const MaintenanceLoadingAfterSuccess = () =>{
  setIsLoading(true);
  fetch(bugreport_url)
  .then(res => res.json())
  .then((result)=>{
    setRows(result);
    
  }).catch((error) =>{
    console.log(error);
  })
  .finally(()=>{
    setIsLoading(false);
  })
}

const handleAddSubmitClose = () => {
  setIsLoading(true);
  fetch(bugreport_url, {
    method: "POST", 
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response =>  response.json())
  .then(result => {
    if(result.error === 409){
      setFormErrorValidationOpen(true);
      setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Add Failed","message":" Bug report already exists"})
    }else{
      setFormValidationOpen(true);
      setFormValidationErrors({"headerStyle":"classes.viewDioTitle","title":"Add success","message":" Bug report added successfully"});
      MaintenanceLoadingAfterSuccess();
    }
  }).catch((error) =>{
    console.log(error);
  })
  .finally(()=>{
    setIsLoading(false);
  }); 
  setAddOpen(false);
}

const handleEditSubmitClose = () => {
  setIsLoading(true);
  console.log("Before submit--->"+JSON.stringify(rowData));
  fetch(bugreport_url+rowData.ID, { 
    method: "PATCH", 
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response => response.json()) 
  .then(result => {
    setFormValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Edit success","message":" Bug report updated successfully"});
    MaintenanceLoadingAfterSuccess();
  }).catch((error) =>{
    console.log(error);
  })
  .finally(()=>{
    setIsLoading(false);
  }); 
setEditOpen(false);

}


const handleFormSubmit = (event,title) =>{

  if(rowData.Date_Raised === ""){
    setFormErrorValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":" Please select date raised"})
    event.preventDefault();
  }
  else if(rowData.Bug_Id === ""){
    setFormErrorValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":"Please enter bug id"})
    event.preventDefault();
  }

  else if(rowData.Snow_No === ""){
    setFormErrorValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":" Please enter snow number"})
    event.preventDefault();
  }
  // else if(rowData.Type === ""){
  //   setFormErrorValidationOpen(true);
  //   setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":" Please select type"})
  //   event.preventDefault();
  // }
  else if(rowData.Status === ""){
    setFormErrorValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":" Please select status"})
    event.preventDefault();
  }
  else if(rowData.Hotfix_Date !==null && (!moment(rowData.Hotfix_Date).isSameOrAfter(moment(rowData.Date_Raised)))){
    setFormErrorValidationOpen(true);
      setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":"Bug hotfix date should be equal or after bug date"})
      event.preventDefault();
  } 
  else if(((rowData.Production_Date !== null && rowData.Hotfix_Date !== null) && (!moment(rowData.Production_Date).isSameOrAfter(moment(rowData.Hotfix_Date))))){
    setFormErrorValidationOpen(true);
    setFormValidationErrors({"headerStyle":"classes.viewFormaValidationDioTitle","title":"Validation falied","message":"Production date should be equal or after hot fix date"})
    event.preventDefault();
} 
  else{
    if(title === "Add"){
      handleAddSubmitClose();
    }
    else{
      handleEditSubmitClose();
    }
   
  }
}



  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
    {
        isLoading && 
        <LinearProgress color="secondary"/>
    }
    <MaterialTable
      title="Bug Report"
      columns={[
        { title: 'ID', field: 'ID',width: '2%', filtering: false },
        { title: 'Date', field: 'Date_Raised',width: '8%',defaultSort:'desc',render: rowData =>{
          return moment(rowData.Date_Raised).format('DD-MM-YYYY')
        } },
        { title: 'Bug#', field: 'Bug_Id',width: '5%' },
        { title: 'SNOW#', field: 'Snow_No',width: '8%'  },
        { title: 'Description', field: 'Description',width: '42%' },
        // { title: 'Type', field: 'Type',width: '8%' },
        { title: 'Status', field: 'Status',width: '8%' },
        { title: 'Hotfix Date', field: 'Hotfix_Date',width: '11%' ,render: rowData =>{
         if(rowData.Hotfix_Date !== null)
          return moment(rowData.Hotfix_Date).format('DD-MM-YYYY')
          else
          return rowData.Hotfix_Date
        }},
        { title: 'Prod Date', field: 'Production_Date',width: '8%' ,render: rowData =>{
          if(rowData.Production_Date !== null)
          return moment(rowData.Production_Date).format('DD-MM-YYYY')
          else
          return rowData.Production_Date
        }},
        
      ]}
      data={rows}
      onRowClick={((evt, selectedRow) => handleEditClickOpen(selectedRow.tableData.id,selectedRow))}
      options={{
        selection: true,
          filtering: true,
          headerStyle: {
            backgroundColor: '#5c6fd6',
            color: '#FFF'
          },
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#ddcd74' : '#ffffff'
          }),
          pageSize:10,
          pageSizeOptions:[10,20,30,40,50]  
      }}
      localization={{
        pagination: {
            labelDisplayedRows: '{from}-{to} of {count}'
        },
        toolbar: {
            nRowsSelected: '{0} row(s) selected'
        },
        header: {
            actions: 'Actions'
        },
        body: {
            emptyDataSourceMessage: 'No records to display',
            filterRow: {
                filterTooltip: 'Filter'
            }
        }
    }}
    actions={[
      {
        tooltip: 'Remove All Selected Users',
        icon: 'delete',
        onClick: (evt, data) => { HandleDeleteMaintenanceOpen(data) }
       },
      {
        icon: () => { return <AddCircleIcon className={classes.icon_add_color}/> },
        tooltip: 'Add New Ticket',
        isFreeAction: true,
        onClick: (event) => { handleAddClickOpen() }
      }
    ]}
    />
    {/* custom alert dialog content -->start here */}
    <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={alertdeleteopen}
        onClose={handleAlertDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'xs'}
        fullWidth={true}
        position = "top"
        TransitionComponent={TransitionLeft}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle} >
        {"Delete"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertDeleteClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        {
            isDeleteLoading && 
            <LinearProgress color="secondary"/>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete selected bug ticket(s) ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleAlertDeleteCancelClose} variant="contained" color="secondary">
            No
          </Button>
          <Button variant="contained" value={selected} onClick={()=>handleDeleteSubmitClose({selected})} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}

      {/* custom alert dialog content -->start here */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={formvalidationopen}
        onClose={handleAlertFormValidationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth = {'xs'}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle}>
        {formvalidationerrors.title}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertFormValidationClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {formvalidationerrors.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleAlertFormValidationClose}  variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}

      {/* custom alert dialog content -->start here */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={formerrorvalidationopen}
        onClose={handleAlertErrorFormValidationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth = {'xs'}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewFormaValidationDioTitle}>
        {formvalidationerrors.title}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertErrorFormValidationClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {formvalidationerrors.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleAlertErrorFormValidationClose}  variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}


      {/* edit dialog content -->start here */}
    <form noValidate>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'sm'} 
        onClose={HandleEditBugReportClose} 
        aria-labelledby="customized-dialog-title" 
        open={editopen}
        >
        {/* <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          Add 
          <IconButton aria-label="close" className={classes.closeButton} onClick={HandleAddMaintenanceClose}>
          <CloseIcon />
          </IconButton>
        </DialogTitle> */}
        <DialogContent style={{padding:'0px 0px'}}>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <div className={classes.div_root}>
        <TabContext value={tabvalue}>
        <AppBar position="static">
          <TabList aria-label="simple tabs example">
            <Tab label="Edit" value="1" />
            <IconButton aria-label="close" className={classes.closeButton} onClick={HandleEditBugReportClose}>
            <CloseIcon />
            </IconButton>
          </TabList>
        </AppBar>
        <TabPanel value="1">
        <Grid container spacing={2}>
        <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDatePicker
                      error={!rowData.Date_Raised}
                      className={classes.datetextField}
                      //variant="inline"
                      label="Date Raised"
                      value = {rowData.Date_Raised}
                      onChange={handleBugDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.Date_Raised &&  "Please enter valid bug date."}

                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
             <TextField
                error={!rowData.Bug_Id}
                margin="normal"
                required
                fullWidth
                id="Bug_Id"
                label="Bug Id"
                name="Bug_Id"
                autoComplete="Bug_Id"
                value={rowData.Bug_Id}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Bug_Id',event.target.value)}
                helperText={!rowData.Bug_Id &&  "Please enter bug id."}
            />
          </Grid>
          <Grid item xs={4}>
             <TextField
                error={!rowData.Snow_No}
                margin="normal"
                required
                fullWidth
                id="Snow_No"
                label="Service Now Number"
                name="Snow_No"
                autoComplete="Snow_No"
                value={rowData.Snow_No}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Snow_No',event.target.value)}
                helperText={!rowData.Snow_No &&  "Please enter snow number."}
            />
          </Grid>

          {/* <Grid item xs={3}>
             <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Type && <span>Bug Type *</span>}{!rowData.Type && <span className={classes.formErrorColor}>Bug Type *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Type}
                onChange={(event)=>setFieldValue('Type',event.target.value)}
                label="Type *"
                required
                error={!rowData.Type}
              >
                <MenuItem value="">
                  <em>Bug Type  *</em>
                </MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Invalid">Invalid</MenuItem>
              </Select>
              {!rowData.Type  && <FormHelperText className={classes.formErrorColor}>Please select bug type.</FormHelperText>}
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
             <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Status && <span>Bug Status *</span>}{!rowData.Status && <span className={classes.formErrorColor}>Bug Status *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Status}
                onChange={(event)=>setFieldValue('Status',event.target.value)}
                label="Status *"
                required
                error={!rowData.Status}
              >
                <MenuItem value="">
                  <em>Bug Status  *</em>
                </MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
              {!rowData.Status  && <FormHelperText className={classes.formErrorColor}>Please select bug status.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={4} >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDatePicker
                      //error={!rowData.Hotfix_Date}
                      className={classes.Hotfix_Date}
                      //variant="inline"
                      label="Hotfix Date"
                      value = {rowData.Hotfix_Date}
                      onChange={handleHotfixDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Hotfix_Date &&  "Please enter valid hotfix date."}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDatePicker
                      //error={!rowData.Production_Date}
                      className={classes.Production_Date}
                      //variant="inline"
                      label="Production Date"
                      value = {rowData.Production_Date}
                      onChange={handleProductionDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Production_Date &&  "Please enter valid prod date."}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12}>
             <TextField
               // error={!rowData.Description}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="Description"
                label="Description"
                name="Description"
                autoComplete="Description"
                value={rowData.Description}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Description',event.target.value)}
               // helperText={!rowData.Description &&  "Please enter description."}
          />
             </Grid>
             <Grid item xs={12}>
             <TextField
                //error={!rowData.Comments}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="Comments"
                label="Comments"
                name="Comments"
                autoComplete="Comments"
                value={rowData.Comments}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Comments',event.target.value)}
                //helperText={!rowData.Comments &&  "Please enter comments."}
          />
             </Grid>

            </Grid>
        </TabPanel>
      </TabContext> 
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleEditBugReportClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={(event)=>handleFormSubmit(event,"Edit")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      </form>
      {/* edit dialog content -->end here */}

      {/* edit dialog content -->start here */}
    <form noValidate>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'sm'} 
        onClose={HandleAddBugReportClose} 
        aria-labelledby="customized-dialog-title" 
        open={addopen}
        >
        {/* <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          Add 
          <IconButton aria-label="close" className={classes.closeButton} onClick={HandleAddMaintenanceClose}>
          <CloseIcon />
          </IconButton>
        </DialogTitle> */}
        <DialogContent style={{padding:'0px 0px'}}>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <div className={classes.div_root}>
        <TabContext value={tabvalue}>
        <AppBar position="static">
          <TabList aria-label="simple tabs example">
            <Tab label="Edit" value="1" />
            <IconButton aria-label="close" className={classes.closeButton} onClick={HandleAddBugReportClose}>
            <CloseIcon />
            </IconButton>
          </TabList>
        </AppBar>
        <TabPanel value="1">
        <Grid container spacing={2}>
        <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDatePicker
                      error={!rowData.Date_Raised}
                      className={classes.datetextField}
                      //variant="inline"
                      label="Date Raised"
                      value = {rowData.Date_Raised}
                      onChange={handleBugDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.Date_Raised &&  "Please enter valid bug date."}

                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
             <TextField
                error={!rowData.Bug_Id}
                margin="normal"
                required
                fullWidth
                id="Bug_Id"
                label="Bug Id"
                name="Bug_Id"
                autoComplete="Bug_Id"
                value={rowData.Bug_Id}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Bug_Id',event.target.value)}
                helperText={!rowData.Bug_Id &&  "Please enter bug id."}
            />
          </Grid>
          <Grid item xs={4}>
             <TextField
                error={!rowData.Snow_No}
                margin="normal"
                required
                fullWidth
                id="Snow_No"
                label="Service Now Number"
                name="Snow_No"
                autoComplete="Snow_No"
                value={rowData.Snow_No}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Snow_No',event.target.value)}
                helperText={!rowData.Snow_No &&  "Please enter snow number."}
            />
          </Grid>

          {/* <Grid item xs={3}>
             <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Type && <span>Bug Type *</span>}{!rowData.Type && <span className={classes.formErrorColor}>Bug Type *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Type}
                onChange={(event)=>setFieldValue('Type',event.target.value)}
                label="Type *"
                required
                error={!rowData.Type}
              >
                <MenuItem value="">
                  <em>Bug Type  *</em>
                </MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Invalid">Invalid</MenuItem>
              </Select>
              {!rowData.Type  && <FormHelperText className={classes.formErrorColor}>Please select bug type.</FormHelperText>}
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
             <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Status && <span>Bug Status *</span>}{!rowData.Status && <span className={classes.formErrorColor}>Bug Status *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Status}
                onChange={(event)=>setFieldValue('Status',event.target.value)}
                label="Status *"
                required
                error={!rowData.Status}
              >
                <MenuItem value="">
                  <em>Bug Status  *</em>
                </MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
              {!rowData.Status  && <FormHelperText className={classes.formErrorColor}>Please select bug status.</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={4} >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDatePicker
                      //error={!rowData.Hotfix_Date}
                      className={classes.Hotfix_Date}
                      //variant="inline"
                      label="Hotfix Date"
                      value = {rowData.Hotfix_Date}
                      onChange={handleHotfixDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Hotfix_Date &&  "Please enter valid hotfix date."}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDatePicker
                      //error={!rowData.Production_Date}
                      className={classes.Production_Date}
                      //variant="inline"
                      label="Production Date"
                      value = {rowData.Production_Date}
                      onChange={handleProductionDateChange}
                      onError={console.log}
                      format="dd-MM-yyyy"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Production_Date &&  "Please enter valid prod date."}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12}>
             <TextField
               // error={!rowData.Description}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="Description"
                label="Description"
                name="Description"
                autoComplete="Description"
                value={rowData.Description}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Description',event.target.value)}
               // helperText={!rowData.Description &&  "Please enter description."}
          />
             </Grid>
             <Grid item xs={12}>
             <TextField
                //error={!rowData.Comments}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="Comments"
                label="Comments"
                name="Comments"
                autoComplete="Comments"
                value={rowData.Comments}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Comments',event.target.value)}
                //helperText={!rowData.Comments &&  "Please enter comments."}
          />
             </Grid>

            </Grid>
        </TabPanel>
      </TabContext> 
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleAddBugReportClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={(event)=>handleFormSubmit(event,"Add")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      </form>
      {/* add dialog content -->end here */}

    </div>
    </MuiThemeProvider>
  );
}