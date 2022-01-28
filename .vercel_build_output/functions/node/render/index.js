"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var http = require("http");
var require$$0$1 = require("querystring");
var handler = require("./handler.js");
require("express");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var http__default = /* @__PURE__ */ _interopDefaultLegacy(http);
var require$$0$1__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
function every(arr, cb) {
  var i = 0, len = arr.length;
  for (; i < len; i++) {
    if (!cb(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}
const SEP = "/";
const STYPE = 0, PTYPE = 1, ATYPE = 2, OTYPE = 3;
const SLASH = 47, COLON = 58, ASTER = 42, QMARK = 63;
function strip(str) {
  if (str === SEP)
    return str;
  str.charCodeAt(0) === SLASH && (str = str.substring(1));
  var len = str.length - 1;
  return str.charCodeAt(len) === SLASH ? str.substring(0, len) : str;
}
function split(str) {
  return (str = strip(str)) === SEP ? [SEP] : str.split(SEP);
}
function isMatch(arr, obj, idx) {
  idx = arr[idx];
  return obj.val === idx && obj.type === STYPE || (idx === SEP ? obj.type > PTYPE : obj.type !== STYPE && (idx || "").endsWith(obj.end));
}
function match$1(str, all) {
  var i = 0, tmp, segs = split(str), len = segs.length, l;
  var fn = isMatch.bind(isMatch, segs);
  for (; i < all.length; i++) {
    tmp = all[i];
    if ((l = tmp.length) === len || l < len && tmp[l - 1].type === ATYPE || l > len && tmp[l - 1].type === OTYPE) {
      if (every(tmp, fn))
        return tmp;
    }
  }
  return [];
}
function parse$2(str) {
  if (str === SEP) {
    return [{ old: str, type: STYPE, val: str, end: "" }];
  }
  var c, x, t, sfx, nxt = strip(str), i = -1, j = 0, len = nxt.length, out = [];
  while (++i < len) {
    c = nxt.charCodeAt(i);
    if (c === COLON) {
      j = i + 1;
      t = PTYPE;
      x = 0;
      sfx = "";
      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        c = nxt.charCodeAt(i);
        if (c === QMARK) {
          x = i;
          t = OTYPE;
        } else if (c === 46 && sfx.length === 0) {
          sfx = nxt.substring(x = i);
        }
        i++;
      }
      out.push({
        old: str,
        type: t,
        val: nxt.substring(j, x || i),
        end: sfx
      });
      nxt = nxt.substring(i);
      len -= i;
      i = 0;
      continue;
    } else if (c === ASTER) {
      out.push({
        old: str,
        type: ATYPE,
        val: nxt.substring(i),
        end: ""
      });
      continue;
    } else {
      j = i;
      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        ++i;
      }
      out.push({
        old: str,
        type: STYPE,
        val: nxt.substring(j, i),
        end: ""
      });
      nxt = nxt.substring(i);
      len -= i;
      i = j = 0;
    }
  }
  return out;
}
function exec$1(str, arr) {
  var i = 0, x, y, segs = split(str), out = {};
  for (; i < arr.length; i++) {
    x = segs[i];
    y = arr[i];
    if (x === SEP)
      continue;
    if (x !== void 0 && y.type | OTYPE === 2) {
      out[y.val] = x.replace(y.end, "");
    }
  }
  return out;
}
var matchit = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  match: match$1,
  parse: parse$2,
  exec: exec$1
});
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(matchit);
const { exec, match, parse: parse$1 } = require$$0;
class Trouter {
  constructor(opts) {
    this.opts = opts || {};
    this.routes = {};
    this.handlers = {};
    this.all = this.add.bind(this, "*");
    this.get = this.add.bind(this, "GET");
    this.head = this.add.bind(this, "HEAD");
    this.patch = this.add.bind(this, "PATCH");
    this.options = this.add.bind(this, "OPTIONS");
    this.connect = this.add.bind(this, "CONNECT");
    this.delete = this.add.bind(this, "DELETE");
    this.trace = this.add.bind(this, "TRACE");
    this.post = this.add.bind(this, "POST");
    this.put = this.add.bind(this, "PUT");
  }
  add(method, pattern, ...fns) {
    if (this.routes[method] === void 0)
      this.routes[method] = [];
    this.routes[method].push(parse$1(pattern));
    if (this.handlers[method] === void 0)
      this.handlers[method] = {};
    this.handlers[method][pattern] = fns;
    return this;
  }
  find(method, url2) {
    let arr = match(url2, this.routes[method] || []);
    if (arr.length === 0) {
      arr = match(url2, this.routes[method = "*"] || []);
      if (!arr.length)
        return false;
    }
    return {
      params: exec(url2, arr),
      handlers: this.handlers[method][arr[0].old]
    };
  }
}
var trouter = Trouter;
var url = function(req) {
  let url2 = req.url;
  if (url2 === void 0)
    return url2;
  let obj = req._parsedUrl;
  if (obj && obj._raw === url2)
    return obj;
  obj = {};
  obj.query = obj.search = null;
  obj.href = obj.path = obj.pathname = url2;
  let idx = url2.indexOf("?", 1);
  if (idx !== -1) {
    obj.search = url2.substring(idx);
    obj.query = obj.search.substring(1);
    obj.pathname = url2.substring(0, idx);
  }
  obj._raw = url2;
  return req._parsedUrl = obj;
};
const { parse } = require$$0$1__default["default"];
function lead(x) {
  return x.charCodeAt(0) === 47 ? x : "/" + x;
}
function value(x) {
  let y = x.indexOf("/", 1);
  return y > 1 ? x.substring(0, y) : x;
}
function mutate(str, req) {
  req.url = req.url.substring(str.length) || "/";
  req.path = req.path.substring(str.length) || "/";
}
function onError(err, req, res, next) {
  let code = res.statusCode = err.code || err.status || 500;
  res.end(err.length && err || err.message || http__default["default"].STATUS_CODES[code]);
}
class Polka extends trouter {
  constructor(opts = {}) {
    super(opts);
    this.apps = {};
    this.wares = [];
    this.bwares = {};
    this.parse = url;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
    this.onError = opts.onError || onError;
    this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { code: 404 });
  }
  add(method, pattern, ...fns) {
    let base = lead(value(pattern));
    if (this.apps[base] !== void 0)
      throw new Error(`Cannot mount ".${method.toLowerCase()}('${lead(pattern)}')" because a Polka application at ".use('${base}')" already exists! You should move this handler into your Polka application instead.`);
    return super.add(method, pattern, ...fns);
  }
  use(base, ...fns) {
    if (typeof base === "function") {
      this.wares = this.wares.concat(base, fns);
    } else if (base === "/") {
      this.wares = this.wares.concat(fns);
    } else {
      base = lead(base);
      fns.forEach((fn) => {
        if (fn instanceof Polka) {
          this.apps[base] = fn;
        } else {
          let arr = this.bwares[base] || [];
          arr.length > 0 || arr.push((r, _, nxt) => (mutate(base, r), nxt()));
          this.bwares[base] = arr.concat(fn);
        }
      });
    }
    return this;
  }
  listen() {
    (this.server = this.server || http__default["default"].createServer()).on("request", this.handler);
    this.server.listen.apply(this.server, arguments);
    return this;
  }
  handler(req, res, info) {
    info = info || this.parse(req);
    let fns = [], arr = this.wares, obj = this.find(req.method, info.pathname);
    req.originalUrl = req.originalUrl || req.url;
    let base = value(req.path = info.pathname);
    if (this.bwares[base] !== void 0) {
      arr = arr.concat(this.bwares[base]);
    }
    if (obj) {
      fns = obj.handlers;
      req.params = obj.params;
    } else if (this.apps[base] !== void 0) {
      mutate(base, req);
      info.pathname = req.path;
      fns.push(this.apps[base].handler.bind(null, req, res, info));
    } else if (fns.length === 0) {
      fns.push(this.onNoMatch);
    }
    req.search = info.search;
    req.query = parse(info.query);
    let i = 0, len = arr.length, num = fns.length;
    if (len === i && num === 1)
      return fns[0](req, res);
    let next = (err) => err ? this.onError(err, req, res, next) : loop();
    let loop = (_) => res.finished || i < len && arr[i++](req, res, next);
    arr = arr.concat(fns);
    len += num;
    loop();
  }
}
var polka = (opts) => new Polka(opts);
const serveIndex = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
    <link\r
      rel="stylesheet"\r
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"\r
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="\r
      crossorigin="anonymous"\r
      referrerpolicy="no-referrer"\r
    />\r
    <link rel="icon" href="/assets/transparent-coffee-cup-icon-food-icon-coffee-shop-icon-5e943218b91909.3839303415867704567582.44884c76.png" type="image/icon type">\r
    <title>F4-Coffee</title>\r
    <script type="module" crossorigin src="/assets/index.9a085c07.js"><\/script>
    <link rel="modulepreload" href="/assets/vendor.ff7da8f9.js">
    <link rel="stylesheet" href="/assets/index.5623e81c.css">
  </head>\r
  <body>\r
    <div id="root">\r
    </div>\r
    \r
    <!-- Messenger Plugin chat Code -->\r
    <div id="fb-root"></div>\r
