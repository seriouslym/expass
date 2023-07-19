class Trie {
    constructor(...part) {
        this.children = new Map()  // map只能通过get set 去访问
        this.pattern = "";
        this.part = "";
        if (part.length === 1) {
            this.part = part[0]
            this.isWild = part[0].charAt(0) === '*' || part[0].charAt(0) === ":" // 模糊匹配
        }
    }
    // 按照pattern 进行insert 按照实际path进行search
    insert(pattern, parts) {
        let node = this;
        for (let i = 0; i < parts.length; i++) {
            if (!node.children.has(parts[i])) {
                node.children.set(parts[i], new Trie(parts[i]));
            }
            node = node.children.get(parts[i]);
        }
        node.pattern = pattern;
    }
    // 根据实际路径找到符合pattern对应的Trie节点，并根据记录的pattern找到对应的handler
    search(parts, depth) {
        if (depth === parts.length || this.part.startsWith("*")) {
            if (this.pattern === "") {
                return null;
            }
            return this;
        }
        let currentPart = parts[depth];
        for (const [k, v] of this.children) {
            // 如果是 : * 或者完全匹配成功 进行下一步的搜索
            if (v.isWild || v.part === currentPart) {
                let node = v.search(parts, depth + 1)
                if (node !== null) {
                    return node;
                }
            }
        }
        return null;
    }
}

// function test() {
//     const trie = new Trie();
//     trie.insert("/hello/test",["hello", "test"])
//     trie.insert("/hello", ["hello"])
//     let node = trie.search(["hello", "test"], 0);
//     console.log(node, node.pattern);
// }
// test()
module.exports = Trie;