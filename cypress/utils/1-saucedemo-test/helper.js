export const isNumeric = (str) => {
    if(typeof str !== 'string')
        return false;    
    return !isNaN(str) && !isNaN(parseFloat(str));
};

export const getOnlyNumericPrice = (str) => {
    return parseFloat(new RegExp('[0-9](.*)[0-9]').exec(str)[0]);
};
