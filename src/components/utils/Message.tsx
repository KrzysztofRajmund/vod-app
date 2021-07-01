import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            textAlign: 'center',
            width: '100%',
            margin: '5rem auto',
            '& .MuiAlert-root': {
                fontSize: '1.5rem',
                backgroundColor: 'inherit',
            },
        },
    }),
);

interface Props {
    message: string
}

const Message: React.FC<Props> = ({ message }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity="info">{message}</Alert>
        </div>
    );
};

export default Message;
