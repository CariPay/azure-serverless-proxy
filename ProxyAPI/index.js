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
        context.res = {
            status: 500,
            body: {
                message: e.message,
            },
        };
    }
};

export default func;