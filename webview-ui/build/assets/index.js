var Qf = Object.defineProperty;
var Kf = (d, v, c) => (v in d ? Qf(d, v, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (d[v] = c));
var La = (d, v, c) => Kf(d, typeof v != "symbol" ? v + "" : v, c);
(function () {
  const v = document.createElement("link").relList;
  if (v && v.supports && v.supports("modulepreload")) return;
  for (const L of document.querySelectorAll('link[rel="modulepreload"]')) x(L);
  new MutationObserver((L) => {
    for (const I of L)
      if (I.type === "childList")
        for (const A of I.addedNodes) A.tagName === "LINK" && A.rel === "modulepreload" && x(A);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(L) {
    const I = {};
    return (
      L.integrity && (I.integrity = L.integrity),
      L.referrerPolicy && (I.referrerPolicy = L.referrerPolicy),
      L.crossOrigin === "use-credentials"
        ? (I.credentials = "include")
        : L.crossOrigin === "anonymous"
          ? (I.credentials = "omit")
          : (I.credentials = "same-origin"),
      I
    );
  }
  function x(L) {
    if (L.ep) return;
    L.ep = !0;
    const I = c(L);
    fetch(L.href, I);
  }
})();
function Yf(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var Ti = { exports: {} },
  wr = {},
  Li = { exports: {} },
  B = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ra;
function Gf() {
  if (Ra) return B;
  Ra = 1;
  var d = Symbol.for("react.element"),
    v = Symbol.for("react.portal"),
    c = Symbol.for("react.fragment"),
    x = Symbol.for("react.strict_mode"),
    L = Symbol.for("react.profiler"),
    I = Symbol.for("react.provider"),
    A = Symbol.for("react.context"),
    W = Symbol.for("react.forward_ref"),
    F = Symbol.for("react.suspense"),
    H = Symbol.for("react.memo"),
    ee = Symbol.for("react.lazy"),
    Q = Symbol.iterator;
  function G(f) {
    return f === null || typeof f != "object"
      ? null
      : ((f = (Q && f[Q]) || f["@@iterator"]), typeof f == "function" ? f : null);
  }
  var ke = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Ue = Object.assign,
    U = {};
  function K(f, g, V) {
    (this.props = f), (this.context = g), (this.refs = U), (this.updater = V || ke);
  }
  (K.prototype.isReactComponent = {}),
    (K.prototype.setState = function (f, g) {
      if (typeof f != "object" && typeof f != "function" && f != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, f, g, "setState");
    }),
    (K.prototype.forceUpdate = function (f) {
      this.updater.enqueueForceUpdate(this, f, "forceUpdate");
    });
  function et() {}
  et.prototype = K.prototype;
  function Ke(f, g, V) {
    (this.props = f), (this.context = g), (this.refs = U), (this.updater = V || ke);
  }
  var tt = (Ke.prototype = new et());
  (tt.constructor = Ke), Ue(tt, K.prototype), (tt.isPureReactComponent = !0);
  var Ee = Array.isArray,
    nt = Object.prototype.hasOwnProperty,
    Pe = { current: null },
    Le = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ye(f, g, V) {
    var $,
      X = {},
      Z = null,
      te = null;
    if (g != null)
      for ($ in (g.ref !== void 0 && (te = g.ref), g.key !== void 0 && (Z = "" + g.key), g))
        nt.call(g, $) && !Le.hasOwnProperty($) && (X[$] = g[$]);
    var q = arguments.length - 2;
    if (q === 1) X.children = V;
    else if (1 < q) {
      for (var ue = Array(q), Ve = 0; Ve < q; Ve++) ue[Ve] = arguments[Ve + 2];
      X.children = ue;
    }
    if (f && f.defaultProps) for ($ in ((q = f.defaultProps), q)) X[$] === void 0 && (X[$] = q[$]);
    return { $$typeof: d, type: f, key: Z, ref: te, props: X, _owner: Pe.current };
  }
  function zt(f, g) {
    return { $$typeof: d, type: f.type, key: g, ref: f.ref, props: f.props, _owner: f._owner };
  }
  function gt(f) {
    return typeof f == "object" && f !== null && f.$$typeof === d;
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
  var ft = /\/+/g;
  function Ae(f, g) {
    return typeof f == "object" && f !== null && f.key != null ? Gt("" + f.key) : g.toString(36);
  }
  function rt(f, g, V, $, X) {
    var Z = typeof f;
    (Z === "undefined" || Z === "boolean") && (f = null);
    var te = !1;
    if (f === null) te = !0;
    else
      switch (Z) {
        case "string":
        case "number":
          te = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case d:
            case v:
              te = !0;
          }
      }
    if (te)
      return (
        (te = f),
        (X = X(te)),
        (f = $ === "" ? "." + Ae(te, 0) : $),
        Ee(X)
          ? ((V = ""),
            f != null && (V = f.replace(ft, "$&/") + "/"),
            rt(X, g, V, "", function (Ve) {
              return Ve;
            }))
          : X != null &&
            (gt(X) &&
              (X = zt(X, V + (!X.key || (te && te.key === X.key) ? "" : ("" + X.key).replace(ft, "$&/") + "/") + f)),
            g.push(X)),
        1
      );
    if (((te = 0), ($ = $ === "" ? "." : $ + ":"), Ee(f)))
      for (var q = 0; q < f.length; q++) {
        Z = f[q];
        var ue = $ + Ae(Z, q);
        te += rt(Z, g, V, ue, X);
      }
    else if (((ue = G(f)), typeof ue == "function"))
      for (f = ue.call(f), q = 0; !(Z = f.next()).done; )
        (Z = Z.value), (ue = $ + Ae(Z, q++)), (te += rt(Z, g, V, ue, X));
    else if (Z === "object")
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
  function dt(f, g, V) {
    if (f == null) return f;
    var $ = [],
      X = 0;
    return (
      rt(f, $, "", "", function (Z) {
        return g.call(V, Z, X++);
      }),
      $
    );
  }
  function Re(f) {
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
  var ae = { current: null },
    E = { transition: null },
    O = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: E, ReactCurrentOwner: Pe };
  function N() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (B.Children = {
      map: dt,
      forEach: function (f, g, V) {
        dt(
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
          dt(f, function () {
            g++;
          }),
          g
        );
      },
      toArray: function (f) {
        return (
          dt(f, function (g) {
            return g;
          }) || []
        );
      },
      only: function (f) {
        if (!gt(f)) throw Error("React.Children.only expected to receive a single React element child.");
        return f;
      },
    }),
    (B.Component = K),
    (B.Fragment = c),
    (B.Profiler = L),
    (B.PureComponent = Ke),
    (B.StrictMode = x),
    (B.Suspense = F),
    (B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O),
    (B.act = N),
    (B.cloneElement = function (f, g, V) {
      if (f == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
      var $ = Ue({}, f.props),
        X = f.key,
        Z = f.ref,
        te = f._owner;
      if (g != null) {
        if (
          (g.ref !== void 0 && ((Z = g.ref), (te = Pe.current)),
          g.key !== void 0 && (X = "" + g.key),
          f.type && f.type.defaultProps)
        )
          var q = f.type.defaultProps;
        for (ue in g)
          nt.call(g, ue) && !Le.hasOwnProperty(ue) && ($[ue] = g[ue] === void 0 && q !== void 0 ? q[ue] : g[ue]);
      }
      var ue = arguments.length - 2;
      if (ue === 1) $.children = V;
      else if (1 < ue) {
        q = Array(ue);
        for (var Ve = 0; Ve < ue; Ve++) q[Ve] = arguments[Ve + 2];
        $.children = q;
      }
      return { $$typeof: d, type: f.type, key: X, ref: Z, props: $, _owner: te };
    }),
    (B.createContext = function (f) {
      return (
        (f = {
          $$typeof: A,
          _currentValue: f,
          _currentValue2: f,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (f.Provider = { $$typeof: I, _context: f }),
        (f.Consumer = f)
      );
    }),
    (B.createElement = Ye),
    (B.createFactory = function (f) {
      var g = Ye.bind(null, f);
      return (g.type = f), g;
    }),
    (B.createRef = function () {
      return { current: null };
    }),
    (B.forwardRef = function (f) {
      return { $$typeof: W, render: f };
    }),
    (B.isValidElement = gt),
    (B.lazy = function (f) {
      return { $$typeof: ee, _payload: { _status: -1, _result: f }, _init: Re };
    }),
    (B.memo = function (f, g) {
      return { $$typeof: H, type: f, compare: g === void 0 ? null : g };
    }),
    (B.startTransition = function (f) {
      var g = E.transition;
      E.transition = {};
      try {
        f();
      } finally {
        E.transition = g;
      }
    }),
    (B.unstable_act = N),
    (B.useCallback = function (f, g) {
      return ae.current.useCallback(f, g);
    }),
    (B.useContext = function (f) {
      return ae.current.useContext(f);
    }),
    (B.useDebugValue = function () {}),
    (B.useDeferredValue = function (f) {
      return ae.current.useDeferredValue(f);
    }),
    (B.useEffect = function (f, g) {
      return ae.current.useEffect(f, g);
    }),
    (B.useId = function () {
      return ae.current.useId();
    }),
    (B.useImperativeHandle = function (f, g, V) {
      return ae.current.useImperativeHandle(f, g, V);
    }),
    (B.useInsertionEffect = function (f, g) {
      return ae.current.useInsertionEffect(f, g);
    }),
    (B.useLayoutEffect = function (f, g) {
      return ae.current.useLayoutEffect(f, g);
    }),
    (B.useMemo = function (f, g) {
      return ae.current.useMemo(f, g);
    }),
    (B.useReducer = function (f, g, V) {
      return ae.current.useReducer(f, g, V);
    }),
    (B.useRef = function (f) {
      return ae.current.useRef(f);
    }),
    (B.useState = function (f) {
      return ae.current.useState(f);
    }),
    (B.useSyncExternalStore = function (f, g, V) {
      return ae.current.useSyncExternalStore(f, g, V);
    }),
    (B.useTransition = function () {
      return ae.current.useTransition();
    }),
    (B.version = "18.3.1"),
    B
  );
}
var ja;
function Mi() {
  return ja || ((ja = 1), (Li.exports = Gf())), Li.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oa;
function Xf() {
  if (Oa) return wr;
  Oa = 1;
  var d = Mi(),
    v = Symbol.for("react.element"),
    c = Symbol.for("react.fragment"),
    x = Object.prototype.hasOwnProperty,
    L = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    I = { key: !0, ref: !0, __self: !0, __source: !0 };
  function A(W, F, H) {
    var ee,
      Q = {},
      G = null,
      ke = null;
    H !== void 0 && (G = "" + H), F.key !== void 0 && (G = "" + F.key), F.ref !== void 0 && (ke = F.ref);
    for (ee in F) x.call(F, ee) && !I.hasOwnProperty(ee) && (Q[ee] = F[ee]);
    if (W && W.defaultProps) for (ee in ((F = W.defaultProps), F)) Q[ee] === void 0 && (Q[ee] = F[ee]);
    return { $$typeof: v, type: W, key: G, ref: ke, props: Q, _owner: L.current };
  }
  return (wr.Fragment = c), (wr.jsx = A), (wr.jsxs = A), wr;
}
var Ma;
function Zf() {
  return Ma || ((Ma = 1), (Ti.exports = Xf())), Ti.exports;
}
var M = Zf(),
  Qe = Mi();
const Pt = Yf(Qe);
var Rl = {},
  Ri = { exports: {} },
  Fe = {},
  ji = { exports: {} },
  Oi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Da;
function Jf() {
  return (
    Da ||
      ((Da = 1),
      (function (d) {
        function v(E, O) {
          var N = E.length;
          E.push(O);
          e: for (; 0 < N; ) {
            var f = (N - 1) >>> 1,
              g = E[f];
            if (0 < L(g, O)) (E[f] = O), (E[N] = g), (N = f);
            else break e;
          }
        }
        function c(E) {
          return E.length === 0 ? null : E[0];
        }
        function x(E) {
          if (E.length === 0) return null;
          var O = E[0],
            N = E.pop();
          if (N !== O) {
            E[0] = N;
            e: for (var f = 0, g = E.length, V = g >>> 1; f < V; ) {
              var $ = 2 * (f + 1) - 1,
                X = E[$],
                Z = $ + 1,
                te = E[Z];
              if (0 > L(X, N))
                Z < g && 0 > L(te, X) ? ((E[f] = te), (E[Z] = N), (f = Z)) : ((E[f] = X), (E[$] = N), (f = $));
              else if (Z < g && 0 > L(te, N)) (E[f] = te), (E[Z] = N), (f = Z);
              else break e;
            }
          }
          return O;
        }
        function L(E, O) {
          var N = E.sortIndex - O.sortIndex;
          return N !== 0 ? N : E.id - O.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
          var I = performance;
          d.unstable_now = function () {
            return I.now();
          };
        } else {
          var A = Date,
            W = A.now();
          d.unstable_now = function () {
            return A.now() - W;
          };
        }
        var F = [],
          H = [],
          ee = 1,
          Q = null,
          G = 3,
          ke = !1,
          Ue = !1,
          U = !1,
          K = typeof setTimeout == "function" ? setTimeout : null,
          et = typeof clearTimeout == "function" ? clearTimeout : null,
          Ke = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function tt(E) {
          for (var O = c(H); O !== null; ) {
            if (O.callback === null) x(H);
            else if (O.startTime <= E) x(H), (O.sortIndex = O.expirationTime), v(F, O);
            else break;
            O = c(H);
          }
        }
        function Ee(E) {
          if (((U = !1), tt(E), !Ue))
            if (c(F) !== null) (Ue = !0), Re(nt);
            else {
              var O = c(H);
              O !== null && ae(Ee, O.startTime - E);
            }
        }
        function nt(E, O) {
          (Ue = !1), U && ((U = !1), et(Ye), (Ye = -1)), (ke = !0);
          var N = G;
          try {
            for (tt(O), Q = c(F); Q !== null && (!(Q.expirationTime > O) || (E && !Gt())); ) {
              var f = Q.callback;
              if (typeof f == "function") {
                (Q.callback = null), (G = Q.priorityLevel);
                var g = f(Q.expirationTime <= O);
                (O = d.unstable_now()), typeof g == "function" ? (Q.callback = g) : Q === c(F) && x(F), tt(O);
              } else x(F);
              Q = c(F);
            }
            if (Q !== null) var V = !0;
            else {
              var $ = c(H);
              $ !== null && ae(Ee, $.startTime - O), (V = !1);
            }
            return V;
          } finally {
            (Q = null), (G = N), (ke = !1);
          }
        }
        var Pe = !1,
          Le = null,
          Ye = -1,
          zt = 5,
          gt = -1;
        function Gt() {
          return !(d.unstable_now() - gt < zt);
        }
        function ft() {
          if (Le !== null) {
            var E = d.unstable_now();
            gt = E;
            var O = !0;
            try {
              O = Le(!0, E);
            } finally {
              O ? Ae() : ((Pe = !1), (Le = null));
            }
          } else Pe = !1;
        }
        var Ae;
        if (typeof Ke == "function")
          Ae = function () {
            Ke(ft);
          };
        else if (typeof MessageChannel < "u") {
          var rt = new MessageChannel(),
            dt = rt.port2;
          (rt.port1.onmessage = ft),
            (Ae = function () {
              dt.postMessage(null);
            });
        } else
          Ae = function () {
            K(ft, 0);
          };
        function Re(E) {
          (Le = E), Pe || ((Pe = !0), Ae());
        }
        function ae(E, O) {
          Ye = K(function () {
            E(d.unstable_now());
          }, O);
        }
        (d.unstable_IdlePriority = 5),
          (d.unstable_ImmediatePriority = 1),
          (d.unstable_LowPriority = 4),
          (d.unstable_NormalPriority = 3),
          (d.unstable_Profiling = null),
          (d.unstable_UserBlockingPriority = 2),
          (d.unstable_cancelCallback = function (E) {
            E.callback = null;
          }),
          (d.unstable_continueExecution = function () {
            Ue || ke || ((Ue = !0), Re(nt));
          }),
          (d.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (zt = 0 < E ? Math.floor(1e3 / E) : 5);
          }),
          (d.unstable_getCurrentPriorityLevel = function () {
            return G;
          }),
          (d.unstable_getFirstCallbackNode = function () {
            return c(F);
          }),
          (d.unstable_next = function (E) {
            switch (G) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = G;
            }
            var N = G;
            G = O;
            try {
              return E();
            } finally {
              G = N;
            }
          }),
          (d.unstable_pauseExecution = function () {}),
          (d.unstable_requestPaint = function () {}),
          (d.unstable_runWithPriority = function (E, O) {
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
            var N = G;
            G = E;
            try {
              return O();
            } finally {
              G = N;
            }
          }),
          (d.unstable_scheduleCallback = function (E, O, N) {
            var f = d.unstable_now();
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
              (E = { id: ee++, callback: O, priorityLevel: E, startTime: N, expirationTime: g, sortIndex: -1 }),
              N > f
                ? ((E.sortIndex = N),
                  v(H, E),
                  c(F) === null && E === c(H) && (U ? (et(Ye), (Ye = -1)) : (U = !0), ae(Ee, N - f)))
                : ((E.sortIndex = g), v(F, E), Ue || ke || ((Ue = !0), Re(nt))),
              E
            );
          }),
          (d.unstable_shouldYield = Gt),
          (d.unstable_wrapCallback = function (E) {
            var O = G;
            return function () {
              var N = G;
              G = O;
              try {
                return E.apply(this, arguments);
              } finally {
                G = N;
              }
            };
          });
      })(Oi)),
    Oi
  );
}
var Ia;
function qf() {
  return Ia || ((Ia = 1), (ji.exports = Jf())), ji.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fa;
function bf() {
  if (Fa) return Fe;
  Fa = 1;
  var d = Mi(),
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
  var x = new Set(),
    L = {};
  function I(e, t) {
    A(e, t), A(e + "Capture", t);
  }
  function A(e, t) {
    for (L[e] = t, e = 0; e < t.length; e++) x.add(t[e]);
  }
  var W = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    F = Object.prototype.hasOwnProperty,
    H =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ee = {},
    Q = {};
  function G(e) {
    return F.call(Q, e) ? !0 : F.call(ee, e) ? !1 : H.test(e) ? (Q[e] = !0) : ((ee[e] = !0), !1);
  }
  function ke(e, t, n, r) {
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
  function Ue(e, t, n, r) {
    if (t === null || typeof t > "u" || ke(e, t, n, r)) return !0;
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
  function U(e, t, n, r, l, u, i) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = u),
      (this.removeEmptyString = i);
  }
  var K = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      K[e] = new U(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      K[t] = new U(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
      K[e] = new U(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
      K[e] = new U(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        K[e] = new U(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      K[e] = new U(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      K[e] = new U(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      K[e] = new U(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      K[e] = new U(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var et = /[\-:]([a-z])/g;
  function Ke(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(et, Ke);
      K[t] = new U(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
      var t = e.replace(et, Ke);
      K[t] = new U(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(et, Ke);
      K[t] = new U(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      K[e] = new U(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (K.xlinkHref = new U("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      K[e] = new U(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function tt(e, t, n, r) {
    var l = K.hasOwnProperty(t) ? K[t] : null;
    (l !== null
      ? l.type !== 0
      : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
      (Ue(t, n, l, r) && (n = null),
      r || l === null
        ? G(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
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
  var Ee = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    nt = Symbol.for("react.element"),
    Pe = Symbol.for("react.portal"),
    Le = Symbol.for("react.fragment"),
    Ye = Symbol.for("react.strict_mode"),
    zt = Symbol.for("react.profiler"),
    gt = Symbol.for("react.provider"),
    Gt = Symbol.for("react.context"),
    ft = Symbol.for("react.forward_ref"),
    Ae = Symbol.for("react.suspense"),
    rt = Symbol.for("react.suspense_list"),
    dt = Symbol.for("react.memo"),
    Re = Symbol.for("react.lazy"),
    ae = Symbol.for("react.offscreen"),
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
  function $(e, t) {
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
  function X(e) {
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
        return (e = $(e.type, !1)), e;
      case 11:
        return (e = $(e.type.render, !1)), e;
      case 1:
        return (e = $(e.type, !0)), e;
      default:
        return "";
    }
  }
  function Z(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Le:
        return "Fragment";
      case Pe:
        return "Portal";
      case zt:
        return "Profiler";
      case Ye:
        return "StrictMode";
      case Ae:
        return "Suspense";
      case rt:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Gt:
          return (e.displayName || "Context") + ".Consumer";
        case gt:
          return (e._context.displayName || "Context") + ".Provider";
        case ft:
          var t = e.render;
          return (
            (e = e.displayName),
            e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case dt:
          return (t = e.displayName || null), t !== null ? t : Z(e.type) || "Memo";
        case Re:
          (t = e._payload), (e = e._init);
          try {
            return Z(e(t));
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
        return Z(t);
      case 8:
        return t === Ye ? "StrictMode" : "Mode";
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
  function q(e) {
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
  function Ve(e) {
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
    e._valueTracker || (e._valueTracker = Ve(e));
  }
  function Di(e) {
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
  function Il(e, t) {
    var n = t.checked;
    return N({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Ii(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    (n = q(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
      });
  }
  function Fi(e, t) {
    (t = t.checked), t != null && tt(e, "checked", t, !1);
  }
  function Fl(e, t) {
    Fi(e, t);
    var n = q(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ul(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ul(e, t.type, q(t.defaultValue)),
      t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Ui(e, t, n) {
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
  function Ul(e, t, n) {
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
      for (n = "" + q(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          (e[l].selected = !0), r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Al(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(c(91));
    return N({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Ai(e, t) {
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
    e._wrapperState = { initialValue: q(n) };
  }
  function Vi(e, t) {
    var n = q(t.value),
      r = q(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r);
  }
  function Hi(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Bi(e) {
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
      ? Bi(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Cr,
    Wi = (function (e) {
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
          Cr = Cr || document.createElement("div"),
            Cr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Cr.firstChild;
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
  function $i(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (In.hasOwnProperty(e) && In[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Qi(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          l = $i(n, t[n], r);
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
  function Hl(e, t) {
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
  function Bl(e, t) {
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
  var Wl = null;
  function $l(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ql = null,
    cn = null,
    fn = null;
  function Ki(e) {
    if ((e = lr(e))) {
      if (typeof Ql != "function") throw Error(c(280));
      var t = e.stateNode;
      t && ((t = Kr(t)), Ql(e.stateNode, e.type, t));
    }
  }
  function Yi(e) {
    cn ? (fn ? fn.push(e) : (fn = [e])) : (cn = e);
  }
  function Gi() {
    if (cn) {
      var e = cn,
        t = fn;
      if (((fn = cn = null), Ki(e), t)) for (e = 0; e < t.length; e++) Ki(t[e]);
    }
  }
  function Xi(e, t) {
    return e(t);
  }
  function Zi() {}
  var Kl = !1;
  function Ji(e, t, n) {
    if (Kl) return e(t, n);
    Kl = !0;
    try {
      return Xi(e, t, n);
    } finally {
      (Kl = !1), (cn !== null || fn !== null) && (Zi(), Gi());
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
  var Yl = !1;
  if (W)
    try {
      var Un = {};
      Object.defineProperty(Un, "passive", {
        get: function () {
          Yl = !0;
        },
      }),
        window.addEventListener("test", Un, Un),
        window.removeEventListener("test", Un, Un);
    } catch {
      Yl = !1;
    }
  function Za(e, t, n, r, l, u, i, o, s) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (w) {
      this.onError(w);
    }
  }
  var An = !1,
    xr = null,
    _r = !1,
    Gl = null,
    Ja = {
      onError: function (e) {
        (An = !0), (xr = e);
      },
    };
  function qa(e, t, n, r, l, u, i, o, s) {
    (An = !1), (xr = null), Za.apply(Ja, arguments);
  }
  function ba(e, t, n, r, l, u, i, o, s) {
    if ((qa.apply(this, arguments), An)) {
      if (An) {
        var h = xr;
        (An = !1), (xr = null);
      } else throw Error(c(198));
      _r || ((_r = !0), (Gl = h));
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
  function qi(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
  }
  function bi(e) {
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
          if (u === n) return bi(l), e;
          if (u === r) return bi(l), t;
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
  function eo(e) {
    return (e = ec(e)), e !== null ? to(e) : null;
  }
  function to(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = to(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var no = v.unstable_scheduleCallback,
    ro = v.unstable_cancelCallback,
    tc = v.unstable_shouldYield,
    nc = v.unstable_requestPaint,
    fe = v.unstable_now,
    rc = v.unstable_getCurrentPriorityLevel,
    Xl = v.unstable_ImmediatePriority,
    lo = v.unstable_UserBlockingPriority,
    Nr = v.unstable_NormalPriority,
    lc = v.unstable_LowPriority,
    uo = v.unstable_IdlePriority,
    Pr = null,
    pt = null;
  function uc(e) {
    if (pt && typeof pt.onCommitFiberRoot == "function")
      try {
        pt.onCommitFiberRoot(Pr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var lt = Math.clz32 ? Math.clz32 : sc,
    ic = Math.log,
    oc = Math.LN2;
  function sc(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ic(e) / oc) | 0)) | 0;
  }
  var zr = 64,
    Tr = 4194304;
  function Vn(e) {
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
      o !== 0 ? (r = Vn(o)) : ((u &= i), u !== 0 && (r = Vn(u)));
    } else (i = n & ~l), i !== 0 ? (r = Vn(i)) : u !== 0 && (r = Vn(u));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & l) && ((l = r & -r), (u = t & -t), l >= u || (l === 16 && (u & 4194240) !== 0)))
      return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; ) (n = 31 - lt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
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
      var i = 31 - lt(u),
        o = 1 << i,
        s = l[i];
      s === -1 ? (!(o & n) || o & r) && (l[i] = ac(o, t)) : s <= t && (e.expiredLanes |= o), (u &= ~o);
    }
  }
  function Zl(e) {
    return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function io() {
    var e = zr;
    return (zr <<= 1), !(zr & 4194240) && (zr = 64), e;
  }
  function Jl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Hn(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - lt(t)),
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
      var l = 31 - lt(n),
        u = 1 << l;
      (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~u);
    }
  }
  function ql(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - lt(n),
        l = 1 << r;
      (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
  }
  var b = 0;
  function oo(e) {
    return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
  }
  var so,
    bl,
    ao,
    co,
    fo,
    eu = !1,
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
  function po(e, t) {
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
        t !== null && ((t = lr(t)), t !== null && bl(t)),
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
  function mo(e) {
    var t = Zt(e.target);
    if (t !== null) {
      var n = Xt(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = qi(n)), t !== null)) {
            (e.blockedOn = t),
              fo(e.priority, function () {
                ao(n);
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
      var n = nu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        (Wl = r), n.target.dispatchEvent(r), (Wl = null);
      } else return (t = lr(n)), t !== null && bl(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function ho(e, t, n) {
    jr(e) && n.delete(t);
  }
  function mc() {
    (eu = !1),
      Tt !== null && jr(Tt) && (Tt = null),
      Lt !== null && jr(Lt) && (Lt = null),
      Rt !== null && jr(Rt) && (Rt = null),
      Bn.forEach(ho),
      Wn.forEach(ho);
  }
  function Qn(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null), eu || ((eu = !0), v.unstable_scheduleCallback(v.unstable_NormalPriority, mc)));
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
    for (; 0 < jt.length && ((n = jt[0]), n.blockedOn === null); ) mo(n), n.blockedOn === null && jt.shift();
  }
  var dn = Ee.ReactCurrentBatchConfig,
    Or = !0;
  function hc(e, t, n, r) {
    var l = b,
      u = dn.transition;
    dn.transition = null;
    try {
      (b = 1), tu(e, t, n, r);
    } finally {
      (b = l), (dn.transition = u);
    }
  }
  function vc(e, t, n, r) {
    var l = b,
      u = dn.transition;
    dn.transition = null;
    try {
      (b = 4), tu(e, t, n, r);
    } finally {
      (b = l), (dn.transition = u);
    }
  }
  function tu(e, t, n, r) {
    if (Or) {
      var l = nu(e, t, n, r);
      if (l === null) wu(e, t, r, Mr, n), po(e, r);
      else if (pc(l, e, t, n, r)) r.stopPropagation();
      else if ((po(e, r), t & 4 && -1 < dc.indexOf(e))) {
        for (; l !== null; ) {
          var u = lr(l);
          if ((u !== null && so(u), (u = nu(e, t, n, r)), u === null && wu(e, t, r, Mr, n), u === l)) break;
          l = u;
        }
        l !== null && r.stopPropagation();
      } else wu(e, t, r, null, n);
    }
  }
  var Mr = null;
  function nu(e, t, n, r) {
    if (((Mr = null), (e = $l(r)), (e = Zt(e)), e !== null))
      if (((t = Xt(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = qi(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (Mr = e), null;
  }
  function vo(e) {
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
          case Xl:
            return 1;
          case lo:
            return 4;
          case Nr:
          case lc:
            return 16;
          case uo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ot = null,
    ru = null,
    Dr = null;
  function yo() {
    if (Dr) return Dr;
    var e,
      t = ru,
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
  function go() {
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
        (this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Fr : go),
        (this.isPropagationStopped = go),
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
    lu = He(pn),
    Yn = N({}, pn, { view: 0, detail: 0 }),
    yc = He(Yn),
    uu,
    iu,
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
      getModifierState: su,
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
                ? ((uu = e.screenX - Gn.screenX), (iu = e.screenY - Gn.screenY))
                : (iu = uu = 0),
              (Gn = e)),
            uu);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : iu;
      },
    }),
    wo = He(Ur),
    gc = N({}, Ur, { dataTransfer: 0 }),
    wc = He(gc),
    Sc = N({}, Yn, { relatedTarget: 0 }),
    ou = He(Sc),
    kc = N({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ec = He(kc),
    Cc = N({}, pn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    xc = He(Cc),
    _c = N({}, pn, { data: 0 }),
    So = He(_c),
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
  function su() {
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
      getModifierState: su,
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
    ko = He(jc),
    Oc = N({}, Yn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: su,
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
    Ac = [9, 13, 27, 32],
    au = W && "CompositionEvent" in window,
    Xn = null;
  W && "documentMode" in document && (Xn = document.documentMode);
  var Vc = W && "TextEvent" in window && !Xn,
    Eo = W && (!au || (Xn && 8 < Xn && 11 >= Xn)),
    Co = " ",
    xo = !1;
  function _o(e, t) {
    switch (e) {
      case "keyup":
        return Ac.indexOf(t.keyCode) !== -1;
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
  function No(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var mn = !1;
  function Hc(e, t) {
    switch (e) {
      case "compositionend":
        return No(t);
      case "keypress":
        return t.which !== 32 ? null : ((xo = !0), Co);
      case "textInput":
        return (e = t.data), e === Co && xo ? null : e;
      default:
        return null;
    }
  }
  function Bc(e, t) {
    if (mn)
      return e === "compositionend" || (!au && _o(e, t)) ? ((e = yo()), (Dr = ru = Ot = null), (mn = !1), e) : null;
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
        return Eo && t.locale !== "ko" ? null : t.data;
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
  function Po(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Wc[e.type] : t === "textarea";
  }
  function zo(e, t, n, r) {
    Yi(r),
      (t = Wr(t, "onChange")),
      0 < t.length && ((n = new lu("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
  }
  var Zn = null,
    Jn = null;
  function $c(e) {
    Ko(e, 0);
  }
  function Ar(e) {
    var t = wn(e);
    if (Di(t)) return e;
  }
  function Qc(e, t) {
    if (e === "change") return t;
  }
  var To = !1;
  if (W) {
    var cu;
    if (W) {
      var fu = "oninput" in document;
      if (!fu) {
        var Lo = document.createElement("div");
        Lo.setAttribute("oninput", "return;"), (fu = typeof Lo.oninput == "function");
      }
      cu = fu;
    } else cu = !1;
    To = cu && (!document.documentMode || 9 < document.documentMode);
  }
  function Ro() {
    Zn && (Zn.detachEvent("onpropertychange", jo), (Jn = Zn = null));
  }
  function jo(e) {
    if (e.propertyName === "value" && Ar(Jn)) {
      var t = [];
      zo(t, Jn, e, $l(e)), Ji($c, t);
    }
  }
  function Kc(e, t, n) {
    e === "focusin" ? (Ro(), (Zn = t), (Jn = n), Zn.attachEvent("onpropertychange", jo)) : e === "focusout" && Ro();
  }
  function Yc(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ar(Jn);
  }
  function Gc(e, t) {
    if (e === "click") return Ar(t);
  }
  function Xc(e, t) {
    if (e === "input" || e === "change") return Ar(t);
  }
  function Zc(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ut = typeof Object.is == "function" ? Object.is : Zc;
  function qn(e, t) {
    if (ut(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!F.call(t, l) || !ut(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Oo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Mo(e, t) {
    var n = Oo(e);
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
      n = Oo(n);
    }
  }
  function Do(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Do(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Io() {
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
  function du(e) {
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
    var t = Io(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Do(n.ownerDocument.documentElement, n)) {
      if (r !== null && du(n)) {
        if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
          (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
        else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
          e = e.getSelection();
          var l = n.textContent.length,
            u = Math.min(r.start, l);
          (r = r.end === void 0 ? u : Math.min(r.end, l)),
            !e.extend && u > r && ((l = r), (r = u), (u = l)),
            (l = Mo(n, u));
          var i = Mo(n, r);
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
  var qc = W && "documentMode" in document && 11 >= document.documentMode,
    hn = null,
    pu = null,
    bn = null,
    mu = !1;
  function Fo(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    mu ||
      hn == null ||
      hn !== Er(r) ||
      ((r = hn),
      "selectionStart" in r && du(r)
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
        (r = Wr(pu, "onSelect")),
        0 < r.length &&
          ((t = new lu("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = hn))));
  }
  function Vr(e, t) {
    var n = {};
    return (n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n;
  }
  var vn = {
      animationend: Vr("Animation", "AnimationEnd"),
      animationiteration: Vr("Animation", "AnimationIteration"),
      animationstart: Vr("Animation", "AnimationStart"),
      transitionend: Vr("Transition", "TransitionEnd"),
    },
    hu = {},
    Uo = {};
  W &&
    ((Uo = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete vn.animationend.animation, delete vn.animationiteration.animation, delete vn.animationstart.animation),
    "TransitionEvent" in window || delete vn.transitionend.transition);
  function Hr(e) {
    if (hu[e]) return hu[e];
    if (!vn[e]) return e;
    var t = vn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Uo) return (hu[e] = t[n]);
    return e;
  }
  var Ao = Hr("animationend"),
    Vo = Hr("animationiteration"),
    Ho = Hr("animationstart"),
    Bo = Hr("transitionend"),
    Wo = new Map(),
    $o =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function Mt(e, t) {
    Wo.set(e, t), I(t, [e]);
  }
  for (var vu = 0; vu < $o.length; vu++) {
    var yu = $o[vu],
      bc = yu.toLowerCase(),
      ef = yu[0].toUpperCase() + yu.slice(1);
    Mt(bc, "on" + ef);
  }
  Mt(Ao, "onAnimationEnd"),
    Mt(Vo, "onAnimationIteration"),
    Mt(Ho, "onAnimationStart"),
    Mt("dblclick", "onDoubleClick"),
    Mt("focusin", "onFocus"),
    Mt("focusout", "onBlur"),
    Mt(Bo, "onTransitionEnd"),
    A("onMouseEnter", ["mouseout", "mouseover"]),
    A("onMouseLeave", ["mouseout", "mouseover"]),
    A("onPointerEnter", ["pointerout", "pointerover"]),
    A("onPointerLeave", ["pointerout", "pointerover"]),
    I("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    I("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    I("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    I("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    I("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    I("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var er =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    tf = new Set("cancel close invalid load scroll toggle".split(" ").concat(er));
  function Qo(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), ba(r, t, void 0, e), (e.currentTarget = null);
  }
  function Ko(e, t) {
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
            Qo(l, o, h), (u = s);
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
            Qo(l, o, h), (u = s);
          }
      }
    }
    if (_r) throw ((e = Gl), (_r = !1), (Gl = null), e);
  }
  function re(e, t) {
    var n = t[_u];
    n === void 0 && (n = t[_u] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Yo(t, e, 2, !1), n.add(r));
  }
  function gu(e, t, n) {
    var r = 0;
    t && (r |= 4), Yo(n, e, r, t);
  }
  var Br = "_reactListening" + Math.random().toString(36).slice(2);
  function tr(e) {
    if (!e[Br]) {
      (e[Br] = !0),
        x.forEach(function (n) {
          n !== "selectionchange" && (tf.has(n) || gu(n, !1, e), gu(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Br] || ((t[Br] = !0), gu("selectionchange", !1, t));
    }
  }
  function Yo(e, t, n, r) {
    switch (vo(t)) {
      case 1:
        var l = hc;
        break;
      case 4:
        l = vc;
        break;
      default:
        l = tu;
    }
    (n = l.bind(null, t, n, e)),
      (l = void 0),
      !Yl || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1);
  }
  function wu(e, t, n, r, l) {
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
    Ji(function () {
      var h = u,
        w = $l(n),
        S = [];
      e: {
        var y = Wo.get(e);
        if (y !== void 0) {
          var C = lu,
            P = e;
          switch (e) {
            case "keypress":
              if (Ir(n) === 0) break e;
            case "keydown":
            case "keyup":
              C = Rc;
              break;
            case "focusin":
              (P = "focus"), (C = ou);
              break;
            case "focusout":
              (P = "blur"), (C = ou);
              break;
            case "beforeblur":
            case "afterblur":
              C = ou;
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
              C = wo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              C = wc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              C = Mc;
              break;
            case Ao:
            case Vo:
            case Ho:
              C = Ec;
              break;
            case Bo:
              C = Ic;
              break;
            case "scroll":
              C = yc;
              break;
            case "wheel":
              C = Uc;
              break;
            case "copy":
            case "cut":
            case "paste":
              C = xc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              C = ko;
          }
          var z = (t & 4) !== 0,
            de = !z && e === "scroll",
            p = z ? (y !== null ? y + "Capture" : null) : y;
          z = [];
          for (var a = h, m; a !== null; ) {
            m = a;
            var k = m.stateNode;
            if (
              (m.tag === 5 && k !== null && ((m = k), p !== null && ((k = Fn(a, p)), k != null && z.push(nr(a, k, m)))),
              de)
            )
              break;
            a = a.return;
          }
          0 < z.length && ((y = new C(y, P, null, n, w)), S.push({ event: y, listeners: z }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((y = e === "mouseover" || e === "pointerover"),
            (C = e === "mouseout" || e === "pointerout"),
            y && n !== Wl && (P = n.relatedTarget || n.fromElement) && (Zt(P) || P[wt]))
          )
            break e;
          if (
            (C || y) &&
            ((y = w.window === w ? w : (y = w.ownerDocument) ? y.defaultView || y.parentWindow : window),
            C
              ? ((P = n.relatedTarget || n.toElement),
                (C = h),
                (P = P ? Zt(P) : null),
                P !== null && ((de = Xt(P)), P !== de || (P.tag !== 5 && P.tag !== 6)) && (P = null))
              : ((C = null), (P = h)),
            C !== P)
          ) {
            if (
              ((z = wo),
              (k = "onMouseLeave"),
              (p = "onMouseEnter"),
              (a = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((z = ko), (k = "onPointerLeave"), (p = "onPointerEnter"), (a = "pointer")),
              (de = C == null ? y : wn(C)),
              (m = P == null ? y : wn(P)),
              (y = new z(k, a + "leave", C, n, w)),
              (y.target = de),
              (y.relatedTarget = m),
              (k = null),
              Zt(w) === h && ((z = new z(p, a + "enter", P, n, w)), (z.target = m), (z.relatedTarget = de), (k = z)),
              (de = k),
              C && P)
            )
              t: {
                for (z = C, p = P, a = 0, m = z; m; m = yn(m)) a++;
                for (m = 0, k = p; k; k = yn(k)) m++;
                for (; 0 < a - m; ) (z = yn(z)), a--;
                for (; 0 < m - a; ) (p = yn(p)), m--;
                for (; a--; ) {
                  if (z === p || (p !== null && z === p.alternate)) break t;
                  (z = yn(z)), (p = yn(p));
                }
                z = null;
              }
            else z = null;
            C !== null && Go(S, y, C, z, !1), P !== null && de !== null && Go(S, de, P, z, !0);
          }
        }
        e: {
          if (
            ((y = h ? wn(h) : window),
            (C = y.nodeName && y.nodeName.toLowerCase()),
            C === "select" || (C === "input" && y.type === "file"))
          )
            var T = Qc;
          else if (Po(y))
            if (To) T = Xc;
            else {
              T = Yc;
              var R = Kc;
            }
          else
            (C = y.nodeName) &&
              C.toLowerCase() === "input" &&
              (y.type === "checkbox" || y.type === "radio") &&
              (T = Gc);
          if (T && (T = T(e, h))) {
            zo(S, T, n, w);
            break e;
          }
          R && R(e, y, h),
            e === "focusout" &&
              (R = y._wrapperState) &&
              R.controlled &&
              y.type === "number" &&
              Ul(y, "number", y.value);
        }
        switch (((R = h ? wn(h) : window), e)) {
          case "focusin":
            (Po(R) || R.contentEditable === "true") && ((hn = R), (pu = h), (bn = null));
            break;
          case "focusout":
            bn = pu = hn = null;
            break;
          case "mousedown":
            mu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (mu = !1), Fo(S, n, w);
            break;
          case "selectionchange":
            if (qc) break;
          case "keydown":
          case "keyup":
            Fo(S, n, w);
        }
        var j;
        if (au)
          e: {
            switch (e) {
              case "compositionstart":
                var D = "onCompositionStart";
                break e;
              case "compositionend":
                D = "onCompositionEnd";
                break e;
              case "compositionupdate":
                D = "onCompositionUpdate";
                break e;
            }
            D = void 0;
          }
        else
          mn
            ? _o(e, n) && (D = "onCompositionEnd")
            : e === "keydown" && n.keyCode === 229 && (D = "onCompositionStart");
        D &&
          (Eo &&
            n.locale !== "ko" &&
            (mn || D !== "onCompositionStart"
              ? D === "onCompositionEnd" && mn && (j = yo())
              : ((Ot = w), (ru = "value" in Ot ? Ot.value : Ot.textContent), (mn = !0))),
          (R = Wr(h, D)),
          0 < R.length &&
            ((D = new So(D, e, null, n, w)),
            S.push({ event: D, listeners: R }),
            j ? (D.data = j) : ((j = No(n)), j !== null && (D.data = j)))),
          (j = Vc ? Hc(e, n) : Bc(e, n)) &&
            ((h = Wr(h, "onBeforeInput")),
            0 < h.length &&
              ((w = new So("onBeforeInput", "beforeinput", null, n, w)),
              S.push({ event: w, listeners: h }),
              (w.data = j)));
      }
      Ko(S, t);
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
  function Go(e, t, n, r, l) {
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
  function Xo(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        nf,
        `
`
      )
      .replace(rf, "");
  }
  function $r(e, t, n) {
    if (((t = Xo(t)), Xo(e) !== t && n)) throw Error(c(425));
  }
  function Qr() {}
  var Su = null,
    ku = null;
  function Eu(e, t) {
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
  var Cu = typeof setTimeout == "function" ? setTimeout : void 0,
    lf = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zo = typeof Promise == "function" ? Promise : void 0,
    uf =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zo < "u"
          ? function (e) {
              return Zo.resolve(null).then(e).catch(of);
            }
          : Cu;
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
  function Jo(e) {
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
    mt = "__reactFiber$" + gn,
    rr = "__reactProps$" + gn,
    wt = "__reactContainer$" + gn,
    _u = "__reactEvents$" + gn,
    sf = "__reactListeners$" + gn,
    af = "__reactHandles$" + gn;
  function Zt(e) {
    var t = e[mt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[wt] || n[mt])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Jo(e); e !== null; ) {
            if ((n = e[mt])) return n;
            e = Jo(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function lr(e) {
    return (e = e[mt] || e[wt]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e;
  }
  function wn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(c(33));
  }
  function Kr(e) {
    return e[rr] || null;
  }
  var Nu = [],
    Sn = -1;
  function It(e) {
    return { current: e };
  }
  function le(e) {
    0 > Sn || ((e.current = Nu[Sn]), (Nu[Sn] = null), Sn--);
  }
  function ne(e, t) {
    Sn++, (Nu[Sn] = e.current), (e.current = t);
  }
  var Ft = {},
    Ce = It(Ft),
    je = It(!1),
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
  function Oe(e) {
    return (e = e.childContextTypes), e != null;
  }
  function Yr() {
    le(je), le(Ce);
  }
  function qo(e, t, n) {
    if (Ce.current !== Ft) throw Error(c(168));
    ne(Ce, t), ne(je, n);
  }
  function bo(e, t, n) {
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
      ne(je, je.current),
      !0
    );
  }
  function es(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(c(169));
    n ? ((e = bo(e, t, Jt)), (r.__reactInternalMemoizedMergedChildContext = e), le(je), le(Ce), ne(Ce, e)) : le(je),
      ne(je, n);
  }
  var St = null,
    Xr = !1,
    Pu = !1;
  function ts(e) {
    St === null ? (St = [e]) : St.push(e);
  }
  function cf(e) {
    (Xr = !0), ts(e);
  }
  function Ut() {
    if (!Pu && St !== null) {
      Pu = !0;
      var e = 0,
        t = b;
      try {
        var n = St;
        for (b = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        (St = null), (Xr = !1);
      } catch (l) {
        throw (St !== null && (St = St.slice(e + 1)), no(Xl, Ut), l);
      } finally {
        (b = t), (Pu = !1);
      }
    }
    return null;
  }
  var En = [],
    Cn = 0,
    Zr = null,
    Jr = 0,
    Ge = [],
    Xe = 0,
    qt = null,
    kt = 1,
    Et = "";
  function bt(e, t) {
    (En[Cn++] = Jr), (En[Cn++] = Zr), (Zr = e), (Jr = t);
  }
  function ns(e, t, n) {
    (Ge[Xe++] = kt), (Ge[Xe++] = Et), (Ge[Xe++] = qt), (qt = e);
    var r = kt;
    e = Et;
    var l = 32 - lt(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var u = 32 - lt(t) + l;
    if (30 < u) {
      var i = l - (l % 5);
      (u = (r & ((1 << i) - 1)).toString(32)),
        (r >>= i),
        (l -= i),
        (kt = (1 << (32 - lt(t) + l)) | (n << l) | r),
        (Et = u + e);
    } else (kt = (1 << u) | (n << l) | r), (Et = e);
  }
  function zu(e) {
    e.return !== null && (bt(e, 1), ns(e, 1, 0));
  }
  function Tu(e) {
    for (; e === Zr; ) (Zr = En[--Cn]), (En[Cn] = null), (Jr = En[--Cn]), (En[Cn] = null);
    for (; e === qt; )
      (qt = Ge[--Xe]), (Ge[Xe] = null), (Et = Ge[--Xe]), (Ge[Xe] = null), (kt = Ge[--Xe]), (Ge[Xe] = null);
  }
  var Be = null,
    We = null,
    ie = !1,
    it = null;
  function rs(e, t) {
    var n = be(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function ls(e, t) {
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
              (n = be(18, null, null, 0)),
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
  function Lu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Ru(e) {
    if (ie) {
      var t = We;
      if (t) {
        var n = t;
        if (!ls(e, t)) {
          if (Lu(e)) throw Error(c(418));
          t = Dt(n.nextSibling);
          var r = Be;
          t && ls(e, t) ? rs(r, n) : ((e.flags = (e.flags & -4097) | 2), (ie = !1), (Be = e));
        }
      } else {
        if (Lu(e)) throw Error(c(418));
        (e.flags = (e.flags & -4097) | 2), (ie = !1), (Be = e);
      }
    }
  }
  function us(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Be = e;
  }
  function qr(e) {
    if (e !== Be) return !1;
    if (!ie) return us(e), (ie = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type), (t = t !== "head" && t !== "body" && !Eu(e.type, e.memoizedProps))),
      t && (t = We))
    ) {
      if (Lu(e)) throw (is(), Error(c(418)));
      for (; t; ) rs(e, t), (t = Dt(t.nextSibling));
    }
    if ((us(e), e.tag === 13)) {
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
  function is() {
    for (var e = We; e; ) e = Dt(e.nextSibling);
  }
  function xn() {
    (We = Be = null), (ie = !1);
  }
  function ju(e) {
    it === null ? (it = [e]) : it.push(e);
  }
  var ff = Ee.ReactCurrentBatchConfig;
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
  function os(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ss(e) {
    function t(p, a) {
      if (e) {
        var m = p.deletions;
        m === null ? ((p.deletions = [a]), (p.flags |= 16)) : m.push(a);
      }
    }
    function n(p, a) {
      if (!e) return null;
      for (; a !== null; ) t(p, a), (a = a.sibling);
      return null;
    }
    function r(p, a) {
      for (p = new Map(); a !== null; ) a.key !== null ? p.set(a.key, a) : p.set(a.index, a), (a = a.sibling);
      return p;
    }
    function l(p, a) {
      return (p = Kt(p, a)), (p.index = 0), (p.sibling = null), p;
    }
    function u(p, a, m) {
      return (
        (p.index = m),
        e
          ? ((m = p.alternate), m !== null ? ((m = m.index), m < a ? ((p.flags |= 2), a) : m) : ((p.flags |= 2), a))
          : ((p.flags |= 1048576), a)
      );
    }
    function i(p) {
      return e && p.alternate === null && (p.flags |= 2), p;
    }
    function o(p, a, m, k) {
      return a === null || a.tag !== 6
        ? ((a = Ci(m, p.mode, k)), (a.return = p), a)
        : ((a = l(a, m)), (a.return = p), a);
    }
    function s(p, a, m, k) {
      var T = m.type;
      return T === Le
        ? w(p, a, m.props.children, k, m.key)
        : a !== null &&
            (a.elementType === T || (typeof T == "object" && T !== null && T.$$typeof === Re && os(T) === a.type))
          ? ((k = l(a, m.props)), (k.ref = ur(p, a, m)), (k.return = p), k)
          : ((k = Cl(m.type, m.key, m.props, null, p.mode, k)), (k.ref = ur(p, a, m)), (k.return = p), k);
    }
    function h(p, a, m, k) {
      return a === null ||
        a.tag !== 4 ||
        a.stateNode.containerInfo !== m.containerInfo ||
        a.stateNode.implementation !== m.implementation
        ? ((a = xi(m, p.mode, k)), (a.return = p), a)
        : ((a = l(a, m.children || [])), (a.return = p), a);
    }
    function w(p, a, m, k, T) {
      return a === null || a.tag !== 7
        ? ((a = sn(m, p.mode, k, T)), (a.return = p), a)
        : ((a = l(a, m)), (a.return = p), a);
    }
    function S(p, a, m) {
      if ((typeof a == "string" && a !== "") || typeof a == "number")
        return (a = Ci("" + a, p.mode, m)), (a.return = p), a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case nt:
            return (m = Cl(a.type, a.key, a.props, null, p.mode, m)), (m.ref = ur(p, null, a)), (m.return = p), m;
          case Pe:
            return (a = xi(a, p.mode, m)), (a.return = p), a;
          case Re:
            var k = a._init;
            return S(p, k(a._payload), m);
        }
        if (Mn(a) || O(a)) return (a = sn(a, p.mode, m, null)), (a.return = p), a;
        br(p, a);
      }
      return null;
    }
    function y(p, a, m, k) {
      var T = a !== null ? a.key : null;
      if ((typeof m == "string" && m !== "") || typeof m == "number") return T !== null ? null : o(p, a, "" + m, k);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case nt:
            return m.key === T ? s(p, a, m, k) : null;
          case Pe:
            return m.key === T ? h(p, a, m, k) : null;
          case Re:
            return (T = m._init), y(p, a, T(m._payload), k);
        }
        if (Mn(m) || O(m)) return T !== null ? null : w(p, a, m, k, null);
        br(p, m);
      }
      return null;
    }
    function C(p, a, m, k, T) {
      if ((typeof k == "string" && k !== "") || typeof k == "number") return (p = p.get(m) || null), o(a, p, "" + k, T);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case nt:
            return (p = p.get(k.key === null ? m : k.key) || null), s(a, p, k, T);
          case Pe:
            return (p = p.get(k.key === null ? m : k.key) || null), h(a, p, k, T);
          case Re:
            var R = k._init;
            return C(p, a, m, R(k._payload), T);
        }
        if (Mn(k) || O(k)) return (p = p.get(m) || null), w(a, p, k, T, null);
        br(a, k);
      }
      return null;
    }
    function P(p, a, m, k) {
      for (var T = null, R = null, j = a, D = (a = 0), ge = null; j !== null && D < m.length; D++) {
        j.index > D ? ((ge = j), (j = null)) : (ge = j.sibling);
        var J = y(p, j, m[D], k);
        if (J === null) {
          j === null && (j = ge);
          break;
        }
        e && j && J.alternate === null && t(p, j),
          (a = u(J, a, D)),
          R === null ? (T = J) : (R.sibling = J),
          (R = J),
          (j = ge);
      }
      if (D === m.length) return n(p, j), ie && bt(p, D), T;
      if (j === null) {
        for (; D < m.length; D++)
          (j = S(p, m[D], k)), j !== null && ((a = u(j, a, D)), R === null ? (T = j) : (R.sibling = j), (R = j));
        return ie && bt(p, D), T;
      }
      for (j = r(p, j); D < m.length; D++)
        (ge = C(j, p, D, m[D], k)),
          ge !== null &&
            (e && ge.alternate !== null && j.delete(ge.key === null ? D : ge.key),
            (a = u(ge, a, D)),
            R === null ? (T = ge) : (R.sibling = ge),
            (R = ge));
      return (
        e &&
          j.forEach(function (Yt) {
            return t(p, Yt);
          }),
        ie && bt(p, D),
        T
      );
    }
    function z(p, a, m, k) {
      var T = O(m);
      if (typeof T != "function") throw Error(c(150));
      if (((m = T.call(m)), m == null)) throw Error(c(151));
      for (var R = (T = null), j = a, D = (a = 0), ge = null, J = m.next(); j !== null && !J.done; D++, J = m.next()) {
        j.index > D ? ((ge = j), (j = null)) : (ge = j.sibling);
        var Yt = y(p, j, J.value, k);
        if (Yt === null) {
          j === null && (j = ge);
          break;
        }
        e && j && Yt.alternate === null && t(p, j),
          (a = u(Yt, a, D)),
          R === null ? (T = Yt) : (R.sibling = Yt),
          (R = Yt),
          (j = ge);
      }
      if (J.done) return n(p, j), ie && bt(p, D), T;
      if (j === null) {
        for (; !J.done; D++, J = m.next())
          (J = S(p, J.value, k)), J !== null && ((a = u(J, a, D)), R === null ? (T = J) : (R.sibling = J), (R = J));
        return ie && bt(p, D), T;
      }
      for (j = r(p, j); !J.done; D++, J = m.next())
        (J = C(j, p, D, J.value, k)),
          J !== null &&
            (e && J.alternate !== null && j.delete(J.key === null ? D : J.key),
            (a = u(J, a, D)),
            R === null ? (T = J) : (R.sibling = J),
            (R = J));
      return (
        e &&
          j.forEach(function ($f) {
            return t(p, $f);
          }),
        ie && bt(p, D),
        T
      );
    }
    function de(p, a, m, k) {
      if (
        (typeof m == "object" && m !== null && m.type === Le && m.key === null && (m = m.props.children),
        typeof m == "object" && m !== null)
      ) {
        switch (m.$$typeof) {
          case nt:
            e: {
              for (var T = m.key, R = a; R !== null; ) {
                if (R.key === T) {
                  if (((T = m.type), T === Le)) {
                    if (R.tag === 7) {
                      n(p, R.sibling), (a = l(R, m.props.children)), (a.return = p), (p = a);
                      break e;
                    }
                  } else if (
                    R.elementType === T ||
                    (typeof T == "object" && T !== null && T.$$typeof === Re && os(T) === R.type)
                  ) {
                    n(p, R.sibling), (a = l(R, m.props)), (a.ref = ur(p, R, m)), (a.return = p), (p = a);
                    break e;
                  }
                  n(p, R);
                  break;
                } else t(p, R);
                R = R.sibling;
              }
              m.type === Le
                ? ((a = sn(m.props.children, p.mode, k, m.key)), (a.return = p), (p = a))
                : ((k = Cl(m.type, m.key, m.props, null, p.mode, k)), (k.ref = ur(p, a, m)), (k.return = p), (p = k));
            }
            return i(p);
          case Pe:
            e: {
              for (R = m.key; a !== null; ) {
                if (a.key === R)
                  if (
                    a.tag === 4 &&
                    a.stateNode.containerInfo === m.containerInfo &&
                    a.stateNode.implementation === m.implementation
                  ) {
                    n(p, a.sibling), (a = l(a, m.children || [])), (a.return = p), (p = a);
                    break e;
                  } else {
                    n(p, a);
                    break;
                  }
                else t(p, a);
                a = a.sibling;
              }
              (a = xi(m, p.mode, k)), (a.return = p), (p = a);
            }
            return i(p);
          case Re:
            return (R = m._init), de(p, a, R(m._payload), k);
        }
        if (Mn(m)) return P(p, a, m, k);
        if (O(m)) return z(p, a, m, k);
        br(p, m);
      }
      return (typeof m == "string" && m !== "") || typeof m == "number"
        ? ((m = "" + m),
          a !== null && a.tag === 6
            ? (n(p, a.sibling), (a = l(a, m)), (a.return = p), (p = a))
            : (n(p, a), (a = Ci(m, p.mode, k)), (a.return = p), (p = a)),
          i(p))
        : n(p, a);
    }
    return de;
  }
  var _n = ss(!0),
    as = ss(!1),
    el = It(null),
    tl = null,
    Nn = null,
    Ou = null;
  function Mu() {
    Ou = Nn = tl = null;
  }
  function Du(e) {
    var t = el.current;
    le(el), (e._currentValue = t);
  }
  function Iu(e, t, n) {
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
      (Ou = Nn = null),
      (e = e.dependencies),
      e !== null && e.firstContext !== null && (e.lanes & t && (Me = !0), (e.firstContext = null));
  }
  function Ze(e) {
    var t = e._currentValue;
    if (Ou !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Nn === null)) {
        if (tl === null) throw Error(c(308));
        (Nn = e), (tl.dependencies = { lanes: 0, firstContext: e });
      } else Nn = Nn.next = e;
    return t;
  }
  var en = null;
  function Fu(e) {
    en === null ? (en = [e]) : en.push(e);
  }
  function cs(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? ((n.next = n), Fu(t)) : ((n.next = l.next), (l.next = n)), (t.interleaved = n), Ct(e, r);
  }
  function Ct(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var At = !1;
  function Uu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function fs(e, t) {
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
  function xt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Vt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), Y & 2)) {
      var l = r.pending;
      return l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), Ct(e, n);
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), Fu(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      Ct(e, n)
    );
  }
  function nl(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), ql(e, n);
    }
  }
  function ds(e, t) {
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
    At = !1;
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
          C = o.eventTime;
        if ((r & y) === y) {
          w !== null &&
            (w = w.next = { eventTime: C, lane: 0, tag: o.tag, payload: o.payload, callback: o.callback, next: null });
          e: {
            var P = e,
              z = o;
            switch (((y = t), (C = n), z.tag)) {
              case 1:
                if (((P = z.payload), typeof P == "function")) {
                  S = P.call(C, S, y);
                  break e;
                }
                S = P;
                break e;
              case 3:
                P.flags = (P.flags & -65537) | 128;
              case 0:
                if (((P = z.payload), (y = typeof P == "function" ? P.call(C, S, y) : P), y == null)) break e;
                S = N({}, S, y);
                break e;
              case 2:
                At = !0;
            }
          }
          o.callback !== null &&
            o.lane !== 0 &&
            ((e.flags |= 64), (y = l.effects), y === null ? (l.effects = [o]) : y.push(o));
        } else
          (C = { eventTime: C, lane: y, tag: o.tag, payload: o.payload, callback: o.callback, next: null }),
            w === null ? ((h = w = C), (s = S)) : (w = w.next = C),
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
  function ps(e, t, n) {
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
    ht = It(ir),
    or = It(ir),
    sr = It(ir);
  function tn(e) {
    if (e === ir) throw Error(c(174));
    return e;
  }
  function Au(e, t) {
    switch ((ne(sr, t), ne(or, e), ne(ht, ir), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Vl(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Vl(t, e));
    }
    le(ht), ne(ht, t);
  }
  function zn() {
    le(ht), le(or), le(sr);
  }
  function ms(e) {
    tn(sr.current);
    var t = tn(ht.current),
      n = Vl(t, e.type);
    t !== n && (ne(or, e), ne(ht, n));
  }
  function Vu(e) {
    or.current === e && (le(ht), le(or));
  }
  var oe = It(0);
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
  var Hu = [];
  function Bu() {
    for (var e = 0; e < Hu.length; e++) Hu[e]._workInProgressVersionPrimary = null;
    Hu.length = 0;
  }
  var ul = Ee.ReactCurrentDispatcher,
    Wu = Ee.ReactCurrentBatchConfig,
    nn = 0,
    se = null,
    me = null,
    ve = null,
    il = !1,
    ar = !1,
    cr = 0,
    df = 0;
  function xe() {
    throw Error(c(321));
  }
  function $u(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!ut(e[n], t[n])) return !1;
    return !0;
  }
  function Qu(e, t, n, r, l, u) {
    if (
      ((nn = u),
      (se = t),
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
        (u += 1), (ve = me = null), (t.updateQueue = null), (ul.current = gf), (e = n(r, l));
      } while (ar);
    }
    if (((ul.current = al), (t = me !== null && me.next !== null), (nn = 0), (ve = me = se = null), (il = !1), t))
      throw Error(c(300));
    return e;
  }
  function Ku() {
    var e = cr !== 0;
    return (cr = 0), e;
  }
  function vt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ve === null ? (se.memoizedState = ve = e) : (ve = ve.next = e), ve;
  }
  function Je() {
    if (me === null) {
      var e = se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = me.next;
    var t = ve === null ? se.memoizedState : ve.next;
    if (t !== null) (ve = t), (me = e);
    else {
      if (e === null) throw Error(c(310));
      (me = e),
        (e = {
          memoizedState: me.memoizedState,
          baseState: me.baseState,
          baseQueue: me.baseQueue,
          queue: me.queue,
          next: null,
        }),
        ve === null ? (se.memoizedState = ve = e) : (ve = ve.next = e);
    }
    return ve;
  }
  function fr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Yu(e) {
    var t = Je(),
      n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var r = me,
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
          s === null ? ((o = s = S), (i = r)) : (s = s.next = S), (se.lanes |= w), (rn |= w);
        }
        h = h.next;
      } while (h !== null && h !== u);
      s === null ? (i = r) : (s.next = o),
        ut(r, t.memoizedState) || (Me = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do (u = l.lane), (se.lanes |= u), (rn |= u), (l = l.next);
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Gu(e) {
    var t = Je(),
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
      ut(u, t.memoizedState) || (Me = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (n.lastRenderedState = u);
    }
    return [u, r];
  }
  function hs() {}
  function vs(e, t) {
    var n = se,
      r = Je(),
      l = t(),
      u = !ut(r.memoizedState, l);
    if (
      (u && ((r.memoizedState = l), (Me = !0)),
      (r = r.queue),
      Xu(ws.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || u || (ve !== null && ve.memoizedState.tag & 1))
    ) {
      if (((n.flags |= 2048), dr(9, gs.bind(null, n, r, l, t), void 0, null), ye === null)) throw Error(c(349));
      nn & 30 || ys(n, t, l);
    }
    return l;
  }
  function ys(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = se.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), (se.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function gs(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Ss(t) && ks(e);
  }
  function ws(e, t, n) {
    return n(function () {
      Ss(t) && ks(e);
    });
  }
  function Ss(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ut(e, n);
    } catch {
      return !0;
    }
  }
  function ks(e) {
    var t = Ct(e, 1);
    t !== null && ct(t, e, 1, -1);
  }
  function Es(e) {
    var t = vt();
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
      (e = e.dispatch = hf.bind(null, se, e)),
      [t.memoizedState, e]
    );
  }
  function dr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = se.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), (se.updateQueue = t), (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Cs() {
    return Je().memoizedState;
  }
  function ol(e, t, n, r) {
    var l = vt();
    (se.flags |= e), (l.memoizedState = dr(1 | t, n, void 0, r === void 0 ? null : r));
  }
  function sl(e, t, n, r) {
    var l = Je();
    r = r === void 0 ? null : r;
    var u = void 0;
    if (me !== null) {
      var i = me.memoizedState;
      if (((u = i.destroy), r !== null && $u(r, i.deps))) {
        l.memoizedState = dr(t, n, u, r);
        return;
      }
    }
    (se.flags |= e), (l.memoizedState = dr(1 | t, n, u, r));
  }
  function xs(e, t) {
    return ol(8390656, 8, e, t);
  }
  function Xu(e, t) {
    return sl(2048, 8, e, t);
  }
  function _s(e, t) {
    return sl(4, 2, e, t);
  }
  function Ns(e, t) {
    return sl(4, 4, e, t);
  }
  function Ps(e, t) {
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
  function zs(e, t, n) {
    return (n = n != null ? n.concat([e]) : null), sl(4, 4, Ps.bind(null, t, e), n);
  }
  function Zu() {}
  function Ts(e, t) {
    var n = Je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && $u(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Ls(e, t) {
    var n = Je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && $u(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Rs(e, t, n) {
    return nn & 21
      ? (ut(n, t) || ((n = io()), (se.lanes |= n), (rn |= n), (e.baseState = !0)), t)
      : (e.baseState && ((e.baseState = !1), (Me = !0)), (e.memoizedState = n));
  }
  function pf(e, t) {
    var n = b;
    (b = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Wu.transition;
    Wu.transition = {};
    try {
      e(!1), t();
    } finally {
      (b = n), (Wu.transition = r);
    }
  }
  function js() {
    return Je().memoizedState;
  }
  function mf(e, t, n) {
    var r = $t(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Os(e))) Ms(t, n);
    else if (((n = cs(e, t, n, r)), n !== null)) {
      var l = Te();
      ct(n, e, r, l), Ds(n, t, r);
    }
  }
  function hf(e, t, n) {
    var r = $t(e),
      l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Os(e)) Ms(t, l);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && ((u = t.lastRenderedReducer), u !== null))
        try {
          var i = t.lastRenderedState,
            o = u(i, n);
          if (((l.hasEagerState = !0), (l.eagerState = o), ut(o, i))) {
            var s = t.interleaved;
            s === null ? ((l.next = l), Fu(t)) : ((l.next = s.next), (s.next = l)), (t.interleaved = l);
            return;
          }
        } catch {
        } finally {
        }
      (n = cs(e, t, l, r)), n !== null && ((l = Te()), ct(n, e, r, l), Ds(n, t, r));
    }
  }
  function Os(e) {
    var t = e.alternate;
    return e === se || (t !== null && t === se);
  }
  function Ms(e, t) {
    ar = il = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
  }
  function Ds(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), ql(e, n);
    }
  }
  var al = {
      readContext: Ze,
      useCallback: xe,
      useContext: xe,
      useEffect: xe,
      useImperativeHandle: xe,
      useInsertionEffect: xe,
      useLayoutEffect: xe,
      useMemo: xe,
      useReducer: xe,
      useRef: xe,
      useState: xe,
      useDebugValue: xe,
      useDeferredValue: xe,
      useTransition: xe,
      useMutableSource: xe,
      useSyncExternalStore: xe,
      useId: xe,
      unstable_isNewReconciler: !1,
    },
    vf = {
      readContext: Ze,
      useCallback: function (e, t) {
        return (vt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ze,
      useEffect: xs,
      useImperativeHandle: function (e, t, n) {
        return (n = n != null ? n.concat([e]) : null), ol(4194308, 4, Ps.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return ol(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return ol(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = vt();
        return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
      },
      useReducer: function (e, t, n) {
        var r = vt();
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
          (e = e.dispatch = mf.bind(null, se, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = vt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: Es,
      useDebugValue: Zu,
      useDeferredValue: function (e) {
        return (vt().memoizedState = e);
      },
      useTransition: function () {
        var e = Es(!1),
          t = e[0];
        return (e = pf.bind(null, e[1])), (vt().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = se,
          l = vt();
        if (ie) {
          if (n === void 0) throw Error(c(407));
          n = n();
        } else {
          if (((n = t()), ye === null)) throw Error(c(349));
          nn & 30 || ys(r, t, n);
        }
        l.memoizedState = n;
        var u = { value: n, getSnapshot: t };
        return (
          (l.queue = u),
          xs(ws.bind(null, r, u, e), [e]),
          (r.flags |= 2048),
          dr(9, gs.bind(null, r, u, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = vt(),
          t = ye.identifierPrefix;
        if (ie) {
          var n = Et,
            r = kt;
          (n = (r & ~(1 << (32 - lt(r) - 1))).toString(32) + n),
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
      readContext: Ze,
      useCallback: Ts,
      useContext: Ze,
      useEffect: Xu,
      useImperativeHandle: zs,
      useInsertionEffect: _s,
      useLayoutEffect: Ns,
      useMemo: Ls,
      useReducer: Yu,
      useRef: Cs,
      useState: function () {
        return Yu(fr);
      },
      useDebugValue: Zu,
      useDeferredValue: function (e) {
        var t = Je();
        return Rs(t, me.memoizedState, e);
      },
      useTransition: function () {
        var e = Yu(fr)[0],
          t = Je().memoizedState;
        return [e, t];
      },
      useMutableSource: hs,
      useSyncExternalStore: vs,
      useId: js,
      unstable_isNewReconciler: !1,
    },
    gf = {
      readContext: Ze,
      useCallback: Ts,
      useContext: Ze,
      useEffect: Xu,
      useImperativeHandle: zs,
      useInsertionEffect: _s,
      useLayoutEffect: Ns,
      useMemo: Ls,
      useReducer: Gu,
      useRef: Cs,
      useState: function () {
        return Gu(fr);
      },
      useDebugValue: Zu,
      useDeferredValue: function (e) {
        var t = Je();
        return me === null ? (t.memoizedState = e) : Rs(t, me.memoizedState, e);
      },
      useTransition: function () {
        var e = Gu(fr)[0],
          t = Je().memoizedState;
        return [e, t];
      },
      useMutableSource: hs,
      useSyncExternalStore: vs,
      useId: js,
      unstable_isNewReconciler: !1,
    };
  function ot(e, t) {
    if (e && e.defaultProps) {
      (t = N({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Ju(e, t, n, r) {
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
      var r = Te(),
        l = $t(e),
        u = xt(r, l);
      (u.payload = t), n != null && (u.callback = n), (t = Vt(e, u, l)), t !== null && (ct(t, e, l, r), nl(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Te(),
        l = $t(e),
        u = xt(r, l);
      (u.tag = 1),
        (u.payload = t),
        n != null && (u.callback = n),
        (t = Vt(e, u, l)),
        t !== null && (ct(t, e, l, r), nl(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Te(),
        r = $t(e),
        l = xt(n, r);
      (l.tag = 2), t != null && (l.callback = t), (t = Vt(e, l, r)), t !== null && (ct(t, e, r, n), nl(t, e, r));
    },
  };
  function Is(e, t, n, r, l, u, i) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, u, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !qn(n, r) || !qn(l, u)
          : !0
    );
  }
  function Fs(e, t, n) {
    var r = !1,
      l = Ft,
      u = t.contextType;
    return (
      typeof u == "object" && u !== null
        ? (u = Ze(u))
        : ((l = Oe(t) ? Jt : Ce.current), (r = t.contextTypes), (u = (r = r != null) ? kn(e, l) : Ft)),
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
  function Us(e, t, n, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && cl.enqueueReplaceState(t, t.state, null);
  }
  function qu(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Uu(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? (l.context = Ze(u)) : ((u = Oe(t) ? Jt : Ce.current), (l.context = kn(e, u))),
      (l.state = e.memoizedState),
      (u = t.getDerivedStateFromProps),
      typeof u == "function" && (Ju(e, t, u, n), (l.state = e.memoizedState)),
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
      do (n += X(r)), (r = r.return);
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
  function bu(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function ei(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var wf = typeof WeakMap == "function" ? WeakMap : Map;
  function As(e, t, n) {
    (n = xt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        yl || ((yl = !0), (hi = r)), ei(e, t);
      }),
      n
    );
  }
  function Vs(e, t, n) {
    (n = xt(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      (n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          ei(e, t);
        });
    }
    var u = e.stateNode;
    return (
      u !== null &&
        typeof u.componentDidCatch == "function" &&
        (n.callback = function () {
          ei(e, t), typeof r != "function" && (Bt === null ? (Bt = new Set([this])) : Bt.add(this));
          var i = t.stack;
          this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
        }),
      n
    );
  }
  function Hs(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new wf();
      var l = new Set();
      r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = Of.bind(null, e, t, n)), t.then(e, e));
  }
  function Bs(e) {
    do {
      var t;
      if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ws(e, t, n, r, l) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = l), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = xt(-1, 1)), (t.tag = 2), Vt(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var Sf = Ee.ReactCurrentOwner,
    Me = !1;
  function ze(e, t, n, r) {
    t.child = e === null ? as(t, null, n, r) : _n(t, e.child, n, r);
  }
  function $s(e, t, n, r, l) {
    n = n.render;
    var u = t.ref;
    return (
      Pn(t, l),
      (r = Qu(e, t, n, r, u, l)),
      (n = Ku()),
      e !== null && !Me
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
        : (ie && n && zu(t), (t.flags |= 1), ze(e, t, r, l), t.child)
    );
  }
  function Qs(e, t, n, r, l) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" &&
        !Ei(u) &&
        u.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = u), Ks(e, t, u, r, l))
        : ((e = Cl(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !(e.lanes & l))) {
      var i = u.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : qn), n(i, r) && e.ref === t.ref)) return _t(e, t, l);
    }
    return (t.flags |= 1), (e = Kt(u, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
  }
  function Ks(e, t, n, r, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (qn(u, r) && e.ref === t.ref)
        if (((Me = !1), (t.pendingProps = r = u), (e.lanes & l) !== 0)) e.flags & 131072 && (Me = !0);
        else return (t.lanes = e.lanes), _t(e, t, l);
    }
    return ti(e, t, n, r, l);
  }
  function Ys(e, t, n) {
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
    return ze(e, t, l, n), t.child;
  }
  function Gs(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
  }
  function ti(e, t, n, r, l) {
    var u = Oe(n) ? Jt : Ce.current;
    return (
      (u = kn(t, u)),
      Pn(t, l),
      (n = Qu(e, t, n, r, u, l)),
      (r = Ku()),
      e !== null && !Me
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
        : (ie && r && zu(t), (t.flags |= 1), ze(e, t, n, l), t.child)
    );
  }
  function Xs(e, t, n, r, l) {
    if (Oe(n)) {
      var u = !0;
      Gr(t);
    } else u = !1;
    if ((Pn(t, l), t.stateNode === null)) dl(e, t), Fs(t, n, r), qu(t, n, r, l), (r = !0);
    else if (e === null) {
      var i = t.stateNode,
        o = t.memoizedProps;
      i.props = o;
      var s = i.context,
        h = n.contextType;
      typeof h == "object" && h !== null ? (h = Ze(h)) : ((h = Oe(n) ? Jt : Ce.current), (h = kn(t, h)));
      var w = n.getDerivedStateFromProps,
        S = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      S ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
        ((o !== r || s !== h) && Us(t, i, r, h)),
        (At = !1);
      var y = t.memoizedState;
      (i.state = y),
        rl(t, r, i, l),
        (s = t.memoizedState),
        o !== r || y !== s || je.current || At
          ? (typeof w == "function" && (Ju(t, n, w, r), (s = t.memoizedState)),
            (o = At || Is(t, n, o, r, y, s, h))
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
        fs(e, t),
        (o = t.memoizedProps),
        (h = t.type === t.elementType ? o : ot(t.type, o)),
        (i.props = h),
        (S = t.pendingProps),
        (y = i.context),
        (s = n.contextType),
        typeof s == "object" && s !== null ? (s = Ze(s)) : ((s = Oe(n) ? Jt : Ce.current), (s = kn(t, s)));
      var C = n.getDerivedStateFromProps;
      (w = typeof C == "function" || typeof i.getSnapshotBeforeUpdate == "function") ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
        ((o !== S || y !== s) && Us(t, i, r, s)),
        (At = !1),
        (y = t.memoizedState),
        (i.state = y),
        rl(t, r, i, l);
      var P = t.memoizedState;
      o !== S || y !== P || je.current || At
        ? (typeof C == "function" && (Ju(t, n, C, r), (P = t.memoizedState)),
          (h = At || Is(t, n, h, r, y, P, s) || !1)
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
    return ni(e, t, n, r, u, l);
  }
  function ni(e, t, n, r, l, u) {
    Gs(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && es(t, n, !1), _t(e, t, u);
    (r = t.stateNode), (Sf.current = t);
    var o = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && i ? ((t.child = _n(t, e.child, null, u)), (t.child = _n(t, null, o, u))) : ze(e, t, o, u),
      (t.memoizedState = r.state),
      l && es(t, n, !0),
      t.child
    );
  }
  function Zs(e) {
    var t = e.stateNode;
    t.pendingContext ? qo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && qo(e, t.context, !1),
      Au(e, t.containerInfo);
  }
  function Js(e, t, n, r, l) {
    return xn(), ju(l), (t.flags |= 256), ze(e, t, n, r), t.child;
  }
  var ri = { dehydrated: null, treeContext: null, retryLane: 0 };
  function li(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function qs(e, t, n) {
    var r = t.pendingProps,
      l = oe.current,
      u = !1,
      i = (t.flags & 128) !== 0,
      o;
    if (
      ((o = i) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      o ? ((u = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
      ne(oe, l & 1),
      e === null)
    )
      return (
        Ru(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
          : ((i = r.children),
            (e = r.fallback),
            u
              ? ((r = t.mode),
                (u = t.child),
                (i = { mode: "hidden", children: i }),
                !(r & 1) && u !== null ? ((u.childLanes = 0), (u.pendingProps = i)) : (u = xl(i, r, 0, null)),
                (e = sn(e, r, n, null)),
                (u.return = t),
                (e.return = t),
                (u.sibling = e),
                (t.child = u),
                (t.child.memoizedState = li(n)),
                (t.memoizedState = ri),
                e)
              : ui(t, i))
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
        (i = i === null ? li(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
        (u.memoizedState = i),
        (u.childLanes = e.childLanes & ~n),
        (t.memoizedState = ri),
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
  function ui(e, t) {
    return (t = xl({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
  }
  function fl(e, t, n, r) {
    return (
      r !== null && ju(r),
      _n(t, e.child, null, n),
      (e = ui(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function kf(e, t, n, r, l, u, i) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = bu(Error(c(422)))), fl(e, t, i, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((u = r.fallback),
            (l = t.mode),
            (r = xl({ mode: "visible", children: r.children }, l, 0, null)),
            (u = sn(u, l, i, null)),
            (u.flags |= 2),
            (r.return = t),
            (u.return = t),
            (r.sibling = u),
            (t.child = r),
            t.mode & 1 && _n(t, e.child, null, i),
            (t.child.memoizedState = li(i)),
            (t.memoizedState = ri),
            u);
    if (!(t.mode & 1)) return fl(e, t, i, null);
    if (l.data === "$!") {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
      return (r = o), (u = Error(c(419))), (r = bu(u, r, void 0)), fl(e, t, i, r);
    }
    if (((o = (i & e.childLanes) !== 0), Me || o)) {
      if (((r = ye), r !== null)) {
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
          l !== 0 && l !== u.retryLane && ((u.retryLane = l), Ct(e, l), ct(r, e, l, -1));
      }
      return ki(), (r = bu(Error(c(421)))), fl(e, t, i, r);
    }
    return l.data === "$?"
      ? ((t.flags |= 128), (t.child = e.child), (t = Mf.bind(null, e)), (l._reactRetry = t), null)
      : ((e = u.treeContext),
        (We = Dt(l.nextSibling)),
        (Be = t),
        (ie = !0),
        (it = null),
        e !== null && ((Ge[Xe++] = kt), (Ge[Xe++] = Et), (Ge[Xe++] = qt), (kt = e.id), (Et = e.overflow), (qt = t)),
        (t = ui(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function bs(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Iu(e.return, t, n);
  }
  function ii(e, t, n, r, l) {
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
  function ea(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      u = r.tail;
    if ((ze(e, t, r.children, n), (r = oe.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && bs(e, n, t);
          else if (e.tag === 19) bs(e, n, t);
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
    if ((ne(oe, r), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (l) {
        case "forwards":
          for (n = t.child, l = null; n !== null; )
            (e = n.alternate), e !== null && ll(e) === null && (l = n), (n = n.sibling);
          (n = l),
            n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)),
            ii(t, !1, l, n, u);
          break;
        case "backwards":
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && ll(e) === null)) {
              t.child = l;
              break;
            }
            (e = l.sibling), (l.sibling = n), (n = l), (l = e);
          }
          ii(t, !0, n, null, u);
          break;
        case "together":
          ii(t, !1, null, null, void 0);
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
        Zs(t), xn();
        break;
      case 5:
        ms(t);
        break;
      case 1:
        Oe(t.type) && Gr(t);
        break;
      case 4:
        Au(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        ne(el, r._currentValue), (r._currentValue = l);
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (ne(oe, oe.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? qs(e, t, n)
              : (ne(oe, oe.current & 1), (e = _t(e, t, n)), e !== null ? e.sibling : null);
        ne(oe, oe.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (r) return ea(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          ne(oe, oe.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Ys(e, t, n);
    }
    return _t(e, t, n);
  }
  var ta, oi, na, ra;
  (ta = function (e, t) {
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
    (oi = function () {}),
    (na = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        (e = t.stateNode), tn(ht.current);
        var u = null;
        switch (n) {
          case "input":
            (l = Il(e, l)), (r = Il(e, r)), (u = []);
            break;
          case "select":
            (l = N({}, l, { value: void 0 })), (r = N({}, r, { value: void 0 })), (u = []);
            break;
          case "textarea":
            (l = Al(e, l)), (r = Al(e, r)), (u = []);
            break;
          default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr);
        }
        Hl(n, r);
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
                (L.hasOwnProperty(h) ? u || (u = []) : (u = u || []).push(h, null));
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
                    (L.hasOwnProperty(h)
                      ? (s != null && h === "onScroll" && re("scroll", e), u || o === s || (u = []))
                      : (u = u || []).push(h, s));
        }
        n && (u = u || []).push("style", n);
        var h = u;
        (t.updateQueue = h) && (t.flags |= 4);
      }
    }),
    (ra = function (e, t, n, r) {
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
  function _e(e) {
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
  function Cf(e, t, n) {
    var r = t.pendingProps;
    switch ((Tu(t), t.tag)) {
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
        return _e(t), null;
      case 1:
        return Oe(t.type) && Yr(), _e(t), null;
      case 3:
        return (
          (r = t.stateNode),
          zn(),
          le(je),
          le(Ce),
          Bu(),
          r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (qr(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), it !== null && (gi(it), (it = null)))),
          oi(e, t),
          _e(t),
          null
        );
      case 5:
        Vu(t);
        var l = tn(sr.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          na(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(c(166));
            return _e(t), null;
          }
          if (((e = tn(ht.current)), qr(t))) {
            (r = t.stateNode), (n = t.type);
            var u = t.memoizedProps;
            switch (((r[mt] = t), (r[rr] = u), (e = (t.mode & 1) !== 0), n)) {
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
                Ii(r, u), re("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!u.multiple }), re("invalid", r);
                break;
              case "textarea":
                Ai(r, u), re("invalid", r);
            }
            Hl(n, u), (l = null);
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
                  : L.hasOwnProperty(i) && o != null && i === "onScroll" && re("scroll", r);
              }
            switch (n) {
              case "input":
                kr(r), Ui(r, u, !0);
                break;
              case "textarea":
                kr(r), Hi(r);
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
              e === "http://www.w3.org/1999/xhtml" && (e = Bi(n)),
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
              (e[mt] = t),
              (e[rr] = r),
              ta(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((i = Bl(n, r)), n)) {
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
                  Ii(e, r), (l = Il(e, r)), re("invalid", e);
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
                  Ai(e, r), (l = Al(e, r)), re("invalid", e);
                  break;
                default:
                  l = r;
              }
              Hl(n, l), (o = l);
              for (u in o)
                if (o.hasOwnProperty(u)) {
                  var s = o[u];
                  u === "style"
                    ? Qi(e, s)
                    : u === "dangerouslySetInnerHTML"
                      ? ((s = s ? s.__html : void 0), s != null && Wi(e, s))
                      : u === "children"
                        ? typeof s == "string"
                          ? (n !== "textarea" || s !== "") && Dn(e, s)
                          : typeof s == "number" && Dn(e, "" + s)
                        : u !== "suppressContentEditableWarning" &&
                          u !== "suppressHydrationWarning" &&
                          u !== "autoFocus" &&
                          (L.hasOwnProperty(u)
                            ? s != null && u === "onScroll" && re("scroll", e)
                            : s != null && tt(e, u, s, i));
                }
              switch (n) {
                case "input":
                  kr(e), Ui(e, r, !1);
                  break;
                case "textarea":
                  kr(e), Hi(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + q(r.value));
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
        return _e(t), null;
      case 6:
        if (e && t.stateNode != null) ra(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(c(166));
          if (((n = tn(sr.current)), tn(ht.current), qr(t))) {
            if (
              ((r = t.stateNode), (n = t.memoizedProps), (r[mt] = t), (u = r.nodeValue !== n) && ((e = Be), e !== null))
            )
              switch (e.tag) {
                case 3:
                  $r(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 && $r(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            u && (t.flags |= 4);
          } else (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[mt] = t), (t.stateNode = r);
        }
        return _e(t), null;
      case 13:
        if (
          (le(oe),
          (r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ie && We !== null && t.mode & 1 && !(t.flags & 128)) is(), xn(), (t.flags |= 98560), (u = !1);
          else if (((u = qr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(c(318));
              if (((u = t.memoizedState), (u = u !== null ? u.dehydrated : null), !u)) throw Error(c(317));
              u[mt] = t;
            } else xn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
            _e(t), (u = !1);
          } else it !== null && (gi(it), (it = null)), (u = !0);
          if (!u) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192), t.mode & 1 && (e === null || oe.current & 1 ? he === 0 && (he = 3) : ki())),
            t.updateQueue !== null && (t.flags |= 4),
            _e(t),
            null);
      case 4:
        return zn(), oi(e, t), e === null && tr(t.stateNode.containerInfo), _e(t), null;
      case 10:
        return Du(t.type._context), _e(t), null;
      case 17:
        return Oe(t.type) && Yr(), _e(t), null;
      case 19:
        if ((le(oe), (u = t.memoizedState), u === null)) return _e(t), null;
        if (((r = (t.flags & 128) !== 0), (i = u.rendering), i === null))
          if (r) pr(u, !1);
          else {
            if (he !== 0 || (e !== null && e.flags & 128))
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
                  return ne(oe, (oe.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null && fe() > jn && ((t.flags |= 128), (r = !0), pr(u, !1), (t.lanes = 4194304));
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
                return _e(t), null;
            } else
              2 * fe() - u.renderingStartTime > jn &&
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
            (u.renderingStartTime = fe()),
            (t.sibling = null),
            (n = oe.current),
            ne(oe, r ? (n & 1) | 2 : n & 1),
            t)
          : (_e(t), null);
      case 22:
      case 23:
        return (
          Si(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && t.mode & 1 ? $e & 1073741824 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function xf(e, t) {
    switch ((Tu(t), t.tag)) {
      case 1:
        return Oe(t.type) && Yr(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
      case 3:
        return (
          zn(),
          le(je),
          le(Ce),
          Bu(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return Vu(t), null;
      case 13:
        if ((le(oe), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(c(340));
          xn();
        }
        return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
      case 19:
        return le(oe), null;
      case 4:
        return zn(), null;
      case 10:
        return Du(t.type._context), null;
      case 22:
      case 23:
        return Si(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var pl = !1,
    Ne = !1,
    _f = typeof WeakSet == "function" ? WeakSet : Set,
    _ = null;
  function Ln(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          ce(e, t, r);
        }
      else n.current = null;
  }
  function si(e, t, n) {
    try {
      n();
    } catch (r) {
      ce(e, t, r);
    }
  }
  var la = !1;
  function Nf(e, t) {
    if (((Su = Or), (e = Io()), du(e))) {
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
                var C;
                S !== n || (l !== 0 && S.nodeType !== 3) || (o = i + l),
                  S !== u || (r !== 0 && S.nodeType !== 3) || (s = i + r),
                  S.nodeType === 3 && (i += S.nodeValue.length),
                  (C = S.firstChild) !== null;

              )
                (y = S), (S = C);
              for (;;) {
                if (S === e) break t;
                if ((y === n && ++h === l && (o = i), y === u && ++w === r && (s = i), (C = S.nextSibling) !== null))
                  break;
                (S = y), (y = S.parentNode);
              }
              S = C;
            }
            n = o === -1 || s === -1 ? null : { start: o, end: s };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ku = { focusedElem: e, selectionRange: n }, Or = !1, _ = t; _ !== null; )
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
                      de = P.memoizedState,
                      p = t.stateNode,
                      a = p.getSnapshotBeforeUpdate(t.elementType === t.type ? z : ot(t.type, z), de);
                    p.__reactInternalSnapshotBeforeUpdate = a;
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
            ce(t, t.return, k);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (_ = e);
            break;
          }
          _ = t.return;
        }
    return (P = la), (la = !1), P;
  }
  function mr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          (l.destroy = void 0), u !== void 0 && si(t, n, u);
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
  function ai(e) {
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
  function ua(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), ua(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode), t !== null && (delete t[mt], delete t[rr], delete t[_u], delete t[sf], delete t[af])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function ia(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function oa(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ia(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ci(e, t, n) {
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
      for (ci(e, t, n), e = e.sibling; e !== null; ) ci(e, t, n), (e = e.sibling);
  }
  function fi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
      for (fi(e, t, n), e = e.sibling; e !== null; ) fi(e, t, n), (e = e.sibling);
  }
  var we = null,
    st = !1;
  function Ht(e, t, n) {
    for (n = n.child; n !== null; ) sa(e, t, n), (n = n.sibling);
  }
  function sa(e, t, n) {
    if (pt && typeof pt.onCommitFiberUnmount == "function")
      try {
        pt.onCommitFiberUnmount(Pr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Ne || Ln(n, t);
      case 6:
        var r = we,
          l = st;
        (we = null),
          Ht(e, t, n),
          (we = r),
          (st = l),
          we !== null &&
            (st
              ? ((e = we), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
              : we.removeChild(n.stateNode));
        break;
      case 18:
        we !== null &&
          (st
            ? ((e = we),
              (n = n.stateNode),
              e.nodeType === 8 ? xu(e.parentNode, n) : e.nodeType === 1 && xu(e, n),
              Kn(e))
            : xu(we, n.stateNode));
        break;
      case 4:
        (r = we), (l = st), (we = n.stateNode.containerInfo), (st = !0), Ht(e, t, n), (we = r), (st = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ne && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
          l = r = r.next;
          do {
            var u = l,
              i = u.destroy;
            (u = u.tag), i !== void 0 && (u & 2 || u & 4) && si(n, t, i), (l = l.next);
          } while (l !== r);
        }
        Ht(e, t, n);
        break;
      case 1:
        if (!Ne && (Ln(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
          try {
            (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
          } catch (o) {
            ce(n, t, o);
          }
        Ht(e, t, n);
        break;
      case 21:
        Ht(e, t, n);
        break;
      case 22:
        n.mode & 1 ? ((Ne = (r = Ne) || n.memoizedState !== null), Ht(e, t, n), (Ne = r)) : Ht(e, t, n);
        break;
      default:
        Ht(e, t, n);
    }
  }
  function aa(e) {
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
  function at(e, t) {
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
                (we = o.stateNode), (st = !1);
                break e;
              case 3:
                (we = o.stateNode.containerInfo), (st = !0);
                break e;
              case 4:
                (we = o.stateNode.containerInfo), (st = !0);
                break e;
            }
            o = o.return;
          }
          if (we === null) throw Error(c(160));
          sa(u, i, l), (we = null), (st = !1);
          var s = l.alternate;
          s !== null && (s.return = null), (l.return = null);
        } catch (h) {
          ce(l, t, h);
        }
      }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ca(t, e), (t = t.sibling);
  }
  function ca(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((at(t, e), yt(e), r & 4)) {
          try {
            mr(3, e, e.return), ml(3, e);
          } catch (z) {
            ce(e, e.return, z);
          }
          try {
            mr(5, e, e.return);
          } catch (z) {
            ce(e, e.return, z);
          }
        }
        break;
      case 1:
        at(t, e), yt(e), r & 512 && n !== null && Ln(n, n.return);
        break;
      case 5:
        if ((at(t, e), yt(e), r & 512 && n !== null && Ln(n, n.return), e.flags & 32)) {
          var l = e.stateNode;
          try {
            Dn(l, "");
          } catch (z) {
            ce(e, e.return, z);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var u = e.memoizedProps,
            i = n !== null ? n.memoizedProps : u,
            o = e.type,
            s = e.updateQueue;
          if (((e.updateQueue = null), s !== null))
            try {
              o === "input" && u.type === "radio" && u.name != null && Fi(l, u), Bl(o, i);
              var h = Bl(o, u);
              for (i = 0; i < s.length; i += 2) {
                var w = s[i],
                  S = s[i + 1];
                w === "style"
                  ? Qi(l, S)
                  : w === "dangerouslySetInnerHTML"
                    ? Wi(l, S)
                    : w === "children"
                      ? Dn(l, S)
                      : tt(l, w, S, h);
              }
              switch (o) {
                case "input":
                  Fl(l, u);
                  break;
                case "textarea":
                  Vi(l, u);
                  break;
                case "select":
                  var y = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!u.multiple;
                  var C = u.value;
                  C != null
                    ? an(l, !!u.multiple, C, !1)
                    : y !== !!u.multiple &&
                      (u.defaultValue != null
                        ? an(l, !!u.multiple, u.defaultValue, !0)
                        : an(l, !!u.multiple, u.multiple ? [] : "", !1));
              }
              l[rr] = u;
            } catch (z) {
              ce(e, e.return, z);
            }
        }
        break;
      case 6:
        if ((at(t, e), yt(e), r & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          (l = e.stateNode), (u = e.memoizedProps);
          try {
            l.nodeValue = u;
          } catch (z) {
            ce(e, e.return, z);
          }
        }
        break;
      case 3:
        if ((at(t, e), yt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
          try {
            Kn(t.containerInfo);
          } catch (z) {
            ce(e, e.return, z);
          }
        break;
      case 4:
        at(t, e), yt(e);
        break;
      case 13:
        at(t, e),
          yt(e),
          (l = e.child),
          l.flags & 8192 &&
            ((u = l.memoizedState !== null),
            (l.stateNode.isHidden = u),
            !u || (l.alternate !== null && l.alternate.memoizedState !== null) || (mi = fe())),
          r & 4 && aa(e);
        break;
      case 22:
        if (
          ((w = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Ne = (h = Ne) || w), at(t, e), (Ne = h)) : at(t, e),
          yt(e),
          r & 8192)
        ) {
          if (((h = e.memoizedState !== null), (e.stateNode.isHidden = h) && !w && e.mode & 1))
            for (_ = e, w = e.child; w !== null; ) {
              for (S = _ = w; _ !== null; ) {
                switch (((y = _), (C = y.child), y.tag)) {
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
                        ce(r, n, z);
                      }
                    }
                    break;
                  case 5:
                    Ln(y, y.return);
                    break;
                  case 22:
                    if (y.memoizedState !== null) {
                      pa(S);
                      continue;
                    }
                }
                C !== null ? ((C.return = y), (_ = C)) : pa(S);
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
                        (o.style.display = $i("display", i)));
                } catch (z) {
                  ce(e, e.return, z);
                }
              }
            } else if (S.tag === 6) {
              if (w === null)
                try {
                  S.stateNode.nodeValue = h ? "" : S.memoizedProps;
                } catch (z) {
                  ce(e, e.return, z);
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
        at(t, e), yt(e), r & 4 && aa(e);
        break;
      case 21:
        break;
      default:
        at(t, e), yt(e);
    }
  }
  function yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (ia(n)) {
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
            var u = oa(e);
            fi(e, u, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo,
              o = oa(e);
            ci(e, o, i);
            break;
          default:
            throw Error(c(161));
        }
      } catch (s) {
        ce(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Pf(e, t, n) {
    (_ = e), fa(e);
  }
  function fa(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
      var l = _,
        u = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || pl;
        if (!i) {
          var o = l.alternate,
            s = (o !== null && o.memoizedState !== null) || Ne;
          o = pl;
          var h = Ne;
          if (((pl = i), (Ne = s) && !h))
            for (_ = l; _ !== null; )
              (i = _),
                (s = i.child),
                i.tag === 22 && i.memoizedState !== null ? ma(l) : s !== null ? ((s.return = i), (_ = s)) : ma(l);
          for (; u !== null; ) (_ = u), fa(u), (u = u.sibling);
          (_ = l), (pl = o), (Ne = h);
        }
        da(e);
      } else l.subtreeFlags & 8772 && u !== null ? ((u.return = l), (_ = u)) : da(e);
    }
  }
  function da(e) {
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
                Ne || ml(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ne)
                  if (n === null) r.componentDidMount();
                  else {
                    var l = t.elementType === t.type ? n.memoizedProps : ot(t.type, n.memoizedProps);
                    r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var u = t.updateQueue;
                u !== null && ps(t, u, r);
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
                  ps(t, i, n);
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
          Ne || (t.flags & 512 && ai(t));
        } catch (y) {
          ce(t, t.return, y);
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
  function pa(e) {
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
  function ma(e) {
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
              ce(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                ce(t, l, s);
              }
            }
            var u = t.return;
            try {
              ai(t);
            } catch (s) {
              ce(t, u, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              ai(t);
            } catch (s) {
              ce(t, i, s);
            }
        }
      } catch (s) {
        ce(t, t.return, s);
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
    hl = Ee.ReactCurrentDispatcher,
    di = Ee.ReactCurrentOwner,
    qe = Ee.ReactCurrentBatchConfig,
    Y = 0,
    ye = null,
    pe = null,
    Se = 0,
    $e = 0,
    Rn = It(0),
    he = 0,
    hr = null,
    rn = 0,
    vl = 0,
    pi = 0,
    vr = null,
    De = null,
    mi = 0,
    jn = 1 / 0,
    Nt = null,
    yl = !1,
    hi = null,
    Bt = null,
    gl = !1,
    Wt = null,
    wl = 0,
    yr = 0,
    vi = null,
    Sl = -1,
    kl = 0;
  function Te() {
    return Y & 6 ? fe() : Sl !== -1 ? Sl : (Sl = fe());
  }
  function $t(e) {
    return e.mode & 1
      ? Y & 2 && Se !== 0
        ? Se & -Se
        : ff.transition !== null
          ? (kl === 0 && (kl = io()), kl)
          : ((e = b), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : vo(e.type))), e)
      : 1;
  }
  function ct(e, t, n, r) {
    if (50 < yr) throw ((yr = 0), (vi = null), Error(c(185)));
    Hn(e, n, r),
      (!(Y & 2) || e !== ye) &&
        (e === ye && (!(Y & 2) && (vl |= n), he === 4 && Qt(e, Se)),
        Ie(e, r),
        n === 1 && Y === 0 && !(t.mode & 1) && ((jn = fe() + 500), Xr && Ut()));
  }
  function Ie(e, t) {
    var n = e.callbackNode;
    cc(e, t);
    var r = Lr(e, e === ye ? Se : 0);
    if (r === 0) n !== null && ro(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && ro(n), t === 1))
        e.tag === 0 ? cf(va.bind(null, e)) : ts(va.bind(null, e)),
          uf(function () {
            !(Y & 6) && Ut();
          }),
          (n = null);
      else {
        switch (oo(r)) {
          case 1:
            n = Xl;
            break;
          case 4:
            n = lo;
            break;
          case 16:
            n = Nr;
            break;
          case 536870912:
            n = uo;
            break;
          default:
            n = Nr;
        }
        n = xa(n, ha.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function ha(e, t) {
    if (((Sl = -1), (kl = 0), Y & 6)) throw Error(c(327));
    var n = e.callbackNode;
    if (On() && e.callbackNode !== n) return null;
    var r = Lr(e, e === ye ? Se : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = El(e, r);
    else {
      t = r;
      var l = Y;
      Y |= 2;
      var u = ga();
      (ye !== e || Se !== t) && ((Nt = null), (jn = fe() + 500), un(e, t));
      do
        try {
          Rf();
          break;
        } catch (o) {
          ya(e, o);
        }
      while (!0);
      Mu(), (hl.current = u), (Y = l), pe !== null ? (t = 0) : ((ye = null), (Se = 0), (t = he));
    }
    if (t !== 0) {
      if ((t === 2 && ((l = Zl(e)), l !== 0 && ((r = l), (t = yi(e, l)))), t === 1))
        throw ((n = hr), un(e, 0), Qt(e, r), Ie(e, fe()), n);
      if (t === 6) Qt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          !(r & 30) &&
            !Tf(l) &&
            ((t = El(e, r)), t === 2 && ((u = Zl(e)), u !== 0 && ((r = u), (t = yi(e, u)))), t === 1))
        )
          throw ((n = hr), un(e, 0), Qt(e, r), Ie(e, fe()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            on(e, De, Nt);
            break;
          case 3:
            if ((Qt(e, r), (r & 130023424) === r && ((t = mi + 500 - fe()), 10 < t))) {
              if (Lr(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                Te(), (e.pingedLanes |= e.suspendedLanes & l);
                break;
              }
              e.timeoutHandle = Cu(on.bind(null, e, De, Nt), t);
              break;
            }
            on(e, De, Nt);
            break;
          case 4:
            if ((Qt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - lt(r);
              (u = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~u);
            }
            if (
              ((r = l),
              (r = fe() - r),
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
              e.timeoutHandle = Cu(on.bind(null, e, De, Nt), r);
              break;
            }
            on(e, De, Nt);
            break;
          case 5:
            on(e, De, Nt);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return Ie(e, fe()), e.callbackNode === n ? ha.bind(null, e) : null;
  }
  function yi(e, t) {
    var n = vr;
    return (
      e.current.memoizedState.isDehydrated && (un(e, t).flags |= 256),
      (e = El(e, t)),
      e !== 2 && ((t = De), (De = n), t !== null && gi(t)),
      e
    );
  }
  function gi(e) {
    De === null ? (De = e) : De.push.apply(De, e);
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
              if (!ut(u(), l)) return !1;
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
    for (t &= ~pi, t &= ~vl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - lt(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function va(e) {
    if (Y & 6) throw Error(c(327));
    On();
    var t = Lr(e, 0);
    if (!(t & 1)) return Ie(e, fe()), null;
    var n = El(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Zl(e);
      r !== 0 && ((t = r), (n = yi(e, r)));
    }
    if (n === 1) throw ((n = hr), un(e, 0), Qt(e, t), Ie(e, fe()), n);
    if (n === 6) throw Error(c(345));
    return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), on(e, De, Nt), Ie(e, fe()), null;
  }
  function wi(e, t) {
    var n = Y;
    Y |= 1;
    try {
      return e(t);
    } finally {
      (Y = n), Y === 0 && ((jn = fe() + 500), Xr && Ut());
    }
  }
  function ln(e) {
    Wt !== null && Wt.tag === 0 && !(Y & 6) && On();
    var t = Y;
    Y |= 1;
    var n = qe.transition,
      r = b;
    try {
      if (((qe.transition = null), (b = 1), e)) return e();
    } finally {
      (b = r), (qe.transition = n), (Y = t), !(Y & 6) && Ut();
    }
  }
  function Si() {
    ($e = Rn.current), le(Rn);
  }
  function un(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), lf(n)), pe !== null))
      for (n = pe.return; n !== null; ) {
        var r = n;
        switch ((Tu(r), r.tag)) {
          case 1:
            (r = r.type.childContextTypes), r != null && Yr();
            break;
          case 3:
            zn(), le(je), le(Ce), Bu();
            break;
          case 5:
            Vu(r);
            break;
          case 4:
            zn();
            break;
          case 13:
            le(oe);
            break;
          case 19:
            le(oe);
            break;
          case 10:
            Du(r.type._context);
            break;
          case 22:
          case 23:
            Si();
        }
        n = n.return;
      }
    if (
      ((ye = e),
      (pe = e = Kt(e.current, null)),
      (Se = $e = t),
      (he = 0),
      (hr = null),
      (pi = vl = rn = 0),
      (De = vr = null),
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
  function ya(e, t) {
    do {
      var n = pe;
      try {
        if ((Mu(), (ul.current = al), il)) {
          for (var r = se.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), (r = r.next);
          }
          il = !1;
        }
        if (
          ((nn = 0), (ve = me = se = null), (ar = !1), (cr = 0), (di.current = null), n === null || n.return === null)
        ) {
          (he = 1), (hr = t), (pe = null);
          break;
        }
        e: {
          var u = e,
            i = n.return,
            o = n,
            s = t;
          if (((t = Se), (o.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
            var h = s,
              w = o,
              S = w.tag;
            if (!(w.mode & 1) && (S === 0 || S === 11 || S === 15)) {
              var y = w.alternate;
              y
                ? ((w.updateQueue = y.updateQueue), (w.memoizedState = y.memoizedState), (w.lanes = y.lanes))
                : ((w.updateQueue = null), (w.memoizedState = null));
            }
            var C = Bs(i);
            if (C !== null) {
              (C.flags &= -257), Ws(C, i, o, u, t), C.mode & 1 && Hs(u, h, t), (t = C), (s = h);
              var P = t.updateQueue;
              if (P === null) {
                var z = new Set();
                z.add(s), (t.updateQueue = z);
              } else P.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                Hs(u, h, t), ki();
                break e;
              }
              s = Error(c(426));
            }
          } else if (ie && o.mode & 1) {
            var de = Bs(i);
            if (de !== null) {
              !(de.flags & 65536) && (de.flags |= 256), Ws(de, i, o, u, t), ju(Tn(s, o));
              break e;
            }
          }
          (u = s = Tn(s, o)), he !== 4 && (he = 2), vr === null ? (vr = [u]) : vr.push(u), (u = i);
          do {
            switch (u.tag) {
              case 3:
                (u.flags |= 65536), (t &= -t), (u.lanes |= t);
                var p = As(u, s, t);
                ds(u, p);
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
                  ds(u, k);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        Sa(n);
      } catch (T) {
        (t = T), pe === n && n !== null && (pe = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ga() {
    var e = hl.current;
    return (hl.current = al), e === null ? al : e;
  }
  function ki() {
    (he === 0 || he === 3 || he === 2) && (he = 4),
      ye === null || (!(rn & 268435455) && !(vl & 268435455)) || Qt(ye, Se);
  }
  function El(e, t) {
    var n = Y;
    Y |= 2;
    var r = ga();
    (ye !== e || Se !== t) && ((Nt = null), un(e, t));
    do
      try {
        Lf();
        break;
      } catch (l) {
        ya(e, l);
      }
    while (!0);
    if ((Mu(), (Y = n), (hl.current = r), pe !== null)) throw Error(c(261));
    return (ye = null), (Se = 0), he;
  }
  function Lf() {
    for (; pe !== null; ) wa(pe);
  }
  function Rf() {
    for (; pe !== null && !tc(); ) wa(pe);
  }
  function wa(e) {
    var t = Ca(e.alternate, e, $e);
    (e.memoizedProps = e.pendingProps), t === null ? Sa(e) : (pe = t), (di.current = null);
  }
  function Sa(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = xf(n, t)), n !== null)) {
          (n.flags &= 32767), (pe = n);
          return;
        }
        if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (he = 6), (pe = null);
          return;
        }
      } else if (((n = Cf(n, t, $e)), n !== null)) {
        pe = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        pe = t;
        return;
      }
      pe = t = e;
    } while (t !== null);
    he === 0 && (he = 5);
  }
  function on(e, t, n) {
    var r = b,
      l = qe.transition;
    try {
      (qe.transition = null), (b = 1), jf(e, t, n, r);
    } finally {
      (qe.transition = l), (b = r);
    }
    return null;
  }
  function jf(e, t, n, r) {
    do On();
    while (Wt !== null);
    if (Y & 6) throw Error(c(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(c(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var u = n.lanes | n.childLanes;
    if (
      (fc(e, u),
      e === ye && ((pe = ye = null), (Se = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        gl ||
        ((gl = !0),
        xa(Nr, function () {
          return On(), null;
        })),
      (u = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || u)
    ) {
      (u = qe.transition), (qe.transition = null);
      var i = b;
      b = 1;
      var o = Y;
      (Y |= 4),
        (di.current = null),
        Nf(e, n),
        ca(n, e),
        Jc(ku),
        (Or = !!Su),
        (ku = Su = null),
        (e.current = n),
        Pf(n),
        nc(),
        (Y = o),
        (b = i),
        (qe.transition = u);
    } else e.current = n;
    if (
      (gl && ((gl = !1), (Wt = e), (wl = l)),
      (u = e.pendingLanes),
      u === 0 && (Bt = null),
      uc(n.stateNode),
      Ie(e, fe()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
    if (yl) throw ((yl = !1), (e = hi), (hi = null), e);
    return (
      wl & 1 && e.tag !== 0 && On(),
      (u = e.pendingLanes),
      u & 1 ? (e === vi ? yr++ : ((yr = 0), (vi = e))) : (yr = 0),
      Ut(),
      null
    );
  }
  function On() {
    if (Wt !== null) {
      var e = oo(wl),
        t = qe.transition,
        n = b;
      try {
        if (((qe.transition = null), (b = 16 > e ? 16 : e), Wt === null)) var r = !1;
        else {
          if (((e = Wt), (Wt = null), (wl = 0), Y & 6)) throw Error(c(331));
          var l = Y;
          for (Y |= 4, _ = e.current; _ !== null; ) {
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
                          C = w.return;
                        if ((ua(w), w === h)) {
                          _ = null;
                          break;
                        }
                        if (y !== null) {
                          (y.return = C), (_ = y);
                          break;
                        }
                        _ = C;
                      }
                  }
                }
                var P = u.alternate;
                if (P !== null) {
                  var z = P.child;
                  if (z !== null) {
                    P.child = null;
                    do {
                      var de = z.sibling;
                      (z.sibling = null), (z = de);
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
                var p = u.sibling;
                if (p !== null) {
                  (p.return = u.return), (_ = p);
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
                  } catch (T) {
                    ce(o, o.return, T);
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
          if (((Y = l), Ut(), pt && typeof pt.onPostCommitFiberRoot == "function"))
            try {
              pt.onPostCommitFiberRoot(Pr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        (b = n), (qe.transition = t);
      }
    }
    return !1;
  }
  function ka(e, t, n) {
    (t = Tn(n, t)), (t = As(e, t, 1)), (e = Vt(e, t, 1)), (t = Te()), e !== null && (Hn(e, 1, t), Ie(e, t));
  }
  function ce(e, t, n) {
    if (e.tag === 3) ka(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          ka(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" && (Bt === null || !Bt.has(r)))
          ) {
            (e = Tn(n, e)), (e = Vs(t, e, 1)), (t = Vt(t, e, 1)), (e = Te()), t !== null && (Hn(t, 1, e), Ie(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Of(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (t = Te()),
      (e.pingedLanes |= e.suspendedLanes & n),
      ye === e &&
        (Se & n) === n &&
        (he === 4 || (he === 3 && (Se & 130023424) === Se && 500 > fe() - mi) ? un(e, 0) : (pi |= n)),
      Ie(e, t);
  }
  function Ea(e, t) {
    t === 0 && (e.mode & 1 ? ((t = Tr), (Tr <<= 1), !(Tr & 130023424) && (Tr = 4194304)) : (t = 1));
    var n = Te();
    (e = Ct(e, t)), e !== null && (Hn(e, t, n), Ie(e, n));
  }
  function Mf(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), Ea(e, n);
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
    r !== null && r.delete(t), Ea(e, n);
  }
  var Ca;
  Ca = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || je.current) Me = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (Me = !1), Ef(e, t, n);
        Me = !!(e.flags & 131072);
      }
    else (Me = !1), ie && t.flags & 1048576 && ns(t, Jr, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        dl(e, t), (e = t.pendingProps);
        var l = kn(t, Ce.current);
        Pn(t, n), (l = Qu(null, t, r, e, l, n));
        var u = Ku();
        return (
          (t.flags |= 1),
          typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Oe(r) ? ((u = !0), Gr(t)) : (u = !1),
              (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
              Uu(t),
              (l.updater = cl),
              (t.stateNode = l),
              (l._reactInternals = t),
              qu(t, r, e, n),
              (t = ni(null, t, r, !0, u, n)))
            : ((t.tag = 0), ie && u && zu(t), ze(null, t, l, n), (t = t.child)),
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
            (e = ot(r, e)),
            l)
          ) {
            case 0:
              t = ti(null, t, r, e, n);
              break e;
            case 1:
              t = Xs(null, t, r, e, n);
              break e;
            case 11:
              t = $s(null, t, r, e, n);
              break e;
            case 14:
              t = Qs(null, t, r, ot(r.type, e), n);
              break e;
          }
          throw Error(c(306, r, ""));
        }
        return t;
      case 0:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ot(r, l)), ti(e, t, r, l, n);
      case 1:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ot(r, l)), Xs(e, t, r, l, n);
      case 3:
        e: {
          if ((Zs(t), e === null)) throw Error(c(387));
          (r = t.pendingProps), (u = t.memoizedState), (l = u.element), fs(e, t), rl(t, r, null, n);
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
              (l = Tn(Error(c(423)), t)), (t = Js(e, t, r, n, l));
              break e;
            } else if (r !== l) {
              (l = Tn(Error(c(424)), t)), (t = Js(e, t, r, n, l));
              break e;
            } else
              for (
                We = Dt(t.stateNode.containerInfo.firstChild),
                  Be = t,
                  ie = !0,
                  it = null,
                  n = as(t, null, r, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((xn(), r === l)) {
              t = _t(e, t, n);
              break e;
            }
            ze(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          ms(t),
          e === null && Ru(t),
          (r = t.type),
          (l = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (i = l.children),
          Eu(r, l) ? (i = null) : u !== null && Eu(r, u) && (t.flags |= 32),
          Gs(e, t),
          ze(e, t, i, n),
          t.child
        );
      case 6:
        return e === null && Ru(t), null;
      case 13:
        return qs(e, t, n);
      case 4:
        return (
          Au(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = _n(t, null, r, n)) : ze(e, t, r, n),
          t.child
        );
      case 11:
        return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : ot(r, l)), $s(e, t, r, l, n);
      case 7:
        return ze(e, t, t.pendingProps, n), t.child;
      case 8:
        return ze(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return ze(e, t, t.pendingProps.children, n), t.child;
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
            if (ut(u.value, i)) {
              if (u.children === l.children && !je.current) {
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
                        (s = xt(-1, n & -n)), (s.tag = 2);
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
                        Iu(u.return, n, t),
                        (o.lanes |= n);
                      break;
                    }
                    s = s.next;
                  }
                } else if (u.tag === 10) i = u.type === t.type ? null : u.child;
                else if (u.tag === 18) {
                  if (((i = u.return), i === null)) throw Error(c(341));
                  (i.lanes |= n), (o = i.alternate), o !== null && (o.lanes |= n), Iu(i, n, t), (i = u.sibling);
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
          ze(e, t, l.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          Pn(t, n),
          (l = Ze(l)),
          (r = r(l)),
          (t.flags |= 1),
          ze(e, t, r, n),
          t.child
        );
      case 14:
        return (r = t.type), (l = ot(r, t.pendingProps)), (l = ot(r.type, l)), Qs(e, t, r, l, n);
      case 15:
        return Ks(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : ot(r, l)),
          dl(e, t),
          (t.tag = 1),
          Oe(r) ? ((e = !0), Gr(t)) : (e = !1),
          Pn(t, n),
          Fs(t, r, l),
          qu(t, r, l, n),
          ni(null, t, r, !0, e, n)
        );
      case 19:
        return ea(e, t, n);
      case 22:
        return Ys(e, t, n);
    }
    throw Error(c(156, t.tag));
  };
  function xa(e, t) {
    return no(e, t);
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
  function be(e, t, n, r) {
    return new If(e, t, n, r);
  }
  function Ei(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Ff(e) {
    if (typeof e == "function") return Ei(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === ft)) return 11;
      if (e === dt) return 14;
    }
    return 2;
  }
  function Kt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = be(e.tag, t, e.key, e.mode)),
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
  function Cl(e, t, n, r, l, u) {
    var i = 2;
    if (((r = e), typeof e == "function")) Ei(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else
      e: switch (e) {
        case Le:
          return sn(n.children, l, u, t);
        case Ye:
          (i = 8), (l |= 8);
          break;
        case zt:
          return (e = be(12, n, t, l | 2)), (e.elementType = zt), (e.lanes = u), e;
        case Ae:
          return (e = be(13, n, t, l)), (e.elementType = Ae), (e.lanes = u), e;
        case rt:
          return (e = be(19, n, t, l)), (e.elementType = rt), (e.lanes = u), e;
        case ae:
          return xl(n, l, u, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case gt:
                i = 10;
                break e;
              case Gt:
                i = 9;
                break e;
              case ft:
                i = 11;
                break e;
              case dt:
                i = 14;
                break e;
              case Re:
                (i = 16), (r = null);
                break e;
            }
          throw Error(c(130, e == null ? e : typeof e, ""));
      }
    return (t = be(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = u), t;
  }
  function sn(e, t, n, r) {
    return (e = be(7, e, r, t)), (e.lanes = n), e;
  }
  function xl(e, t, n, r) {
    return (e = be(22, e, r, t)), (e.elementType = ae), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
  }
  function Ci(e, t, n) {
    return (e = be(6, e, null, t)), (e.lanes = n), e;
  }
  function xi(e, t, n) {
    return (
      (t = be(4, e.children !== null ? e.children : [], e.key, t)),
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
      (this.eventTimes = Jl(0)),
      (this.expirationTimes = Jl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Jl(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null);
  }
  function _i(e, t, n, r, l, u, i, o, s) {
    return (
      (e = new Uf(e, t, n, o, s)),
      t === 1 ? ((t = 1), u === !0 && (t |= 8)) : (t = 0),
      (u = be(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (u.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Uu(u),
      e
    );
  }
  function Af(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Pe, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function _a(e) {
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
            if (Oe(t.type)) {
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
      if (Oe(n)) return bo(e, n, t);
    }
    return t;
  }
  function Na(e, t, n, r, l, u, i, o, s) {
    return (
      (e = _i(n, r, !0, e, l, u, i, o, s)),
      (e.context = _a(null)),
      (n = e.current),
      (r = Te()),
      (l = $t(n)),
      (u = xt(r, l)),
      (u.callback = t ?? null),
      Vt(n, u, l),
      (e.current.lanes = l),
      Hn(e, l, r),
      Ie(e, r),
      e
    );
  }
  function _l(e, t, n, r) {
    var l = t.current,
      u = Te(),
      i = $t(l);
    return (
      (n = _a(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = xt(u, i)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Vt(l, t, i)),
      e !== null && (ct(e, l, i, u), nl(e, l, i)),
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
  function Pa(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ni(e, t) {
    Pa(e, t), (e = e.alternate) && Pa(e, t);
  }
  function Vf() {
    return null;
  }
  var za =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Pi(e) {
    this._internalRoot = e;
  }
  (Pl.prototype.render = Pi.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      _l(e, t, null, null);
    }),
    (Pl.prototype.unmount = Pi.prototype.unmount =
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
      var t = co();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++);
      jt.splice(n, 0, e), n === 0 && mo(e);
    }
  };
  function zi(e) {
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
  function Ta() {}
  function Hf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var u = r;
        r = function () {
          var h = Nl(i);
          u.call(h);
        };
      }
      var i = Na(t, r, e, 0, null, !1, !1, "", Ta);
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
    var s = _i(e, 0, !1, null, null, !1, !1, "", Ta);
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
  (so = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Vn(t.pendingLanes);
          n !== 0 && (ql(t, n | 1), Ie(t, fe()), !(Y & 6) && ((jn = fe() + 500), Ut()));
        }
        break;
      case 13:
        ln(function () {
          var r = Ct(e, 1);
          if (r !== null) {
            var l = Te();
            ct(r, e, 1, l);
          }
        }),
          Ni(e, 1);
    }
  }),
    (bl = function (e) {
      if (e.tag === 13) {
        var t = Ct(e, 134217728);
        if (t !== null) {
          var n = Te();
          ct(t, e, 134217728, n);
        }
        Ni(e, 134217728);
      }
    }),
    (ao = function (e) {
      if (e.tag === 13) {
        var t = $t(e),
          n = Ct(e, t);
        if (n !== null) {
          var r = Te();
          ct(n, e, t, r);
        }
        Ni(e, t);
      }
    }),
    (co = function () {
      return b;
    }),
    (fo = function (e, t) {
      var n = b;
      try {
        return (b = e), t();
      } finally {
        b = n;
      }
    }),
    (Ql = function (e, t, n) {
      switch (t) {
        case "input":
          if ((Fl(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
                Di(r), Fl(r, l);
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
    (Xi = wi),
    (Zi = ln);
  var Bf = { usingClientEntryPoint: !1, Events: [lr, wn, Kr, Yi, Gi, wi] },
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
      currentDispatcherRef: Ee.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = eo(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: gr.findFiberByHostInstance || Vf,
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
        (Pr = Ll.inject(Wf)), (pt = Ll);
      } catch {}
  }
  return (
    (Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bf),
    (Fe.createPortal = function (e, t) {
      var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!zi(t)) throw Error(c(200));
      return Af(e, t, null, n);
    }),
    (Fe.createRoot = function (e, t) {
      if (!zi(e)) throw Error(c(299));
      var n = !1,
        r = "",
        l = za;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = _i(e, 1, !1, null, null, n, !1, r, l)),
        (e[wt] = t.current),
        tr(e.nodeType === 8 ? e.parentNode : e),
        new Pi(t)
      );
    }),
    (Fe.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error(c(188)) : ((e = Object.keys(e).join(",")), Error(c(268, e)));
      return (e = eo(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (Fe.flushSync = function (e) {
      return ln(e);
    }),
    (Fe.hydrate = function (e, t, n) {
      if (!zl(t)) throw Error(c(200));
      return Tl(null, e, t, !0, n);
    }),
    (Fe.hydrateRoot = function (e, t, n) {
      if (!zi(e)) throw Error(c(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        u = "",
        i = za;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = Na(t, null, e, 1, n ?? null, l, !1, u, i)),
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
    (Fe.render = function (e, t, n) {
      if (!zl(t)) throw Error(c(200));
      return Tl(null, e, t, !1, n);
    }),
    (Fe.unmountComponentAtNode = function (e) {
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
    (Fe.unstable_batchedUpdates = wi),
    (Fe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!zl(n)) throw Error(c(200));
      if (e == null || e._reactInternals === void 0) throw Error(c(38));
      return Tl(e, t, n, !1, r);
    }),
    (Fe.version = "18.3.1-next-f1338f8080-20240426"),
    Fe
  );
}
var Ua;
function ed() {
  if (Ua) return Ri.exports;
  Ua = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (v) {
        console.error(v);
      }
  }
  return d(), (Ri.exports = bf()), Ri.exports;
}
var Aa;
function td() {
  if (Aa) return Rl;
  Aa = 1;
  var d = ed();
  return (Rl.createRoot = d.createRoot), (Rl.hydrateRoot = d.hydrateRoot), Rl;
}
var nd = td();
const Va = (d) => {
    let v;
    const c = new Set(),
      x = (H, ee) => {
        const Q = typeof H == "function" ? H(v) : H;
        if (!Object.is(Q, v)) {
          const G = v;
          (v = (ee ?? (typeof Q != "object" || Q === null)) ? Q : Object.assign({}, v, Q)), c.forEach((ke) => ke(v, G));
        }
      },
      L = () => v,
      W = { setState: x, getState: L, getInitialState: () => F, subscribe: (H) => (c.add(H), () => c.delete(H)) },
      F = (v = d(x, L, W));
    return W;
  },
  rd = (d) => (d ? Va(d) : Va),
  ld = (d) => d;
function ud(d, v = ld) {
  const c = Pt.useSyncExternalStore(
    d.subscribe,
    () => v(d.getState()),
    () => v(d.getInitialState())
  );
  return Pt.useDebugValue(c), c;
}
const Ha = (d) => {
    const v = rd(d),
      c = (x) => ud(v, x);
    return Object.assign(c, v), c;
  },
  id = (d) => (d ? Ha(d) : Ha),
  Dl = id((d) => ({
    timestamp: 0,
    messages: [],
    stepCount: 0,
    inputType: "Definition",
    addMessage: (v) =>
      d((c) => {
        const x = c.messages.length > 0 && v.type === "step";
        return { messages: [...c.messages, v], stepCount: x ? c.stepCount + 1 : c.stepCount };
      }),
    clearMessages: () => d({ messages: [], stepCount: 0, inputType: "Definition" }),
    deleteMessage: (v) =>
      d((c) => {
        const x = c.messages.filter((I, A) => A !== v),
          L = x.filter((I) => I.type === "step").length;
        return { messages: x, stepCount: L };
      }),
    updateMessage: (v, c) => {
      d((x) => ({ messages: x.messages.map((L, I) => (I === v ? { ...L, content: c } : L)) }));
    },
    loadMessages: (v) => d({ messages: v, stepCount: v.filter((c) => c.type === "step").length }),
    setTimestamp: (v) => d({ timestamp: v }),
  }));
var $a = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
  Ba = Pt.createContext && Pt.createContext($a),
  od = ["attr", "size", "title"];
function sd(d, v) {
  if (d == null) return {};
  var c = ad(d, v),
    x,
    L;
  if (Object.getOwnPropertySymbols) {
    var I = Object.getOwnPropertySymbols(d);
    for (L = 0; L < I.length; L++)
      (x = I[L]), !(v.indexOf(x) >= 0) && Object.prototype.propertyIsEnumerable.call(d, x) && (c[x] = d[x]);
  }
  return c;
}
function ad(d, v) {
  if (d == null) return {};
  var c = {};
  for (var x in d)
    if (Object.prototype.hasOwnProperty.call(d, x)) {
      if (v.indexOf(x) >= 0) continue;
      c[x] = d[x];
    }
  return c;
}
function jl() {
  return (
    (jl = Object.assign
      ? Object.assign.bind()
      : function (d) {
          for (var v = 1; v < arguments.length; v++) {
            var c = arguments[v];
            for (var x in c) Object.prototype.hasOwnProperty.call(c, x) && (d[x] = c[x]);
          }
          return d;
        }),
    jl.apply(this, arguments)
  );
}
function Wa(d, v) {
  var c = Object.keys(d);
  if (Object.getOwnPropertySymbols) {
    var x = Object.getOwnPropertySymbols(d);
    v &&
      (x = x.filter(function (L) {
        return Object.getOwnPropertyDescriptor(d, L).enumerable;
      })),
      c.push.apply(c, x);
  }
  return c;
}
function Ol(d) {
  for (var v = 1; v < arguments.length; v++) {
    var c = arguments[v] != null ? arguments[v] : {};
    v % 2
      ? Wa(Object(c), !0).forEach(function (x) {
          cd(d, x, c[x]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(c))
        : Wa(Object(c)).forEach(function (x) {
            Object.defineProperty(d, x, Object.getOwnPropertyDescriptor(c, x));
          });
  }
  return d;
}
function cd(d, v, c) {
  return (
    (v = fd(v)),
    v in d ? Object.defineProperty(d, v, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : (d[v] = c),
    d
  );
}
function fd(d) {
  var v = dd(d, "string");
  return typeof v == "symbol" ? v : v + "";
}
function dd(d, v) {
  if (typeof d != "object" || !d) return d;
  var c = d[Symbol.toPrimitive];
  if (c !== void 0) {
    var x = c.call(d, v);
    if (typeof x != "object") return x;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (v === "string" ? String : Number)(d);
}
function Qa(d) {
  return d && d.map((v, c) => Pt.createElement(v.tag, Ol({ key: c }, v.attr), Qa(v.child)));
}
function Sr(d) {
  return (v) => Pt.createElement(pd, jl({ attr: Ol({}, d.attr) }, v), Qa(d.child));
}
function pd(d) {
  var v = (c) => {
    var { attr: x, size: L, title: I } = d,
      A = sd(d, od),
      W = L || c.size || "1em",
      F;
    return (
      c.className && (F = c.className),
      d.className && (F = (F ? F + " " : "") + d.className),
      Pt.createElement(
        "svg",
        jl({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0" }, c.attr, x, A, {
          className: F,
          style: Ol(Ol({ color: d.color || c.color }, c.style), d.style),
          height: W,
          width: W,
          xmlns: "http://www.w3.org/2000/svg",
        }),
        I && Pt.createElement("title", null, I),
        d.children
      )
    );
  };
  return Ba !== void 0 ? Pt.createElement(Ba.Consumer, null, (c) => v(c)) : v($a);
}
function md(d) {
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
  })(d);
}
function hd(d) {
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
  })(d);
}
function vd(d) {
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
  })(d);
}
function yd(d) {
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
  })(d);
}
function gd(d) {
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
  })(d);
}
class wd {
  constructor() {
    La(this, "vsCodeApi");
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
const Ml = new wd();
function Sd() {
  const { clearMessages: d } = Dl(),
    v = () => {
      Ml.postMessage({ command: "history" });
    };
  return M.jsx(M.Fragment, {
    children: M.jsxs("div", {
      className: "header flex",
      children: [
        M.jsx("div", { className: "title", children: "Chat with CRA" }),
        M.jsxs("div", {
          className: "icon flex",
          children: [
            M.jsx("div", { className: "icon-clear", onClick: d, children: M.jsx(md, {}) }),
            M.jsx("div", { className: "icon-history", onClick: v, children: M.jsx(yd, {}) }),
          ],
        }),
      ],
    }),
  });
}
function kd() {
  const d = window.navigator.userAgent.toLowerCase();
  return d.includes("mac") ? "mac" : d.includes("win") ? "windows" : d.includes("linux") ? "linux" : "unknown";
}
const Ka = (d, v) =>
    d.map(
      (c, x) => `${x === 0 ? "Definition" : x <= v + 1 ? "Step " + x : "Response between GPT and User"} ${c.content}`
    ).join(`
`),
  Ya = {
    sendInitMessage: (d) => {
      Ml.postMessage({ command: "initialRequest", value: d });
    },
    sendAdditionalMessage: (d, v) => {
      Ml.postMessage({ command: "button", value: d, number: v });
    },
  };
function Ed() {
  const d = Qe.useRef(null),
    { messages: v, addMessage: c, stepCount: x, timestamp: L, setTimestamp: I } = Dl(),
    [A, W] = Qe.useState(v.length > 0 ? "Step" : "Definition"),
    [F, H] = Qe.useState(!1);
  Qe.useEffect(() => {
    v.length === 0
      ? W("Definition")
      : ((v[v.length - 1].type === "Additional" || v[v.length - 1].type === "result") && W("Additional"),
        v[v.length - 1].type === "Step" && W("Step"));
  }, [v]);
  const ee = (U) => {
    const K = kd(),
      et = (K === "mac" && !U.metaKey && !U.shiftKey) || (K !== "mac" && !U.ctrlKey && !U.shiftKey),
      Ke = (K === "mac" && U.metaKey && !U.shiftKey) || (K !== "mac" && U.ctrlKey && !U.shiftKey);
    if (U.key === "Enter") {
      if (F) return;
      et
        ? (U.preventDefault(), v.length === 0 && I(Date.now()), Q())
        : Ke &&
          (U.preventDefault(),
          Ya.sendInitMessage(Ka(v, x)),
          window.postMessage({ command: "setLoading", data: !0 }),
          W("additional"));
    }
  };
  Qe.useEffect(() => {
    L !== 0 && v.length > 0 && Ml.postMessage({ command: "saveMessageLog", data: { timestamp: L, messages: v } });
  }, [v, L]);
  const Q = () => {
    const U = d.current;
    if (U !== null && U.innerText.trim() !== "") {
      const K = { type: A, content: U.innerText.trim(), editable: A !== "Definition" && A !== "Additional" };
      c(K), (U.innerText = ""), (A === "Definition" || A.startsWith("Step")) && W("Step");
    }
  };
  return M.jsxs("div", {
    className: "chat-input-container",
    children: [
      M.jsx(Cd, {}),
      M.jsxs("div", {
        className: "chat-input-wrapper",
        children: [
          M.jsx("div", {
            className: "chat-input",
            ref: d,
            contentEditable: "true",
            onKeyDown: ee,
            onCompositionStart: () => H(!0),
            onCompositionEnd: () => H(!1),
            "data-placeholder":
              A === "Definition"
                ? "Type your problem definition here..."
                : A.startsWith("Step")
                  ? "Type your steps here..."
                  : "Ask an additional question here...",
          }),
          M.jsxs("button", {
            className: "chat-input-button",
            onClick: Q,
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
          M.jsx("div", { className: "input-state-indicator", children: A }),
          M.jsxs("div", {
            id: "chatWithCodebase",
            children: [navigator.userAgent.toUpperCase().includes("MAC") ? "⌘" : "Ctrl", " ⏎ Run"],
          }),
        ],
      }),
    ],
  });
}
function Cd() {
  const [d, v] = Qe.useState("");
  return (
    Qe.useEffect(() => {
      const c = (x) => {
        const { command: L, data: I } = x.data;
        L === "activateDocument" && v(I);
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
        children: [M.jsx(vd, {}), d ? d.split("/").pop() : "No file selected"],
      }),
    })
  );
}
function xd() {
  const { messages: d, updateMessage: v, addMessage: c, loadMessages: x, setTimestamp: L } = Dl(),
    [I, A] = Qe.useState(!1);
  Qe.useEffect(() => {
    const H = (ee) => {
      const { command: Q, data: G } = ee.data;
      Q === "setGptResponse"
        ? (c({ type: "result", content: G, editable: !1 }), A(!1))
        : Q === "setLoading"
          ? A(G)
          : Q === "setSelectedLog" && (L(G.timestamp), x(G.messages));
    };
    return (
      window.addEventListener("message", H),
      () => {
        window.removeEventListener("message", H);
      }
    );
  }, [c, x, L]);
  const W = (H, ee) => {
      v(ee, H.target.innerText);
    },
    F = Qe.useRef(null);
  return (
    Qe.useEffect(() => {
      var H;
      (H = F.current) == null || H.scrollIntoView({ behavior: "smooth" });
    }, [d]),
    M.jsxs("main", {
      id: "chat-container",
      children: [
        d && d.length > 0
          ? M.jsx("div", {
              className: "messages-container flex",
              onClick: (H) => H.stopPropagation(),
              children: d.map((H, ee) => M.jsx(_d, { message: H, index: ee, handleBlur: W }, H.type + ee)),
            })
          : M.jsx("div", { className: "learnCRA", children: "LEARN CRA!!!" }),
        I ? M.jsx("div", { className: "loading", children: M.jsx(hd, {}) }) : null,
        M.jsx("div", { ref: F }),
      ],
    })
  );
}
function _d({ handleBlur: d, index: v, message: c }) {
  const { deleteMessage: x, messages: L, stepCount: I } = Dl(),
    A = c.type === "result" ? "result" : c.type.startsWith("Step") ? `${c.type} ${v}` : c.type,
    W = (F) => {
      Ya.sendAdditionalMessage(Ka(L, I), F);
    };
  return M.jsxs("div", {
    className: "message-box",
    children: [
      M.jsxs("div", {
        className: "message-text",
        children: [
          M.jsx("div", { className: "message-type", children: A }),
          M.jsx("div", {
            className: "message-content",
            contentEditable: c.editable,
            onBlur: (F) => d(F, v),
            children: c.content,
          }),
          A === "result" &&
            M.jsxs("div", {
              className: "message-actions",
              children: [
                M.jsx("span", { className: "message-actions-label", children: "Generate New Response:" }),
                M.jsxs("div", {
                  className: "message-buttons",
                  children: [
                    M.jsx("button", { onClick: () => W(1), children: "1" }),
                    M.jsx("button", { onClick: () => W(2), children: "2" }),
                    M.jsx("button", { onClick: () => W(3), children: "3" }),
                  ],
                }),
              ],
            }),
        ],
      }),
      M.jsx("div", {
        className: "message-icon",
        children:
          A !== "Definition" &&
          M.jsx("div", { className: "message-icon-trash", onClick: () => x(v), children: M.jsx(gd, {}) }),
      }),
    ],
  });
}
function Nd() {
  return M.jsxs("div", { id: "chat", children: [M.jsx(Sd, {}), M.jsx(xd, {}), M.jsx(Ed, {})] });
}
nd.createRoot(document.getElementById("root")).render(M.jsx(Qe.StrictMode, { children: M.jsx(Nd, {}) }));
