import React from 'react';
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    translate,
    EditButton,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    Responsive,
    SearchInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleForm,
    SelectField,
    required,
    number,
    maxLength,
    regex,
    SelectInput,
    ReferenceInput,
    choices,
    ImageInput,
    ImageField,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Bookmark';

import ThumbnailField from '../students/ThumbnailField';
import StudentRefField from '../students/StudentRefField';
import LinkToRelatedStudents from './LinkToRelatedStudents';
import FullNameField from './FullNameField';
import _ from 'lodash';

export const SchoolIcon = Icon;

const listStyles = {
    name: { padding: '0 12px 0 25px' },
};

const editStyles = {
    fullName: { display: 'inline-block' },
    schoolCode: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    country: { display: 'inline-block', marginLeft: 32 },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const SchoolList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
     {...props} 
     sort={{ field: 'fullName', order: 'ASC' }}
     title = "Schools List"
     filters={<SchoolFilter />}
     perPage={25}
    >
        <Datagrid>
            <TextField source="id" className={classes.fullName} label="ID"/>
            <TextField source="fullName" className={classes.fullName} label="Name"/>
            <TextField source="address.country" className={classes.country} label="Country" />
            {/*<LinkToRelatedStudents />*/}
            <EditButton />
        </Datagrid>
    </List>
));

const SchoolFilter = props => (
    <Filter {...props}>
        <SearchInput label="Search by Name" source="fullName" alwaysOn />
        <TextInput label="Country" source="address.country" />
        <TextInput label="ID" source="id" />
    </Filter>
);

const SchoolTitle = ({ record }) =>
    record ? <FullNameField record={record} size={32} /> : null;

const schoolCodeValidation = (value, allValues) => {
    getSchoolIdsAsync()
    .then(schoolCodes => result(_.includes(schoolCodes, value)))

    const result = (schoolCodeExist) => {
        if(schoolCodeExist){
            return 'already exist!';
        }
        return undefined;
    }
}

const getSchoolIdsAsync = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL+'/schools', {
        method: 'GET',
        headers: {
        accept: 'application/json',
        },
    });   
    const json = await response.json();
    return json.map((d, i) => {
        return d.id
    });
}

const validateSchoolCode = [required('Unique School Code must be provided') , schoolCodeValidation];
const validateName = [required('School name must be provided')];
const validateZipCode = regex(/^\d(5)$/, 'Must be a valid Zip Code');

export class ControlledTextInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ids: [],
        }; 
    }
    componentDidMount(){
        getSchoolIdsAsync()
        .then(ids => this.setState({ids}));
    } 
    schoolCodeValidation = (value, allValues) => {
        if(_.includes(this.state.ids, value)){
            return 'already exist!';
        }
        return undefined;
    }
    validateSchoolCode = [required('Unique School ID must be provided') , this.schoolCodeValidation];
    render(){ 
        return(
            <TextInput
                    source="id"
                    label="School ID"
                    validate={this.validateSchoolCode}  
                    formClassName={this.props.formClassName}               
            />
        );
    }
}

export const SchoolCreate = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="IDENTITY">
                <TextInput
                    source="fullName"
                    label="Name"
                    validate={validateName}
                    formClassName={classes.fullName}
                />
                {/*<TextInput
                    source="id"
                    label="School ID"
                    validate={validateSchoolCode}
                    formClassName={classes.schoolCode}                  
                />*/}
                <ControlledTextInput formClassName={classes.schoolCode}/>
            </FormTab>
            <FormTab label="ADDRESS" path="address">
                <LongTextInput
                    source="address.streetHouse"
                    label="House/Street No."
                    formClassName={classes.address}
                />
                <TextInput label="Zip Code" source="address.zipCode" /*validate={validateZipCode}*/ formClassName={classes.zipcode}/>
                <SelectInput label="Country" allowEmpty source="address.country" formClassName={classes.country} choices={counteries} optionText="countryName" optionValue="countryValue"/>
                <TextInput label="City" allowEmpty source="address.city" formClassName={classes.city} />
            </FormTab>
            <FormTab label="UPLOAD" path="upload">
                <ImageInput
                    source="upload"
                    label="Avatar"
                    accept="image/*"
                    placeholder={<p>Drop your avatar here</p>}
                >
                    <ImageField source="avatar" title="School Avatar"/>
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
));

const counteries = [
    {countryValue:'Hong Kong', countryName:'Hong Kong', cities:{cityValue:'Hong Kong', cityName:'Hong Kong'}},
    {countryValue:'China', countryName:'China', cities:[
        {cityValue:'Gouzhuang', cityName:'Gouzhuang'},
        {cityValue:'Shenzhen', cityName:'Shenzhen'},
        {cityValue:'Beijing', cityName:'Beijing'},
        {cityValue:'Shanghai', cityName:'Shanghai'},
    ]},
    {countryValue:'Pakistan', countryName:'Pakistan', cities:[
        {cityValue:'Islamabad', cityName:'Islamabad'},
        {cityValue:'Karachi', cityName:'Karachi'},
        {cityValue:'Lahore', cityName:'Lahore'},
    ]},
];


export const SchoolEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<SchoolTitle />} {...props}>
        <TabbedForm>
            <FormTab label="IDENTITY">
                <TextInput
                    source="fullName"
                    label="Name"
                    validate={validateName}
                    formClassName={classes.fullName}
                />
                <TextInput
                    source="id"
                    label="School ID"
                    validate={validateSchoolCode}
                    formClassName={classes.schoolCode}                  
                />
            </FormTab>
            <FormTab label="ADDRESS" path="address">
                <LongTextInput
                    source="address.streetHouse"
                    label="House/Street No."
                />
                <TextInput label="Zip Code" source="address.zipCode" /*validate={validateZipCode}*/ formClassName={classes.zipcode}/>
                <SelectInput label="Country" allowEmpty source="address.country" formClassName={classes.country} choices={counteries} optionText="countryName" optionValue="countryValue"/>
                <TextInput label="City" allowEmpty source="address.city" formClassName={classes.city} />
            </FormTab> 
            <FormTab label="UPLOAD" path="upload">
                <ImageInput
                    source="upload"
                    label="Avatar"
                    accept="image/*"
                    placeholder={<p>Drop your avatar here</p>}
                >
                    <ImageField source="avatar" title="School Avatar"/>
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
));