export default type => {
    switch (type) {
        case 'rest':
            return import('./rest').then(provider => provider.default);
        case 'graphql':
            return import('./graphql').then(factory => factory.default());
        default:
            throw new Error(`Unknow dataProvider type ${type}`);
    }
};

