import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodoApp from './TodoApp';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(<TodoApp />, document.getElementById('root'));

serviceWorker.unregister();
