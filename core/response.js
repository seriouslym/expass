// 包装http 原始的req请求
const fs= require("fs");

class Response {
    constructor(res) {
        this.res = res;
    }
    json(data){
        this.res.setHeader('Content-Type', 'application/json');
        const jsonData = JSON.stringify(data);
        this.res.end(jsonData);
    }
    html(html){
        this.res.setHeader('Content-Type', 'text/html; charset=utf-8');
        this.res.end(html);
    }
    text(text) {
        this.res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        this.res.end(text);
    }
    //
    render(path, data) {
        this.res.setHeader('Content-Type', 'text/html; charset=utf-8');
        let buffer = fs.readFileSync(path);
        let content = buffer.toString();
        if (data !== undefined) {
            for (let key in data) {
                let str = `{{${key}}}`
                content = content.replaceAll(str, data[key]);
            }
        }
        this.res.end(content);
    }
    redirect(path) {
        this.res.writeHead(302, {
            'Location': path
        });
        this.res.end();
    }

}
module.exports = Response