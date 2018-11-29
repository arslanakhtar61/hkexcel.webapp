import simpleRestProvider from 'ra-data-simple-rest';

const restProvider = simpleRestProvider(process.env.REACT_APP_API_URL);
export default (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(() => resolve(restProvider(type, resource, params)), 500)
    );
