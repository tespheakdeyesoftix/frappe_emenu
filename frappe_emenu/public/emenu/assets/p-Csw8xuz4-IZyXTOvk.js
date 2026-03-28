const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/p-CBzELu-H-BtIl7oS4.js","assets/p-CBzELu-H-MFa_ySeT.js","assets/p-CU1SSH8_-iq2XNY0k.js","assets/p-CU1SSH8_-CAGd7vG5.js"])))=>i.map(i=>d[i]);
import { g as n$1, h as h$1, m as f$1, o as P$1, x as u$1 } from "./p-BJoMtgfR-BuCwhENi.js";
import { a as d$1 } from "./p-DgbT0exM-DlHHAI2P.js";
import { t as d$2 } from "./p-ZjP4CjeZ-Be3RcEPW.js";
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/assets/frappe_emenu/emenu/" + dep;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
			if (!!importerUrl) for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region node_modules/@ionic/core/components/p-9VcRUwdB.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var r$1 = "ionViewWillEnter", t$1 = "ionViewDidEnter", s = "ionViewWillLeave", c = "ionViewDidLeave", l = "ionViewWillUnload", u = (n) => {
	n.tabIndex = -1, n.focus();
}, d = (n) => null !== n.offsetParent, f = "ion-last-focus", p = (e) => {
	if (n$1.get("focusManagerPriority", !1)) {
		const n = document.activeElement;
		null !== n && null != e && e.contains(n) && n.setAttribute(f, "true");
	}
}, w = (i) => {
	const a = n$1.get("focusManagerPriority", !1);
	if (Array.isArray(a) && !i.contains(document.activeElement)) {
		const n = i.querySelector(`[${f}]`);
		if (n && d(n)) return void u(n);
		for (const n of a) switch (n) {
			case "content":
				const a = i.querySelector("main, [role=\"main\"]");
				if (a && d(a)) return void u(a);
				break;
			case "heading":
				const o = i.querySelector("h1, [role=\"heading\"][aria-level=\"1\"]");
				if (o && d(o)) return void u(o);
				break;
			case "banner":
				const r = i.querySelector("header, [role=\"banner\"]");
				if (r && d(r)) return void u(r);
				break;
			default: u$1(`Unrecognized focus manager priority value ${n}`);
		}
		u(i);
	}
}, v = (n) => new Promise(((e, a) => {
	P$1((() => {
		const i = z(n);
		m(n, i), g(n).then(((i) => {
			i.animation && i.animation.destroy(), b(n), e(i);
		}), ((e) => {
			b(n), a(e);
		})).finally((() => {
			W(i, !1);
		}));
	}));
})), m = (n, e) => {
	const i = n.enteringEl, a = n.leavingEl;
	p(a), U(i, a, n.direction), W(e, !0), n.showGoBack ? i.classList.add("can-go-back") : i.classList.remove("can-go-back"), D(i, !1), i.style.setProperty("pointer-events", "none"), a && (D(a, !1), a.style.setProperty("pointer-events", "none"));
}, g = async (n) => {
	const e = await h(n);
	return e && h$1.isBrowser ? y(e, n) : P(n);
}, b = (n) => {
	const e = n.enteringEl, i = n.leavingEl;
	e.classList.remove("ion-page-invisible"), e.style.removeProperty("pointer-events"), void 0 !== i && (i.classList.remove("ion-page-invisible"), i.style.removeProperty("pointer-events")), w(e);
}, h = async (n) => {
	if (n.leavingEl && n.animated && 0 !== n.duration) return n.animationBuilder ? n.animationBuilder : "ios" === n.mode ? (await __vitePreload(async () => {
		const { iosTransitionAnimation } = await import("./p-CBzELu-H-BtIl7oS4.js");
		return { iosTransitionAnimation };
	}, __vite__mapDeps([0,1]))).iosTransitionAnimation : (await __vitePreload(async () => {
		const { mdTransitionAnimation } = await import("./p-CU1SSH8_-iq2XNY0k.js");
		return { mdTransitionAnimation };
	}, __vite__mapDeps([2,3]))).mdTransitionAnimation;
}, y = async (n, e) => {
	await k(e, !0);
	const i = n(e.baseEl, e);
	V(e.enteringEl, e.leavingEl);
	const a = await M(i, e);
	return e.progressCallback && e.progressCallback(void 0), a && j(e.enteringEl, e.leavingEl), {
		hasCompleted: a,
		animation: i
	};
}, P = async (e) => {
	const i = e.enteringEl, a = e.leavingEl;
	return await k(e, n$1.get("focusManagerPriority", !1)), V(i, a), j(i, a), { hasCompleted: !0 };
}, k = async (n, e) => {
	(void 0 !== n.deepWait ? n.deepWait : e) && await Promise.all([B(n.enteringEl), B(n.leavingEl)]), await C(n.viewIsReady, n.enteringEl);
}, C = async (n, e) => {
	n && await n(e);
}, M = (n, e) => {
	const i = e.progressCallback, a = new Promise(((e) => {
		n.onFinish(((n) => e(1 === n)));
	}));
	return i ? (n.progressStart(!0), i(n)) : n.play(), a;
}, V = (n, e) => {
	E(e, s), E(n, r$1);
}, j = (n, e) => {
	E(n, t$1), E(e, c);
}, E = (n, e) => {
	if (n) {
		const i = new CustomEvent(e, {
			bubbles: !1,
			cancelable: !1
		});
		n.dispatchEvent(i);
	}
}, L = () => new Promise(((n) => d$1((() => d$1((() => n())))))), B = async (n) => {
	const e = n;
	if (e) {
		if (null != e.componentOnReady) {
			if (null != await e.componentOnReady()) return;
		} else if (null != e.__registerHost) {
			await new Promise(((n) => d$1(n)));
			return;
		}
		await Promise.all(Array.from(e.children).map(B));
	}
}, D = (n, e) => {
	e ? (n.setAttribute("aria-hidden", "true"), n.classList.add("ion-page-hidden")) : (n.hidden = !1, n.removeAttribute("aria-hidden"), n.classList.remove("ion-page-hidden"));
}, U = (n, e, i) => {
	void 0 !== n && (n.style.zIndex = "back" === i ? "99" : "101"), void 0 !== e && (e.style.zIndex = "100");
}, W = (n, e) => {
	if (!n) return;
	const i = "header-transitioning";
	e ? n.classList.add(i) : n.classList.remove(i);
}, x = (n) => {
	if (n.classList.contains("ion-page")) return n;
	return n.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n;
}, z = (n) => {
	if ("ios" !== n.mode) return null;
	const e = "back" === n.direction ? n.leavingEl : n.enteringEl;
	return e ? e.querySelector("ion-header") : null;
};
//#endregion
//#region node_modules/@ionic/core/components/p-Csw8xuz4.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var t;
var i = (e, o, i) => {
	const n = o.startsWith("animation") ? (r = e, void 0 === t && (t = void 0 === r.style.animationName && void 0 !== r.style.webkitAnimationName ? "-webkit-" : ""), t) : "";
	var r;
	e.style.setProperty(n + o, i);
}, n = (e = [], o) => {
	if (void 0 !== o) {
		const t = Array.isArray(o) ? o : [o];
		return [...e, ...t];
	}
	return e;
}, r = (t) => {
	let r, a, s, d, l, f, c, v, m, u, p, y = [], g = [], A = [], b = !1, C = {}, E = [], h = [], R = {}, S = 0, j = !1, k = !1, w = !0, T = !1, D = !0, F = !1;
	const M = t, W = [], I = [], K = [], P = [], Z = [], x = [], B = [], J = [], q = [], z = [], G = [], H = "function" == typeof AnimationEffect || void 0 !== d$2 && "function" == typeof d$2.AnimationEffect, L = "function" == typeof Element && "function" == typeof Element.prototype.animate && H, N = () => G, O = (e, o) => {
		const t = o.findIndex(((o) => o.c === e));
		t > -1 && o.splice(t, 1);
	}, Q = (e, o) => (((null == o ? void 0 : o.oneTimeCallback) ? I : W).push({
		c: e,
		o
	}), p), U = () => {
		L && (G.forEach(((e) => {
			e.cancel();
		})), G.length = 0);
	}, V = () => {
		x.forEach(((e) => {
			null != e && e.parentNode && e.parentNode.removeChild(e);
		})), x.length = 0;
	}, X = () => void 0 !== l ? l : c ? c.getFill() : "both", Y = () => void 0 !== v ? v : void 0 !== f ? f : c ? c.getDirection() : "normal", $ = () => j ? "linear" : void 0 !== s ? s : c ? c.getEasing() : "linear", _ = () => k ? 0 : void 0 !== m ? m : void 0 !== a ? a : c ? c.getDuration() : 0, ee = () => void 0 !== d ? d : c ? c.getIterations() : 1, oe = () => void 0 !== u ? u : void 0 !== r ? r : c ? c.getDelay() : 0, te = () => {
		0 !== S && (S--, 0 === S && ((() => {
			q.forEach(((e) => e())), z.forEach(((e) => e()));
			const e = w ? 1 : 0, o = E, t = h, n = R;
			P.forEach(((e) => {
				const r = e.classList;
				o.forEach(((e) => r.add(e))), t.forEach(((e) => r.remove(e)));
				for (const o in n) n.hasOwnProperty(o) && i(e, o, n[o]);
			})), m = void 0, v = void 0, u = void 0, W.forEach(((o) => o.c(e, p))), I.forEach(((o) => o.c(e, p))), I.length = 0, D = !0, w && (T = !0), w = !0;
		})(), c && c.animationFinish()));
	}, ie = () => {
		(() => {
			B.forEach(((e) => e())), J.forEach(((e) => e()));
			const e = g, o = A, t = C;
			P.forEach(((n) => {
				const r = n.classList;
				e.forEach(((e) => r.add(e))), o.forEach(((e) => r.remove(e)));
				for (const e in t) t.hasOwnProperty(e) && i(n, e, t[e]);
			}));
		})(), y.length > 0 && L && (P.forEach(((e) => {
			const o = e.animate(y, {
				id: M,
				delay: oe(),
				duration: _(),
				easing: $(),
				iterations: ee(),
				fill: X(),
				direction: Y()
			});
			o.pause(), G.push(o);
		})), G.length > 0 && (G[0].onfinish = () => {
			te();
		})), b = !0;
	}, ne = (e) => {
		e = Math.min(Math.max(e, 0), .9999), L && G.forEach(((o) => {
			o.currentTime = o.effect.getComputedTiming().delay + _() * e, o.pause();
		}));
	}, re = (e) => {
		G.forEach(((e) => {
			e.effect.updateTiming({
				delay: oe(),
				duration: _(),
				easing: $(),
				iterations: ee(),
				fill: X(),
				direction: Y()
			});
		})), void 0 !== e && ne(e);
	}, ae = (e = !1, o = !0, t) => (e && Z.forEach(((i) => {
		i.update(e, o, t);
	})), L && re(t), p), se = () => {
		b && (L ? G.forEach(((e) => {
			e.pause();
		})) : P.forEach(((e) => {
			i(e, "animation-play-state", "paused");
		})), F = !0);
	}, de = (e) => new Promise(((o) => {
		null != e && e.sync && (k = !0, Q((() => k = !1), { oneTimeCallback: !0 })), b || ie(), T && (L && (ne(0), re()), T = !1), D && (S = Z.length + 1, D = !1);
		const t = () => {
			O(i, I), o();
		}, i = () => {
			O(t, K), o();
		};
		Q(i, { oneTimeCallback: !0 }), K.push({
			c: t,
			o: { oneTimeCallback: !0 }
		}), Z.forEach(((e) => {
			e.play();
		})), L ? (G.forEach(((e) => {
			e.play();
		})), 0 !== y.length && 0 !== P.length || te()) : te(), F = !1;
	})), le = (e, o) => {
		const t = y[0];
		return void 0 === t || void 0 !== t.offset && 0 !== t.offset ? y = [{
			offset: 0,
			[e]: o
		}, ...y] : t[e] = o, p;
	};
	return p = {
		parentAnimation: c,
		elements: P,
		childAnimations: Z,
		id: M,
		animationFinish: te,
		from: le,
		to: (e, o) => {
			const t = y[y.length - 1];
			return void 0 === t || void 0 !== t.offset && 1 !== t.offset ? y = [...y, {
				offset: 1,
				[e]: o
			}] : t[e] = o, p;
		},
		fromTo: (e, o, t) => le(e, o).to(e, t),
		parent: (e) => (c = e, p),
		play: de,
		pause: () => (Z.forEach(((e) => {
			e.pause();
		})), se(), p),
		stop: () => {
			Z.forEach(((e) => {
				e.stop();
			})), b && (U(), b = !1), j = !1, k = !1, D = !0, v = void 0, m = void 0, u = void 0, S = 0, T = !1, w = !0, F = !1, K.forEach(((e) => e.c(0, p))), K.length = 0;
		},
		destroy: (e) => (Z.forEach(((o) => {
			o.destroy(e);
		})), ((e) => {
			U(), e && V();
		})(e), P.length = 0, Z.length = 0, y.length = 0, W.length = 0, I.length = 0, b = !1, D = !0, p),
		keyframes: (e) => {
			const o = y !== e;
			return y = e, o && ((e) => {
				L && N().forEach(((o) => {
					const t = o.effect;
					if (t.setKeyframes) t.setKeyframes(e);
					else o.effect = new KeyframeEffect(t.target, e, t.getTiming());
				}));
			})(y), p;
		},
		addAnimation: (e) => {
			if (null != e) if (Array.isArray(e)) for (const o of e) o.parent(p), Z.push(o);
			else e.parent(p), Z.push(e);
			return p;
		},
		addElement: (o) => {
			if (null != o) if (1 === o.nodeType) P.push(o);
			else if (o.length >= 0) for (let e = 0; e < o.length; e++) P.push(o[e]);
			else f$1("createAnimation - Invalid addElement value.");
			return p;
		},
		update: ae,
		fill: (e) => (l = e, ae(!0), p),
		direction: (e) => (f = e, ae(!0), p),
		iterations: (e) => (d = e, ae(!0), p),
		duration: (e) => (L || 0 !== e || (e = 1), a = e, ae(!0), p),
		easing: (e) => (s = e, ae(!0), p),
		delay: (e) => (r = e, ae(!0), p),
		getWebAnimations: N,
		getKeyframes: () => y,
		getFill: X,
		getDirection: Y,
		getDelay: oe,
		getIterations: ee,
		getEasing: $,
		getDuration: _,
		afterAddRead: (e) => (q.push(e), p),
		afterAddWrite: (e) => (z.push(e), p),
		afterClearStyles: (e = []) => {
			for (const o of e) R[o] = "";
			return p;
		},
		afterStyles: (e = {}) => (R = e, p),
		afterRemoveClass: (e) => (h = n(h, e), p),
		afterAddClass: (e) => (E = n(E, e), p),
		beforeAddRead: (e) => (B.push(e), p),
		beforeAddWrite: (e) => (J.push(e), p),
		beforeClearStyles: (e = []) => {
			for (const o of e) C[o] = "";
			return p;
		},
		beforeStyles: (e = {}) => (C = e, p),
		beforeRemoveClass: (e) => (A = n(A, e), p),
		beforeAddClass: (e) => (g = n(g, e), p),
		onFinish: Q,
		isRunning: () => 0 !== S && !F,
		progressStart: (e = !1, o) => (Z.forEach(((t) => {
			t.progressStart(e, o);
		})), se(), j = e, b || ie(), ae(!1, !0, o), p),
		progressStep: (e) => (Z.forEach(((o) => {
			o.progressStep(e);
		})), ne(e), p),
		progressEnd: (e, o, t) => (j = !1, Z.forEach(((i) => {
			i.progressEnd(e, o, t);
		})), void 0 !== t && (m = t), T = !1, w = !0, 0 === e ? (v = "reverse" === Y() ? "normal" : "reverse", "reverse" === v && (w = !1), L ? (ae(), ne(1 - o)) : (u = (1 - o) * _() * -1, ae(!1, !1))) : 1 === e && (L ? (ae(), ne(o)) : (u = o * _() * -1, ae(!1, !1))), void 0 === e || c || de(), p)
	};
};
//#endregion
export { L as a, r$1 as c, v as d, x as f, E as i, s as l, B as n, c as o, __vitePreload as p, D as r, l as s, r as t, t$1 as u };

//# sourceMappingURL=p-Csw8xuz4-IZyXTOvk.js.map