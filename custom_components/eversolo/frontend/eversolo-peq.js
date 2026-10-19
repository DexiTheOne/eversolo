//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible, d = () => {};
function f(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function p() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function m(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, ee = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("legacy props"), oe = Symbol(""), E = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), D = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function se(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function ce() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function le(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ue(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function de() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function fe(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function pe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function me(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function he() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ge() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ve() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var ye = {}, O = Symbol(), be = "http://www.w3.org/1999/xhtml";
function xe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Se(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ce() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function k() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var A = !1;
function we(e) {
	A = e;
}
var j;
function Te(e) {
	if (e === null) throw Se(), ye;
	return j = e;
}
function Ee() {
	return Te(/* @__PURE__ */ Qt(j));
}
function M(e) {
	if (A) {
		if (/* @__PURE__ */ Qt(j) !== null) throw Se(), ye;
		j = e;
	}
}
function De(e = 1) {
	if (A) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ Qt(n);
		j = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = j;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Qt(n);
		e && n.remove(), n = i;
	}
}
function ke(e) {
	if (!e || e.nodeType !== 8) throw Se(), ye;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ae(e) {
	return e === this.v;
}
function je(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Me(e) {
	return !je(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var Ne = !1, Pe = !1, N = null;
function Fe(e) {
	N = e;
}
function Ie(e, t = !1, n) {
	N = {
		p: N,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: Pe && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function Le(e) {
	var t = N, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) mn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, N = t.p, e ?? {};
}
function Re() {
	return !Pe || N !== null && N.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var ze = [];
function Be() {
	var e = ze;
	ze = [], f(e);
}
function Ve(e) {
	if (ze.length === 0 && !tt) {
		var t = ze;
		queueMicrotask(() => {
			t === ze && Be();
		});
	}
	ze.push(e);
}
function He() {
	for (; ze.length > 0;) Be();
}
function Ue(e) {
	var t = G;
	if (t === null) return W.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	P(e, t);
}
function P(e, t) {
	for (; t !== null;) {
		if (t.f & 128) {
			if (!(t.f & 32768)) throw e;
			try {
				t.b.error(e);
				return;
			} catch (t) {
				e = t;
			}
		}
		t = t.parent;
	}
	throw e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var We = ~(g | _ | h);
function F(e, t) {
	e.f = e.f & We | t;
}
function Ge(e) {
	e.f & 512 || e.deps === null ? F(e, h) : F(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Ke(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ee, Ke(t.deps));
}
function qe(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Ke(e.deps), F(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Je = !1, Ye = !1;
function Xe(e) {
	var t = Ye;
	try {
		return Ye = !1, [e(), Ye];
	} finally {
		Ye = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ze = /* @__PURE__ */ new Set(), I = null, Qe = null, $e = null, et = null, tt = !1, nt = !1, rt = null, it = null, at = 0, ot = 1, st = class e {
	id = ot++;
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#e = /* @__PURE__ */ new Set();
	#t = /* @__PURE__ */ new Set();
	#n = /* @__PURE__ */ new Set();
	#r = /* @__PURE__ */ new Map();
	#i = /* @__PURE__ */ new Map();
	#a = null;
	#o = [];
	#s = [];
	#c = /* @__PURE__ */ new Set();
	#l = /* @__PURE__ */ new Set();
	#u = /* @__PURE__ */ new Map();
	#d = /* @__PURE__ */ new Set();
	is_fork = !1;
	#f = !1;
	#p = /* @__PURE__ */ new Set();
	#m() {
		return this.is_fork || this.#i.size > 0;
	}
	#h() {
		for (let n of this.#p) for (let r of n.#i.keys()) {
			for (var e = !1, t = r; t.parent !== null;) {
				if (this.#u.has(t)) {
					e = !0;
					break;
				}
				t = t.parent;
			}
			if (!e) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#u.has(e) || this.#u.set(e, {
			d: [],
			m: []
		}), this.#d.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#u.get(e);
		if (n) {
			this.#u.delete(e);
			for (var r of n.d) F(r, g), t(r);
			for (r of n.m) F(r, _), t(r);
		}
		this.#d.add(e);
	}
	#g() {
		if (at++ > 1e3 && (Ze.delete(this), lt()), !this.#m()) {
			for (let e of this.#c) this.#l.delete(e), F(e, g), this.schedule(e);
			for (let e of this.#l) F(e, _), this.schedule(e);
		}
		let t = this.#o;
		this.#o = [], this.apply();
		var n = rt = [], r = [], i = it = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw gt(e), t;
		}
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (rt = null, it = null, this.#m() || this.#h()) {
			this.#v(r), this.#v(n);
			for (let [e, t] of this.#u) ht(e, t);
		} else {
			this.#r.size === 0 && Ze.delete(this), this.#c.clear(), this.#l.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), Qe = this, dt(r), dt(n), Qe = null, this.#a?.resolve();
		}
		var o = I;
		if (this.#o.length > 0) {
			let e = o ??= this;
			e.#o.push(...this.#o.filter((t) => !e.#o.includes(t)));
		}
		o !== null && (Ze.add(o), o.#g()), Ne && !Ze.has(this) && this.#y();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#u.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : Ne && i & 16777224 ? n.push(r) : Xn(r) && (i & 16 && this.#l.add(r), tr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v(e) {
		for (var t = 0; t < e.length; t += 1) qe(e[t], this.#c, this.#l);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), $e?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, $e = null;
	}
	flush() {
		try {
			nt = !0, I = this, this.#g();
		} finally {
			at = 0, et = null, rt = null, it = null, nt = !1, I = null, $e = null, Pt.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear(), this.#n.clear(), Ze.delete(this);
	}
	register_created_effect(e) {
		this.#s.push(e);
	}
	#y() {
		for (let l of Ze) {
			var e = l.id < this.id, t = [];
			for (let [r, [i, a]] of this.current) {
				if (l.current.has(r)) {
					var n = l.current.get(r)[0];
					if (e && i !== n) l.current.set(r, [i, a]);
					else continue;
				}
				t.push(r);
			}
			var r = [...l.current.keys()].filter((e) => !this.current.has(e));
			if (r.length === 0) e && l.discard();
			else if (t.length > 0) {
				if (e) for (let e of this.#d) l.unskip_effect(e, (e) => {
					e.f & 4194320 ? l.schedule(e) : l.#v([e]);
				});
				l.activate();
				var i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
				for (var o of t) ft(o, r, i, a);
				a = /* @__PURE__ */ new Map();
				var s = [...l.current.keys()].filter((e) => this.current.has(e) ? this.current.get(e)[0] !== e : !0);
				for (let e of this.#s) !(e.f & 155648) && pt(e, s, a) && (e.f & 4194320 ? (F(e, g), l.schedule(e)) : l.#c.add(e));
				if (l.#o.length > 0) {
					l.apply();
					for (var c of l.#o) l.#_(c, [], []);
					l.#o = [];
				}
				l.deactivate();
			}
		}
		for (let e of Ze) e.#p.has(this) && (e.#p.delete(this), e.#p.size === 0 && !e.#m() && (e.activate(), e.#g()));
	}
	increment(e, t) {
		let n = this.#r.get(t) ?? 0;
		if (this.#r.set(t, n + 1), e) {
			let e = this.#i.get(t) ?? 0;
			this.#i.set(t, e + 1);
		}
	}
	decrement(e, t, n) {
		let r = this.#r.get(t) ?? 0;
		if (r === 1 ? this.#r.delete(t) : this.#r.set(t, r - 1), e) {
			let e = this.#i.get(t) ?? 0;
			e === 1 ? this.#i.delete(t) : this.#i.set(t, e - 1);
		}
		this.#f || n || (this.#f = !0, Ve(() => {
			this.#f = !1, this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#c.add(t);
		for (let e of t) this.#l.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#e.add(e);
	}
	ondiscard(e) {
		this.#t.add(e);
	}
	on_fork_commit(e) {
		this.#n.add(e);
	}
	run_fork_commit_callbacks() {
		for (let e of this.#n) e(this);
		this.#n.clear();
	}
	settled() {
		return (this.#a ??= p()).promise;
	}
	static ensure() {
		if (I === null) {
			let t = I = new e();
			nt || (Ze.add(I), tt || Ve(() => {
				I === t && t.flush();
			}));
		}
		return I;
	}
	apply() {
		if (!Ne || !this.is_fork && Ze.size === 1) {
			$e = null;
			return;
		}
		$e = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) $e.set(e, t);
		for (let n of Ze) if (!(n === this || n.is_fork)) {
			var e = !1, t = !1;
			if (n.id < this.id) for (let [r, [, i]] of n.current) i || (e ||= this.current.has(r), t ||= !this.current.has(r));
			if (e && t) this.#p.add(n);
			else for (let [e, t] of n.previous) $e.has(e) || $e.set(e, t);
		}
	}
	schedule(e) {
		if (et = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (rt !== null && t === G && (Ne || (W === null || !(W.f & 2)) && !Je)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= h;
			}
		}
		this.#o.push(t);
	}
};
function ct(e) {
	var t = tt;
	tt = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (He(), I === null) return n;
			I.flush();
		}
	} finally {
		tt = t;
	}
}
function lt() {
	try {
		pe();
	} catch (e) {
		P(e, et);
	}
}
var ut = null;
function dt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Xn(r) && (ut = /* @__PURE__ */ new Set(), tr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && En(r), ut?.size > 0)) {
				Pt.clear();
				for (let e of ut) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) ut.has(n) && (ut.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || tr(n);
					}
				}
				ut.clear();
			}
		}
		ut = null;
	}
}
function ft(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? ft(i, t, n, r) : e & 4194320 && !(e & 2048) && pt(i, t, r) && (F(i, g), mt(i));
	}
}
function pt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && pt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function mt(e) {
	I.schedule(e);
}
function ht(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), F(e, h);
		for (var n = e.first; n !== null;) ht(n, t), n = n.next;
	}
}
function gt(e) {
	F(e, h);
	for (var t = e.first; t !== null;) gt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function _t(e) {
	let t = 0, n = It(0), r;
	return () => {
		dn() && (K(n), vn(() => (t === 0 && (r = ar(() => e(() => Bt(n)))), t += 1, () => {
			Ve(() => {
				--t, t === 0 && (r?.(), r = void 0, Bt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var vt = S | C;
function yt(e, t, n, r) {
	new bt(e, t, n, r);
}
var bt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = A ? j : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = _t(() => (this.#m = It(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = yn(() => {
			if (A) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, vt), A && (this.#e = j);
	}
	#g() {
		try {
			this.#a = bn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = bn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = bn(() => e(this.#e)), Ve(() => {
			var e = this.#c = document.createDocumentFragment(), t = Xt();
			e.append(t), this.#a = this.#x(() => bn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Dn(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = bn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				jn(this.#a, e);
				let t = this.#n.pending;
				this.#o = bn(() => t(this.#e));
			} else this.#b(I);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		qe(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = G, n = W, r = N;
		Rn(this.#i), Ln(this.#i), Fe(this.#i.ctx);
		try {
			return st.ensure(), e();
		} catch (e) {
			return Ue(e), null;
		} finally {
			Rn(t), Ln(n), Fe(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Dn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ve(() => {
			this.#d = !1, this.#m && Rt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (wn(this.#a), null), this.#o &&= (wn(this.#o), null), this.#s &&= (wn(this.#s), null), A && (Te(this.#t), De(), Te(Oe()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				k();
				return;
			}
			r = !0, i && ve(), this.#s !== null && Dn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				P(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return bn(() => {
						var t = G;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return P(e, this.#i.parent), null;
				}
			}));
		};
		Ve(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				P(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => P(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function xt(e, t, n, r) {
	let i = Re() ? Tt : Dt;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = G, s = St(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		s();
		try {
			r(e);
		} catch (e) {
			o.f & 16384 || P(e, o);
		}
		Ct();
	}
	if (n.length === 0) {
		c.then(() => l(t.map(i)));
		return;
	}
	var u = wt();
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Et(e))).then((e) => l([...t.map(i), ...e])).catch((e) => P(e, o)).finally(() => u());
	}
	c ? c.then(() => {
		s(), d(), Ct();
	}) : d();
}
function St() {
	var e = G, t = W, n = N, r = I;
	return function(i = !0) {
		Rn(e), Ln(t), Fe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Ct(e = !0) {
	Rn(null), Ln(null), Fe(null), e && I?.deactivate();
}
function wt() {
	var e = G, t = e.b, n = I, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), (i = !1) => {
		t.update_pending_count(-1, n), n.decrement(r, e, i);
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Tt(e) {
	var t = 2 | g;
	return G !== null && (G.f |= C), {
		ctx: N,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: G,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Et(e, t, n) {
	let r = G;
	r === null && ce();
	var i = void 0, a = It(O), o = !W, s = /* @__PURE__ */ new Map();
	return _n(() => {
		var t = G, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, n.reject).finally(Ct);
		} catch (e) {
			n.reject(e), Ct();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = wt();
			if (r.b.is_rendered()) s.get(c)?.reject(E), s.delete(c);
			else {
				for (let e of s.values()) e.reject(E);
				s.clear();
			}
			s.set(c, n);
		}
		let u = (e, n = void 0) => {
			if (l && l(n === E), !(n === E || t.f & 16384)) {
				if (c.activate(), n) a.f |= re, Rt(a, n);
				else {
					a.f & 8388608 && (a.f ^= re), Rt(a, e);
					for (let [e, t] of s) {
						if (s.delete(e), e === c) break;
						t.reject(E);
					}
				}
				c.deactivate();
			}
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), fn(() => {
		for (let e of s.values()) e.reject(E);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function L(e) {
	let t = /* @__PURE__ */ Tt(e);
	return Ne || Bn(t), t;
}
/* @__NO_SIDE_EFFECTS__ */
function Dt(e) {
	let t = /* @__PURE__ */ Tt(e);
	return t.equals = Me, t;
}
function Ot(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) wn(t[n]);
	}
}
function kt(e) {
	var t, n = G, r = e.parent;
	if (!Pn && r !== null && r.f & 24576) return xe(), e.v;
	Rn(r);
	try {
		e.f &= ~ee, Ot(e), t = Qn(e);
	} finally {
		Rn(n);
	}
	return t;
}
function At(e) {
	var t = kt(e);
	if (!e.equals(t) && (e.wv = Yn(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : I.capture(e, t, !0), e.deps === null))) {
		F(e, h);
		return;
	}
	Pn || ($e === null ? Ge(e) : (dn() || I?.is_fork) && $e.set(e, t));
}
function jt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(E), t.teardown = d, t.ac = null, er(t, 0), Sn(t));
}
function Mt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && tr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Nt = /* @__PURE__ */ new Set(), Pt = /* @__PURE__ */ new Map(), Ft = !1;
function It(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function R(e, t) {
	let n = It(e, t);
	return Bn(n), n;
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e, t = !1, n = !0) {
	let r = It(e);
	return t || (r.equals = Me), Pe && n && N !== null && N.l !== null && (N.l.s ??= []).push(r), r;
}
function z(e, t, r = !1) {
	return W !== null && (!In || W.f & 131072) && Re() && W.f & 4325394 && (zn === null || !n.call(zn, e)) && _e(), Rt(e, r ? Ht(t) : t, it);
}
function Rt(e, t, n = null) {
	if (!e.equals(t)) {
		Pt.set(e, Pn ? t : e.v);
		var r = st.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && kt(t), $e === null && Ge(t);
		}
		e.wv = Yn(), Vt(e, g, n), Re() && G !== null && G.f & 1024 && !(G.f & 96) && (Un === null ? Wn([e]) : Un.push(e)), !r.is_fork && Nt.size > 0 && !Ft && zt();
	}
	return t;
}
function zt() {
	Ft = !1;
	for (let e of Nt) e.f & 1024 && F(e, _), Xn(e) && tr(e);
	Nt.clear();
}
function Bt(e) {
	z(e, e.v + 1);
}
function Vt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Re(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === G)) {
			var l = (c & g) === 0;
			if (l && F(s, t), c & 2) {
				var u = s;
				$e?.delete(u), c & 65536 || (c & 512 && (s.f |= ee), Vt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && ut !== null && ut.add(d), n === null ? mt(d) : n.push(d);
			}
		}
	}
}
function Ht(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ R(0), u = null, d = qn, f = (e) => {
		if (qn === d) return e();
		var t = W, n = qn;
		Ln(null), Jn(d);
		var r = e();
		return Ln(t), Jn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ R(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && he();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ R(n.value, u);
				return r.set(t, e), e;
			}) : z(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ R(O, u));
					r.set(t, e), Bt(o);
				}
			} else z(n, O), Bt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ R(Ht(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = K(o);
				return c === O ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = K(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== O) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || G !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ R(i ? Ht(e[t]) : O, u)), r.set(t, n)), K(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ R(O, u)), r.set(d + "", p)) : z(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ R(void 0, u)), z(c, Ht(n)), r.set(t, c));
			else {
				l = c.v !== O;
				var m = f(() => Ht(n));
				z(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && z(g, _ + 1);
				}
				Bt(o);
			}
			return !0;
		},
		ownKeys(e) {
			K(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [n, i] of r) i.v !== O && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ge();
		}
	});
}
function Ut(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
	} catch {}
	return e;
}
function Wt(e, t) {
	return Object.is(Ut(e), Ut(t));
}
var Gt, Kt, qt, Jt;
function Yt() {
	if (Gt === void 0) {
		Gt = window, Kt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		qt = a(t, "firstChild").get, Jt = a(t, "nextSibling").get, u(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), u(n) && (n.__t = void 0);
	}
}
function Xt(e = "") {
	return document.createTextNode(e);
}
/* @__NO_SIDE_EFFECTS__ */
function Zt(e) {
	return qt.call(e);
}
/* @__NO_SIDE_EFFECTS__ */
function Qt(e) {
	return Jt.call(e);
}
function B(e, t) {
	if (!A) return /* @__PURE__ */ Zt(e);
	var n = /* @__PURE__ */ Zt(j);
	if (n === null) n = j.appendChild(Xt());
	else if (t && n.nodeType !== 3) {
		var r = Xt();
		return n?.before(r), Te(r), r;
	}
	return t && nn(n), Te(n), n;
}
function V(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ Zt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qt(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = Xt();
			return j?.before(r), Te(r), r;
		}
		nn(j);
	}
	return j;
}
function H(e, t = 1, n = !1) {
	let r = A ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Qt(r);
	if (!A) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Xt();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		nn(r);
	}
	return Te(r), r;
}
function $t(e) {
	e.textContent = "";
}
function en() {
	return !Ne || ut !== null ? !1 : (G.f & b) !== 0;
}
function tn(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function nn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
var rn = !1;
function an() {
	rn || (rn = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t.__on_r?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function on(e) {
	var t = W, n = G;
	Ln(null), Rn(null);
	try {
		return e();
	} finally {
		Ln(t), Rn(n);
	}
}
function sn(e, t, n, r = n) {
	e.addEventListener(t, () => on(n));
	let i = e.__on_r;
	i ? e.__on_r = () => {
		i(), r(!0);
	} : e.__on_r = () => r(!0), an();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function cn(e) {
	G === null && (W === null && fe(e), de()), Pn && ue(e);
}
function ln(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function un(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: N,
		deps: null,
		nodes: null,
		f: e | g | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) rt === null ? st.ensure().schedule(r) : rt.push(r);
	else if (t !== null) {
		try {
			tr(r);
		} catch (e) {
			throw wn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && ln(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function dn() {
	return W !== null && !In;
}
function fn(e) {
	let t = un(8, null);
	return F(t, h), t.teardown = e, t;
}
function pn(e) {
	cn("$effect");
	var t = G.f;
	if (!W && t & 32 && !(t & 32768)) {
		var n = N;
		(n.e ??= []).push(e);
	} else return mn(e);
}
function mn(e) {
	return un(4 | w, e);
}
function hn(e) {
	st.ensure();
	let t = un(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Dn(t, () => {
			wn(t), n(void 0);
		}) : (wn(t), n(void 0));
	});
}
function gn(e) {
	return un(4, e);
}
function _n(e) {
	return un(ne | C, e);
}
function vn(e, t = 0) {
	return un(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	xt(r, t, n, (t) => {
		un(8, () => e(...t.map(K)));
	});
}
function yn(e, t = 0) {
	return un(16 | t, e);
}
function bn(e) {
	return un(32 | C, e);
}
function xn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Pn, n = W;
		Fn(!0), Ln(null);
		try {
			t.call(null);
		} finally {
			Fn(e), Ln(n);
		}
	}
}
function Sn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && on(() => {
			e.abort(E);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : wn(n, t), n = r;
	}
}
function Cn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || wn(t), t = n;
	}
}
function wn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Tn(e.nodes.start, e.nodes.end), n = !0), F(e, x), Sn(e, t && !n), er(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	xn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && En(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Tn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Qt(e);
		e.remove(), e = n;
	}
}
function En(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Dn(e, t, n = !0) {
	var r = [];
	On(e, r, !0);
	var i = () => {
		n && wn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function On(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				On(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function kn(e) {
	An(e, !0);
}
function An(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (F(e, g), st.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			An(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function jn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Qt(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Mn = null, Nn = !1, Pn = !1;
function Fn(e) {
	Pn = e;
}
var W = null, In = !1;
function Ln(e) {
	W = e;
}
var G = null;
function Rn(e) {
	G = e;
}
var zn = null;
function Bn(e) {
	W !== null && (!Ne || W.f & 2) && (zn === null ? zn = [e] : zn.push(e));
}
var Vn = null, Hn = 0, Un = null;
function Wn(e) {
	Un = e;
}
var Gn = 1, Kn = 0, qn = Kn;
function Jn(e) {
	qn = e;
}
function Yn() {
	return ++Gn;
}
function Xn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ee), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Xn(a) && At(a), a.wv > e.wv) return !0;
		}
		t & 512 && $e === null && F(e, h);
	}
	return !1;
}
function Zn(e, t, r = !0) {
	var i = e.reactions;
	if (i !== null && !(!Ne && zn !== null && n.call(zn, e))) for (var a = 0; a < i.length; a++) {
		var o = i[a];
		o.f & 2 ? Zn(o, t, !1) : t === o && (r ? F(o, g) : o.f & 1024 && F(o, _), mt(o));
	}
}
function Qn(e) {
	var t = Vn, n = Hn, r = Un, i = W, a = zn, o = N, s = In, c = qn, l = e.f;
	Vn = null, Hn = 0, Un = null, W = l & 96 ? null : e, zn = null, Fe(e.ctx), In = !1, qn = ++Kn, e.ac !== null && (on(() => {
		e.ac.abort(E);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (Vn !== null) {
			var m;
			if (p || er(e, Hn), f !== null && Hn > 0) for (f.length = Hn + Vn.length, m = 0; m < Vn.length; m++) f[Hn + m] = Vn[m];
			else e.deps = f = Vn;
			if (dn() && e.f & 512) for (m = Hn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Hn < f.length && (er(e, Hn), f.length = Hn);
		if (Re() && Un !== null && !In && f !== null && !(e.f & 6146)) for (m = 0; m < Un.length; m++) Zn(Un[m], e);
		if (i !== null && i !== e) {
			if (Kn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Kn;
			if (t !== null) for (let e of t) e.rv = Kn;
			Un !== null && (r === null ? r = Un : r.push(...Un));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return Ue(e);
	} finally {
		e.f ^= te, Vn = t, Hn = n, Un = r, W = i, zn = a, Fe(o), In = s, qn = c;
	}
}
function $n(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Vn === null || !n.call(Vn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ee), s.v !== O && Ge(s), jt(s), er(s, 0);
	}
}
function er(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) $n(e, n[r]);
}
function tr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		F(e, h);
		var n = G, r = Nn;
		G = e, Nn = !0;
		try {
			t & 16777232 ? Cn(e) : Sn(e), xn(e);
			var i = Qn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Gn;
		} finally {
			Nn = r, G = n;
		}
	}
}
async function nr() {
	if (Ne) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), ct();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (Mn?.add(e), W !== null && !In && !(G !== null && G.f & 16384) && (zn === null || !n.call(zn, e))) {
		var r = W.deps;
		if (W.f & 2097152) e.rv < Kn && (e.rv = Kn, Vn === null && r !== null && r[Hn] === e ? Hn++ : Vn === null ? Vn = [e] : Vn.push(e));
		else {
			(W.deps ??= []).push(e);
			var i = e.reactions;
			i === null ? e.reactions = [W] : n.call(i, W) || i.push(W);
		}
	}
	if (Pn && Pt.has(e)) return Pt.get(e);
	if (t) {
		var a = e;
		if (Pn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || ir(a)) && (o = kt(a)), Pt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !In && W !== null && (Nn || (W.f & 512) != 0), c = (a.f & b) === 0;
		Xn(a) && (s && (a.f |= 512), At(a)), s && !c && (Mt(a), rr(a));
	}
	if ($e?.has(e)) return $e.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function rr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Mt(t), rr(t));
}
function ir(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Pt.has(t) || t.f & 2 && ir(t)) return !0;
	return !1;
}
function ar(e) {
	var t = In;
	try {
		return In = !0, e();
	} finally {
		In = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var or = ["touchstart", "touchmove"];
function sr(e) {
	return or.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dev/css.js
var cr = Symbol("events"), lr = /* @__PURE__ */ new Set(), ur = /* @__PURE__ */ new Set();
function dr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || hr.call(t, e), !e.cancelBubble) return on(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ve(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function fr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = dr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && fn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[cr] ??= {})[e] = n;
}
function pr(e) {
	for (var t = 0; t < e.length; t++) lr.add(e[t]);
	for (var n of ur) n(e);
}
var mr = null;
function hr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	mr = e;
	var s = 0, c = mr === e && e[cr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[cr] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		i(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = W, f = G;
		Ln(null), Rn(null);
		try {
			for (var p, m = []; o !== null;) {
				var h = o.assignedSlot || o.parentNode || o.host || null;
				try {
					var g = o[cr]?.[r];
					g != null && (!o.disabled || e.target === o) && g.call(o, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble || h === t || h === null) break;
				o = h;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[cr] = t, delete e.currentTarget, Ln(d), Rn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var gr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function _r(e) {
	return gr?.createHTML(e) ?? e;
}
function vr(e) {
	var t = tn("template");
	return t.innerHTML = _r(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function yr(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/* @__NO_SIDE_EFFECTS__ */
function J(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (A) return yr(j, null), j;
		i === void 0 && (i = vr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Zt(i)));
		var t = r || Kt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Zt(t), s = t.lastChild;
			yr(o, s);
		} else yr(t, t);
		return t;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function br(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = (t & 1) != 0, a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (A) return yr(j, null), j;
		if (!o) {
			var e = /* @__PURE__ */ Zt(vr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Zt(e);) o.appendChild(/* @__PURE__ */ Zt(e));
			else o = /* @__PURE__ */ Zt(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Zt(t), r = t.lastChild;
			yr(n, r);
		} else yr(t, t);
		return t;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function xr(e, t) {
	return /* @__PURE__ */ br(e, t, "svg");
}
function Sr(e = "") {
	if (!A) {
		var t = Xt(e + "");
		return yr(t, t), t;
	}
	var n = j;
	return n.nodeType === 3 ? nn(n) : (n.before(n = Xt()), Te(n)), yr(n, n), n;
}
function Cr() {
	if (A) return yr(j, null), j;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Xt();
	return e.append(t, n), yr(t, n), e;
}
function Y(e, t) {
	if (A) {
		var n = G;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), Ee();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function wr(e, t) {
	return Er(e, t);
}
var Tr = /* @__PURE__ */ new Map();
function Er(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Yt();
	var l = void 0, u = hn(() => {
		var s = n ?? t.appendChild(Xt());
		yt(s, { pending: () => {} }, (t) => {
			Ie({});
			var n = N;
			if (o && (n.c = o), a && (i.$$events = a), A && yr(t, null), l = e(t, i) || {}, A && (G.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw Se(), ye;
			Le();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = sr(r);
					for (let e of [t, document]) {
						var a = Tr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Tr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, hr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(lr)), ur.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Tr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, hr), r.delete(e), r.size === 0 && Tr.delete(n)) : r.set(e, i);
			}
			ur.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Dr.set(l, u), l;
}
var Dr = /* @__PURE__ */ new WeakMap();
function Or(e, t) {
	let n = Dr.get(e);
	return n ? (Dr.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
var kr = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) kn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (wn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						jn(r, t), t.append(Xt()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else wn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Dn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (wn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = en();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = Xt();
			i.append(a), this.#n.set(e, {
				effect: bn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, bn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else A && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	A && (r = j, Ee());
	var i = new kr(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
				Te(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	yn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/key.js
var Ar = Symbol("NaN");
function jr(e, t, n) {
	A && Ee();
	var r = new kr(e), i = !Re();
	yn(() => {
		var e = t();
		e !== e && (e = Ar), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Mr(e, t) {
	return t;
}
function Nr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Dn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Pr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			$t(d), d.append(u), e.items.clear();
		}
		Pr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Pr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, jn(a, document.createDocumentFragment())) : wn(t[i], n);
	}
}
var Fr;
function Q(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? Te(/* @__PURE__ */ Zt(u)) : u.appendChild(Xt());
	}
	A && Ee();
	var d = null, f = /* @__PURE__ */ Dt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Lr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, zr(d, null, c)) : kn(d) : Dn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: yn(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			A && ke(c) === "[!" != (e === 0) && (c = Oe(), Te(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = en(), y = 0; y < e; y += 1) {
				A && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Rt(S.v, b), S.i && Rt(S.i, y), v && u.unskip_effect(S.e)) : (S = Rr(l, h ? c : Fr ??= Xt(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = bn(() => s(c)) : (d = bn(() => s(Fr ??= Xt())), d.f |= T)), e > r.size && le("", "", ""), A && e > 0 && Te(Oe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && we(!0), K(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, A && (c = j);
}
function Ir(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Lr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Ir(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (kn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) zr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Br(e, d, _), Br(e, _, y), zr(_, y, n), d = _, p = [], m = [], l = Ir(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) zr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Br(e, S.prev, C.next), Br(e, d, S), Br(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), zr(_, l, n), Br(e, _.prev, _.next), Br(e, _, d === null ? e.effect.first : d.next), Br(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Ir(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Ir(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Pr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Ir(l.next);
		var ee = w.length;
		if (ee > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Nr(e, w, te);
		}
	}
	o && Ve(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Rr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? It(n) : /* @__PURE__ */ Lt(n, !1, !1) : null, l = o & 2 ? It(i) : null;
	return {
		v: c,
		i: l,
		e: bn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function zr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Qt(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Br(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Vr(e, t, ...n) {
	var r = new kr(e);
	yn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, S);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/css.js
function Hr(e, t) {
	gn(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = tn("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Ur = [..." 	\n\r\f\xA0\v﻿"];
function Wr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Ur.includes(r[o - 1])) && (s === r.length || Ur.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Gr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Kr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function qr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Kr)), i && c.push(...Object.keys(i).map(Kr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Kr(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Gr(r)), i && (n += Gr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Jr(e, t, n, r, i, a) {
	var o = e.__className;
	if (A || o !== n || o === void 0) {
		var s = Wr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e.__className = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Yr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Xr(e, t, n, r) {
	var i = e.__style;
	if (A || i !== t) {
		var a = qr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e.__style = t;
	} else r && (Array.isArray(r) ? (Yr(e, n?.[0], r[0]), Yr(e, n?.[1], r[1], "important")) : Yr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Zr(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Ce();
		for (var i of t.options) i.selected = n.includes(ei(i));
		return;
	}
	for (i of t.options) if (Wt(ei(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Qr(e) {
	var t = new MutationObserver(() => {
		Zr(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), fn(() => {
		t.disconnect();
	});
}
function $r(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	sn(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ei);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ei(o);
		}
		n(a), e.__value = a, I !== null && r.add(I);
	}), gn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = Ne ? Qe : I;
			if (r.has(o)) return;
		}
		if (Zr(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ei(s), n(a));
		}
		e.__value = a, i = !1;
	}), Qr(e);
}
function ei(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ti = Symbol("is custom element"), ni = Symbol("is html"), ri = D ? "link" : "LINK", ii = D ? "progress" : "PROGRESS";
function ai(e) {
	if (A) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					$(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					$(e, "checked", null), e.checked = r;
				}
			}
		};
		e.__on_r = n, Ve(n), an();
	}
}
function oi(e, t) {
	var n = ci(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ii) || (e.value = t ?? "");
}
function si(e, t) {
	var n = ci(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = ci(e);
	A && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ri) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ui(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ci(e) {
	return e.__attributes ??= {
		[ti]: e.nodeName.includes("-"),
		[ni]: e.namespaceURI === be
	};
}
var li = /* @__PURE__ */ new Map();
function ui(e) {
	var t = e.getAttribute("is") || e.nodeName, n = li.get(t);
	if (n) return n;
	li.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function di(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	sn(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = fi(e) ? pi(a) : a, n(a), I !== null && r.add(I), await nr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || ar(t) == null && e.value) && (n(fi(e) ? pi(e.value) : e.value), I !== null && r.add(I)), vn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Ne ? Qe : I;
			if (r.has(i)) return;
		}
		fi(e) && n === pi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function fi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function pi(e) {
	return e === "" ? null : +e;
}
var mi = /* @__PURE__ */ new class e {
	#e = /* @__PURE__ */ new WeakMap();
	#t;
	#n;
	static entries = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.#n = e;
	}
	observe(e, t) {
		var n = this.#e.get(e) || /* @__PURE__ */ new Set();
		return n.add(t), this.#e.set(e, n), this.#r().observe(e, this.#n), () => {
			var n = this.#e.get(e);
			n.delete(t), n.size === 0 && (this.#e.delete(e), this.#t.unobserve(e));
		};
	}
	#r() {
		return this.#t ??= new ResizeObserver((t) => {
			for (var n of t) {
				e.entries.set(n.target, n);
				for (var r of this.#e.get(n.target) || []) r(n);
			}
		});
	}
}({ box: "border-box" });
function hi(e, t, n) {
	var r = mi.observe(e, () => n(e[t]));
	gn(() => (ar(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function gi(e, t) {
	return e === t || e?.[ie] === t;
}
function _i(e = {}, t, n, r) {
	var i = N.r, a = G;
	return gn(() => {
		var o, s;
		return vn(() => {
			o = s, s = r?.() || [], ar(() => {
				e !== n(...s) && (t(e, ...s), o && gi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && gi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function vi(e, t, n, r) {
	var i = !Pe || (n & 2) != 0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = () => (l && (l = !1, c = s ? ar(r) : r), c);
	let d;
	if (o) {
		var f = ie in e || ae in e;
		d = a(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	o ? [p, m] = Xe(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && me(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var _ = !1, v = (n & 1 ? Tt : Dt)(() => (_ = !1, h()));
	o && K(v);
	var y = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? K(v) : i && o ? Ht(e) : e;
			return z(v, n), _ = !0, c !== void 0 && (c = n), e;
		}
		return Pn && _ || y.f & 16384 ? v.v : K(v);
	});
}
function yi(e) {
	N === null && se("onMount"), Pe && N.l !== null ? bi(N).m.push(e) : pn(() => {
		let t = ar(e);
		if (typeof t == "function") return t;
	});
}
function bi(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/components/chrome/Panel.svelte
var xi = /* @__PURE__ */ J("<span class=\"code svelte-1yw30n5\"> </span>"), Si = /* @__PURE__ */ J("<section class=\"panel svelte-1yw30n5\"><header><!> <span class=\"title svelte-1yw30n5\"> <!></span> <span class=\"right svelte-1yw30n5\"><!></span></header> <div class=\"body svelte-1yw30n5\"><!></div></section>"), Ci = {
	hash: "svelte-1yw30n5",
	code: ".panel.svelte-1yw30n5 {background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;min-height:0;}header.svelte-1yw30n5 {min-height:53px;flex-shrink:0;padding:4px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border);font-family:var(--font-sans);}.code.svelte-1yw30n5 {display:none;}.title.svelte-1yw30n5 {display:flex;align-items:center;gap:14px;font-size:19px;color:var(--text);letter-spacing:0;font-weight:600;flex:1;}.right.svelte-1yw30n5 {display:flex;align-items:center;justify-content:flex-end;margin-left:auto;gap:6px;}.body.svelte-1yw30n5 {flex:1;min-height:0;overflow:auto;}\n  @media (max-width: 900px) {header.stack-actions.svelte-1yw30n5 {flex-wrap:wrap;justify-content:center;}header.stack-actions.svelte-1yw30n5 .title:where(.svelte-1yw30n5) {flex-basis:100%;flex-wrap:wrap;justify-content:center;text-align:center;}header.stack-actions.svelte-1yw30n5 .right:where(.svelte-1yw30n5) {max-width:100%;margin-inline:auto;justify-content:center;} }\n  @media (max-width: 600px) {header.svelte-1yw30n5 {padding:4px 12px;flex-wrap:wrap;gap:12px;}.title.svelte-1yw30n5 {min-width:140px;}.right.svelte-1yw30n5 {flex-wrap:wrap;} }"
};
function wi(e, t) {
	Hr(e, Ci);
	let n = vi(t, "stackActions", 3, !1);
	var r = Si(), i = B(r);
	let a;
	var o = B(i), s = (e) => {
		var n = xi(), r = B(n, !0);
		M(n), U(() => X(r, t.code)), Y(e, n);
	};
	Z(o, (e) => {
		t.code && e(s);
	});
	var c = H(o, 2), l = B(c, !0), u = H(l), d = (e) => {
		var n = Cr();
		Vr(V(n), () => t.titleControl), Y(e, n);
	};
	Z(u, (e) => {
		t.titleControl && e(d);
	}), M(c);
	var f = H(c, 2), p = B(f), m = (e) => {
		var n = Cr();
		Vr(V(n), () => t.right), Y(e, n);
	};
	Z(p, (e) => {
		t.right && e(m);
	}), M(f), M(i);
	var h = H(i, 2);
	Vr(B(h), () => t.children), M(h), M(r), U(() => {
		a = Jr(i, 1, "svelte-1yw30n5", null, a, { "stack-actions": n() }), X(l, t.title);
	}), Y(e, r);
}
//#endregion
//#region src/components/chrome/BankCycle.svelte
var Ti = /* @__PURE__ */ J("<button type=\"button\" class=\"chip hi bank-cycle svelte-10mv487\"> </button>"), Ei = {
	hash: "svelte-10mv487",
	code: ".bank-cycle.svelte-10mv487 {min-width:70px;}"
};
function Di(e, t) {
	Ie(t, !0), Hr(e, Ei);
	let n = vi(t, "label", 3, "EQ bank"), r = vi(t, "mono", 3, !1);
	var i = Ti(), a = B(i, !0);
	M(i), U(() => {
		$(i, "aria-label", `${n()}: ${r() ? "Mono" : t.value === 0 ? "Left" : "Right"}`), $(i, "aria-disabled", r()), X(a, r() ? "Mono" : t.value === 0 ? "Left" : "Right");
	}), q("click", i, () => {
		r() || t.onChange(+(t.value === 0));
	}), Y(e, i), Le();
}
pr(["click"]);
//#endregion
//#region src/styles/palette.ts
function Oi(e, t = "base") {
	return e === 0 ? "#efeee9" : "#8bb8c1";
}
var ki = {
	preamp: "#e6b45f",
	balance: "#b598ef",
	peq: "#64b8ec",
	fir: "#67c9aa",
	loudness: "#e69ab9"
}, Ai = [
	"#f2a6a6",
	"#efbd91",
	"#e8d48f",
	"#bbd994",
	"#91d3b2",
	"#8ed3d6",
	"#9dbff0",
	"#b6a5ed",
	"#d5a1df",
	"#e2e7ef"
], ji = (e) => Ai[e % Ai.length], Mi = {
	Flat: 0,
	Peaking: 1
}, Ni = 2e4, Pi = .1, Fi = .01, Ii = .1, Li = .1, Ri = [-25, 25];
//#endregion
//#region src/components/chrome/valueFieldFormat.ts
function zi(e) {
	return e > 0 ? "+" : e < 0 ? "−" : " ";
}
var Bi = {
	dB: {
		defaultPrecision: 2,
		defaultUnit: "dB",
		format: (e, t) => e.toFixed(t)
	},
	"dB-signed": {
		defaultPrecision: 2,
		defaultUnit: "dB",
		format: (e, t) => zi(e) + Math.abs(e).toFixed(t)
	},
	ms: {
		defaultPrecision: 1,
		defaultUnit: "ms",
		format: (e, t) => e.toFixed(t)
	},
	hz: {
		defaultPrecision: 0,
		defaultUnit: "Hz",
		format: (e) => e >= 1e4 ? (e / 1e3).toFixed(1) + "k" : e >= 1e3 ? (e / 1e3).toFixed(2) + "k" : Math.round(e).toString()
	},
	q: {
		defaultPrecision: 2,
		defaultUnit: "",
		format: (e, t) => e.toFixed(t)
	},
	pct: {
		defaultPrecision: 0,
		defaultUnit: "%",
		format: (e, t) => e.toFixed(t)
	},
	int: {
		defaultPrecision: 0,
		defaultUnit: "",
		format: (e) => Math.round(e).toString()
	}
};
function Vi(e) {
	return Bi[e].defaultPrecision;
}
function Hi(e) {
	return Bi[e].defaultUnit;
}
function Ui(e, t, n) {
	return Bi[e].format(t, n);
}
function Wi(e) {
	if (!e) return 0;
	let t = String(e), n = t.indexOf(".");
	return n < 0 ? 0 : Math.min(6, t.length - n - 1);
}
function Gi(e, t, n, r, i = !0) {
	let a = e.replace(",", ".").replace(/[^\d.\-+eE]/g, ""), o = parseFloat(a);
	if (!Number.isFinite(o)) return null;
	let s = o;
	if (i) s < t && (s = t), s > n && (s = n);
	else if (s < t || s > n) return null;
	return r > 0 && (s = Math.round(s / r) * r, s = +s.toFixed(Wi(r))), s;
}
//#endregion
//#region src/components/chrome/ValueField.svelte
var Ki = /* @__PURE__ */ J("<input type=\"text\" inputmode=\"decimal\" spellcheck=\"false\" autocomplete=\"off\" class=\"svelte-1o0ixzo\"/>"), qi = /* @__PURE__ */ J("<span class=\"unit svelte-1o0ixzo\"> </span>"), Ji = /* @__PURE__ */ J("<span class=\"display svelte-1o0ixzo\"><span class=\"num svelte-1o0ixzo\"> </span> <!></span>"), Yi = /* @__PURE__ */ J("<div role=\"button\"><!></div>"), Xi = {
	hash: "svelte-1o0ixzo",
	code: ".vf.svelte-1o0ixzo {position:relative;display:flex;align-items:center;box-sizing:border-box;width:100%;border:none;border-radius:0;background:transparent;box-shadow:inset 0 -1px 0 0 color-mix(in oklab, var(--text) 14%, transparent);color:var(--text);font-family:var(--font-sans);cursor:pointer;user-select:none;transition:background 80ms, box-shadow 80ms;outline:none;}.vf.svelte-1o0ixzo:focus-visible {box-shadow:inset 0 -1px 0 0 var(--accent),\n      0 0 0 2px color-mix(in oklab, var(--accent) 35%, transparent);}.vf[data-size=\"sm\"].svelte-1o0ixzo {height:40px;padding:0 8px;font-size:17px;}.vf[data-size=\"md\"].svelte-1o0ixzo {height:44px;padding:0 10px;font-size:20px;}.vf[data-align=\"center\"].svelte-1o0ixzo {justify-content:center;}.vf[data-align=\"right\"].svelte-1o0ixzo  {justify-content:flex-end;}.vf.hover.svelte-1o0ixzo:not(.editing):not(.disabled) {background:var(--wash);box-shadow:inset 0 -1px 0 0 color-mix(in oklab, var(--text) 32%, transparent),\n      0 -2px 6px -2px color-mix(in oklab, var(--text) 18%, transparent) inset;}.vf.editing.svelte-1o0ixzo {background:color-mix(in oklab, var(--accent) 6%, transparent);box-shadow:inset 0 -1px 0 0 var(--accent),\n      0 0 0 1px var(--accent);cursor:text;}.vf.editing.invalid.svelte-1o0ixzo {background:color-mix(in oklab, var(--err) 10%, transparent);box-shadow:inset 0 -1px 0 0 var(--err),\n      0 0 0 1px var(--err);}.vf.editing.invalid.svelte-1o0ixzo input:where(.svelte-1o0ixzo) {color:var(--err);}.vf.disabled.svelte-1o0ixzo {cursor:default;\n    /* Single dim layer (U-P3 policy B): the container this sits in stays\n       full-contrast; this is the one opacity dim on the control itself. */opacity:var(--dim-disabled);}.display.svelte-1o0ixzo {display:inline-flex;align-items:baseline;gap:3px;white-space:nowrap;}.num.svelte-1o0ixzo {color:var(--toneColor);font-variant-numeric:tabular-nums;font-weight:500;}.vf.svelte-1o0ixzo .unit:where(.svelte-1o0ixzo) {color:var(--text-faint);font-size:14px;}.vf[data-size=\"sm\"].svelte-1o0ixzo .unit:where(.svelte-1o0ixzo) {font-size:14px;}input.svelte-1o0ixzo {position:absolute;inset:0;width:100%;height:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:inherit;font-size:inherit;text-align:inherit;padding:0 8px;box-sizing:border-box;font-variant-numeric:tabular-nums;}.vf[data-size=\"sm\"].svelte-1o0ixzo input:where(.svelte-1o0ixzo) {padding:0 6px;}.vf[data-align=\"center\"].svelte-1o0ixzo input:where(.svelte-1o0ixzo) {text-align:center;}.vf[data-align=\"right\"].svelte-1o0ixzo  input:where(.svelte-1o0ixzo) {text-align:right;}"
};
function Zi(e, t) {
	Ie(t, !0), Hr(e, Xi);
	let n = vi(t, "align", 3, "right"), r = vi(t, "size", 3, "md"), i = vi(t, "disabled", 3, !1), a = vi(t, "clamp", 3, !0), o = /* @__PURE__ */ L(() => t.precision ?? Vi(t.kind)), s = /* @__PURE__ */ L(() => t.step ?? 10 ** -K(o)), c = /* @__PURE__ */ L(() => t.unit ?? Hi(t.kind)), l = /* @__PURE__ */ L(() => t.floorLabel !== void 0 && t.value <= t.min), u = /* @__PURE__ */ L(() => t.ceilLabel !== void 0 && t.value >= t.max), d = /* @__PURE__ */ L(() => K(l) ? t.floorLabel : K(u) ? t.ceilLabel : Ui(t.kind, t.value, K(o))), f = /* @__PURE__ */ L(() => i() ? "var(--text-faint)" : t.tone === "signed" && t.value > 0 ? "var(--number-positive)" : t.tone === "signed" && t.value < 0 ? "var(--number-negative)" : "var(--text)"), p = /* @__PURE__ */ R(!1), m = /* @__PURE__ */ R(""), h = /* @__PURE__ */ R(!1), g = /* @__PURE__ */ R(!1), _ = /* @__PURE__ */ R(null), v = 0, y = !1;
	async function b() {
		i() || K(p) || (v = t.value, z(m, t.value.toFixed(K(o)), !0), z(p, !0), z(g, !1), await nr(), K(_)?.focus(), K(_)?.select());
	}
	function x(e) {
		if (y) {
			y = !1;
			return;
		}
		let n = Gi(K(m), t.min, t.max, K(s), a());
		if (n === null) {
			if (e) {
				z(g, !0);
				return;
			}
			z(p, !1);
			return;
		}
		z(p, !1), n !== v && t.onChange(n);
	}
	function S() {
		y = !0, z(g, !1), z(p, !1);
	}
	function C(e) {
		e.key === "Enter" ? (e.preventDefault(), e.stopPropagation(), x(!0)) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), S());
	}
	function w() {
		K(g) && z(g, !1);
	}
	var T = Yi();
	let ee, te;
	var ne = B(T), re = (e) => {
		var t = Ki();
		ai(t), _i(t, (e) => z(_, e), () => K(_)), q("input", t, w), fr("blur", t, () => x(!1)), q("keydown", t, C), di(t, () => K(m), (e) => z(m, e)), Y(e, t);
	}, ie = (e) => {
		var t = Ji(), n = B(t), r = B(n, !0);
		M(n);
		var i = H(n, 2), a = (e) => {
			var t = qi(), n = B(t, !0);
			M(t), U(() => X(n, K(c))), Y(e, t);
		};
		Z(i, (e) => {
			K(c) && !K(l) && !K(u) && e(a);
		}), M(t), U(() => X(r, K(d))), Y(e, t);
	};
	Z(ne, (e) => {
		K(p) ? e(re) : e(ie, -1);
	}), M(T), U(() => {
		ee = Jr(T, 1, "vf svelte-1o0ixzo", null, ee, {
			editing: K(p),
			invalid: K(g),
			hover: K(h),
			disabled: i()
		}), $(T, "data-align", n()), $(T, "data-size", r()), $(T, "tabindex", i() ? -1 : 0), $(T, "aria-disabled", i()), te = Xr(T, "", te, { "--toneColor": K(f) });
	}), q("click", T, b), fr("mouseenter", T, () => z(h, !0)), fr("mouseleave", T, () => z(h, !1)), q("keydown", T, (e) => {
		!K(p) && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), b());
	}), Y(e, T), Le();
}
pr([
	"click",
	"keydown",
	"input"
]);
//#endregion
//#region src/components/eq/BandTypeSelect.svelte
var Qi = /* @__PURE__ */ J("<option class=\"svelte-8pr11s\"> </option>"), $i = /* @__PURE__ */ J("<option disabled=\"\" class=\"svelte-8pr11s\"> </option>"), ea = /* @__PURE__ */ J("<select><!><!></select>"), ta = {
	hash: "svelte-8pr11s",
	code: ".bts.svelte-8pr11s {width:125px;max-width:100%;justify-self:start;background:transparent;color:var(--text);border:1px solid transparent;border-radius:var(--radius-s);padding:2px 4px;font-family:var(--font-sans);font-size:15px;min-height:32px;cursor:pointer;appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg, transparent 50%, var(--text-faint) 50%),\n      linear-gradient(135deg, var(--text-faint) 50%, transparent 50%);background-position:calc(100% - 8px) center,\n      calc(100% - 4px) center;background-size:4px 4px, 4px 4px;background-repeat:no-repeat;padding-right:16px;}.bts.svelte-8pr11s:hover {background-color:var(--wash-strong);}.bts.svelte-8pr11s:focus {outline:none;}.bts.svelte-8pr11s:focus-visible {border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in oklab, var(--accent) 35%, transparent);}.bts.off.svelte-8pr11s {color:var(--text-faint);}.bts.svelte-8pr11s option:where(.svelte-8pr11s) {background:var(--panel-solid);color:var(--text);}"
};
function na(e, t) {
	Ie(t, !0), Hr(e, ta);
	let n = {
		0: "Off",
		1: "Peaking",
		1002: "Low-Pass",
		1003: "High-Pass",
		1004: "Band-Pass",
		1005: "Notch",
		1007: "Low Shelf",
		1008: "High Shelf",
		1009: "All-Pass"
	}, r = vi(t, "types", 19, () => [
		Mi.Peaking,
		1002,
		1003,
		1004,
		1005,
		1007,
		1008,
		1009
	]), i = /* @__PURE__ */ L(() => t.value === Mi.Flat), a = /* @__PURE__ */ L(() => !r().includes(t.value));
	var o = ea();
	let s;
	var c = B(o);
	Q(c, 16, r, (e) => e, (e, t) => {
		var r = Qi(), i = B(r, !0);
		M(r);
		var a = {};
		U(() => {
			X(i, n[t]), a !== (a = t) && (r.value = (r.__value = t) ?? "");
		}), Y(e, r);
	});
	var l = H(c), u = (e) => {
		var r = $i(), i = B(r, !0);
		M(r);
		var a = {};
		U(() => {
			X(i, n[t.value] ?? `Device filter ${t.value - 1e3}`), a !== (a = t.value) && (r.value = (r.__value = t.value) ?? "");
		}), Y(e, r);
	};
	Z(l, (e) => {
		K(a) && e(u);
	}), M(o);
	var d;
	Qr(o), U(() => {
		s = Jr(o, 1, "bts svelte-8pr11s", null, s, { off: K(i) }), d !== (d = t.value) && (o.value = (o.__value = t.value) ?? "", Zr(o, t.value));
	}), q("change", o, (e) => t.onChange(Number(e.currentTarget.value))), Y(e, o), Le();
}
pr(["change"]);
//#endregion
//#region src/components/eq/BandRow.svelte
var ra = "var(--band-columns, 28px 56px minmax(0, 1fr) 104px 80px 104px)", ia = /* @__PURE__ */ J("<div role=\"button\" tabindex=\"0\"><div class=\"num svelte-dle8ao\"> </div> <button><svg width=\"48\" height=\"26\" viewBox=\"0 0 48 26\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path></path></svg></button> <!> <!> <!> <!></div>"), aa = {
	hash: "svelte-dle8ao",
	code: ".row.svelte-dle8ao .vf[data-size=\"md\"] {height:32px;font-size:18px;}.row.svelte-dle8ao:hover {background:var(--wash);cursor:pointer;}.row.selected.svelte-dle8ao {background:var(--wash-strong);box-shadow:inset 3px 0 var(--band-color);}.row.svelte-dle8ao {display:grid;\n    /* grid-template-columns set inline (BAND_ROW_COLS). */gap:8px;padding:0 14px;align-items:center;border-top:1px solid var(--wash);font-family:var(--font-sans);font-size:17px;}\n  /* U-P3 policy B: no whole-row dim when the band is off (type = Flat). The\n     row's structure and the FLAT type stay full-contrast; the freq/Q/gain\n     ValueFields below are disabled in that state and carry the single dim\n     layer alone. */\n  /* Deliberately kept: bypass is a user toggle whose controls stay ENABLED\n     (not disabled), so this dim is the one and only layer for that state --\n     a real, single-layer visual distinction, not a stack. Do not touch. */.row.bypassed.svelte-dle8ao {opacity:0.45;}.num.svelte-dle8ao {color:var(--band-color);font-weight:600;font-size:17px;font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\";letter-spacing:0;}.byp.svelte-dle8ao {display:inline-flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;border-radius:var(--radius-s);background:transparent;border:1px solid transparent;color:var(--text-dim);cursor:pointer;}.byp.svelte-dle8ao:hover:not(:disabled) {color:var(--text);background:var(--wash);}.byp.svelte-dle8ao:disabled {opacity:var(--dim-disabled);cursor:default;}.byp.on.svelte-dle8ao {color:var(--warn);}"
};
function oa(e, t) {
	Ie(t, !0), Hr(e, aa);
	let n = /* @__PURE__ */ L(() => t.band.type === Mi.Flat), r = /* @__PURE__ */ L(() => t.band.bypass), i = /* @__PURE__ */ L(() => ({
		[Mi.Peaking]: t.band.gain < 0 ? "M3 12 C14 12 15 21 24 21 S34 12 45 12" : "M3 18 C14 18 15 3 24 3 S34 18 45 18",
		1002: "M3 5 H20 C29 5 30 19 45 21",
		1003: "M3 21 C18 19 19 5 28 5 H45",
		1004: "M3 21 C14 21 15 4 24 4 S34 21 45 21",
		1005: "M3 5 H14 C20 5 20 21 24 21 S28 5 34 5 H45",
		1007: t.band.gain < 0 ? "M3 20 H15 C25 20 23 5 33 5 H45" : "M3 5 H15 C25 5 23 20 33 20 H45",
		1008: t.band.gain < 0 ? "M3 5 H15 C25 5 23 20 33 20 H45" : "M3 20 H15 C25 20 23 5 33 5 H45",
		1009: "M3 12 H45"
	})[t.band.type] ?? "M3 12 H45");
	var a = ia();
	let o, s;
	var c = B(a), l = B(c, !0);
	M(c);
	var u = H(c, 2);
	let d;
	var f = B(u), p = B(f);
	M(f), M(u);
	var m = H(u, 2);
	na(m, {
		get value() {
			return t.band.type;
		},
		onChange: (e) => t.onPatch({ type: e }),
		get types() {
			return t.types;
		}
	});
	var h = H(m, 2);
	{
		let e = /* @__PURE__ */ L(() => K(n) || K(r));
		Zi(h, {
			kind: "hz",
			get value() {
				return t.band.frequency;
			},
			get min() {
				return 20;
			},
			get max() {
				return Ni;
			},
			get step() {
				return 1;
			},
			align: "right",
			get disabled() {
				return K(e);
			},
			onChange: (e) => t.onPatch({ frequency: e })
		});
	}
	var g = H(h, 2);
	{
		let e = /* @__PURE__ */ L(() => K(n) || K(r));
		Zi(g, {
			kind: "q",
			get value() {
				return t.band.q;
			},
			get min() {
				return Pi;
			},
			get max() {
				return 100;
			},
			get step() {
				return Fi;
			},
			align: "right",
			get disabled() {
				return K(e);
			},
			onChange: (e) => t.onPatch({ q: e })
		});
	}
	var _ = H(g, 2);
	{
		let e = /* @__PURE__ */ L(() => K(n) || K(r));
		Zi(_, {
			kind: "dB-signed",
			get value() {
				return t.band.gain;
			},
			get min() {
				return -15;
			},
			get max() {
				return 15;
			},
			get step() {
				return Ii;
			},
			tone: "signed",
			align: "right",
			get disabled() {
				return K(e);
			},
			onChange: (e) => t.onPatch({ gain: e })
		});
	}
	M(a), U((e, c) => {
		o = Jr(a, 1, "row svelte-dle8ao", null, o, {
			selected: t.selected,
			bypassed: K(r)
		}), $(a, "aria-label", `Select band ${t.index + 1}`), $(a, "aria-pressed", t.selected), s = Xr(a, "", s, e), X(l, c), d = Jr(u, 1, "byp svelte-dle8ao", null, d, { on: K(r) }), $(u, "title", K(r) ? "Enable band" : "Disable band"), $(u, "aria-label", K(r) ? "Enable band" : "Disable band"), $(u, "aria-pressed", !K(r)), u.disabled = K(n), $(p, "d", K(i));
	}, [() => ({
		"--band-color": ji(t.index),
		"grid-template-columns": ra
	}), () => String(t.index + 1).padStart(2, "0")]), q("keydown", a, (e) => {
		e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.onSelect());
	}), q("click", a, function(...e) {
		t.onSelect?.apply(this, e);
	}), q("focusin", a, function(...e) {
		t.onSelect?.apply(this, e);
	}), q("click", u, () => t.onPatch({ bypass: !K(r) })), Y(e, a), Le();
}
pr([
	"keydown",
	"click",
	"focusin"
]);
//#endregion
//#region src/components/eq/BandsPanel.svelte
var sa = (e, t = d) => {
	var n = ca(), r = H(B(n));
	M(n), U(() => $(r, "d", t() ? "M5 7V5a3 3 0 0 1 6 0v2" : "M5 7V5a3 3 0 0 1 5.6-1.5")), Y(e, n);
}, ca = /* @__PURE__ */ xr("<svg width=\"12\" height=\"12\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"7\" width=\"10\" height=\"7\" rx=\"1.5\"></rect><path></path></svg>"), la = /* @__PURE__ */ J("<label class=\"toggle-label\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/></label>"), ua = /* @__PURE__ */ J("<button><!>LINK</button>"), da = /* @__PURE__ */ J("<button class=\"chip hi act\" title=\"Browse the AutoEQ profile library\">AUTOEQ</button>"), fa = /* @__PURE__ */ J("<button class=\"chip hi act\">Set Both Channels</button>"), pa = /* @__PURE__ */ J("<!> <!> <!> <!> <button class=\"chip hi act\">Reset</button>", 1), ma = /* @__PURE__ */ J("<div class=\"head svelte-161tldd\"><div>#</div> <div></div> <div>Filter</div> <div class=\"r svelte-161tldd\">Frequency</div> <div class=\"r svelte-161tldd\">Q</div> <div class=\"r svelte-161tldd\">Gain</div></div> <!>", 1), ha = /* @__PURE__ */ J("<div class=\"band-table svelte-161tldd\"><!></div>"), ga = {
	hash: "svelte-161tldd",
	code: ".band-table.svelte-161tldd {min-width:0;}\n  @media (max-width: 600px) {.band-table.svelte-161tldd {--band-columns: 20px 44px minmax(68px, 1fr) minmax(62px, .85fr) minmax(38px, .5fr) minmax(70px, .85fr);}.band-table.svelte-161tldd .row, .head.svelte-161tldd {gap:4px;padding-left:8px;padding-right:8px;}.band-table.svelte-161tldd .row .vf[data-size=\"md\"] {padding-left:2px;padding-right:2px;font-size:14px;}.band-table.svelte-161tldd .row .vf .unit {font-size:11px;}.band-table.svelte-161tldd .row .num {font-size:13px;}.band-table.svelte-161tldd .bts {font-size:13px;padding-left:2px;padding-right:20px !important;background-position:calc(100% - 11px) center, calc(100% - 7px) center !important;}.head.svelte-161tldd {font-size:11px;}\n  }.link.svelte-161tldd {display:inline-flex;align-items:center;gap:5px;}.head.svelte-161tldd {display:grid;\n    /* grid-template-columns set inline (BAND_ROW_COLS), matching BandRow. */gap:8px;padding:6px 14px;font-family:var(--font-sans);font-size:14px;color:var(--text-faint);letter-spacing:0;border-bottom:1px solid var(--border);}\n  /* Match ValueField's internal 8px horizontal padding so the numeric\n     labels sit directly above their right-aligned values. */.head.svelte-161tldd .r:where(.svelte-161tldd) {text-align:right;padding-right:8px;}"
};
function _a(e, t) {
	Ie(t, !0), Hr(e, ga);
	let n = vi(t, "mono", 3, !1), r = vi(t, "stageLabel", 3, "PEQ"), i = /* @__PURE__ */ L(() => t.link.locked ? `Unlink from ${t.link.peerLabel}` : `Link with ${t.link.peerLabel}: edits mirror to them, copying this channel's EQ first`), a = /* @__PURE__ */ L(() => `${t.bands.length} Band ${r()}${t.link.locked ? ` · ${t.link.selectedShort}+${t.link.peerLabel}` : ""}`);
	var o = ha();
	wi(B(o), {
		code: "EQ.02",
		get title() {
			return K(a);
		},
		titleControl: (e) => {
			var n = Cr(), i = V(n), a = (e) => {
				var n = la(), i = B(n);
				ai(i), M(n), U(() => {
					$(i, "aria-label", `Enable ${r()}`), si(i, t.enabled);
				}), q("change", i, (e) => t.onEnable(e.currentTarget.checked)), Y(e, n);
			};
			Z(i, (e) => {
				t.enabled !== void 0 && e(a);
			}), Y(e, n);
		},
		right: (e) => {
			var r = pa(), a = V(r);
			Di(a, {
				get mono() {
					return n();
				},
				get value() {
					return t.bankChannel;
				},
				get onChange() {
					return t.onBankChannel;
				}
			});
			var o = H(a, 2), s = (e) => {
				var n = ua();
				let r;
				sa(B(n), () => t.link.locked), De(), M(n), U(() => {
					r = Jr(n, 1, "chip hi act link svelte-161tldd", null, r, { on: t.link.locked }), $(n, "title", K(i)), $(n, "aria-pressed", t.link.locked);
				}), q("click", n, function(...e) {
					t.onToggleLink?.apply(this, e);
				}), Y(e, n);
			};
			Z(o, (e) => {
				t.link.grouped && e(s);
			});
			var c = H(o, 2), l = (e) => {
				var n = da();
				q("click", n, function(...e) {
					t.onLibrary?.apply(this, e);
				}), Y(e, n);
			};
			Z(c, (e) => {
				t.onLibrary && e(l);
			});
			var u = H(c, 2), d = (e) => {
				var n = fa();
				q("click", n, function(...e) {
					t.onSetBoth?.apply(this, e);
				}), Y(e, n);
			};
			Z(u, (e) => {
				n() || e(d);
			}), q("click", H(u, 2), function(...e) {
				t.onReset?.apply(this, e);
			}), Y(e, r);
		},
		children: (e, n) => {
			var r = ma(), i = V(r);
			let a;
			Q(H(i, 2), 17, () => t.bands, Mr, (e, n, r) => {
				{
					let i = /* @__PURE__ */ L(() => t.selectedBand === r);
					oa(e, {
						get selected() {
							return K(i);
						},
						onSelect: () => t.onSelect(r),
						index: r,
						get band() {
							return K(n);
						},
						onPatch: (e) => t.onPatch(r, e),
						get types() {
							return t.types;
						}
					});
				}
			}), U(() => a = Xr(i, "", a, { "grid-template-columns": ra })), Y(e, r);
		},
		$$slots: {
			titleControl: !0,
			right: !0,
			default: !0
		}
	}), M(o), Y(e, o), Le();
}
pr(["change", "click"]);
var va = 20, ya = Ni, ba = (() => {
	let e = Array(201), t = Math.log(va), n = Math.log(ya) - t;
	for (let r = 0; r < 201; r++) e[r] = Math.exp(t + n * r / 200);
	return e;
})();
function xa(e) {
	return va * (ya / va) ** +e;
}
//#endregion
//#region src/components/bode/BodePlot.svelte
var Sa = /* @__PURE__ */ xr("<linearGradient x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\"><stop offset=\"0%\" stop-opacity=\"0.25\"></stop><stop offset=\"100%\" stop-opacity=\"0\"></stop></linearGradient>"), Ca = /* @__PURE__ */ xr("<linearGradient gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\"></stop><stop offset=\"100%\"></stop></linearGradient>"), wa = /* @__PURE__ */ xr("<line stroke=\"color-mix(in oklab, var(--text) 3.5%, transparent)\" stroke-width=\"0.5\" vector-effect=\"non-scaling-stroke\"></line>"), Ta = /* @__PURE__ */ xr("<line vector-effect=\"non-scaling-stroke\"></line><text dominant-baseline=\"middle\" text-anchor=\"end\" font-size=\"14\" fill=\"var(--text-dim)\" font-family=\"var(--font-sans)\"> </text>", 1), Ea = /* @__PURE__ */ xr("<line stroke=\"color-mix(in oklab, var(--text) 10%, transparent)\" stroke-width=\"0.6\" vector-effect=\"non-scaling-stroke\"></line><text text-anchor=\"middle\" font-size=\"14\" fill=\"var(--text-dim)\" font-family=\"var(--font-sans)\"> </text>", 1), Da = /* @__PURE__ */ xr("<path vector-effect=\"non-scaling-stroke\"></path>"), Oa = /* @__PURE__ */ xr("<path class=\"band-fill\" stroke=\"none\"></path>"), ka = /* @__PURE__ */ xr("<path fill=\"none\" stroke-linecap=\"round\" vector-effect=\"non-scaling-stroke\"></path>"), Aa = /* @__PURE__ */ xr("<text text-anchor=\"middle\" font-size=\"14\" fill=\"color-mix(in oklab, var(--text) 70%, transparent)\" font-family=\"var(--font-sans)\" pointer-events=\"none\"> </text>"), ja = /* @__PURE__ */ xr("<line stroke-opacity=\"0.25\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><circle r=\"3.5\" stroke=\"var(--bg)\" stroke-width=\"1.2\" pointer-events=\"none\"></circle><!>", 1), Ma = /* @__PURE__ */ xr("<line stroke=\"color-mix(in oklab, var(--text) 35%, transparent)\" stroke-width=\"0.7\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><line stroke=\"color-mix(in oklab, var(--text) 25%, transparent)\" stroke-width=\"0.7\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><g pointer-events=\"none\"><rect x=\"0\" y=\"-20\" width=\"150\" height=\"28\" rx=\"5\" fill=\"var(--panel-hi)\" stroke=\"var(--border-hi)\" stroke-width=\"0.6\"></rect><text x=\"8\" y=\"-1\" font-size=\"14\" font-family=\"var(--font-sans)\" fill=\"color-mix(in oklab, var(--text) 92%, transparent)\"> </text></g>", 1), Na = /* @__PURE__ */ J("<div class=\"bode-wrap svelte-mggv3i\"><svg width=\"100%\" role=\"img\" aria-label=\"Frequency response plot\"><defs><clipPath><rect y=\"0\"></rect></clipPath><!><!></defs><!><!><!><g><!><!><!><!></g><!></svg></div>"), Pa = {
	hash: "svelte-mggv3i",
	code: ".bode-wrap.svelte-mggv3i {width:100%;}.bode.pannable.svelte-mggv3i {cursor:grab;}.bode.dragging.svelte-mggv3i {cursor:grabbing;}.bode.svelte-mggv3i {display:block;touch-action:none;user-select:none;}"
};
function Fa(e, t) {
	Ie(t, !0), Hr(e, Pa);
	let n = vi(t, "markers", 19, () => []), r = vi(t, "yRange", 19, () => [Ri[0], Ri[1]]), i = vi(t, "height", 3, 220), a = vi(t, "crosshair", 3, !0), o = vi(t, "zeroColor", 3, "#9e3d37"), s = /* @__PURE__ */ R(720), c = /* @__PURE__ */ L(() => Math.max(140, K(s))), l = /* @__PURE__ */ L(() => K(c) - 20), u = /* @__PURE__ */ L(() => r()[0]), d = /* @__PURE__ */ L(() => r()[1]), f = /* @__PURE__ */ L(() => K(l) - 42), p = /* @__PURE__ */ L(() => i() - 28), m = /* @__PURE__ */ L(() => {
		let e = Array(201);
		for (let t = 0; t < 201; t++) e[t] = 42 + t / 200 * K(f);
		return e;
	});
	function h(e) {
		return K(p) - (e - K(u)) / (K(d) - K(u)) * K(p);
	}
	function g(e) {
		return Math.log(e / 20) / Math.log(Ni / 20);
	}
	function _(e) {
		return 42 + g(e) * K(f);
	}
	function v(e) {
		let t = e.length;
		if (t === 0) return "";
		if (t === 1) return `M ${e[0][0]} ${e[0][1]}`;
		let n = `M ${e[0][0]} ${e[0][1]}`;
		for (let r = 0; r < t - 1; r++) {
			let i = e[r === 0 ? 0 : r - 1], a = e[r], o = e[r + 1], s = e[r + 2 < t ? r + 2 : t - 1], c = a[0] + (o[0] - i[0]) / 6, l = a[1] + (o[1] - i[1]) / 6, u = o[0] - (s[0] - a[0]) / 6, d = o[1] - (s[1] - a[1]) / 6;
			n += ` C ${c} ${l} ${u} ${d} ${o[0]} ${o[1]}`;
		}
		return n;
	}
	function y(e) {
		return e.color ? e.color : e.gradientChannelIds ? `url(#bodeGrad-${e.id})` : e.channelId == null ? "var(--accent)" : Oi(e.channelId, "bright");
	}
	function b(e) {
		return e.color ? e.color : e.channelId == null ? "var(--accent)" : Oi(e.channelId, "bright");
	}
	function x(e) {
		return Oi(e, "bright");
	}
	let S = /* @__PURE__ */ L(() => t.curves.map((e) => {
		let t = Array(201);
		for (let n = 0; n < 201; n++) t[n] = [K(m)[n], h(e.points[n] ?? 0)];
		return {
			c: e,
			d: v(t),
			pts: t
		};
	})), C = /* @__PURE__ */ L(() => t.curves.length === 1), w = [
		20,
		50,
		100,
		200,
		500,
		1e3,
		2e3,
		5e3,
		1e4,
		2e4
	], T = /* @__PURE__ */ L(() => K(l) < 600 ? [
		20,
		80,
		320,
		1200,
		5e3,
		2e4
	] : w), ee = (() => {
		let e = new Set(w), t = [];
		for (let n of [
			10,
			100,
			1e3,
			1e4
		]) for (let r = 2; r <= 9; r++) {
			let i = n * r;
			i >= 20 && i <= 2e4 && !e.has(i) && t.push(i);
		}
		return t;
	})(), te = /* @__PURE__ */ L(() => {
		let e = (K(d) - K(u)) / 4, t = 10 ** Math.floor(Math.log10(e)), n = e / t, r = (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * t, i = Math.ceil(K(u) / r) * r, a = [];
		for (let e = i; e <= K(d) + 1e-9; e += r) a.push(Math.round(e * 1e6) / 1e6);
		return a;
	});
	function ne(e) {
		return e >= 1e3 ? `${e / 1e3}k` : String(e);
	}
	function re(e) {
		return e >= 1e3 ? `${(e / 1e3).toFixed(2)} kHz` : `${Math.round(e)} Hz`;
	}
	function ie(e) {
		return `${e >= 0 ? "+" : ""}${e.toFixed(1)} dB`;
	}
	let ae = `bode-plot-clip-${Math.random().toString(36).slice(2)}`, oe = /* @__PURE__ */ R(null), E = /* @__PURE__ */ R(null), D = /* @__PURE__ */ R(null), se = /* @__PURE__ */ R(null);
	function ce(e) {
		!t.onRangeChange || e.button !== 0 || !K(D) || (e.preventDefault(), z(se, {
			y: e.clientY,
			range: [...r()],
			id: e.pointerId
		}, !0), z(oe, null), z(E, null), K(D).setPointerCapture(e.pointerId));
	}
	function le(e) {
		if (!K(se) || !K(D) || !t.onRangeChange) {
			de(e);
			return;
		}
		let n = K(se).range[1] - K(se).range[0], r = (e.clientY - K(se).y) / (K(D).getBoundingClientRect().height * K(p) / i()) * n;
		t.onRangeChange([K(se).range[0] + r, K(se).range[1] + r]);
	}
	function ue(e) {
		K(se) && (K(D)?.hasPointerCapture(e.pointerId) && K(D).releasePointerCapture(e.pointerId), z(se, null));
	}
	function de(e) {
		if (!a() || !K(D)) return;
		let t = K(D).getBoundingClientRect();
		if (t.width === 0 || t.height === 0) return;
		let n = (e.clientX - t.left) / t.width, r = (e.clientY - t.top) / t.height, o = n * K(c), s = r * i();
		if (o < 42 || o > K(l) || s < 0 || s > K(p)) {
			z(oe, null), z(E, null);
			return;
		}
		let u = (o - 42) / K(f), d = Math.max(0, Math.min(200, Math.round(u * 200)));
		o = K(m)[d], z(oe, o, !0), z(E, s);
	}
	function fe() {
		z(oe, null), z(E, null);
	}
	let pe = /* @__PURE__ */ L(() => {
		if (K(oe) == null) return null;
		let e = (K(oe) - 42) / K(f);
		return xa(Math.max(0, Math.min(1, e)));
	}), me = /* @__PURE__ */ L(() => {
		if (K(E) == null) return null;
		let e = (K(p) - K(E)) / K(p);
		return K(u) + e * (K(d) - K(u));
	});
	function he(e) {
		return Math.max(46, Math.min(K(l) - 156, e + 6));
	}
	function ge(e) {
		return Math.max(22, Math.min(K(p) - 6, e - 8));
	}
	var _e = Na(), ve = B(_e);
	let ye;
	var O = B(ve), be = B(O), xe = B(be);
	$(xe, "x", 42), M(be);
	var Se = H(be), Ce = (e) => {
		var n = Sa(), r = B(n), i = H(r);
		M(n), U((e, a) => {
			$(n, "id", `bodeFill-${t.curves[0].id ?? ""}`), $(r, "stop-color", e), $(i, "stop-color", a);
		}, [() => b(t.curves[0]), () => b(t.curves[0])]), Y(e, n);
	};
	Z(Se, (e) => {
		K(C) && t.curves[0] && e(Ce);
	}), Q(H(Se), 17, () => t.curves, (e) => e.id, (e, t) => {
		var n = Cr(), r = V(n), i = (e) => {
			var n = Ca();
			$(n, "x1", 42), $(n, "y1", 0), $(n, "y2", 0);
			var r = B(n), i = H(r);
			M(n), U((e, a) => {
				$(n, "id", `bodeGrad-${K(t).id ?? ""}`), $(n, "x2", K(l)), $(r, "stop-color", e), $(i, "stop-color", a);
			}, [() => x(K(t).gradientChannelIds[0]), () => x(K(t).gradientChannelIds[1])]), Y(e, n);
		};
		Z(r, (e) => {
			K(t).gradientChannelIds && e(i);
		}), Y(e, n);
	}), M(O);
	var k = H(O);
	Q(k, 16, () => ee, (e) => e, (e, t) => {
		var n = wa();
		$(n, "y1", 0), U((e, t) => {
			$(n, "x1", e), $(n, "x2", t), $(n, "y2", K(p));
		}, [() => _(t), () => _(t)]), Y(e, n);
	});
	var A = H(k);
	Q(A, 16, () => K(te), (e) => e, (e, t) => {
		let n = /* @__PURE__ */ L(() => h(t));
		var r = Ta(), i = V(r);
		$(i, "x1", 42);
		var a = H(i);
		$(a, "x", 34);
		var s = B(a);
		M(a), U(() => {
			$(i, "x2", K(l)), $(i, "y1", K(n)), $(i, "y2", K(n)), $(i, "stroke", t === 0 ? o() : "#353531"), $(i, "stroke-dasharray", t === 0 ? "6 5" : ""), $(i, "stroke-width", t === 0 ? 1 : .5), $(a, "y", K(n)), X(s, `${t > 0 ? "+" : ""}${t ?? ""}`);
		}), Y(e, r);
	});
	var we = H(A);
	Q(we, 16, () => K(T), (e) => e, (e, t) => {
		let n = /* @__PURE__ */ L(() => _(t));
		var r = Ea(), i = V(r);
		$(i, "y1", 0);
		var a = H(i), o = B(a, !0);
		M(a), U((e) => {
			$(i, "x1", K(n)), $(i, "x2", K(n)), $(i, "y2", K(p)), $(a, "x", K(n)), $(a, "y", K(p) + 22), X(o, e);
		}, [() => ne(t)]), Y(e, r);
	});
	var j = H(we), Te = B(j), Ee = (e) => {
		var n = Da();
		U(() => {
			$(n, "d", K(S)[0].d + ` L ${K(l)} ${K(p)} L 42 ${K(p)} Z`), $(n, "fill", `url(#bodeFill-${t.curves[0].id ?? ""})`);
		}), Y(e, n);
	};
	Z(Te, (e) => {
		K(C) && K(S)[0] && e(Ee);
	});
	var De = H(Te);
	Q(De, 17, () => K(S), (e) => e.c.id, (e, t) => {
		var n = Cr(), r = V(n), i = (e) => {
			var n = Oa();
			U((e, r) => {
				$(n, "d", e), $(n, "fill", r), $(n, "fill-opacity", K(t).c.fillOpacity);
			}, [() => K(t).d + ` L ${K(l)} ${h(0)} L 42 ${h(0)} Z`, () => y(K(t).c)]), Y(e, n);
		};
		Z(r, (e) => {
			K(t).c.fillOpacity && e(i);
		}), Y(e, n);
	});
	var Oe = H(De);
	Q(Oe, 17, () => K(S), (e) => e.c.id, (e, t) => {
		var n = ka();
		U((e) => {
			$(n, "d", K(t).d), $(n, "stroke", e), $(n, "stroke-width", K(t).c.width ?? 1.6), $(n, "stroke-dasharray", K(t).c.dashed ? "5 4" : void 0);
		}, [() => y(K(t).c)]), Y(e, n);
	}), Q(H(Oe), 19, n, (e, t) => e.id ?? t, (e, t) => {
		let n = /* @__PURE__ */ L(() => _(Math.max(20, Math.min(Ni, K(t).f)))), r = /* @__PURE__ */ L(() => h(Math.max(K(u), Math.min(K(d), K(t).db)))), i = /* @__PURE__ */ L(() => K(t).channelId == null ? "color-mix(in oklab, var(--text) 85%, transparent)" : Oi(K(t).channelId, "bright"));
		var a = ja(), o = V(a), s = H(o), c = H(s), l = (e) => {
			var i = Aa(), a = B(i, !0);
			M(i), U(() => {
				$(i, "x", K(n)), $(i, "y", K(r) - 8), X(a, K(t).label);
			}), Y(e, i);
		};
		Z(c, (e) => {
			K(t).label && e(l);
		}), U(() => {
			$(o, "x1", K(n)), $(o, "x2", K(n)), $(o, "y1", K(r)), $(o, "y2", K(p)), $(o, "stroke", K(i)), $(s, "cx", K(n)), $(s, "cy", K(r)), $(s, "fill", K(i));
		}), Y(e, a);
	}), M(j);
	var ke = H(j), Ae = (e) => {
		var t = Ma(), n = V(t);
		$(n, "y1", 0);
		var r = H(n);
		$(r, "x1", 42);
		var i = H(r), a = H(B(i)), o = B(a);
		M(a), M(i), U((e, t, a) => {
			$(n, "x1", K(oe)), $(n, "x2", K(oe)), $(n, "y2", K(p)), $(r, "x2", K(l)), $(r, "y1", K(E)), $(r, "y2", K(E)), $(i, "transform", e), X(o, `${t ?? ""} · ${a ?? ""}`);
		}, [
			() => `translate(${he(K(oe))} ${ge(K(E))})`,
			() => re(K(pe)),
			() => ie(K(me))
		]), Y(e, t);
	};
	Z(ke, (e) => {
		a() && K(oe) != null && K(E) != null && K(pe) != null && K(me) != null && e(Ae);
	}), M(ve), _i(ve, (e) => z(D, e), () => K(D)), M(_e), U(() => {
		ye = Jr(ve, 0, "bode svelte-mggv3i", null, ye, {
			pannable: !!t.onRangeChange,
			dragging: !!K(se)
		}), $(ve, "viewBox", `0 0 ${K(c)} ${i()}`), $(ve, "height", i()), $(be, "id", ae), $(xe, "width", K(f)), $(xe, "height", K(p)), $(j, "clip-path", `url(#${ae})`);
	}), q("pointerdown", ve, ce), q("pointermove", ve, le), q("pointerup", ve, ue), fr("pointercancel", ve, ue), fr("lostpointercapture", ve, () => z(se, null)), fr("pointerleave", ve, fe), hi(_e, "clientWidth", (e) => z(s, e)), Y(e, _e), Le();
}
pr([
	"pointerdown",
	"pointermove",
	"pointerup"
]);
//#endregion
//#region src/components/eq/LoudnessReference.svelte
var Ia = /* @__PURE__ */ xr("<path class=\"svelte-nn8tlv\"></path>"), La = /* @__PURE__ */ xr("<svg class=\"mini svelte-nn8tlv\" viewBox=\"0 0 100 48\" preserveAspectRatio=\"none\" role=\"img\" aria-label=\"Eversolo loudness reference illustration\"><line class=\"zero-reference svelte-nn8tlv\" x1=\"4\" x2=\"96\"></line><!></svg>"), Ra = /* @__PURE__ */ J("<div class=\"reference-plot svelte-nn8tlv\" role=\"group\" aria-label=\"Eversolo loudness reference graph\"><!></div>"), za = {
	hash: "svelte-nn8tlv",
	code: ".mini.svelte-nn8tlv {display:block;width:100%;height:40px;}.zero-reference.svelte-nn8tlv {stroke:#92928d;stroke-width:1;vector-effect:non-scaling-stroke;}.mini.svelte-nn8tlv path:where(.svelte-nn8tlv) {fill:none;stroke-width:1.4;vector-effect:non-scaling-stroke;}.reference-plot.svelte-nn8tlv {width:100%;}"
};
function Ba(e, t) {
	Ie(t, !0), Hr(e, za);
	let n = vi(t, "compact", 3, !1), r = [
		[
			22,
			21,
			20,
			19.5,
			19,
			18.5,
			17,
			14,
			12,
			18,
			20,
			23
		],
		[
			9,
			6,
			3,
			0,
			-2,
			-3,
			-3,
			-3,
			-4,
			2,
			2.5,
			7
		],
		[
			1,
			-5,
			-12,
			-18,
			-23,
			-24,
			-26,
			-27,
			-26,
			-20,
			-17,
			-12
		]
	], i = [
		0,
		.12,
		.24,
		.36,
		.48,
		.56,
		.64,
		.72,
		.8,
		.87,
		.95,
		1
	];
	function a(e) {
		return Array.from({ length: 201 }, (t, n) => {
			let r = n / 200, a = 0;
			for (; a < i.length - 2 && r > i[a + 1];) a++;
			let o = (r - i[a]) / (i[a + 1] - i[a]), s = e[Math.max(0, a - 1)], c = e[Math.min(e.length - 1, a + 2)], l = a === 0 ? e[1] - e[0] : (e[a + 1] - s) / (i[a + 1] - i[a - 1]) * (i[a + 1] - i[a]), u = a === e.length - 2 ? e[a + 1] - e[a] : (c - e[a]) / (i[a + 2] - i[a]) * (i[a + 1] - i[a]);
			return (2 * o ** 3 - 3 * o ** 2 + 1) * e[a] + (o ** 3 - 2 * o ** 2 + o) * l + (-2 * o ** 3 + 3 * o ** 2) * e[a + 1] + (o ** 3 - o ** 2) * u;
		});
	}
	let o = r.map((e, t) => ({
		id: `loudness-reference-${t}`,
		label: `Reference contour ${t + 1}`,
		points: a(e),
		color: ki.loudness,
		width: 2
	}));
	function s(e) {
		return e.map((e, t) => `${t ? "L" : "M"}${4 + t * .46},${3 + (26 - e) / 56 * 42}`).join(" ");
	}
	var c = Cr(), l = V(c), u = (e) => {
		var t = La(), n = B(t);
		$(n, "y1", 22.5), $(n, "y2", 22.5), Q(H(n), 17, () => o, (e) => e.id, (e, t) => {
			var n = Ia();
			U((e) => {
				$(n, "d", e), $(n, "stroke", ki.loudness);
			}, [() => s(K(t).points)]), Y(e, n);
		}), M(t), Y(e, t);
	}, d = (e) => {
		var t = Ra();
		Fa(B(t), {
			get curves() {
				return o;
			},
			zeroColor: "#92928d",
			height: 280,
			yRange: [-36, 30]
		}), M(t), Y(e, t);
	};
	Z(l, (e) => {
		n() ? e(u) : e(d, -1);
	}), Y(e, c), Le();
}
//#endregion
//#region src/components/eq/PreampPanel.svelte
var Va = /* @__PURE__ */ J("<button class=\"chip hi\">Reset</button>"), Ha = /* @__PURE__ */ J("<div class=\"row svelte-15ajtes\"><span class=\"svelte-15ajtes\"> </span> <input type=\"range\" class=\"svelte-15ajtes\"/> <div class=\"value svelte-15ajtes\"><!></div></div>"), Ua = /* @__PURE__ */ J("<div class=\"balance-control svelte-15ajtes\"><div class=\"balance-value svelte-15ajtes\"><span class=\"svelte-15ajtes\">Left</span><!><span class=\"svelte-15ajtes\">Right</span></div> <input aria-label=\"PEQ balance\" type=\"range\" min=\"-6\" max=\"6\" step=\"0.1\" class=\"svelte-15ajtes\"/></div>"), Wa = /* @__PURE__ */ J("<!> <!>", 1), Ga = {
	hash: "svelte-15ajtes",
	code: ".row.svelte-15ajtes {display:flex;align-items:center;gap:14px;padding:8px 22px;}.row.svelte-15ajtes > span:where(.svelte-15ajtes) {width:40px;font-size:14px;color:var(--text-dim);}.row.svelte-15ajtes > input:where(.svelte-15ajtes) {flex:1;min-width:0;}.value.svelte-15ajtes {width:112px;}input[type=range].svelte-15ajtes {appearance:none;background:transparent;height:30px;cursor:pointer;}input[type=range].svelte-15ajtes::-webkit-slider-runnable-track {height:6px;background:#4a4a46;border-radius:4px;}input[type=range].svelte-15ajtes::-webkit-slider-thumb {appearance:none;width:8px;height:24px;margin-top:-9px;background:#eeeeea;border-radius:3px;}input[type=range].svelte-15ajtes::-moz-range-track {height:6px;background:#4a4a46;border-radius:4px;}input[type=range].svelte-15ajtes::-moz-range-thumb {width:8px;height:24px;background:#eeeeea;border:0;border-radius:3px;}.balance-control.svelte-15ajtes {padding:4px 22px 14px;}.balance-value.svelte-15ajtes {display:grid;grid-template-columns:1fr 120px 1fr;align-items:center;gap:12px;}.balance-value.svelte-15ajtes > span:where(.svelte-15ajtes):last-child {text-align:right;}.balance-control.svelte-15ajtes input:where(.svelte-15ajtes) {width:100%;}"
};
function Ka(e, t) {
	Ie(t, !0), Hr(e, Ga), wi(e, {
		code: "EQ.03",
		title: "Preamp & Balance",
		right: (e) => {
			var n = Va();
			q("click", n, function(...e) {
				t.onReset?.apply(this, e);
			}), Y(e, n);
		},
		children: (e, n) => {
			var r = Wa(), i = V(r);
			Q(i, 17, () => t.rightPreampDb === void 0 ? [0] : [0, 1], Mr, (e, n) => {
				let r = /* @__PURE__ */ L(() => K(n) === 0 ? t.preampDb : t.rightPreampDb), i = /* @__PURE__ */ L(() => K(n) === 0 ? t.onChange : t.onRightChange);
				var a = Ha(), o = B(a), s = B(o, !0);
				M(o);
				var c = H(o, 2);
				ai(c);
				var l = H(c, 2);
				Zi(B(l), {
					kind: "dB-signed",
					get value() {
						return K(r);
					},
					get min() {
						return -30;
					},
					get max() {
						return 12;
					},
					get step() {
						return Li;
					},
					tone: "signed",
					align: "right",
					get onChange() {
						return K(i);
					}
				}), M(l), M(a), U(() => {
					X(s, t.rightPreampDb === void 0 ? "Mono" : K(n) === 0 ? "Left" : "Right"), $(c, "aria-label", K(n) === 0 ? "Left preamp" : "Right preamp"), $(c, "min", -30), $(c, "max", 12), $(c, "step", Li), oi(c, K(r));
				}), q("input", c, (e) => K(i)(e.currentTarget.valueAsNumber)), Y(e, a);
			});
			var a = H(i, 2), o = (e) => {
				var n = Ua(), r = B(n);
				Zi(H(B(r)), {
					kind: "dB-signed",
					align: "center",
					get value() {
						return t.balance;
					},
					min: -6,
					max: 6,
					step: .1,
					precision: 1,
					get onChange() {
						return t.onBalance;
					}
				}), De(), M(r);
				var i = H(r, 2);
				ai(i), M(n), U(() => oi(i, t.balance)), q("input", i, (e) => t.onBalance(e.currentTarget.valueAsNumber)), Y(e, n);
			};
			Z(a, (e) => {
				t.balance !== void 0 && e(o);
			}), Y(e, r);
		},
		$$slots: {
			right: !0,
			default: !0
		}
	}), Le();
}
pr(["click", "input"]);
//#endregion
//#region src/components/bode/filterCurve.ts
var qa = 48e3, Ja = Math.PI * 2, Ya = Math.log(10);
function Xa(e, t, n, r, i) {
	if (e === Mi.Flat) return null;
	let a = Ja * t / i, o = Math.cos(a), s = Math.sin(a) / (2 * Math.max(.001, n));
	if (e === Mi.Peaking) {
		let e = 10 ** (r / 40), t = 1 + s / e;
		return {
			b0: (1 + s * e) / t,
			b1: -2 * o / t,
			b2: (1 - s * e) / t,
			a1: -2 * o / t,
			a2: (1 - s / e) / t
		};
	}
	return null;
}
function Za(e, t) {
	let n = Math.cos(t), r = Math.sin(t), i = Math.cos(2 * t), a = Math.sin(2 * t), o = e.b0 + e.b1 * n + e.b2 * i, s = -(e.b1 * r + e.b2 * a), c = 1 + e.a1 * n + e.a2 * i, l = -(e.a1 * r + e.a2 * a), u = o * o + s * s, d = c * c + l * l;
	return 10 / Ya * Math.log(u / d);
}
function Qa(e, t) {
	let n = [];
	for (let r of e) {
		if (r.bypass) continue;
		let e = Xa(r.type, r.frequency, r.q, r.gain, t);
		e && n.push(e);
	}
	return n;
}
function $a(e, t) {
	let n = qa, r = Array(201);
	for (let e = 0; e < 201; e++) r[e] = t;
	for (let t of Qa(e, n)) for (let e = 0; e < 201; e++) {
		let i = Ja * ba[e] / n;
		r[e] += Za(t, i);
	}
	return r;
}
//#endregion
//#region src/adapter.ts
var eo = (e) => e === 0 ? "audioTunningEQList" : "audioTunningEQListRight", to = (e) => e === 0 ? "enableEQ" : "enableEQRight", no = (e) => "loudness", ro = (e) => e === 0 ? "left" : "right", io = (e) => JSON.parse(JSON.stringify(e)), ao = (e, t) => e[eo(t)] ?? [], oo = (e, t) => (ao(e, t)[0]?.volume ?? 0) / 10;
function so(e) {
	return {
		frequency: e.fc,
		gain: e.gain,
		q: e.q,
		bypass: e.bypass,
		type: e.type === 6 ? Mi.Peaking : 1e3 + e.type
	};
}
function co(e, t) {
	let n = { ...e };
	if (t.frequency !== void 0 && (n.fc = t.frequency), t.gain !== void 0 && (n.gain = t.gain), t.q !== void 0 && (n.q = t.q), t.bypass !== void 0 && (n.bypass = t.bypass), t.type !== void 0) {
		let e = t.type === Mi.Peaking ? 6 : t.type - 1e3;
		if (e < 2 || e > 9) throw Error("Unverified Eversolo filter type");
		n.type = e;
	}
	return n;
}
function lo(e, t) {
	return e.settingType !== 0 || t === 0 ? e : {
		...e,
		audioTunningEQListRight: e.audioTunningEQList,
		enableEQRight: e.enableEQ,
		eqGeqGainBeansRight: e.eqGeqGainBeans,
		enableGeqRight: e.enableGeq,
		peqFirListRight: e.peqFirList,
		enablePeqRightFir: e.enablePeqLeftFir
	};
}
function uo(e) {
	if (!e?.loaded || e.error || e.coordinate !== "log10_hz") return null;
	let t = e.points.filter((e) => Number.isFinite(e.x) && Number.isFinite(e.y)).sort((e, t) => e.x - t.x);
	return t.length < 2 || t[0].x === t.at(-1).x ? null : ba.map((e) => {
		let n = Math.log10(e);
		if (n <= t[0].x) return t[0].y;
		if (n >= t.at(-1).x) return t.at(-1).y;
		let r = t.findIndex((e) => e.x >= n), i = t[r - 1], a = t[r];
		return i.y + (a.y - i.y) * ((n - i.x) / (a.x - i.x));
	});
}
function fo(e) {
	if (!e?.length) return null;
	let t = [...e].sort((e, t) => e.freq - t.freq);
	return ba.map((e) => {
		if (e <= t[0].freq) return t[0].gain;
		if (e >= t.at(-1).freq) return t.at(-1).gain;
		let n = t.findIndex((t) => t.freq >= e), r = t[n - 1], i = t[n], a = Math.log(e / r.freq) / Math.log(i.freq / r.freq), o = (1 - Math.cos(Math.PI * a)) / 2;
		return r.gain + (i.gain - r.gain) * o;
	});
}
function po(e, t, n, r) {
	e = lo(e, t);
	let i = [], a = ao(e, t), o = e[to(t)] !== !1 && a.length > 0;
	if (a.length) {
		let n = oo(e, t);
		n !== 0 && i.push({
			id: "preamp",
			label: "Preamp",
			color: ki.preamp,
			detail: `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`,
			points: Array(201).fill(n)
		});
	}
	let s = e.balance ?? 0;
	if (s !== 0) {
		let e = t === 1 ? Math.min(0, s) : -Math.max(0, s);
		i.push({
			id: "balance",
			label: "Balance",
			color: ki.balance,
			detail: s < 0 ? `${Math.abs(s).toFixed(1)} dB left` : `${s.toFixed(1)} dB right`,
			points: Array(201).fill(e)
		});
	}
	if (o) {
		let e = a.every((e) => e.bypass || e.type === 6 || e.type === 9);
		i.push({
			id: "peq",
			label: "PEQ",
			color: ki.peq,
			detail: e ? `${a.filter((e) => !e.bypass).length} active bands · Provisional 48 kHz preview` : "Unmapped filter · curve unavailable",
			points: e ? $a(a.filter((e) => e.type !== 9).map(so), 0) : null
		});
	}
	if (e[t === 0 ? "enableGeq" : "enableGeqRight"]) {
		let n = e[t === 0 ? "eqGeqGainBeans" : "eqGeqGainBeansRight"];
		i.push({
			id: "geq",
			label: "Graphic EQ",
			color: ki.peq,
			detail: `${n?.length ?? 0} bands`,
			points: fo(n)
		});
	}
	if (e[t === 0 ? "enablePeqLeftFir" : "enablePeqRightFir"]) {
		let n = e[t === 0 ? "peqFirList" : "peqFirListRight"] ?? [], r = fo(n.map((e) => ({
			freq: e.fc,
			gain: e.bypass || e.type === 9 ? 0 : e.gain
		}))), a = (n[0]?.volume ?? 0) / 10;
		i.push({
			id: "correction",
			label: "Correction PEQ",
			color: ki.peq,
			detail: `${n.length} Bands`,
			points: r?.map((e) => e + a) ?? null
		});
	}
	(e[t === 0 ? "enableLeftFir" : "enableRightFir"] ?? n?.firEnabled[ro(t)]) && i.push({
		id: "fir",
		label: "FIR",
		color: ki.fir,
		detail: r?.loaded ? "Device response · read only" : "Device curve unavailable",
		points: uo(r)
	}), e[no(t)] === 1 && i.push({
		id: "loudness",
		label: "Loudness",
		color: ki.loudness,
		detail: "Eversolo reference illustration",
		points: null,
		illustrative: !0
	});
	let c = [
		"preamp",
		"balance",
		"geq",
		"peq",
		"correction",
		"fir",
		"loudness"
	];
	return i.sort((e, t) => c.indexOf(e.id) - c.indexOf(t.id));
}
function mo(e) {
	let t = Array(201).fill(0), n = [];
	for (let r of e) {
		if (!r.points || r.illustrative) {
			n.push(r.label);
			continue;
		}
		for (let e = 0; e < 201; e++) t[e] += r.points[e];
	}
	return {
		points: t,
		omitted: n
	};
}
//#endregion
//#region src/components/eq/ProcessingResponse.svelte
var ho = /* @__PURE__ */ J("<span class=\"response-controls svelte-1k65run\"><button type=\"button\" class=\"chip hi preview-channel svelte-1k65run\"> </button><button type=\"button\" class=\"chip hi mode-cycle svelte-1k65run\"> </button></span>"), go = /* @__PURE__ */ J("<input class=\"mini-slider svelte-1k65run\" aria-label=\"Preview Balance\" type=\"range\" min=\"-6\" max=\"6\" step=\"0.1\" disabled=\"\"/> <p class=\"svelte-1k65run\"> </p>", 1), _o = /* @__PURE__ */ J("<input class=\"mini-slider svelte-1k65run\" type=\"range\" disabled=\"\"/>"), vo = /* @__PURE__ */ J("<div class=\"preamp-sliders svelte-1k65run\"></div> <p class=\"svelte-1k65run\"> </p>", 1), yo = /* @__PURE__ */ J("<div role=\"button\" tabindex=\"0\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span> </div> <!></div>"), bo = /* @__PURE__ */ J("<div class=\"stage reference-stage svelte-1k65run\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span>Loudness</div> <!></div>"), xo = /* @__PURE__ */ xr("<path class=\"svelte-1k65run\"></path>"), So = /* @__PURE__ */ xr("<path class=\"svelte-1k65run\"></path>"), Co = /* @__PURE__ */ xr("<svg viewBox=\"0 0 100 48\" preserveAspectRatio=\"none\" role=\"img\" class=\"svelte-1k65run\"><line class=\"zero-reference svelte-1k65run\" x1=\"4\" x2=\"96\" y1=\"24\" y2=\"24\"></line><!></svg>"), wo = /* @__PURE__ */ J("<div class=\"unavailable svelte-1k65run\">Curve Unavailable</div>"), To = /* @__PURE__ */ J("<button type=\"button\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span> </div> <!></button>"), Eo = /* @__PURE__ */ J("<p class=\"flat svelte-1k65run\">No enabled processing contributions · flat response</p>"), Do = /* @__PURE__ */ J("<option hidden=\"\" disabled=\"\">Custom</option>"), Oo = /* @__PURE__ */ J("<div class=\"plot-key svelte-1k65run\" aria-label=\"Response Line Key\"><span class=\"svelte-1k65run\"><svg width=\"26\" height=\"12\" viewBox=\"0 0 26 12\" aria-hidden=\"true\" class=\"svelte-1k65run\"><line x1=\"1\" x2=\"25\" y1=\"6\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\"></line></svg>Left Channel</span> <span class=\"svelte-1k65run\"><svg width=\"26\" height=\"12\" viewBox=\"0 0 26 12\" aria-hidden=\"true\" class=\"svelte-1k65run\"><line x1=\"1\" x2=\"25\" y1=\"6\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-dasharray=\"5 4\"></line></svg>Right Channel</span></div>"), ko = /* @__PURE__ */ J("<div class=\"stages svelte-1k65run\" aria-label=\"Enabled processing stages\"></div> <div class=\"plot-controls svelte-1k65run\"><label class=\"svelte-1k65run\">Vertical Scale <select aria-label=\"Response vertical scale\" class=\"svelte-1k65run\"><option>Auto</option><option>±6 dB</option><option>±12 dB</option><option>±24 dB</option><option>±20 dB</option><!><option>±48 dB</option></select></label><button class=\"chip svelte-1k65run\" aria-label=\"Reset graph scale\">Reset</button></div> <div class=\"plot svelte-1k65run\"><!> <!></div>", 1), Ao = {
	hash: "svelte-1k65run",
	code: ".slider-stage.svelte-1k65run {cursor:pointer;}.preamp-sliders.svelte-1k65run {position:relative;height:20px;}.mini-slider.svelte-1k65run {appearance:none;background:transparent;width:100%;min-width:0;height:20px;margin:0;cursor:default;opacity:1;pointer-events:none;}.preamp-sliders.svelte-1k65run .mini-slider:where(.svelte-1k65run) {position:absolute;inset:0;pointer-events:none;}.mini-slider.svelte-1k65run::-webkit-slider-runnable-track {height:3px;background:color-mix(in srgb, var(--stage-color) 60%, #444);border-radius:3px;}.mini-slider.svelte-1k65run::-webkit-slider-thumb {appearance:none;width:8px;height:15px;margin-top:-6px;border-radius:3px;background:var(--thumb-color, var(--stage-color));pointer-events:none;}.mini-slider.svelte-1k65run::-moz-range-track {height:3px;background:var(--stage-color);}.mini-slider.svelte-1k65run::-moz-range-thumb {width:8px;height:15px;border:0;background:var(--thumb-color, var(--stage-color));pointer-events:none;}.response-controls.svelte-1k65run {display:inline-flex;align-items:center;gap:8px;}.preview-channel.svelte-1k65run {width:140px;min-width:140px;flex:0 0 140px;white-space:nowrap;}.mode-cycle.svelte-1k65run {width:80px;min-width:80px;flex:0 0 80px;}.stages.svelte-1k65run {container-type:inline-size;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;padding:6px 14px 0;}.stage.svelte-1k65run {position:relative;display:grid;grid-template-rows:20px 20px 18px;align-content:start;height:72px;text-align:left;cursor:pointer;color:var(--text);font:inherit;min-width:0;--stage-columns: min(var(--stage-count), 2);flex:0 0 calc((100% - (var(--stage-columns) - 1) * 8px) / var(--stage-columns));padding:6px 10px;border:1px solid var(--stage-color);background:color-mix(in srgb, var(--stage-color) 12%, var(--panel-solid));border-radius:10px;}\n  @container (min-width: 346px) {.stage.svelte-1k65run {--stage-columns: min(var(--stage-count), 3);} }\n  @container (min-width: 464px) {.stage.svelte-1k65run {--stage-columns: min(var(--stage-count), 4);} }\n  @container (min-width: 582px) {.stage.svelte-1k65run {--stage-columns: min(var(--stage-count), 5);} }\n  @container (min-width: 700px) {.stage.svelte-1k65run {--stage-columns: min(var(--stage-count), 6);} }\n  @container (min-width: 818px) {.stage.svelte-1k65run {--stage-columns: min(var(--stage-count), 7);} }.stage[data-stage=\"fir\"].svelte-1k65run svg:where(.svelte-1k65run) {height:30px;}.stage[data-stage=\"fir\"].svelte-1k65run {grid-template-rows:20px 30px 8px;}.reference-stage.svelte-1k65run {cursor:default;grid-template-rows:20px 40px;}.stage.svelte-1k65run:not(.reference-stage):hover {background:color-mix(in srgb, var(--stage-color) 22%, var(--panel-solid));}.stage.selected.svelte-1k65run {background:color-mix(in srgb, var(--stage-color) 42%, var(--panel-solid));box-shadow:inset 0 0 0 2px var(--stage-color), 0 0 0 1px var(--stage-color);}.stage.svelte-1k65run:focus-visible {outline:2px solid var(--accent);outline-offset:2px;}.stage-name.svelte-1k65run {align-self:start;display:flex;gap:7px;align-items:center;flex-wrap:wrap;color:var(--text);font:14px var(--font-sans);}.dot.svelte-1k65run {height:5px;width:5px;background:var(--stage-color);border-radius:50%;}.stage.svelte-1k65run svg:where(.svelte-1k65run) {align-self:center;display:block;width:100%;height:20px;margin-top:0;}.stage.svelte-1k65run path:where(.svelte-1k65run) {fill:none;stroke:var(--stage-color);stroke-width:1.3;vector-effect:non-scaling-stroke;}.stage.svelte-1k65run line:where(.svelte-1k65run) {stroke:#92928d;stroke-width:1;vector-effect:non-scaling-stroke;}.stage.svelte-1k65run p:where(.svelte-1k65run) {font:14px/1.5 var(--font-sans);color:var(--text-dim);margin:2px 0 0;}.unavailable.svelte-1k65run {height:28px;display:grid;place-items:center;color:var(--text-faint);font:14px var(--font-sans);}.flat.svelte-1k65run {color:var(--text-dim);font:14px var(--font-sans);}.plot-controls.svelte-1k65run {display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:6px 14px 0;}\n @media (max-width: 900px) {.plot-controls.svelte-1k65run {justify-content:center;} }.plot-controls.svelte-1k65run .chip:where(.svelte-1k65run) {min-height:30px;padding:4px 10px;font-size:13px;}.plot-controls.svelte-1k65run label:where(.svelte-1k65run) {display:flex;align-items:center;gap:8px;color:var(--text-dim);font:13px var(--font-sans);}.plot-controls.svelte-1k65run select:where(.svelte-1k65run) {min-height:30px;border:1px solid var(--border-hi);background-color:var(--panel-solid);color:var(--text);border-radius:7px;padding:4px 10px;font:inherit;}.plot.svelte-1k65run {position:relative;padding:6px 14px 0 6px;}.plot-key.svelte-1k65run {position:absolute;right:24px;top:14px;max-width:calc(100% - 80px);max-height:92px;overflow:auto;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:4px 14px;padding:6px 9px;border-radius:6px;background:color-mix(in srgb, var(--panel-solid) 88%, transparent);color:var(--text);font:12px var(--font-sans);}.plot-key.svelte-1k65run > span:where(.svelte-1k65run) {display:inline-flex;align-items:center;gap:6px;}.plot-key.svelte-1k65run svg:where(.svelte-1k65run) {flex-shrink:0;}\n  @media(max-width: 600px) {.stages.svelte-1k65run {padding:12px 12px 0;gap:8px;} }"
};
function jo(e, t) {
	Ie(t, !0), Hr(e, Ao);
	let n = /* @__PURE__ */ R(Ht([])), r = /* @__PURE__ */ R(!1), i = /* @__PURE__ */ R("auto"), a = /* @__PURE__ */ R(Ht([-20, 20]));
	function o(e) {
		z(a, e, !0), z(i, "custom");
	}
	function s() {
		z(i, "auto"), z(a, [-20, 20], !0);
	}
	let c = !1;
	pn(() => {
		t.profile.id, t.channel, z(n, [], !0), c = !1;
	}), pn(() => {
		let e = t.previewRequest;
		e.serial && ar(() => {
			e.stage && (!K(n).length || c) ? (z(n, [e.stage], !0), c = !0) : !e.stage && c && (z(n, [], !0), c = !1);
		});
	});
	function l(e) {
		e !== "loudness" && (c = !1, z(n, K(n).includes(e) ? K(n).filter((t) => t !== e) : [...K(n), e], !0));
	}
	function u(e) {
		let t = e.composedPath();
		t.find((e) => e instanceof HTMLElement && e.matches("section.panel"))?.querySelector(".stages") && (t.some((e) => e instanceof Element && e.matches("button, select, input, label, svg, [data-stage]")) || (z(n, [], !0), c = !1));
	}
	let d = /* @__PURE__ */ L(() => t.fir?.profile_id === t.profile.id && t.fir.revision === t.profile.revision ? t.fir : null), f = /* @__PURE__ */ L(() => po(t.settings, 0, t.profile.processing, K(d)?.left)), p = /* @__PURE__ */ L(() => po(t.settings, 1, t.profile.processing, K(d)?.right)), m = [
		"preamp",
		"balance",
		"geq",
		"peq",
		"correction",
		"fir",
		"loudness"
	], h = /* @__PURE__ */ L(() => (K(r) ? [...K(f), ...K(p).filter((e) => !K(f).some((t) => t.id === e.id))] : t.channel === 0 ? K(f) : K(p)).slice().sort((e, t) => m.indexOf(e.id) - m.indexOf(t.id))), g = /* @__PURE__ */ L(() => [
		K(h).find((e) => e.id === "preamp") ?? {
			id: "preamp",
			label: "Preamp",
			color: "#e8b857",
			points: null
		},
		...t.settings.balance === void 0 ? [] : [K(h).find((e) => e.id === "balance") ?? {
			id: "balance",
			label: "Balance",
			color: "#b49cde",
			points: null
		}],
		...K(h).filter((e) => e.id !== "preamp" && e.id !== "balance")
	]);
	function _(e) {
		let r = K(e === 0 ? f : p), i = K(n).length ? r.filter((e) => K(n).includes(e.id)) : r, a = mo(i);
		if (!K(n).length) return [{
			id: "composite",
			label: "Composite response",
			points: mo(r.filter((e) => !e.illustrative)).points,
			color: "#f1f0eb",
			width: 2.4,
			dashed: !1
		}];
		if (K(n).length === 1 && K(n)[0] === "peq") return ao(lo(t.settings, e), e).flatMap((e, t) => !e.bypass && (e.type === 6 || e.type === 9) ? [{
			id: `band-${t}`,
			label: `Band ${t + 1}`,
			color: ji(t),
			points: $a(e.type === 9 ? [] : [so(e)], 0),
			width: 1.8,
			fillOpacity: .2
		}] : []);
		let o = [], s = Array(201).fill(0);
		for (let e of i) !e.points || e.illustrative || (s = s.map((t, n) => t + e.points[n]), o.push({
			id: e.id,
			label: i.length === 1 ? e.label : `Through ${e.label}`,
			points: [...s],
			color: e.color
		}));
		return i.filter((e) => e.points && !e.illustrative).length > 1 && o.push({
			id: "sum",
			label: a.omitted.length ? "Known layers combined" : "Combined preview",
			points: a.points,
			color: "#f1f0eb",
			width: 2.4,
			dashed: !1
		}), o;
	}
	let v = /* @__PURE__ */ L(() => K(r) ? [0, 1].flatMap((e) => _(e).map((t) => ({
		...t,
		id: `${e}-${t.id}`,
		label: `${e === 0 ? "Left" : "Right"} · ${t.label}`,
		color: e === 0 ? t.color : `color-mix(in srgb, ${t.color} 45%, #69b9eb)`,
		dashed: e === 1
	}))) : _(t.channel).map((e) => ({
		...e,
		dashed: t.channel === 1
	}))), y = /* @__PURE__ */ L(() => {
		if (K(i) === "default") return [-20, 20];
		if (K(i) === "custom") return K(a);
		if (K(i) !== "auto") {
			let e = Number(K(i));
			return [-e, e];
		}
		let e = K(v).flatMap((e) => e.points).filter(Number.isFinite), t = Math.min(0, ...e), n = Math.max(0, ...e), r = Math.max(1, (n - t) * .15);
		return [Math.floor((t - r) / 2) * 2, Math.ceil((n + r) / 2) * 2];
	});
	function b(e) {
		return e.points?.map((t, n) => `${n === 0 ? "M" : "L"}${4 + n / 2 * .92},${24 - Math.max(-24, Math.min(24, t)) * (e.id === "fir" ? 2.2 : .75)}`).join(" ") ?? "";
	}
	fr("click", Gt, u), wi(e, {
		stackActions: !0,
		code: "DSP.01",
		title: "Processing Response",
		titleControl: (e) => {
			var n = ho(), i = B(n), a = B(i, !0);
			M(i);
			var o = H(i), s = B(o, !0);
			M(o), M(n), U(() => {
				$(i, "aria-label", `Preview Channel: ${K(r) ? "Both Channels" : t.channel === 0 ? "Left Channel" : "Right Channel"}`), X(a, K(r) ? "Both Channels" : t.channel === 0 ? "Left Channel" : "Right Channel"), $(o, "aria-label", `Profile mode: ${t.settings.settingType === 1 ? "Stereo" : "Mono"}`), o.disabled = t.busy, X(s, t.settings.settingType === 1 ? "Stereo" : "Mono");
			}), q("click", i, () => {
				K(r) ? (z(r, !1), t.onChannelChange(0)) : t.channel === 0 ? t.onChannelChange(1) : z(r, !0);
			}), q("click", o, () => t.onModeChange(t.settings.settingType === 1 ? 0 : 1)), Y(e, n);
		},
		right: (e) => {
			var n = Cr();
			Vr(V(n), () => t.actions), Y(e, n);
		},
		children: (e, a) => {
			var c = ko(), u = V(c);
			let d;
			Q(u, 21, () => K(g), (e) => e.id, (e, i) => {
				var a = Cr(), o = V(a), s = (e) => {
					var a = yo();
					let o, s;
					var c = B(a), u = H(B(c), 1, !0);
					M(c);
					var d = H(c, 2), f = (e) => {
						var n = go(), r = V(n);
						ai(r);
						var i = H(r, 2), a = B(i);
						M(i), U(() => {
							oi(r, t.settings.balance ?? 0), X(a, `${t.settings.balance ?? 0 ?? ""} dB`);
						}), Y(e, n);
					}, p = (e) => {
						var n = vo(), a = V(n);
						Q(a, 21, () => t.settings.settingType === 1 ? K(r) ? [0, 1] : [t.channel] : [0], Mr, (e, n) => {
							var r = _o();
							ai(r);
							let a;
							U((e) => {
								$(r, "aria-label", `${K(n) === 0 ? "Left" : "Right"} Preview Preamp`), $(r, "min", -30), $(r, "max", 12), $(r, "step", Li), oi(r, e), a = Xr(r, "", a, { "--thumb-color": K(n) === 0 ? K(i).color : "#fff0be" });
							}, [() => oo(lo(t.settings, K(n)), K(n))]), Y(e, r);
						}), M(a);
						var o = H(a, 2), s = B(o, !0);
						M(o), U((e) => X(s, e), [() => K(r) && t.settings.settingType === 1 ? `L ${oo(lo(t.settings, 0), 0).toFixed(1)} · R ${oo(lo(t.settings, 1), 1).toFixed(1)} dB` : `${oo(lo(t.settings, t.channel), t.channel).toFixed(1)} dB`]), Y(e, n);
					};
					Z(d, (e) => {
						K(i).id === "balance" ? e(f) : e(p, -1);
					}), M(a), U((e, t) => {
						o = Jr(a, 1, "stage slider-stage svelte-1k65run", null, o, e), $(a, "data-response-stage", K(i).id), $(a, "data-stage", K(i).id), $(a, "aria-label", `${K(i).label} curve`), $(a, "aria-pressed", t), s = Xr(a, "", s, { "--stage-color": K(i).color }), X(u, K(i).label);
					}, [() => ({ selected: K(n).includes(K(i).id) }), () => K(n).includes(K(i).id)]), q("click", a, () => l(K(i).id)), q("keydown", a, (e) => {
						(e.key === "Enter" || e.key === " ") && (e.preventDefault(), l(K(i).id));
					}), Y(e, a);
				}, c = (e) => {
					var t = bo();
					let n;
					Ba(H(B(t), 2), { compact: !0 }), M(t), U(() => {
						$(t, "data-stage", K(i).id), n = Xr(t, "", n, { "--stage-color": K(i).color });
					}), Y(e, t);
				}, u = (e) => {
					var a = To();
					let o, s;
					var c = B(a), u = H(B(c), 1, !0);
					M(c);
					var d = H(c, 2), m = (e) => {
						var n = Co(), a = H(B(n)), o = (e) => {
							var t = Cr();
							Q(V(t), 17, () => [K(f).find((e) => e.id === K(i).id), K(p).find((e) => e.id === K(i).id)], Mr, (e, t, n) => {
								var r = Cr(), a = V(r), o = (e) => {
									var r = xo();
									$(r, "stroke-dasharray", n === 1 ? "5 4" : void 0);
									let a;
									U((e) => {
										$(r, "d", e), a = Xr(r, "", a, { stroke: n === 0 ? K(i).color : `color-mix(in srgb, ${K(i).color} 45%, #69b9eb)` });
									}, [() => b(K(t))]), Y(e, r);
								};
								Z(a, (e) => {
									K(t)?.points && e(o);
								}), Y(e, r);
							}), Y(e, t);
						}, s = (e) => {
							var n = So();
							U((e) => {
								$(n, "d", e), $(n, "stroke-dasharray", t.channel === 1 ? "5 4" : void 0);
							}, [() => b(K(i))]), Y(e, n);
						};
						Z(a, (e) => {
							K(r) ? e(o) : e(s, -1);
						}), M(n), U(() => $(n, "aria-label", `${K(i).label} contribution`)), Y(e, n);
					}, h = /* @__PURE__ */ L(() => K(i).points || K(r) && K(p).find((e) => e.id === K(i).id)?.points), g = (e) => {
						Y(e, wo());
					};
					Z(d, (e) => {
						K(h) ? e(m) : e(g, -1);
					}), M(a), U((e, t) => {
						o = Jr(a, 1, "stage svelte-1k65run", null, o, e), $(a, "data-response-stage", K(i).id), $(a, "data-stage", K(i).id), $(a, "aria-label", `${K(i).label} curve`), $(a, "aria-pressed", t), s = Xr(a, "", s, { "--stage-color": K(i).color }), X(u, K(i).label);
					}, [() => ({ selected: K(n).includes(K(i).id) }), () => K(n).includes(K(i).id)]), q("click", a, () => l(K(i).id)), Y(e, a);
				};
				Z(o, (e) => {
					K(i).id === "preamp" || K(i).id === "balance" ? e(s) : K(i).illustrative ? e(c, 1) : e(u, -1);
				}), Y(e, a);
			}, (e) => {
				Y(e, Eo());
			}), M(u);
			var m = H(u, 2), h = B(m), _ = H(B(h)), x = B(_);
			x.value = x.__value = "auto";
			var S = H(x);
			S.value = S.__value = "6";
			var C = H(S);
			C.value = C.__value = "12";
			var w = H(C);
			w.value = w.__value = "24";
			var T = H(w);
			T.value = T.__value = "default";
			var ee = H(T), te = (e) => {
				var t = Do();
				t.value = t.__value = "custom", Y(e, t);
			};
			Z(ee, (e) => {
				K(i) === "custom" && e(te);
			});
			var ne = H(ee);
			ne.value = ne.__value = "48", M(_), M(h);
			var re = H(h);
			M(m);
			var ie = H(m, 2), ae = B(ie);
			Fa(ae, {
				get curves() {
					return K(v);
				},
				height: 280,
				get yRange() {
					return K(y);
				},
				onRangeChange: o
			});
			var oe = H(ae, 2), E = (e) => {
				Y(e, Oo());
			};
			Z(oe, (e) => {
				K(v).length && e(E);
			}), M(ie), U((e) => d = Xr(u, "", d, e), [() => ({ "--stage-count": Math.max(1, K(g).length) })]), $r(_, () => K(i), (e) => z(i, e)), q("click", re, s), Y(e, c);
		},
		$$slots: {
			titleControl: !0,
			right: !0,
			default: !0
		}
	}), Le();
}
pr(["click", "keydown"]);
//#endregion
//#region src/Editor.svelte
var Mo = /* @__PURE__ */ J("<option disabled=\"\">Select A Profile</option>"), No = /* @__PURE__ */ J("<option> </option>"), Po = /* @__PURE__ */ J("<div class=\"notice error svelte-1jdjhi\" role=\"alert\"> </div>"), Fo = /* @__PURE__ */ J("<div class=\"notice warning svelte-1jdjhi\" role=\"alert\">This profile changed on the device. Discard And Reload before saving.</div>"), Io = /* @__PURE__ */ J("<div class=\"savebar svelte-1jdjhi\"><span> </span><div class=\"actions svelte-1jdjhi\"><button class=\"chip md svelte-1jdjhi\">↻ Reload</button> <button class=\"chip md svelte-1jdjhi\">Discard</button> <button class=\"chip md accent svelte-1jdjhi\">Save Profile</button></div></div>"), Lo = /* @__PURE__ */ J("<p class=\"hint\"> </p>"), Ro = /* @__PURE__ */ J("<button> </button>"), zo = /* @__PURE__ */ J("<option></option>"), Bo = /* @__PURE__ */ J("<select class=\"band-picker svelte-1jdjhi\" aria-label=\"Band to tune\"></select>"), Vo = /* @__PURE__ */ J("<div class=\"sliders svelte-1jdjhi\"><label class=\"svelte-1jdjhi\">Frequency <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band frequency slider\" type=\"range\" min=\"0\" max=\"1000\" step=\"1\" class=\"svelte-1jdjhi\"/></label> <label class=\"svelte-1jdjhi\">Gain <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band gain slider\" type=\"range\" min=\"-15\" max=\"15\" step=\"0.1\" class=\"svelte-1jdjhi\"/></label> <label class=\"svelte-1jdjhi\">Q <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band Q slider\" type=\"range\" min=\"0.1\" max=\"100\" step=\"0.01\" class=\"svelte-1jdjhi\"/></label></div>"), Ho = /* @__PURE__ */ J("<label class=\"toggle-label svelte-1jdjhi\"><input class=\"switch\" type=\"checkbox\" role=\"switch\" aria-label=\"Enable graphic EQ\"/></label>"), Uo = /* @__PURE__ */ J("<!> <button class=\"chip hi\" aria-label=\"Reset graphic EQ\">Reset</button>", 1), Wo = /* @__PURE__ */ J("<div class=\"geq-band svelte-1jdjhi\"><input class=\"geq-gain svelte-1jdjhi\" type=\"number\" min=\"-15\" max=\"15\" step=\"0.1\"/> <input class=\"geq-slider svelte-1jdjhi\" aria-orientation=\"vertical\" type=\"range\" min=\"-15\" max=\"15\" step=\"0.1\"/> <span> </span></div>"), Go = /* @__PURE__ */ J("<div class=\"geq-bands svelte-1jdjhi\"></div>"), Ko = /* @__PURE__ */ J("<label class=\"toggle-label svelte-1jdjhi\"><input aria-label=\"Loudness enabled\" class=\"switch\" role=\"switch\" type=\"checkbox\"/></label>"), qo = /* @__PURE__ */ J("<div class=\"loudness-reference svelte-1jdjhi\"><!></div>"), Jo = /* @__PURE__ */ J("<label class=\"toggle-label svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\" aria-label=\"Enable FIR\"/></label>"), Yo = /* @__PURE__ */ J("<span class=\"import-name svelte-1jdjhi\"> </span>"), Xo = /* @__PURE__ */ J("<div class=\"output svelte-1jdjhi\"><span class=\"svelte-1jdjhi\"> </span> <button class=\"chip\">Select On Device File</button> <!> <label class=\"svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/> Enable</label> <div class=\"fir-stats svelte-1jdjhi\"><span> </span></div></div>"), Zo = /* @__PURE__ */ J("<div class=\"outputs fir-assignments svelte-1jdjhi\"></div>"), Qo = /* @__PURE__ */ J("<option> </option>"), $o = /* @__PURE__ */ J("<option> </option>"), es = /* @__PURE__ */ J("<div class=\"output svelte-1jdjhi\"><span class=\"svelte-1jdjhi\"> </span> <select class=\"svelte-1jdjhi\"><!><!></select> <label class=\"svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/> Enable</label></div>"), ts = /* @__PURE__ */ J("<div class=\"outputs svelte-1jdjhi\"></div>"), ns = /* @__PURE__ */ J("<!> <!> <nav class=\"sections svelte-1jdjhi\" aria-label=\"Processing controls\"></nav> <fieldset class=\"edit-grid svelte-1jdjhi\"><div><!> <!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div></fieldset>", 1), rs = /* @__PURE__ */ J("<div class=\"empty svelte-1jdjhi\">Select or create a profile to start shaping your sound.</div>"), is = /* @__PURE__ */ J("<option> </option>"), as = /* @__PURE__ */ xr("<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path d=\"m8 5 9 7-9 7Z\" fill=\"currentColor\"></path></svg>"), os = /* @__PURE__ */ J("<tr><td class=\"svelte-1jdjhi\"><button class=\"file-entry svelte-1jdjhi\"><span class=\"file-icon svelte-1jdjhi\" aria-hidden=\"true\"><!></span> </button></td><td class=\"svelte-1jdjhi\"> </td><td class=\"file-size svelte-1jdjhi\"> </td></tr>"), ss = /* @__PURE__ */ J("<tr class=\"svelte-1jdjhi\"><td colspan=\"3\" class=\"file-empty svelte-1jdjhi\"> </td></tr>"), cs = /* @__PURE__ */ J("<div class=\"file-pagination svelte-1jdjhi\"><button class=\"chip\">Previous</button><span> </span><button class=\"chip\">Next</button></div>"), ls = /* @__PURE__ */ J("<p role=\"alert\" class=\"svelte-1jdjhi\"> </p>"), us = /* @__PURE__ */ J("<p class=\"svelte-1jdjhi\"> </p>"), ds = /* @__PURE__ */ J("<label class=\"svelte-1jdjhi\">Profile Name<input aria-label=\"Profile Name\" type=\"text\" required=\"\" maxlength=\"100\" class=\"svelte-1jdjhi\"/></label>"), fs = /* @__PURE__ */ J("<div class=\"shell svelte-1jdjhi\"><header class=\"topbar svelte-1jdjhi\"><div><h1 class=\"svelte-1jdjhi\"> </h1></div></header> <div><label class=\"profile-select svelte-1jdjhi\"><span>Profile</span> <select aria-label=\"Profile\" class=\"svelte-1jdjhi\"><!><!></select></label> <div class=\"actions profile-actions svelte-1jdjhi\"><button class=\"chip md svelte-1jdjhi\">＋ New</button> <button class=\"chip md svelte-1jdjhi\">Save As</button> <button class=\"chip md svelte-1jdjhi\">Rename</button> <button class=\"chip md danger svelte-1jdjhi\">Delete</button></div></div> <!> <!> <!></div> <dialog class=\"file-picker svelte-1jdjhi\" aria-label=\"Internal FIR File Browser\"><div class=\"file-heading svelte-1jdjhi\"><h2 class=\"svelte-1jdjhi\">Import FIR Filter</h2><span class=\"svelte-1jdjhi\"> </span></div> <div class=\"file-location svelte-1jdjhi\"><button class=\"chip hi directory-action svelte-1jdjhi\" aria-label=\"Parent Folder\">↑</button> <div class=\"file-path svelte-1jdjhi\"><input type=\"text\" aria-label=\"Directory Path\" class=\"svelte-1jdjhi\"/> <button class=\"chip hi directory-action svelte-1jdjhi\" aria-label=\"Open Directory\" type=\"button\"><svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" aria-hidden=\"true\"><path d=\"M19 5v10H5m5-5-5 5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></button></div></div> <div class=\"file-tools svelte-1jdjhi\"><input type=\"text\" aria-label=\"Search\" placeholder=\"Search\" class=\"svelte-1jdjhi\"/> <label class=\"svelte-1jdjhi\">Sort<select aria-label=\"File Sort\" class=\"svelte-1jdjhi\"></select></label></div> <div class=\"file-list svelte-1jdjhi\" aria-label=\"Folder Contents\"><table class=\"svelte-1jdjhi\"><thead><tr class=\"svelte-1jdjhi\"><th class=\"svelte-1jdjhi\">Name</th><th class=\"svelte-1jdjhi\">Type</th><th class=\"file-size svelte-1jdjhi\">Size</th></tr></thead><tbody></tbody></table></div> <!> <label class=\"file-selection svelte-1jdjhi\">File Name<input type=\"text\" aria-label=\"Selected File Name\" readonly=\"\" placeholder=\"Select A WAV File\" class=\"svelte-1jdjhi\"/></label> <!> <div class=\"file-footer svelte-1jdjhi\"><span class=\"svelte-1jdjhi\">WAV Files (*.wav)</span><div class=\"svelte-1jdjhi\"><button class=\"chip hi\">Cancel</button><button class=\"chip accent\">Import</button></div></div></dialog> <dialog aria-label=\"Unsaved Changes\" class=\"svelte-1jdjhi\"><h2 class=\"svelte-1jdjhi\">Unsaved Changes</h2> <p class=\"svelte-1jdjhi\">Discard changes that have not been saved to the device?</p> <div class=\"actions svelte-1jdjhi\"><button class=\"chip md\">Keep Editing</button><button class=\"chip md danger\"> </button></div></dialog> <dialog class=\"svelte-1jdjhi\"><form><h2 class=\"svelte-1jdjhi\"> </h2> <!> <div class=\"actions svelte-1jdjhi\"><button type=\"button\" class=\"chip md\">Cancel</button><button type=\"submit\"> </button></div></form></dialog>", 1), ps = {
	hash: "svelte-1jdjhi",
	code: "dialog.file-picker.svelte-1jdjhi {width:720px;max-height:88vh;padding:20px;}.file-heading.svelte-1jdjhi {display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:18px;}.file-heading.svelte-1jdjhi h2:where(.svelte-1jdjhi) {margin:0;font-size:21px;}.file-heading.svelte-1jdjhi > span:where(.svelte-1jdjhi), .file-footer.svelte-1jdjhi > span:where(.svelte-1jdjhi) {font-size:13px;color:var(--text-dim);}.file-location.svelte-1jdjhi {display:grid;grid-template-columns:auto minmax(0,1fr);align-items:stretch;gap:10px;margin-bottom:12px;}.file-tools.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:5px;font-size:13px;}.file-tools.svelte-1jdjhi select:where(.svelte-1jdjhi) {width:100%;font-size:14px;}.directory-action.svelte-1jdjhi {width:40px;min-width:40px;padding:0;font-size:22px;flex-shrink:0;display:grid;place-items:center;line-height:1;}.file-path.svelte-1jdjhi {display:flex;gap:8px;min-width:0;}.file-path.svelte-1jdjhi input:where(.svelte-1jdjhi) {min-width:0;width:100%;font-size:14px;}.file-location.svelte-1jdjhi .chip:where(.svelte-1jdjhi), .file-path.svelte-1jdjhi input:where(.svelte-1jdjhi) {height:44px;box-sizing:border-box;}.file-tools.svelte-1jdjhi {display:flex;align-items:end;gap:12px;margin-bottom:12px;}.file-tools.svelte-1jdjhi > input:where(.svelte-1jdjhi) {flex:1;min-width:0;font-size:14px;}.file-tools.svelte-1jdjhi label:where(.svelte-1jdjhi) {grid-template-columns:auto auto;align-items:center;gap:8px;}.file-list.svelte-1jdjhi {height:260px;overflow:auto;border:1px solid var(--border-hi);border-radius:7px;background:var(--panel);}.file-list.svelte-1jdjhi table:where(.svelte-1jdjhi) {width:100%;border-collapse:collapse;font-size:14px;}.file-list.svelte-1jdjhi th:where(.svelte-1jdjhi) {position:sticky;top:0;background:var(--panel-solid);color:var(--text-dim);text-align:left;font-size:12px;font-weight:500;padding:9px 12px;border-bottom:1px solid var(--border-hi);}.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi) {padding:0 12px;height:40px;border-bottom:1px solid var(--border);white-space:nowrap;}.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi):first-child {width:100%;white-space:normal;}.file-list.svelte-1jdjhi tr.selected:where(.svelte-1jdjhi) {background:color-mix(in srgb, var(--accent) 22%, var(--panel));}.file-list.svelte-1jdjhi tr:where(.svelte-1jdjhi):hover {background:var(--wash-strong);}.file-entry.svelte-1jdjhi {display:flex;align-items:center;gap:10px;text-align:left;width:100%;min-height:40px;padding:6px 0;background:transparent;border:0;font:inherit;color:var(--text);cursor:pointer;overflow-wrap:anywhere;}.file-entry.svelte-1jdjhi:disabled {opacity:.45;cursor:default;}.file-icon.svelte-1jdjhi {color:var(--text-dim);width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;flex-shrink:0;}.file-size.svelte-1jdjhi {text-align:right !important;}.file-empty.svelte-1jdjhi {text-align:center;color:var(--text-dim);padding:30px !important;}.file-selection.svelte-1jdjhi {display:grid;grid-template-columns:78px minmax(0,1fr);align-items:center;gap:10px !important;margin-top:14px;font-size:14px;}.file-selection.svelte-1jdjhi input:where(.svelte-1jdjhi) {font-size:14px;}.file-footer.svelte-1jdjhi {display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;}.file-footer.svelte-1jdjhi > div:where(.svelte-1jdjhi), .file-pagination.svelte-1jdjhi {display:flex;align-items:center;gap:8px;}.file-pagination.svelte-1jdjhi {justify-content:center;margin-top:10px;font-size:13px;}\n  @media (max-width: 480px) {dialog.file-picker.svelte-1jdjhi {padding:14px;}.file-location.svelte-1jdjhi {grid-template-columns:auto minmax(0,1fr);}.file-tools.svelte-1jdjhi {align-items:stretch;flex-direction:column;}.file-list.svelte-1jdjhi th:where(.svelte-1jdjhi):nth-child(2),.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi):nth-child(2) {display:none;}.file-heading.svelte-1jdjhi {align-items:start;}.file-list.svelte-1jdjhi {height:220px;} }.geq-bands.svelte-1jdjhi {display:flex;gap:8px;padding:20px 14px;overflow-x:auto;}.geq-band.svelte-1jdjhi {display:flex;flex:1 0 44px;flex-direction:column;align-items:center;gap:12px;font-size:13px;}.geq-gain.svelte-1jdjhi {width:52px;padding:4px 0;text-align:center;color:var(--text);background:transparent;border:1px solid transparent;border-radius:5px;font:inherit;font-variant-numeric:tabular-nums;appearance:textfield;}.geq-gain.svelte-1jdjhi::-webkit-inner-spin-button, .geq-gain.svelte-1jdjhi::-webkit-outer-spin-button {appearance:none;margin:0;}.geq-gain.svelte-1jdjhi:hover {border-color:var(--border-hi);}.geq-gain.svelte-1jdjhi:focus {outline:1px solid var(--accent);background:var(--wash);}.geq-slider.svelte-1jdjhi {appearance:none;writing-mode:vertical-lr;direction:rtl;width:32px;height:210px;margin:0;cursor:ns-resize;background:transparent;}.geq-slider.svelte-1jdjhi::-webkit-slider-runnable-track {width:6px;height:100%;border-radius:4px;background:#4a4a46;}.geq-slider.svelte-1jdjhi::-webkit-slider-thumb {appearance:none;width:30px;height:10px;margin-left:-12px;border:1px solid #a5a59f;border-radius:3px;background:#eeeeea;box-shadow:0 2px 3px #0005;}.geq-slider.svelte-1jdjhi::-moz-range-track {width:6px;height:100%;border-radius:4px;background:#4a4a46;}.geq-slider.svelte-1jdjhi::-moz-range-thumb {width:30px;height:10px;border:1px solid #a5a59f;border-radius:3px;background:#eeeeea;}.geq-slider.svelte-1jdjhi:focus-visible {outline:1px solid var(--accent);outline-offset:3px;border-radius:4px;}.import-name.svelte-1jdjhi {grid-column:2 / -1;overflow-wrap:anywhere;}* {box-sizing:border-box;}.shell.svelte-1jdjhi {padding:12px 16px;max-width:1500px;margin:auto;min-height:100%;}.topbar.svelte-1jdjhi {display:flex;align-items:center;gap:18px;margin-bottom:10px;}.brand.svelte-1jdjhi {flex:1;display:flex;justify-content:flex-start;text-align:left;align-items:baseline;gap:16px;}.brand.centered.svelte-1jdjhi {justify-content:center;text-align:center;}h1.svelte-1jdjhi {margin:0;font-size:23px;font-weight:600;letter-spacing:0;}.toolbar.svelte-1jdjhi, .savebar.svelte-1jdjhi {display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}.toolbar.svelte-1jdjhi {margin-bottom:12px;}.profile-actions.svelte-1jdjhi {flex-wrap:wrap;justify-content:flex-end;margin-left:auto;}.toolbar.wrapped.svelte-1jdjhi {justify-content:center;}.toolbar.wrapped.svelte-1jdjhi .profile-actions:where(.svelte-1jdjhi) {justify-content:center;margin-inline:auto;}.profile-select.svelte-1jdjhi {display:grid;grid-template-columns:60px auto;align-items:center;gap:12px;}label.svelte-1jdjhi, .savebar.svelte-1jdjhi {font:16px var(--font-sans);letter-spacing:0;color:var(--text-dim);}select.svelte-1jdjhi, input[type=text].svelte-1jdjhi {background:var(--panel-solid);color:var(--text);border:1px solid var(--border-hi);border-radius:9px;min-height:36px;padding:6px 10px;font:17px var(--font-sans);max-width:100%;}.actions.svelte-1jdjhi {display:flex;flex-wrap:wrap;gap:8px;}.edit-grid.svelte-1jdjhi {border:0;padding:0;margin:8px 0 8px;min-width:0;display:grid;grid-template-columns:minmax(0, 1fr);align-items:start;}.loudness-reference.svelte-1jdjhi {padding:16px;max-width:680px;margin:auto;width:100%;}.sections.svelte-1jdjhi {display:flex;justify-content:center;flex-wrap:wrap;gap:6px;margin-top:12px;}.tab-pane.svelte-1jdjhi {grid-area:1 / 1;min-width:0;}.tab-pane.inactive.svelte-1jdjhi {visibility:hidden;pointer-events:none;}.bands-wrap.svelte-1jdjhi {min-width:0;display:flex;flex-direction:column;gap:18px;}.bands-wrap.svelte-1jdjhi .panel {min-width:0;}input[type=range].svelte-1jdjhi {width:100%;}.band-picker.svelte-1jdjhi {min-height:32px;padding:2px 24px 2px 8px;}.sliders.svelte-1jdjhi {padding:8px 14px;display:grid;gap:2px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:12px;grid-template-columns:80px 80px minmax(0, 1fr);align-items:center;min-height:34px;font-size:14px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) span:where(.svelte-1jdjhi) {text-align:right;color:var(--text);font-variant-numeric:tabular-nums;}.sliders.svelte-1jdjhi input:where(.svelte-1jdjhi) {min-width:0;margin:0;height:28px;}\n  @media (max-width: 480px) {.sliders.svelte-1jdjhi {padding:6px 10px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) {grid-template-columns:64px 64px minmax(0, 1fr);gap:8px;} }.savebar.svelte-1jdjhi {margin:0;padding:0;border:0;font-size:13px;gap:8px;}.savebar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {justify-content:flex-end;}\n  @media (max-width: 900px) {.savebar.svelte-1jdjhi {flex-direction:column;align-items:stretch;width:max-content;max-width:100%;gap:5px;}.savebar.svelte-1jdjhi > span:where(.svelte-1jdjhi) {text-align:center;width:100%;}.savebar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {width:100%;justify-content:center;}\n  }.savebar.svelte-1jdjhi .chip:where(.svelte-1jdjhi) {min-height:34px;padding:6px 10px;font-size:13px;}.unsaved.svelte-1jdjhi {color:var(--warn);}.outputs.svelte-1jdjhi {display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);}.output.svelte-1jdjhi {padding:4px 14px;background:var(--panel-solid);display:grid;grid-template-columns:140px minmax(0, 1fr) auto;gap:12px;align-items:center;}.output.svelte-1jdjhi > span:where(.svelte-1jdjhi) {font-size:16px;}.output.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:flex;align-items:center;gap:6px;}.notice.svelte-1jdjhi {padding:14px;border-radius:5px;margin:10px 0;font-size:14px;background:var(--wash);}.error.svelte-1jdjhi {color:var(--err);border:1px solid var(--err);}.warning.svelte-1jdjhi {color:var(--warn);}.fir-stats.svelte-1jdjhi {grid-column:3;grid-row:1;display:flex;flex-wrap:wrap;gap:8px 24px;margin:0;font-size:13px;color:var(--text-dim);}.fir-assignments.svelte-1jdjhi {grid-template-columns:1fr;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) {grid-template-columns:70px minmax(0, 1fr) auto auto;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > label:where(.svelte-1jdjhi) {grid-column:4;grid-row:1;}.empty.svelte-1jdjhi {padding:50px 0;color:var(--text-dim);}dialog.svelte-1jdjhi {color:var(--text);background:var(--panel-solid);border:1px solid var(--border-hi);border-radius:10px;width:440px;max-width:92vw;padding:25px;}dialog.svelte-1jdjhi::backdrop {background:#000a;backdrop-filter:blur(6px);}dialog.svelte-1jdjhi h2:where(.svelte-1jdjhi) {margin-top:0;font-weight:500;}dialog.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:12px;}dialog.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {margin-top:24px;justify-content:flex-end;}dialog.svelte-1jdjhi p:where(.svelte-1jdjhi) {line-height:1.6;}\n  @media (max-width: 1100px) {.edit-grid.svelte-1jdjhi {grid-template-columns:1fr;}.outputs.svelte-1jdjhi {grid-template-columns:1fr;}.shell.svelte-1jdjhi {padding:16px;} }\n  @media (max-width: 600px) {.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) {grid-template-columns:42px minmax(0, 1fr) auto;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > span:where(.svelte-1jdjhi) {grid-column:1;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > label:where(.svelte-1jdjhi) {grid-column:3;}.fir-stats.svelte-1jdjhi {grid-column:2;grid-row:2;}.output.svelte-1jdjhi {grid-template-columns:minmax(0, 1fr) auto;gap:4px 10px;}.output.svelte-1jdjhi > span:where(.svelte-1jdjhi) {grid-column:1 / -1;}.topbar.svelte-1jdjhi {margin-bottom:10px;}.brand.svelte-1jdjhi {min-width:0;flex-wrap:wrap;gap:0 12px;}.brand.svelte-1jdjhi h1:where(.svelte-1jdjhi) {font-size:26px;line-height:1.25;margin-top:6px;}.toolbar.svelte-1jdjhi .profile-select:where(.svelte-1jdjhi) {gap:12px;width:auto;}.profile-select.svelte-1jdjhi select:where(.svelte-1jdjhi) {max-width:100%;}.toolbar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {display:flex;justify-content:flex-end;width:100%;gap:8px;}.toolbar.svelte-1jdjhi .chip:where(.svelte-1jdjhi) {padding:10px 6px;font-size:14px;}\n  }"
};
function ms(e, t) {
	Ie(t, !0), Hr(e, ps);
	let n = /* @__PURE__ */ R(Ht({
		profiles: [],
		outputs: []
	})), r = /* @__PURE__ */ R(null), i = /* @__PURE__ */ R(Ht({})), a = /* @__PURE__ */ R(0), o = /* @__PURE__ */ R(0), s = /* @__PURE__ */ R(0), c = /* @__PURE__ */ R(0), l = /* @__PURE__ */ L(() => K(i).settingType === 1), u = /* @__PURE__ */ R(!1), d = /* @__PURE__ */ L(() => K(l) ? K(u) ? K(s) : K(o) : 0), f = /* @__PURE__ */ L(() => !K(l) || K(c) === 0 ? "eqGeqGainBeans" : "eqGeqGainBeansRight"), p = /* @__PURE__ */ L(() => !K(l) || K(c) === 0 ? "enableGeq" : "enableGeqRight"), h = /* @__PURE__ */ L(() => K(u) ? K(d) === 0 ? "peqFirList" : "peqFirListRight" : eo(K(d))), g = /* @__PURE__ */ L(() => K(u) ? K(d) === 0 ? "enablePeqLeftFir" : "enablePeqRightFir" : to(K(d))), _ = /* @__PURE__ */ R(Ht([])), v = /* @__PURE__ */ R(Ht([])), y = /* @__PURE__ */ R("/"), b = /* @__PURE__ */ R(0), x = /* @__PURE__ */ R(0), S = /* @__PURE__ */ R(0), C = /* @__PURE__ */ R(""), w = /* @__PURE__ */ R(""), T = /* @__PURE__ */ L(() => K(_).find((e) => e.url === K(C) && e.fileType !== 0 && e.name.toLowerCase().endsWith(".wav"))), ee = /* @__PURE__ */ L(() => K(_).filter((e) => e.name.toLowerCase().includes(K(w).toLowerCase()))), te = /* @__PURE__ */ R("/");
	async function ne() {
		let e = K(te).trim(), t = e === "/" ? "/" : e === "flash://" || e.startsWith("flash:///") ? e : "flash:///" + e.replace(/^\/+/, "");
		await ce(t);
		let n = t.startsWith("flash:///") ? t.slice(9).split("/").filter(Boolean) : [];
		z(v, t === "/" ? [] : [
			"/",
			...t === "flash://" ? [] : ["flash://"],
			...n.slice(0, -1).map((e, t) => "flash:///" + n.slice(0, t + 1).join("/"))
		], !0);
	}
	function re(e) {
		if (e.target !== K(D) || !K(D)) return;
		let t = K(D).getBoundingClientRect();
		(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && K(D).close();
	}
	async function ie(e) {
		let t = K(y);
		await ce(e), z(v, [...K(v), t], !0);
	}
	async function ae(e) {
		let t = K(v)[e];
		t && (await ce(t), z(v, K(v).slice(0, e), !0));
	}
	function oe(e) {
		return e === void 0 ? "—" : e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(0)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
	}
	let E = /* @__PURE__ */ R(0), D = /* @__PURE__ */ R(void 0), se = Ht({});
	async function ce(e = "/", t = 0) {
		let n = await P("files", {
			url: e,
			sort: K(b),
			start: t
		});
		z(_, n.list.filter((e) => e.url === "flash://" || e.url.startsWith("flash:///")), !0), z(y, e, !0), z(te, e, !0), z(x, t, !0), z(S, n.total, !0), z(C, ""), z(w, "");
	}
	async function le(e) {
		if (K(Be)) {
			z(A, "Save or discard profile edits before importing FIR.");
			return;
		}
		z(E, e, !0), z(v, [], !0), await We(async () => {
			await ce(), K(D)?.showModal();
		});
	}
	async function ue(e) {
		if (!K(r)) return;
		let t = K(r).id, n = await P("import_fir", {
			profile_id: t,
			revision: K(r).revision,
			channel: K(E),
			path: e.url
		});
		se[`${t}:${K(E)}`] = e.name, Ke(n), await qe(), K(D)?.close(), z(we, "FIR Imported");
	}
	let de = /* @__PURE__ */ R("peq"), fe = /* @__PURE__ */ R(Ht({
		stage: null,
		serial: 0
	}));
	function pe(e) {
		(e === "peq" || e === "correction") && (Te[K(h)] = K(j), z(u, e === "correction"), z(j, Te[K(u) ? !K(l) || K(s) === 0 ? "peqFirList" : "peqFirListRight" : eo(K(l) ? K(o) : 0)] ?? 0, !0)), z(de, e, !0), z(fe, {
			stage: e === "peq" ? "peq" : e === "correction" ? "correction" : e === "fir" ? "fir" : e === "geq" ? "geq" : null,
			serial: K(fe).serial + 1
		}, !0);
	}
	let me = /* @__PURE__ */ R(""), he = /* @__PURE__ */ R(void 0), ge = /* @__PURE__ */ R(void 0), _e = /* @__PURE__ */ R(void 0), ve = /* @__PURE__ */ R(!1), ye = /* @__PURE__ */ R(void 0), O = null, be = /* @__PURE__ */ R("Discard And Reload");
	function xe(e, t = "Discard And Reload") {
		if (!K(k)) {
			if (!K(Be)) {
				e();
				return;
			}
			O = e, z(be, t, !0), K(ye)?.showModal();
		}
	}
	function Se() {
		O = null, K(ye)?.close();
	}
	function Ce() {
		let e = O;
		O = null, K(ye)?.close(), e?.();
	}
	let k = /* @__PURE__ */ R(!1), A = /* @__PURE__ */ R(""), we = /* @__PURE__ */ R("Loading Profile…"), j = /* @__PURE__ */ R(0), Te = Ht({}), Ee = /* @__PURE__ */ R(void 0), Oe = /* @__PURE__ */ R("create"), ke = /* @__PURE__ */ R(""), Ae = /* @__PURE__ */ R(!1), je = /* @__PURE__ */ R(null), Me = /* @__PURE__ */ R(""), Ne = /* @__PURE__ */ R(!1), Pe = /* @__PURE__ */ R(Ht({
		left: !1,
		right: !1
	}));
	function N(e) {
		K(k) || (e || z(Pe, {
			left: K(i).enableLeftFir ?? !1,
			right: K(i).enableRightFir ?? !1
		}, !0), z(Ne, e, !0), K(i).enableLeftFir !== void 0 && (K(i).enableLeftFir = e && K(Pe).left), K(i).enableRightFir !== void 0 && (K(i).enableRightFir = e && K(Pe).right));
	}
	function Fe(e, t) {
		K(k) || !K(Ne) || (K(Pe)[e] = t, K(i)[e === "left" ? "enableLeftFir" : "enableRightFir"] = t);
	}
	let Re = !0, ze = /* @__PURE__ */ L(() => K(je)?.profile_id === K(r)?.id && K(je)?.revision === K(r)?.revision ? K(je) : null), Be = /* @__PURE__ */ L(() => K(r) !== null && JSON.stringify(K(i)) !== JSON.stringify(K(r).settings)), Ve = /* @__PURE__ */ L(() => K(i)[K(h)] ?? []), He = /* @__PURE__ */ L(() => K(Ve).map(so)), Ue = /* @__PURE__ */ L(() => K(Ve)[K(j)]);
	function P(e, n = {}) {
		return t.hass.callWS({
			type: "eversolo/eq",
			entry_id: t.panel.config.entry_id,
			operation: e,
			payload: n
		});
	}
	async function We(e) {
		if (!K(k)) {
			z(k, !0), z(A, "");
			try {
				await e();
			} catch (e) {
				z(A, e instanceof Error ? e.message : String(e?.message ?? e), !0), z(we, "Request Needs Attention");
			} finally {
				z(k, !1);
			}
		}
	}
	async function F() {
		z(n, await P("snapshot"), !0);
		try {
			let e = (await t.hass.callWS({ type: "config/entity_registry/list" })).find((e) => e.config_entry_id === t.panel.config.entry_id && e.entity_id.startsWith("media_player."));
			e && z(me, (await t.hass.callWS({ type: "get_states" })).find((t) => t.entity_id === e.entity_id)?.attributes.friendly_name || e.name || e.original_name || e.entity_id, !0);
		} catch {}
	}
	function Ge() {
		xe(() => void We(Xe));
	}
	function Ke(e, t = !1) {
		t && K(r)?.id === e.id && !K(Ne) || (z(Pe, {
			left: e.settings.enableLeftFir ?? !1,
			right: e.settings.enableRightFir ?? !1
		}, !0), z(Ne, K(Pe).left || K(Pe).right, !0)), z(r, e, !0), z(i, io(e.settings), !0), z(Ae, !1), z(je, null), z(Me, ""), z(j, 0), ao(K(i), K(a)).length || z(a, 0), z(we, "Read From Device");
	}
	async function qe(e = K(r)) {
		if (!(!e || e.processing?.hasFir === !1)) try {
			let t = await P("curves", { profile_id: e.id });
			Re && K(r)?.id === e.id && (z(je, t, !0), z(Me, ""));
		} catch {
			K(r)?.id === e.id && (z(je, null), z(Me, "FIR curve request failed. PEQ editing remains available."));
		}
	}
	async function Je(e) {
		Ke(await P("read", { profile_id: e })), await qe();
	}
	function Ye(e) {
		let t = e.currentTarget, n = Number(t.value);
		t.value = String(K(r)?.id ?? ""), xe(() => void We(async () => {
			await Je(n);
		}), "Discard And Switch");
	}
	async function Xe() {
		await F();
		let e = K(n).profiles.some((e) => e.id === K(r)?.id) ? K(r).id : K(n).profiles[0]?.id;
		e === void 0 ? (z(r, null), z(i, {}, !0), z(we, "Create Your First Profile")) : await Je(e);
	}
	async function Ze() {
		K(k) || !Re || document.hidden || K(Ee)?.open || K(D)?.open || K(ye)?.open || await We(async () => {
			if (await F(), K(r)) {
				let e = await P("read", { profile_id: K(r).id });
				if (!Re) return;
				K(Be) ? z(Ae, e.revision !== K(r).revision) : e.revision !== K(r).revision && Ke(e), await qe(e);
			}
		});
	}
	yi(() => {
		We(Xe);
		let e = new ResizeObserver(() => {
			if (!K(ge) || !K(_e)) return;
			let e = K(ge).getBoundingClientRect();
			z(ve, K(_e).getBoundingClientRect().top >= e.bottom - 1);
		});
		for (let t of [
			K(he),
			K(ge),
			K(_e)
		]) t && e.observe(t);
		let t = setInterval(() => void Ze(), 15e3), n = (e) => {
			K(Be) && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", n), () => {
			Re = !1, e.disconnect(), clearInterval(t), window.removeEventListener("beforeunload", n);
		};
	});
	function I(e, t) {
		K(k) || (K(i)[K(h)] = K(Ve).map((n, r) => r === e ? co(n, t) : n), z(j, e, !0));
	}
	function Qe(e, t) {
		if (K(k) || !Number.isFinite(t)) return;
		let n = Math.round(Math.max(-15, Math.min(15, t)) * 10) / 10;
		K(i)[K(f)] = K(i)[K(f)]?.map((t, r) => r === e ? {
			...t,
			gain: n
		} : t);
	}
	function $e(e, t = 0) {
		if (K(k)) return;
		let n = eo(t);
		K(i)[n] = K(i)[n]?.map((t) => ({
			...t,
			volume: Math.round(e * 10)
		}));
	}
	function et(e) {
		K(l) && (Te[K(h)] = K(j), K(u) ? z(s, e, !0) : z(o, e, !0), z(j, Te[K(u) ? e === 0 ? "peqFirList" : "peqFirListRight" : eo(e)] ?? 0, !0));
	}
	function tt() {
		if (K(k) || !K(l)) return;
		let e = +(K(d) === 0), t = K(u) ? e === 0 ? "peqFirList" : "peqFirListRight" : eo(e);
		if (K(i)[t]?.length !== K(Ve).length) {
			z(A, "Channel band counts differ; reload the profile before setting both channels.");
			return;
		}
		K(i)[t] = io(K(Ve));
	}
	function nt() {
		K(i)[K(h)] = K(Ve).map((e) => ({
			...e,
			gain: 0,
			q: 1,
			type: 6,
			volume: 0
		}));
	}
	function rt(e) {
		if (K(k)) return;
		let t = () => {
			z(Oe, e, !0), z(ke, e === "rename" || e === "save_as" ? K(r)?.name ?? "" : "", !0), K(Ee)?.showModal();
		};
		e === "create" ? xe(t, "Discard And Continue") : t();
	}
	async function it(e) {
		e.preventDefault();
		let t = K(r);
		K(Ee)?.close(), await We(async () => {
			K(Oe) === "create" ? (Ke(await P("create", { name: K(ke) })), await qe(), await F(), z(we, "Profile Created")) : t && K(Oe) === "save_as" ? (Ke(await P("save_as", {
				profile_id: t.id,
				revision: t.revision,
				name: K(ke),
				settings: io(K(i))
			})), await qe(), await F(), z(we, "Profile Copied And Verified On Device")) : t && K(Oe) === "rename" ? (z(r, await P("rename", {
				profile_id: t.id,
				revision: t.revision,
				name: K(ke)
			}), !0), await qe(), await F(), z(we, "Profile Renamed")) : t && (await P("delete", {
				profile_id: t.id,
				revision: t.revision,
				expected_name: t.name
			}), z(r, null), z(i, {}, !0), await Xe(), z(we, "Profile Deleted"));
		});
	}
	async function at() {
		K(r) && (Ke(await P("save", {
			profile_id: K(r).id,
			revision: K(r).revision,
			settings: io(K(i))
		}), !0), await qe(), await F(), z(we, "Saved And Verified On Device"));
	}
	function ot(e, t, n, r) {
		let a = Number(e.currentTarget.value);
		t === "frequency" && (a = Math.round(20 * 1e3 ** (a / 1e3))), K(k) || (K(i)[n] = K(i)[n]?.map((e, n) => n === r ? co(e, { [t]: a }) : e));
	}
	var st = fs(), ct = V(st), lt = B(ct), ut = B(lt);
	let dt;
	var ft = B(ut), pt = B(ft, !0);
	M(ft), M(ut), M(lt);
	var mt = H(lt, 2);
	let ht;
	var gt = B(mt), _t = H(B(gt), 2), vt = B(_t), yt = (e) => {
		var t = Mo();
		t.value = t.__value = "", Y(e, t);
	};
	Z(vt, (e) => {
		K(r) || e(yt);
	}), Q(H(vt), 17, () => K(n).profiles, (e) => e.id, (e, t) => {
		var n = No(), r = B(n);
		M(n);
		var i = {};
		U(() => {
			X(r, `${(K(t).name || "Unnamed") ?? ""} · #${K(t).id ?? ""}`), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
		}), Y(e, n);
	}), M(_t);
	var bt;
	Qr(_t), M(gt), _i(gt, (e) => z(ge, e), () => K(ge));
	var xt = H(gt, 2), St = B(xt), Ct = H(St, 2), wt = H(Ct, 2), Tt = H(wt, 2);
	M(xt), _i(xt, (e) => z(_e, e), () => K(_e)), M(mt), _i(mt, (e) => z(he, e), () => K(he));
	var Et = H(mt, 2), Dt = (e) => {
		var t = Po(), n = B(t, !0);
		M(t), U(() => X(n, K(A))), Y(e, t);
	};
	Z(Et, (e) => {
		K(A) && e(Dt);
	});
	var Ot = H(Et, 2), kt = (e) => {
		Y(e, Fo());
	};
	Z(Ot, (e) => {
		K(Ae) && e(kt);
	});
	var At = H(Ot, 2), jt = (e) => {
		let t = (e) => {
			var t = Io(), n = B(t);
			let r;
			var i = B(n, !0);
			M(n);
			var a = H(n), o = B(a), s = H(o, 2), c = H(s, 2);
			M(a), M(t), U(() => {
				r = Jr(n, 1, "svelte-1jdjhi", null, r, { unsaved: K(Be) }), X(i, K(Be) ? "Unsaved Changes" : K(we)), o.disabled = K(k), s.disabled = K(k) || !K(Be), c.disabled = K(k) || !K(Be) || K(Ae);
			}), q("click", o, Ge), q("click", s, Ge), q("click", c, () => void We(at)), Y(e, t);
		};
		var o = ns(), s = V(o);
		jo(s, {
			get busy() {
				return K(k);
			},
			onModeChange: (e) => K(i).settingType = e,
			onChannelChange: (e) => z(a, e, !0),
			get settings() {
				return K(i);
			},
			get profile() {
				return K(r);
			},
			get fir() {
				return K(je);
			},
			get channel() {
				return K(a);
			},
			get actions() {
				return t;
			},
			get previewRequest() {
				return K(fe);
			}
		});
		var _ = H(s, 2), v = (e) => {
			var t = Lo(), n = B(t, !0);
			M(t), U(() => X(n, K(Me))), Y(e, t);
		};
		Z(_, (e) => {
			K(Me) && e(v);
		});
		var y = H(_, 2);
		Q(y, 20, () => [
			["preamp", "Preamp & Balance"],
			["geq", "Graphic EQ"],
			["peq", "PEQ"],
			["correction", "Correction PEQ"],
			["fir", "FIR"],
			["loudness", "Loudness"],
			["outputs", "Outputs"]
		], Mr, (e, t) => {
			var n = /* @__PURE__ */ L(() => m(t, 2));
			let r = () => K(n)[0], i = () => K(n)[1];
			var a = Ro();
			let o;
			var s = B(a, !0);
			M(a), U(() => {
				o = Jr(a, 1, "chip", null, o, { on: K(de) === r() }), $(a, "aria-pressed", K(de) === r()), X(s, i());
			}), q("click", a, () => pe(r())), Y(e, a);
		}), M(y);
		var b = H(y, 2), x = B(b);
		let S;
		var C = B(x);
		{
			let e = /* @__PURE__ */ L(() => K(u) ? "Correction PEQ" : "PEQ"), t = /* @__PURE__ */ L(() => !K(l)), n = /* @__PURE__ */ L(() => K(u) ? [Mi.Peaking] : [
				1002,
				1003,
				1004,
				1005,
				Mi.Peaking,
				1007,
				1008,
				1009
			]);
			_a(C, {
				get stageLabel() {
					return K(e);
				},
				get mono() {
					return K(t);
				},
				get bankChannel() {
					return K(d);
				},
				onBankChannel: et,
				get selectedBand() {
					return K(j);
				},
				onSelect: (e) => z(j, e, !0),
				get enabled() {
					return K(i)[K(g)];
				},
				onEnable: (e) => K(i)[K(g)] = e,
				get bands() {
					return K(He);
				},
				onPatch: I,
				onReset: nt,
				onSetBoth: tt,
				get types() {
					return K(n);
				},
				link: {
					grouped: !1,
					locked: !1,
					peerLabel: "",
					selectedShort: ""
				},
				onToggleLink: () => {}
			});
		}
		jr(H(C, 2), () => `${K(h)}:${K(j)}`, (e) => {
			let t = /* @__PURE__ */ L(() => K(h)), n = /* @__PURE__ */ L(() => K(j));
			var r = Cr(), i = V(r), a = (e) => {
				wi(e, {
					code: "EQ.05",
					title: "Band Sliders",
					right: (e) => {
						var t = Bo();
						Q(t, 21, () => K(Ve), Mr, (e, t, n) => {
							var r = zo();
							r.textContent = `Band ${n + 1}`, r.value = r.__value = n, Y(e, r);
						}), M(t), $r(t, () => K(j), (e) => z(j, e)), Y(e, t);
					},
					children: (e, r) => {
						var i = Vo(), a = B(i), o = H(B(a)), s = B(o);
						M(o);
						var c = H(o);
						ai(c), M(a);
						var l = H(a, 2), u = H(B(l)), d = B(u);
						M(u);
						var f = H(u);
						ai(f), M(l);
						var p = H(l, 2), m = H(B(p)), h = B(m, !0);
						M(m);
						var g = H(m);
						ai(g), M(p), M(i), U((e) => {
							X(s, `${K(Ue).fc ?? ""} Hz`), oi(c, e), X(d, `${K(Ue).gain ?? ""} dB`), oi(f, K(Ue).gain), X(h, K(Ue).q), oi(g, K(Ue).q);
						}, [() => Math.log(K(Ue).fc / 20) / Math.log(1e3) * 1e3]), q("input", c, (e) => ot(e, "frequency", K(t), K(n))), q("input", f, (e) => ot(e, "gain", K(t), K(n))), q("input", g, (e) => ot(e, "q", K(t), K(n))), Y(e, i);
					},
					$$slots: {
						right: !0,
						default: !0
					}
				});
			};
			Z(i, (e) => {
				K(Ue) && e(a);
			}), Y(e, r);
		}), M(x);
		var w = H(x, 2);
		let T;
		wi(B(w), {
			code: "EQ.06",
			title: "Graphic EQ",
			titleControl: (e) => {
				var t = Ho(), n = B(t);
				ai(n), M(t), U(() => {
					si(n, K(i)[K(p)] ?? !1), n.disabled = K(i)[K(p)] === void 0;
				}), q("change", n, (e) => K(i)[K(p)] = e.currentTarget.checked), Y(e, t);
			},
			right: (e) => {
				var t = Uo(), n = V(t);
				{
					let e = /* @__PURE__ */ L(() => !K(l));
					Di(n, {
						get mono() {
							return K(e);
						},
						label: "Graphic EQ bank",
						get value() {
							return K(c);
						},
						onChange: (e) => z(c, e, !0)
					});
				}
				q("click", H(n, 2), () => K(i)[K(f)] = K(i)[K(f)]?.map((e) => ({
					...e,
					gain: 0
				}))), Y(e, t);
			},
			children: (e, t) => {
				var n = Go();
				Q(n, 21, () => K(i)[K(f)] ?? [], Mr, (e, t, n) => {
					var r = Wo(), a = B(r);
					ai(a);
					var o = H(a, 2);
					ai(o);
					var s = H(o, 2), c = B(s, !0);
					M(s), M(r), U((e) => {
						$(a, "aria-label", `Graphic EQ ${K(t).freq} Hz gain value`), oi(a, e), $(o, "aria-label", `Graphic EQ ${K(t).freq} Hz gain`), oi(o, K(t).gain), X(c, K(t).freq >= 1e3 ? `${K(t).freq / 1e3}k` : K(t).freq);
					}, [() => K(t).gain.toFixed(1)]), q("change", a, (e) => {
						Qe(n, e.currentTarget.valueAsNumber), e.currentTarget.value = K(i)[K(f)][n].gain.toFixed(1);
					}), q("input", o, (e) => Qe(n, e.currentTarget.valueAsNumber)), Y(e, r);
				}), M(n), Y(e, n);
			},
			$$slots: {
				titleControl: !0,
				right: !0,
				default: !0
			}
		}), M(w);
		var ee = H(w, 2);
		let te;
		var ne = B(ee), re = (e) => {
			wi(e, {
				code: "DSP.02",
				title: "Loudness Compensation",
				titleControl: (e) => {
					var t = Ko(), n = B(t);
					ai(n), M(t), U((e) => si(n, e), [() => K(i)[no(K(a))] === 1]), q("change", n, (e) => K(i)[no(K(a))] = +!!e.currentTarget.checked), Y(e, t);
				},
				children: (e, t) => {
					var n = qo();
					Ba(B(n), {}), M(n), Y(e, n);
				},
				$$slots: {
					titleControl: !0,
					default: !0
				}
			});
		}, ie = /* @__PURE__ */ L(() => K(i)[no(K(a))] !== void 0 && K(r).processing?.hasLoudness !== !1);
		Z(ne, (e) => {
			K(ie) && e(re);
		}), M(ee);
		var ae = H(ee, 2);
		let oe;
		var E = B(ae), D = (e) => {
			{
				let t = /* @__PURE__ */ L(() => oo(K(i), 0)), n = /* @__PURE__ */ L(() => K(l) && K(i).audioTunningEQListRight?.length ? oo(K(i), 1) : void 0);
				Ka(e, {
					get balance() {
						return K(i).balance;
					},
					onBalance: (e) => K(i).balance = e,
					get preampDb() {
						return K(t);
					},
					get rightPreampDb() {
						return K(n);
					},
					accentChannelId: 0,
					onChange: (e) => $e(e, 0),
					onRightChange: (e) => $e(e, 1),
					onReset: () => {
						$e(0, 0), K(l) && $e(0, 1), K(i).balance !== void 0 && (K(i).balance = 0);
					}
				});
			}
		};
		Z(E, (e) => {
			K(i).audioTunningEQList?.length && e(D);
		}), M(ae);
		var ce = H(ae, 2);
		let ue;
		var me = B(ce), he = (e) => {
			wi(e, {
				code: "DSP.03",
				title: "FIR Filters",
				titleControl: (e) => {
					var t = Jo(), n = B(t);
					ai(n), M(t), U(() => {
						si(n, K(Ne)), n.disabled = K(i).enableLeftFir === void 0 && K(i).enableRightFir === void 0;
					}), q("change", n, (e) => N(e.currentTarget.checked)), Y(e, t);
				},
				children: (e, t) => {
					var n = Zo();
					Q(n, 20, () => ["left", "right"], Mr, (e, t) => {
						let n = /* @__PURE__ */ L(() => t === "left" ? 0 : 1);
						var a = Xo(), o = B(a), s = B(o, !0);
						M(o);
						var c = H(o, 2), l = H(c, 2), u = (e) => {
							var t = Yo(), i = B(t, !0);
							M(t), U(() => X(i, se[`${K(r).id}:${K(n)}`])), Y(e, t);
						};
						Z(l, (e) => {
							se[`${K(r).id}:${K(n)}`] && e(u);
						});
						var d = H(l, 2), f = B(d);
						ai(f), De(), M(d);
						var p = H(d, 2), m = B(p), h = B(m, !0);
						M(m), M(p), M(a), U((e) => {
							X(s, t === "left" ? "Left" : "Right"), c.disabled = K(k) || K(Be), $(f, "aria-label", `${t === "left" ? "Left" : "Right"} FIR Enabled`), si(f, K(i)[t === "left" ? "enableLeftFir" : "enableRightFir"] ?? !1), f.disabled = !K(Ne) || K(i)[t === "left" ? "enableLeftFir" : "enableRightFir"] === void 0, $(p, "aria-label", `${t === "left" ? "Left" : "Right"} FIR Status`), X(h, e);
						}, [() => K(ze)?.[t]?.loaded && K(ze)[t].points.length > 0 && K(ze)[t].points.every((e) => Number.isFinite(e.x) && Number.isFinite(e.y)) ? "Filter Imported" : "Filter Not Imported"]), q("click", c, () => void le(K(n))), q("change", f, (e) => Fe(t, e.currentTarget.checked)), Y(e, a);
					}), M(n), Y(e, n);
				},
				$$slots: {
					titleControl: !0,
					default: !0
				}
			});
		};
		Z(me, (e) => {
			K(r).processing?.hasFir !== !1 && e(he);
		}), M(ce);
		var ge = H(ce, 2);
		let _e;
		wi(B(ge), {
			code: "IO.01",
			title: "Output Assignments",
			children: (e, t) => {
				var r = ts();
				Q(r, 21, () => K(n).outputs, (e) => e.id, (e, t) => {
					var r = es(), i = B(r), a = B(i, !0);
					M(i);
					var o = H(i, 2), s = B(o), c = (e) => {
						var n = Qo(), r = B(n);
						M(n);
						var i = {};
						U(() => {
							X(r, `Unknown Profile #${K(t).eqId ?? ""}`), i !== (i = K(t).eqId) && (n.value = (n.__value = K(t).eqId) ?? "");
						}), Y(e, n);
					}, l = /* @__PURE__ */ L(() => !K(n).profiles.some((e) => e.id === K(t).eqId));
					Z(s, (e) => {
						K(l) && e(c);
					}), Q(H(s), 17, () => K(n).profiles, (e) => e.id, (e, t) => {
						var n = $o(), r = B(n);
						M(n);
						var i = {};
						U(() => {
							X(r, `${K(t).name ?? ""} · #${K(t).id ?? ""}`), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
						}), Y(e, n);
					}), M(o);
					var u;
					Qr(o);
					var d = H(o, 2), f = B(d);
					ai(f), De(), M(d), M(r), U(() => {
						X(a, K(t).name), $(o, "aria-label", `${K(t).name} assigned profile`), o.disabled = K(k), u !== (u = K(t).eqId) && (o.value = (o.__value = K(t).eqId) ?? "", Zr(o, K(t).eqId)), si(f, K(t).enable), f.disabled = K(k);
					}), q("change", o, (e) => {
						let n = Number(e.currentTarget.value);
						e.currentTarget.value = String(K(t).eqId), We(async () => {
							await P("output", {
								output_id: K(t).id,
								profile_id: n
							}), await F();
						});
					}), q("change", f, (e) => {
						let n = e.currentTarget.checked;
						e.currentTarget.checked = K(t).enable, We(async () => {
							await P("output", {
								output_id: K(t).id,
								enabled: n
							}), await F();
						});
					}), Y(e, r);
				}), M(r), Y(e, r);
			},
			$$slots: { default: !0 }
		}), M(ge), M(b), U(() => {
			b.disabled = K(k), S = Jr(x, 1, "tab-pane bands-wrap svelte-1jdjhi", null, S, { inactive: K(de) !== "peq" && K(de) !== "correction" }), x.inert = K(de) !== "peq" && K(de) !== "correction", T = Jr(w, 1, "tab-pane svelte-1jdjhi", null, T, { inactive: K(de) !== "geq" }), w.inert = K(de) !== "geq", te = Jr(ee, 1, "tab-pane svelte-1jdjhi", null, te, { inactive: K(de) !== "loudness" }), ee.inert = K(de) !== "loudness", oe = Jr(ae, 1, "tab-pane svelte-1jdjhi", null, oe, { inactive: K(de) !== "preamp" }), ae.inert = K(de) !== "preamp", ue = Jr(ce, 1, "tab-pane svelte-1jdjhi", null, ue, { inactive: K(de) !== "fir" }), ce.inert = K(de) !== "fir", _e = Jr(ge, 1, "tab-pane output-panel svelte-1jdjhi", null, _e, { inactive: K(de) !== "outputs" }), ge.inert = K(de) !== "outputs";
		}), Y(e, o);
	}, Mt = (e) => {
		Y(e, rs());
	};
	Z(At, (e) => {
		K(r) ? e(jt) : K(k) || e(Mt, 1);
	}), M(ct);
	var Nt = H(ct, 2), Pt = B(Nt), Ft = H(B(Pt)), It = B(Ft);
	M(Ft), M(Pt);
	var Lt = H(Pt, 2), Rt = B(Lt), zt = H(Rt, 2), Bt = B(zt);
	ai(Bt);
	var Vt = H(Bt, 2);
	M(zt), M(Lt);
	var Ut = H(Lt, 2), Wt = B(Ut);
	ai(Wt);
	var Gt = H(Wt, 2), Kt = H(B(Gt));
	Q(Kt, 20, () => [
		"Name ↑",
		"Name ↓",
		"Size ↑",
		"Size ↓",
		"Time ↑",
		"Time ↓",
		"Type ↑",
		"Type ↓"
	], Mr, (e, t, n) => {
		var r = is(), i = B(r, !0);
		M(r), r.value = r.__value = n, U(() => X(i, t)), Y(e, r);
	}), M(Kt), M(Gt), M(Ut);
	var qt = H(Ut, 2), Jt = B(qt), Yt = H(B(Jt));
	Q(Yt, 21, () => K(ee), (e) => e.url, (e, t) => {
		var n = os();
		let r;
		var i = B(n), a = B(i), o = B(a), s = B(o), c = (e) => {
			Y(e, as());
		}, l = (e) => {
			Y(e, Sr("♫"));
		};
		Z(s, (e) => {
			K(t).fileType === 0 ? e(c) : e(l, -1);
		}), M(o);
		var u = H(o, 1, !0);
		M(a), M(i);
		var d = H(i), f = B(d, !0);
		M(d);
		var p = H(d), m = B(p, !0);
		M(p), M(n), U((e, i, o) => {
			r = Jr(n, 1, "svelte-1jdjhi", null, r, { selected: K(C) === K(t).url }), $(a, "aria-label", `${K(t).fileType === 0 ? "Open Folder" : "Select File"}: ${K(t).name}`), $(a, "aria-pressed", K(t).fileType === 0 ? void 0 : K(C) === K(t).url), a.disabled = e, X(u, K(t).name), X(f, i), X(m, o);
		}, [
			() => K(k) || K(t).fileType !== 0 && !K(t).name.toLowerCase().endsWith(".wav"),
			() => K(t).fileType === 0 ? "Folder" : K(t).name.toLowerCase().endsWith(".wav") ? "WAV Audio" : "File",
			() => K(t).fileType === 0 ? "—" : oe(K(t).size)
		]), q("click", a, () => {
			K(t).fileType === 0 ? We(() => ie(K(t).url)) : z(C, K(t).url, !0);
		}), Y(e, n);
	}, (e) => {
		var t = ss(), n = B(t), r = B(n, !0);
		M(n), M(t), U(() => X(r, K(w) ? "No Matching Files" : "This Folder Is Empty")), Y(e, t);
	}), M(Yt), M(Jt), M(qt);
	var Xt = H(qt, 2), Zt = (e) => {
		var t = cs(), n = B(t), r = H(n), i = B(r);
		M(r);
		var a = H(r);
		M(t), U((e) => {
			n.disabled = K(k) || K(x) === 0, X(i, `${K(x) + 1}–${e ?? ""} / ${K(S) ?? ""}`), a.disabled = K(k) || K(x) + 1e3 >= K(S);
		}, [() => Math.min(K(x) + 1e3, K(S))]), q("click", n, () => void We(() => ce(K(y), Math.max(0, K(x) - 1e3)))), q("click", a, () => void We(() => ce(K(y), K(x) + 1e3))), Y(e, t);
	};
	Z(Xt, (e) => {
		K(S) > 1e3 && e(Zt);
	});
	var Qt = H(Xt, 2), $t = H(B(Qt));
	ai($t), M(Qt);
	var en = H(Qt, 2), tn = (e) => {
		var t = ls(), n = B(t, !0);
		M(t), U(() => X(n, K(A))), Y(e, t);
	};
	Z(en, (e) => {
		K(A) && e(tn);
	});
	var nn = H(en, 2), rn = H(B(nn)), an = B(rn), on = H(an);
	M(rn), M(nn), M(Nt), _i(Nt, (e) => z(D, e), () => K(D));
	var sn = H(Nt, 2), cn = H(B(sn), 4), ln = B(cn), un = H(ln), dn = B(un, !0);
	M(un), M(cn), M(sn), _i(sn, (e) => z(ye, e), () => K(ye));
	var fn = H(sn, 2), pn = B(fn), mn = B(pn), hn = B(mn, !0);
	M(mn);
	var gn = H(mn, 2), _n = (e) => {
		var t = us(), n = B(t);
		M(t), U((e) => X(n, `Permanently delete “${e ?? ""}” (#${K(r)?.id ?? ""}) from this device? Any unsaved edits will be discarded.`), [() => K(r)?.name.trim()]), Y(e, t);
	}, vn = (e) => {
		var t = ds(), n = H(B(t));
		ai(n), M(t), di(n, () => K(ke), (e) => z(ke, e)), Y(e, t);
	};
	Z(gn, (e) => {
		K(Oe) === "delete" ? e(_n) : e(vn, -1);
	});
	var yn = H(gn, 2), bn = B(yn), xn = H(bn);
	let Sn;
	var Cn = B(xn, !0);
	M(xn), M(yn), M(pn), M(fn), _i(fn, (e) => z(Ee, e), () => K(Ee)), U((e, i) => {
		dt = Jr(ut, 1, "brand svelte-1jdjhi", null, dt, { centered: K(ve) }), X(pt, K(me) || t.panel.config.title), ht = Jr(mt, 1, "toolbar svelte-1jdjhi", null, ht, { wrapped: K(ve) }), _t.disabled = K(k) || !K(n).profiles.length, bt !== (bt = K(r)?.id ?? "") && (_t.value = (_t.__value = K(r)?.id ?? "") ?? "", Zr(_t, K(r)?.id ?? "")), St.disabled = K(k), Ct.disabled = K(k) || !K(r) || K(Ae), wt.disabled = K(k) || !K(r), Tt.disabled = K(k) || !K(r), X(It, `${K(E) === 0 ? "Left" : "Right"} Channel`), Rt.disabled = K(k) || !K(v).length, Bt.disabled = K(k), Vt.disabled = K(k), Kt.disabled = K(k), oi($t, K(T)?.name ?? ""), on.disabled = K(k) || !K(T), X(dn, K(be)), X(hn, K(Oe) === "create" ? "Create Profile" : K(Oe) === "save_as" ? "Save Profile As" : K(Oe) === "rename" ? "Rename Profile" : "Delete Profile"), Sn = Jr(xn, 1, "chip md", null, Sn, {
			danger: K(Oe) === "delete",
			accent: K(Oe) !== "delete"
		}), xn.disabled = e, X(Cn, i);
	}, [() => K(k) || K(Oe) !== "delete" && !K(ke).trim(), () => K(Oe) === "save_as" ? "Save As" : K(Oe)[0].toUpperCase() + K(Oe).slice(1)]), q("change", _t, Ye), q("click", St, () => rt("create")), q("click", Ct, () => rt("save_as")), q("click", wt, () => rt("rename")), q("click", Tt, () => rt("delete")), q("click", Nt, re), q("click", Rt, () => void We(() => ae(K(v).length - 1))), q("keydown", Bt, (e) => {
		e.key === "Enter" && (e.preventDefault(), We(ne));
	}), di(Bt, () => K(te), (e) => z(te, e)), q("click", Vt, () => void We(ne)), di(Wt, () => K(w), (e) => z(w, e)), q("change", Kt, () => void We(() => ce(K(y)))), $r(Kt, () => K(b), (e) => z(b, e)), q("click", an, () => K(D)?.close()), q("click", on, () => {
		let e = K(T);
		e && We(() => ue(e));
	}), fr("cancel", sn, () => O = null), q("click", ln, Se), q("click", un, Ce), fr("submit", pn, it), q("click", bn, () => K(Ee)?.close()), Y(e, st), Le();
}
pr([
	"change",
	"click",
	"input",
	"keydown"
]);
//#endregion
//#region src/theme.css?inline
var hs = ":host{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;--bg:#050505;--bg-glow:var(--bg);--panel:#1a1a19;--panel-hi:#292927;--panel-solid:#20201e;--text:#f1f0ed;--text-dim:#cbc9c4;--text-faint:#a6a49f;--border:#30302d;--border-hi:#4b4b46;--wash-faint:#1f1f1d;--wash:#262624;--wash-strong:#333330;--accent:#70bdce;--ok:#e3e2de;--warn:#d2bfa0;--err:#d8948b;--number-positive:var(--text);--number-negative:var(--text);--dim-disabled:.5;--pad:20px;--radius-s:7px;--radius-m:12px;--radius:18px;--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;--font-mono:var(--font-sans);height:100%;font-family:var(--font-sans);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;font-size:17px;line-height:1.5;display:block;overflow:auto}button,input,select{font-family:inherit}button{color:var(--text)}button,select,input{-webkit-tap-highlight-color:transparent}input[type=checkbox]{accent-color:#d9d8d3;flex-shrink:0;width:20px;height:20px}input[type=range]{appearance:none;cursor:pointer;background:0 0;height:44px;margin:0;padding:0;display:block}input[type=range]::-webkit-slider-runnable-track{background:#4a4a46;border-radius:4px;height:6px}input[type=range]::-webkit-slider-thumb{appearance:none;background:#eeeeea;border:0;border-radius:3px;width:8px;height:24px;margin-top:-9px}input[type=range]::-moz-range-track{background:#4a4a46;border-radius:4px;height:6px}input[type=range]::-moz-range-thumb{background:#eeeeea;border:0;border-radius:3px;width:8px;height:24px}input[type=range]:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:6px}.chip{font-family:var(--font-sans);letter-spacing:0;background:var(--wash);border:1px solid var(--border-hi);min-height:40px;color:var(--text);cursor:pointer;border-radius:9px;padding:9px 14px;font-size:15px;font-weight:500;line-height:1.3}.chip:hover:not(:disabled){background:var(--wash-strong)}.chip:focus-visible{outline:2px solid var(--accent);outline-offset:3px}.chip:disabled{opacity:var(--dim-disabled);cursor:default}.chip.md{min-height:44px;padding:11px 16px;font-size:15px}.chip.hi{background:0 0}.chip.accent{color:#f5f4f0;background:#3d4548;border-color:#687275}.chip.accent:hover:not(:disabled){background:#4b5558}.chip.danger{color:#e0aaa2;background:0 0;border-color:#71514b}.chip.warn{color:var(--warn)}.chip.on{color:var(--accent);border-color:var(--accent)}.microlbl{font:500 15px/1.5 var(--font-sans);color:var(--text-dim)}.hint{font:14px/1.6 var(--font-sans);color:var(--text-faint);margin:0}.ch-left,.ch-right{--ch-glow:#dddad3}.toggle-label{min-height:44px;font:16px var(--font-sans);color:var(--text-dim);align-items:center;gap:12px;display:inline-flex}input.switch[type=checkbox]{appearance:none;border:1px solid var(--border-hi);cursor:pointer;vertical-align:middle;background:#494945;border-radius:18px;flex:0 0 54px;width:54px;height:30px;min-height:30px;margin:7px 0;padding:3px;position:relative}input.switch[type=checkbox]:after{content:\"\";background:#eee;border-radius:50%;width:22px;height:22px;transition:transform .15s;display:block}input.switch[type=checkbox]:checked{background:#8baba6}input.switch[type=checkbox]:checked:after{transform:translate(24px)}input.switch[type=checkbox]:focus-visible{outline:2px solid var(--accent);outline-offset:3px}input.switch[type=checkbox]:disabled{opacity:.5;cursor:default}select{appearance:none!important;background-image:linear-gradient(45deg, transparent 50%, var(--text-faint) 50%), linear-gradient(135deg, var(--text-faint) 50%, transparent 50%)!important;background-position:calc(100% - 17px),calc(100% - 13px)!important;background-repeat:no-repeat!important;background-size:4px 4px,4px 4px!important;padding-right:34px!important}", gs = class extends HTMLElement {
	instance;
	currentHass;
	currentPanel;
	resetting = !1;
	root = this.attachShadow({ mode: "open" });
	set hass(e) {
		this.currentHass = e, this.start();
	}
	set panel(e) {
		let t = this.currentPanel?.config.entry_id !== e.config.entry_id;
		this.currentPanel = e, t && this.instance ? this.reset() : this.start();
	}
	connectedCallback() {
		this.start();
	}
	disconnectedCallback() {
		this.reset();
	}
	reset() {
		let e = this.instance;
		this.instance = void 0, this.resetting = !0, (e ? Or(e) : Promise.resolve()).then(() => {
			this.root.replaceChildren(), this.resetting = !1, this.start();
		});
	}
	start() {
		if (this.resetting || !this.isConnected || this.instance || !this.currentHass || !this.currentPanel) return;
		let e = document.createElement("style");
		e.textContent = hs, this.root.append(e), this.instance = wr(ms, {
			target: this.root,
			props: {
				hass: { callWS: (e) => this.currentHass.callWS(e) },
				panel: this.currentPanel
			}
		});
	}
};
customElements.get("eversolo-peq-panel") || customElements.define("eversolo-peq-panel", gs);
//#endregion
