import React from 'react';
import { Bar } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import palette from '../theme/palette';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '390px'
  },
  stats: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: 8
  },
  chartFont:{
    fontSize:10,
  }

}));

export default function ByTypeReport(props)
{
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState(props.data);
  var dataArray = [];
  React.useEffect(() => {
      console.log(JSON.stringify(props.data));
  }, [props.data]);

  for(var i=0;i<props.data.length;i++){
    dataArray.push(props.data[i].TYPECASE);
    dataArray.push(props.data[i].TYPEINCIDENT);
  }



  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: { display: true },
    cornerRadius: 20,
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
          maxBarThickness: 46,
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


  const piedata = {
    datasets: [
      {
        label: 'Ticket Type',
        data: dataArray,
        backgroundColor: [
          palette.secondary.main,
          palette.success.main
        ],
        borderWidth: 3,
        borderColor: palette.white,
        hoverBorderColor: palette.white
      }
    ],

    labels: ['CASE','INCIDENT']
  };

  const devices = [
    {
      title: 'CASE',
      value: dataArray[0],
      icon: "",
      color: palette.primary.main
    },
    {
      title: 'INCIDENT',
      value: dataArray[1],
      icon: "",
      color: palette.success.main,
    }
  ];

  return (
    <Card>
      <CardHeader 
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="By Ticket Type"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={piedata}
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