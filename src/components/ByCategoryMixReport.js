import React from 'react';
import { Pie } from 'react-chartjs-2';
import { makeStyles,useTheme } from '@material-ui/styles';

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Button,
  Typography
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import palette from '../theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
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

export default function ByCategoryMixReport(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = React.useState(props.data);
  var dataArray = [];
  React.useEffect(() => {
      console.log(JSON.stringify(props.data));
  }, [props.data]);

  for(var i=0;i<props.data.length;i++){
    dataArray.push(props.data[i].bulkupd);
    dataArray.push(props.data[i].compenrol);
    dataArray.push(props.data[i].userenrol);
    dataArray.push(props.data[i].domainenrol);
    dataArray.push(props.data[i].approvision);
    dataArray.push(props.data[i].deluser);
    dataArray.push(props.data[i].cpsync);
    dataArray.push(props.data[i].compissue);
    dataArray.push(props.data[i].optin);
    dataArray.push(props.data[i].mftotp);
    dataArray.push(props.data[i].datacoll);
    dataArray.push(props.data[i].inviteredem);
    dataArray.push(props.data[i].tenantrest);
    dataArray.push(props.data[i].emailupn);
    dataArray.push(props.data[i].natcloud);
    dataArray.push(props.data[i].userdel);
    dataArray.push(props.data[i].domainchk);
    dataArray.push(props.data[i].azure);
    dataArray.push(props.data[i].alertsite);
    dataArray.push(props.data[i].bigeye);
    dataArray.push(props.data[i].hpbpm);
  }

  const mixdata = {
    labels: ['Bulk Upload','Company Enrolment','User Enrolment','Domain Enrolment','Application Provisioning','Delete User','CP Sync','Compatibility Issue','Opt In','MFA/OTP','Data Collection','Invite Redemption','Tenant Restriction','Email and UPN different','National Cloud','User Deletion','Domain Checks','Azure','Alertsite','BigEye','HP BPM'],
    datasets: [
      {
        data: dataArray,
        backgroundColor: [
          palette.primary.main,
          palette.secondary.main,
          palette.success.main,
          palette.info.main,
          palette.warning.main,
          palette.error.main,
          palette.chart1.main,
          palette.chart2.main,
          palette.chart3.main,
          palette.info.dark,
          palette.warning.dark,
          palette.error.dark,
          palette.primary.dark,
          palette.secondary.dark,
          palette.success.dark,
          palette.chart1.light,
          palette.chart2.light,
          palette.chart3.light,
          palette.primary.light,
          palette.secondary.light,
          palette.success.light,
        ],
        borderWidth: 3,
        borderColor: palette.white,
        hoverBorderColor: palette.white
      }
    ]
    
  };

  const devices = [
    {
      title: 'BulkUpload',
      value: dataArray[0],
      icon: "",
      color: palette.primary.main
    },
    {
      title: 'CompEnrol',
      value: dataArray[1],
      icon: "",
      color: palette.secondary.main
    },
    {
      title: 'UserEnrol',
      value: dataArray[2],
      icon: "",
      color: palette.success.main,
    },
    {
      title: 'DomEnrol',
      value: dataArray[3],
      icon: "",
      color: palette.error.main
    }
    ,
    {
      title: 'Appprov',
      value: dataArray[4],
      icon: "",
      color: palette.chart1.main
    }
    ,
    {
      title: 'DelUser',
      value: dataArray[5],
      icon: "",
      color: palette.warning.main
    }
    ,
    {
      title: 'CPSync',
      value: dataArray[6],
      icon: "",
      color: palette.chart2.main
    }
    ,
    {
      title: 'CompIsue',
      value: dataArray[7],
      icon: "",
      color: palette.chart3.main
    }
    ,
    {
      title: 'OptIn',
      value: dataArray[8],
      icon: "",
      color: palette.info.dark
    },
    {
      title: 'MFA/OTP',
      value: dataArray[9],
      icon: "",
      color: palette.warning.dark
    }
    ,
    {
      title: 'Data Coll',
      value: dataArray[10],
      icon: "",
      color: palette.error.dark
     },
    {
      title: 'EmailUPN',
      value: dataArray[11],
      icon: "",
      color: palette.primary.dark
    }
    ,
    {
      title: 'NatClod',
      value: dataArray[12],
      icon: "",
      color: palette.secondary.dark
    }
    ,
    {
      title: 'Domchk',
      value: dataArray[13],
      icon: "",
      color: palette.success.dark
    }
    ,
    {
      title: 'Azure',
      value: dataArray[14],
      icon: "",
      color: palette.chart1.light
    }
    ,
    {
      title: 'Alrtsite',
      value: dataArray[15],
      icon: "",
      color: palette.chart2.light
    }
    ,
    {
      title: 'BigEye',
      value: dataArray[16],
      icon: "",
      color: palette.chart3.light
    }
    ,
    {
      title: 'HPBPM',
      value: dataArray[17],
      icon: "",
      color: palette.primary.light
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
        title="By Category"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Pie
            data={mixdata}
            //options={options}
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
