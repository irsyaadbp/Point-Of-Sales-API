'use-strict';

exports.success = (res, result) => {
    let form = {
        status: 200,
        result
    }

    res.json(form);
}

exports.error = (res, message) =>{
    let form = {
        status: 400,
        message
    };

    res.json(form);
}