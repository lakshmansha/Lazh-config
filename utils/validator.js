var isValid = (value) => {
    var rtnVal = false;
    if (typeof (value) === "string") {
        if (value !== undefined && value !== '') {
            rtnVal = true;
        }
    }

    return rtnVal;
}

var isObjValid = (value) => {
    var rtnVal = false;
    if (value !== undefined && value !== null) {
        if (Object.keys(value).length > 0) {
            rtnVal = true;
        }
    }

    return rtnVal;
}

var isDefined = (value) => {
    var rtnVal = false;
    if (value !== undefined && value !== null) {
        rtnVal = true;
    }

    return rtnVal;
}

exports.isValid = isValid;
exports.isObjValid = isObjValid;
exports.isDefined = isDefined;