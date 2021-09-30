import React from 'react';
import MaterialTable,{ MTableEditField } from 'material-table';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import * as moment from 'moment';
import 
    { 
        TextField,
        InputLabel,
        MenuItem,
        FormControl,
        Select,
        FormHelperText,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogContentText,
        DialogActions,
        IconButton,
        Button
        
    } from '@material-ui/core';
import 
    {   createMuiTheme,
        makeStyles,
        MuiThemeProvider
    } from '@material-ui/core/styles';
    import { maintenance_droplist_url } from "../constant";

    
    function toDBDateTime(datetimestring){
      return moment(datetimestring,'YYYY-MM-DDTHH:mm:ss').format('DD-MM-YYYYTHH:mm:ss')
    }

    const useStyles = makeStyles((theme) => ({
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: 4,
        color: theme.palette.grey[500],
      },
      viewFormaValidationDioTitle:{
        backgroundColor:'#e53935',
        color:'#fffff !important',
      },
    }))

export default function AnalysisHistory(props) {
  const classes = useStyles();
  const [formvalidationopen,setFormValidationOpen] = React.useState(false);
  const [formvalidationerrors,setFormValidationErrors] = React.useState({});
  const [dropListValues, setDropListValues] = React.useState([]);

  const handleAlertFormValidationClose = () =>{
    setFormValidationOpen(false);
  }
  //Alert transition left
  const TransitionUp = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  //dynamic lookup drop list values -- team type
  const team_type_lookup = {};
  dropListValues.map(client => {
      const { Object_Name, Object_Key, Object_Value } = client;
      if( Object_Name === 'Ticket_Team_Type')
      team_type_lookup[ Object_Key ] = Object_Value
  })
  
  //dynamic lookup drop list values -- owner
  const owner = {};
  dropListValues.map(client => {
      const { Object_Name, Object_Key, Object_Value } = client;
      if( Object_Name === 'Ticket_Owner')
      owner[ Object_Key ] = Object_Value
  })

   //dynamic lookup drop list values -- owner
   const state = {};
   dropListValues.map(client => {
       const { Object_Name, Object_Key, Object_Value } = client;
       if( Object_Name === 'Ticket_State')
       state[ Object_Key ] = Object_Value
   })


    const columns = [
      { title: 'StDate', field: 'StartDateandTime',id:'StDate',type: 'datetime' ,width: '15%',required:true, render: rowData =>{
        return toDBDateTime(rowData.StartDateandTime);
      }},
      { title: 'EndDate', field: 'EndDateandTime',id:'EndDate',type: 'datetime',width: '15%',required:true, render: rowData =>{
        //console.log("Fromatting date -->"+rowData.EndDateandTime);
        if(rowData.EndDateandTime !=='')
        return toDBDateTime(rowData.EndDateandTime);
        else
        return rowData.EndDateandTime;
      }},
      { title: 'Type', field: 'TeamType' ,
      lookup: team_type_lookup,width: '5%',required:true},
      { title: 'Status', field: 'Ticket_Status',width: '20%',lookup:state,required:true},
      { title: 'Owner', field: 'Owner',width: '20%',lookup:owner,required:true},
      { title: 'WorkNotes', field: 'WorkNotes',width: '25%'},
    ];
    const [data, setData] = React.useState(props.data);
    const [editflag, setEditFlag] = React.useState(true);
    const [deleteflag, setDeleteFlag] = React.useState(true);

    React.useEffect(() => {
        setData(props.data);
        fetch(maintenance_droplist_url)
        .then(droplist => droplist.json())
        .then((droplistresult)=>{
          //console.log("Onload droplist before set values ->"+JSON.stringify(droplistresult));
          setDropListValues(droplistresult);
        }).catch((error) =>{
          console.log(error);
        })
        .finally(()=>{
        })
    }, [props.data]);

    const updateData = (newData) => {
        setData(newData);
        //console.log("New Data"+JSON.stringify(newData));
        console.log(props);
        props.onChange(newData);
    };

  

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
          MuiPaper:{
              root:{
                width:'100%'
              }
          },
          MuiTableCell:{
              root:{
                  padding:2
              }
          },
          MuiDialog:{
             paperWidthSm:{
                 maxWidth:345,
             }
          },
          MuiPopover:{
              paper:{
                  maxWidth:'10%'
              }
          },
          MuiInputBase:{
            root:{
              width:'100%'
            }
          }
        },
      });

    return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        title="Analysis History"
        width="100%"
        columns={columns}
        data={data}
        options={{
            paging: false
          }}
        components={{
            EditField: (props) => {
              if (props.rowData.EndDateandTime === "") {
                return (<MTableEditField {...props} error/>);
              }
              else if(props.rowData.TeamType === ""){
                return (<MTableEditField {...props} error/>);
              }
              else if(props.rowData.Ticket_Status === ""){
                return (<MTableEditField {...props} error/>);
              }
              else if(props.rowData.Owner === ""){
                return (<MTableEditField {...props} error/>);
              }
              else if(props.rowData.WorkNotes === ""){
                return (<MTableEditField {...props} error/>);
              }
              return (<MTableEditField {...props} />);
            },
          }}
        editable={{
          isEditable: data => data.Edit_Flag !== "E",
          isDeletable: data => data.Edit_Flag !== "E",
           //isEditable:data => true,
           //isDeletable:data => true,
          onRowAddCancelled:data => {
          
          },
          onRowUpdateCancelled: data => {
           
          },
          onRowAdd: newData =>{
            if(!moment(newData.EndDateandTime).isAfter(moment(newData.StartDateandTime))){
              alert("Ticket end date should be equal or after start date");
              return Promise.reject();
            }
            else if(!moment(newData.EndDateandTime).isSameOrBefore(moment().format('YYYY-MM-DDTHH:mm:ss'))){
              alert("Ticket end date should not be future date");
              return Promise.reject();
            }
            else if(newData.TeamType === ""){
              alert("Please select analysis history ticket type");
              return Promise.reject();
            }
            else if(newData.Ticket_Status === ""){
              alert("Please select analysis history ticket status");
              return Promise.reject();
            }
            else if(newData.Owner === ""){
              alert("Please select analysis history ticket owner");
              return Promise.reject();
            }
            else if(newData.WorkNotes === ""){
              alert("Please enter analysis history work notes");
              return Promise.reject();
            }
            else{
              updateData([...data, newData]); 
              return Promise.resolve();
            }

          },
          onRowUpdate: (newData, oldData) =>
           { 
              const dataUpdate = [...data];
                const index = oldData.tableData.id;
                newData.EndDateandTime = moment.utc(newData.EndDateandTime).local().format();
                dataUpdate[index] = newData;
                if(!moment(newData.EndDateandTime).isAfter(moment(newData.StartDateandTime))){
                  alert("Ticket end date should be equal or after start date");
                  return Promise.reject();
                }
                else if(!moment(newData.EndDateandTime).isSameOrBefore(moment().format('YYYY-MM-DDTHH:mm:ss'))){
                  alert("Ticket end date should not be future date");
                  return Promise.reject();
                }
                else if(newData.TeamType === ""){
                  alert("Please select analysis history ticket type");
                  return Promise.reject();
                }
                else if(newData.Ticket_Status === ""){
                  alert("Please select analysis history ticket status");
                  return Promise.reject();
                }
                else if(newData.Owner === ""){
                  alert("Please select analysis history ticket owner");
                  return Promise.reject();
                }
                else if(newData.WorkNotes === ""){
                  alert("Please enter analysis history work notes");
                  return Promise.reject();
                }
                else{
                updateData([...dataUpdate]);
                return Promise.resolve();
              }
           },
          onRowDelete: oldData => {
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            updateData([...dataDelete]);
            return Promise.resolve()
          }
        }}
      />
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
      </MuiThemeProvider>
      
    )
    
  }
  