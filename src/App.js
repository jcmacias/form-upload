import React, { useState } from 'react';
import { Modal, Backdrop, Fade, TextField, Grid, Paper, Radio, RadioGroup, FormControlLabel, Button, Switch, LinearProgress, IconButton, Typography, Divider, MenuItem, styled } from '@material-ui/core';
import { Close as CloseIcon, InsertDriveFile as InsertDriveFileIcon, AccessTime as Clock } from '@material-ui/icons';
import Dropzone from 'react-dropzone'
import { makeStyles } from "@material-ui/core/styles";


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  marginRight: 5,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1c3e6f',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  }
}));

const CustomInsertFileIcon = () => <InsertDriveFileIcon fontSize='large' style={{ color: '#ff9c18' }} />

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: '8px',
    padding: '16px',
    borderColor: '#d3d3d3'
  },
  dropArea: {
    border: '1px',
    borderStyle: 'dashed',
    width: '100%',
    marginBottom: '10px',
    paddingTop: '5px',
    borderColor: '#d3d3d3'
  }
}));

const MyFormModal = () => {
  const [importName, setImportName] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // Set a default progress for demonstration
  const [radioValue, setRadioValue] = useState('yes');
  const [dropdownOptions, setDropdownOptions] = useState(['Option 1', 'Option 2']);
  const [continueClicked, setContinueClicked] = useState(false);
  const [buffer, setBuffer] = useState(10);

  const classes = useStyles();

  const handleFileDrop = (files) => {
    setFiles(files);
    setUploadProgress(100)
    // Handle file drop logic here
  };

  const handleToggle = () => {
    // Handle toggle button logic here
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleContinue = () => {
    // Handle continue button logic here
    setContinueClicked(true);
  };

  const handleCancel = () => {
    // Handle cancel button logic here
  };

  return (
    <Modal
      open={true}
      onClose={handleCancel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', width: '900px', height: 'auto' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancel}
            aria-label="close"
            size='small'
            style={{ position: 'absolute', top: 10, left: 20, backgroundColor: '#1c3e6f', borderRadius: '8px' }}
          >
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h5" gutterBottom style={{ color: '#1c3e6f', fontWeight: 'bold', textAlign: 'center' }}>
            Document Upload
          </Typography>
          <Divider style={{ margin: '10px 300px', }} />
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            <Grid item xs={7}>
              <TextField
                select
                label="Select import name:"
                variant="outlined"
                fullWidth
                size="small"
              >
                {dropdownOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Divider style={{ margin: '20px 0px', maxWidth: 250 }} />
              <Typography variant="caption" style={{ color: '#1c3e6f', fontWeight: 'bold' }}>
                Select a manifest that you'd like to import:
               </Typography>
              <Dropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <Paper elevation={0} variant="outlined" className={classes.paper} >
                      <div {...getRootProps()} className={classes.dropArea}>
                        <input {...getInputProps()} />
                        <CustomInsertFileIcon />
                        <p>Drag and Drop here Or Browses</p>
                      </div>
                      <Button onClick={handleFileDrop} variant="contained" style={{ backgroundColor: '#1c3e6f', color: '#fff', textTransform: 'capitalize', width: '200px', marginRight: 16 }} >
                        Upload Manifest
                       </Button>
                    </Paper>
                  </section>
                )}
              </Dropzone>
              {files.length > 0 && (
                <Grid container justifyContent='flex-start' alignItems='center' style={{ marginTop: 10 }} >
                  <Grid item xs={1} >
                    <InsertDriveFileIcon style={{ marginRight: '10px', color: '#ff9c18' }} />
                  </Grid>
                  <Grid item xs={11}>
                    <LinearProgress variant="determinante" value={uploadProgress} />
                  </Grid>
                </Grid>
              )}
              <Divider style={{ margin: '20px 0px', maxWidth: 250 }} />
              <Typography variant="caption" style={{ color: '#1c3e6f', fontWeight: 'bold' }}>
                Elapse data checking:
               </Typography>

              <Typography variant="body2" style={{ color: '#63c38e' }}>
                No Elapsed Dates!
               </Typography>
              <Divider style={{ margin: '20px 0px', maxWidth: 250 }} />
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: '#1c3e6f',
                fontSize: 10
              }}>
                <FormControlLabel
                  control={<IOSSwitch onChange={handleToggle} />}
                  label="Toggle ON"
                />
                <span style={{ marginRight: 15 }}>|</span>
                <Clock />
                <Typography variant="body2" style={{ display: 'inline', color: '#1c3e6f', marginLeft: 5 }}>
                  Select tolerance level
               </Typography>
              </div>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" style={{ color: '#1c3e6f', fontWeight: 'bold' }}>
                Split scheduling using social distancing?
               </Typography>

              <RadioGroup value={radioValue} onChange={handleRadioChange} row>
                <FormControlLabel value="yes" control={<Radio color='primary' />} label="Yes" />
                <FormControlLabel value="no" control={<Radio color='primary' />} label="No" />
              </RadioGroup>
              <Divider style={{ margin: '20px 0px', maxWidth: 250 }} />
              <Typography variant="caption" style={{ color: '#1c3e6f', fontWeight: 'bold' }}>
                Location checking:
               </Typography>

              <Typography variant="body2" style={{ color: '#63c38e' }}>
                All Available!
               </Typography>
              <Divider style={{ margin: '20px 0px', maxWidth: 250 }} />
              <Typography variant="caption" style={{ color: '#1c3e6f', fontWeight: 'bold' }}>
                Client:
               </Typography>

              <RadioGroup value={radioValue} onChange={handleRadioChange} row>
                <FormControlLabel value="yes" control={<Radio color='primary' />} label="Yes" />
                <FormControlLabel value="no" control={<Radio color='primary' />} label="No" />
              </RadioGroup>
              <Grid container direction='row' justifyContent='center' alignItems='center' style={{ marginBottom: 10 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" style={{ color: '#1c3e6f' }}>
                    Testing center 1
               </Typography>
                </Grid>
                <Grid item xs={6} direction='row' alignItems='center'>
                  <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={10}>
                      <TextField
                        select
                        label="Select client"
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        {dropdownOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} textAlign='center'>
                      <Clock style={{ color: '#1c3e6f', marginLeft: 4 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='center' alignItems='center' style={{ marginBottom: 10 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" style={{ color: '#1c3e6f' }}>
                    Testing center 2
               </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={10}>
                      <TextField
                        select
                        label="Select client"
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        {dropdownOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} textAlign='center'>
                      <Clock style={{ color: '#1c3e6f', marginLeft: 4 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='center' alignItems='center' style={{ marginBottom: 10 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" style={{ color: '#1c3e6f' }}>
                    Testing center 3
               </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={10}>
                      <TextField
                        select
                        label="Select client"
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        {dropdownOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} textAlign='center'>
                      <Clock style={{ color: '#1c3e6f', marginLeft: 4 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='center' alignItems='center' style={{ marginBottom: 10 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" style={{ color: '#1c3e6f' }}>
                    Testing center 4
               </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={10}>
                      <TextField
                        select
                        label="Select client"
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        {dropdownOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2} textAlign='center'>
                      <Clock style={{ color: '#1c3e6f', marginLeft: 4 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6} style={{ paddingBottom: 30 }}>
                <Typography variant="subtitle2" style={{ color: '#1c3e6f', fontWeight: 'bold', marginTop: '10px', marginBottom: '20px' }}>
                  Data in the inport file is correct. Please press continue to import
               </Typography>
                <Button onClick={handleContinue} variant="contained" style={{ backgroundColor: '#1c3e6f', color: '#fff', textTransform: 'capitalize', width: '200px', marginRight: 16 }} >
                  Continue Import
            </Button>
                <Button onClick={handleCancel} variant="outlined" style={{ borderColor: '#ff9c18', color: '#ff9c18', textTransform: 'capitalize', width: '200px' }}>
                  Cancel
            </Button>
              </Grid>
            </Grid>
          </Grid>

        </Paper>
      </Fade>
    </Modal>
  );
};

export default MyFormModal;