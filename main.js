const expass = require('./core/expass')

const app = expass();
app.GET("/hello", (req, res) => {
    res.json({
        name: "zjj",
        age: 23
    })
})
app.use((req, res, next) => {
    console.log(`全局middleware 当前请求路径为${req.url}`, new Date().toISOString())
})
// app.get("/", (req, res) => {
//     res.html("<h1 style='color: aqua'>sfsfsfsf</h1>")
// })
// app.addRouter("GET", "/hello/:name/sd", (req, res) => {
//     console.log(req["params"])
//     let params = req["params"]
//     res.text(`查询到params${JSON.stringify(params)}`)
// })

let routerGroup = app.Group("/v1");
routerGroup.GET("/hello",(req, res) => {
    res.html("<h1 style='color: aqua'>hello</h1>")
})
routerGroup.use((req, res, next) => {
    console.log("v1的中间件");
})
routerGroup.GET("/",(req, res) => {
    res.html("<h1 style='color: aqua'>/</h1>")
})
app.listen(3000, () => {
    console.log("server listening on port 3000")
})

