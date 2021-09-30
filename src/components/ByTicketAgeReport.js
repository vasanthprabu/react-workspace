import React from 'react';
import { Bar } from 'react-chartjs-2';
import { makeStyles,useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from '../theme/palette';
const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 300,
    position: 'relative'
  },
  stats: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: 3
  },
  chartFont:{
    fontSize:10,
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export default function ByTicketAgeReport(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState(props.data);
  var dataArray = [];
  var splitdataArray;
  var splitArrayvalues;
  var lessthan_5 = 0;
  var lessthan_10 = 0;
  var lessthan_15 = 0;
  var lessthan_20 = 0;
  var lessthan_24 = 0;
  var morethan_24 = 0;
  React.useEffect(() => {
      console.log(JSON.stringify(props.data));
  }, [props.data]);

  for(var i=0;i<props.data.length;i++){
    splitdataArray = props.data[i].Ticket_Age+'';
    splitArrayvalues = splitdataArray.split(":");
      const elementhour = splitArrayvalues[0];
      //console.log("each loop array -->"+elementhour);
      if(elementhour < 5){
        lessthan_5 = lessthan_5 + 1;
      }
      else if(elementhour < 10){
        lessthan_10 = lessthan_10 + 1;
      }
      else if(elementhour < 15){
        lessthan_15 = lessthan_15 + 1;
      }
      else if(elementhour < 20){
        lessthan_20 = lessthan_20 + 1;
      }
      else if(elementhour < 24){
        lessthan_24 =lessthan_24 + 1;
      }
      else{
        morethan_24 = morethan_24 + 1;
      }
  }
  dataArray.push(lessthan_5);
  dataArray.push(lessthan_10);
  dataArray.push(lessthan_15);
  dataArray.push(lessthan_20);
  dataArray.push(lessthan_24);
  dataArray.push(morethan_24);
  console.log("ticket age data array -->"+dataArray);

  const bardata = {
    labels: ['Age less than 5 hrs', 'Age less than 10 hrs', 'Age less than 15 hrs', 'Age less than 20 hrs', 'Age less than 24 hrs', 'Age more than 24 hrs'],
    datasets: [
      {
        label: 'Ticket Age',
        backgroundColor: palette.secondary.main,
        data: dataArray
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: true },
    cornerRadius: 30,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: palette.divider,
      backgroundColor: palette.white,
      titleFontColor: palette.text.primary,
      bodyFontColor: palette.text.secondary,
      footerFontColor: palette.text.secondary
    },
    layout: { padding: 0 },
    scales: {
      xAxes: [
        {
          barThickness: 50,
          maxBarThickness: 38,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: palette.divider
          }
        }
      ]
    }
  };

  const devices = [
    {
      title: 'Age less than 5 hrs',
      value: dataArray[0],
      icon: "",
      color: palette.primary.main
    },
    {
      title: 'Age less than 10 hrs',
      value: dataArray[1],
      icon: "",
      color: palette.primary.main
    },
    {
      title: 'Age less than 15 hrs',
      value: dataArray[2],
      icon: "",
      color: palette.primary.main,
    },
    {
      title: 'Age less than 20 hrs',
      value: dataArray[3],
      icon: "",
      color: palette.primary.main,
    },
    {
      title: 'Age less than 24 hrs',
      value: dataArray[4],
      icon: "",
      color: palette.primary.main,
    },
    {
      title: 'Age more than 24 hrs',
      value: dataArray[5],
      icon: "",
      color: palette.primary.main,
    },
  ];


  return (
    <Card>
      <CardHeader
         action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="By Ticket Age"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={bardata}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography className={classes.chartFont}>{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
              >
                {device.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
}
