import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { formatQuestions } from '../helpers/questionnaireGenerator';
import getDefaultQuestionnaireData from '../data/questionnaire';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // margin: '10px 0',
    display: 'flex',
    // flexDirection: ''
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
  const [questionsData, setQuestionData] = React.useState(getDefaultQuestionnaireData());

  const handleChange =event => {
    setQuestionData(event.target.value.trim());
  };

  const formattedQuestions = formatQuestions(questionsData) || {'data': 'noData'};
  const stringifiedQuestions = JSON.stringify(formattedQuestions, undefined, 2);

  return (
    <div className={classes.root}>
      <div style={{ width: '49%', margin: '0 auto' }}>
        <Typography variant="h2" className={classes.title}>
          Raw
        </Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Data from GDOC</InputLabel>
          <OutlinedInput
            id="outlined-adornment-enum"
            value={questionsData}
            onChange={handleChange}
            // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={120}
            multiline
          />
        </FormControl>
      </div>
      <div style={{ width: '49%', margin: '0 auto' }}>
        <Typography variant="h2" className={classes.title}>
          Formatted
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator.clipboard.writeText(stringifiedQuestions)}
          >
            Copy
          </Button>
        </Typography>
        <pre className={classes.pre}>
          <code>
            {stringifiedQuestions}
          </code>
        </pre>
      </div>
    </div>
  );
}
