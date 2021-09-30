import React from 'react';
import MaterialTable, {MTableBody} from 'material-table';
import * as moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import 
    { 
        makeStyles,
        createMuiTheme,
        MuiThemeProvider
    } from '@material-ui/core/styles';
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
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Typography,
        Paper,
        Grid,
        InputLabel,
        MenuItem,
        FormControl,
        Select,
        FormHelperText
    } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { KeyboardDateTimePicker,KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import AnalysisHistory from './AnalysisHistory';
import { ticketmaster_url,ticketmasterduplicate_url,resolutionhistory_url,downloadallapi_url,downloadsummaryapi_url,maintenance_droplist_url } from "../constant";
import { CsvBuilder } from 'filefy';
import SaveIcon from '@material-ui/icons/Save';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { formatDistance } from 'date-fns';

//Alert transition left
const TransitionLeft = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

//Alert transition left
const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const emptyObj = {
ID :'',
Ticket_Date:'',
Ticket_Shift:'',
TicketType:'',
TicketNumber:'',
StartDateandTime:'',
Bug_ID:'',
Ms_TicketNumber:'',
Ticket_Category:'',
Ticket_SubCategory:'',
Ticket_Priority:'',
Ticket_Owner:'',
Ticket_Team_Type:'',
Ticket_State:'',
Customer_Name:'',
IncidentShortSummary:'',
IncidentDetail:'',
AnalysisWorkNotes:'',
ResolutionNotes:'',
Ticket_EndDateTime:'',
Ticket_Age:'',
}

const emptyDropListObj = {
Object_Name:'',
Object_Key:'',
Object_Value:''
}

const assignEmptyValues = (rows)=> {
  return rows.map(row => Object.assign({},emptyObj,row));
}

const assignEmptyDropListValues = (dropListValues)=> {
  return dropListValues.map(row => Object.assign({},emptyDropListObj,row));
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
        paperWidthMd:{
          maxWidth:1200
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

  function fromDBDate(datestring) {
    return moment(datestring,'DD-MM-YYYY').format('YYYY-MM-DD')
  }
  
  function toDBDate(datestring) {
    return moment(datestring,'YYYY-MM-DD').format('DD-MM-YYYY')
  }
  
  function fromDBDateTime(datetimestring){
    return moment(datetimestring,'DD-MM-YYYYTHH:mm:ss').format('YYYY-MM-DDTTHH:mm:ss')
  }
  
  function toDBDateTime(datetimestring){
    return moment(datetimestring,'YYYY-MM-DDTHH:mm:ss').format('DD-MM-YYYYTHH:mm:ss')
  }


export default function TicketMasterIntensify() {
    const classes = useStyles();
    const [rows,setRows] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(false);
    const [isDeleteLoading,setIsDeleteLoading] = React.useState(false);
    const [isLoadingDialog,setIsLoadingDialog] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [rowData,setRowData] = React.useState({});
    const [addopen, setAddOpen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false);
    const [alertopen,setAlertOpen] = React.useState(false);
    const [viewopen, setViewOpen] = React.useState(false);
    const [alerteditopen,setAlertEditOpen] = React.useState(false);
    const [alertdeleteopen,setAlertDeleteOpen] = React.useState(false);
    const [alertdeletesuccessopen,setAlertDeleteSuccessOpen] = React.useState(false);
    const [alerterroropen,setAlertErrorOpen] = React.useState(false);
    const [daterangeopen,setDateRangeOpen] = React.useState(false);
    const [histrows,setHistRows] = React.useState([]);
    const [expanded] = React.useState('panel1');
    const [analysisHistory,setAnalysisHistory] = React.useState([]);
    const [formvalidationopen,setFormValidationOpen] = React.useState(false);
    const [formvalidationerrors,setFormValidationErrors] = React.useState({});
    const [selectedFromDate, setSelectedFromDate] = React.useState({});
    const [selectedToDate, setSelectedToDate] = React.useState({});
    const [dropListValues, setDropListValues] = React.useState([]);

    var histhours = '';
    //set states for all form elements - start here
    const setFieldValue = (name,value) =>{
    const updated = {
      ...rowData,
      [name] : value
    }

    if( name === "TicketNumber" && value.toUpperCase().startsWith('INC')){
      updated.TicketType = 'INCIDENT';
    }
    else if(name === "TicketNumber" && value.toUpperCase().startsWith('')){
      updated.TicketType = 'CASE';
    }
    setRowData(updated);
  }
  
  //set states for all form elements - end here
  const setFields = (obj) =>{
    //console.log("Change drop list values -->"+JSON.stringify(obj))
    setRowData({
      ...rowData,
      ...obj
    })
  }

  const setAnalysisHistoryData = (data) =>{
    setAnalysisHistory(data);
    let duration = moment.duration();
    for (var i = 0; i < data.length; i++) {
      histhours = moment(data[i].EndDateandTime,"YYYY-MM-DDTHH:mm:ss").diff(moment(data[i].StartDateandTime,"YYYY-MM-DDTHH:mm:ss"));
      duration.add(histhours);
    } 

    const updated = {
      ...rowData,
      ['Ticket_Age'] : duration.days()*24+duration.hours()+":"+duration.minutes()+":"+duration.seconds(),
      ['Ticket_Team_Type'] : data[data.length-1].TeamType,
      ['Ticket_State'] : data[data.length-1].Ticket_Status,
      ['Ticket_Owner'] : data[data.length-1].Owner,
      ['Ticket_EndDateTime'] : moment(data[data.length-1].EndDateandTime,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"),
    }

    setRowData(updated);
    }

    const handleTicketDateChange = (date) => {
      setFieldValue("Ticket_Date",toDBDate(date))
    };

    const handleTicketStartDateChange = (datetime) =>{
      setFieldValue("StartDateandTime",datetime);
      setAnalysisHistory([{
        "StartDateandTime":moment(datetime).format('YYYY-MM-DDTHH:mm:ss'),
        "EndDateandTime":'',
        "TeamType":'',
        "Ticket_Status":'',
        "Owner":'',
        "WorkNotes":''
      }]);
    }

    const handleTicketEndDateChange = (datetime) =>{
      setFieldValue("Ticket_EndDateTime",datetime)
    }

    const HandleAddTicketmasterOpen = (selectedRow) =>{
        //console.log(selectedRow);
        setRowData(Object.assign({},emptyObj,{
          "Ticket_Date":moment().format('DD-MM-YYYY'),
          "StartDateandTime":moment().format('YYYY-MM-DDTHH:mm:ss'),
          "TicketType":"",
          "Ticket_Priority":"Low"
          }));
        setAnalysisHistory([{
          "StartDateandTime":moment().format('YYYY-MM-DDTHH:mm:ss'),
          "EndDateandTime":'',
          "TeamType":'',
          "Ticket_Status":'',
          "Owner":'',
          "WorkNotes":''
        }]);
        setAddOpen(true);
    }

    const HandleDeleteTicketmasterOpen = (selectedRow) =>{
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

    const HandleAddTicketmasterClose = () =>{
        setAddOpen(false);
    }

    const HandleDateExportmasterClose = () =>{
      setDateRangeOpen(false);
    }

    const handleAlertClickOpen = () => {
        setAlertOpen(true);
      };

    const handleAlertClose = () => {
        TicketMasterLoadingAfterSuccess();
        console.log(rowData);
        setAlertOpen(false);
      };
    
      const handleAlertDeleteClose = () =>{
        setAlertDeleteOpen(false);
      }

      const handleAlertDeleteCancelClose = () =>{
        setAlertDeleteOpen(false);
      }
    
      const handleAlertDeleteSuccessOpen = () =>{
        setAlertDeleteSuccessOpen(true);
      }
    
      const handleAlertDeleteSuccessClose = () =>{
        setAlertDeleteSuccessOpen(false);
      }

      const handleViewClickOpen = (rowData) => {
        setRowData(rowData);
        setViewOpen(true);
        ResolutionHistoryData(rowData.TicketNumber);
      };
  
      const handleViewClose = () => {
       setViewOpen(false);
      };

      const handleEditClickOpen = (selectedRow,rowData) => {
        setSelectedRow(selectedRow)
        setRowData(rowData);
        console.log("Edit Open data"+JSON.stringify(rowData));
        setEditOpen(true);
        ResolutionHistoryData(rowData.TicketNumber);
        
      };
    
      const handleEditClose = () => {
        setEditOpen(false);
      };

      const handleAlertEditClickOpen = () => {
        setAlertEditOpen(true);
      };

      const handleAlertEditClose = () => {
        TicketMasterLoadingAfterSuccess();
        console.log(rowData);
        setAlertEditOpen(false);
      };

      const handleErrorAlertClickOpen = () => {
        setAlertErrorOpen(true);
      };
      const handleErrorAlertClickClose = () => {
        setAlertErrorOpen(false);
      };

      const handleFromDateChange = (date) => {
        setSelectedFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setSelectedToDate(date);
      };
  
   // Ajax Call Starts here
   React.useEffect(() => {
    setIsLoading(true);
    fetch(ticketmaster_url)
    .then(res => res.json())
    .then((result)=>{
      setRows(assignEmptyValues(result));
        fetch(maintenance_droplist_url)
        .then(droplist => droplist.json())
        .then((droplistresult)=>{
          //console.log("Onload droplist before set values ->"+JSON.stringify(droplistresult));
          setDropListValues(assignEmptyDropListValues(droplistresult));
        }).catch((error) =>{
          console.log(error);
        })
        .finally(()=>{
          setIsLoading(false);
        })
    }).catch((error) =>{
      console.log(error);
    })
    .finally(()=>{
      setIsLoading(false);
    })
  },[]
  )

  const handleAlertFormValidationClose = () =>{
    setFormValidationOpen(false);
  }

  const resolutionHistoryFieldValidation = (status,history) =>{
    if((status !== "Assigned to L1") && history === ""){
      return true;
    }
    else if((status !== "Closed") && history === ""){
      return true;
    }
    else if((status !== "Open") && history === ""){
      return true;
    }
    else if((status !== "Cancelled") && history === ""){
      return true;
    }
    else
    {
      return false;
    }
  }

  const handleFormSubmit = (event,title) =>{
    if(rowData.Ticket_Shift === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket shift"})
      event.preventDefault();
    }
    else if(rowData.TicketNumber === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please enter valid ticket number"})
      event.preventDefault();
    }
    else if(rowData.TicketType === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket type"})
      event.preventDefault();
    }
    else if(rowData.StartDateandTime === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select valid start date & time"})
      event.preventDefault();
    }
    else if(rowData.Ticket_Category === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket category"})
      event.preventDefault();
    }
    else if(rowData.Ticket_SubCategory === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket sub category"})
      event.preventDefault();
    }
    else if(rowData.Ticket_Priority === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket priority"})
      event.preventDefault();
    }
    else if(rowData.IncidentShortSummary === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please enter incident short summary"})
      event.preventDefault();
    }
    else if(rowData.IncidentDetail === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please  enter incident detail"})
      event.preventDefault();
    }
    else if(rowData.Ticket_EndDateTime === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please ticket end date & time in analysis history"})
      event.preventDefault();
    }
    else if(rowData.Ticket_Team_Type === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select team type in analysis history"})
      event.preventDefault();
    }
    else if(rowData.Ticket_State === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket status in analysis history"})
      event.preventDefault();
    }
    else if(rowData.Ticket_Owner === ""){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please select ticket owner in analysis history"})
      event.preventDefault();
    }
    else if((rowData.Ticket_State === "Assigned to L1" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Cancelled" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Closed" && !rowData.ResolutionNotes)){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please enter resolution notes for the day"})
      event.preventDefault();
    }
    else if((!moment(rowData.Ticket_EndDateTime).isAfter(moment(rowData.StartDateandTime)))){
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Ticket end date should be equal or after start date"})
      event.preventDefault();
    }
    
    else{
      if(title === "Add")
      handleAddSubmitClose();
      else
      handleEditSubmitClose();
    }
  }

  const HandleDuplicateTicketCheck = (event) =>{
     if(rowData.TicketNumber === "")
     {
      setFormValidationOpen(true);
      setFormValidationErrors({"title":"Validation falied","message":"Please enter valid ticket number"})
      event.preventDefault();
    }
    else
    {
    setIsLoadingDialog(true);
    fetch(ticketmasterduplicate_url+rowData.TicketNumber, {
      method: "GET"
    }) 
    .then(response =>  response.json())
    .then(result => {
      if(result.error === 409)
      {
        setFormValidationOpen(true);
        setFormValidationErrors({"title":"Validation falied","message":"This Ticket or Incident already avaliable . kindly add your entry in resoution history"})
        
      }
      else
      {
        handleErrorAlertClickOpen();
      }
    })
    .catch((error) =>{
      console.log(error);
    })
    .finally(()=>{
      setIsLoadingDialog(false);
    });
  }
  }

  const handleAddSubmitClose = () => {
    console.log("Add submit data"+JSON.stringify(rowData));
    console.log("Before Analysis History data"+JSON.stringify(analysisHistory));
    setIsLoading(true);
    fetch(ticketmaster_url, {
      method: "POST", 
      body: JSON.stringify(rowData), 
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      } 
    }) 
    .then(response =>  response.json())
    .then(result => {
      console.log("Add Ticket master success",result.error);
      if(result.error === 409){
        handleErrorAlertClickOpen();
      }else{
        fetch(resolutionhistory_url+rowData.TicketNumber, { 
        method: "POST",
        body: JSON.stringify(analysisHistory), 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
      }) 
      .then(histresponse => histresponse.json()) 
      .then(histresult => {
        handleAlertClickOpen();
        console.log("Add Resolution History success",histresult);
      }).catch((error) =>{
        console.log(error);
      })
      }
     // handleAlertClickOpen();
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
      fetch(ticketmaster_url+rowData.ID, { 
        method: "PATCH", 
        body: JSON.stringify(rowData), 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
      }) 
      .then(response => response.json()) 
      .then(result => {
        //handleAlertEditClickOpen()
        //console.log("Update success",result);
        setIsLoading(true);
        fetch(resolutionhistory_url+rowData.TicketNumber, { 
            method: "POST", 
            body: JSON.stringify(analysisHistory),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
          }) 
          .then(histresponse => histresponse.json()) 
          .then(histresult => {
            handleAlertEditClickOpen();
            console.log("Update Resolution History success",histresult);
          }).catch((error) =>{
            console.log(error);
          })
      }).catch((error) =>{
        console.log(error);
      })
      .finally(()=>{
        setIsLoading(false);
      }); 
  setEditOpen(false);

}



const handleDeleteSubmitClose = (items) => {
  //alert("selected check box items"+items.selected);
  setIsDeleteLoading(true);
  fetch(ticketmaster_url+items.selected, { 
    method: "DELETE",
    body: JSON.stringify(rowData), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  }) 
  .then(response => response.json()) 
  .then(result => {
    if(result.success === 1){
      TicketMasterLoadingAfterSuccess();
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



const TicketMasterLoadingAfterSuccess = () =>{
    setIsLoading(true);
    fetch(ticketmaster_url)
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

  const HandleExportAll= () => {
    setIsLoading(true);
    downloadURL(downloadallapi_url);
    setIsLoading(false);
  }

  const HandleExportSummary= () => {
    var fromdate = moment().local()
    fromdate.set({hour:0,minute:0,second:0,millisecond:0});
    var todate = moment().local()
    todate.set({hour:23,minute:59,second:0,millisecond:0});
    setSelectedFromDate(fromdate.format('YYYY-MM-DDTHH:mm:ss'));
    setSelectedToDate(todate.format('YYYY-MM-DDTHH:mm:ss'));
    setDateRangeOpen(true);
  }

  const handleFormExportSubmit = () =>{
    setIsLoading(true);
    console.log("From date"+moment(selectedFromDate).format('YYYY-MM-DDTHH:mm:ss')+"To date "+moment(selectedToDate).format('YYYY-MM-DDTHH:mm:ss'));
    downloadSummaryURL(downloadsummaryapi_url+moment(selectedFromDate).format('YYYY-MM-DDTHH:mm:ss')+","+moment(selectedToDate).format('YYYY-MM-DDTHH:mm:ss'));
    setDateRangeOpen(false);
    setIsLoading(false);
  }

  var downloadURL = function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};

var downloadSummaryURL = function downloadURL(url) {
  var hiddenIFrameID = 'hiddenDownloaderSummary',
      iframe = document.getElementById(hiddenIFrameID);
  if (iframe === null) {
      iframe = document.createElement('iframe');
      iframe.id = hiddenIFrameID;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
  }
  iframe.src = url;
};



  const ResolutionHistoryData = (ticketNum) =>{
    setIsLoadingDialog(true);
    fetch(resolutionhistory_url+ticketNum)
    .then(res => res.json())
    .then((result)=>{
      setHistRows(result);
      setAnalysisHistory(result);
      console.log(histrows);
    }).catch((error) =>{
      console.log(error);
    })
    .finally(()=>{
      setIsLoadingDialog(false);
    })
  }


  //Ajax Call Ends here

    return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
    {
        isLoading && 
        <LinearProgress color="secondary"/>
    }
      <MaterialTable
        title="Daily Ticket Report"
        columns={[
          // { title: 'ID', field: 'ID',width: '3%'},
          { title: 'Date', field: 'Ticket_Date' ,width: '8%',defaultSort:'desc'},
          { title: 'Ticket', field: 'TicketNumber',width: '8%'},
          { title: 'State',field: 'Ticket_State',width: '13%'},
          { title: 'Priority',field: 'Ticket_Priority',width: '5%'},
          { title: 'Age',field: 'Ticket_Age',width: '5%', render: rowData =>{
            if(!isNaN(moment(rowData.Ticket_Age,'HH:mm:ss').get('hours'))){
              //Case 1 : if SLA < 120 hrs then True
              var age = rowData.Ticket_Age.split(":");
              if(rowData.Ticket_Priority === 'Low' && age[0] > 96){  
                return rowData.Ticket_Age+"^";
              }
              else if(rowData.Ticket_Priority === 'Medium' && age[0] > 15){
                return rowData.Ticket_Age+"^";
              }
              else if(rowData.Ticket_Priority === 'High' && age[0] > 7){
                return rowData.Ticket_Age+"^";
              }
              else if(rowData.Ticket_Priority === 'Critical' && age[0] > 3){
                return rowData.Ticket_Age+"^";
              }
              else{
                return rowData.Ticket_Age;
              }
            }
            else{
              return rowData.Ticket_Age;
            }
          } },
          { title: 'Type',field: 'Ticket_Team_Type',width: '1%'},
          { title: 'Owner',field: 'Ticket_Owner',width: '10%'},
          // { title: 'Category',field: 'Ticket_Category',width: '15%'},
          { title: 'Sub-Category',field: 'Ticket_SubCategory',width: '14%'},
          { title: 'Last-Updated',field: 'Ticket_EndDateTime',width: '15%'},
          { title: 'VendorNo#',field: 'Ms_TicketNumber',width: '6%'},
          { title: 'BugNo#',field: 'Bug_ID',width: '5%'},
          { title: 'CustomerName',field: 'Customer_Name',width: '10%'},
          // { title: 'View',field: 'view',render: tablerowData => <img alt="" src={process.env.PUBLIC_URL+"/view_icon.png"} onClick={(event) => { handleViewClickOpen(tablerowData) }} style={{width: 35, height:35}}/>, filtering: false,width: '2%', sorting: false,export:false   },
          // { title: 'Edit',field: 'edit',render: tablerowData => <img alt="" src={process.env.PUBLIC_URL+"/edit_icon.png"} onClick={(event) => { handleEditClickOpen(tablerowData)}} style={{width: 30, height:25}}/> , filtering: false ,width: '2%', sorting: false,export:false  },
        ]}
        data={rows}
        onRowClick={((evt, selectedRow) => handleEditClickOpen(selectedRow.tableData.id,selectedRow))}
        onSearchChange={((e,data) => console.log("search changed: " + JSON.stringify(data)))}
        options={{
          exportButton: true,
          exportTitle:"Export As Summary",
          exportFileName:'summaryreport',
          exportDelimiter:',',
          exportCsv: (_,datacsv) => {
             var columnscsvtemp = [{"field":"ID"},{"field":"Ticket_Date"},{"field":"TicketNumber"},{"field":"Ticket_State"},{"field":"Bug_ID"},{"field":"Ms_TicketNumber"},{"field":"StartDateandTime"},{"field":"Ticket_Category"},{"field":"Ticket_SubCategory"},{"field":"Ticket_Priority"},{"field":"Ticket_Owner"},{"field":"Ticket_Team_Type"},{"field":"Ticket_State"},{"field":"Customer_Name"},{"field":"IncidentShortSummary"},{"field":"IncidentDetail"},{"field":"AnalysisWorkNotes"},{"field":"ResolutionNotes"},{"field":"Ticket_EndDateTime"},{"field":"Ticket_Age"}];
             const data = datacsv.map(rowData =>
              columnscsvtemp.map(columnDef => rowData[columnDef.field])
            );
          const builder = new CsvBuilder(('ticketsummaryreport' || 'data') + '.xls')
          .setDelimeter(',')
          .setColumns(columnscsvtemp.map(columnDef => columnDef.field))
          .addRows(data)
          .exportFile();
          },
          selection: true,
          filtering: true,
          headerStyle: {
            backgroundColor: '#5c6fd6',
            color: '#FFF'
          },
          rowStyle: rowData => {
            if(!isNaN(moment(rowData.Ticket_Age,'HH:mm:ss').get('hours'))){
              //Case 1 : if SLA < 120 hrs then True
              var age = rowData.Ticket_Age.split(":");
              //console.log("Age value -->"+age[0]);
              if(rowData.Ticket_Priority === 'Low' && age[0] > 120){  
                return { backgroundColor: '#ff3333' };
              }
              // else if(rowData.Ticket_Priority === 'Low' &&  96 < age[0]){
              //   return { backgroundColor:'#ffd633' };
              // }
              else if(rowData.Ticket_Priority === 'Medium' && age[0] > 18){
                return { backgroundColor: '#ff3333' }
              }
              else if(rowData.Ticket_Priority === 'High' && age[0] > 8){
                return { backgroundColor: '#ff3333' };
              }
              else if(rowData.Ticket_Priority === 'Critical' && age[0] > 4){
                return { backgroundColor: '#ff3333' };
              }
              else{
                return {backgroundColor: '#ffffff'};
              }
            }
            else{
              return {backgroundColor: '#ffffff'};
            }
            
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
              nRowsSelected: '{0} row(s) selected',
              exportName:'Summary as Excel',
              exportFileName:'CCS_Ticket_Report.xlsx'
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
            onClick: (evt, data) => { HandleDeleteTicketmasterOpen(data) }
          },
          {
            icon: () => { return <img alt="" src={process.env.PUBLIC_URL+"/excel_icon.png"} style={{width: 30, height:25}}/> },
            tooltip: 'Export As Date Range Summary',
            isFreeAction: true,
            onClick: (event) => { HandleExportSummary() }
          },
          {
            icon: () => { return <img alt="" src={process.env.PUBLIC_URL+"/excel2_icon.png"} style={{width: 30, height:25}}/> },
            tooltip: 'Export As Deatiled',
            isFreeAction: true,
            onClick: (event) => { HandleExportAll() }
          },
          {
            icon: () => { return <AddCircleIcon className={classes.icon_add_color}/> },
            tooltip: 'Add New Ticket',
            isFreeAction: true,
            onClick: (event) => { HandleAddTicketmasterOpen() }
          }
        ]}
        components={{
          Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
            console.log("custom component filter !!!!"+columnId, value);
            props.onFilterChanged(columnId, value);
            // Do you job here :)
          }}/>
        }}
      />

      {/* add dialog content -->start here */}
      <form noValidate>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'md'} 
        onClose={HandleAddTicketmasterClose} 
        aria-labelledby="customized-dialog-title" 
        open={addopen}
        >
        <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          Add 
          <IconButton aria-label="close" className={classes.closeButton} onClick={HandleAddTicketmasterClose}>
          <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{padding:'0px 20px'}}>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <div className={classes.div_root}>
          <Grid container spacing={2}>
             <Grid item xs={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDatePicker
                      error={!rowData.Ticket_Date}
                      className={classes.datetextField}
                      //variant="inline"
                      label="Ticket Date"
                      value = {fromDBDate(rowData.Ticket_Date)}
                      onChange={handleTicketDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.Ticket_Date &&  "Please enter valid start date."}

                    />
                    </Grid>
                </MuiPickersUtilsProvider>
             </Grid>
             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Shift && <span>Ticket Shift *</span>}{!rowData.Ticket_Shift && <span className={classes.formErrorColor}>Ticket Shift *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Shift}
                onChange={(event)=>setFieldValue('Ticket_Shift',event.target.value)}
                label="Ticket Shift *"
                required
                error={!rowData.Ticket_Shift}
              >
                <MenuItem value="">
                  <em>Ticket Shift *</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Shift')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Shift && <FormHelperText className={classes.formErrorColor}>Please select ticket shift.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={2}>
             <TextField
                error={!rowData.TicketNumber}
                margin="normal"
                required
                fullWidth
                id="TicketNumber"
                label="Ticket Number"
                name="TicketNumber"
                autoComplete="TicketNumber"
                value={rowData.TicketNumber}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('TicketNumber',event.target.value)}
                helperText={!rowData.TicketNumber &&  "Please enter valid ticket No."}
            />
           
             </Grid>
             <Grid item xs={1}>
             <Tooltip title="Check duplicate ticket">
             <IconButton aria-label="Check duplicate ticket number" className={classes.checkButton} onClick={(event)=>HandleDuplicateTicketCheck(event)}>
            < CheckCircleIcon/>
            </IconButton>
            </Tooltip>
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.TicketType && <span>Ticket Type *</span>}{!rowData.TicketType && <span className={classes.formErrorColor}>Ticket Type *</span>}</InputLabel>
              <Select
                error={!rowData.TicketType}
                labelId="demo-simple-select-outlined-label"
                id="TicketType"
                value={rowData.TicketType}
                onChange={(event)=>setFieldValue('TicketType',event.target.value)}
                label="Ticket Type *"
                required
                readOnly
                hidden ="true"
              >
              <MenuItem value="">
                  <em>Ticket Type</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Type')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.TicketType && <FormHelperText className={classes.formErrorColor}>Please select ticket type.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDateTimePicker
                      error={!rowData.StartDateandTime}
                      //variant="inline"
                      ampm={false}
                      label="Ticket Start Date & time"
                      value={rowData.StartDateandTime}
                      onChange={handleTicketStartDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.StartDateandTime &&  "Please enter valid start date & time."}
                    />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  

              </Grid>

              <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Category && <span>Ticket Category *</span>}{!rowData.Ticket_Category && <span className={classes.formErrorColor}>Ticket Category *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Category}
                onChange={(event)=>{
                  setFields({'Ticket_Category':event.target.value,Ticket_SubCategory:"None"})
                }}
                label="Ticket Category"
                required
              >
              <MenuItem value="None">
                  <em>Ticket Category</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Category')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Category && <FormHelperText className={classes.formErrorColor}>Please select ticket category.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_SubCategory && <span>Ticket SubCategory *</span>}{!rowData.Ticket_SubCategory && <span className={classes.formErrorColor}>Ticket SubCategory *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_SubCategory}
                onChange={(event)=>setFieldValue('Ticket_SubCategory',event.target.value)}
                label="Ticket Category"
                required
              >
              <MenuItem value="None">
                  <em>Ticket SubCategory</em>
              </MenuItem>
              {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Category_'+rowData.Ticket_Category)
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_SubCategory && <FormHelperText className={classes.formErrorColor}>Please select ticket sub category.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Priority && <span>Ticket Priority *</span>}{!rowData.Ticket_Priority && <span className={classes.formErrorColor}>Ticket Priority *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Priority}
                onChange={(event)=>setFieldValue('Ticket_Priority',event.target.value)}
                label="Ticket Priority"
                required
              >
              <MenuItem value="">
                  <em>Ticket Priority</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Priority')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Priority && <FormHelperText className={classes.formErrorColor}>Please select ticket priority.</FormHelperText>}
            </FormControl>
             </Grid>
            
             <Grid item xs={12}>
             <TextField
                error={!rowData.IncidentShortSummary}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="IncidentShortSummary"
                label="Incident Short Summary"
                name="IncidentShortSummary"
                autoComplete="IncidentShortSummary"
                value={rowData.IncidentShortSummary}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('IncidentShortSummary',event.target.value)}
                helperText={!rowData.IncidentShortSummary &&  "Please enter incident short summary."}
          />
             </Grid>
             <Grid item xs={12}>
             <TextField
                error={!rowData.IncidentDetail}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="IncidentDetail"
                label="Incident Detail"
                name="IncidentDetail"
                autoComplete="IncidentDetail"
                value={rowData.IncidentDetail}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('IncidentDetail',event.target.value)}
                helperText={!rowData.IncidentDetail &&  "Please enter incident details."}
          />
             </Grid>

             <Grid item xs={12}>
              <MuiExpansionPanel square expanded={expanded === 'panel1'}>
                  <MuiExpansionPanelDetails>
                     <AnalysisHistory data={analysisHistory} onChange={data => setAnalysisHistoryData(data)} />
                  </MuiExpansionPanelDetails>
              </MuiExpansionPanel>
             </Grid>

             <Grid item xs={12}>
             <TextField
                error={(rowData.Ticket_State === "Assigned to L1" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Cancelled" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Closed" && !rowData.ResolutionNotes)}
                margin="normal"
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="ResolutionNotes"
                label="Resolution Notes"
                name="ResolutionNotes"
                autoComplete="ResolutionNotes"
                value={rowData.ResolutionNotes}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('ResolutionNotes',event.target.value)}
                helperText={!rowData.ResolutionNotes &&  "Please enter resolution notes."}
          />
          
             </Grid>
            
             
             <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Bug_ID"
                label="Bug ID"
                name="Bug_ID"
                autoComplete="Bug_ID"
                value={rowData.Bug_ID}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Bug_ID',event.target.value)}
          />
            </Grid>
            <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Ms_TicketNumber"
                label="Vendor Ticket Number"
                name="Ms_TicketNumber"
                autoComplete="Ms_TicketNumber"
                value={rowData.Ms_TicketNumber}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Ms_TicketNumber',event.target.value)}
          />
            </Grid>

            <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Customer_Name"
                label="Customer Name"
                name="Customer_Name"
                autoComplete="Customer_Name"
                value={rowData.Customer_Name}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Customer_Name',event.target.value)}
          />
            </Grid> 
             <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDateTimePicker
                      error={!rowData.StartDateandTime}
                      //variant="inline"
                      ampm={false}
                      label="Ticket EndDate & Time"
                      value={rowData.Ticket_EndDateTime}
                      onChange={handleTicketEndDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                        readOnly:true
                      }}
                      helperText={!rowData.StartDateandTime &&  "Please enter valid end date & time."}
                    />
                  </Grid>
                  </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={3}>
              <TextField
                id="Add_Ticket_Age"
                label="Ticket Age"
                type="text"
                fullWidth
                name="Ticket_Age"
                value={rowData.Ticket_Age}
                className={classes.timetextField}
                onChange={(event)=>setFieldValue('Ticket_Age',event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                  fontSize:15,
                  paddingTop:20,
                  readOnly:true,
                }}
              />
              </Grid>
            </Grid>
           
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleAddTicketmasterClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={(event)=>handleFormSubmit(event,"Add")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      </form>
      {/* add dialog content -->end here */}

      {/* custom alert dialog content -->start here */}
      <Dialog
        open={alertopen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'sm'}
        fullWidth={true}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle}>
        {"Success"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            New Ticket Added Successfully ! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}
      {/* custom alert dialog content -->start here */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={alertdeleteopen}
        onClose={handleAlertDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'sm'}
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
        open={alertdeletesuccessopen}
        onClose={handleAlertDeleteSuccessClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'sm'}
        fullWidth={true}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle}>
        {"Delete Success"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertDeleteSuccessClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Selected Ticket Master Deleted Successfully ! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleAlertDeleteSuccessClose}  variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}

      {/* custom alert dialog content -->start here */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={alerterroropen}
        onClose={handleErrorAlertClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'sm'}
        fullWidth={true}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle}>
        {"No Duplicate Ticket"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleErrorAlertClickClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Ticket Number not available you can proceed .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleErrorAlertClickClose}  variant="contained" color="primary">
            Ok
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
        maxWidth = {'sm'}
        fullWidth={true}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewFormaValidationDioTitle}>
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


      {/* view dialog content -->start here */}
      <Dialog 
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'md'} 
        onClose={handleViewClose} 
        aria-labelledby="customized-dialog-title" 
        open={viewopen}
        disableBackdropClick
        disableEscapeKeyDown
        >
      
        <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          View
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleViewClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <DialogContent style={{padding:'0px 20px'}}>
        
        <div className={classes.div_root}>
          <Grid container spacing={2}>
              <Grid item xs={3}>
              <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_Date"
                label="Ticket Date"
                name="Ticket_Date"
                autoComplete="Ticket_Date"
                autoFocus
                value={fromDBDate(rowData.Ticket_Date)}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_Date',event.target.value)}
          />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_Shift"
                label="Ticket Shift"
                name="Ticket_Shift"
                autoComplete="Ticket_Shift"
                value={rowData.Ticket_Shift}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_Shift',event.target.value)}
          />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="TicketNumber"
                label="Ticket Number"
                name="TicketNumber"
                autoComplete="TicketNumber"
                
                value={rowData.TicketNumber}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('TicketNumber',event.target.value)}
            />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="TicketType"
                label="Ticket Type"
                name="TicketType"
                autoComplete="TicketType"
                value={rowData.TicketType}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('TicketType',event.target.value)}
            />
             </Grid>
             
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="StartDateandTime"
                label="StartDate & Time"
                name="StartDateandTime"
                autoComplete="StartDateandTime"
                
                value={toDBDateTime(rowData.StartDateandTime)}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('StartDateandTime',event.target.value)}
            />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_Category"
                label="Ticket Category"
                name="Ticket_Category"
                autoComplete="Ticket_Category"
                
                value={rowData.Ticket_Category}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_Category',event.target.value)}
            />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_SubCategory"
                label="Ticket SubCategory"
                name="Ticket_SubCategory"
                autoComplete="Ticket_SubCategory"
                
                value={rowData.Ticket_SubCategory}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_SubCategory',event.target.value)}
            />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_Priority"
                label="Ticket Priority"
                name="Ticket_Priority"
                autoComplete="Ticket_Priority"
                
                value={rowData.Ticket_Priority}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_Priority',event.target.value)}
            />
             </Grid>

             <Grid item xs={12}>
             <TextField
                margin="normal"
                fullWidth
                id="IncidentShortSummary"
                label="Incident Short Summary"
                name="IncidentShortSummary"
                autoComplete="IncidentShortSummary"
                value={rowData.IncidentShortSummary}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('IncidentShortSummary',event.target.value)}
            />
             
             </Grid>
             <Grid item xs={12}>
             <TextField
                margin="normal"
                fullWidth
                id="IncidentDetail"
                label="Incident Detail"
                name="IncidentDetail"
                autoComplete="IncidentDetail"
                value={rowData.IncidentDetail}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('IncidentDetail',event.target.value)}
            />
             </Grid>
             <Grid item xs={12}>
             <MuiExpansionPanel square expanded={expanded === 'panel1'}>
                  <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Grid xs={11}> <Typography style={{color:'#3f51b5'}}><b>Analysis History</b></Typography> </Grid> 
                  <Grid xs={1}>
                  </Grid>
                  </MuiExpansionPanelSummary>
                  <MuiExpansionPanelDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" style={{width: '15%'}} className={classes.TableCell_custom}><b>StartDate</b></TableCell>
                              <TableCell align="left" style={{width: '15%'}} className={classes.TableCell_custom}><b>EndDate</b></TableCell>
                              <TableCell align="left" style={{width: '15%'}} className={classes.TableCell_custom}><b>Status</b></TableCell>
                              <TableCell align="left" style={{width: '5%'}} className={classes.TableCell_custom}><b>Team</b></TableCell>
                              <TableCell align="left" style={{width: '15%'}} className={classes.TableCell_custom}><b>Owner</b></TableCell>
                              <TableCell align="left" style={{width: '35%'}} className={classes.TableCell_custom}><b>Work Notes</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {histrows.map((row) => (
                              <TableRow key={row.ID}>
                                <TableCell  component="th" scope="row" style={{width: '15%'}} className={classes.TableCell_custom}>{toDBDateTime(row.StartDateandTime)}</TableCell>
                                <TableCell  component="th" scope="row" style={{width: '15%'}} className={classes.TableCell_custom}>{toDBDateTime(row.EndDateandTime)}</TableCell>
                                <TableCell style={{width: '15%'}} className={classes.TableCell_custom}>{row.Ticket_Status}</TableCell>
                                <TableCell style={{width: '5%'}} className={classes.TableCell_custom}>{row.TeamType}</TableCell>
                                <TableCell style={{width: '15%'}} className={classes.TableCell_custom}>{row.Owner}</TableCell>
                                <TableCell style={{width: '35%'}} className={classes.TableCell_custom}>{row.WorkNotes}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </MuiExpansionPanelDetails>
              </MuiExpansionPanel>
             </Grid>
             <Grid item xs={12}>
             <TextField
                margin="normal"
                fullWidth
                id="ResolutionNotes"
                label="Resolution Notes"
                name="ResolutionNotes"
                autoComplete="ResolutionNotes"
                value={rowData.ResolutionNotes}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('ResolutionNotes',event.target.value)}
            />
             </Grid>

             <Grid item xs={2}>
             <TextField
                margin="normal"
              
                fullWidth
                id="Bug_ID"
                label="Bug ID"
                name="Bug_ID"
                autoComplete="Bug_ID"
                value={rowData.Bug_ID}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Bug_ID',event.target.value)}
            />
             </Grid>
             <Grid item xs={2}>
             <TextField
                margin="normal"
              
                fullWidth
                id="Ms_TicketNumber"
                label="Vendor Ticket Number"
                name="Ms_TicketNumber"
                autoComplete="Ms_TicketNumber"
                value={rowData.Ms_TicketNumber}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ms_TicketNumber',event.target.value)}
            />
             </Grid>

             <Grid item xs={2}>
             <TextField
                margin="normal"
              
                fullWidth
                id="Customer_Name"
                label="Customer Name"
                name="Customer_Name"
                autoComplete="Customer_Name"
                value={rowData.Customer_Name}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Customer_Name',event.target.value)}
            />
             </Grid>
             
             <Grid item xs={3}>
             <TextField
                margin="normal"
                
                fullWidth
                id="Ticket_EndDateTime"
                label="Ticket EndDateTime"
                name="Ticket_EndDateTime"
                autoComplete="Ticket_EndDateTime"
                
                value={toDBDateTime(rowData.Ticket_EndDateTime)}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_EndDateTime',event.target.value)}
            />
             </Grid>
             <Grid item xs={3}>
             <TextField
                margin="normal"
                required
                fullWidth
                id="Ticket_Age"
                label="Ticket Age"
                name="Ticket_Age"
                autoComplete="Ticket_Age"
                
                value={rowData.Ticket_Age}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
            // onChange={(event)=>setFieldValue('Ticket_Age',event.target.value)}
            />
             </Grid>
          </Grid>    
        </div>
        
        </DialogContent>
        <DialogActions>
            <Button onClick={handleViewClose} variant="contained" color="primary">
              Close
            </Button>
             {/* <Button onClick={handleSubmitClose} variant="contained" color="primary">
              Submit
            </Button>  */}
        </DialogActions>
      </Dialog>
      {/* view dialog content -->end here */}


       {/* edit dialog content -->start here */}
       <Dialog 
       scroll={'paper'} 
       fullWidth={true} 
       maxWidth = {'md'} 
       onClose={handleEditClose} 
       aria-labelledby="customized-dialog-title" 
       open={editopen}
       disableBackdropClick
       disableEscapeKeyDown
       >
        <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          Edit
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleEditClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent style={{padding:'0px 20px'}}>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <div className={classes.div_root}>
          <Grid container spacing={2} zeroMinWidth={true}>
             <Grid item xs={3} zeroMinWidth>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDatePicker
                      error={!rowData.Ticket_Date}
                      className={classes.datetextField}
                      //variant="inline"
                      label="Ticket Date"
                      value = {fromDBDate(rowData.Ticket_Date)}
                      onChange={handleTicketDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.Ticket_Date &&  "Please enter valid start date."}

                    />
                    </Grid>
                </MuiPickersUtilsProvider>
             </Grid>
             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Shift && <span>Ticket Shift *</span>}{!rowData.Ticket_Shift && <span className={classes.formErrorColor}>Ticket Shift *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Shift}
                onChange={(event)=>setFieldValue('Ticket_Shift',event.target.value)}
                label="Ticket Shift"
                required
              >
                <MenuItem value="">
                  <em>Ticket Shift</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Shift')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Shift && <FormHelperText className={classes.formErrorColor}>Please select ticket shift.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
             <TextField
                error={!rowData.TicketNumber}
                margin="normal"
                required
                fullWidth
                id="TicketNumber"
                label="Ticket Number"
                name="TicketNumber"
                autoComplete="TicketNumber"
                value={rowData.TicketNumber}
                InputProps={{
                  readOnly: true,
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('TicketNumber',event.target.value)}
                helperText={!rowData.TicketNumber &&  "Please enter valid ticket No."}
            />
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.TicketType && <span>Ticket Type *</span>}{!rowData.TicketType && <span className={classes.formErrorColor}>Ticket Type *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="TicketType"
                value={rowData.TicketType}
                onChange={(event)=>setFieldValue('TicketType',event.target.value)}
                label="Ticket Type"
                required
                readOnly
              >
              <MenuItem value="">
                  <em>Ticket Type</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Type')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.TicketType && <FormHelperText className={classes.formErrorColor}>Please select ticket type.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDateTimePicker
                      error={!rowData.StartDateandTime}
                      //variant="inline"
                      ampm={false}
                      label="Ticket Start Date & time"
                      value={rowData.StartDateandTime}
                      onChange={handleTicketStartDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      helperText={!rowData.StartDateandTime &&  "Please enter valid start date & time."}
                    />
                    </Grid>
                  </MuiPickersUtilsProvider>

              </Grid>

             
              <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Category && <span>Ticket Category *</span>}{!rowData.Ticket_Category && <span className={classes.formErrorColor}>Ticket Category *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Category}
                onChange={(event)=>{
                  setFields({'Ticket_Category':event.target.value,Ticket_SubCategory:"None"})
                }}
                label="Ticket Category"
                required
              >
              <MenuItem value="None">
                  <em>Ticket Category</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Category')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Category && <FormHelperText className={classes.formErrorColor}>Please select ticket category.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_SubCategory && <span>Ticket SubCategory *</span>}{!rowData.Ticket_SubCategory && <span className={classes.formErrorColor}>Ticket SubCategory *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_SubCategory}
                onChange={(event)=>setFieldValue('Ticket_SubCategory',event.target.value)}
                label="Ticket Category"
                required
              >
              <MenuItem value="None">
                  <em>Ticket SubCategory</em>
              </MenuItem>
              {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Category_'+rowData.Ticket_Category)
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              
              </Select>
              {!rowData.Ticket_SubCategory && <FormHelperText className={classes.formErrorColor}>Please select ticket sub category.</FormHelperText>}
            </FormControl>
             </Grid>

             <Grid item xs={3}>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">{rowData.Ticket_Priority && <span>Ticket Priority *</span>}{!rowData.Ticket_Priority && <span className={classes.formErrorColor}>Ticket Priority *</span>}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rowData.Ticket_Priority}
                onChange={(event)=>setFieldValue('Ticket_Priority',event.target.value)}
                label="Ticket Category"
                required
              >
              <MenuItem value="">
                  <em>Ticket Priority</em>
                </MenuItem>
                {
                  Object.values(dropListValues).map((c) =>{
                    if(c.Object_Name === 'Ticket_Priority')
                    return <MenuItem value={c.Object_Key}>{c.Object_Value}</MenuItem>
                  })
                }
              </Select>
              {!rowData.Ticket_Priority && <FormHelperText className={classes.formErrorColor}>Please select ticket priority.</FormHelperText>}
            </FormControl>
             </Grid>
             <Grid item xs={12}>
             <TextField
                error={!rowData.IncidentShortSummary}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="IncidentShortSummary"
                label="Incident Short Summary"
                name="IncidentShortSummary"
                autoComplete="IncidentShortSummary"
                value={rowData.IncidentShortSummary}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('IncidentShortSummary',event.target.value)}
                helperText={!rowData.IncidentShortSummary &&  "Please enter incident short summary."}
          />
             </Grid>
             <Grid item xs={12}>
             <TextField
                error={!rowData.IncidentDetail}
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="IncidentDetail"
                label="Incident Detail"
                name="IncidentDetail"
                autoComplete="IncidentDetail"
                value={rowData.IncidentDetail}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('IncidentDetail',event.target.value)}
                helperText={!rowData.IncidentDetail &&  "Please enter incident details."}
          />
             </Grid>

             <Grid item xs={12}>
             <MuiExpansionPanel square expanded={expanded === 'panel1'}>
                  <MuiExpansionPanelDetails>
                     <AnalysisHistory data={analysisHistory} onChange={data => {
                       setAnalysisHistoryData(data)
                     }} />
                  </MuiExpansionPanelDetails>
              </MuiExpansionPanel>
             </Grid>


             <Grid item xs={12}>
             <TextField
                error={(rowData.Ticket_State === "Assigned to L1" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Cancelled" && !rowData.ResolutionNotes) || (rowData.Ticket_State === "Closed" && !rowData.ResolutionNotes)}
                margin="normal"
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                id="ResolutionNotes"
                label="Resolution Notes"
                name="ResolutionNotes"
                autoComplete="ResolutionNotes"
                value={rowData.ResolutionNotes}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('ResolutionNotes',event.target.value)}
                helperText={!rowData.ResolutionNotes &&  "Please enter resolution notes."}
          />
             </Grid>
            
             <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Bug_ID"
                label="Bug ID"
                name="Bug_ID"
                autoComplete="Bug_ID"
                value={rowData.Bug_ID}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Bug_ID',event.target.value)}
            />
            </Grid>

            <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Ms_TicketNumber"
                label="Vendor Ticket Number"
                name="Ms_TicketNumber"
                autoComplete="Ms_TicketNumber"
                value={rowData.Ms_TicketNumber}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Ms_TicketNumber',event.target.value)}
           />
            </Grid>

            <Grid item xs={2}>
             <TextField
                margin="normal"
                fullWidth
                id="Customer_Name"
                label="Customer Name"
                name="Customer_Name"
                autoComplete="Customer_Name"
                value={rowData.Customer_Name}
                InputProps={{
                  classes: {
                    input: classes.custom_fontsize,
                  },
                }}
                onChange={(event)=>setFieldValue('Customer_Name',event.target.value)}
          />
            </Grid>

             <Grid item xs={3}>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around" className={classes.formPaddingTop}>
                    <KeyboardDateTimePicker
                      error={!rowData.StartDateandTime}
                      //variant="inline"
                      ampm={false}
                      label="Ticket EndDate & Time"
                      value={rowData.Ticket_EndDateTime}
                      onChange={handleTicketEndDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                        readOnly:true
                      }}
                      helperText={!rowData.StartDateandTime &&  "Please enter valid end date & time."}
                    />
                  </Grid>
                  </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={3}>
              <TextField
                id="Ticket_Age"
                label="Ticket Age"
                type="text"
                fullWidth
                name="Ticket_Age"
                value={rowData.Ticket_Age}
                className={classes.timetextField}
                onChange={(event)=>setFieldValue('Ticket_Age',event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                  fontSize:15,
                  paddingTop:20,
                  readOnly:true,
                }}
              />
              </Grid>
             

            </Grid>
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleEditClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={(event)=>handleFormSubmit(event,"Edit")} variant="contained" color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
      {/* edit dialog content -->end here */}
      {/* custom alert dialog content -->start here */}
        <Dialog
        open={alerteditopen}
        onClose={handleAlertEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'sm'}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" className={classes.viewDioTitle}>
        {"Success"}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleAlertEditClose}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selected Ticket Updated Successfully ! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertEditClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* custom alert dialog content -->end here */}

      {/* date range dialog content -->start here */}
      <form noValidate>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        scroll={'paper'}
        fullWidth={true} 
        maxWidth = {'sm'} 
        onClose={HandleDateExportmasterClose} 
        aria-labelledby="customized-dialog-title" 
        open={daterangeopen}
        >
        <DialogTitle id="customized-dialog-title" className={classes.viewDioTitle}>
          Date Range Export 
          <IconButton aria-label="close" className={classes.closeButton} onClick={HandleDateExportmasterClose}>
          <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{padding:'0px 20px'}}>
        {
        isLoadingDialog && 
        <LinearProgress color="secondary"/>
        }
        <div className={classes.div_root}>
          <Grid container spacing={2}>
             <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDateTimePicker
                      //error={!rowData.Ticket_Date}
                      ampm = {false}
                      className={classes.datetextField}
                      //variant="inline"
                      label="From Date"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Ticket_Date &&  "Please enter valid start date."}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>   
             </Grid>
             <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDateTimePicker
                      //error={!rowData.Ticket_Date}
                      ampm = {false}
                      className={classes.datetextField}
                      //variant="inline"
                      label="To Date"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      onError={console.log}
                      format="yyyy-MM-dd HH:mm:ss"
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      InputProps={{
                        classes: {
                          input: classes.custom_fontsize,
                        },
                      }}
                      //helperText={!rowData.Ticket_Date &&  "Please enter valid start date."}

                    />
                    </Grid>
                </MuiPickersUtilsProvider>   
             </Grid>
           </Grid>
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={HandleDateExportmasterClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button  onClick={handleFormExportSubmit} variant="contained" color="primary">
              Export
            </Button>
        </DialogActions>
      </Dialog>
      </form>
      {/* date range  dialog content -->end here */}

      </div>
      </MuiThemeProvider>
    )
  }
  