\r
    <!-- Your Plugin chat code -->\r
    <div id="fb-customer-chat" class="fb-customerchat">\r
    </div>\r
\r
    <script>\r
      var chatbox = document.getElementById('fb-customer-chat');\r
      chatbox.setAttribute("page_id", "105431812042431");\r
      chatbox.setAttribute("attribution", "biz_inbox");\r
    <\/script>\r
\r
    <!-- Your SDK code -->\r
    <script>\r
      window.fbAsyncInit = function() {\r
        FB.init({\r
          xfbml            : true,\r
          version          : 'v12.0'\r
        });\r
      };\r
\r
      (function(d, s, id) {\r
        var js, fjs = d.getElementsByTagName(s)[0];\r
        if (d.getElementById(id)) return;\r
        js = d.createElement(s); js.id = id;\r
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';\r
        fjs.parentNode.insertBefore(js, fjs);\r
      }(document, 'script', 'facebook-jssdk'));\r
    <\/script>\r
  </body>\r
</html>\r
`);
};
const applyHandler = (server2) => {
  if (Array.isArray(handler.handler)) {
    handler.handler.forEach((h) => server2.use(h));
  } else {
    server2.use(handler.handler);
  }
  server2.use(serveIndex);
};
(function dedupeRequire(dedupe) {
  const Module = require("module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["react", "react-dom"]);
const server = polka();
applyHandler(server);
var vercelRender = (req, res) => server.handler(req, res);
exports["default"] = vercelRender;
