import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

//calling the returned function from configureStore file.
//We can use functions like store.dispatch, store.subscribe
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(
            jsx,
            document.getElementById('app')
        );
        hasRendered = true;
    }
}

ReactDOM.render(
    <LoadingPage />,
    document.getElementById('app')
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //console.log('email', user.email)
        store.dispatch(login(user.uid, user.email));
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});


