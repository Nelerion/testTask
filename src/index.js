import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider, useSnackbar } from 'notistack'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider maxSnack={1} autoHideDuration={1000} >
    <App />
    </SnackbarProvider>
);

