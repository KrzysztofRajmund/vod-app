import React from 'react';
//material-ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface Props {
    title: string,
    icon: React.ReactElement
}

const ButtonOutlined: React.FC<Props> = ({ title, icon }) => {
    const classes = useStyles();
    return (
        <section className="splashButton">
            <div className={classes.root}>
                <Button variant="contained" startIcon={icon}>{title}</Button>
            </div>
        </section>
    );
};

export default ButtonOutlined;
