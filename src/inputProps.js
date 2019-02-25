export default {
    name: {
        type: String,
        required: true,
    },
    value: {
        type: null,
        required: false,
    },
    default: {
        type: null,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    validation: {
        type: Object,
        required: false,
        default: () => ({}),
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    ui: {
        type: Object,
        required: false,
        default: () => ({}),
    },
};