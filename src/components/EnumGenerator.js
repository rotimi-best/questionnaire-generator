import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '10px 0'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(1),
  },
  pre: {
    textAlign: 'left',
    width: '70%',
    margin: '0 auto',
    border: '1px solid',
    padding: 10
  },
  formControl: {
    width: '80%',
    margin: '0 auto',
  }
}));

export default function EnumGenerator() {
  const classes = useStyles();
  const [enumData, setEnumData] = React.useState('');

  const handleChange =event => {
    setEnumData(event.target.value.trim());
  };

  const generateEnum = (str = '') => {
    if (!str || !str.length || str.split(' ').length < 2) {
      return null;
    }
    return str.split(' ')
      .filter(val => !!val)
      .reduce((acc, cur) => {
        acc[cur] = cur;
        return acc;
      }, {});
  }

  const formattedEnum = generateEnum(enumData) || {'data': 'noData'};

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Enter enum string
      </Typography>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Enum</InputLabel>
        <OutlinedInput
          id="outlined-adornment-enum"
          value={enumData}
          onChange={handleChange}
          // multiline
          // startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <Typography variant="h2" className={classes.title}>
        Result
      </Typography>
      <pre className={classes.pre}>
        <code>
          {JSON.stringify(formattedEnum, undefined, 2)}
        </code>
      </pre>
    </div>
  );
}
