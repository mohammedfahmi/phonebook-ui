import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.9em',
                    backgroundColor: "#f68b1e",
                    color: "#ffffff",
                    minWidth: "110px",
                    marginTop: "0.5em",
                    '&:hover': {
                        backgroundColor: "#f6791e",
                        '@media (hover: none)': {
                            backgroundColor: "#f6791e",
                        },
                    }
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    marginRight: "1.5em",
                    minHeight: "38px",
                    minWidth: "200px",
                    maxHeight: "5vh",
                    maxWidth: "25vw",
                    height: "3vh",
                    width: "20vw",
                    marginTop: "0.5em"
                },
                select: {
                    marginRight: "2em",
                    padding: "10px 5px"
                }
            }
        }
    },
});
export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}