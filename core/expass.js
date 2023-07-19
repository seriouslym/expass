const http = require('http')
const Router = require('./router')
const fs = require('fs')
const Resopnse = require('./response')
class App {
    constructor() {
        this.router = new Router();
    }
    get(pattern, callback) {
        this.router.addRouter("GET", pattern, callback)
    }
    addRouter(method, pattern, callback) {
        this.router.addRouter(method, pattern, callback)
    }
    post(pattern, callback) {
        this.router.addRouter("POST", pattern, callback)
    }
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            // 封装req 和 res
            // req添加param res 添加json html等简单方法
            res = new Resopnse(res)
            let [node, params] = this.router.getRouter(req.method, req.url);
            if (node !== null) {
                let key = `${req.method}-${node.pattern}`;
                req["params"] = params;
                // 执行回调函数
                this.router.callback[key](req, res);
            } else {
                res.render("./template/error.html", {err: "404 Not Found"})
            }

        })
        server.listen(port, callback)
    }
}
module.exports = () => new App()
