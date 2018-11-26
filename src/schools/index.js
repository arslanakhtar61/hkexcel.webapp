import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    EditButton,
    List,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';

import ThumbnailField from '../students/ThumbnailField';
import StudentRefField from '../students/StudentRefField';
import LinkToRelatedStudents from './LinkToRelatedStudents';

export const SchoolIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

export const SchoolList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} /*sort={{ field: 'name', order: 'ASC' }}*/>
        <Datagrid>
            <TextField source="fullName" className={classes.name} />
            {/*<LinkToRelatedStudents />*/}
            <EditButton />
        </Datagrid>
    </List>
));

const SchoolTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.categories.name', { smart_count: 1 })} &quot;{
            record.name
        }&quot;
    </span>
));

export const SchoolEdit = props => (
    <Edit title={<SchoolTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField
                reference="students"
                target="school_id"
                label="resources.categories.fields.products"
                perPage={5}
            >
                <Datagrid>
                    <ThumbnailField />
                    <StudentRefField source="reference" />
                    <NumberField
                        source="price"
                        options={{ style: 'currency', currency: 'USD' }}
                    />
                    <NumberField
                        source="width"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField
                        source="height"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField source="stock" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);
