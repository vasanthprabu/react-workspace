import React from 'react';
import '../App.css';
import 
    { 
        makeStyles,
        createMuiTheme,
        MuiThemeProvider
    } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import 
    {
        LinearProgress,
        Button
    }
 from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import * as moment from 'moment';
import { Grid } from '@material-ui/core';
import  ByShiftReport  from '../components/ByShiftReport'
import  ByStatusReport  from '../components/ByStatusReport'
import  ByCategoryMixReport  from '../components/ByCategoryMixReport'
import  ByTypeReport  from '../components/ByTypeReport'
import  ByTicketAgeReport  from '../components/ByTicketAgeReport'
import  ByExecuteSummaryReport from '../components/ByExecuteSummaryReport'
import { chart_status_url,chart_age_url } from "../constant";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
    paddingLeft:'6%',
  },
  gridPaddingTop:{
    paddingTop:25
  }
}));

export default function ChartsShowcase() {
  const classes = useStyles();
  const [isLoading,setIsLoading] = React.useState(false);
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('05-01-2020'));
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());
  const [statusReportData,setStatusReportData] = React.useState([]);
  const [ageReportData,setAgeReportData] = React.useState([]);
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };

 const handleFilterSubmit = () =>{
  fetchChartData();
 }

 const fetchChartData = () =>{
    setIsLoading(true);
    fetch(chart_status_url+moment(selectedFromDate,'DD-MM-YYYY').format('DD-MM-YYYY')+","+moment(selectedToDate,'DD-MM-YYYY').format('DD-MM-YYYY'))
    .then(res => res.json())
    .then((result)=>{
      console.log(JSON.stringify(result));
      setStatusReportData(result);
      fetch(chart_age_url+moment(selectedFromDate,'DD-MM-YYYY').format('DD-MM-YYYY')+","+moment(selectedToDate,'DD-MM-YYYY').format('DD-MM-YYYY'))
      .then(res => res.json())
      .then((result)=>{
        setAgeReportData(result);
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
  }
  // Ajax Call Starts here
  React.useEffect(() => {
    setIsLoading(true);
    fetch(chart_status_url+moment(selectedFromDate,'DD-MM-YYYY').format('DD-MM-YYYY')+","+moment(selectedToDate,'DD-MM-YYYY').format('DD-MM-YYYY'))
    .then(res => res.json())
    .then((result)=>{
      setStatusReportData(result);
      fetch(chart_age_url+moment(selectedFromDate,'DD-MM-YYYY').format('DD-MM-YYYY')+","+moment(selectedToDate,'DD-MM-YYYY').format('DD-MM-YYYY'))
      .then(res => res.json())
      .then((result)=>{
        setAgeReportData(result);
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

  
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiTypography: {
      // Name of the rule
      h5: {
        // Some CSS
        fontSize: 16,
      },
    },
    MuiCardHeader:{
      root:{
        padding:9
      }
    },
}
});


  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      {
        isLoading && 
        <LinearProgress color="secondary"/>
      }
      <Grid
        container
        spacing={1}
      >
            <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="From Date"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="To Date"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                 </MuiPickersUtilsProvider>
                </Grid>
                <Grid xs={1} className={classes.gridPaddingTop}>
                <Button  onClick={handleFilterSubmit} variant="contained" color="primary">
                  Go
                </Button>
                </Grid>
                <Grid xs={3}>
                </Grid>

        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
         <ByStatusReport data={statusReportData} />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
         
         <ByShiftReport data={statusReportData}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
         <ByCategoryMixReport data={statusReportData}/>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
         <ByTypeReport data={statusReportData}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
        <ByTicketAgeReport data={ageReportData}/>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
         <ByExecuteSummaryReport data={statusReportData} />
        </Grid>
      </Grid>
    </div>
    </MuiThemeProvider>
  );
}

