import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import actions from '../../store/actions'
import HelpDialog from '../HelpDialog';
import services from '../../services';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  progress: {
    margin: '10px'
  }
});

export default function FirebaseStorage() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const bucketName = useSelector(state => state['inputs']['bucketName'])
  const firebaseServiceAccount = useSelector(state => state['inputs']['firebaseServiceAccount'])
  const firebaseStorage = useSelector(state => state['inputs']['firebaseStorage'])

  const loadingFirebaseStorage = useSelector(state => state['inputs']['loadingFirebaseStorage'])

  const bull = <span className={classes.bullet}>•</span>;
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const [helpOpen, setHelpOpen] = React.useState(false);

  // 0 : instruction
  // 1 : warning
  const [helpType, setHelpType] = React.useState(0);

  const handleHelp = (helpType) => {
    services.openURL("https://github.com/Qolzam/telar-cli/blob/master/docs/ofcc-setup/3.md")
  };

  const handleCloseHelp = () => {
    setHelpOpen(false);
  };

  const helpContent = () => (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant={'h5'} color="textPrimary" gutterBottom>
          In this step you need to enter your Github account username and a directory path where you want to keep Telar Social project source code.
  </Typography>
        <br />
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  )

  const warningContent = () => (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant={'h5'} color="textPrimary" gutterBottom>
        ⚠️ We strictly recommend you to use your own Firebase Storage. 
        Public Firebase Storage only use for testing, because everybody can see your data and also there is no garanty for data persistance. 
        Public Firebase Storage is a free and shared Firebase Storage account! 
  </Typography>
        <br />
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  )

  const handleChange = name => event => {
    dispatch(actions.setInput(name, event.currentTarget.value))
  };
  const checkBox = (checked) => {
    if (checked) {
      return <GreenCheckbox checked={true} />
    }
    return <CircularProgress className={classes.progress} size={17} color="secondary" />
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Button variant="outlined" color="secondary" onClick={() => handleHelp(0)}>
          Need Help?
      </Button>
      <br />
        <br />
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Enter bucket name and download service account file in project directory
        </Typography>
        <br />
        <TextField
          required
          onChange={handleChange('bucketName')}
          value={bucketName}
          id="outlined-required"
          label="Bucket Name"

          variant="outlined"
        />
        <br />
        <br />

       { loadingFirebaseStorage && (
         
         <FormControl component="fieldset" className={classes.formControl}>

          <FormGroup>
            <FormControlLabel
              control={checkBox(firebaseStorage)}
              label="Check serviceAccount.json file"
              checked={firebaseStorage}
            />

            <FormControlLabel
              control={checkBox(firebaseStorage)}
              label="Check firebase storage"
              checked={firebaseStorage}
            />

          </FormGroup>
        </FormControl>)}
      </CardContent>
      <CardActions>
      </CardActions>
      <HelpDialog open={helpOpen} onClose={handleCloseHelp} title={helpType === 0 ? 'Instruction' : '⚠️Warning ⚠️'}>
        {helpType === 0 ? helpContent() : warningContent()}
      </HelpDialog>
    </Card>
  );
}