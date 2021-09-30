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
import { maintenance_url } from "../constant";
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
            maxWidth:600
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
        paddingTop:11
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
  Object_Name:'',
  Object_Key:'',
  Object_Value:'',
  Object_User:'',
  Object_Date:'',
}

const assignEmptyValues = (rows)=> {
  return rows.map(row => Object.assign({},emptyObj,row));
}



export default function Maintenance() {
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
    
    // Ajax Call Starts here
    React.useEffect(() => {
      setIsLoading(true);
      fetch(maintenance_url)
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
      setSelectedRow(selectedRow)
      setRowData(rowData);
      setEditOpen(true); 
    };

    const handleAddClickOpen = () => {
      setRowData(Object.assign({},emptyObj,{
        "Object_Name":"",
        "Object_Key":"",
        "Object_Value":"",
        "Object_User":"System",
        "Object_Date":moment().format('YYYY-MM-DDTHH:mm:ss'),
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
      setFormValidationErrors({"title":"Validation success","message":" Selected record deleted successfully"})
    }
    const handleAlertFormValidationClose = () =>{
      setFormValidationOpen(false);
    }

    const HandleAddMaintenanceClose = () =>{
      setAddOpen(false);
    }
    const HandleEditMaintenanceClose = () =>{
      setEditOpen(false);
    }


    const handleTabChange = (event, newValue) => {
      var Object_Name = rowData.Object_Name;
      var Object_Key = rowData.Object_Key;
      var Object_Value = rowData.Object_Value;
      var Object_User = rowData.Object_User;
      var Object_Date = rowData.Object_Date;
        setRowData(Object.assign({},emptyObj,{
          "Object_Name":Object_Name,
          "Object_Key":Object_Key,
          "Object_Value":Object_Value,
          "Object_User":Object_User,
          "Object_Date":Object_Date,
        }));
      
      setTabValue(newValue);
    };


const handleDeleteSubmitClose = (items) => {
  //alert("selected check box items"+items.selected);
  setIsDeleteLoading(true);
  fetch(maintenance_url+items.selected, { 
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
  fetch(maintenance_url)
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
  console.log("Add submit data"+JSON.stringify(rowData));
  setIsLoading(true);
  fetch(maintenance_url, {
    method: "POST", 
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response =>  response.json())
  .then(result => {
    console.log("Add maintenance success",result.error);
    if(result.error === 409){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Add Failed","message":" Drop list value already exists"})
    }else{
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Add success","message":" New drop list successfully"});
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
  console.log("Edit submit data ->"+JSON.stringify(rowData));
  setIsLoading(true);
  fetch(maintenance_url+rowData.ID, { 
    method: "PATCH", 
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response => response.json()) 
  .then(result => {
    setFormValidationOpen(true);
    setFormValidationErrors({"title":"Edit success","message":" Record updated successfully"});
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
  if(rowData.Object_Name === ""){
    setFormValidationOpen(true);
    setFormValidationErrors({"title":"Validation falied","message":" Please enter List Name"})
    event.preventDefault();
  }
  // else if(rowData.Object_Key === ""){
  //   setFormValidationOpen(true);
  //   setFormValidationErrors({"title":"Validation falied","message":"Please enter Object Key"})
  //   event.preventDefault();
  // }

  else if(rowData.Object_Value === ""){
    setFormValidationOpen(true);
    setFormValidationErrors({"title":"Validation falied","message":" Please enter List Value"})
    event.preventDefault();
  }
  else if(rowData.Object_User === ""){
    setFormValidationOpen(true);
    setFormValidationErrors({"title":"Validation falied","message":" Please enter created by"})
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
      title="Maintenance"
      columns={[
        { title: 'ID', field: 'ID',width: '5%', filtering: false,defaultSort:'asc' },
        { title: 'Droplist Name', field: 'Object_Name',width: '25%' },
        // { title: 'Droplist Key', field: 'Object_Key',width: '20%'  },
        { title: 'Droplist Value', field: 'Object_Value',width: '25%' },
        { title: 'Created By', field: 'Object_User',width: '22%' },
        { title: 'Creation Date', field: 'Object_Date',width: '23%' },
        // { title: 'Edit',field: 'edit',render: tablerowData => <img alt="" src={process.env.PUBLIC_URL+"/edit_icon.png"} onClick={(event) => { handleEditClickOpen(tablerowData)}} style={{width: 30, height:25}}/> , filtering: false ,width: '2%', sorting: false,export:false  },
        // { title: 'Add',field: 'add',render: tablerowData => <img alt="" src={process.env.PUBLIC_URL+"/add_icon.png"} onClick={(event) => { handleAddClickOpen(tablerowData) }} style={{width: 30, height:25}}/>, filtering: false,width: '2%', sorting: false,export:false   },
      ]}
      data={rows}
      //onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
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
      //onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
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
            Are you sure want to delete selected ticket(s) ? 
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

{/* add dialog content -->start here */}
<form noValidate>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'sm'} 
        onClose={HandleEditMaintenanceClose} 
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
          <TabList onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Edit" value="1" />
            <IconButton aria-label="close" className={classes.closeButton} onClick={HandleEditMaintenanceClose}>
            <CloseIcon />
            </IconButton>
          </TabList>
        </AppBar>
        <TabPanel value="1">
        <Grid container spacing={2}>
             <Grid item xs={6}>
                <TextField
                error={!rowData.Object_Name}
                margin="normal"
                required
                fullWidth
                id="Object_Name"
                label="List Name"
                name="Object_Name"
                autoComplete="Object_Name"
                value={rowData.Object_Name}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Object_Name',event.target.value)}
                helperText={!rowData.Object_Name &&  "Please enter List Name."}
            />
                
             </Grid>
             {/* <Grid item xs={4}>
             <TextField
                error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_Key"
                label="Object Key"
                name="Object_Key"
                autoComplete="Object_Key"
                value={rowData.Object_Key}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Object_Key',event.target.value)}
                helperText={!rowData.Object_Name &&  "Please enter Object Key."}
            />
             </Grid> */}

             <Grid item xs={6}>
             <TextField
                error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_Value"
                label="List Value"
                name="Object_Value"
                autoComplete="Object_Value"
                value={rowData.Object_Value}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Object_Value',event.target.value)}
                helperText={!rowData.Object_Value &&  "Please enter list value."}
            />
           
             </Grid>
			 <Grid item xs={6}>
       <TextField
                error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_User"
                label="Created By"
                name="Object_User"
                autoComplete="Object_User"
                value={rowData.Object_User}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                  readOnly:true,
                }}
                onChange={(event)=>setFieldValue('Object_User',event.target.value)}
                helperText={!rowData.Object_User &&  "Please enter created by."}
            />
           
             </Grid>
			 <Grid item xs={6}>
       <TextField
                error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_Date"
                label="Creation Date"
                name="Object_Date"
                autoComplete="Object_Date"
                value={rowData.Object_Date}
                hidden ={true}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                  readOnly: true,
                }}
                onChange={(event)=>setFieldValue('Object_Date',event.target.value)}
                helperText={!rowData.Object_Date &&  "Please enter Creation Date."}
            />
             </Grid>
            </Grid>
        </TabPanel>
      </TabContext> 
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleEditMaintenanceClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={(event)=>handleFormSubmit(event,"Edit")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      </form>
      {/* add dialog content -->end here */}

      {/* add dialog content -->start here */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'sm'} 
        onClose={HandleAddMaintenanceClose} 
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
          <TabList onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Add" value="1" />
            <IconButton aria-label="close" className={classes.closeButton} onClick={HandleAddMaintenanceClose}>
            <CloseIcon />
            </IconButton>
          </TabList>
        </AppBar>
        <TabPanel value="1">
        <Grid container spacing={2}>
             <Grid item xs={6}>
             <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Object_Name && <span>List Name *</span>}{!rowData.Object_Name && <span className={classes.formErrorColor}>List Name *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Object_Name}
                onChange={(event)=>setFieldValue('Object_Name',event.target.value)}
                label="Ticket Shift *"
                required
                error={!rowData.Object_Name}
              >
                <MenuItem value="">
                  <em>List Name  *</em>
                </MenuItem>
                <MenuItem value="Ticket_Shift">Ticket_Shift</MenuItem>
                <MenuItem value="Ticket_Type">Ticket_Type</MenuItem>
                <MenuItem value="Ticket_Priority">Ticket_Priority</MenuItem>
                <MenuItem value="Ticket_Category_Enrolment">Ticket_Category_Enrolment</MenuItem>
                <MenuItem value="Ticket_Category_Technical">Ticket_Category_Technical</MenuItem>
                <MenuItem value="Ticket_Category_Process">Ticket_Category_Process</MenuItem>
                <MenuItem value="Ticket_Category_Azure">Ticket_Category_Azure</MenuItem>
                <MenuItem value="Ticket_Category_Monitoring">Ticket_Category_Monitoring</MenuItem>
                <MenuItem value="Ticket_Category">Ticket_Category</MenuItem>
                <MenuItem value="Ticket_Owner">Ticket_Owner</MenuItem>
                <MenuItem value="Ticket_State">Ticket_State</MenuItem>
                <MenuItem value="Ticket_Team_Type">Ticket_Team_Type</MenuItem>
              </Select>
              {!rowData.Object_Name  && <FormHelperText className={classes.formErrorColor}>Please select list name.</FormHelperText>}
            </FormControl>
                
             </Grid>
             {/* <Grid item xs={4}>
             <TextField
                error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_Key"
                label="Object Key"
                name="Object_Key"
                autoComplete="Object_Key"
                value={rowData.Object_Key}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Object_Key',event.target.value)}
                helperText={!rowData.Object_Name &&  "Please enter Object Key."}
            />
             </Grid> */}

             <Grid item xs={6}>
             <TextField
                error={!rowData.Object_Value}
                margin="normal"
                required
                fullWidth
                id="Object_Value"
                label="List Value"
                name="Object_Value"
                autoComplete="Object_Value"
                value={rowData.Object_Value}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Object_Value',event.target.value)}
                helperText={!rowData.Object_Value &&  "Please enter list value."}
            />
           
             </Grid>
			 <Grid item xs={6}>
       <TextField
               // error={!rowData.Object_Key}
                margin="normal"
                required
                fullWidth
                id="Object_User"
                label="Created by"
                name="Object_User"
                autoComplete="Object_User"
                value={rowData.Object_User}
                //value="System"
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                  readOnly: true,
                }}
                onChange={(event)=>setFieldValue('Object_User',event.target.value)}
               // helperText={!rowData.Object_User &&  "Please enter created  by."}
            />
           
             </Grid>
			 <Grid item xs={6}>
       <TextField
                error={!rowData.Object_Date}
                margin="normal"
                required
                fullWidth
                id="Object_Date"
                label="Creation Date"
                name="Object_Date"
                autoComplete="Object_Date"
                value={rowData.Object_Date}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                  readOnly: true,
                }}
                onChange={(event)=>setFieldValue('Object_Date',event.target.value)}
                helperText={!rowData.Object_Date &&  "Please enter Object Date."}
            />
             </Grid>
            </Grid>
        </TabPanel>
      </TabContext> 
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleAddMaintenanceClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={(event)=>handleFormSubmit(event,"Add")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      {/* add dialog content -->end here */}

    </div>
    </MuiThemeProvider>
  );
}

