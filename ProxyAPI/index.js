import got from 'got';

const func = async function (context, req) {
    try {
        const { ip, msg, port = 4000 } = req.body

        context.log("Got ip: ", ip)
        context.log("Got port: ", port)

        const res = await got(`http://${ip}:${port}?message=${msg}`)
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