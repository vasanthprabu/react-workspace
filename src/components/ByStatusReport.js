import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';
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
    height: '300px'
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
  }

}));

export default function ByStatusReport(props)
{
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState(props.data);
  var dataArray = [];
  React.useEffect(() => {
      console.log(JSON.stringify(props.data));
  }, [props.data]);

for(var i=0;i<props.data.length;i++){
  dataArray.push(props.data[i].L1Count);
  dataArray.push(props.data[i].L2Count);
  dataArray.push(props.data[i].OpenCount);
  dataArray.push(props.data[i].ClosedCount);
  dataArray.push(props.data[i].OnHoldCount);
  dataArray.push(props.data[i].VendorCount);
  dataArray.push(props.data[i].CSOCount);
  dataArray.push(props.data[i].AwitingCount);
  dataArray.push(props.data[i].CancelledCount);
}

  const staticdata = {
    datasets: [
      {
        data: dataArray,
        backgroundColor: [
          palette.primary.main,
          palette.secondary.main,
          palette.success.main,
          palette.error.main,
          palette.warning.main,
          palette.chart1.main,
          palette.chart2.main,
          palette.chart3.main,
          palette.text.link
        ],
        borderWidth: 8,
        borderColor: palette.white,
        hoverBorderColor: palette.white
      }
    ],

    labels: ['Assigned to L1','Assigned to L2','Open','Closed','On Hold','Vendor','Assigned to CSO','Awiting','Cancelled']
  };

  const options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 60,
    layout: { padding: 0 },
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
    }
  };

  const devices = [
    {
      title: 'L1',
      value: dataArray[0],
      icon: "",
      color: palette.primary.main
    },
    {
      title: 'L2',
      value: dataArray[1],
      icon: "",
      color: palette.secondary.main
    },
    {
      title: 'Open',
      value: dataArray[2],
      icon: "",
      color: palette.success.main,
    },
    {
      title: 'Closed',
      value: dataArray[3],
      icon: "",
      color: palette.error.main
    }
    ,
    {
      title: 'On Hold',
      value: dataArray[4],
      icon: "",
      color: palette.chart1.main
    }
    ,
    {
      title: 'Vendor',
      value: dataArray[5],
      icon: "",
      color: palette.warning.main
    }
    ,
    {
      title: 'CSO',
      value: dataArray[6],
      icon: "",
      color: palette.chart2.main
    }
    ,
    {
      title: 'Awiting',
      value: dataArray[7],
      icon: "",
      color: palette.chart3.main
    }
    ,
    {
      title: 'Cancelled',
      value: dataArray[8],
      icon: "",
      color: palette.text.main
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
        title="By Status"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={staticdata}
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