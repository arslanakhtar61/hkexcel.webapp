import React from 'react';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';

import { StudentIcon } from '../students';

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

const LinkToRelatedStudents = ({ classes, record, translate }) => (
    <Button
        size="small"
        color="primary"
        component={Link}
        to={{
            pathname: '/students',
            search: stringify({
                page: 1,
                perPage: 25,
                sort: 'id',
                order: 'DESC',
                filter: JSON.stringify({ school_id: record.id }),
            }),
        }}
        className={classes.link}
    >
        <StudentIcon className={classes.icon} />
        {translate('resources.categories.fields.products')}
    </Button>
);

const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(LinkToRelatedStudents);
