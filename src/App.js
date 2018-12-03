import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import './App.css';
import dataProviderFactory from './dataProvider';
import themeReducer from './themeReducer';
import Layout from './Layout';
import authProvider from './authProvider';

import { SchoolList, SchoolCreate, SchoolEdit, SchoolIcon} from './schools';

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    document.title = "HKExcel Admin"
    /*this.restoreFetch = await fakeServerFactory(
        process.env.REACT_APP_DATA_PROVIDER
    );*/

    const dataProvider = await dataProviderFactory(
      process.env.REACT_APP_DATA_PROVIDER
    );

    this.setState({ dataProvider });
  }

  /*componentWillUnmount() {
    this.restoreFetch();
  }*/

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
            <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <Admin
        title="HKExcel Admin"
        dataProvider={dataProvider}
        customReducers={{ theme: themeReducer }}
        //customSagas={sagas}
        //customRoutes={customRoutes}
        authProvider={authProvider}
        //dashboard={Dashboard}
        //loginPage={Login}
        appLayout={Layout}
        //menu={Menu}
        //locale="en"
        //i18nProvider={i18nProvider}
      >
        <Resource
          name="schools"
          list={SchoolList}
          create={SchoolCreate}
          edit={SchoolEdit}
          icon={SchoolIcon}
        />
          
      </Admin>
    );
  }
}

export default App;
