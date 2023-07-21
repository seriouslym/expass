const http = require('http')
const Router = require('./router')
const fs = require('fs')
const Response = require('./response')
class RouterGroup {
    constructor(prefix, engine) {
        this.prefix = prefix;
        this._engine = engine;
        this.middlewares = [];
    }
    set engine(engine) {
        this._engine = engine;
    }
    Group(prefix) {
        let newGroup = new RouterGroup(prefix, this._engine)
        this._engine.groups.push(newGroup);
        return newGroup;
    }
    addRouter(method, comp, callback) {
        let pattern = this.prefix + comp;
        this._engine.router.addRouter(method, pattern, callback);
    }
    GET(pattern, callback) {
        this.addRouter("GET", pattern, callback);
    }
    POST(pattern, callback) {
        this.addRouter("POST", pattern, callback)
    }
}
class Engine extends RouterGroup{
    constructor() {
        super("", null)
        super.engine = this;
        this.router = new Router();
        // this.group = RouterGroup
        this.groups = [this]
    }

    // Group(prefix) {
    //     return super.Group(prefix);
    // }

    // get(pattern, callback) {
    //     this.addRouter("GET", pattern, callback)
    // }
    //
    // addRouter(method, pattern, callback) {
    //     this.routerGroup.addRouter(method, pattern, callback)
    //     // this.router.addRouter(method, pattern, callback)
    // }
    //
    // post(pattern, callback) {
    //     this.addRouter("POST", pattern, callback)
    // }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            // 封装req 和 res
            // req添加param res 添加json html等简单方法
            res = new Response(res)
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
    // RouterGroup 还是借助Engine的router进行路由 所有RouterGroup都保存同一份Engine实例

module.exports = () => new Engine()
