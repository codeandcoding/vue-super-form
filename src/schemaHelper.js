import * as inputs from './';
import _ from 'lodash';
import inputProps from './inputProps';
import moment from 'moment';

export const formSchemaMixin = {
    mounted() {
        // set initial value
        const value = this.inputValue || this.defaultValue;
        this.inputValue = value;
        this.$emit('onChange', this.name, value);
    },
    props: inputProps,
    data() {
        return {
            inputValue: this.value,
        }
    },
    computed: {
        defaultValue() {
            return null;
        },
        placeholder() {
            return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'placeholder') ?
                this.ui.placeholder : null;
        }
    },
    methods: {
        onChange(value) {
            this.inputValue = value;                
            this.$emit('onChange', this.name, value);
        },
    },
    watch: {
        value: function(newProp) {
            this.inputValue = newProp;
        }
    }
}

function getUiProps(config) {
    const uiProps = {};
    Object.keys(config).map((key) => {
        if (key.includes('ui:')) {
            const val = config[key];
            delete config[key];
            uiProps[key.split(':')[1]] = val;
        }
    });

    return uiProps;
};

function getWidgetComponent(widget) {
    switch (widget) {
        case 'date':
        case 'date-time':
        case 'time':
            return 'SuperDate';
        case 'month':
        case 'year':
            return 'SuperSelect';
        case 'switch':
            return 'SuperSwitch';
        case 'radio':
            return 'SuperRadio';
        case 'checkbox':
            return 'SuperCheckbox';
        case 'textarea':
            return 'SuperTextarea';
        case 'inputs':
            return 'SuperMulti';
        default:
            return 'SuperText';
    }
};

function getFieldComponent(config) {
    const widget = config['ui:widget'];
    const hasKey = key => Object.prototype.hasOwnProperty.call(config, key);

    let componentName;
    switch (config.type) {
        case 'number':
            componentName = hasKey('enum') ? 'SuperSelect' : 'SuperNumber';
            componentName = widget ? getWidgetComponent(widget) : componentName;
            break;
        case 'string':
            if (hasKey('format')) {
                componentName = getWidgetComponent(config['format']);
                break;
            }
            componentName = hasKey('enum') ? 'SuperSelect' : 'SuperText';
            componentName = widget ? getWidgetComponent(widget) : componentName;
            break;
        case 'array':
            componentName = widget ? getWidgetComponent(widget) : 'SuperSelect';
            break;
        case 'boolean':
            componentName = widget ? getWidgetComponent(widget) : 'SuperCheckbox';
            break;
        case 'null':
        case 'object':
        case 'integer':
        default:
            componentName = 'SuperText';
    }

    if (!inputs[componentName]) {
        console.warn(`component '${componentName}' not available`)
        componentName = 'SuperText';
    }

    return inputs[componentName];
};

function getNumberRange(min, max, reverse=false) {
    const numbers = [];
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    return reverse ? _.reverse(numbers) : numbers;
};

function getValidationRules(config) {
    const rules = [config.type];
    
    if (config.required) {
        rules.push('required');
    }
    
    return rules;
}

export function getFieldProps(name, conf, values={}, translations={}) {
    const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const config = _.clone(conf);

    const trans = hasKey(translations, name) ? translations[name] : null;
    const label = trans && hasKey(trans, 'title') ? trans.title : null;
    let itemLabels = trans && hasKey(trans, 'items') ? trans.items : null;

    const uiProps = getUiProps(config);

    let defaultValue = null;
    let items = null;
    switch(uiProps.widget) {
        case 'year':
            items = getNumberRange(2000, moment().year() + 1, true);
            if (config.enum) {
                items = items.filter(k => config.enum.includes(k))
            }
            break;
        case 'month':
            items = getNumberRange(1, 12);
            itemLabels = hasKey(translations, 'months') ? _.concat([''], translations.months) : itemLabels;
            if (config.enum) {
                items = items.filter(k => config.enum.includes(k))
            }
            break;
        default:
            items = hasKey(config, 'items') ? config.items.enum : config.enum;
    }
    
    return {
        name,
        ...config,
        items,
        itemLabels,
        value: hasKey(values, name) ? values[name] : defaultValue,
        label: hasKey(config, 'title') ? config.title : label,
        ui: uiProps,
        rules: getValidationRules(config),
        validationLabels: hasKey(translations, 'validation') ? translations.validation : {},
    };
};

export function getFieldConfig(name, config, props={}) {
    return {
        props,
        key: name,
        component: getFieldComponent(config),
    };
};