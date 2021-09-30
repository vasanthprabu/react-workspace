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

export default function ByExecuteSummaryReport(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState(props.data);
  var dataArray = [];
  React.useEffect(() => {
      console.log(JSON.stringify(props.data));
  }, [props.data]);

  for(var i=0;i<props.data.length;i++){
    dataArray.push(props.data[i].TYPEINCIDENT);
    dataArray.push(props.data[i].TYPECASE);
    dataArray.push(0);
  }

  const bardata = {
    labels: ['Incident’s', 'Service Request', 'Bug’s'],
    datasets: [
      {
        label: 'Request Summary',
        backgroundColor: palette.warning.main,
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
      title: 'Incident’s',
      value: dataArray[0],
      icon: "",
      color: palette.warning.main
    },
    {
      title: 'Service Request',
      value: dataArray[1],
      icon: "",
      color: palette.warning.main
    },
    {
      title: 'Bug’s',
      value: dataArray[2],
      icon: "",
      color: palette.warning.main,
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
        title="Request Summary"
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
