import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import getDefaultEnumData from '../data/enum';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // margin: '10px 0',
    display: 'flex',
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
    width: '100%',
    margin: '0 auto',
    border: '1px solid',
    padding: 10
  },
  formControl: {
    width: '100%',
    margin: '0 auto',
  }
}));

export default function EnumGenerator() {
  const classes = useStyles();
  const [enumData, setEnumData] = React.useState(getDefaultEnumData());

  const handleChange =event => {
    setEnumData(event.target.value.trim());
  };

  const generateEnum = (str = '') => {
    if (!str || !str.length || str.split(' ').length < 2) {
      return null;
    }
    return str.split('\n')
      .filter(val => !!val)
      .reduce((acc, cur) => {
        acc[cur] = cur;
        return acc;
      }, {});
  }

  const formattedEnum = generateEnum(enumData) || {'data': 'noData'};
  const stringifiedEnum = JSON.stringify(formattedEnum, undefined, 2)

  return (
    <div className={classes.root}>
      <div style={{ width: '49%', margin: '0 auto' }}>
        <Typography variant="h2" className={classes.title}>
          Raw
        </Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Enum</InputLabel>
          <OutlinedInput
            id="outlined-adornment-enum"
            value={enumData}
            onChange={handleChange}
            multiline
            // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
      </div>

      <div style={{ width: '49%', margin: '0 auto' }}>
        <Typography variant="h2" className={classes.title}>
          Formatted
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigator.clipboard.writeText(stringifiedEnum)}
        >
          Copy
        </Button>
        </Typography>
        <pre className={classes.pre}>
          <code>
            {stringifiedEnum}
          </code>
        </pre>
      </div>
    </div>
  );
}
