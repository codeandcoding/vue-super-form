import * as inputs from './';
import moment from 'moment';

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

export function getFieldProps(name, conf, values={}) {
    const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const config = _.clone(conf);

    const uiProps = getUiProps(config);

    let defaultValue = null;
    let items = [];
    switch(uiProps.widget) {
        case 'year':
            defaultValue = moment().year();
            items = getNumberRange(2000, defaultValue + 1, true);
            break;
        case 'month':
            items = getNumberRange(1, 12);
            break;
        default:
            items = hasKey(config, 'items') ? config.items.enum : config.enum;
    }
    
    return {
        name,
        ...config,
        items: items,
        value: hasKey(values, name) ? values[name] : defaultValue,
        label: hasKey(config, 'title') ? config.title : _.capitalize(name),
        ui: uiProps,
    };
};

export function getFieldConfig(name, config, props={}) {
    return {
        props,
        key: name,
        component: getFieldComponent(config),
    };
};