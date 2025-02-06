var Qf = Object.defineProperty;
var Kf = (p, v, c) => (v in p ? Qf(p, v, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (p[v] = c));
var Ta = (p, v, c) => Kf(p, typeof v != "symbol" ? v + "" : v, c);
(function () {
  const v = document.createElement("link").relList;
  if (v && v.supports && v.supports("modulepreload")) return;
  for (const T of document.querySelectorAll('link[rel="modulepreload"]')) C(T);
  new MutationObserver((T) => {
    for (const D of T)
      if (D.type === "childList")
        for (const W of D.addedNodes) W.tagName === "LINK" && W.rel === "modulepreload" && C(W);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(T) {
    const D = {};
    return (
      T.integrity && (D.integrity = T.integrity),
      T.referrerPolicy && (D.referrerPolicy = T.referrerPolicy),
      T.crossOrigin === "use-credentials"
        ? (D.credentials = "include")
        : T.crossOrigin === "anonymous"
          ? (D.credentials = "omit")
          : (D.credentials = "same-origin"),
      D
    );
  }
  function C(T) {
    if (T.ep) return;
    T.ep = !0;
    const D = c(T);
    fetch(T.href, D);
  }
})();
function Yf(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var zi = { exports: {} },
  wr = {},
  Ti = { exports: {} },
  A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var La;
function Gf() {
  if (La) return A;
  La = 1;
  var p = Symbol.for("react.element"),
    v = Symbol.for("react.portal"),
    c = Symbol.for("react.fragment"),
    C = Symbol.for("react.strict_mode"),
    T = Symbol.for("react.profiler"),
    D = Symbol.for("react.provider"),
    W = Symbol.for("react.context"),
    U = Symbol.for("react.forward_ref"),
    I = Symbol.for("react.suspense"),
    q = Symbol.for("react.memo"),
    oe = Symbol.for("react.lazy"),
    Y = Symbol.iterator;
  function b(f) {
    return f === null || typeof f != "object"
      ? null
      : ((f = (Y && f[Y]) || f["@@iterator"]), typeof f == "function" ? f : null);
  }
  var G = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    he = Object.assign,
    ee = {};
  function X(f, g, V) {
    (this.props = f), (this.context = g), (this.refs = ee), (this.updater = V || G);
  }
  (X.prototype.isReactComponent = {}),
    (X.prototype.setState = function (f, g) {
      if (typeof f != "object" && typeof f != "function" && f != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, f, g, "setState");
    }),
    (X.prototype.forceUpdate = function (f) {
      this.updater.enqueueForceUpdate(this, f, "forceUpdate");
    });
  function yt() {}
  yt.prototype = X.prototype;
  function at(f, g, V) {
    (this.props = f), (this.context = g), (this.refs = ee), (this.updater = V || G);
  }
  var be = (at.prototype = new yt());
  (be.constructor = at), he(be, X.prototype), (be.isPureReactComponent = !0);
  var xe = Array.isArray,
    et = Object.prototype.hasOwnProperty,
    ze = { current: null },
    Re = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Qe(f, g, V) {
    var H,
      $ = {},
      Q = null,
      te = null;
    if (g != null)
      for (H in (g.ref !== void 0 && (te = g.ref), g.key !== void 0 && (Q = "" + g.key), g))
        et.call(g, H) && !Re.hasOwnProperty(H) && ($[H] = g[H]);
    var Z = arguments.length - 2;
    if (Z === 1) $.children = V;
    else if (1 < Z) {
      for (var ue = Array(Z), Ae = 0; Ae < Z; Ae++) ue[Ae] = arguments[Ae + 2];
      $.children = ue;
    }
    if (f && f.defaultProps) for (H in ((Z = f.defaultProps), Z)) $[H] === void 0 && ($[H] = Z[H]);
    return { $$typeof: p, type: f, key: Q, ref: te, props: $, _owner: ze.current };
  }
  function zt(f, g) {
    return { $$typeof: p, type: f.type, key: g, ref: f.ref, props: f.props, _owner: f._owner };
  }
  function gt(f) {
    return typeof f == "object" && f !== null && f.$$typeof === p;
  }
  function Gt(f) {
    var g = { "=": "=0", ":": "=2" };
    return (
      "$" +
      f.replace(/[=:]/g, function (V) {
        return g[V];
      })
    );
  }
  var ct = /\/+/g;
  function Ve(f, g) {
    return typeof f == "object" && f !== null && f.key != null ? Gt("" + f.key) : g.toString(36);
  }
  function tt(f, g, V, H, $) {
    var Q = typeof f;
    (Q === "undefined" || Q === "boolean") && (f = null);
    var te = !1;
    if (f === null) te = !0;
    else
      switch (Q) {
        case "string":
        case "number":
          te = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case p:
            case v:
              te = !0;
          }
      }
    if (te)
      return (
        (te = f),
        ($ = $(te)),
        (f = H === "" ? "." + Ve(te, 0) : H),
        xe($)
          ? ((V = ""),
            f != null && (V = f.replace(ct, "$&/") + "/"),
            tt($, g, V, "", function (Ae) {
              return Ae;
            }))
          : $ != null &&
            (gt($) &&
              ($ = zt($, V + (!$.key || (te && te.key === $.key) ? "" : ("" + $.key).replace(ct, "$&/") + "/") + f)),
            g.push($)),
        1
      );
    if (((te = 0), (H = H === "" ? "." : H + ":"), xe(f)))
      for (var Z = 0; Z < f.length; Z++) {
        Q = f[Z];
        var ue = H + Ve(Q, Z);
        te += tt(Q, g, V, ue, $);
      }
    else if (((ue = b(f)), typeof ue == "function"))
      for (f = ue.call(f), Z = 0; !(Q = f.next()).done; )
        (Q = Q.value), (ue = H + Ve(Q, Z++)), (te += tt(Q, g, V, ue, $));
    else if (Q === "object")
      throw (
        ((g = String(f)),
        Error(
          "Objects are not valid as a React child (found: " +
            (g === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : g) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    return te;
  }
  function ft(f, g, V) {
    if (f == null) return f;
    var H = [],
      $ = 0;
    return (
      tt(f, H, "", "", function (Q) {
        return g.call(V, Q, $++);
      }),
      H
    );
  }
  function je(f) {
    if (f._status === -1) {
      var g = f._result;
      (g = g()),
        g.then(
          function (V) {
            (f._status === 0 || f._status === -1) && ((f._status = 1), (f._result = V));
          },
          function (V) {
            (f._status === 0 || f._status === -1) && ((f._status = 2), (f._result = V));
          }
        ),
        f._status === -1 && ((f._status = 0), (f._result = g));
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var ce = { current: null },
    E = { transition: null },
    O = { ReactCurrentDispatcher: ce, ReactCurrentBatchConfig: E, ReactCurrentOwner: ze };
  function N() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (A.Children = {
      map: ft,
      forEach: function (f, g, V) {
        ft(
          f,
          function () {
            g.apply(this, arguments);
          },
          V
        );
      },
      count: function (f) {
        var g = 0;
        return (
          ft(f, function () {
            g++;
          }),
          g
        );
      },
      toArray: function (f) {
        return (
          ft(f, function (g) {
            return g;
          }) || []
        );
      },
      only: function (f) {
        if (!gt(f)) throw Error("React.Children.only expected to receive a single React element child.");
        return f;
      },
    }),
    (A.Component = X),
    (A.Fragment = c),
    (A.Profiler = T),
    (A.PureComponent = at),
    (A.StrictMode = C),
    (A.Suspense = I),
    (A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O),
    (A.act = N),
    (A.cloneElement = function (f, g, V) {
      if (f == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
      var H = he({}, f.props),
        $ = f.key,
        Q = f.ref,
        te = f._owner;
      if (g != null) {
        if (
          (g.ref !== void 0 && ((Q = g.ref), (te = ze.current)),
          g.key !== void 0 && ($ = "" + g.key),
          f.type && f.type.defaultProps)
        )
          var Z = f.type.defaultProps;
        for (ue in g)
          et.call(g, ue) && !Re.hasOwnProperty(ue) && (H[ue] = g[ue] === void 0 && Z !== void 0 ? Z[ue] : g[ue]);
      }
      var ue = arguments.length - 2;
      if (ue === 1) H.children = V;
      else if (1 < ue) {
        Z = Array(ue);
        for (var Ae = 0; Ae < ue; Ae++) Z[Ae] = arguments[Ae + 2];
        H.children = Z;
      }
      return { $$typeof: p, type: f.type, key: $, ref: Q, props: H, _owner: te };
    }),
    (A.createContext = function (f) {
      return (
        (f = {
          $$typeof: W,
          _currentValue: f,
          _currentValue2: f,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (f.Provider = { $$typeof: D, _context: f }),
        (f.Consumer = f)
      );
    }),
    (A.createElement = Qe),
    (A.createFactory = function (f) {
      var g = Qe.bind(null, f);
      return (g.type = f), g;
    }),
    (A.createRef = function () {
      return { current: null };
    }),
    (A.forwardRef = function (f) {
      return { $$typeof: U, render: f };
    }),
    (A.isValidElement = gt),
    (A.lazy = function (f) {
      return { $$typeof: oe, _payload: { _status: -1, _result: f }, _init: je };
    }),
    (A.memo = function (f, g) {
      return { $$typeof: q, type: f, compare: g === void 0 ? null : g };
    }),
    (A.startTransition = function (f) {
      var g = E.transition;
      E.transition = {};
      try {
        f();
      } finally {
        E.transition = g;
      }
    }),
    (A.unstable_act = N),
    (A.useCallback = function (f, g) {
      return ce.current.useCallback(f, g);
    }),
    (A.useContext = function (f) {
      return ce.current.useContext(f);
    }),
    (A.useDebugValue = function () {}),
    (A.useDeferredValue = function (f) {
      return ce.current.useDeferredValue(f);
    }),
    (A.useEffect = function (f, g) {
      return ce.current.useEffect(f, g);
    }),
    (A.useId = function () {
      return ce.current.useId();
    }),
    (A.useImperativeHandle = function (f, g, V) {
      return ce.current.useImperativeHandle(f, g, V);
    }),
    (A.useInsertionEffect = function (f, g) {
      return ce.current.useInsertionEffect(f, g);
    }),
    (A.useLayoutEffect = function (f, g) {
      return ce.current.useLayoutEffect(f, g);
    }),
    (A.useMemo = function (f, g) {
      return ce.current.useMemo(f, g);
    }),
    (A.useReducer = function (f, g, V) {
      return ce.current.useReducer(f, g, V);
    }),
    (A.useRef = function (f) {
      return ce.current.useRef(f);
    }),
    (A.useState = function (f) {
      return ce.current.useState(f);
    }),
    (A.useSyncExternalStore = function (f, g, V) {
      return ce.current.useSyncExternalStore(f, g, V);
    }),
    (A.useTransition = function () {
      return ce.current.useTransition();
    }),
    (A.version = "18.3.1"),
    A
  );
}
var Ra;
function Oi() {
  return Ra || ((Ra = 1), (Ti.exports = Gf())), Ti.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ja;
function Xf() {
  if (ja) return wr;
  ja = 1;
  var p = Oi(),
    v = Symbol.for("react.element"),
    c = Symbol.for("react.fragment"),
    C = Object.prototype.hasOwnProperty,
    T = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function W(U, I, q) {
    var oe,
      Y = {},
      b = null,
      G = null;
    q !== void 0 && (b = "" + q), I.key !== void 0 && (b = "" + I.key), I.ref !== void 0 && (G = I.ref);
    for (oe in I) C.call(I, oe) && !D.hasOwnProperty(oe) && (Y[oe] = I[oe]);
    if (U && U.defaultProps) for (oe in ((I = U.defaultProps), I)) Y[oe] === void 0 && (Y[oe] = I[oe]);
    return { $$typeof: v, type: U, key: b, ref: G, props: Y, _owner: T.current };
  }
  return (wr.Fragment = c), (wr.jsx = W), (wr.jsxs = W), wr;
}
var Oa;
function Zf() {
  return Oa || ((Oa = 1), (zi.exports = Xf())), zi.exports;
}
var M = Zf(),
  qe = Oi();
const Pt = Yf(qe);
var Rl = {},
  Li = { exports: {} },
  Ue = {},
  Ri = { exports: {} },
  ji = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ma;
function Jf() {
  return (
    Ma ||
      ((Ma = 1),
      (function (p) {
        function v(E, O) {
          var N = E.length;
          E.push(O);
          e: for (; 0 < N; ) {
            var f = (N - 1) >>> 1,
              g = E[f];
            if (0 < T(g, O)) (E[f] = O), (E[N] = g), (N = f);
            else break e;
          }
        }
        function c(E) {
          return E.length === 0 ? null : E[0];
        }
        function C(E) {
          if (E.length === 0) return null;
          var O = E[0],
            N = E.pop();
          if (N !== O) {
            E[0] = N;
            e: for (var f = 0, g = E.length, V = g >>> 1; f < V; ) {
              var H = 2 * (f + 1) - 1,
                $ = E[H],
                Q = H + 1,
                te = E[Q];
              if (0 > T($, N))
                Q < g && 0 > T(te, $) ? ((E[f] = te), (E[Q] = N), (f = Q)) : ((E[f] = $), (E[H] = N), (f = H));
              else if (Q < g && 0 > T(te, N)) (E[f] = te), (E[Q] = N), (f = Q);
              else break e;
            }
          }
          return O;
        }
        function T(E, O) {
          var N = E.sortIndex - O.sortIndex;
          return N !== 0 ? N : E.id - O.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
          var D = performance;
          p.unstable_now = function () {
            return D.now();
          };
        } else {
          var W = Date,
            U = W.now();
          p.unstable_now = function () {
            return W.now() - U;
          };
        }
        var I = [],
          q = [],
          oe = 1,
          Y = null,
          b = 3,
          G = !1,
          he = !1,
          ee = !1,
          X = typeof setTimeout == "function" ? setTimeout : null,
          yt = typeof clearTimeout == "function" ? clearTimeout : null,
          at = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function be(E) {
          for (var O = c(q); O !== null; ) {
            if (O.callback === null) C(q);
            else if (O.startTime <= E) C(q), (O.sortIndex = O.expirationTime), v(I, O);
            else break;
            O = c(q);
          }
        }
        function xe(E) {
          if (((ee = !1), be(E), !he))
            if (c(I) !== null) (he = !0), je(et);
            else {
              var O = c(q);
              O !== null && ce(xe, O.startTime - E);
            }
        }
        function et(E, O) {
          (he = !1), ee && ((ee = !1), yt(Qe), (Qe = -1)), (G = !0);
          var N = b;
          try {
            for (be(O), Y = c(I); Y !== null && (!(Y.expirationTime > O) || (E && !Gt())); ) {
              var f = Y.callback;
              if (typeof f == "function") {
                (Y.callback = null), (b = Y.priorityLevel);
                var g = f(Y.expirationTime <= O);
                (O = p.unstable_now()), typeof g == "function" ? (Y.callback = g) : Y === c(I) && C(I), be(O);
              } else C(I);
              Y = c(I);
            }
            if (Y !== null) var V = !0;
            else {
              var H = c(q);
              H !== null && ce(xe, H.startTime - O), (V = !1);
            }
            return V;
          } finally {
            (Y = null), (b = N), (G = !1);
          }
        }
        var ze = !1,
          Re = null,
          Qe = -1,
          zt = 5,
          gt = -1;
        function Gt() {
          return !(p.unstable_now() - gt < zt);
        }
        function ct() {
          if (Re !== null) {
            var E = p.unstable_now();
            gt = E;
            var O = !0;
            try {
              O = Re(!0, E);
            } finally {
              O ? Ve() : ((ze = !1), (Re = null));
            }
          } else ze = !1;
        }
        var Ve;
        if (typeof at == "function")
          Ve = function () {
            at(ct);
          };
        else if (typeof MessageChannel < "u") {
          var tt = new MessageChannel(),
            ft = tt.port2;
          (tt.port1.onmessage = ct),
            (Ve = function () {
              ft.postMessage(null);
            });
        } else
          Ve = function () {
            X(ct, 0);
          };
        function je(E) {
          (Re = E), ze || ((ze = !0), Ve());
        }
        function ce(E, O) {
          Qe = X(function () {
            E(p.unstable_now());
          }, O);
        }
        (p.unstable_IdlePriority = 5),
          (p.unstable_ImmediatePriority = 1),
          (p.unstable_LowPriority = 4),
          (p.unstable_NormalPriority = 3),
          (p.unstable_Profiling = null),
          (p.unstable_UserBlockingPriority = 2),
          (p.unstable_cancelCallback = function (E) {
            E.callback = null;
          }),
          (p.unstable_continueExecution = function () {
            he || G || ((he = !0), je(et));
          }),
          (p.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (zt = 0 < E ? Math.floor(1e3 / E) : 5);
          }),
          (p.unstable_getCurrentPriorityLevel = function () {
            return b;
          }),
          (p.unstable_getFirstCallbackNode = function () {
            return c(I);
          }),
          (p.unstable_next = function (E) {
            switch (b) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = b;
            }
            var N = b;
            b = O;
            try {
              return E();
            } finally {
              b = N;
            }
          }),
          (p.unstable_pauseExecution = function () {}),
          (p.unstable_requestPaint = function () {}),
          (p.unstable_runWithPriority = function (E, O) {
            switch (E) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                E = 3;
            }
            var N = b;
            b = E;
            try {
              return O();
            } finally {
              b = N;
            }
          }),
          (p.unstable_scheduleCallback = function (E, O, N) {
            var f = p.unstable_now();
            switch (
              (typeof N == "object" && N !== null
                ? ((N = N.delay), (N = typeof N == "number" && 0 < N ? f + N : f))
                : (N = f),
              E)
            ) {
              case 1:
                var g = -1;
                break;
              case 2:
                g = 250;
                break;
              case 5:
                g = 1073741823;
                break;
              case 4:
                g = 1e4;
                break;
              default:
                g = 5e3;
            }
            return (
              (g = N + g),
              (E = { id: oe++, callback: O, priorityLevel: E, startTime: N, expirationTime: g, sortIndex: -1 }),
              N > f
                ? ((E.sortIndex = N),
                  v(q, E),
                  c(I) === null && E === c(q) && (ee ? (yt(Qe), (Qe = -1)) : (ee = !0), ce(xe, N - f)))
                : ((E.sortIndex = g), v(I, E), he || G || ((he = !0), je(et))),
              E
            );
          }),
          (p.unstable_shouldYield = Gt),
          (p.unstable_wrapCallback = function (E) {
            var O = b;
            return function () {
              var N = b;
              b = O;
              try {
                return E.apply(this, arguments);
              } finally {
                b = N;
              }
            };
          });
      })(ji)),
    ji
  );
}
var Da;
function qf() {
  return Da || ((Da = 1), (Ri.exports = Jf())), Ri.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ia;
function bf() {
  if (Ia) return Ue;
  Ia = 1;
  var p = Oi(),
    v = qf();
  function c(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var C = new Set(),
    T = {};
  function D(e, t) {
    W(e, t), W(e + "Capture", t);
  }
  function W(e, t) {
    for (T[e] = t, e = 0; e < t.length; e++) C.add(t[e]);
  }
  var U = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    I = Object.prototype.hasOwnProperty,
    q =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    oe = {},
    Y = {};
  function b(e) {
    return I.call(Y, e) ? !0 : I.call(oe, e) ? !1 : q.test(e) ? (Y[e] = !0) : ((oe[e] = !0), !1);
  }
  function G(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function he(e, t, n, r) {
    if (t === null || typeof t > "u" || G(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function ee(e, t, n, r, l, u, i) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = u),
      (this.removeEmptyString = i);
  }
  var X = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      X[e] = new ee(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      X[t] = new ee(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
      X[e] = new ee(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
      X[e] = new ee(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        X[e] = new ee(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      X[e] = new ee(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      X[e] = new ee(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      X[e] = new ee(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      X[e] = new ee(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var yt = /[\-:]([a-z])/g;
  function at(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(yt, at);
      X[t] = new ee(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
      var t = e.replace(yt, at);
      X[t] = new ee(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(yt, at);
      X[t] = new ee(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      X[e] = new ee(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (X.xlinkHref = new ee("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      X[e] = new ee(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function be(e, t, n, r) {
    var l = X.hasOwnProperty(t) ? X[t] : null;
    (l !== null
      ? l.type !== 0
      : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
      (he(t, n, l, r) && (n = null),
      r || l === null
        ? b(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var xe = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    et = Symbol.for("react.element"),
    ze = Symbol.for("react.portal"),
    Re = Symbol.for("react.fragment"),
    Qe = Symbol.for("react.strict_mode"),
    zt = Symbol.for("react.profiler"),
    gt = Symbol.for("react.provider"),
    Gt = Symbol.for("react.context"),
    ct = Symbol.for("react.forward_ref"),
    Ve = Symbol.for("react.suspense"),
    tt = Symbol.for("react.suspense_list"),
    ft = Symbol.for("react.memo"),
    je = Symbol.for("react.lazy"),
    ce = Symbol.for("react.offscreen"),
    E = Symbol.iterator;
  function O(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (E && e[E]) || e["@@iterator"]), typeof e == "function" ? e : null);
  }
  var N = Object.assign,
    f;
  function g(e) {
    if (f === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        f = (t && t[1]) || "";
      }
    return (
      `
` +
      f +
      e
    );
  }
  var V = !1;
  function H(e, t) {
    if (!e || V) return "";
    V = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (h) {
            var r = h;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (h) {
            r = h;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (h) {
          r = h;
        }
        e();
      }
    } catch (h) {
      if (h && r && typeof h.stack == "string") {
        for (
          var l = h.stack.split(`
`),
            u = r.stack.split(`
`),
            i = l.length - 1,
            o = u.length - 1;
          1 <= i && 0 <= o && l[i] !== u[o];

        )
          o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (l[i] !== u[o]) {
            if (i !== 1 || o !== 1)
              do
                if ((i--, o--, 0 > o || l[i] !== u[o])) {
                  var s =
                    `
` + l[i].replace(" at new ", " at ");
                  return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      (V = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? g(e) : "";
  }
  function $(e) {
    switch (e.tag) {
      case 5:
        return g(e.type);
      case 16:
        return g("Lazy");
      case 13:
        return g("Suspense");
      case 19:
        return g("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = H(e.type, !1)), e;
      case 11:
        return (e = H(e.type.render, !1)), e;
      case 1:
        return (e = H(e.type, !0)), e;
      default:
        return "";
    }
  }
  function Q(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Re:
        return "Fragment";
      case ze:
        return "Portal";
      case zt:
        return "Profiler";
      case Qe:
        return "StrictMode";
      case Ve:
        return "Suspense";
      case tt:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Gt:
          return (e.displayName || "Context") + ".Consumer";
        case gt:
          return (e._context.displayName || "Context") + ".Provider";
        case ct:
          var t = e.render;
          return (
            (e = e.displayName),
            e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case ft:
          return (t = e.displayName || null), t !== null ? t : Q(e.type) || "Memo";
        case je:
          (t = e._payload), (e = e._init);
          try {
            return Q(e(t));
          } catch {}
      }
    return null;
  }
  function te(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Q(t);
      case 8:
        return t === Qe ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function Z(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ue(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ae(e) {
    var t = ue(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get,
        u = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (i) {
            (r = "" + i), u.call(this, i);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (i) {
            r = "" + i;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function kr(e) {
    e._valueTracker || (e._valueTracker = Ae(e));
  }
  function Mi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return e && (r = ue(e) ? (e.checked ? "true" : "false") : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1;
  }
  function Er(e) {
    if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Dl(e, t) {
    var n = t.checked;
    return N({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Di(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    (n = Z(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
      });
  }
  function Ii(e, t) {
    (t = t.checked), t != null && be(e, "checked", t, !1);
  }
  function Il(e, t) {
    Ii(e, t);
    var n = Z(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Fl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Fl(e, t.type, Z(t.defaultValue)),
      t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Fi(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
      (t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t);
    }
    (n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n);
  }
  function Fl(e, t, n) {
    (t !== "number" || Er(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Mn = Array.isArray;
  function an(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        (l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Z(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          (e[l].selected = !0), r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ul(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(c(91));
    return N({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Ui(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(c(92));
        if (Mn(n)) {
          if (1 < n.length) throw Error(c(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Z(n) };
  }
  function Vi(e, t) {
    var n = Z(t.value),
      r = Z(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r);
  }
  function Ai(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Hi(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Vl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Hi(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var xr,
    Bi = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
      else {
        for (
          xr = xr || document.createElement("div"),
            xr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = xr.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function Dn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var In = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Ga = ["Webkit", "ms", "Moz", "O"];
  Object.keys(In).forEach(function (e) {
    Ga.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (In[t] = In[e]);
    });
  });
  function Wi(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (In.hasOwnProperty(e) && In[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function $i(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          l = Wi(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
      }
  }
  var Xa = N(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function Al(e, t) {
    if (t) {
      if (Xa[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(c(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(c(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
          throw Error(c(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(c(62));
    }
  }
  function Hl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Bl = null;
  function Wl(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var $l = null,
    cn = null,
    fn = null;
  function Qi(e) {
    if ((e = lr(e))) {
      if (typeof $l != "function") throw Error(c(280));
      var t = e.stateNode;
      t && ((t = Kr(t)), $l(e.stateNode, e.type, t));
    }
  }
  function Ki(e) {
    cn ? (fn ? fn.push(e) : (fn = [e])) : (cn = e);
  }
  function Yi() {
    if (cn) {
      var e = cn,
        t = fn;
      if (((fn = cn = null), Qi(e), t)) for (e = 0; e < t.length; e++) Qi(t[e]);
    }
  }
  function Gi(e, t) {
    return e(t);
  }
  function Xi() {}
  var Ql = !1;
  function Zi(e, t, n) {
    if (Ql) return e(t, n);
    Ql = !0;
    try {
      return Gi(e, t, n);
    } finally {
      (Ql = !1), (cn !== null || fn !== null) && (Xi(), Yi());
    }
  }
  function Fn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Kr(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type), (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(c(231, t, typeof n));
    return n;
  }
  var Kl = !1;
  if (U)
    try {
      var Un = {};
      Object.defineProperty(Un, "passive", {
        get: function () {
          Kl = !0;
        },
      }),
        window.addEventListener("test", Un, Un),
        window.removeEventListener("test", Un, Un);
    } catch {
      Kl = !1;
    }
  function Za(e, t, n, r, l, u, i, o, s) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (w) {
      this.onError(w);
    }
  }
  var Vn = !1,
    Cr = null,
    _r = !1,
    Yl = null,
    Ja = {
      onError: function (e) {
        (Vn = !0), (Cr = e);
      },
    };
  function qa(e, t, n, r, l, u, i, o, s) {
    (Vn = !1), (Cr = null), Za.apply(Ja, arguments);
  }
  function ba(e, t, n, r, l, u, i, o, s) {
    if ((qa.apply(this, arguments), Vn)) {
      if (Vn) {
        var h = Cr;
        (Vn = !1), (Cr = null);
      } else throw Error(c(198));
      _r || ((_r = !0), (Yl = h));
    }
  }
  function Xt(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Ji(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
  }
  function qi(e) {
    if (Xt(e) !== e) throw Error(c(188));
  }
  function ec(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = Xt(e)), t === null)) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var u = l.alternate;
      if (u === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === u.child) {
        for (u = l.child; u; ) {
          if (u === n) return qi(l), e;
          if (u === r) return qi(l), t;
          u = u.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== r.return) (n = l), (r = u);
      else {
        for (var i = !1, o = l.child; o; ) {
          if (o === n) {
            (i = !0), (n = l), (r = u);
            break;
          }
          if (o === r) {
            (i = !0), (r = l), (n = u);
            break;
          }
          o = o.sibling;
        }
        if (!i) {
          for (o = u.child; o; ) {
            if (o === n) {
              (i = !0), (n = u), (r = l);
              break;
            }
            if (o === r) {
              (i = !0), (r = u), (n = l);
              break;
            }
            o = o.sibling;
          }
          if (!i) throw Error(c(189));
        }
      }
      if (n.alternate !== r) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function bi(e) {
    return (e = ec(e)), e !== null ? eo(e) : null;
  }
  function eo(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = eo(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var to = v.unstable_scheduleCallback,
    no = v.unstable_cancelCallback,
    tc = v.unstable_shouldYield,
    nc = v.unstable_requestPaint,
    de = v.unstable_now,
    rc = v.unstable_getCurrentPriorityLevel,
    Gl = v.unstable_ImmediatePriority,
    ro = v.unstable_UserBlockingPriority,
    Nr = v.unstable_NormalPriority,
    lc = v.unstable_LowPriority,
    lo = v.unstable_IdlePriority,
    Pr = null,
    dt = null;
  function uc(e) {
    if (dt && typeof dt.onCommitFiberRoot == "function")
      try {
        dt.onCommitFiberRoot(Pr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : sc,
    ic = Math.log,
    oc = Math.LN2;
  function sc(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ic(e) / oc) | 0)) | 0;
  }
  var zr = 64,
    Tr = 4194304;
  function An(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Lr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      u = e.pingedLanes,
      i = n & 268435455;
    if (i !== 0) {
      var o = i & ~l;
      o !== 0 ? (r = An(o)) : ((u &= i), u !== 0 && (r = An(u)));
    } else (i = n & ~l), i !== 0 ? (r = An(i)) : u !== 0 && (r = An(u));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & l) && ((l = r & -r), (u = t & -t), l >= u || (l === 16 && (u & 4194240) !== 0)))
      return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; ) (n = 31 - nt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
  }
  function ac(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function cc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var i = 31 - nt(u),
        o = 1 << i,
        s = l[i];
      s === -1 ? (!(o & n) || o & r) && (l[i] = ac(o, t)) : s <= t && (e.expiredLanes |= o), (u &= ~o);
    }
  }
  function Xl(e) {
    return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function uo() {
    var e = zr;
    return (zr <<= 1), !(zr & 4194240) && (zr = 64), e;
  }
  function Zl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Hn(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - nt(t)),
      (e[t] = n);
  }
  function fc(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - nt(n),
        u = 1 << l;
      (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~u);
    }
  }
  function Jl(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - nt(n),
        l = 1 << r;
      (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
  }
  var J = 0;
  function io(e) {
    return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
  }
  var oo,
    ql,
    so,
    ao,
    co,
    bl = !1,
    Rr = [],
    Tt = null,
    Lt = null,
    Rt = null,
    Bn = new Map(),
    Wn = new Map(),
    jt = [],
    dc =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function fo(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Tt = null;
        break;
      case "dragenter":
      case "dragleave":
        Lt = null;
        break;
      case "mouseover":
      case "mouseout":
        Rt = null;
        break;
      case "pointerover":
      case "pointerout":
        Bn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wn.delete(t.pointerId);
    }
  }
  function $n(e, t, n, r, l, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: u, targetContainers: [l] }),
        t !== null && ((t = lr(t)), t !== null && ql(t)),
        e)
      : ((e.eventSystemFlags |= r), (t = e.targetContainers), l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function pc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return (Tt = $n(Tt, e, t, n, r, l)), !0;
      case "dragenter":
        return (Lt = $n(Lt, e, t, n, r, l)), !0;
      case "mouseover":
        return (Rt = $n(Rt, e, t, n, r, l)), !0;
      case "pointerover":
        var u = l.pointerId;
        return Bn.set(u, $n(Bn.get(u) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return (u = l.pointerId), Wn.set(u, $n(Wn.get(u) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function po(e) {
    var t = Zt(e.target);
    if (t !== null) {
      var n = Xt(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Ji(n)), t !== null)) {
            (e.blockedOn = t),
              co(e.priority, function () {
                so(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function jr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = tu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        (Bl = r), n.target.dispatchEvent(r), (Bl = null);
      } else return (t = lr(n)), t !== null && ql(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function mo(e, t, n) {
    jr(e) && n.delete(t);
  }
  function mc() {
    (bl = !1),
      Tt !== null && jr(Tt) && (Tt = null),
      Lt !== null && jr(Lt) && (Lt = null),
      Rt !== null && jr(Rt) && (Rt = null),
      Bn.forEach(mo),
      Wn.forEach(mo);
  }
  function Qn(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null), bl || ((bl = !0), v.unstable_scheduleCallback(v.unstable_NormalPriority, mc)));
  }
  function Kn(e) {
    function t(l) {
      return Qn(l, e);
    }
    if (0 < Rr.length) {
      Qn(Rr[0], e);
      for (var n = 1; n < Rr.length; n++) {
        var r = Rr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      Tt !== null && Qn(Tt, e), Lt !== null && Qn(Lt, e), Rt !== null && Qn(Rt, e), Bn.forEach(t), Wn.forEach(t), n = 0;
      n < jt.length;
      n++
    )
      (r = jt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < jt.length && ((n = jt[0]), n.blockedOn === null); ) po(n), n.blockedOn === null && jt.shift();
  }
  var dn = xe.ReactCurrentBatchConfig,
    Or = !0;
  function hc(e, t, n, r) {
    var l = J,
      u = dn.transition;
    dn.transition = null;
    try {
      (J = 1), eu(e, t, n, r);
    } finally {
      (J = l), (dn.transition = u);
    }
  }
  function vc(e, t, n, r) {
    var l = J,
      u = dn.transition;
    dn.transition = null;
    try {
      (J = 4), eu(e, t, n, r);
    } finally {
      (J = l), (dn.transition = u);
    }
  }
  function eu(e, t, n, r) {
    if (Or) {
      var l = tu(e, t, n, r);
      if (l === null) gu(e, t, r, Mr, n), fo(e, r);
      else if (pc(l, e, t, n, r)) r.stopPropagation();
      else if ((fo(e, r), t & 4 && -1 < dc.indexOf(e))) {
        for (; l !== null; ) {
          var u = lr(l);
          if ((u !== null && oo(u), (u = tu(e, t, n, r)), u === null && gu(e, t, r, Mr, n), u === l)) break;
          l = u;
        }
        l !== null && r.stopPropagation();
      } else gu(e, t, r, null, n);
    }
  }
  var Mr = null;
  function tu(e, t, n, r) {
    if (((Mr = null), (e = Wl(r)), (e = Zt(e)), e !== null))
      if (((t = Xt(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Ji(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (Mr = e), null;
  }
  function ho(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (rc()) {
          case Gl:
            return 1;
          case ro:
            return 4;
          case Nr:
          case lc:
            return 16;
          case lo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ot = null,
    nu = null,
    Dr = null;
  function vo() {
    if (Dr) return Dr;
    var e,
      t = nu,
      n = t.length,
      r,
      l = "value" in Ot ? Ot.value : Ot.textContent,
      u = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[u - r]; r++);
    return (Dr = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Ir(e) {
    var t = e.keyCode;
    return (
      "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Fr() {
    return !0;
  }
  function yo() {
    return !1;
  }
  function He(e) {
    function t(n, r, l, u, i) {
      (this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = u),
        (this.target = i),
        (this.currentTarget = null);
      for (var o in e) e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(u) : u[o]));
      return (
        (this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Fr : yo),
        (this.isPropagationStopped = yo),
        this
      );
    }
    return (
      N(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = Fr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = Fr));
        },
        persist: function () {},
        isPersistent: Fr,
      }),
      t
    );
  }
  var pn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ru = He(pn),
    Yn = N({}, pn, { view: 0, detail: 0 }),
    yc = He(Yn),
    lu,
    uu,
    Gn,
    Ur = N({}, Yn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ou,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Gn &&
              (Gn && e.type === "mousemove"
                ? ((lu = e.screenX - Gn.screenX), (uu = e.screenY - Gn.screenY))
                : (uu = lu = 0),
              (Gn = e)),
            lu);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : uu;
      },
    }),
    go = He(Ur),
    gc = N({}, Ur, { dataTransfer: 0 }),
    wc = He(gc),
    Sc = N({}, Yn, { relatedTarget: 0 }),
    iu = He(Sc),
    kc = N({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ec = He(kc),
    xc = N({}, pn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Cc = He(xc),
    _c = N({}, pn, { data: 0 }),
    wo = He(_c),
    Nc = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Pc = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    zc = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Tc(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = zc[e]) ? !!t[e] : !1;
  }
  function ou() {
    return Tc;
  }
  var Lc = N({}, Yn, {
      key: function (e) {
        if (e.key) {
          var t = Nc[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Ir(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Pc[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ou,
      charCode: function (e) {
        return e.type === "keypress" ? Ir(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress" ? Ir(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
    }),
    Rc = He(Lc),
    jc = N({}, Ur, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    So = He(jc),
    Oc = N({}, Yn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ou,
    }),
    Mc = He(Oc),
    Dc = N({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ic = He(Dc),
    Fc = N({}, Ur, {
      deltaX: function (e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Uc = He(Fc),
    Vc = [9, 13, 27, 32],
    su = U && "CompositionEvent" in window,
    Xn = null;
  U && "documentMode" in document && (Xn = document.documentMode);
  var Ac = U && "TextEvent" in window && !Xn,
    ko = U && (!su || (Xn && 8 < Xn && 11 >= Xn)),
    Eo = " ",
    xo = !1;
  function Co(e, t) {
    switch (e) {
      case "keyup":
        return Vc.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function _o(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var mn = !1;
  function Hc(e, t) {
    switch (e) {
      case "compositionend":
        return _o(t);
      case "keypress":
        return t.which !== 32 ? null : ((xo = !0), Eo);
      case "textInput":
        return (e = t.data), e === Eo && xo ? null : e;
      default:
        return null;
    }
  }
  function Bc(e, t) {
    if (mn)
      return e === "compositionend" || (!su && Co(e, t)) ? ((e = vo()), (Dr = nu = Ot = null), (mn = !1), e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ko && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Wc = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function No(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Wc[e.type] : t === "textarea";
  }
  function Po(e, t, n, r) {
    Ki(r),
      (t = Wr(t, "onChange")),
      0 < t.length && ((n = new ru("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
  }
  var Zn = null,
    Jn = null;
  function $c(e) {
    Qo(e, 0);
  }
  function Vr(e) {
    var t = wn(e);
    if (Mi(t)) return e;
  }
  function Qc(e, t) {
    if (e === "change") return t;
  }
  var zo = !1;
  if (U) {
    var au;
    if (U) {
      var cu = "oninput" in document;
      if (!cu) {
        var To = document.createElement("div");
        To.setAttribute("oninput", "return;"), (cu = typeof To.oninput == "function");
      }
      au = cu;
    } else au = !1;
    zo = au && (!document.documentMode || 9 < document.documentMode);
  }
  function Lo() {
    Zn && (Zn.detachEvent("onpropertychange", Ro), (Jn = Zn = null));
  }
  function Ro(e) {
    if (e.propertyName === "value" && Vr(Jn)) {
      var t = [];
      Po(t, Jn, e, Wl(e)), Zi($c, t);
    }
  }
  function Kc(e, t, n) {
    e === "focusin" ? (Lo(), (Zn = t), (Jn = n), Zn.attachEvent("onpropertychange", Ro)) : e === "focusout" && Lo();
  }
  function Yc(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Vr(Jn);
  }
  function Gc(e, t) {
    if (e === "click") return Vr(t);
  }
  function Xc(e, t) {
    if (e === "input" || e === "change") return Vr(t);
  }
  function Zc(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var rt = typeof Object.is == "function" ? Object.is : Zc;
  function qn(e, t) {
    if (rt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!I.call(t, l) || !rt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function jo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Oo(e, t) {
    var n = jo(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = jo(n);
    }
  }
  function Mo(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Mo(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Do() {
    for (var e = window, t = Er(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Er(e.document);
    }
    return t;
  }
  function fu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function Jc(e) {
    var t = Do(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Mo(n.ownerDocument.documentElement, n)) {
      if (r !== null && fu(n)) {
        if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
          (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
        else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
          e = e.getSelection();
          var l = n.textContent.length,
            u = Math.min(r.start, l);
          (r = r.end === void 0 ? u : Math.min(r.end, l)),
            !e.extend && u > r && ((l = r), (r = u), (u = l)),
            (l = Oo(n, u));
          var i = Oo(n, r);
          l &&
            i &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== i.node ||
              e.focusOffset !== i.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            u > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
    }
  }
  var qc = U && "documentMode" in document && 11 >= document.documentMode,
    hn = null,
    du = null,
    bn = null,
    pu = !1;
  function Io(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    pu ||
      hn == null ||
      hn !== Er(r) ||
      ((r = hn),
      "selectionStart" in r && fu(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (bn && qn(bn, r)) ||
        ((bn = r),
        (r = Wr(du, "onSelect")),
        0 < r.length &&
          ((t = new ru("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = hn))));
  }
  function Ar(e, t) {
    var n = {};
    return (n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n;
  }
  var vn = {
      animationend: Ar("Animation", "AnimationEnd"),
      animationiteration: Ar("Animation", "AnimationIteration"),
      animationstart: Ar("Animation", "AnimationStart"),
      transitionend: Ar("Transition", "TransitionEnd"),
    },
    mu = {},
    Fo = {};
  U &&
    ((Fo = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete vn.animationend.animation, delete vn.animationiteration.animation, delete vn.animationstart.animation),
    "TransitionEvent" in window || delete vn.transitionend.transition);
  function Hr(e) {
    if (mu[e]) return mu[e];
    if (!vn[e]) return e;
    var t = vn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Fo) return (mu[e] = t[n]);
    return e;
  }
  var Uo = Hr("animationend"),
    Vo = Hr("animationiteration"),
    Ao = Hr("animationstart"),
    Ho = Hr("transitionend"),
    Bo = new Map(),
    Wo =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function Mt(e, t) {
    Bo.set(e, t), D(t, [e]);
  }
  for (var hu = 0; hu < Wo.length; hu++) {
    var vu = Wo[hu],
      bc = vu.toLowerCase(),
      ef = vu[0].toUpperCase() + vu.slice(1);
    Mt(bc, "on" + ef);
  }
  Mt(Uo, "onAnimationEnd"),
    Mt(Vo, "onAnimationIteration"),
    Mt(Ao, "onAnimationStart"),
    Mt("dblclick", "onDoubleClick"),
    Mt("focusin", "onFocus"),
    Mt("focusout", "onBlur"),
    Mt(Ho, "onTransitionEnd"),
    W("onMouseEnter", ["mouseout", "mouseover"]),
    W("onMouseLeave", ["mouseout", "mouseover"]),
    W("onPointerEnter", ["pointerout", "pointerover"]),
    W("onPointerLeave", ["pointerout", "pointerover"]),
    D("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    D("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    D("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    D("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    D("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    D("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var er =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    tf = new Set("cancel close invalid load scroll toggle".split(" ").concat(er));
  function $o(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), ba(r, t, void 0, e), (e.currentTarget = null);
  }
  function Qo(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var i = r.length - 1; 0 <= i; i--) {
            var o = r[i],
              s = o.instance,
              h = o.currentTarget;
            if (((o = o.listener), s !== u && l.isPropagationStopped())) break e;
            $o(l, o, h), (u = s);
          }
        else
          for (i = 0; i < r.length; i++) {
            if (
              ((o = r[i]),
              (s = o.instance),
              (h = o.currentTarget),
              (o = o.listener),
              s !== u && l.isPropagationStopped())
            )
              break e;
            $o(l, o, h), (u = s);
          }
      }
    }
    if (_r) throw ((e = Yl), (_r = !1), (Yl = null), e);
  }
  function re(e, t) {
    var n = t[Cu];
    n === void 0 && (n = t[Cu] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Ko(t, e, 2, !1), n.add(r));
  }
  function yu(e, t, n) {
    var r = 0;
    t && (r |= 4), Ko(n, e, r, t);
  }
  var Br = "_reactListening" + Math.random().toString(36).slice(2);
  function tr(e) {
    if (!e[Br]) {
      (e[Br] = !0),
        C.forEach(function (n) {
          n !== "selectionchange" && (tf.has(n) || yu(n, !1, e), yu(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Br] || ((t[Br] = !0), yu("selectionchange", !1, t));
    }
  }
  function Ko(e, t, n, r) {
    switch (ho(t)) {
      case 1:
        var l = hc;
        break;
      case 4:
        l = vc;
        break;
      default:
        l = eu;
    }
    (n = l.bind(null, t, n, e)),
      (l = void 0),
      !Kl || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1);
  }
  function gu(e, t, n, r, l) {
    var u = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e: for (;;) {
        if (r === null) return;
        var i = r.tag;
        if (i === 3 || i === 4) {
          var o = r.stateNode.containerInfo;
          if (o === l || (o.nodeType === 8 && o.parentNode === l)) break;
          if (i === 4)
            for (i = r.return; i !== null; ) {
              var s = i.tag;
              if (
                (s === 3 || s === 4) &&
                ((s = i.stateNode.containerInfo), s === l || (s.nodeType === 8 && s.parentNode === l))
              )
                return;
              i = i.return;
            }
          for (; o !== null; ) {
            if (((i = Zt(o)), i === null)) return;
            if (((s = i.tag), s === 5 || s === 6)) {
              r = u = i;
              continue e;
            }
            o = o.parentNode;
          }
        }
        r = r.return;
      }
    Zi(function () {
      var h = u,
        w = Wl(n),
        S = [];
      e: {
        var y = Bo.get(e);
        if (y !== void 0) {
          var x = ru,
            P = e;
          switch (e) {
            case "keypress":
              if (Ir(n) === 0) break e;
            case "keydown":
            case "keyup":
              x = Rc;
              break;
            case "focusin":
              (P = "focus"), (x = iu);
              break;
            case "focusout":
              (P = "blur"), (x = iu);
              break;
            case "beforeblur":
            case "afterblur":
              x = iu;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = go;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = wc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Mc;
              break;
            case Uo:
            case Vo:
            case Ao:
              x = Ec;
              break;
            case Ho:
              x = Ic;
              break;
            case "scroll":
              x = yc;
              break;
            case "wheel":
              x = Uc;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = Cc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = So;
          }
          var z = (t & 4) !== 0,
            pe = !z && e === "scroll",
            d = z ? (y !== null ? y + "Capture" : null) : y;
          z = [];
          for (var a = h, m; a !== null; ) {
            m = a;
            var k = m.stateNode;
            if (
              (m.tag === 5 && k !== null && ((m = k), d !== null && ((k = Fn(a, d)), k != null && z.push(nr(a, k, m)))),
              pe)
            )
              break;
            a = a.return;
          }
          0 < z.length && ((y = new x(y, P, null, n, w)), S.push({ event: y, listeners: z }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((y = e === "mouseover" || e === "pointerover"),
            (x = e === "mouseout" || e === "pointerout"),
            y && n !== Bl && (P = n.relatedTarget || n.fromElement) && (Zt(P) || P[wt]))
          )
            break e;
          if (
            (x || y) &&
            ((y = w.window === w ? w : (y = w.ownerDocument) ? y.defaultView || y.parentWindow : window),
            x
              ? ((P = n.relatedTarget || n.toElement),
                (x = h),
                (P = P ? Zt(P) : null),
                P !== null && ((pe = Xt(P)), P !== pe || (P.tag !== 5 && P.tag !== 6)) && (P = null))
              : ((x = null), (P = h)),
            x !== P)
          ) {
            if (
              ((z = go),
              (k = "onMouseLeave"),
              (d = "onMouseEnter"),
              (a = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((z = So), (k = "onPointerLeave"), (d = "onPointerEnter"), (a = "pointer")),
              (pe = x == null ? y : wn(x)),
              (m = P == null ? y : wn(P)),
              (y = new z(k, a + "leave", x, n, w)),
              (y.target = pe),
              (y.relatedTarget = m),
              (k = null),
              Zt(w) === h && ((z = new z(d, a + "enter", P, n, w)), (z.target = m), (z.relatedTarget = pe), (k = z)),
              (pe = k),
              x && P)
            )
              t: {
                for (z = x, d = P, a = 0, m = z; m; m = yn(m)) a++;
                for (m = 0, k = d; k; k = yn(k)) m++;
                for (; 0 < a - m; ) (z = yn(z)), a--;
                for (; 0 < m - a; ) (d = yn(d)), m--;
                for (; a--; ) {
                  if (z === d || (d !== null && z === d.alternate)) break t;
                  (z = yn(z)), (d = yn(d));
                }
                z = null;
              }
            else z = null;
            x !== null && Yo(S, y, x, z, !1), P !== null && pe !== null && Yo(S, pe, P, z, !0);
          }
        }
        e: {
          if (
            ((y = h ? wn(h) : window),
            (x = y.nodeName && y.nodeName.toLowerCase()),
            x === "select" || (x === "input" && y.type === "file"))
          )
            var L = Qc;
          else if (No(y))
            if (zo) L = Xc;
            else {
              L = Yc;
              var R = Kc;
            }
          else
            (x = y.nodeName) &&
              x.toLowerCase() === "input" &&
              (y.type === "checkbox" || y.type === "radio") &&
              (L = Gc);
          if (L && (L = L(e, h))) {
            Po(S, L, n, w);
            break e;
          }
          R && R(e, y, h),
            e === "focusout" &&
              (R = y._wrapperState) &&
              R.controlled &&
              y.type === "number" &&
              Fl(y, "number", y.value);
        }
        switch (((R = h ? wn(h) : window), e)) {
          case "focusin":
            (No(R) || R.contentEditable === "true") && ((hn = R), (du = h), (bn = null));
            break;
          case "focusout":
            bn = du = hn = null;
            break;
          case "mousedown":
            pu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (pu = !1), Io(S, n, w);
            break;
          case "selectionchange":
            if (qc) break;
          case "keydown":
          case "keyup":
            Io(S, n, w);
        }
        var j;
        if (su)
          e: {
            switch (e) {
              case "compositionstart":
                var F = "onCompositionStart";
                break e;
              case "compositionend":
                F = "onCompositionEnd";
                break e;
              case "compositionupdate":
                F = "onCompositionUpdate";
                break e;
            }
            F = void 0;
          }
        else
          mn
            ? Co(e, n) && (F = "onCompositionEnd")
            : e === "keydown" && n.keyCode === 229 && (F = "onCompositionStart");
        F &&
          (ko &&
            n.locale !== "ko" &&
            (mn || F !== "onCompositionStart"
              ? F === "onCompositionEnd" && mn && (j = vo())
              : ((Ot = w), (nu = "value" in Ot ? Ot.value : Ot.textContent), (mn = !0))),
          (R = Wr(h, F)),
          0 < R.length &&
            ((F = new wo(F, e, null, n, w)),
            S.push({ event: F, listeners: R }),
            j ? (F.data = j) : ((j = _o(n)), j !== null && (F.data = j)))),
          (j = Ac ? Hc(e, n) : Bc(e, n)) &&
            ((h = Wr(h, "onBeforeInput")),
            0 < h.length &&
              ((w = new wo("onBeforeInput", "beforeinput", null, n, w)),
              S.push({ event: w, listeners: h }),
              (w.data = j)));
      }
      Qo(S, t);
    });
  }
  function nr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Wr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e,
        u = l.stateNode;
      l.tag === 5 &&
        u !== null &&
        ((l = u),
        (u = Fn(e, n)),
        u != null && r.unshift(nr(e, u, l)),
        (u = Fn(e, t)),
        u != null && r.push(nr(e, u, l))),
        (e = e.return);
    }
    return r;
  }
  function yn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Yo(e, t, n, r, l) {
    for (var u = t._reactName, i = []; n !== null && n !== r; ) {
      var o = n,
        s = o.alternate,
        h = o.stateNode;
      if (s !== null && s === r) break;
      o.tag === 5 &&
        h !== null &&
        ((o = h),
        l
          ? ((s = Fn(n, u)), s != null && i.unshift(nr(n, s, o)))
          : l || ((s = Fn(n, u)), s != null && i.push(nr(n, s, o)))),
        (n = n.return);
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var nf = /\r\n?/g,
    rf = /\u0000|\uFFFD/g;
  function Go(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        nf,
        `
`
      )
      .replace(rf, "");
  }
  function $r(e, t, n) {
    if (((t = Go(t)), Go(e) !== t && n)) throw Error(c(425));
  }
  function Qr() {}
  var wu = null,
    Su = null;
  function ku(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Eu = typeof setTimeout == "function" ? setTimeout : void 0,
    lf = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Xo = typeof Promise == "function" ? Promise : void 0,
    uf =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Xo < "u"
          ? function (e) {
              return Xo.resolve(null).then(e).catch(of);
            }
          : Eu;
  function of(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function xu(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === "/$")) {
          if (r === 0) {
            e.removeChild(l), Kn(t);
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = l;
    } while (n);
    Kn(t);
  }
  function Dt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Zo(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var gn = Math.random().toString(36).slice(2),
    pt = "__reactFiber$" + gn,
    rr = "__reactProps$" + gn,
    wt = "__reactContainer$" + gn,
    Cu = "__reactEvents$" + gn,
    sf = "__reactListeners$" + gn,
    af = "__reactHandles$" + gn;
  function Zt(e) {
    var t = e[pt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[wt] || n[pt])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Zo(e); e !== null; ) {
            if ((n = e[pt])) return n;
            e = Zo(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function lr(e) {
    return (e = e[pt] || e[wt]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e;
  }
  function wn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(c(33));
  }
  function Kr(e) {
    return e[rr] || null;
  }
  var _u = [],
    Sn = -1;
  function It(e) {
    return { current: e };
  }
  function le(e) {
    0 > Sn || ((e.current = _u[Sn]), (_u[Sn] = null), Sn--);
  }
  function ne(e, t) {
    Sn++, (_u[Sn] = e.current), (e.current = t);
  }
  var Ft = {},
    Ce = It(Ft),
    Oe = It(!1),
    Jt = Ft;
  function kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ft;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      u;
    for (u in n) l[u] = t[u];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function Me(e) {
    return (e = e.childContextTypes), e != null;
  }
  function Yr() {
    le(Oe), le(Ce);
  }
  function Jo(e, t, n) {
    if (Ce.current !== Ft) throw Error(c(168));
    ne(Ce, t), ne(Oe, n);
  }
  function qo(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(c(108, te(e) || "Unknown", l));
    return N({}, n, r);
  }
  function Gr(e) {
    return (
      (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ft),
      (Jt = Ce.current),
      ne(Ce, e),
      ne(Oe, Oe.current),
      !0
    );
  }
  function bo(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(c(169));
    n ? ((e = qo(e, t, Jt)), (r.__reactInternalMemoizedMergedChildContext = e), le(Oe), le(Ce), ne(Ce, e)) : le(Oe),
      ne(Oe, n);
  }
  var St = null,
    Xr = !1,
    Nu = !1;
  function es(e) {
    St === null ? (St = [e]) : St.push(e);
  }
  function cf(e) {
    (Xr = !0), es(e);
  }
  function Ut() {
    if (!Nu && St !== null) {
      Nu = !0;
      var e = 0,
        t = J;
      try {
        var n = St;
        for (J = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        (St = null), (Xr = !1);
      } catch (l) {
        throw (St !== null && (St = St.slice(e + 1)), to(Gl, Ut), l);
      } finally {
        (J = t), (Nu = !1);
      }
    }
    return null;
  }
  var En = [],
    xn = 0,
    Zr = null,
    Jr = 0,
    Ke = [],
    Ye = 0,
    qt = null,
    kt = 1,
    Et = "";
  function bt(e, t) {
    (En[xn++] = Jr), (En[xn++] = Zr), (Zr = e), (Jr = t);
  }
  function ts(e, t, n) {
    (Ke[Ye++] = kt), (Ke[Ye++] = Et), (Ke[Ye++] = qt), (qt = e);
    var r = kt;
    e = Et;
    var l = 32 - nt(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var u = 32 - nt(t) + l;
    if (30 < u) {
      var i = l - (l % 5);
      (u = (r & ((1 << i) - 1)).toString(32)),
        (r >>= i),
        (l -= i),
        (kt = (1 << (32 - nt(t) + l)) | (n << l) | r),
        (Et = u + e);
    } else (kt = (1 << u) | (n << l) | r), (Et = e);
  }
  function Pu(e) {
    e.return !== null && (bt(e, 1), ts(e, 1, 0));
  }
  function zu(e) {
    for (; e === Zr; ) (Zr = En[--xn]), (En[xn] = null), (Jr = En[--xn]), (En[xn] = null);
    for (; e === qt; )
      (qt = Ke[--Ye]), (Ke[Ye] = null), (Et = Ke[--Ye]), (Ke[Ye] = null), (kt = Ke[--Ye]), (Ke[Ye] = null);
  }
  var Be = null,
    We = null,
    ie = !1,
    lt = null;
  function ns(e, t) {
    var n = Je(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function rs(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
          t !== null ? ((e.stateNode = t), (Be = e), (We = Dt(t.firstChild)), !0) : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (Be = e), (We = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = qt !== null ? { id: kt, overflow: Et } : null),
              (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
              (n = Je(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Be = e),
              (We = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Tu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Lu(e) {
    if (ie) {
      var t = We;
      if (t) {
        var n = t;
        if (!rs(e, t)) {
          if (Tu(e)) throw Error(c(418));
          t = Dt(n.nextSibling);
          var r = Be;
          t && rs(e, t) ? ns(r, n) : ((e.flags = (e.flags & -4097) | 2), (ie = !1), (Be = e));
        }
      } else {
        if (Tu(e)) throw Error(c(418));
        (e.flags = (e.flags & -4097) | 2), (ie = !1), (Be = e);
      }
    }
  }
  function ls(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Be = e;
  }
  function qr(e) {
    if (e !== Be) return !1;
    if (!ie) return ls(e), (ie = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type), (t = t !== "head" && t !== "body" && !ku(e.type, e.memoizedProps))),
      t && (t = We))
    ) {
      if (Tu(e)) throw (us(), Error(c(418)));
      for (; t; ) ns(e, t), (t = Dt(t.nextSibling));
    }
    if ((ls(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                We = Dt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        We = null;
      }
    } else We = Be ? Dt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function us() {
    for (var e = We; e; ) e = Dt(e.nextSibling);
  }
  function Cn() {
    (We = Be = null), (ie = !1);
  }
  function Ru(e) {
    lt === null ? (lt = [e]) : lt.push(e);
  }
  var ff = xe.ReactCurrentBatchConfig;
  function ur(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(c(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(c(147, e));
        var l = r,
          u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u
          ? t.ref
          : ((t = function (i) {
              var o = l.refs;
              i === null ? delete o[u] : (o[u] = i);
            }),
            (t._stringRef = u),
            t);
      }
      if (typeof e != "string") throw Error(c(284));
      if (!n._owner) throw Error(c(290, e));
    }
    return e;
  }
  function br(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(c(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    );
  }
  function is(e) {
    var t = e._init;
    return t(e._payload);
  }
  function os(e) {
    function t(d, a) {
      if (e) {
        var m = d.deletions;
        m === null ? ((d.deletions = [a]), (d.flags |= 16)) : m.push(a);
      }
    }
    function n(d, a) {
      if (!e) return null;
      for (; a !== null; ) t(d, a), (a = a.sibling);
      return null;
    }
    function r(d, a) {
      for (d = new Map(); a !== null; ) a.key !== null ? d.set(a.key, a) : d.set(a.index, a), (a = a.sibling);
      return d;
    }
    function l(d, a) {
      return (d = Kt(d, a)), (d.index = 0), (d.sibling = null), d;
    }
    function u(d, a, m) {
      return (
        (d.index = m),
        e
          ? ((m = d.alternate), m !== null ? ((m = m.index), m < a ? ((d.flags |= 2), a) : m) : ((d.flags |= 2), a))
          : ((d.flags |= 1048576), a)
      );
    }
    function i(d) {
      return e && d.alternate === null && (d.flags |= 2), d;
    }
    function o(d, a, m, k) {
      return a === null || a.tag !== 6
        ? ((a = Ei(m, d.mode, k)), (a.return = d), a)
        : ((a = l(a, m)), (a.return = d), a);
    }
    function s(d, a, m, k) {
      var L = m.type;
      return L === Re
        ? w(d, a, m.props.children, k, m.key)
        : a !== null &&
            (a.elementType === L || (typeof L == "object" && L !== null && L.$$typeof === je && is(L) === a.type))
          ? ((k = l(a, m.props)), (k.ref = ur(d, a, m)), (k.return = d), k)
          : ((k = xl(m.type, m.key, m.props, null, d.mode, k)), (k.ref = ur(d, a, m)), (k.return = d), k);
    }
    function h(d, a, m, k) {
      return a === null ||
        a.tag !== 4 ||
        a.stateNode.containerInfo !== m.containerInfo ||
        a.stateNode.implementation !== m.implementation
        ? ((a = xi(m, d.mode, k)), (a.return = d), a)
        : ((a = l(a, m.children || [])), (a.return = d), a);
    }
    function w(d, a, m, k, L) {
      return a === null || a.tag !== 7
        ? ((a = sn(m, d.mode, k, L)), (a.return = d), a)
        : ((a = l(a, m)), (a.return = d), a);
    }
    function S(d, a, m) {
      if ((typeof a == "string" && a !== "") || typeof a == "number")
        return (a = Ei("" + a, d.mode, m)), (a.return = d), a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case et:
            return (m = xl(a.type, a.key, a.props, null, d.mode, m)), (m.ref = ur(d, null, a)), (m.return = d), m;
          case ze:
            return (a = xi(a, d.mode, m)), (a.return = d), a;
          case je:
            var k = a._init;
            return S(d, k(a._payload), m);
        }
        if (Mn(a) || O(a)) return (a = sn(a, d.mode, m, null)), (a.return = d), a;
        br(d, a);
      }
      return null;
    }
    function y(d, a, m, k) {
      var L = a !== null ? a.key : null;
      if ((typeof m == "string" && m !== "") || typeof m == "number") return L !== null ? null : o(d, a, "" + m, k);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case et:
            return m.key === L ? s(d, a, m, k) : null;
          case ze:
            return m.key === L ? h(d, a, m, k) : null;
          case je:
            return (L = m._init), y(d, a, L(m._payload), k);
        }
        if (Mn(m) || O(m)) return L !== null ? null : w(d, a, m, k, null);
        br(d, m);
      }
      return null;
    }
    function x(d, a, m, k, L) {
      if ((typeof k == "string" && k !== "") || typeof k == "number") return (d = d.get(m) || null), o(a, d, "" + k, L);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case et:
            return (d = d.get(k.key === null ? m : k.key) || null), s(a, d, k, L);
          case ze:
            return (d = d.get(k.key === null ? m : k.key) || null), h(a, d, k, L);
          case je:
            var R = k._init;
            return x(d, a, m, R(k._payload), L);
        }
        if (Mn(k) || O(k)) return (d = d.get(m) || null), w(a, d, k, L, null);
        br(a, k);
      }
      return null;
    }
    function P(d, a, m, k) {
      for (var L = null, R = null, j = a, F = (a = 0), Se = null; j !== null && F < m.length; F++) {
        j.index > F ? ((Se = j), (j = null)) : (Se = j.sibling);
        var K = y(d, j, m[F], k);
        if (K === null) {
          j === null && (j = Se);
          break;
        }
        e && j && K.alternate === null && t(d, j),
          (a = u(K, a, F)),
          R === null ? (L = K) : (R.sibling = K),
          (R = K),
          (j = Se);
      }
      if (F === m.length) return n(d, j), ie && bt(d, F), L;
      if (j === null) {
        for (; F < m.length; F++)
          (j = S(d, m[F], k)), j !== null && ((a = u(j, a, F)), R === null ? (L = j) : (R.sibling = j), (R = j));
        return ie && bt(d, F), L;
      }
      for (j = r(d, j); F < m.length; F++)
        (Se = x(j, d, F, m[F], k)),
          Se !== null &&
            (e && Se.alternate !== null && j.delete(Se.key === null ? F : Se.key),
            (a = u(Se, a, F)),
            R === null ? (L = Se) : (R.sibling = Se),
            (R = Se));
      return (
        e &&
          j.forEach(function (Yt) {
            return t(d, Yt);
          }),
        ie && bt(d, F),
        L
      );
    }
    function z(d, a, m, k) {
      var L = O(m);
      if (typeof L != "function") throw Error(c(150));
      if (((m = L.call(m)), m == null)) throw Error(c(151));
      for (var R = (L = null), j = a, F = (a = 0), Se = null, K = m.next(); j !== null && !K.done; F++, K = m.next()) {
        j.index > F ? ((Se = j), (j = null)) : (Se = j.sibling);
        var Yt = y(d, j, K.value, k);
        if (Yt === null) {
          j === null && (j = Se);
          break;
        }
        e && j && Yt.alternate === null && t(d, j),
          (a = u(Yt, a, F)),
          R === null ? (L = Yt) : (R.sibling = Yt),
          (R = Yt),
          (j = Se);
      }
      if (K.done) return n(d, j), ie && bt(d, F), L;
      if (j === null) {
        for (; !K.done; F++, K = m.next())
          (K = S(d, K.value, k)), K !== null && ((a = u(K, a, F)), R === null ? (L = K) : (R.sibling = K), (R = K));
        return ie && bt(d, F), L;
      }
      for (j = r(d, j); !K.done; F++, K = m.next())
        (K = x(j, d, F, K.value, k)),
          K !== null &&
            (e && K.alternate !== null && j.delete(K.key === null ? F : K.key),
            (a = u(K, a, F)),
            R === null ? (L = K) : (R.sibling = K),
            (R = K));
      return (
        e &&
          j.forEach(function ($f) {
            return t(d, $f);
          }),
        ie && bt(d, F),
        L
      );
    }
    function pe(d, a, m, k) {
      if (
        (typeof m == "object" && m !== null && m.type === Re && m.key === null && (m = m.props.children),
        typeof m == "object" && m !== null)
      ) {
        switch (m.$$typeof) {
          case et:
            e: {
              for (var L = m.key, R = a; R !== null; ) {
                if (R.key === L) {
                  if (((L = m.type), L === Re)) {
                    if (R.tag === 7) {
                      n(d, R.sibling), (a = l(R, m.props.children)), (a.return = d), (d = a);
                      break e;
                    }
                  } else if (
                    R.elementType === L ||
                    (typeof L == "object" && L !== null && L.$$typeof === je && is(L) === R.type)
                  ) {
                    n(d, R.sibling), (a = l(R, m.props)), (a.ref = ur(d, R, m)), (a.return = d), (d = a);
                    break e;
                  }
                  n(d, R);
                  break;
                } else t(d, R);
                R = R.sibling;
              }
              m.type === Re
                ? ((a = sn(m.props.children, d.mode, k, m.key)), (a.return = d), (d = a))
                : ((k = xl(m.type, m.key, m.props, null, d.mode, k)), (k.ref = ur(d, a, m)), (k.return = d), (d = k));
            }
            return i(d);
          case ze:
            e: {
              for (R = m.key; a !== null; ) {
                if (a.key === R)
                  if (
                    a.tag === 4 &&
                    a.stateNode.containerInfo === m.containerInfo &&
                    a.stateNode.implementation === m.implementation
                  ) {
                    n(d, a.sibling), (a = l(a, m.children || [])), (a.return = d), (d = a);
                    break e;
                  } else {
                    n(d, a);
                    break;
                  }
                else t(d, a);
                a = a.sibling;
              }
              (a = xi(m, d.mode, k)), (a.return = d), (d = a);
            }
            return i(d);
          case je:
            return (R = m._init), pe(d, a, R(m._payload), k);
        }
        if (Mn(m)) return P(d, a, m, k);
        if (O(m)) return z(d, a, m, k);
        br(d, m);
      }
      return (typeof m == "string" && m !== "") || typeof m == "number"
        ? ((m = "" + m),
          a !== null && a.tag === 6
            ? (n(d, a.sibling), (a = l(a, m)), (a.return = d), (d = a))
            : (n(d, a), (a = Ei(m, d.mode, k)), (a.return = d), (d = a)),
          i(d))
        : n(d, a);
    }
    return pe;
  }
  var _n = os(!0),
    ss = os(!1),
    el = It(null),
    tl = null,
    Nn = null,
    ju = null;
  function Ou() {
    ju = Nn = tl = null;
  }
  function Mu(e) {
    var t = el.current;
    le(el), (e._currentValue = t);
  }
  function Du(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Pn(e, t) {
    (tl = e),
      (ju = Nn = null),
      (e = e.dependencies),
      e !== null && e.firstContext !== null && (e.lanes & t && (De = !0), (e.firstContext = null));
  }
  function Ge(e) {
    var t = e._currentValue;
    if (ju !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Nn === null)) {
        if (tl === null) throw Error(c(308));
        (Nn = e), (tl.dependencies = { lanes: 0, firstContext: e });
      } else Nn = Nn.next = e;
    return t;
  }
  var en = null;
  function Iu(e) {
    en === null ? (en = [e]) : en.push(e);
  }
  function as(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? ((n.next = n), Iu(t)) : ((n.next = l.next), (l.next = n)), (t.interleaved = n), xt(e, r);
  }
  function xt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var Vt = !1;
  function Fu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function cs(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Ct(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function At(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), B & 2)) {
      var l = r.pending;
      return l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), xt(e, n);
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), Iu(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      xt(e, n)
    );
  }
  function nl(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), Jl(e, n);
    }
  }
  function fs(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        u = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var i = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          u === null ? (l = u = i) : (u = u.next = i), (n = n.next);
        } while (n !== null);
        u === null ? (l = u = t) : (u = u.next = t);
      } else l = u = t;
      (n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: u, shared: r.shared, effects: r.effects }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
  }
  function rl(e, t, n, r) {
    var l = e.updateQueue;
    Vt = !1;
    var u = l.firstBaseUpdate,
      i = l.lastBaseUpdate,
      o = l.shared.pending;
    if (o !== null) {
      l.shared.pending = null;
      var s = o,
        h = s.next;
      (s.next = null), i === null ? (u = h) : (i.next = h), (i = s);
      var w = e.alternate;
      w !== null &&
        ((w = w.updateQueue),
        (o = w.lastBaseUpdate),
        o !== i && (o === null ? (w.firstBaseUpdate = h) : (o.next = h), (w.lastBaseUpdate = s)));
    }
    if (u !== null) {
      var S = l.baseState;
      (i = 0), (w = h = s = null), (o = u);
      do {
        var y = o.lane,
          x = o.eventTime;
        if ((r & y) === y) {
          w !== null &&
            (w = w.next = { eventTime: x, lane: 0, tag: o.tag, payload: o.payload, callback: o.callback, next: null });
          e: {
            var P = e,
              z = o;
            switch (((y = t), (x = n), z.tag)) {
              case 1:
                if (((P = z.payload), typeof P == "function")) {
                  S = P.call(x, S, y);
                  break e;
                }
                S = P;
                break e;
              case 3:
                P.flags = (P.flags & -65537) | 128;
              case 0:
                if (((P = z.payload), (y = typeof P == "function" ? P.call(x, S, y) : P), y == null)) break e;
                S = N({}, S, y);
                break e;
              case 2:
                Vt = !0;
            }
          }
          o.callback !== null &&
            o.lane !== 0 &&
            ((e.flags |= 64), (y = l.effects), y === null ? (l.effects = [o]) : y.push(o));
        } else
          (x = { eventTime: x, lane: y, tag: o.tag, payload: o.payload, callback: o.callback, next: null }),
            w === null ? ((h = w = x), (s = S)) : (w = w.next = x),
            (i |= y);
        if (((o = o.next), o === null)) {
          if (((o = l.shared.pending), o === null)) break;
          (y = o), (o = y.next), (y.next = null), (l.lastBaseUpdate = y), (l.shared.pending = null);
        }
      } while (!0);
      if (
        (w === null && (s = S),
        (l.baseState = s),
        (l.firstBaseUpdate = h),
        (l.lastBaseUpdate = w),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do (i |= l.lane), (l = l.next);
        while (l !== t);
      } else u === null && (l.shared.lanes = 0);
      (rn |= i), (e.lanes = i), (e.memoizedState = S);
    }
  }
  function ds(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != "function")) throw Error(c(191, l));
          l.call(r);
        }
      }
  }
  var ir = {},
    mt = It(ir),
    or = It(ir),
    sr = It(ir);
  function tn(e) {
    if (e === ir) throw Error(c(174));
    return e;
  }
  function Uu(e, t) {
    switch ((ne(sr, t), ne(or, e), ne(mt, ir), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Vl(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Vl(t, e));
    }
    le(mt), ne(mt, t);
  }
  function zn() {
    le(mt), le(or), le(sr);
  }
  function ps(e) {
    tn(sr.current);
    var t = tn(mt.current),
      n = Vl(t, e.type);
    t !== n && (ne(or, e), ne(mt, n));
  }
  function Vu(e) {
    or.current === e && (le(mt), le(or));
  }
  var se = It(0);
  function ll(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var Au = [];
  function Hu() {
    for (var e = 0; e < Au.length; e++) Au[e]._workInProgressVersionPrimary = null;
    Au.length = 0;
  }
  var ul = xe.ReactCurrentDispatcher,
    Bu = xe.ReactCurrentBatchConfig,
    nn = 0,
    ae = null,
    ve = null,
    ge = null,
    il = !1,
    ar = !1,
    cr = 0,
    df = 0;
  function _e() {
    throw Error(c(321));
  }
  function Wu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!rt(e[n], t[n])) return !1;
    return !0;
  }
  function $u(e, t, n, r, l, u) {
    if (
      ((nn = u),
      (ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (ul.current = e === null || e.memoizedState === null ? vf : yf),
      (e = n(r, l)),
      ar)
    ) {
      u = 0;
      do {
        if (((ar = !1), (cr = 0), 25 <= u)) throw Error(c(301));
        (u += 1), (ge = ve = null), (t.updateQueue = null), (ul.current = gf), (e = n(r, l));
      } while (ar);
    }
    if (((ul.current = al), (t = ve !== null && ve.next !== null), (nn = 0), (ge = ve = ae = null), (il = !1), t))
      throw Error(c(300));
    return e;
  }
  function Qu() {
    var e = cr !== 0;
    return (cr = 0), e;
  }
  function ht() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ge === null ? (ae.memoizedState = ge = e) : (ge = ge.next = e), ge;
  }
  function Xe() {
    if (ve === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ve.next;
    var t = ge === null ? ae.memoizedState : ge.next;
    if (t !== null) (ge = t), (ve = e);
    else {
      if (e === null) throw Error(c(310));
      (ve = e),
        (e = {
          memoizedState: ve.memoizedState,
          baseState: ve.baseState,
          baseQueue: ve.baseQueue,
          queue: ve.queue,
          next: null,
        }),
        ge === null ? (ae.memoizedState = ge = e) : (ge = ge.next = e);
    }
    return ge;
  }
  function fr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ku(e) {
    var t = Xe(),
      n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var r = ve,
      l = r.baseQueue,
      u = n.pending;
    if (u !== null) {
      if (l !== null) {
        var i = l.next;
        (l.next = u.next), (u.next = i);
      }
      (r.baseQueue = l = u), (n.pending = null);
    }
    if (l !== null) {
      (u = l.next), (r = r.baseState);
      var o = (i = null),
        s = null,
        h = u;
      do {
        var w = h.lane;
        if ((nn & w) === w)
          s !== null &&
            (s = s.next =
              { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }),
            (r = h.hasEagerState ? h.eagerState : e(r, h.action));
        else {
          var S = { lane: w, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null };
          s === null ? ((o = s = S), (i = r)) : (s = s.next = S), (ae.lanes |= w), (rn |= w);
        }
        h = h.next;
      } while (h !== null && h !== u);
      s === null ? (i = r) : (s.next = o),
        rt(r, t.memoizedState) || (De = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do (u = l.lane), (ae.lanes |= u), (rn |= u), (l = l.next);
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Yu(e) {
    var t = Xe(),
      n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      u = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = (l = l.next);
      do (u = e(u, i.action)), (i = i.next);
      while (i !== l);
      rt(u, t.memoizedState) || (De = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (n.lastRenderedState = u);
    }
    return [u, r];
  }
  function ms() {}
  function hs(e, t) {
    var n = ae,
      r = Xe(),
      l = t(),
      u = !rt(r.memoizedState, l);
    if (
      (u && ((r.memoizedState = l), (De = !0)),
      (r = r.queue),
      Gu(gs.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || u || (ge !== null && ge.memoizedState.tag & 1))
    ) {
      if (((n.flags |= 2048), dr(9, ys.bind(null, n, r, l, t), void 0, null), we === null)) throw Error(c(349));
      nn & 30 || vs(n, t, l);
    }
    return l;
  }
  function vs(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ae.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), (ae.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function ys(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), ws(t) && Ss(e);
  }
  function gs(e, t, n) {
    return n(function () {
      ws(t) && Ss(e);
    });
  }
  function ws(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !rt(e, n);
    } catch {
      return !0;
    }
  }
  function Ss(e) {
    var t = xt(e, 1);
    t !== null && st(t, e, 1, -1);
  }
  function ks(e) {
    var t = ht();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = hf.bind(null, ae, e)),
      [t.memoizedState, e]
    );
  }
  function dr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = ae.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), (ae.updateQueue = t), (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Es() {
    return Xe().memoizedState;
  }
  function ol(e, t, n, r) {
    var l = ht();
    (ae.flags |= e), (l.memoizedState = dr(1 | t, n, void 0, r === void 0 ? null : r));
  }
  function sl(e, t, n, r) {
    var l = Xe();
    r = r === void 0 ? null : r;
    var u = void 0;
    if (ve !== null) {
      var i = ve.memoizedState;
      if (((u = i.destroy), r !== null && Wu(r, i.deps))) {
        l.memoizedState = dr(t, n, u, r);
        return;
      }
    }
    (ae.flags |= e), (l.memoizedState = dr(1 | t, n, u, r));
  }
  function xs(e, t) {
    return ol(8390656, 8, e, t);
  }
  function Gu(e, t) {
    return sl(2048, 8, e, t);
  }
  function Cs(e, t) {
    return sl(4, 2, e, t);
  }
  function _s(e, t) {
    return sl(4, 4, e, t);
  }
  function Ns(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Ps(e, t, n) {
    return (n = n != null ? n.concat([e]) : null), sl(4, 4, Ns.bind(null, t, e), n);
  }
  function Xu() {}
  function zs(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Wu(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Ts(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Wu(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Ls(e, t, n) {
    return nn & 21
      ? (rt(n, t) || ((n = uo()), (ae.lanes |= n), (rn |= n), (e.baseState = !0)), t)
      : (e.baseState && ((e.baseState = !1), (De = !0)), (e.memoizedState = n));
  }
  function pf(e, t) {
    var n = J;
    (J = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Bu.transition;
    Bu.transition = {};
    try {
      e(!1), t();
    } finally {
      (J = n), (Bu.transition = r);
    }
  }
  function Rs() {
    return Xe().memoizedState;
  }
  function mf(e, t, n) {
    var r = $t(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), js(e))) Os(t, n);
    else if (((n = as(e, t, n, r)), n !== null)) {
      var l = Le();
      st(n, e, r, l), Ms(n, t, r);
    }
  }
  function hf(e, t, n) {
    var r = $t(e),
      l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (js(e)) Os(t, l);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && ((u = t.lastRenderedReducer), u !== null))
        try {
          var i = t.lastRenderedState,
            o = u(i, n);
          if (((l.hasEagerState = !0), (l.eagerState = o), rt(o, i))) {
            var s = t.interleaved;
            s === null ? ((l.next = l), Iu(t)) : ((l.next = s.next), (s.next = l)), (t.interleaved = l);
            return;
          }
        } catch {
        } finally {
        }
      (n = as(e, t, l, r)), n !== null && ((l = Le()), st(n, e, r, l), Ms(n, t, r));
    }
  }
  function js(e) {
    var t = e.alternate;
    return e === ae || (t !== null && t === ae);
  }
  function Os(e, t) {
    ar = il = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
  }
  function Ms(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), Jl(e, n);
    }
  }
  var al = {
      readContext: Ge,
      useCallback: _e,
      useContext: _e,
      useEffect: _e,
      useImperativeHandle: _e,
      useInsertionEffect: _e,
      useLayoutEffect: _e,
      useMemo: _e,
      useReducer: _e,
      useRef: _e,
      useState: _e,
      useDebugValue: _e,
      useDeferredValue: _e,
      useTransition: _e,
      useMutableSource: _e,
      useSyncExternalStore: _e,
      useId: _e,
      unstable_isNewReconciler: !1,
    },
    vf = {
      readContext: Ge,
      useCallback: function (e, t) {
        return (ht().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ge,
      useEffect: xs,
      useImperativeHandle: function (e, t, n) {
        return (n = n != null ? n.concat([e]) : null), ol(4194308, 4, Ns.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return ol(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return ol(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = ht();
        return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
      },
      useReducer: function (e, t, n) {
        var r = ht();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = mf.bind(null, ae, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ht();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: ks,
      useDebugValue: Xu,
      useDeferredValue: function (e) {
        return (ht().memoizedState = e);
      },
      useTransition: function () {
        var e = ks(!1),
          t = e[0];
        return (e = pf.bind(null, e[1])), (ht().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = ae,
          l = ht();
        if (ie) {
          if (n === void 0) throw Error(c(407));
          n = n();
        } else {
          if (((n = t()), we === null)) throw Error(c(349));
          nn & 30 || vs(r, t, n);
        }
        l.memoizedState = n;
        var u = { value: n, getSnapshot: t };
        return (
          (l.queue = u),
          xs(gs.bind(null, r, u, e), [e]),
          (r.flags |= 2048),
          dr(9, ys.bind(null, r, u, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = ht(),
          t = we.identifierPrefix;
        if (ie) {
          var n = Et,
            r = kt;
          (n = (r & ~(1 << (32 - nt(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = cr++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":");
        } else (n = df++), (t = ":" + t + "r" + n.toString(32) + ":");
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    yf = {
      readContext: Ge,
      useCallback: zs,
      useContext: Ge,
      useEffect: Gu,
      useImperativeHandle: Ps,
      useInsertionEffect: Cs,
      useLayoutEffect: _s,
      useMemo: Ts,
      useReducer: Ku,
      useRef: Es,
      useState: function () {
        return Ku(fr);
      },
      useDebugValue: Xu,
      useDeferredValue: function (e) {
        var t = Xe();
        return Ls(t, ve.memoizedState, e);
      },
      useTransition: function () {
        var e = Ku(fr)[0],
          t = Xe().memoizedState;
        return [e, t];
      },
      useMutableSource: ms,
      useSyncExternalStore: hs,
      useId: Rs,
      unstable_isNewReconciler: !1,
    },
    gf = {
      readContext: Ge,
      useCallback: zs,
      useContext: Ge,
      useEffect: Gu,
      useImperativeHandle: Ps,
      useInsertionEffect: Cs,
      useLayoutEffect: _s,
      useMemo: Ts,
      useReducer: Yu,
      useRef: Es,
      useState: function () {
        return Yu(fr);
      },
      useDebugValue: Xu,
      useDeferredValue: function (e) {
        var t = Xe();
        return ve === null ? (t.memoizedState = e) : Ls(t, ve.memoizedState, e);
      },
      useTransition: function () {
        var e = Yu(fr)[0],
          t = Xe().memoizedState;
        return [e, t];
      },
      useMutableSource: ms,
      useSyncExternalStore: hs,
      useId: Rs,
      unstable_isNewReconciler: !1,
    };
  function ut(e, t) {
    if (e && e.defaultProps) {
      (t = N({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Zu(e, t, n, r) {
    (t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : N({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var cl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Xt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = Le(),
        l = $t(e),
        u = Ct(r, l);
      (u.payload = t), n != null && (u.callback = n), (t = At(e, u, l)), t !== null && (st(t, e, l, r), nl(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Le(),
        l = $t(e),
        u = Ct(r, l);
      (u.tag = 1),
        (u.payload = t),
        n != null && (u.callback = n),
        (t = At(e, u, l)),
        t !== null && (st(t, e, l, r), nl(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Le(),
        r = $t(e),
        l = Ct(n, r);
      (l.tag = 2), t != null && (l.callback = t), (t = At(e, l, r)), t !== null && (st(t, e, r, n), nl(t, e, r));
    },
  };
  function Ds(e, t, n, r, l, u, i) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, u, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !qn(n, r) || !qn(l, u)
          : !0
    );
  }
  function Is(e, t, n) {
    var r = !1,
      l = Ft,
      u = t.contextType;
    return (
      typeof u == "object" && u !== null
        ? (u = Ge(u))
        : ((l = Me(t) ? Jt : Ce.current), (r = t.contextTypes), (u = (r = r != null) ? kn(e, l) : Ft)),
      (t = new t(n, u)),
      (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = cl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      t
    );
  }
  function Fs(e, t, n, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && cl.enqueueReplaceState(t, t.state, null);
  }
  function Ju(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Fu(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? (l.context = Ge(u)) : ((u = Me(t) ? Jt : Ce.current), (l.context = kn(e, u))),
      (l.state = e.memoizedState),
      (u = t.getDerivedStateFromProps),
      typeof u == "function" && (Zu(e, t, u, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function") ||
        ((t = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
        t !== l.state && cl.enqueueReplaceState(l, l.state, null),
        rl(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Tn(e, t) {
    try {
      var n = "",
        r = t;
      do (n += $(r)), (r = r.return);
      while (r);
      var l = n;
    } catch (u) {
      l =
        `
Error generating stack: ` +
        u.message +
        `
` +
        u.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function qu(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function bu(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var wf = typeof WeakMap == "function" ? WeakMap : Map;
  function Us(e, t, n) {
    (n = Ct(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        yl || ((yl = !0), (mi = r)), bu(e, t);
      }),
      n
    );
  }
  function Vs(e, t, n) {
    (n = Ct(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      (n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          bu(e, t);
        });
    }
    var u = e.stateNode;
    return (
      u !== null &&
        typeof u.componentDidCatch == "function" &&
        (n.callback = function () {
          bu(e, t), typeof r != "function" && (Bt === null ? (Bt = new Set([this])) : Bt.add(this));
          var i = t.stack;
          this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
        }),
      n
    );
  }
  function As(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new wf();
      var l = new Set();
      r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = Of.bind(null, e, t, n)), t.then(e, e));
  }
  function Hs(e) {
    do {
      var t;
      if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Bs(e, t, n, r, l) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = l), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = Ct(-1, 1)), (t.tag = 2), At(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var Sf = xe.ReactCurrentOwner,
    De = !1;
  function Te(e, t, n, r) {
    t.child = e === null ? ss(t, null, n, r) : _n(t, e.child, n, r);
  }
  function Ws(e, t, n, r, l) {
    n = n.render;
    var u = t.ref;
    return (
      Pn(t, l),
      (r = $u(e, t, n, r, u, l)),
      (n = Qu()),
      e !== null && !De
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
        : (ie && n && Pu(t), (t.flags |= 1), Te(e, t, r, l), t.child)
    );
  }
  function $s(e, t, n, r, l) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" &&
        !ki(u) &&
        u.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = u), Qs(e, t, u, r, l))
        : ((e = xl(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !(e.lanes & l))) {
      var i = u.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : qn), n(i, r) && e.ref === t.ref)) return _t(e, t, l);
    }
    return (t.flags |= 1), (e = Kt(u, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
  }
  function Qs(e, t, n, r, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (qn(u, r) && e.ref === t.ref)
        if (((De = !1), (t.pendingProps = r = u), (e.lanes & l) !== 0)) e.flags & 131072 && (De = !0);
        else return (t.lanes = e.lanes), _t(e, t, l);
    }
    return ei(e, t, n, r, l);
  }
  function Ks(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      u = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), ne(Rn, $e), ($e |= n);
      else {
        if (!(n & 1073741824))
          return (
            (e = u !== null ? u.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
            (t.updateQueue = null),
            ne(Rn, $e),
            ($e |= e),
            null
          );
        (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (r = u !== null ? u.baseLanes : n),
          ne(Rn, $e),
          ($e |= r);
      }
    else u !== null ? ((r = u.baseLanes | n), (t.memoizedState = null)) : (r = n), ne(Rn, $e), ($e |= r);
    return Te(e, t, l, n), t.child;
  }
  function Ys(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
  }
  function ei(e, t, n, r, l) {
    var u = Me(n) ? Jt : Ce.current;
    return (
      (u = kn(t, u)),
      Pn(t, l),
      (n = $u(e, t, n, r, u, l)),
      (r = Qu()),
      e !== null && !De
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
        : (ie && r && Pu(t), (t.flags |= 1), Te(e, t, n, l), t.child)
    );
  }
  function Gs(e, t, n, r, l) {
    if (Me(n)) {
      var u = !0;
      Gr(t);
    } else u = !1;
    if ((Pn(t, l), t.stateNode === null)) dl(e, t), Is(t, n, r), Ju(t, n, r, l), (r = !0);
    else if (e === null) {
      var i = t.stateNode,
        o = t.memoizedProps;
      i.props = o;
      var s = i.context,
        h = n.contextType;
      typeof h == "object" && h !== null ? (h = Ge(h)) : ((h = Me(n) ? Jt : Ce.current), (h = kn(t, h)));
      var w = n.getDerivedStateFromProps,
        S = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      S ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
        ((o !== r || s !== h) && Fs(t, i, r, h)),
        (Vt = !1);
      var y = t.memoizedState;
      (i.state = y),
        rl(t, r, i, l),
        (s = t.memoizedState),
        o !== r || y !== s || Oe.current || Vt
          ? (typeof w == "function" && (Zu(t, n, w, r), (s = t.memoizedState)),
            (o = Vt || Ds(t, n, o, r, y, s, h))
              ? (S ||
                  (typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function") ||
                  (typeof i.componentWillMount == "function" && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == "function" && (t.flags |= 4194308))
              : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = s)),
            (i.props = r),
            (i.state = s),
            (i.context = h),
            (r = o))
          : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), (r = !1));
    } else {
      (i = t.stateNode),
        cs(e, t),
        (o = t.memoizedProps),
        (h = t.type === t.elementType ? o : ut(t.type, o)),
        (i.props = h),
        (S = t.pendingProps),
        (y = i.context),
        (s = n.contextType),
        typeof s == "object" && s !== null ? (s = Ge(s)) : ((s = Me(n) ? Jt : Ce.current), (s = kn(t, s)));
      var x = n.getDerivedStateFromProps;
      (w = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
        ((o !== S || y !== s) && Fs(t, i, r, s)),
        (Vt = !1),
        (y = t.memoizedState),
        (i.state = y),
        rl(t, r, i, l);
      var P = t.memoizedState;
      o !== S || y !== P || Oe.current || Vt
        ? (typeof x == "function" && (Zu(t, n, x, r), (P = t.memoizedState)),
          (h = Vt || Ds(t, n, h, r, y, P, s) || !1)
            ? (w ||
                (typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function") ||
                (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, P, s),
                typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, P, s)),
              typeof i.componentDidUpdate == "function" && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != "function" ||
                (o === e.memoizedProps && y === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                (o === e.memoizedProps && y === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = P)),
          (i.props = r),
          (i.state = P),
          (i.context = s),
          (r = h))
        : (typeof i.componentDidUpdate != "function" ||
            (o === e.memoizedProps && y === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != "function" ||
            (o === e.memoizedProps && y === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return ti(e, t, n, r, u, l);
  }
  function ti(e, t, n, r, l, u) {
    Ys(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && bo(t, n, !1), _t(e, t, u);
    (r = t.stateNode), (Sf.current = t);
    var o = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && i ? ((t.child = _n(t, e.child, null, u)), (t.child = _n(t, null, o, u))) : Te(e, t, o, u),
      (t.memoizedState = r.state),
      l && bo(t, n, !0),
      t.child
    );
  }
  function Xs(e) {
    var t = e.stateNode;
    t.pendingContext ? Jo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Jo(e, t.context, !1),
      Uu(e, t.containerInfo);
  }
  function Zs(e, t, n, r, l) {
    return Cn(), Ru(l), (t.flags |= 256), Te(e, t, n, r), t.child;
  }
  var ni = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ri(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Js(e, t, n) {
    var r = t.pendingProps,
      l = se.current,
      u = !1,
      i = (t.flags & 128) !== 0,
      o;
    if (
      ((o = i) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      o ? ((u = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
      ne(se, l & 1),
      e === null)
    )
      return (
        Lu(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
          : ((i = r.children),
            (e = r.fallback),
            u
              ? ((r = t.mode),
                (u = t.child),
                (i = { mode: "hidden", children: i }),
                !(r & 1) && u !== null ? ((u.childLanes = 0), (u.pendingProps = i)) : (u = Cl(i, r, 0, null)),
                (e = sn(e, r, n, null)),
                (u.return = t),
                (e.return = t),
                (u.sibling = e),
                (t.child = u),
                (t.child.memoizedState = ri(n)),
                (t.memoizedState = ni),
                e)
              : li(t, i))
      );
    if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null))) return kf(e, t, i, r, o, l, n);
    if (u) {
      (u = r.fallback), (i = t.mode), (l = e.child), (o = l.sibling);
      var s = { mode: "hidden", children: r.children };
      return (
        !(i & 1) && t.child !== l
          ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
          : ((r = Kt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        o !== null ? (u = Kt(o, u)) : ((u = sn(u, i, n, null)), (u.flags |= 2)),
        (u.return = t),
        (r.return = t),
        (r.sibling = u),
        (t.child = r),
        (r = u),
        (u = t.child),
        (i = e.child.memoizedState),
        (i = i === null ? ri(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
        (u.memoizedState = i),
        (u.childLanes = e.childLanes & ~n),
        (t.memoizedState = ni),
        r
      );
    }
    return (
      (u = e.child),
      (e = u.sibling),
      (r = Kt(u, { mode: "visible", children: r.children })),
      !(t.mode & 1) && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function li(e, t) {
    return (t = Cl({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
  }
  function fl(e, t, n, r) {
    return (
      r !== null && Ru(r),
      _n(t, e.child, null, n),
      (e = li(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function kf(e, t, n, r, l, u, i) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = qu(Error(c(422)))), fl(e, t, i, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((u = r.fallback),
            (l = t.mode),
            (r = Cl({ mode: "visible", children: r.children }, l, 0, null)),
            (u = sn(u, l, i, null)),
            (u.flags |= 2),
            (r.return = t),
            (u.return = t),
            (r.sibling = u),
            (t.child = r),
            t.mode & 1 && _n(t, e.child, null, i),
            (t.child.memoizedState = ri(i)),
            (t.memoizedState = ni),
            u);
    if (!(t.mode & 1)) return fl(e, t, i, null);
    if (l.data === "$!") {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
      return (r = o), (u = Error(c(419))), (r = qu(u, r, void 0)), fl(e, t, i, r);
    }
    if (((o = (i & e.childLanes) !== 0), De || o)) {
      if (((r = we), r !== null)) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        (l = l & (r.suspendedLanes | i) ? 0 : l),
          l !== 0 && l !== u.retryLane && ((u.retryLane = l), xt(e, l), st(r, e, l, -1));
      }
      return Si(), (r = qu(Error(c(421)))), fl(e, t, i, r);
    }
    return l.data === "$?"
      ? ((t.flags |= 128), (t.child = e.child), (t = Mf.bind(null, e)), (l._reactRetry = t), null)
      : ((e = u.treeContext),
        (We = Dt(l.nextSibling)),
        (Be = t),
        (ie = !0),
        (lt = null),
        e !== null && ((Ke[Ye++] = kt), (Ke[Ye++] = Et), (Ke[Ye++] = qt), (kt = e.id), (Et = e.overflow), (qt = t)),
        (t = li(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function qs(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Du(e.return, t, n);
  }
  function ui(e, t, n, r, l) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = r),
        (u.tail = n),
        (u.tailMode = l));
  }
  function bs(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      u = r.tail;
    if ((Te(e, t, r.children, n), (r = se.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && qs(e, n, t);
          else if (e.tag === 19) qs(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((ne(se, r), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (l) {
        case "forwards":
          for (n = t.child, l = null; n !== null; )
            (e = n.alternate), e !== null && ll(e) === null && (l = n), (n = n.sibling);
          (n = l),
            n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)),
            ui(t, !1, l, n, u);
          break;
        case "backwards":
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && ll(e) === null)) {
              t.child = l;
              break;
            }
            (e = l.sibling), (l.sibling = n), (n = l), (l = e);
          }
          ui(t, !0, n, null, u);
          break;
        case "together":
          ui(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function dl(e, t) {
    !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function _t(e, t, n) {
    if ((e !== null && (t.dependencies = e.dependencies), (rn |= t.lanes), !(n & t.childLanes))) return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        (e = e.sibling), (n = n.sibling = Kt(e, e.pendingProps)), (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Ef(e, t, n) {
    switch (t.tag) {
      case 3:
        Xs(t), Cn();
        break;
      case 5:
        ps(t);
        break;
      case 1:
        Me(t.type) && Gr(t);
        break;
      case 4:
        Uu(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        ne(el, r._currentValue), (r._currentValue = l);
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (ne(se, se.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? Js(e, t, n)
              : (ne(se, se.current & 1), (e = _t(e, t, n)), e !== null ? e.sibling : null);
        ne(se, se.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (r) return bs(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          ne(se, se.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Ks(e, t, n);
    }
    return _t(e, t, n);
  }
  var ea, ii, ta, na;
  (ea = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (ii = function () {}),
    (ta = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        (e = t.stateNode), tn(mt.current);
        var u = null;
        switch (n) {
          case "input":
            (l = Dl(e, l)), (r = Dl(e, r)), (u = []);
            break;
          case "select":
            (l = N({}, l, { value: void 0 })), (r = N({}, r, { value: void 0 })), (u = []);
            break;
          case "textarea":
            (l = Ul(e, l)), (r = Ul(e, r)), (u = []);
            break;
          default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr);
        }
        Al(n, r);
        var i;
        n = null;
        for (h in l)
          if (!r.hasOwnProperty(h) && l.hasOwnProperty(h) && l[h] != null)
            if (h === "style") {
              var o = l[h];
              for (i in o) o.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
            } else
              h !== "dangerouslySetInnerHTML" &&
                h !== "children" &&
                h !== "suppressContentEditableWarning" &&
                h !== "suppressHydrationWarning" &&
                h !== "autoFocus" &&
                (T.hasOwnProperty(h) ? u || (u = []) : (u = u || []).push(h, null));
        for (h in r) {
          var s = r[h];
          if (((o = l != null ? l[h] : void 0), r.hasOwnProperty(h) && s !== o && (s != null || o != null)))
            if (h === "style")
              if (o) {
                for (i in o) !o.hasOwnProperty(i) || (s && s.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ""));
                for (i in s) s.hasOwnProperty(i) && o[i] !== s[i] && (n || (n = {}), (n[i] = s[i]));
              } else n || (u || (u = []), u.push(h, n)), (n = s);
            else
              h === "dangerouslySetInnerHTML"
                ? ((s = s ? s.__html : void 0),
                  (o = o ? o.__html : void 0),
                  s != null && o !== s && (u = u || []).push(h, s))
                : h === "children"
                  ? (typeof s != "string" && typeof s != "number") || (u = u || []).push(h, "" + s)
                  : h !== "suppressContentEditableWarning" &&
                    h !== "suppressHydrationWarning" &&
                    (T.hasOwnProperty(h)
                      ? (s != null && h === "onScroll" && re("scroll", e), u || o === s || (u = []))
                      : (u = u || []).push(h, s));
        }
        n && (u = u || []).push("style", n);
        var h = u;
        (t.updateQueue = h) && (t.flags |= 4);
      }
    }),
    (na = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    });
  function pr(e, t) {
    if (!ie)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
          r === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
      }
  }
  function Ne(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling);
    else
      for (l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes), (r |= l.subtreeFlags), (r |= l.flags), (l.return = e), (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
  }
  function xf(e, t, n) {
    var r = t.pendingProps;
    switch ((zu(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ne(t), null;
      case 1:
        return Me(t.type) && Yr(), Ne(t), null;
      case 3:
        return (
          (r = t.stateNode),
          zn(),
          le(Oe),
          le(Ce),
          Hu(),
          r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (qr(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), lt !== null && (yi(lt), (lt = null)))),
          ii(e, t),
          Ne(t),
          null
        );
      case 5:
        Vu(t);
        var l = tn(sr.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          ta(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(c(166));
            return Ne(t), null;
          }
          if (((e = tn(mt.current)), qr(t))) {
            (r = t.stateNode), (n = t.type);
            var u = t.memoizedProps;
            switch (((r[pt] = t), (r[rr] = u), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                re("cancel", r), re("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < er.length; l++) re(er[l], r);
                break;
              case "source":
                re("error", r);
                break;
              case "img":
              case "image":
              case "link":
                re("error", r), re("load", r);
                break;
              case "details":
                re("toggle", r);
                break;
              case "input":
                Di(r, u), re("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!u.multiple }), re("invalid", r);
                break;
              case "textarea":
                Ui(r, u), re("invalid", r);
            }
            Al(n, u), (l = null);
            for (var i in u)
              if (u.hasOwnProperty(i)) {
                var o = u[i];
                i === "children"
                  ? typeof o == "string"
                    ? r.textContent !== o &&
                      (u.suppressHydrationWarning !== !0 && $r(r.textContent, o, e), (l = ["children", o]))
                    : typeof o == "number" &&
                      r.textContent !== "" + o &&
                      (u.suppressHydrationWarning !== !0 && $r(r.textContent, o, e), (l = ["children", "" + o]))
                  : T.hasOwnProperty(i) && o != null && i === "onScroll" && re("scroll", r);
              }
            switch (n) {
              case "input":
                kr(r), Fi(r, u, !0);
                break;
              case "textarea":
                kr(r), Ai(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (r.onclick = Qr);
            }
            (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
          } else {
            (i = l.nodeType === 9 ? l : l.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Hi(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = i.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = i.createElement(n, { is: r.is }))
                    : ((e = i.createElement(n)),
                      n === "select" && ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
                : (e = i.createElementNS(e, n)),
              (e[pt] = t),
              (e[rr] = r),
              ea(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((i = Hl(n, r)), n)) {
                case "dialog":
                  re("cancel", e), re("close", e), (l = r);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  re("load", e), (l = r);
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < er.length; l++) re(er[l], e);
                  l = r;
                  break;
                case "source":
                  re("error", e), (l = r);
                  break;
                case "img":
                case "image":
                case "link":
                  re("error", e), re("load", e), (l = r);
                  break;
                case "details":
                  re("toggle", e), (l = r);
                  break;
                case "input":
                  Di(e, r), (l = Dl(e, r)), re("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = N({}, r, { value: void 0 })),
                    re("invalid", e);
                  break;
                case "textarea":
                  Ui(e, r), (l = Ul(e, r)), re("invalid", e);
                  break;
                default:
                  l = r;
              }
              Al(n, l), (o = l);
              for (u in o)
                if (o.hasOwnProperty(u)) {
                  var s = o[u];
                  u === "style"
                    ? $i(e, s)
                    : u === "dangerouslySetInnerHTML"
                      ? ((s = s ? s.__html : void 0), s != null && Bi(e, s))
                      : u === "children"
                        ? typeof s == "string"
                          ? (n !== "textarea" || s !== "") && Dn(e, s)
                          : typeof s == "number" && Dn(e, "" + s)
                        : u !== "suppressContentEditableWarning" &&
                          u !== "suppressHydrationWarning" &&
                          u !== "autoFocus" &&
                          (T.hasOwnProperty(u)
                            ? s != null && u === "onScroll" && re("scroll", e)
                            : s != null && be(e, u, s, i));
                }
              switch (n) {
                case "input":
                  kr(e), Fi(e, r, !1);
                  break;
                case "textarea":
                  kr(e), Ai(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + Z(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    (u = r.value),
                    u != null
                      ? an(e, !!r.multiple, u, !1)
                      : r.defaultValue != null && an(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Qr);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return Ne(t), null;
      case 6:
        if (e && t.stateNode != null) na(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(c(166));
          if (((n = tn(sr.current)), tn(mt.current), qr(t))) {
            if (
              ((r = t.stateNode), (n = t.memoizedProps), (r[pt] = t), (u = r.nodeValue !== n) && ((e = Be), e !== null))
            )
              switch (e.tag) {
                case 3:
                  $r(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 && $r(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            u && (t.flags |= 4);
          } else (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[pt] = t), (t.stateNode = r);
        }
        return Ne(t), null;
      case 13:
        if (
          (le(se),
          (r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ie && We !== null && t.mode & 1 && !(t.flags & 128)) us(), Cn(), (t.flags |= 98560), (u = !1);
          else if (((u = qr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(c(318));
              if (((u = t.memoizedState), (u = u !== null ? u.dehydrated : null), !u)) throw Error(c(317));
              u[pt] = t;
            } else Cn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
            Ne(t), (u = !1);
          } else lt !== null && (yi(lt), (lt = null)), (u = !0);
          if (!u) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192), t.mode & 1 && (e === null || se.current & 1 ? ye === 0 && (ye = 3) : Si())),
            t.updateQueue !== null && (t.flags |= 4),
            Ne(t),
            null);
      case 4:
        return zn(), ii(e, t), e === null && tr(t.stateNode.containerInfo), Ne(t), null;
      case 10:
        return Mu(t.type._context), Ne(t), null;
      case 17:
        return Me(t.type) && Yr(), Ne(t), null;
      case 19:
        if ((le(se), (u = t.memoizedState), u === null)) return Ne(t), null;
        if (((r = (t.flags & 128) !== 0), (i = u.rendering), i === null))
          if (r) pr(u, !1);
          else {
            if (ye !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((i = ll(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      pr(u, !1),
                      r = i.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;

                  )
                    (u = n),
                      (e = r),
                      (u.flags &= 14680066),
                      (i = u.alternate),
                      i === null
                        ? ((u.childLanes = 0),
                          (u.lanes = e),
                          (u.child = null),
                          (u.subtreeFlags = 0),
                          (u.memoizedProps = null),
                          (u.memoizedState = null),
                          (u.updateQueue = null),
                          (u.dependencies = null),
                          (u.stateNode = null))
                        : ((u.childLanes = i.childLanes),
                          (u.lanes = i.lanes),
                          (u.child = i.child),
                          (u.subtreeFlags = 0),
                          (u.deletions = null),
                          (u.memoizedProps = i.memoizedProps),
                          (u.memoizedState = i.memoizedState),
                          (u.updateQueue = i.updateQueue),
                          (u.type = i.type),
                          (e = i.dependencies),
                          (u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                      (n = n.sibling);
                  return ne(se, (se.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null && de() > jn && ((t.flags |= 128), (r = !0), pr(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = ll(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                pr(u, !0),
                u.tail === null && u.tailMode === "hidden" && !i.alternate && !ie)
              )
                return Ne(t), null;
            } else
              2 * de() - u.renderingStartTime > jn &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), pr(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((n = u.last), n !== null ? (n.sibling = i) : (t.child = i), (u.last = i));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = de()),
            (t.sibling = null),
            (n = se.current),
            ne(se, r ? (n & 1) | 2 : n & 1),
            t)
          : (Ne(t), null);
      case 22:
      case 23:
        return (
          wi(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && t.mode & 1 ? $e & 1073741824 && (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ne(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Cf(e, t) {
    switch ((zu(t), t.tag)) {
      case 1:
        return Me(t.type) && Yr(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
      case 3:
        return (
          zn(),
          le(Oe),
          le(Ce),
          Hu(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return Vu(t), null;
      case 13:
        if ((le(se), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(c(340));
          Cn();
        }
        return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
      case 19:
        return le(se), null;
      case 4:
        return zn(), null;
      case 10:
        return Mu(t.type._context), null;
      case 22:
      case 23:
        return wi(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var pl = !1,
    Pe = !1,
    _f = typeof WeakSet == "function" ? WeakSet : Set,
    _ = null;
  function Ln(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          fe(e, t, r);
        }
      else n.current = null;
  }
  function oi(e, t, n) {
    try {
      n();
    } catch (r) {
      fe(e, t, r);
    }
  }
  var ra = !1;
  function Nf(e, t) {
    if (((wu = Or), (e = Do()), fu(e))) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              u = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break e;
            }
            var i = 0,
              o = -1,
              s = -1,
              h = 0,
              w = 0,
              S = e,
              y = null;
            t: for (;;) {
              for (
                var x;
                S !== n || (l !== 0 && S.nodeType !== 3) || (o = i + l),
                  S !== u || (r !== 0 && S.nodeType !== 3) || (s = i + r),
                  S.nodeType === 3 && (i += S.nodeValue.length),
                  (x = S.firstChild) !== null;

              )
                (y = S), (S = x);
              for (;;) {
                if (S === e) break t;
                if ((y === n && ++h === l && (o = i), y === u && ++w === r && (s = i), (x = S.nextSibling) !== null))
                  break;
                (S = y), (y = S.parentNode);
              }
              S = x;
            }
            n = o === -1 || s === -1 ? null : { start: o, end: s };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Su = { focusedElem: e, selectionRange: n }, Or = !1, _ = t; _ !== null; )
      if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) (e.return = t), (_ = e);
      else
        for (; _ !== null; ) {
          t = _;
          try {
            var P = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (P !== null) {
                    var z = P.memoizedProps,
                      pe = P.memoizedState,
                      d = t.stateNode,
                      a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? z : ut(t.type, z), pe);
                    d.__reactInternalSnapshotBeforeUpdate = a;
                  }
                  break;
                case 3:
                  var m = t.stateNode.containerInfo;
                  m.nodeType === 1
                    ? (m.textContent = "")
                    : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(c(163));
              }
          } catch (k) {
            fe(t, t.return, k);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (_ = e);
            break;
          }
          _ = t.return;
        }
    return (P = ra), (ra = !1), P;
  }
  function mr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          (l.destroy = void 0), u !== void 0 && oi(t, n, u);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function ml(e, t) {
    if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function si(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function la(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), la(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode), t !== null && (delete t[pt], delete t[rr], delete t[Cu], delete t[sf], delete t[af])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function ua(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ia(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ua(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ai(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Qr));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (ai(e, t, n), e = e.sibling; e !== null; ) ai(e, t, n), (e = e.sibling);
  }
  function ci(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
      for (ci(e, t, n), e = e.sibling; e !== null; ) ci(e, t, n), (e = e.sibling);
  }
  var ke = null,
    it = !1;
  function Ht(e, t, n) {
    for (n = n.child; n !== null; ) oa(e, t, n), (n = n.sibling);
  }
  function oa(e, t, n) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(Pr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Pe || Ln(n, t);
      case 6:
        var r = ke,
          l = it;
        (ke = null),
          Ht(e, t, n),
          (ke = r),
          (it = l),
          ke !== null &&
            (it
              ? ((e = ke), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
              : ke.removeChild(n.stateNode));
        break;
      case 18:
        ke !== null &&
          (it
            ? ((e = ke),
              (n = n.stateNode),
              e.nodeType === 8 ? xu(e.parentNode, n) : e.nodeType === 1 && xu(e, n),
              Kn(e))
            : xu(ke, n.stateNode));
        break;
      case 4:
        (r = ke), (l = it), (ke = n.stateNode.containerInfo), (it = !0), Ht(e, t, n), (ke = r), (it = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Pe && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
          l = r = r.next;
          do {
            var u = l,
              i = u.destroy;
            (u = u.tag), i !== void 0 && (u & 2 || u & 4) && oi(n, t, i), (l = l.next);
          } while (l !== r);
        }
        Ht(e, t, n);
        break;
      case 1:
        if (!Pe && (Ln(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
          try {
            (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
          } catch (o) {
            fe(n, t, o);
          }
        Ht(e, t, n);
        break;
      case 21:
        Ht(e, t, n);
        break;
      case 22:
        n.mode & 1 ? ((Pe = (r = Pe) || n.memoizedState !== null), Ht(e, t, n), (Pe = r)) : Ht(e, t, n);
        break;
      default:
        Ht(e, t, n);
    }
  }
  function sa(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new _f()),
        t.forEach(function (r) {
          var l = Df.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        });
    }
  }
  function ot(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var u = e,
            i = t,
            o = i;
          e: for (; o !== null; ) {
            switch (o.tag) {
              case 5:
                (ke = o.stateNode), (it = !1);
                break e;
              case 3:
                (ke = o.stateNode.containerInfo), (it = !0);
                break e;
              case 4:
                (ke = o.stateNode.containerInfo), (it = !0);
                break e;
            }
            o = o.return;
          }
          if (ke === null) throw Error(c(160));
          oa(u, i, l), (ke = null), (it = !1);
          var s = l.alternate;
          s !== null && (s.return = null), (l.return = null);
        } catch (h) {
          fe(l, t, h);
        }
      }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) aa(t, e), (t = t.sibling);
  }
  function aa(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((ot(t, e), vt(e), r & 4)) {
          try {
            mr(3, e, e.return), ml(3, e);
          } catch (z) {
            fe(e, e.return, z);
          }
          try {
            mr(5, e, e.return);
          } catch (z) {
            fe(e, e.return, z);
          }
        }
        break;
      case 1:
        ot(t, e), vt(e), r & 512 && n !== null && Ln(n, n.return);
        break;
      case 5:
        if ((ot(t, e), vt(e), r & 512 && n !== null && Ln(n, n.return), e.flags & 32)) {
          var l = e.stateNode;
          try {
            Dn(l, "");
          } catch (z) {
            fe(e, e.return, z);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var u = e.memoizedProps,
            i = n !== null ? n.memoizedProps : u,
            o = e.type,
            s = e.updateQueue;
          if (((e.updateQueue = null), s !== null))
            try {
              o === "input" && u.type === "radio" && u.name != null && Ii(l, u), Hl(o, i);
              var h = Hl(o, u);
              for (i = 0; i < s.length; i += 2) {
                var w = s[i],
                  S = s[i + 1];
                w === "style"
                  ? $i(l, S)
                  : w === "dangerouslySetInnerHTML"
                    ? Bi(l, S)
                    : w === "children"
                      ? Dn(l, S)
                      : be(l, w, S, h);
              }
              switch (o) {
                case "input":
                  Il(l, u);
                  break;
                case "textarea":
                  Vi(l, u);
                  break;
                case "select":
                  var y = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!u.multiple;
                  var x = u.value;
                  x != null
                    ? an(l, !!u.multiple, x, !1)
                    : y !== !!u.multiple &&
                      (u.defaultValue != null
                        ? an(l, !!u.multiple, u.defaultValue, !0)
                        : an(l, !!u.multiple, u.multiple ? [] : "", !1));
              }
              l[rr] = u;
            } catch (z) {
              fe(e, e.return, z);
            }
        }
        break;
      case 6:
        if ((ot(t, e), vt(e), r & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          (l = e.stateNode), (u = e.memoizedProps);
          try {
            l.nodeValue = u;
          } catch (z) {
            fe(e, e.return, z);
          }
        }
        break;
      case 3:
        if ((ot(t, e), vt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
          try {
            Kn(t.containerInfo);
          } catch (z) {
            fe(e, e.return, z);
          }
        break;
      case 4:
        ot(t, e), vt(e);
        break;
      case 13:
        ot(t, e),
          vt(e),
          (l = e.child),
          l.flags & 8192 &&
            ((u = l.memoizedState !== null),
            (l.stateNode.isHidden = u),
            !u || (l.alternate !== null && l.alternate.memoizedState !== null) || (pi = de())),
          r & 4 && sa(e);
        break;
      case 22:
        if (
          ((w = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Pe = (h = Pe) || w), ot(t, e), (Pe = h)) : ot(t, e),
          vt(e),
          r & 8192)
        ) {
          if (((h = e.memoizedState !== null), (e.stateNode.isHidden = h) && !w && e.mode & 1))
            for (_ = e, w = e.child; w !== null; ) {
              for (S = _ = w; _ !== null; ) {
                switch (((y = _), (x = y.child), y.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    mr(4, y, y.return);
                    break;
                  case 1:
                    Ln(y, y.return);
                    var P = y.stateNode;
                    if (typeof P.componentWillUnmount == "function") {
                      (r = y), (n = y.return);
                      try {
                        (t = r), (P.props = t.memoizedProps), (P.state = t.memoizedState), P.componentWillUnmount();
                      } catch (z) {
                        fe(r, n, z);
                      }
                    }
                    break;
                  case 5:
                    Ln(y, y.return);
                    break;
                  case 22:
                    if (y.memoizedState !== null) {
                      da(S);
                      continue;
                    }
                }
                x !== null ? ((x.return = y), (_ = x)) : da(S);
              }
              w = w.sibling;
            }
          e: for (w = null, S = e; ; ) {
            if (S.tag === 5) {
              if (w === null) {
                w = S;
                try {
                  (l = S.stateNode),
                    h
                      ? ((u = l.style),
                        typeof u.setProperty == "function"
                          ? u.setProperty("display", "none", "important")
                          : (u.display = "none"))
                      : ((o = S.stateNode),
                        (s = S.memoizedProps.style),
                        (i = s != null && s.hasOwnProperty("display") ? s.display : null),
                        (o.style.display = Wi("display", i)));
                } catch (z) {
                  fe(e, e.return, z);
                }
              }
            } else if (S.tag === 6) {
              if (w === null)
                try {
                  S.stateNode.nodeValue = h ? "" : S.memoizedProps;
                } catch (z) {
                  fe(e, e.return, z);
                }
            } else if (((S.tag !== 22 && S.tag !== 23) || S.memoizedState === null || S === e) && S.child !== null) {
              (S.child.return = S), (S = S.child);
              continue;
            }
            if (S === e) break e;
            for (; S.sibling === null; ) {
              if (S.return === null || S.return === e) break e;
              w === S && (w = null), (S = S.return);
            }
            w === S && (w = null), (S.sibling.return = S.return), (S = S.sibling);
          }
        }
        break;
      case 19:
        ot(t, e), vt(e), r & 4 && sa(e);
        break;
      case 21:
        break;
      default:
        ot(t, e), vt(e);
    }
  }
  function vt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (ua(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(c(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (Dn(l, ""), (r.flags &= -33));
            var u = ia(e);
            ci(e, u, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo,
              o = ia(e);
            ai(e, o, i);
            break;
          default:
            throw Error(c(161));
        }
      } catch (s) {
        fe(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Pf(e, t, n) {
    (_ = e), ca(e);
  }
  function ca(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
      var l = _,
        u = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || pl;
        if (!i) {
          var o = l.alternate,
            s = (o !== null && o.memoizedState !== null) || Pe;
          o = pl;
          var h = Pe;
          if (((pl = i), (Pe = s) && !h))
            for (_ = l; _ !== null; )
              (i = _),
                (s = i.child),
                i.tag === 22 && i.memoizedState !== null ? pa(l) : s !== null ? ((s.return = i), (_ = s)) : pa(l);
          for (; u !== null; ) (_ = u), ca(u), (u = u.sibling);
          (_ = l), (pl = o), (Pe = h);
        }
        fa(e);
      } else l.subtreeFlags & 8772 && u !== null ? ((u.return = l), (_ = u)) : fa(e);
    }
  }
  function fa(e) {
    for (; _ !== null; ) {
      var t = _;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Pe || ml(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Pe)
                  if (n === null) r.componentDidMount();
                  else {
                    var l = t.elementType === t.type ? n.memoizedProps : ut(t.type, n.memoizedProps);
                    r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var u = t.updateQueue;
                u !== null && ds(t, u, r);
                break;
              case 3:
                var i = t.updateQueue;
                if (i !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  ds(t, i, n);
                }
                break;
              case 5:
                var o = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = o;
                  var s = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      s.autoFocus && n.focus();
                      break;
                    case "img":
                      s.src && (n.src = s.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var h = t.alternate;
                  if (h !== null) {
                    var w = h.memoizedState;
                    if (w !== null) {
                      var S = w.dehydrated;
                      S !== null && Kn(S);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(c(163));
            }
          Pe || (t.flags & 512 && si(t));
        } catch (y) {
          fe(t, t.return, y);
        }
      }
      if (t === e) {
        _ = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        (n.return = t.return), (_ = n);
        break;
      }
      _ = t.return;
    }
  }
  function da(e) {
    for (; _ !== null; ) {
      var t = _;
      if (t === e) {
        _ = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        (n.return = t.return), (_ = n);
        break;
      }
      _ = t.return;
    }
  }
  function pa(e) {
    for (; _ !== null; ) {
      var t = _;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              ml(4, t);
            } catch (s) {
              fe(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                fe(t, l, s);
              }
            }
            var u = t.return;
            try {
              si(t);
            } catch (s) {
              fe(t, u, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              si(t);
            } catch (s) {
              fe(t, i, s);
            }
        }
      } catch (s) {
        fe(t, t.return, s);
      }
      if (t === e) {
        _ = null;
        break;
      }
      var o = t.sibling;
      if (o !== null) {
        (o.return = t.return), (_ = o);
        break;
      }
      _ = t.return;
    }
  }
  var zf = Math.ceil,
    hl = xe.ReactCurrentDispatcher,
    fi = xe.ReactCurrentOwner,
    Ze = xe.ReactCurrentBatchConfig,
    B = 0,
    we = null,
    me = null,
    Ee = 0,
    $e = 0,
    Rn = It(0),
    ye = 0,
    hr = null,
    rn = 0,
    vl = 0,
    di = 0,
    vr = null,
    Ie = null,
    pi = 0,
    jn = 1 / 0,
    Nt = null,
    yl = !1,
    mi = null,
    Bt = null,
    gl = !1,
    Wt = null,
    wl = 0,
    yr = 0,
    hi = null,
    Sl = -1,
    kl = 0;
  function Le() {
    return B & 6 ? de() : Sl !== -1 ? Sl : (Sl = de());
  }
  function $t(e) {
    return e.mode & 1
      ? B & 2 && Ee !== 0
        ? Ee & -Ee
        : ff.transition !== null
          ? (kl === 0 && (kl = uo()), kl)
          : ((e = J), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : ho(e.type))), e)
      : 1;
  }
  function st(e, t, n, r) {
    if (50 < yr) throw ((yr = 0), (hi = null), Error(c(185)));
    Hn(e, n, r),
      (!(B & 2) || e !== we) &&
        (e === we && (!(B & 2) && (vl |= n), ye === 4 && Qt(e, Ee)),
        Fe(e, r),
        n === 1 && B === 0 && !(t.mode & 1) && ((jn = de() + 500), Xr && Ut()));
  }
  function Fe(e, t) {
    var n = e.callbackNode;
    cc(e, t);
    var r = Lr(e, e === we ? Ee : 0);
    if (r === 0) n !== null && no(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && no(n), t === 1))
        e.tag === 0 ? cf(ha.bind(null, e)) : es(ha.bind(null, e)),
          uf(function () {
            !(B & 6) && Ut();
          }),
          (n = null);
      else {
        switch (io(r)) {
          case 1:
            n = Gl;
            break;
          case 4:
            n = ro;
            break;
          case 16:
            n = Nr;
            break;
          case 536870912:
            n = lo;
            break;
          default:
            n = Nr;
        }
        n = xa(n, ma.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function ma(e, t) {
    if (((Sl = -1), (kl = 0), B & 6)) throw Error(c(327));
    var n = e.callbackNode;
    if (On() && e.callbackNode !== n) return null;
    var r = Lr(e, e === we ? Ee : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = El(e, r);
    else {
      t = r;
      var l = B;
      B |= 2;
      var u = ya();
      (we !== e || Ee !== t) && ((Nt = null), (jn = de() + 500), un(e, t));
      do
        try {
          Rf();
          break;
        } catch (o) {
          va(e, o);
        }
      while (!0);
      Ou(), (hl.current = u), (B = l), me !== null ? (t = 0) : ((we = null), (Ee = 0), (t = ye));
    }
    if (t !== 0) {
      if ((t === 2 && ((l = Xl(e)), l !== 0 && ((r = l), (t = vi(e, l)))), t === 1))
        throw ((n = hr), un(e, 0), Qt(e, r), Fe(e, de()), n);
      if (t === 6) Qt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          !(r & 30) &&
            !Tf(l) &&
            ((t = El(e, r)), t === 2 && ((u = Xl(e)), u !== 0 && ((r = u), (t = vi(e, u)))), t === 1))
        )
          throw ((n = hr), un(e, 0), Qt(e, r), Fe(e, de()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            on(e, Ie, Nt);
            break;
          case 3:
            if ((Qt(e, r), (r & 130023424) === r && ((t = pi + 500 - de()), 10 < t))) {
              if (Lr(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                Le(), (e.pingedLanes |= e.suspendedLanes & l);
                break;
              }
              e.timeoutHandle = Eu(on.bind(null, e, Ie, Nt), t);
              break;
            }
            on(e, Ie, Nt);
            break;
          case 4:
            if ((Qt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - nt(r);
              (u = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~u);
            }
            if (
              ((r = l),
              (r = de() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * zf(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Eu(on.bind(null, e, Ie, Nt), r);
              break;
            }
            on(e, Ie, Nt);
            break;
          case 5:
            on(e, Ie, Nt);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return Fe(e, de()), e.callbackNode === n ? ma.bind(null, e) : null;
  }
  function vi(e, t) {
    var n = vr;
    return (
      e.current.memoizedState.isDehydrated && (un(e, t).flags |= 256),
      (e = El(e, t)),
      e !== 2 && ((t = Ie), (Ie = n), t !== null && yi(t)),
      e
    );
  }
  function yi(e) {
    Ie === null ? (Ie = e) : Ie.push.apply(Ie, e);
  }
  function Tf(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              u = l.getSnapshot;
            l = l.value;
            try {
              if (!rt(u(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Qt(e, t) {
    for (t &= ~di, t &= ~vl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - nt(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function ha(e) {
    if (B & 6) throw Error(c(327));
    On();
    var t = Lr(e, 0);
    if (!(t & 1)) return Fe(e, de()), null;
    var n = El(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Xl(e);
      r !== 0 && ((t = r), (n = vi(e, r)));
    }
    if (n === 1) throw ((n = hr), un(e, 0), Qt(e, t), Fe(e, de()), n);
    if (n === 6) throw Error(c(345));
    return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), on(e, Ie, Nt), Fe(e, de()), null;
  }
  function gi(e, t) {
    var n = B;
    B |= 1;
    try {
      return e(t);
    } finally {
      (B = n), B === 0 && ((jn = de() + 500), Xr && Ut());
    }
  }
  function ln(e) {
    Wt !== null && Wt.tag === 0 && !(B & 6) && On();
    var t = B;
    B |= 1;
    var n = Ze.transition,
      r = J;
    try {
      if (((Ze.transition = null), (J = 1), e)) return e();
    } finally {
      (J = r), (Ze.transition = n), (B = t), !(B & 6) && Ut();
    }
  }
  function wi() {
    ($e = Rn.current), le(Rn);
  }
  function un(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), lf(n)), me !== null))
      for (n = me.return; n !== null; ) {
        var r = n;
        switch ((zu(r), r.tag)) {
          case 1:
            (r = r.type.childContextTypes), r != null && Yr();
            break;
          case 3:
            zn(), le(Oe), le(Ce), Hu();
            break;
          case 5:
            Vu(r);
            break;
          case 4:
            zn();
            break;
          case 13:
            le(se);
            break;
          case 19:
            le(se);
            break;
          case 10:
            Mu(r.type._context);
            break;
          case 22:
          case 23:
            wi();
        }
        n = n.return;
      }
    if (
      ((we = e),
      (me = e = Kt(e.current, null)),
      (Ee = $e = t),
      (ye = 0),
      (hr = null),
      (di = vl = rn = 0),
      (Ie = vr = null),
      en !== null)
    ) {
      for (t = 0; t < en.length; t++)
        if (((n = en[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            u = n.pending;
          if (u !== null) {
            var i = u.next;
            (u.next = l), (r.next = i);
          }
          n.pending = r;
        }
      en = null;
    }
    return e;
  }
  function va(e, t) {
    do {
      var n = me;
      try {
        if ((Ou(), (ul.current = al), il)) {
          for (var r = ae.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), (r = r.next);
          }
          il = !1;
        }
        if (
          ((nn = 0), (ge = ve = ae = null), (ar = !1), (cr = 0), (fi.current = null), n === null || n.return === null)
        ) {
          (ye = 1), (hr = t), (me = null);
          break;
        }
        e: {
          var u = e,
            i = n.return,
            o = n,
            s = t;
          if (((t = Ee), (o.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
            var h = s,
              w = o,
              S = w.tag;
            if (!(w.mode & 1) && (S === 0 || S === 11 || S === 15)) {
              var y = w.alternate;
              y
                ? ((w.updateQueue = y.updateQueue), (w.memoizedState = y.memoizedState), (w.lanes = y.lanes))
                : ((w.updateQueue = null), (w.memoizedState = null));
            }
            var x = Hs(i);
            if (x !== null) {
              (x.flags &= -257), Bs(x, i, o, u, t), x.mode & 1 && As(u, h, t), (t = x), (s = h);
              var P = t.updateQueue;
              if (P === null) {
                var z = new Set();
                z.add(s), (t.updateQueue = z);
              } else P.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                As(u, h, t), Si();
                break e;
              }
              s = Error(c(426));
            }
          } else if (ie && o.mode & 1) {
            var pe = Hs(i);
            if (pe !== null) {
              !(pe.flags & 65536) && (pe.flags |= 256), Bs(pe, i, o, u, t), Ru(Tn(s, o));
              break e;
            }
          }
          (u = s = Tn(s, o)), ye !== 4 && (ye = 2), vr === null ? (vr = [u]) : vr.push(u), (u = i);
          do {
            switch (u.tag) {
              case 3:
                (u.flags |= 65536), (t &= -t), (u.lanes |= t);
                var d = Us(u, s, t);
                fs(u, d);
                break e;
              case 1:
                o = s;
                var a = u.type,
                  m = u.stateNode;
                if (
                  !(u.flags & 128) &&
                  (typeof a.getDerivedStateFromError == "function" ||
                    (m !== null && typeof m.componentDidCatch == "function" && (Bt === null || !Bt.has(m))))
                ) {
                  (u.flags |= 65536), (t &= -t), (u.lanes |= t);
                  var k = Vs(u, o, t);
                  fs(u, k);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        wa(n);
      } catch (L) {
        (t = L), me === n && n !== null && (me = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ya() {
    var e = hl.current;
    return (hl.current = al), e === null ? al : e;
  }
  function Si() {
    (ye === 0 || ye === 3 || ye === 2) && (ye = 4),
      we === null || (!(rn & 268435455) && !(vl & 268435455)) || Qt(we, Ee);
  }
  function El(e, t) {
    var n = B;
    B |= 2;
    var r = ya();
    (we !== e || Ee !== t) && ((Nt = null), un(e, t));
    do
      try {
        Lf();
        break;
      } catch (l) {
        va(e, l);
      }
    while (!0);
    if ((Ou(), (B = n), (hl.current = r), me !== null)) throw Error(c(261));
    return (we = null), (Ee = 0), ye;
  }
  function Lf() {
    for (; me !== null; ) ga(me);
  }
  function Rf() {
    for (; me !== null && !tc(); ) ga(me);
  }
  function ga(e) {
    var t = Ea(e.alternate, e, $e);
    (e.memoizedProps = e.pendingProps), t === null ? wa(e) : (me = t), (fi.current = null);
  }
  function wa(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = Cf(n, t)), n !== null)) {
          (n.flags &= 32767), (me = n);
          return;
        }
        if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (ye = 6), (me = null);
          return;
        }
      } else if (((n = xf(n, t, $e)), n !== null)) {
        me = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        me = t;
        return;
      }
      me = t = e;
    } while (t !== null);
    ye === 0 && (ye = 5);
  }
  function on(e, t, n) {
    var r = J,
      l = Ze.transition;
    try {
      (Ze.transition = null), (J = 1), jf(e, t, n, r);
    } finally {
      (Ze.transition = l), (J = r);
    }
    return null;
  }
  function jf(e, t, n, r) {
    do On();
    while (Wt !== null);
    if (B & 6) throw Error(c(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(c(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var u = n.lanes | n.childLanes;
    if (
      (fc(e, u),
      e === we && ((me = we = null), (Ee = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        gl ||
        ((gl = !0),
        xa(Nr, function () {
          return On(), null;
        })),
      (u = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || u)
    ) {
      (u = Ze.transition), (Ze.transition = null);
      var i = J;
      J = 1;
      var o = B;
      (B |= 4),
        (fi.current = null),
        Nf(e, n),
        aa(n, e),
        Jc(Su),
        (Or = !!wu),
        (Su = wu = null),
        (e.current = n),
        Pf(n),
        nc(),
        (B = o),
        (J = i),
        (Ze.transition = u);
    } else e.current = n;
    if (
      (gl && ((gl = !1), (Wt = e), (wl = l)),
      (u = e.pendingLanes),
      u === 0 && (Bt = null),
      uc(n.stateNode),
      Fe(e, de()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
    if (yl) throw ((yl = !1), (e = mi), (mi = null), e);
    return (
      wl & 1 && e.tag !== 0 && On(),
      (u = e.pendingLanes),
      u & 1 ? (e === hi ? yr++ : ((yr = 0), (hi = e))) : (yr = 0),
      Ut(),
      null
    );
  }
  function On() {
    if (Wt !== null) {
      var e = io(wl),
        t = Ze.transition,
        n = J;
      try {
        if (((Ze.transition = null), (J = 16 > e ? 16 : e), Wt === null)) var r = !1;
        else {
          if (((e = Wt), (Wt = null), (wl = 0), B & 6)) throw Error(c(331));
          var l = B;
          for (B |= 4, _ = e.current; _ !== null; ) {
            var u = _,
              i = u.child;
            if (_.flags & 16) {
              var o = u.deletions;
              if (o !== null) {
                for (var s = 0; s < o.length; s++) {
                  var h = o[s];
                  for (_ = h; _ !== null; ) {
                    var w = _;
                    switch (w.tag) {
                      case 0:
                      case 11:
                      case 15:
                        mr(8, w, u);
                    }
                    var S = w.child;
                    if (S !== null) (S.return = w), (_ = S);
                    else
                      for (; _ !== null; ) {
                        w = _;
                        var y = w.sibling,
                          x = w.return;
                        if ((la(w), w === h)) {
                          _ = null;
                          break;
                        }
                        if (y !== null) {
                          (y.return = x), (_ = y);
                          break;
                        }
                        _ = x;
                      }
                  }
                }
                var P = u.alternate;
                if (P !== null) {
                  var z = P.child;
                  if (z !== null) {
                    P.child = null;
                    do {
                      var pe = z.sibling;
                      (z.sibling = null), (z = pe);
                    } while (z !== null);
                  }
                }
                _ = u;
              }
            }
            if (u.subtreeFlags & 2064 && i !== null) (i.return = u), (_ = i);
            else
              e: for (; _ !== null; ) {
                if (((u = _), u.flags & 2048))
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mr(9, u, u.return);
                  }
                var d = u.sibling;
                if (d !== null) {
                  (d.return = u.return), (_ = d);
                  break e;
                }
                _ = u.return;
              }
          }
          var a = e.current;
          for (_ = a; _ !== null; ) {
            i = _;
            var m = i.child;
            if (i.subtreeFlags & 2064 && m !== null) (m.return = i), (_ = m);
            else
              e: for (i = a; _ !== null; ) {
                if (((o = _), o.flags & 2048))
                  try {
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ml(9, o);
                    }
                  } catch (L) {
                    fe(o, o.return, L);
                  }
                if (o === i) {
                  _ = null;
                  break e;
                }
                var k = o.sibling;
                if (k !== null) {
                  (k.return = o.return), (_ = k);
                  break e;
                }
                _ = o.return;
              }
          }
          if (((B = l), Ut(), dt && typeof dt.onPostCommitFiberRoot == "function"))
            try {
              dt.onPostCommitFiberRoot(Pr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        (J = n), (Ze.transition = t);
      }
    }
    return !1;
  }
  function Sa(e, t, n) {
    (t = Tn(n, t)), (t = Us(e, t, 1)), (e = At(e, t, 1)), (t = Le()), e !== null && (Hn(e, 1, t), Fe(e, t));
  }
  function fe(e, t, n) {
    if (e.tag === 3) Sa(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Sa(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" && (Bt === null || !Bt.has(r)))
          ) {
            (e = Tn(n, e)), (e = Vs(t, e, 1)), (t = At(t, e, 1)), (e = Le()), t !== null && (Hn(t, 1, e), Fe(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Of(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (t = Le()),
      (e.pingedLanes |= e.suspendedLanes & n),
      we === e &&
        (Ee & n) === n &&
        (ye === 4 || (ye === 3 && (Ee & 130023424) === Ee && 500 > de() - pi) ? un(e, 0) : (di |= n)),
      Fe(e, t);
  }
  function ka(e, t) {
    t === 0 && (e.mode & 1 ? ((t = Tr), (Tr <<= 1), !(Tr & 130023424) && (Tr = 4194304)) : (t = 1));
    var n = Le();
    (e = xt(e, t)), e !== null && (Hn(e, t, n), Fe(e, n));
  }
  function Mf(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), ka(e, n);
  }
  function Df(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(c(314));
    }
    r !== null && r.delete(t), ka(e, n);
  }
  var Ea;
  Ea = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Oe.current) De = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (De = !1), Ef(e, t, n);
        De = !!(e.flags & 131072);
      }
    else (De = !1), ie && t.flags & 1048576 && ts(t, Jr, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        dl(e, t), (e = t.pendingProps);
        var l = kn(t, Ce.current);
        Pn(t, n), (l = $u(null, t, r, e, l, n));
        var u = Qu();
        return (
          (t.flags |= 1),
          typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Me(r) ? ((u = !0), Gr(t)) : (u = !1),
              (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
              Fu(t),
              (l.updater = cl),
              (t.stateNode = l),
              (l._reactInternals = t),
              Ju(t, r, e, n),
              (t = ti(null, t, r, !0, u, n)))
            : ((t.tag = 0), ie && u && Pu(t), Te(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (dl(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = Ff(r)),
            (e = ut(r, e)),
            l)
          ) {
            case 0:
              t = ei(null, t, r, e, n);
              break e;
            case 1:
              t = Gs(null, t, r, e, n);
              break e;
            case 11:
              t = Ws(null, t, r, e, n);
              break e;
            case 14:
              t = $s(null, t, r, ut(r.type, e), n);
              break e;
          }
          throw Error(c(306, r, ""));
        }
        return t;
      case 0:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ut(r, l)), ei(e, t, r, l, n);
      case 1:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ut(r, l)), Gs(e, t, r, l, n);
      case 3:
        e: {
          if ((Xs(t), e === null)) throw Error(c(387));
          (r = t.pendingProps), (u = t.memoizedState), (l = u.element), cs(e, t), rl(t, r, null, n);
          var i = t.memoizedState;
          if (((r = i.element), u.isDehydrated))
            if (
              ((u = {
                element: r,
                isDehydrated: !1,
                cache: i.cache,
                pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                transitions: i.transitions,
              }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              (l = Tn(Error(c(423)), t)), (t = Zs(e, t, r, n, l));
              break e;
            } else if (r !== l) {
              (l = Tn(Error(c(424)), t)), (t = Zs(e, t, r, n, l));
              break e;
            } else
              for (
                We = Dt(t.stateNode.containerInfo.firstChild),
                  Be = t,
                  ie = !0,
                  lt = null,
                  n = ss(t, null, r, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((Cn(), r === l)) {
              t = _t(e, t, n);
              break e;
            }
            Te(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          ps(t),
          e === null && Lu(t),
          (r = t.type),
          (l = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (i = l.children),
          ku(r, l) ? (i = null) : u !== null && ku(r, u) && (t.flags |= 32),
          Ys(e, t),
          Te(e, t, i, n),
          t.child
        );
      case 6:
        return e === null && Lu(t), null;
      case 13:
        return Js(e, t, n);
      case 4:
        return (
          Uu(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = _n(t, null, r, n)) : Te(e, t, r, n),
          t.child
        );
      case 11:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ut(r, l)), Ws(e, t, r, l, n);
      case 7:
        return Te(e, t, t.pendingProps, n), t.child;
      case 8:
        return Te(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Te(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (u = t.memoizedProps),
            (i = l.value),
            ne(el, r._currentValue),
            (r._currentValue = i),
            u !== null)
          )
            if (rt(u.value, i)) {
              if (u.children === l.children && !Oe.current) {
                t = _t(e, t, n);
                break e;
              }
            } else
              for (u = t.child, u !== null && (u.return = t); u !== null; ) {
                var o = u.dependencies;
                if (o !== null) {
                  i = u.child;
                  for (var s = o.firstContext; s !== null; ) {
                    if (s.context === r) {
                      if (u.tag === 1) {
                        (s = Ct(-1, n & -n)), (s.tag = 2);
                        var h = u.updateQueue;
                        if (h !== null) {
                          h = h.shared;
                          var w = h.pending;
                          w === null ? (s.next = s) : ((s.next = w.next), (w.next = s)), (h.pending = s);
                        }
                      }
                      (u.lanes |= n),
                        (s = u.alternate),
                        s !== null && (s.lanes |= n),
                        Du(u.return, n, t),
                        (o.lanes |= n);
                      break;
                    }
                    s = s.next;
                  }
                } else if (u.tag === 10) i = u.type === t.type ? null : u.child;
                else if (u.tag === 18) {
                  if (((i = u.return), i === null)) throw Error(c(341));
                  (i.lanes |= n), (o = i.alternate), o !== null && (o.lanes |= n), Du(i, n, t), (i = u.sibling);
                } else i = u.child;
                if (i !== null) i.return = u;
                else
                  for (i = u; i !== null; ) {
                    if (i === t) {
                      i = null;
                      break;
                    }
                    if (((u = i.sibling), u !== null)) {
                      (u.return = i.return), (i = u);
                      break;
                    }
                    i = i.return;
                  }
                u = i;
              }
          Te(e, t, l.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          Pn(t, n),
          (l = Ge(l)),
          (r = r(l)),
          (t.flags |= 1),
          Te(e, t, r, n),
          t.child
        );
      case 14:
        return (r = t.type), (l = ut(r, t.pendingProps)), (l = ut(r.type, l)), $s(e, t, r, l, n);
      case 15:
        return Qs(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ut(r, l)),
          dl(e, t),
          (t.tag = 1),
          Me(r) ? ((e = !0), Gr(t)) : (e = !1),
          Pn(t, n),
          Is(t, r, l),
          Ju(t, r, l, n),
          ti(null, t, r, !0, e, n)
        );
      case 19:
        return bs(e, t, n);
      case 22:
        return Ks(e, t, n);
    }
    throw Error(c(156, t.tag));
  };
  function xa(e, t) {
    return to(e, t);
  }
  function If(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Je(e, t, n, r) {
    return new If(e, t, n, r);
  }
  function ki(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Ff(e) {
    if (typeof e == "function") return ki(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === ct)) return 11;
      if (e === ft) return 14;
    }
    return 2;
  }
  function Kt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Je(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function xl(e, t, n, r, l, u) {
    var i = 2;
    if (((r = e), typeof e == "function")) ki(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else
      e: switch (e) {
        case Re:
          return sn(n.children, l, u, t);
        case Qe:
          (i = 8), (l |= 8);
          break;
        case zt:
          return (e = Je(12, n, t, l | 2)), (e.elementType = zt), (e.lanes = u), e;
        case Ve:
          return (e = Je(13, n, t, l)), (e.elementType = Ve), (e.lanes = u), e;
        case tt:
          return (e = Je(19, n, t, l)), (e.elementType = tt), (e.lanes = u), e;
        case ce:
          return Cl(n, l, u, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case gt:
                i = 10;
                break e;
              case Gt:
                i = 9;
                break e;
              case ct:
                i = 11;
                break e;
              case ft:
                i = 14;
                break e;
              case je:
                (i = 16), (r = null);
                break e;
            }
          throw Error(c(130, e == null ? e : typeof e, ""));
      }
    return (t = Je(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = u), t;
  }
  function sn(e, t, n, r) {
    return (e = Je(7, e, r, t)), (e.lanes = n), e;
  }
  function Cl(e, t, n, r) {
    return (e = Je(22, e, r, t)), (e.elementType = ce), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
  }
  function Ei(e, t, n) {
    return (e = Je(6, e, null, t)), (e.lanes = n), e;
  }
  function xi(e, t, n) {
    return (
      (t = Je(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
      t
    );
  }
  function Uf(e, t, n, r, l) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Zl(0)),
      (this.expirationTimes = Zl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Zl(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null);
  }
  function Ci(e, t, n, r, l, u, i, o, s) {
    return (
      (e = new Uf(e, t, n, o, s)),
      t === 1 ? ((t = 1), u === !0 && (t |= 8)) : (t = 0),
      (u = Je(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (u.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Fu(u),
      e
    );
  }
  function Vf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ze, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Ca(e) {
    if (!e) return Ft;
    e = e._reactInternals;
    e: {
      if (Xt(e) !== e || e.tag !== 1) throw Error(c(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Me(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(c(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Me(n)) return qo(e, n, t);
    }
    return t;
  }
  function _a(e, t, n, r, l, u, i, o, s) {
    return (
      (e = Ci(n, r, !0, e, l, u, i, o, s)),
      (e.context = Ca(null)),
      (n = e.current),
      (r = Le()),
      (l = $t(n)),
      (u = Ct(r, l)),
      (u.callback = t ?? null),
      At(n, u, l),
      (e.current.lanes = l),
      Hn(e, l, r),
      Fe(e, r),
      e
    );
  }
  function _l(e, t, n, r) {
    var l = t.current,
      u = Le(),
      i = $t(l);
    return (
      (n = Ca(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Ct(u, i)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = At(l, t, i)),
      e !== null && (st(e, l, i, u), nl(e, l, i)),
      i
    );
  }
  function Nl(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Na(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function _i(e, t) {
    Na(e, t), (e = e.alternate) && Na(e, t);
  }
  function Af() {
    return null;
  }
  var Pa =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Ni(e) {
    this._internalRoot = e;
  }
  (Pl.prototype.render = Ni.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      _l(e, t, null, null);
    }),
    (Pl.prototype.unmount = Ni.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          ln(function () {
            _l(null, e, null, null);
          }),
            (t[wt] = null);
        }
      });
  function Pl(e) {
    this._internalRoot = e;
  }
  Pl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ao();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++);
      jt.splice(n, 0, e), n === 0 && po(e);
    }
  };
  function Pi(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function zl(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function za() {}
  function Hf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var u = r;
        r = function () {
          var h = Nl(i);
          u.call(h);
        };
      }
      var i = _a(t, r, e, 0, null, !1, !1, "", za);
      return (e._reactRootContainer = i), (e[wt] = i.current), tr(e.nodeType === 8 ? e.parentNode : e), ln(), i;
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var h = Nl(s);
        o.call(h);
      };
    }
    var s = Ci(e, 0, !1, null, null, !1, !1, "", za);
    return (
      (e._reactRootContainer = s),
      (e[wt] = s.current),
      tr(e.nodeType === 8 ? e.parentNode : e),
      ln(function () {
        _l(t, s, n, r);
      }),
      s
    );
  }
  function Tl(e, t, n, r, l) {
    var u = n._reactRootContainer;
    if (u) {
      var i = u;
      if (typeof l == "function") {
        var o = l;
        l = function () {
          var s = Nl(i);
          o.call(s);
        };
      }
      _l(t, i, e, l);
    } else i = Hf(n, t, e, l, r);
    return Nl(i);
  }
  (oo = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = An(t.pendingLanes);
          n !== 0 && (Jl(t, n | 1), Fe(t, de()), !(B & 6) && ((jn = de() + 500), Ut()));
        }
        break;
      case 13:
        ln(function () {
          var r = xt(e, 1);
          if (r !== null) {
            var l = Le();
            st(r, e, 1, l);
          }
        }),
          _i(e, 1);
    }
  }),
    (ql = function (e) {
      if (e.tag === 13) {
        var t = xt(e, 134217728);
        if (t !== null) {
          var n = Le();
          st(t, e, 134217728, n);
        }
        _i(e, 134217728);
      }
    }),
    (so = function (e) {
      if (e.tag === 13) {
        var t = $t(e),
          n = xt(e, t);
        if (n !== null) {
          var r = Le();
          st(n, e, t, r);
        }
        _i(e, t);
      }
    }),
    (ao = function () {
      return J;
    }),
    (co = function (e, t) {
      var n = J;
      try {
        return (J = e), t();
      } finally {
        J = n;
      }
    }),
    ($l = function (e, t, n) {
      switch (t) {
        case "input":
          if ((Il(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = Kr(r);
                if (!l) throw Error(c(90));
                Mi(r), Il(r, l);
              }
            }
          }
          break;
        case "textarea":
          Vi(e, n);
          break;
        case "select":
          (t = n.value), t != null && an(e, !!n.multiple, t, !1);
      }
    }),
    (Gi = gi),
    (Xi = ln);
  var Bf = { usingClientEntryPoint: !1, Events: [lr, wn, Kr, Ki, Yi, gi] },
    gr = { findFiberByHostInstance: Zt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" },
    Wf = {
      bundleType: gr.bundleType,
      version: gr.version,
      rendererPackageName: gr.rendererPackageName,
      rendererConfig: gr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: xe.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = bi(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: gr.findFiberByHostInstance || Af,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ll = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ll.isDisabled && Ll.supportsFiber)
      try {
        (Pr = Ll.inject(Wf)), (dt = Ll);
      } catch {}
  }
  return (
    (Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bf),
    (Ue.createPortal = function (e, t) {
      var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Pi(t)) throw Error(c(200));
      return Vf(e, t, null, n);
    }),
    (Ue.createRoot = function (e, t) {
      if (!Pi(e)) throw Error(c(299));
      var n = !1,
        r = "",
        l = Pa;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Ci(e, 1, !1, null, null, n, !1, r, l)),
        (e[wt] = t.current),
        tr(e.nodeType === 8 ? e.parentNode : e),
        new Ni(t)
      );
    }),
    (Ue.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error(c(188)) : ((e = Object.keys(e).join(",")), Error(c(268, e)));
      return (e = bi(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (Ue.flushSync = function (e) {
      return ln(e);
    }),
    (Ue.hydrate = function (e, t, n) {
      if (!zl(t)) throw Error(c(200));
      return Tl(null, e, t, !0, n);
    }),
    (Ue.hydrateRoot = function (e, t, n) {
      if (!Pi(e)) throw Error(c(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        u = "",
        i = Pa;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = _a(t, null, e, 1, n ?? null, l, !1, u, i)),
        (e[wt] = t.current),
        tr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l);
      return new Pl(t);
    }),
    (Ue.render = function (e, t, n) {
      if (!zl(t)) throw Error(c(200));
      return Tl(null, e, t, !1, n);
    }),
    (Ue.unmountComponentAtNode = function (e) {
      if (!zl(e)) throw Error(c(40));
      return e._reactRootContainer
        ? (ln(function () {
            Tl(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[wt] = null);
            });
          }),
          !0)
        : !1;
    }),
    (Ue.unstable_batchedUpdates = gi),
    (Ue.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!zl(n)) throw Error(c(200));
      if (e == null || e._reactInternals === void 0) throw Error(c(38));
      return Tl(e, t, n, !1, r);
    }),
    (Ue.version = "18.3.1-next-f1338f8080-20240426"),
    Ue
  );
}
var Fa;
function ed() {
  if (Fa) return Li.exports;
  Fa = 1;
  function p() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p);
      } catch (v) {
        console.error(v);
      }
  }
  return p(), (Li.exports = bf()), Li.exports;
}
var Ua;
function td() {
  if (Ua) return Rl;
  Ua = 1;
  var p = ed();
  return (Rl.createRoot = p.createRoot), (Rl.hydrateRoot = p.hydrateRoot), Rl;
}
var nd = td();
const Va = (p) => {
    let v;
    const c = new Set(),
      C = (q, oe) => {
        const Y = typeof q == "function" ? q(v) : q;
        if (!Object.is(Y, v)) {
          const b = v;
          (v = (oe ?? (typeof Y != "object" || Y === null)) ? Y : Object.assign({}, v, Y)), c.forEach((G) => G(v, b));
        }
      },
      T = () => v,
      U = { setState: C, getState: T, getInitialState: () => I, subscribe: (q) => (c.add(q), () => c.delete(q)) },
      I = (v = p(C, T, U));
    return U;
  },
  rd = (p) => (p ? Va(p) : Va),
  ld = (p) => p;
function ud(p, v = ld) {
  const c = Pt.useSyncExternalStore(
    p.subscribe,
    () => v(p.getState()),
    () => v(p.getInitialState())
  );
  return Pt.useDebugValue(c), c;
}
const Aa = (p) => {
    const v = rd(p),
      c = (C) => ud(v, C);
    return Object.assign(c, v), c;
  },
  id = (p) => (p ? Aa(p) : Aa),
  Ml = id((p) => ({
    messages: [],
    stepCount: 0,
    inputType: "Definition",
    addMessage: (v) =>
      p((c) => {
        const C = c.messages.length > 0 && v.type === "step";
        return { messages: [...c.messages, v], stepCount: C ? c.stepCount + 1 : c.stepCount };
      }),
    clearMessages: () => p({ messages: [], stepCount: 0, inputType: "Definition" }),
    deleteMessage: (v) =>
      p((c) => {
        const C = c.messages.filter((D, W) => W !== v),
          T = C.filter((D) => D.type === "step").length;
        return { messages: C, stepCount: T };
      }),
    updateMessage: (v, c) => {
      p((C) => ({ messages: C.messages.map((T, D) => (D === v ? { ...T, content: c } : T)) }));
    },
  }));
var $a = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
  Ha = Pt.createContext && Pt.createContext($a),
  od = ["attr", "size", "title"];
function sd(p, v) {
  if (p == null) return {};
  var c = ad(p, v),
    C,
    T;
  if (Object.getOwnPropertySymbols) {
    var D = Object.getOwnPropertySymbols(p);
    for (T = 0; T < D.length; T++)
      (C = D[T]), !(v.indexOf(C) >= 0) && Object.prototype.propertyIsEnumerable.call(p, C) && (c[C] = p[C]);
  }
  return c;
}
function ad(p, v) {
  if (p == null) return {};
  var c = {};
  for (var C in p)
    if (Object.prototype.hasOwnProperty.call(p, C)) {
      if (v.indexOf(C) >= 0) continue;
      c[C] = p[C];
    }
  return c;
}
function jl() {
  return (
    (jl = Object.assign
      ? Object.assign.bind()
      : function (p) {
          for (var v = 1; v < arguments.length; v++) {
            var c = arguments[v];
            for (var C in c) Object.prototype.hasOwnProperty.call(c, C) && (p[C] = c[C]);
          }
          return p;
        }),
    jl.apply(this, arguments)
  );
}
function Ba(p, v) {
  var c = Object.keys(p);
  if (Object.getOwnPropertySymbols) {
    var C = Object.getOwnPropertySymbols(p);
    v &&
      (C = C.filter(function (T) {
        return Object.getOwnPropertyDescriptor(p, T).enumerable;
      })),
      c.push.apply(c, C);
  }
  return c;
}
function Ol(p) {
  for (var v = 1; v < arguments.length; v++) {
    var c = arguments[v] != null ? arguments[v] : {};
    v % 2
      ? Ba(Object(c), !0).forEach(function (C) {
          cd(p, C, c[C]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(p, Object.getOwnPropertyDescriptors(c))
        : Ba(Object(c)).forEach(function (C) {
            Object.defineProperty(p, C, Object.getOwnPropertyDescriptor(c, C));
          });
  }
  return p;
}
function cd(p, v, c) {
  return (
    (v = fd(v)),
    v in p ? Object.defineProperty(p, v, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : (p[v] = c),
    p
  );
}
function fd(p) {
  var v = dd(p, "string");
  return typeof v == "symbol" ? v : v + "";
}
function dd(p, v) {
  if (typeof p != "object" || !p) return p;
  var c = p[Symbol.toPrimitive];
  if (c !== void 0) {
    var C = c.call(p, v);
    if (typeof C != "object") return C;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (v === "string" ? String : Number)(p);
}
function Qa(p) {
  return p && p.map((v, c) => Pt.createElement(v.tag, Ol({ key: c }, v.attr), Qa(v.child)));
}
function Sr(p) {
  return (v) => Pt.createElement(pd, jl({ attr: Ol({}, p.attr) }, v), Qa(p.child));
}
function pd(p) {
  var v = (c) => {
    var { attr: C, size: T, title: D } = p,
      W = sd(p, od),
      U = T || c.size || "1em",
      I;
    return (
      c.className && (I = c.className),
      p.className && (I = (I ? I + " " : "") + p.className),
      Pt.createElement(
        "svg",
        jl({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0" }, c.attr, C, W, {
          className: I,
          style: Ol(Ol({ color: p.color || c.color }, c.style), p.style),
          height: U,
          width: U,
          xmlns: "http://www.w3.org/2000/svg",
        }),
        D && Pt.createElement("title", null, D),
        p.children
      )
    );
  };
  return Ha !== void 0 ? Pt.createElement(Ha.Consumer, null, (c) => v(c)) : v($a);
}
function md(p) {
  return Sr({
    attr: { t: "1569683368540", viewBox: "0 0 1024 1024", version: "1.1" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z",
        },
        child: [],
      },
    ],
  })(p);
}
function hd(p) {
  return Sr({
    attr: { viewBox: "0 0 1024 1024" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z",
        },
        child: [],
      },
    ],
  })(p);
}
function vd(p) {
  return Sr({
    attr: { viewBox: "0 0 16 16", fill: "currentColor" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z",
        },
        child: [],
      },
    ],
  })(p);
}
function yd(p) {
  return Sr({
    attr: { viewBox: "0 0 16 16", fill: "currentColor" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M13.507 12.324a7 7 0 0 0 .065-8.56A7 7 0 0 0 2 4.393V2H1v3.5l.5.5H5V5H2.811a6.008 6.008 0 1 1-.135 5.77l-.887.462a7 7 0 0 0 11.718 1.092zm-3.361-.97l.708-.707L8 7.792V4H7v4l.146.354 3 3z",
        },
        child: [],
      },
    ],
  })(p);
}
function gd(p) {
  return Sr({
    attr: { viewBox: "0 0 16 16", fill: "currentColor" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z",
        },
        child: [],
      },
    ],
  })(p);
}
function wd() {
  const { clearMessages: p } = Ml();
  return M.jsx(M.Fragment, {
    children: M.jsxs("div", {
      className: "header flex",
      children: [
        M.jsx("div", { className: "title", children: "Chat with CRA" }),
        M.jsxs("div", {
          className: "icon flex",
          children: [
            M.jsx("div", { className: "icon-clear", onClick: p, children: M.jsx(md, {}) }),
            M.jsx("div", { className: "icon-history", children: M.jsx(yd, {}) }),
          ],
        }),
      ],
    }),
  });
}
function Sd() {
  const p = window.navigator.userAgent.toLowerCase();
  return p.includes("mac") ? "mac" : p.includes("win") ? "windows" : p.includes("linux") ? "linux" : "unknown";
}
class kd {
  constructor() {
    Ta(this, "vsCodeApi");
    typeof acquireVsCodeApi == "function" && (this.vsCodeApi = acquireVsCodeApi());
  }
  postMessage(v) {
    this.vsCodeApi ? this.vsCodeApi.postMessage(v) : console.log(v);
  }
  getState() {
    if (this.vsCodeApi) return this.vsCodeApi.getState();
    {
      const v = localStorage.getItem("vscodeState");
      return v ? JSON.parse(v) : void 0;
    }
  }
  setState(v) {
    return this.vsCodeApi ? this.vsCodeApi.setState(v) : (localStorage.setItem("vscodeState", JSON.stringify(v)), v);
  }
}
const Wa = new kd(),
  Ka = (p, v) =>
    p.map(
      (c, C) => `${C === 0 ? "Definition" : C <= v + 1 ? "Step " + C : "Response between GPT and User"} ${c.content}`
    ).join(`
`),
  Ya = {
    sendInitMessage: (p) => {
      Wa.postMessage({ command: "initialRequest", value: p });
    },
    sendAdditionalMessage: (p, v) => {
      Wa.postMessage({ command: "button", value: p, number: v });
    },
  };
function Ed() {
  const p = qe.useRef(null),
    { messages: v, addMessage: c, stepCount: C } = Ml(),
    [T, D] = qe.useState(v.length > 0 ? "Step" : "Definition"),
    [W, U] = qe.useState(!1);
  qe.useEffect(() => {
    v.length === 0 && D("Definition");
  }, [v]);
  const I = (G) => {
      const he = Sd(),
        ee = (he === "mac" && !G.metaKey && !G.shiftKey) || (he !== "mac" && !G.ctrlKey && !G.shiftKey),
        X = (he === "mac" && G.metaKey && !G.shiftKey) || (he !== "mac" && G.ctrlKey && !G.shiftKey);
      if (G.key === "Enter") {
        if (W) return;
        ee
          ? (G.preventDefault(), q())
          : X &&
            (G.preventDefault(),
            Ya.sendInitMessage(Ka(v, C)),
            window.postMessage({ command: "setLoading", data: !0 }),
            D("additional"));
      }
    },
    q = () => {
      const G = p.current;
      if (G !== null && G.innerText.trim() !== "") {
        const he = { type: T, content: G.innerText.trim(), editable: !0 };
        c(he), (G.innerText = ""), (T === "Definition" || T.startsWith("Step")) && D("Step");
      }
    };
  return M.jsxs("div", {
    className: "chat-input-container",
    children: [
      M.jsx(xd, {}),
      M.jsxs("div", {
        className: "chat-input-wrapper",
        children: [
          M.jsx("div", {
            className: "chat-input",
            ref: p,
            contentEditable: "true",
            onKeyDown: I,
            onCompositionStart: () => U(!0),
            onCompositionEnd: () => U(!1),
            "data-placeholder":
              T === "Definition"
                ? "Type your problem definition here..."
                : T.startsWith("Step")
                  ? "Type your steps here..."
                  : "Ask an additional question here...",
          }),
          M.jsxs("button", {
            className: "chat-input-button",
            onClick: q,
            children: [
              M.jsx("div", { className: "tooltip", children: "Send" }),
              M.jsx("span", { className: "icon", children: "⏎" }),
              M.jsx("div", { className: "background" }),
            ],
          }),
        ],
      }),
      M.jsxs("div", {
        className: "chat-input-options",
        children: [
          M.jsx("div", { className: "input-state-indicator", children: T }),
          M.jsxs("div", {
            id: "chatWithCodebase",
            children: [navigator.userAgent.toUpperCase().includes("MAC") ? "⌘" : "Ctrl", " ⏎ Run"],
          }),
        ],
      }),
    ],
  });
}
function xd() {
  const [p, v] = qe.useState("");
  return (
    qe.useEffect(() => {
      const c = (C) => {
        const { command: T, data: D } = C.data;
        T === "activateDocument" && v(D);
      };
      return (
        window.addEventListener("message", c),
        () => {
          window.removeEventListener("message", c);
        }
      );
    }, []),
    M.jsx("div", {
      className: "chat-input-info",
      children: M.jsxs("div", {
        className: "input-document-indicator",
        children: [M.jsx(vd, {}), p ? p.split("/").pop() : "No file selected"],
      }),
    })
  );
}
function Cd() {
  const { messages: p, updateMessage: v, addMessage: c } = Ml(),
    [C, T] = qe.useState(!1);
  qe.useEffect(() => {
    const U = (I) => {
      const { command: q, data: oe } = I.data;
      q === "setGptResponse" ? (c({ type: "result", content: oe, editable: !1 }), T(!1)) : q === "setLoading" && T(oe);
    };
    return (
      window.addEventListener("message", U),
      () => {
        window.removeEventListener("message", U);
      }
    );
  }, [c]);
  const D = (U, I) => {
      v(I, U.target.innerText);
    },
    W = qe.useRef(null);
  return (
    qe.useEffect(() => {
      var U;
      (U = W.current) == null || U.scrollIntoView({ behavior: "smooth" });
    }, [p]),
    M.jsxs("main", {
      id: "chat-container",
      children: [
        p && p.length > 0
          ? M.jsx("div", {
              className: "messages-container flex",
              onClick: (U) => U.stopPropagation(),
              children: p.map((U, I) => M.jsx(_d, { message: U, index: I, handleBlur: D }, U.type + I)),
            })
          : M.jsx("div", { className: "learnCRA", children: "LEARN CRA!!!" }),
        C ? M.jsx("div", { className: "loading", children: M.jsx(hd, {}) }) : null,
        M.jsx("div", { ref: W }),
      ],
    })
  );
}
function _d({ handleBlur: p, index: v, message: c }) {
  const { deleteMessage: C, messages: T, stepCount: D } = Ml(),
    W = c.type === "result" ? "result" : c.type.startsWith("Step") ? `${c.type} ${v}` : c.type,
    U = (I) => {
      Ya.sendAdditionalMessage(Ka(T, D), I);
    };
  return M.jsxs("div", {
    className: "message-box",
    children: [
      M.jsxs("div", {
        className: "message-text",
        children: [
          M.jsx("div", { className: "message-type", children: W }),
          M.jsx("div", {
            className: "message-content",
            contentEditable: c.editable,
            onBlur: (I) => p(I, v),
            children: c.content,
          }),
          W === "result" &&
            M.jsxs("div", {
              className: "message-actions",
              children: [
                M.jsx("span", { className: "message-actions-label", children: "Generate New Response:" }),
                M.jsxs("div", {
                  className: "message-buttons",
                  children: [
                    M.jsx("button", { onClick: () => U(1), children: "1" }),
                    M.jsx("button", { onClick: () => U(2), children: "2" }),
                    M.jsx("button", { onClick: () => U(3), children: "3" }),
                  ],
                }),
              ],
            }),
        ],
      }),
      M.jsx("div", {
        className: "message-icon",
        children:
          W !== "Definition" &&
          M.jsx("div", { className: "message-icon-trash", onClick: () => C(v), children: M.jsx(gd, {}) }),
      }),
    ],
  });
}
function Nd() {
  return M.jsxs("div", { id: "chat", children: [M.jsx(wd, {}), M.jsx(Cd, {}), M.jsx(Ed, {})] });
}
nd.createRoot(document.getElementById("root")).render(M.jsx(qe.StrictMode, { children: M.jsx(Nd, {}) }));
