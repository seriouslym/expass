const Trie = require('./trie')
class Router {
    constructor() {
        // GET POST方法分开算
        this.roots = {
            GET: new Trie(),
            POST: new Trie()
        }
        this.callback = {};
    }
    // 注册路由
    addRouter(method, pattern, callback) {
        this.roots[method].insert(pattern, this.parsePattern(pattern))
        const key = `${method}-${pattern}`;
        this.callback[key] = callback;
    }
    // 解析path匹配pattern
    getRouter(method, path) {
        let params = {}
        let root = this.roots[method];
        let parts = this.parsePattern(path);
        let search = root.search(parts, 0);
        if (search !== null) {
            let patternPart = this.parsePattern(search.pattern)
            for (let i = 0; i < patternPart.length; i++) {
                 if (patternPart[i][0] === ':') {
                    params[patternPart[i].slice(1)] = parts[i];
                 }
                 if (patternPart[i][0] === '*' && patternPart[i].length > 1) {
                     params[patternPart[i].slice(1)] = '/'.join(parts.slice(i));
                     break;
                 }
            }
            return [search, params]
        }
        return [null, null]
    }
    parsePattern(pattern) {
        const parts = [];
        for (let str of pattern.split("/")) {
            if (str !== "") {
                parts.push(str);
                if (str.startsWith("*")) {
                    break;
                }
            }
        }
        return parts;
    }

}
module.exports = Router