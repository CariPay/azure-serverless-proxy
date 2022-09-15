import got from 'got';

const func = async function (context, req) {
    try {
        const { data = {}, customHeaders = {} } = req.body
        const callback = process.env['CALLBACK'];

        const options = {
            headers: customHeaders,
            json: data,
        };
        const res = await got.post(`${callback}`, options);

        context.log("Got code: ", res.statusCode)
        context.log("Got body: ", res.body)

        context.res = {
            status: res.statusCode,
            body: res.body,
        };
    } catch(e) {
        context.log(e);
        
        const retry = e.code && e.retry && e.retry.errorCodes && Array.isArray(e.retry.errorCodes) && e.retry.errorCodes.includes(e.code);
        context.res = {
            status: e.status || 500,
            body: {
                message: e,
                retry,
                status: e.status || 500,
            },
        };
    }
};

export default func;