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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, w = 1 << 25, te = 65536, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("legacy props"), se = Symbol(""), T = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), E = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function ce(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function le() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ue(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function de(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function fe() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function pe(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function me() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function he(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ge() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ye() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var be = {}, D = Symbol(), xe = "http://www.w3.org/1999/xhtml";
function Se() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ce(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function we() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function O() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Te(e) {
	k = e;
}
var A;
function Ee(e) {
	if (e === null) throw Ce(), be;
	return A = e;
}
function De() {
	return Ee(/* @__PURE__ */ $t(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ $t(A) !== null) throw Ce(), be;
		A = e;
	}
}
function Oe(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ $t(n);
		A = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ $t(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw Ce(), be;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function je(e) {
	return e === this.v;
}
function Me(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ne(e) {
	return !Me(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var M = !1, Pe = !1, N = null;
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
		r: W,
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
		for (var r of n) hn(r);
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
	if (ze.length === 0 && !nt) {
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
	var t = W;
	if (t === null) return U.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	We(e, t);
}
function We(e, t) {
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
var Ge = ~(g | _ | h);
function P(e, t) {
	e.f = e.f & Ge | t;
}
function Ke(e) {
	e.f & 512 || e.deps === null ? P(e, h) : P(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function qe(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, qe(t.deps));
}
function Je(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), qe(e.deps), P(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ye = !1, Xe = !1;
function Ze(e) {
	var t = Xe;
	try {
		return Xe = !1, [e(), Xe];
	} finally {
		Xe = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Qe = /* @__PURE__ */ new Set(), F = null, $e = null, et = null, tt = null, nt = !1, rt = !1, it = null, at = null, ot = 0, st = 1, ct = class e {
	id = st++;
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
			for (var r of n.d) P(r, g), t(r);
			for (r of n.m) P(r, _), t(r);
		}
		this.#d.add(e);
	}
	#g() {
		if (ot++ > 1e3 && (Qe.delete(this), ut()), !this.#m()) {
			for (let e of this.#c) this.#l.delete(e), P(e, g), this.schedule(e);
			for (let e of this.#l) P(e, _), this.schedule(e);
		}
		let t = this.#o;
		this.#o = [], this.apply();
		var n = it = [], r = [], i = at = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw _t(e), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (it = null, at = null, this.#m() || this.#h()) {
			this.#v(r), this.#v(n);
			for (let [e, t] of this.#u) gt(e, t);
		} else {
			this.#r.size === 0 && Qe.delete(this), this.#c.clear(), this.#l.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), $e = this, ft(r), ft(n), $e = null, this.#a?.resolve();
		}
		var o = F;
		if (this.#o.length > 0) {
			let e = o ??= this;
			e.#o.push(...this.#o.filter((t) => !e.#o.includes(t)));
		}
		o !== null && (Qe.add(o), o.#g()), M && !Qe.has(this) && this.#y();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#u.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : M && i & 16777224 ? n.push(r) : Zn(r) && (i & 16 && this.#l.add(r), nr(r));
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
		for (var t = 0; t < e.length; t += 1) Je(e[t], this.#c, this.#l);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		F = this;
	}
	deactivate() {
		F = null, et = null;
	}
	flush() {
		try {
			rt = !0, F = this, this.#g();
		} finally {
			ot = 0, tt = null, it = null, at = null, rt = !1, F = null, et = null, Ft.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear(), this.#n.clear(), Qe.delete(this);
	}
	register_created_effect(e) {
		this.#s.push(e);
	}
	#y() {
		for (let l of Qe) {
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
				for (var o of t) pt(o, r, i, a);
				a = /* @__PURE__ */ new Map();
				var s = [...l.current.keys()].filter((e) => this.current.has(e) ? this.current.get(e)[0] !== e : !0);
				for (let e of this.#s) !(e.f & 155648) && mt(e, s, a) && (e.f & 4194320 ? (P(e, g), l.schedule(e)) : l.#c.add(e));
				if (l.#o.length > 0) {
					l.apply();
					for (var c of l.#o) l.#_(c, [], []);
					l.#o = [];
				}
				l.deactivate();
			}
		}
		for (let e of Qe) e.#p.has(this) && (e.#p.delete(this), e.#p.size === 0 && !e.#m() && (e.activate(), e.#g()));
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
		if (F === null) {
			let t = F = new e();
			rt || (Qe.add(F), nt || Ve(() => {
				F === t && t.flush();
			}));
		}
		return F;
	}
	apply() {
		if (!M || !this.is_fork && Qe.size === 1) {
			et = null;
			return;
		}
		et = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) et.set(e, t);
		for (let n of Qe) if (!(n === this || n.is_fork)) {
			var e = !1, t = !1;
			if (n.id < this.id) for (let [r, [, i]] of n.current) i || (e ||= this.current.has(r), t ||= !this.current.has(r));
			if (e && t) this.#p.add(n);
			else for (let [e, t] of n.previous) et.has(e) || et.set(e, t);
		}
	}
	schedule(e) {
		if (tt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (it !== null && t === W && (M || (U === null || !(U.f & 2)) && !Ye)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= h;
			}
		}
		this.#o.push(t);
	}
};
function lt(e) {
	var t = nt;
	nt = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (He(), F === null) return n;
			F.flush();
		}
	} finally {
		nt = t;
	}
}
function ut() {
	try {
		me();
	} catch (e) {
		We(e, tt);
	}
}
var dt = null;
function ft(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Zn(r) && (dt = /* @__PURE__ */ new Set(), nr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Dn(r), dt?.size > 0)) {
				Ft.clear();
				for (let e of dt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) dt.has(n) && (dt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || nr(n);
					}
				}
				dt.clear();
			}
		}
		dt = null;
	}
}
function pt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? pt(i, t, n, r) : e & 4194320 && !(e & 2048) && mt(i, t, r) && (P(i, g), ht(i));
	}
}
function mt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && mt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function ht(e) {
	F.schedule(e);
}
function gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, h);
		for (var n = e.first; n !== null;) gt(n, t), n = n.next;
	}
}
function _t(e) {
	P(e, h);
	for (var t = e.first; t !== null;) _t(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function vt(e) {
	let t = 0, n = Lt(0), r;
	return () => {
		fn() && (G(n), yn(() => (t === 0 && (r = or(() => e(() => Vt(n)))), t += 1, () => {
			Ve(() => {
				--t, t === 0 && (r?.(), r = void 0, Vt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var yt = S | C;
function bt(e, t, n, r) {
	new xt(e, t, n, r);
}
var xt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
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
	#h = vt(() => (this.#m = Lt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = bn(() => {
			if (k) {
				let e = this.#t;
				De();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, yt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = xn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = xn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = xn(() => e(this.#e)), Ve(() => {
			var e = this.#c = document.createDocumentFragment(), t = Zt();
			e.append(t), this.#a = this.#x(() => xn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, On(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = xn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Mn(this.#a, e);
				let t = this.#n.pending;
				this.#o = xn(() => t(this.#e));
			} else this.#b(F);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Je(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = W, n = U, r = N;
		zn(this.#i), Rn(this.#i), Fe(this.#i.ctx);
		try {
			return ct.ensure(), e();
		} catch (e) {
			return Ue(e), null;
		} finally {
			zn(t), Rn(n), Fe(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && On(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ve(() => {
			this.#d = !1, this.#m && zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Tn(this.#a), null), this.#o &&= (Tn(this.#o), null), this.#s &&= (Tn(this.#s), null), k && (Ee(this.#t), Oe(), Ee(ke()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				O();
				return;
			}
			r = !0, i && ye(), this.#s !== null && On(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				We(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return xn(() => {
						var t = W;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return We(e, this.#i.parent), null;
				}
			}));
		};
		Ve(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				We(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => We(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function St(e, t, n, r) {
	let i = Re() ? Et : Ot;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = W, s = Ct(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		s();
		try {
			r(e);
		} catch (e) {
			o.f & 16384 || We(e, o);
		}
		wt();
	}
	if (n.length === 0) {
		c.then(() => l(t.map(i)));
		return;
	}
	var u = Tt();
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Dt(e))).then((e) => l([...t.map(i), ...e])).catch((e) => We(e, o)).finally(() => u());
	}
	c ? c.then(() => {
		s(), d(), wt();
	}) : d();
}
function Ct() {
	var e = W, t = U, n = N, r = F;
	return function(i = !0) {
		zn(e), Rn(t), Fe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function wt(e = !0) {
	zn(null), Rn(null), Fe(null), e && F?.deactivate();
}
function Tt() {
	var e = W, t = e.b, n = F, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), (i = !1) => {
		t.update_pending_count(-1, n), n.decrement(r, e, i);
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Et(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
		ctx: N,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: W,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Dt(e, t, n) {
	let r = W;
	r === null && le();
	var i = void 0, a = Lt(D), o = !U, s = /* @__PURE__ */ new Map();
	return vn(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, n.reject).finally(wt);
		} catch (e) {
			n.reject(e), wt();
		}
		var c = F;
		if (o) {
			if (t.f & 32768) var l = Tt();
			if (r.b.is_rendered()) s.get(c)?.reject(T), s.delete(c);
			else {
				for (let e of s.values()) e.reject(T);
				s.clear();
			}
			s.set(c, n);
		}
		let u = (e, n = void 0) => {
			if (l && l(n === T), !(n === T || t.f & 16384)) {
				if (c.activate(), n) a.f |= ie, zt(a, n);
				else {
					a.f & 8388608 && (a.f ^= ie), zt(a, e);
					for (let [e, t] of s) {
						if (s.delete(e), e === c) break;
						t.reject(T);
					}
				}
				c.deactivate();
			}
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), pn(() => {
		for (let e of s.values()) e.reject(T);
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
function I(e) {
	let t = /* @__PURE__ */ Et(e);
	return M || Vn(t), t;
}
/* @__NO_SIDE_EFFECTS__ */
function Ot(e) {
	let t = /* @__PURE__ */ Et(e);
	return t.equals = Ne, t;
}
function kt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Tn(t[n]);
	}
}
function At(e) {
	var t, n = W, r = e.parent;
	if (!Fn && r !== null && r.f & 24576) return Se(), e.v;
	zn(r);
	try {
		e.f &= ~te, kt(e), t = $n(e);
	} finally {
		zn(n);
	}
	return t;
}
function jt(e) {
	var t = At(e);
	if (!e.equals(t) && (e.wv = Xn(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : F.capture(e, t, !0), e.deps === null))) {
		P(e, h);
		return;
	}
	Fn || (et === null ? Ke(e) : (fn() || F?.is_fork) && et.set(e, t));
}
function Mt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(T), t.teardown = d, t.ac = null, tr(t, 0), Cn(t));
}
function Nt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && nr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Pt = /* @__PURE__ */ new Set(), Ft = /* @__PURE__ */ new Map(), It = !1;
function Lt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: je,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function L(e, t) {
	let n = Lt(e, t);
	return Vn(n), n;
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e, t = !1, n = !0) {
	let r = Lt(e);
	return t || (r.equals = Ne), Pe && n && N !== null && N.l !== null && (N.l.s ??= []).push(r), r;
}
function R(e, t, r = !1) {
	return U !== null && (!Ln || U.f & 131072) && Re() && U.f & 4325394 && (Bn === null || !n.call(Bn, e)) && ve(), zt(e, r ? Ut(t) : t, at);
}
function zt(e, t, n = null) {
	if (!e.equals(t)) {
		Ft.set(e, Fn ? t : e.v);
		var r = ct.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && At(t), et === null && Ke(t);
		}
		e.wv = Xn(), Ht(e, g, n), Re() && W !== null && W.f & 1024 && !(W.f & 96) && (Wn === null ? Gn([e]) : Wn.push(e)), !r.is_fork && Pt.size > 0 && !It && Bt();
	}
	return t;
}
function Bt() {
	It = !1;
	for (let e of Pt) e.f & 1024 && P(e, _), Zn(e) && nr(e);
	Pt.clear();
}
function Vt(e) {
	R(e, e.v + 1);
}
function Ht(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Re(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && P(s, t), c & 2) {
				var u = s;
				et?.delete(u), c & 65536 || (c & 512 && (s.f |= te), Ht(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && dt !== null && dt.add(d), n === null ? ht(d) : n.push(d);
			}
		}
	}
}
function Ut(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = Jn, f = (e) => {
		if (Jn === d) return e();
		var t = U, n = Jn;
		Rn(null), Yn(d);
		var r = e();
		return Rn(t), Yn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ge();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ L(n.value, u);
				return r.set(t, e), e;
			}) : R(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ L(D, u));
					r.set(t, e), Vt(o);
				}
			} else R(n, D), Vt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(Ut(s ? e[n] : D), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === D ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = G(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== D) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== D || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? Ut(e[t]) : D, u)), r.set(t, n)), G(n) === D) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(D, u)), r.set(d + "", p)) : R(p, D);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, Ut(n)), r.set(t, c));
			else {
				l = c.v !== D;
				var m = f(() => Ut(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Vt(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [n, i] of r) i.v !== D && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			_e();
		}
	});
}
function Wt(e) {
	try {
		if (typeof e == "object" && e && ae in e) return e[ae];
	} catch {}
	return e;
}
function Gt(e, t) {
	return Object.is(Wt(e), Wt(t));
}
var Kt, qt, Jt, Yt;
function Xt() {
	if (Kt === void 0) {
		Kt = window, qt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Jt = a(t, "firstChild").get, Yt = a(t, "nextSibling").get, u(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), u(n) && (n.__t = void 0);
	}
}
function Zt(e = "") {
	return document.createTextNode(e);
}
/* @__NO_SIDE_EFFECTS__ */
function Qt(e) {
	return Jt.call(e);
}
/* @__NO_SIDE_EFFECTS__ */
function $t(e) {
	return Yt.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ Qt(e);
	var n = /* @__PURE__ */ Qt(A);
	if (n === null) n = A.appendChild(Zt());
	else if (t && n.nodeType !== 3) {
		var r = Zt();
		return n?.before(r), Ee(r), r;
	}
	return t && rn(n), Ee(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ Qt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ $t(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = Zt();
			return A?.before(r), Ee(r), r;
		}
		rn(A);
	}
	return A;
}
function V(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ $t(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Zt();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		rn(r);
	}
	return Ee(r), r;
}
function en(e) {
	e.textContent = "";
}
function tn() {
	return !M || dt !== null ? !1 : (W.f & b) !== 0;
}
function nn(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function rn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
var an = !1;
function on() {
	an || (an = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t.__on_r?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function sn(e) {
	var t = U, n = W;
	Rn(null), zn(null);
	try {
		return e();
	} finally {
		Rn(t), zn(n);
	}
}
function cn(e, t, n, r = n) {
	e.addEventListener(t, () => sn(n));
	let i = e.__on_r;
	i ? e.__on_r = () => {
		i(), r(!0);
	} : e.__on_r = () => r(!0), on();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function ln(e) {
	W === null && (U === null && pe(e), fe()), Fn && de(e);
}
function un(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function dn(e, t) {
	var n = W;
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
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) it === null ? ct.ensure().schedule(r) : it.push(r);
	else if (t !== null) {
		try {
			nr(r);
		} catch (e) {
			throw Tn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && un(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function fn() {
	return U !== null && !Ln;
}
function pn(e) {
	let t = dn(8, null);
	return P(t, h), t.teardown = e, t;
}
function mn(e) {
	ln("$effect");
	var t = W.f;
	if (!U && t & 32 && !(t & 32768)) {
		var n = N;
		(n.e ??= []).push(e);
	} else return hn(e);
}
function hn(e) {
	return dn(4 | ee, e);
}
function gn(e) {
	ct.ensure();
	let t = dn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? On(t, () => {
			Tn(t), n(void 0);
		}) : (Tn(t), n(void 0));
	});
}
function _n(e) {
	return dn(4, e);
}
function vn(e) {
	return dn(re | C, e);
}
function yn(e, t = 0) {
	return dn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	St(r, t, n, (t) => {
		dn(8, () => e(...t.map(G)));
	});
}
function bn(e, t = 0) {
	return dn(16 | t, e);
}
function xn(e) {
	return dn(32 | C, e);
}
function Sn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Fn, n = U;
		In(!0), Rn(null);
		try {
			t.call(null);
		} finally {
			In(e), Rn(n);
		}
	}
}
function Cn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && sn(() => {
			e.abort(T);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Tn(n, t), n = r;
	}
}
function wn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Tn(t), t = n;
	}
}
function Tn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (En(e.nodes.start, e.nodes.end), n = !0), P(e, x), Cn(e, t && !n), tr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Sn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Dn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function En(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ $t(e);
		e.remove(), e = n;
	}
}
function Dn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function On(e, t, n = !0) {
	var r = [];
	kn(e, r, !0);
	var i = () => {
		n && Tn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function kn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				kn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function An(e) {
	jn(e, !0);
}
function jn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (P(e, g), ct.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			jn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Mn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ $t(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Nn = null, Pn = !1, Fn = !1;
function In(e) {
	Fn = e;
}
var U = null, Ln = !1;
function Rn(e) {
	U = e;
}
var W = null;
function zn(e) {
	W = e;
}
var Bn = null;
function Vn(e) {
	U !== null && (!M || U.f & 2) && (Bn === null ? Bn = [e] : Bn.push(e));
}
var Hn = null, Un = 0, Wn = null;
function Gn(e) {
	Wn = e;
}
var Kn = 1, qn = 0, Jn = qn;
function Yn(e) {
	Jn = e;
}
function Xn() {
	return ++Kn;
}
function Zn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Zn(a) && jt(a), a.wv > e.wv) return !0;
		}
		t & 512 && et === null && P(e, h);
	}
	return !1;
}
function Qn(e, t, r = !0) {
	var i = e.reactions;
	if (i !== null && !(!M && Bn !== null && n.call(Bn, e))) for (var a = 0; a < i.length; a++) {
		var o = i[a];
		o.f & 2 ? Qn(o, t, !1) : t === o && (r ? P(o, g) : o.f & 1024 && P(o, _), ht(o));
	}
}
function $n(e) {
	var t = Hn, n = Un, r = Wn, i = U, a = Bn, o = N, s = Ln, c = Jn, l = e.f;
	Hn = null, Un = 0, Wn = null, U = l & 96 ? null : e, Bn = null, Fe(e.ctx), Ln = !1, Jn = ++qn, e.ac !== null && (sn(() => {
		e.ac.abort(T);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (Hn !== null) {
			var m;
			if (p || tr(e, Un), f !== null && Un > 0) for (f.length = Un + Hn.length, m = 0; m < Hn.length; m++) f[Un + m] = Hn[m];
			else e.deps = f = Hn;
			if (fn() && e.f & 512) for (m = Un; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Un < f.length && (tr(e, Un), f.length = Un);
		if (Re() && Wn !== null && !Ln && f !== null && !(e.f & 6146)) for (m = 0; m < Wn.length; m++) Qn(Wn[m], e);
		if (i !== null && i !== e) {
			if (qn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = qn;
			if (t !== null) for (let e of t) e.rv = qn;
			Wn !== null && (r === null ? r = Wn : r.push(...Wn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return Ue(e);
	} finally {
		e.f ^= ne, Hn = t, Un = n, Wn = r, U = i, Bn = a, Fe(o), Ln = s, Jn = c;
	}
}
function er(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Hn === null || !n.call(Hn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== D && Ke(s), Mt(s), tr(s, 0);
	}
}
function tr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) er(e, n[r]);
}
function nr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, h);
		var n = W, r = Pn;
		W = e, Pn = !0;
		try {
			t & 16777232 ? wn(e) : Cn(e), Sn(e);
			var i = $n(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Kn;
		} finally {
			Pn = r, W = n;
		}
	}
}
async function rr() {
	if (M) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), lt();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (Nn?.add(e), U !== null && !Ln && !(W !== null && W.f & 16384) && (Bn === null || !n.call(Bn, e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < qn && (e.rv = qn, Hn === null && r !== null && r[Un] === e ? Un++ : Hn === null ? Hn = [e] : Hn.push(e));
		else {
			(U.deps ??= []).push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Fn && Ft.has(e)) return Ft.get(e);
	if (t) {
		var a = e;
		if (Fn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || ar(a)) && (o = At(a)), Ft.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Ln && U !== null && (Pn || (U.f & 512) != 0), c = (a.f & b) === 0;
		Zn(a) && (s && (a.f |= 512), jt(a)), s && !c && (Nt(a), ir(a));
	}
	if (et?.has(e)) return et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ir(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Nt(t), ir(t));
}
function ar(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ft.has(t) || t.f & 2 && ar(t)) return !0;
	return !1;
}
function or(e) {
	var t = Ln;
	try {
		return Ln = !0, e();
	} finally {
		Ln = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var sr = ["touchstart", "touchmove"];
function cr(e) {
	return sr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dev/css.js
var lr = Symbol("events"), ur = /* @__PURE__ */ new Set(), dr = /* @__PURE__ */ new Set();
function fr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || gr.call(t, e), !e.cancelBubble) return sn(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ve(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function pr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = fr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && pn(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[lr] ??= {})[e] = n;
}
function mr(e) {
	for (var t = 0; t < e.length; t++) ur.add(e[t]);
	for (var n of dr) n(e);
}
var hr = null;
function gr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	hr = e;
	var s = 0, c = hr === e && e[lr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[lr] = t;
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
		var d = U, f = W;
		Rn(null), zn(null);
		try {
			for (var p, m = []; o !== null;) {
				var h = o.assignedSlot || o.parentNode || o.host || null;
				try {
					var g = o[lr]?.[r];
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
			e[lr] = t, delete e.currentTarget, Rn(d), zn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var _r = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function vr(e) {
	return _r?.createHTML(e) ?? e;
}
function yr(e) {
	var t = nn("template");
	return t.innerHTML = vr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function br(e, t) {
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/* @__NO_SIDE_EFFECTS__ */
function q(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (k) return br(A, null), A;
		i === void 0 && (i = yr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Qt(i)));
		var t = r || qt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Qt(t), s = t.lastChild;
			br(o, s);
		} else br(t, t);
		return t;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function xr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = (t & 1) != 0, a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (k) return br(A, null), A;
		if (!o) {
			var e = /* @__PURE__ */ Qt(yr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Qt(e);) o.appendChild(/* @__PURE__ */ Qt(e));
			else o = /* @__PURE__ */ Qt(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Qt(t), r = t.lastChild;
			br(n, r);
		} else br(t, t);
		return t;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Sr(e, t) {
	return /* @__PURE__ */ xr(e, t, "svg");
}
function Cr(e = "") {
	if (!k) {
		var t = Zt(e + "");
		return br(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? rn(n) : (n.before(n = Zt()), Ee(n)), br(n, n), n;
}
function wr() {
	if (k) return br(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Zt();
	return e.append(t, n), br(t, n), e;
}
function J(e, t) {
	if (k) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), De();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function Tr(e, t) {
	return Dr(e, t);
}
var Er = /* @__PURE__ */ new Map();
function Dr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Xt();
	var l = void 0, u = gn(() => {
		var s = n ?? t.appendChild(Zt());
		bt(s, { pending: () => {} }, (t) => {
			Ie({});
			var n = N;
			if (o && (n.c = o), a && (i.$$events = a), k && br(t, null), l = e(t, i) || {}, k && (W.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw Ce(), be;
			Le();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = cr(r);
					for (let e of [t, document]) {
						var a = Er.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Er.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, gr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(ur)), dr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Er.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, gr), r.delete(e), r.size === 0 && Er.delete(n)) : r.set(e, i);
			}
			dr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Or.set(l, u), l;
}
var Or = /* @__PURE__ */ new WeakMap();
function kr(e, t) {
	let n = Or.get(e);
	return n ? (Or.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Ar = class {
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
			if (n) An(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Tn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Mn(r, t), t.append(Zt()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Tn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), On(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Tn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = F, r = tn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = Zt();
			i.append(a), this.#n.set(e, {
				effect: xn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, xn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	k && (r = A, De());
	var i = new Ar(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				Ee(a), i.anchor = a, Te(!1), i.ensure(e, t), Te(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	bn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/key.js
var jr = Symbol("NaN");
function Mr(e, t, n) {
	k && De();
	var r = new Ar(e), i = !Re();
	bn(() => {
		var e = t();
		e !== e && (e = jr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Nr(e, t) {
	return t;
}
function Pr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		On(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Fr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			en(d), d.append(u), e.items.clear();
		}
		Fr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Fr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Mn(a, document.createDocumentFragment())) : Tn(t[i], n);
	}
}
var Ir;
function Z(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? Ee(/* @__PURE__ */ Qt(u)) : u.appendChild(Zt());
	}
	k && De();
	var d = null, f = /* @__PURE__ */ Ot(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Rr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Br(d, null, c)) : An(d) : On(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: bn(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			k && Ae(c) === "[!" != (e === 0) && (c = ke(), Ee(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = tn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Te(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && zt(S.v, b), S.i && zt(S.i, y), v && u.unskip_effect(S.e)) : (S = zr(l, h ? c : Ir ??= Zt(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = xn(() => s(c)) : (d = xn(() => s(Ir ??= Zt())), d.f |= w)), e > r.size && ue("", "", ""), k && e > 0 && Ee(ke()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Te(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Lr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Rr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Lr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (An(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) Br(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Vr(e, d, _), Vr(e, _, y), Br(_, y, n), d = _, p = [], m = [], l = Lr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Br(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Vr(e, S.prev, C.next), Vr(e, d, S), Vr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Br(_, l, n), Vr(e, _.prev, _.next), Vr(e, _, d === null ? e.effect.first : d.next), Vr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Lr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Lr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Fr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Lr(l.next);
		var te = ee.length;
		if (te > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Pr(e, ee, ne);
		}
	}
	o && Ve(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function zr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Lt(n) : /* @__PURE__ */ Rt(n, !1, !1) : null, l = o & 2 ? Lt(i) : null;
	return {
		v: c,
		i: l,
		e: xn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Br(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ $t(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Vr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Hr(e, t, ...n) {
	var r = new Ar(e);
	bn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, S);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var Ur = () => performance.now(), Wr = {
	tick: (e) => requestAnimationFrame(e),
	now: () => Ur(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function Gr() {
	let e = Wr.now();
	Wr.tasks.forEach((t) => {
		t.c(e) || (Wr.tasks.delete(t), t.f());
	}), Wr.tasks.size !== 0 && Wr.tick(Gr);
}
function Kr(e) {
	let t;
	return Wr.tasks.size === 0 && Wr.tick(Gr), {
		promise: new Promise((n) => {
			Wr.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			Wr.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/css.js
function qr(e, t) {
	_n(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = nn("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Jr = [..." 	\n\r\f\xA0\v﻿"];
function Yr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Jr.includes(r[o - 1])) && (s === r.length || Jr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Xr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Zr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Qr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Zr)), i && c.push(...Object.keys(i).map(Zr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Zr(e.substring(l, u).trim());
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
		return r && (n += Xr(r)), i && (n += Xr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Q(e, t, n, r, i, a) {
	var o = e.__className;
	if (k || o !== n || o === void 0) {
		var s = Yr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e.__className = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function $r(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ei(e, t, n, r) {
	var i = e.__style;
	if (k || i !== t) {
		var a = Qr(t, r);
		(!k || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e.__style = t;
	} else r && (Array.isArray(r) ? ($r(e, n?.[0], r[0]), $r(e, n?.[1], r[1], "important")) : $r(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ti(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return we();
		for (var i of t.options) i.selected = n.includes(ii(i));
		return;
	}
	for (i of t.options) if (Gt(ii(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function ni(e) {
	var t = new MutationObserver(() => {
		ti(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), pn(() => {
		t.disconnect();
	});
}
function ri(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	cn(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ii);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ii(o);
		}
		n(a), e.__value = a, F !== null && r.add(F);
	}), _n(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = M ? $e : F;
			if (r.has(o)) return;
		}
		if (ti(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ii(s), n(a));
		}
		e.__value = a, i = !1;
	}), ni(e);
}
function ii(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ai = Symbol("is custom element"), oi = Symbol("is html"), si = E ? "link" : "LINK", ci = E ? "progress" : "PROGRESS";
function li(e) {
	if (k) {
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
		e.__on_r = n, Ve(n), on();
	}
}
function ui(e, t) {
	var n = fi(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ci) || (e.value = t ?? "");
}
function di(e, t) {
	var n = fi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = fi(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === si) || i[t] !== (i[t] = n) && (t === "loading" && (e[se] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && mi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function fi(e) {
	return e.__attributes ??= {
		[ai]: e.nodeName.includes("-"),
		[oi]: e.namespaceURI === xe
	};
}
var pi = /* @__PURE__ */ new Map();
function mi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = pi.get(t);
	if (n) return n;
	pi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function hi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	cn(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = gi(e) ? _i(a) : a, n(a), F !== null && r.add(F), await rr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || or(t) == null && e.value) && (n(gi(e) ? _i(e.value) : e.value), F !== null && r.add(F)), yn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M ? $e : F;
			if (r.has(i)) return;
		}
		gi(e) && n === _i(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function gi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function _i(e) {
	return e === "" ? null : +e;
}
var vi = /* @__PURE__ */ new class e {
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
function yi(e, t, n) {
	var r = vi.observe(e, () => n(e[t]));
	_n(() => (or(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function bi(e, t) {
	return e === t || e?.[ae] === t;
}
function xi(e = {}, t, n, r) {
	var i = N.r, a = W;
	return _n(() => {
		var o, s;
		return yn(() => {
			o = s, s = r?.() || [], or(() => {
				e !== n(...s) && (t(e, ...s), o && bi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && bi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Si(e, t, n, r) {
	var i = !Pe || (n & 2) != 0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = () => (l && (l = !1, c = s ? or(r) : r), c);
	let d;
	if (o) {
		var f = ae in e || oe in e;
		d = a(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	o ? [p, m] = Ze(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && he(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Et : Ot)(() => (_ = !1, h()));
	o && G(v);
	var y = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(v) : i && o ? Ut(e) : e;
			return R(v, n), _ = !0, c !== void 0 && (c = n), e;
		}
		return Fn && _ || y.f & 16384 ? v.v : G(v);
	});
}
function Ci(e) {
	N === null && ce("onMount"), Pe && N.l !== null ? wi(N).m.push(e) : mn(() => {
		let t = or(e);
		if (typeof t == "function") return t;
	});
}
function wi(e) {
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
var Ti = /* @__PURE__ */ q("<span class=\"code svelte-1yw30n5\"> </span>"), Ei = /* @__PURE__ */ q("<section class=\"panel svelte-1yw30n5\"><header><!> <span class=\"title svelte-1yw30n5\"> <!></span> <span class=\"right svelte-1yw30n5\"><!></span></header> <div class=\"body svelte-1yw30n5\"><!></div></section>"), Di = {
	hash: "svelte-1yw30n5",
	code: ".panel.svelte-1yw30n5 {background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;min-height:0;}header.svelte-1yw30n5 {min-height:53px;flex-shrink:0;padding:4px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border);font-family:var(--font-sans);}.code.svelte-1yw30n5 {display:none;}.title.svelte-1yw30n5 {display:flex;align-items:center;gap:14px;font-size:19px;color:var(--text);letter-spacing:0;font-weight:600;flex:1;}.right.svelte-1yw30n5 {display:flex;align-items:center;justify-content:flex-end;margin-left:auto;gap:6px;}.body.svelte-1yw30n5 {flex:1;min-height:0;overflow:auto;}\n  @media (max-width: 900px) {header.stack-actions.svelte-1yw30n5 {flex-wrap:wrap;justify-content:center;}header.stack-actions.svelte-1yw30n5 .title:where(.svelte-1yw30n5) {flex-basis:100%;flex-wrap:wrap;justify-content:center;text-align:center;}header.stack-actions.svelte-1yw30n5 .right:where(.svelte-1yw30n5) {max-width:100%;margin-inline:auto;justify-content:center;} }\n  @media (max-width: 600px) {header.svelte-1yw30n5 {padding:4px 12px;flex-wrap:wrap;gap:12px;}.title.svelte-1yw30n5 {min-width:140px;}.right.svelte-1yw30n5 {flex-wrap:wrap;} }"
};
function Oi(e, t) {
	qr(e, Di);
	let n = Si(t, "stackActions", 3, !1);
	var r = Ei(), i = z(r);
	let a;
	var o = z(i), s = (e) => {
		var n = Ti(), r = z(n, !0);
		j(n), H(() => Y(r, t.code)), J(e, n);
	};
	X(o, (e) => {
		t.code && e(s);
	});
	var c = V(o, 2), l = z(c, !0), u = V(l), d = (e) => {
		var n = wr();
		Hr(B(n), () => t.titleControl), J(e, n);
	};
	X(u, (e) => {
		t.titleControl && e(d);
	}), j(c);
	var f = V(c, 2), p = z(f), m = (e) => {
		var n = wr();
		Hr(B(n), () => t.right), J(e, n);
	};
	X(p, (e) => {
		t.right && e(m);
	}), j(f), j(i);
	var h = V(i, 2);
	Hr(z(h), () => t.children), j(h), j(r), H(() => {
		a = Q(i, 1, "svelte-1yw30n5", null, a, { "stack-actions": n() }), Y(l, t.title);
	}), J(e, r);
}
//#endregion
//#region src/components/chrome/BankCycle.svelte
var ki = /* @__PURE__ */ q("<button type=\"button\" class=\"chip hi bank-cycle svelte-10mv487\"> </button>"), Ai = {
	hash: "svelte-10mv487",
	code: ".bank-cycle.svelte-10mv487 {min-width:70px;}"
};
function ji(e, t) {
	Ie(t, !0), qr(e, Ai);
	let n = Si(t, "label", 3, "EQ bank"), r = Si(t, "mono", 3, !1);
	var i = ki(), a = z(i, !0);
	j(i), H(() => {
		$(i, "aria-label", `${n()}: ${r() ? "Mono" : t.value === 0 ? "Left" : "Right"}`), $(i, "aria-disabled", r()), Y(a, r() ? "Mono" : t.value === 0 ? "Left" : "Right");
	}), K("click", i, () => {
		r() || t.onChange(+(t.value === 0));
	}), J(e, i), Le();
}
mr(["click"]);
//#endregion
//#region src/styles/palette.ts
function Mi(e, t = "base") {
	return e === 0 ? "#efeee9" : "#8bb8c1";
}
var Ni = {
	preamp: "#e6b45f",
	balance: "#b598ef",
	peq: "#64b8ec",
	fir: "#67c9aa",
	loudness: "#e69ab9"
}, Pi = [
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
], Fi = (e) => Pi[e % Pi.length], Ii = {
	Flat: 0,
	Peaking: 1
}, Li = 2e4, Ri = .1, zi = .01, Bi = .1, Vi = .1, Hi = [-25, 25];
//#endregion
//#region src/components/chrome/valueFieldFormat.ts
function Ui(e) {
	return e > 0 ? "+" : e < 0 ? "−" : " ";
}
var Wi = {
	dB: {
		defaultPrecision: 2,
		defaultUnit: "dB",
		format: (e, t) => e.toFixed(t)
	},
	"dB-signed": {
		defaultPrecision: 2,
		defaultUnit: "dB",
		format: (e, t) => Ui(e) + Math.abs(e).toFixed(t)
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
function Gi(e) {
	return Wi[e].defaultPrecision;
}
function Ki(e) {
	return Wi[e].defaultUnit;
}
function qi(e, t, n) {
	return Wi[e].format(t, n);
}
function Ji(e) {
	if (!e) return 0;
	let t = String(e), n = t.indexOf(".");
	return n < 0 ? 0 : Math.min(6, t.length - n - 1);
}
function Yi(e, t, n, r, i = !0) {
	let a = e.replace(",", ".").replace(/[^\d.\-+eE]/g, ""), o = parseFloat(a);
	if (!Number.isFinite(o)) return null;
	let s = o;
	if (i) s < t && (s = t), s > n && (s = n);
	else if (s < t || s > n) return null;
	return r > 0 && (s = Math.round(s / r) * r, s = +s.toFixed(Ji(r))), s;
}
//#endregion
//#region src/components/chrome/ValueField.svelte
var Xi = /* @__PURE__ */ q("<input type=\"text\" inputmode=\"decimal\" spellcheck=\"false\" autocomplete=\"off\" class=\"svelte-1o0ixzo\"/>"), Zi = /* @__PURE__ */ q("<span class=\"unit svelte-1o0ixzo\"> </span>"), Qi = /* @__PURE__ */ q("<span class=\"display svelte-1o0ixzo\"><span class=\"num svelte-1o0ixzo\"> </span> <!></span>"), $i = /* @__PURE__ */ q("<div role=\"button\"><!></div>"), ea = {
	hash: "svelte-1o0ixzo",
	code: ".vf.svelte-1o0ixzo {position:relative;display:flex;align-items:center;box-sizing:border-box;width:100%;border:none;border-radius:0;background:transparent;box-shadow:inset 0 -1px 0 0 color-mix(in oklab, var(--text) 14%, transparent);color:var(--text);font-family:var(--font-sans);cursor:pointer;user-select:none;transition:background 80ms, box-shadow 80ms;outline:none;}.vf.svelte-1o0ixzo:focus-visible {box-shadow:inset 0 -1px 0 0 var(--accent),\n      0 0 0 2px color-mix(in oklab, var(--accent) 35%, transparent);}.vf[data-size=\"sm\"].svelte-1o0ixzo {height:40px;padding:0 8px;font-size:17px;}.vf[data-size=\"md\"].svelte-1o0ixzo {height:44px;padding:0 10px;font-size:20px;}.vf[data-align=\"center\"].svelte-1o0ixzo {justify-content:center;}.vf[data-align=\"right\"].svelte-1o0ixzo  {justify-content:flex-end;}.vf.hover.svelte-1o0ixzo:not(.editing):not(.disabled) {background:var(--wash);box-shadow:inset 0 -1px 0 0 color-mix(in oklab, var(--text) 32%, transparent),\n      0 -2px 6px -2px color-mix(in oklab, var(--text) 18%, transparent) inset;}.vf.editing.svelte-1o0ixzo {background:color-mix(in oklab, var(--accent) 6%, transparent);box-shadow:inset 0 -1px 0 0 var(--accent),\n      0 0 0 1px var(--accent);cursor:text;}.vf.editing.invalid.svelte-1o0ixzo {background:color-mix(in oklab, var(--err) 10%, transparent);box-shadow:inset 0 -1px 0 0 var(--err),\n      0 0 0 1px var(--err);}.vf.editing.invalid.svelte-1o0ixzo input:where(.svelte-1o0ixzo) {color:var(--err);}.vf.disabled.svelte-1o0ixzo {cursor:default;\n    /* Single dim layer (U-P3 policy B): the container this sits in stays\n       full-contrast; this is the one opacity dim on the control itself. */opacity:var(--dim-disabled);}.display.svelte-1o0ixzo {display:inline-flex;align-items:baseline;gap:3px;white-space:nowrap;}.num.svelte-1o0ixzo {color:var(--toneColor);font-variant-numeric:tabular-nums;font-weight:500;}.vf.svelte-1o0ixzo .unit:where(.svelte-1o0ixzo) {color:var(--text-faint);font-size:14px;}.vf[data-size=\"sm\"].svelte-1o0ixzo .unit:where(.svelte-1o0ixzo) {font-size:14px;}input.svelte-1o0ixzo {position:absolute;inset:0;width:100%;height:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:inherit;font-size:inherit;text-align:inherit;padding:0 8px;box-sizing:border-box;font-variant-numeric:tabular-nums;}.vf[data-size=\"sm\"].svelte-1o0ixzo input:where(.svelte-1o0ixzo) {padding:0 6px;}.vf[data-align=\"center\"].svelte-1o0ixzo input:where(.svelte-1o0ixzo) {text-align:center;}.vf[data-align=\"right\"].svelte-1o0ixzo  input:where(.svelte-1o0ixzo) {text-align:right;}"
};
function ta(e, t) {
	Ie(t, !0), qr(e, ea);
	let n = Si(t, "align", 3, "right"), r = Si(t, "size", 3, "md"), i = Si(t, "disabled", 3, !1), a = Si(t, "clamp", 3, !0), o = /* @__PURE__ */ I(() => t.precision ?? Gi(t.kind)), s = /* @__PURE__ */ I(() => t.step ?? 10 ** -G(o)), c = /* @__PURE__ */ I(() => t.unit ?? Ki(t.kind)), l = /* @__PURE__ */ I(() => t.floorLabel !== void 0 && t.value <= t.min), u = /* @__PURE__ */ I(() => t.ceilLabel !== void 0 && t.value >= t.max), d = /* @__PURE__ */ I(() => G(l) ? t.floorLabel : G(u) ? t.ceilLabel : qi(t.kind, t.value, G(o))), f = /* @__PURE__ */ I(() => i() ? "var(--text-faint)" : t.tone === "signed" && t.value > 0 ? "var(--number-positive)" : t.tone === "signed" && t.value < 0 ? "var(--number-negative)" : "var(--text)"), p = /* @__PURE__ */ L(!1), m = /* @__PURE__ */ L(""), h = /* @__PURE__ */ L(!1), g = /* @__PURE__ */ L(!1), _ = /* @__PURE__ */ L(null), v = 0, y = !1;
	async function b() {
		i() || G(p) || (v = t.value, R(m, t.value.toFixed(G(o)), !0), R(p, !0), R(g, !1), await rr(), G(_)?.focus(), G(_)?.select());
	}
	function x(e) {
		if (y) {
			y = !1;
			return;
		}
		let n = Yi(G(m), t.min, t.max, G(s), a());
		if (n === null) {
			if (e) {
				R(g, !0);
				return;
			}
			R(p, !1);
			return;
		}
		R(p, !1), n !== v && t.onChange(n);
	}
	function S() {
		y = !0, R(g, !1), R(p, !1);
	}
	function C(e) {
		e.key === "Enter" ? (e.preventDefault(), e.stopPropagation(), x(!0)) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), S());
	}
	function ee() {
		G(g) && R(g, !1);
	}
	var w = $i();
	let te, ne;
	var re = z(w), ie = (e) => {
		var t = Xi();
		li(t), xi(t, (e) => R(_, e), () => G(_)), K("input", t, ee), pr("blur", t, () => x(!1)), K("keydown", t, C), hi(t, () => G(m), (e) => R(m, e)), J(e, t);
	}, ae = (e) => {
		var t = Qi(), n = z(t), r = z(n, !0);
		j(n);
		var i = V(n, 2), a = (e) => {
			var t = Zi(), n = z(t, !0);
			j(t), H(() => Y(n, G(c))), J(e, t);
		};
		X(i, (e) => {
			G(c) && !G(l) && !G(u) && e(a);
		}), j(t), H(() => Y(r, G(d))), J(e, t);
	};
	X(re, (e) => {
		G(p) ? e(ie) : e(ae, -1);
	}), j(w), H(() => {
		te = Q(w, 1, "vf svelte-1o0ixzo", null, te, {
			editing: G(p),
			invalid: G(g),
			hover: G(h),
			disabled: i()
		}), $(w, "data-align", n()), $(w, "data-size", r()), $(w, "tabindex", i() ? -1 : 0), $(w, "aria-disabled", i()), ne = ei(w, "", ne, { "--toneColor": G(f) });
	}), K("click", w, b), pr("mouseenter", w, () => R(h, !0)), pr("mouseleave", w, () => R(h, !1)), K("keydown", w, (e) => {
		!G(p) && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), b());
	}), J(e, w), Le();
}
mr([
	"click",
	"keydown",
	"input"
]);
//#endregion
//#region src/components/eq/BandTypeSelect.svelte
var na = /* @__PURE__ */ q("<option class=\"svelte-8pr11s\"> </option>"), ra = /* @__PURE__ */ q("<option disabled=\"\" class=\"svelte-8pr11s\"> </option>"), ia = /* @__PURE__ */ q("<select><!><!></select>"), aa = {
	hash: "svelte-8pr11s",
	code: ".bts.svelte-8pr11s {width:125px;max-width:100%;justify-self:start;background:transparent;color:var(--text);border:1px solid transparent;border-radius:var(--radius-s);padding:2px 4px;font-family:var(--font-sans);font-size:15px;min-height:32px;cursor:pointer;appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg, transparent 50%, var(--text-faint) 50%),\n      linear-gradient(135deg, var(--text-faint) 50%, transparent 50%);background-position:calc(100% - 8px) center,\n      calc(100% - 4px) center;background-size:4px 4px, 4px 4px;background-repeat:no-repeat;padding-right:16px;}.bts.svelte-8pr11s:hover {background-color:var(--wash-strong);}.bts.svelte-8pr11s:focus {outline:none;}.bts.svelte-8pr11s:focus-visible {border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in oklab, var(--accent) 35%, transparent);}.bts.off.svelte-8pr11s {color:var(--text-faint);}.bts.svelte-8pr11s option:where(.svelte-8pr11s) {background:var(--panel-solid);color:var(--text);}"
};
function oa(e, t) {
	Ie(t, !0), qr(e, aa);
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
	}, r = Si(t, "types", 19, () => [
		Ii.Peaking,
		1002,
		1003,
		1004,
		1005,
		1007,
		1008,
		1009
	]), i = /* @__PURE__ */ I(() => t.value === Ii.Flat), a = /* @__PURE__ */ I(() => !r().includes(t.value));
	var o = ia();
	let s;
	var c = z(o);
	Z(c, 16, r, (e) => e, (e, t) => {
		var r = na(), i = z(r, !0);
		j(r);
		var a = {};
		H(() => {
			Y(i, n[t]), a !== (a = t) && (r.value = (r.__value = t) ?? "");
		}), J(e, r);
	});
	var l = V(c), u = (e) => {
		var r = ra(), i = z(r, !0);
		j(r);
		var a = {};
		H(() => {
			Y(i, n[t.value] ?? `Device filter ${t.value - 1e3}`), a !== (a = t.value) && (r.value = (r.__value = t.value) ?? "");
		}), J(e, r);
	};
	X(l, (e) => {
		G(a) && e(u);
	}), j(o);
	var d;
	ni(o), H(() => {
		s = Q(o, 1, "bts svelte-8pr11s", null, s, { off: G(i) }), d !== (d = t.value) && (o.value = (o.__value = t.value) ?? "", ti(o, t.value));
	}), K("change", o, (e) => t.onChange(Number(e.currentTarget.value))), J(e, o), Le();
}
mr(["change"]);
//#endregion
//#region src/components/eq/BandRow.svelte
var sa = "var(--band-columns, 28px 56px minmax(0, 1fr) 104px 80px 104px)", ca = /* @__PURE__ */ q("<div role=\"button\" tabindex=\"0\"><div class=\"num svelte-dle8ao\"> </div> <button><svg width=\"48\" height=\"26\" viewBox=\"0 0 48 26\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path></path></svg></button> <!> <!> <!> <!></div>"), la = {
	hash: "svelte-dle8ao",
	code: ".row.svelte-dle8ao .vf[data-size=\"md\"] {height:32px;font-size:18px;}.row.svelte-dle8ao:hover {background:var(--wash);cursor:pointer;}.row.selected.svelte-dle8ao {background:var(--wash-strong);box-shadow:inset 3px 0 var(--band-color);}.row.svelte-dle8ao {display:grid;\n    /* grid-template-columns set inline (BAND_ROW_COLS). */gap:8px;padding:0 14px;align-items:center;border-top:1px solid var(--wash);font-family:var(--font-sans);font-size:17px;}\n  /* U-P3 policy B: no whole-row dim when the band is off (type = Flat). The\n     row's structure and the FLAT type stay full-contrast; the freq/Q/gain\n     ValueFields below are disabled in that state and carry the single dim\n     layer alone. */.row.bypassed.svelte-dle8ao {opacity:0.45;}.num.svelte-dle8ao {color:var(--band-color);font-weight:600;font-size:17px;font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\";letter-spacing:0;}.byp.svelte-dle8ao {display:inline-flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;border-radius:var(--radius-s);background:transparent;border:1px solid transparent;color:var(--text-dim);cursor:pointer;}.byp.svelte-dle8ao:hover:not(:disabled) {color:var(--text);background:var(--wash);}.byp.svelte-dle8ao:disabled {opacity:var(--dim-disabled);cursor:default;}.byp.on.svelte-dle8ao {color:var(--warn);}"
};
function ua(e, t) {
	Ie(t, !0), qr(e, la);
	let n = /* @__PURE__ */ I(() => t.band.type === Ii.Flat), r = /* @__PURE__ */ I(() => t.band.bypass), i = /* @__PURE__ */ I(() => ({
		[Ii.Peaking]: t.band.gain < 0 ? "M3 12 C14 12 15 21 24 21 S34 12 45 12" : "M3 18 C14 18 15 3 24 3 S34 18 45 18",
		1002: "M3 5 H20 C29 5 30 19 45 21",
		1003: "M3 21 C18 19 19 5 28 5 H45",
		1004: "M3 21 C14 21 15 4 24 4 S34 21 45 21",
		1005: "M3 5 H14 C20 5 20 21 24 21 S28 5 34 5 H45",
		1007: t.band.gain < 0 ? "M3 20 H15 C25 20 23 5 33 5 H45" : "M3 5 H15 C25 5 23 20 33 20 H45",
		1008: t.band.gain < 0 ? "M3 5 H15 C25 5 23 20 33 20 H45" : "M3 20 H15 C25 20 23 5 33 5 H45",
		1009: "M3 12 H45"
	})[t.band.type] ?? "M3 12 H45");
	var a = ca();
	let o, s;
	var c = z(a), l = z(c, !0);
	j(c);
	var u = V(c, 2);
	let d;
	var f = z(u), p = z(f);
	j(f), j(u);
	var m = V(u, 2);
	oa(m, {
		get value() {
			return t.band.type;
		},
		onChange: (e) => t.onPatch({ type: e }),
		get types() {
			return t.types;
		}
	});
	var h = V(m, 2);
	{
		let e = /* @__PURE__ */ I(() => G(n) || G(r));
		ta(h, {
			kind: "hz",
			get value() {
				return t.band.frequency;
			},
			get min() {
				return 20;
			},
			get max() {
				return Li;
			},
			get step() {
				return 1;
			},
			align: "right",
			get disabled() {
				return G(e);
			},
			onChange: (e) => t.onPatch({ frequency: e })
		});
	}
	var g = V(h, 2);
	{
		let e = /* @__PURE__ */ I(() => G(n) || G(r));
		ta(g, {
			kind: "q",
			get value() {
				return t.band.q;
			},
			get min() {
				return Ri;
			},
			get max() {
				return 100;
			},
			get step() {
				return zi;
			},
			align: "right",
			get disabled() {
				return G(e);
			},
			onChange: (e) => t.onPatch({ q: e })
		});
	}
	var _ = V(g, 2);
	{
		let e = /* @__PURE__ */ I(() => G(n) || G(r) || [
			1002,
			1003,
			1004,
			1005
		].includes(t.band.type));
		ta(_, {
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
				return Bi;
			},
			tone: "signed",
			align: "right",
			get disabled() {
				return G(e);
			},
			onChange: (e) => t.onPatch({ gain: e })
		});
	}
	j(a), H((e, c) => {
		o = Q(a, 1, "row svelte-dle8ao", null, o, {
			selected: t.selected,
			bypassed: G(r)
		}), $(a, "aria-label", `Select band ${t.index + 1}`), $(a, "aria-pressed", t.selected), s = ei(a, "", s, e), Y(l, c), d = Q(u, 1, "byp svelte-dle8ao", null, d, { on: G(r) }), $(u, "title", G(r) ? "Enable Band" : "Disable Band"), $(u, "aria-label", G(r) ? "Enable Band" : "Disable Band"), $(u, "aria-pressed", !G(r)), u.disabled = G(n), $(p, "d", G(i));
	}, [() => ({
		"--band-color": Fi(t.index),
		"grid-template-columns": sa
	}), () => String(t.index + 1).padStart(2, "0")]), K("keydown", a, (e) => {
		e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.onSelect());
	}), K("click", a, function(...e) {
		t.onSelect?.apply(this, e);
	}), K("focusin", a, function(...e) {
		t.onSelect?.apply(this, e);
	}), K("click", u, () => t.onPatch({ bypass: !G(r) })), J(e, a), Le();
}
mr([
	"keydown",
	"click",
	"focusin"
]);
//#endregion
//#region src/components/eq/BandsPanel.svelte
var da = (e, t = d) => {
	var n = fa(), r = V(z(n));
	j(n), H(() => $(r, "d", t() ? "M5 7V5a3 3 0 0 1 6 0v2" : "M5 7V5a3 3 0 0 1 5.6-1.5")), J(e, n);
}, fa = /* @__PURE__ */ Sr("<svg width=\"12\" height=\"12\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"7\" width=\"10\" height=\"7\" rx=\"1.5\"></rect><path></path></svg>"), pa = /* @__PURE__ */ q("<label class=\"toggle-label\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/></label>"), ma = /* @__PURE__ */ q("<button><!>LINK</button>"), ha = /* @__PURE__ */ q("<button class=\"chip hi act\" title=\"Browse the AutoEQ profile library\">AUTOEQ</button>"), ga = /* @__PURE__ */ q("<button class=\"chip hi act\">Set Both Channels</button>"), _a = /* @__PURE__ */ q("<!> <!> <!> <!> <button class=\"chip hi act\">Reset</button>", 1), va = /* @__PURE__ */ q("<div class=\"head svelte-161tldd\"><div>#</div> <div></div> <div>Filter</div> <div class=\"r svelte-161tldd\">Frequency</div> <div class=\"r svelte-161tldd\">Q</div> <div class=\"r svelte-161tldd\">Gain</div></div> <!>", 1), ya = /* @__PURE__ */ q("<div class=\"band-table svelte-161tldd\"><!></div>"), ba = {
	hash: "svelte-161tldd",
	code: ".band-table.svelte-161tldd {min-width:0;}\n  @media (max-width: 600px) {.band-table.svelte-161tldd {--band-columns: 20px 44px minmax(68px, 1fr) minmax(62px, .85fr) minmax(38px, .5fr) minmax(70px, .85fr);}.band-table.svelte-161tldd .row, .head.svelte-161tldd {gap:4px;padding-left:8px;padding-right:8px;}.band-table.svelte-161tldd .row .vf[data-size=\"md\"] {padding-left:2px;padding-right:2px;font-size:14px;}.band-table.svelte-161tldd .row .vf .unit {font-size:11px;}.band-table.svelte-161tldd .row .num {font-size:13px;}.band-table.svelte-161tldd .bts {font-size:13px;padding-left:2px;padding-right:20px !important;background-position:calc(100% - 11px) center, calc(100% - 7px) center !important;}.head.svelte-161tldd {font-size:11px;}\n  }.link.svelte-161tldd {display:inline-flex;align-items:center;gap:5px;}.head.svelte-161tldd {display:grid;\n    /* grid-template-columns set inline (BAND_ROW_COLS), matching BandRow. */gap:8px;padding:6px 14px;font-family:var(--font-sans);font-size:14px;color:var(--text-faint);letter-spacing:0;border-bottom:1px solid var(--border);}\n  /* Match ValueField's internal 8px horizontal padding so the numeric\n     labels sit directly above their right-aligned values. */.head.svelte-161tldd .r:where(.svelte-161tldd) {text-align:right;padding-right:8px;}"
};
function xa(e, t) {
	Ie(t, !0), qr(e, ba);
	let n = Si(t, "mono", 3, !1), r = Si(t, "stageLabel", 3, "PEQ"), i = /* @__PURE__ */ I(() => t.link.locked ? `Unlink from ${t.link.peerLabel}` : `Link with ${t.link.peerLabel}: edits mirror to them, copying this channel's EQ first`), a = /* @__PURE__ */ I(() => `${t.bands.length} Band ${r()}${t.link.locked ? ` · ${t.link.selectedShort}+${t.link.peerLabel}` : ""}`);
	var o = ya();
	Oi(z(o), {
		code: "EQ.02",
		get title() {
			return G(a);
		},
		titleControl: (e) => {
			var n = wr(), i = B(n), a = (e) => {
				var n = pa(), i = z(n);
				li(i), j(n), H(() => {
					$(i, "aria-label", `Enable ${r()}`), di(i, t.enabled);
				}), K("change", i, (e) => t.onEnable(e.currentTarget.checked)), J(e, n);
			};
			X(i, (e) => {
				t.enabled !== void 0 && e(a);
			}), J(e, n);
		},
		right: (e) => {
			var r = _a(), a = B(r);
			ji(a, {
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
			var o = V(a, 2), s = (e) => {
				var n = ma();
				let r;
				da(z(n), () => t.link.locked), Oe(), j(n), H(() => {
					r = Q(n, 1, "chip hi act link svelte-161tldd", null, r, { on: t.link.locked }), $(n, "title", G(i)), $(n, "aria-pressed", t.link.locked);
				}), K("click", n, function(...e) {
					t.onToggleLink?.apply(this, e);
				}), J(e, n);
			};
			X(o, (e) => {
				t.link.grouped && e(s);
			});
			var c = V(o, 2), l = (e) => {
				var n = ha();
				K("click", n, function(...e) {
					t.onLibrary?.apply(this, e);
				}), J(e, n);
			};
			X(c, (e) => {
				t.onLibrary && e(l);
			});
			var u = V(c, 2), d = (e) => {
				var n = ga();
				K("click", n, function(...e) {
					t.onSetBoth?.apply(this, e);
				}), J(e, n);
			};
			X(u, (e) => {
				n() || e(d);
			}), K("click", V(u, 2), function(...e) {
				t.onReset?.apply(this, e);
			}), J(e, r);
		},
		children: (e, n) => {
			var r = va(), i = B(r);
			let a;
			Z(V(i, 2), 17, () => t.bands, Nr, (e, n, r) => {
				{
					let i = /* @__PURE__ */ I(() => t.selectedBand === r);
					ua(e, {
						get selected() {
							return G(i);
						},
						onSelect: () => t.onSelect(r),
						index: r,
						get band() {
							return G(n);
						},
						onPatch: (e) => t.onPatch(r, e),
						get types() {
							return t.types;
						}
					});
				}
			}), H(() => a = ei(i, "", a, { "grid-template-columns": sa })), J(e, r);
		},
		$$slots: {
			titleControl: !0,
			right: !0,
			default: !0
		}
	}), j(o), J(e, o), Le();
}
mr(["change", "click"]);
//#endregion
//#region src/components/bode/bodeFreqs.ts
var Sa = 4097, Ca = 20, wa = Li, Ta = (() => {
	let e = Array(Sa), t = Math.log(Ca), n = Math.log(wa) - t;
	for (let r = 0; r < Sa; r++) e[r] = Math.exp(t + n * r / (Sa - 1));
	return e;
})();
function Ea(e) {
	return Ca * (wa / Ca) ** +e;
}
//#endregion
//#region src/components/bode/BodePlot.svelte
var Da = /* @__PURE__ */ Sr("<linearGradient x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\"><stop offset=\"0%\" stop-opacity=\"0.25\"></stop><stop offset=\"100%\" stop-opacity=\"0\"></stop></linearGradient>"), Oa = /* @__PURE__ */ Sr("<linearGradient gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\"></stop><stop offset=\"100%\"></stop></linearGradient>"), ka = /* @__PURE__ */ Sr("<line stroke=\"color-mix(in oklab, var(--text) 3.5%, transparent)\" stroke-width=\"0.5\" vector-effect=\"non-scaling-stroke\"></line>"), Aa = /* @__PURE__ */ Sr("<line vector-effect=\"non-scaling-stroke\"></line><text dominant-baseline=\"middle\" text-anchor=\"end\" font-size=\"14\" fill=\"var(--text-dim)\" font-family=\"var(--font-sans)\"> </text>", 1), ja = /* @__PURE__ */ Sr("<line stroke=\"color-mix(in oklab, var(--text) 10%, transparent)\" stroke-width=\"0.6\" vector-effect=\"non-scaling-stroke\"></line><text text-anchor=\"middle\" font-size=\"14\" fill=\"var(--text-dim)\" font-family=\"var(--font-sans)\"> </text>", 1), Ma = /* @__PURE__ */ Sr("<path vector-effect=\"non-scaling-stroke\"></path>"), Na = /* @__PURE__ */ Sr("<path class=\"band-fill\" stroke=\"none\"></path>"), Pa = /* @__PURE__ */ Sr("<path fill=\"none\" stroke-linecap=\"round\" vector-effect=\"non-scaling-stroke\"></path>"), Fa = /* @__PURE__ */ Sr("<text text-anchor=\"middle\" font-size=\"14\" fill=\"color-mix(in oklab, var(--text) 70%, transparent)\" font-family=\"var(--font-sans)\" pointer-events=\"none\"> </text>"), Ia = /* @__PURE__ */ Sr("<line stroke-opacity=\"0.25\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><circle r=\"3.5\" stroke=\"var(--bg)\" stroke-width=\"1.2\" pointer-events=\"none\"></circle><!>", 1), La = /* @__PURE__ */ Sr("<line stroke=\"color-mix(in oklab, var(--text) 35%, transparent)\" stroke-width=\"0.7\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><line stroke=\"color-mix(in oklab, var(--text) 25%, transparent)\" stroke-width=\"0.7\" stroke-dasharray=\"2 3\" vector-effect=\"non-scaling-stroke\" pointer-events=\"none\"></line><g pointer-events=\"none\"><rect x=\"0\" y=\"-20\" width=\"150\" height=\"28\" rx=\"5\" fill=\"var(--panel-hi)\" stroke=\"var(--border-hi)\" stroke-width=\"0.6\"></rect><text x=\"8\" y=\"-1\" font-size=\"14\" font-family=\"var(--font-sans)\" fill=\"color-mix(in oklab, var(--text) 92%, transparent)\"> </text></g>", 1), Ra = /* @__PURE__ */ q("<div class=\"bode-wrap svelte-mggv3i\"><svg width=\"100%\" role=\"img\" aria-label=\"Frequency response plot\"><defs><clipPath><rect y=\"0\"></rect></clipPath><!><!></defs><!><!><!><g><!><!><!><!></g><!></svg></div>"), za = {
	hash: "svelte-mggv3i",
	code: ".bode-wrap.svelte-mggv3i {width:100%;}.bode.pannable.svelte-mggv3i {cursor:grab;}.bode.dragging.svelte-mggv3i {cursor:grabbing;}.bode.svelte-mggv3i {display:block;touch-action:none;user-select:none;}"
};
function Ba(e, t) {
	Ie(t, !0), qr(e, za);
	let n = Si(t, "markers", 19, () => []), r = Si(t, "yRange", 19, () => [Hi[0], Hi[1]]), i = Si(t, "height", 3, 220), a = Si(t, "crosshair", 3, !0), o = Si(t, "zeroColor", 3, "#9e3d37"), s = /* @__PURE__ */ L(720), c = /* @__PURE__ */ I(() => Math.max(140, G(s))), l = /* @__PURE__ */ I(() => G(c) - 20), u = /* @__PURE__ */ I(() => r()[0]), d = /* @__PURE__ */ I(() => r()[1]), f = /* @__PURE__ */ I(() => G(l) - 42), p = /* @__PURE__ */ I(() => i() - 28), m = /* @__PURE__ */ I(() => {
		let e = Array(Sa);
		for (let t = 0; t < Sa; t++) e[t] = 42 + t / (Sa - 1) * G(f);
		return e;
	});
	function h(e) {
		return G(p) - (e - G(u)) / (G(d) - G(u)) * G(p);
	}
	function g(e) {
		return Math.log(e / 20) / Math.log(Li / 20);
	}
	function _(e) {
		return 42 + g(e) * G(f);
	}
	function v(e) {
		return e.map(([e, t], n) => `${n === 0 ? "M" : "L"} ${e} ${t}`).join(" ");
	}
	function y(e) {
		return e.color ? e.color : e.gradientChannelIds ? `url(#bodeGrad-${e.id})` : e.channelId == null ? "var(--accent)" : Mi(e.channelId, "bright");
	}
	function b(e) {
		return e.color ? e.color : e.channelId == null ? "var(--accent)" : Mi(e.channelId, "bright");
	}
	function x(e) {
		return Mi(e, "bright");
	}
	let S = /* @__PURE__ */ I(() => t.curves.map((e) => {
		let t = Array(Sa);
		for (let n = 0; n < Sa; n++) t[n] = [G(m)[n], h(e.points[n] ?? 0)];
		return {
			c: e,
			d: v(t),
			pts: t
		};
	})), C = /* @__PURE__ */ I(() => t.curves.length === 1), ee = [
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
	], w = /* @__PURE__ */ I(() => G(l) < 600 ? [
		20,
		80,
		320,
		1200,
		5e3,
		2e4
	] : ee), te = (() => {
		let e = new Set(ee), t = [];
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
	})(), ne = /* @__PURE__ */ I(() => {
		let e = (G(d) - G(u)) / 4, t = 10 ** Math.floor(Math.log10(e)), n = e / t, r = (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * t, i = Math.ceil(G(u) / r) * r, a = [];
		for (let e = i; e <= G(d) + 1e-9; e += r) a.push(Math.round(e * 1e6) / 1e6);
		return a;
	});
	function re(e) {
		return e >= 1e3 ? `${e / 1e3}k` : String(e);
	}
	function ie(e) {
		return e >= 1e3 ? `${(e / 1e3).toFixed(2)} kHz` : `${Math.round(e)} Hz`;
	}
	function ae(e) {
		return `${e >= 0 ? "+" : ""}${e.toFixed(1)} dB`;
	}
	let oe = `bode-plot-clip-${Math.random().toString(36).slice(2)}`, se = /* @__PURE__ */ L(null), T = /* @__PURE__ */ L(null), E = /* @__PURE__ */ L(null), ce = /* @__PURE__ */ L(null);
	function le(e) {
		!t.onRangeChange || e.button !== 0 || !G(E) || (e.preventDefault(), R(ce, {
			y: e.clientY,
			range: [...r()],
			id: e.pointerId
		}, !0), R(se, null), R(T, null), G(E).setPointerCapture(e.pointerId));
	}
	function ue(e) {
		if (!G(ce) || !G(E) || !t.onRangeChange) {
			fe(e);
			return;
		}
		let n = G(ce).range[1] - G(ce).range[0], r = (e.clientY - G(ce).y) / (G(E).getBoundingClientRect().height * G(p) / i()) * n;
		t.onRangeChange([G(ce).range[0] + r, G(ce).range[1] + r]);
	}
	function de(e) {
		G(ce) && (G(E)?.hasPointerCapture(e.pointerId) && G(E).releasePointerCapture(e.pointerId), R(ce, null));
	}
	function fe(e) {
		if (!a() || !G(E)) return;
		let t = G(E).getBoundingClientRect();
		if (t.width === 0 || t.height === 0) return;
		let n = (e.clientX - t.left) / t.width, r = (e.clientY - t.top) / t.height, o = n * G(c), s = r * i();
		if (o < 42 || o > G(l) || s < 0 || s > G(p)) {
			R(se, null), R(T, null);
			return;
		}
		let u = (o - 42) / G(f), d = Math.max(0, Math.min(Sa - 1, Math.round(u * (Sa - 1))));
		o = G(m)[d], R(se, o, !0), R(T, s);
	}
	function pe() {
		R(se, null), R(T, null);
	}
	let me = /* @__PURE__ */ I(() => {
		if (G(se) == null) return null;
		let e = (G(se) - 42) / G(f);
		return Ea(Math.max(0, Math.min(1, e)));
	}), he = /* @__PURE__ */ I(() => {
		if (G(T) == null) return null;
		let e = (G(p) - G(T)) / G(p);
		return G(u) + e * (G(d) - G(u));
	});
	function ge(e) {
		return Math.max(46, Math.min(G(l) - 156, e + 6));
	}
	function _e(e) {
		return Math.max(22, Math.min(G(p) - 6, e - 8));
	}
	var ve = Ra(), ye = z(ve);
	let be;
	var D = z(ye), xe = z(D), Se = z(xe);
	$(Se, "x", 42), j(xe);
	var Ce = V(xe), we = (e) => {
		var n = Da(), r = z(n), i = V(r);
		j(n), H((e, a) => {
			$(n, "id", `bodeFill-${t.curves[0].id ?? ""}`), $(r, "stop-color", e), $(i, "stop-color", a);
		}, [() => b(t.curves[0]), () => b(t.curves[0])]), J(e, n);
	};
	X(Ce, (e) => {
		G(C) && t.curves[0] && e(we);
	}), Z(V(Ce), 17, () => t.curves, (e) => e.id, (e, t) => {
		var n = wr(), r = B(n), i = (e) => {
			var n = Oa();
			$(n, "x1", 42), $(n, "y1", 0), $(n, "y2", 0);
			var r = z(n), i = V(r);
			j(n), H((e, a) => {
				$(n, "id", `bodeGrad-${G(t).id ?? ""}`), $(n, "x2", G(l)), $(r, "stop-color", e), $(i, "stop-color", a);
			}, [() => x(G(t).gradientChannelIds[0]), () => x(G(t).gradientChannelIds[1])]), J(e, n);
		};
		X(r, (e) => {
			G(t).gradientChannelIds && e(i);
		}), J(e, n);
	}), j(D);
	var O = V(D);
	Z(O, 16, () => te, (e) => e, (e, t) => {
		var n = ka();
		$(n, "y1", 0), H((e, t) => {
			$(n, "x1", e), $(n, "x2", t), $(n, "y2", G(p));
		}, [() => _(t), () => _(t)]), J(e, n);
	});
	var k = V(O);
	Z(k, 16, () => G(ne), (e) => e, (e, t) => {
		let n = /* @__PURE__ */ I(() => h(t));
		var r = Aa(), i = B(r);
		$(i, "x1", 42);
		var a = V(i);
		$(a, "x", 34);
		var s = z(a);
		j(a), H(() => {
			$(i, "x2", G(l)), $(i, "y1", G(n)), $(i, "y2", G(n)), $(i, "stroke", t === 0 ? o() : "#353531"), $(i, "stroke-dasharray", t === 0 ? "6 5" : ""), $(i, "stroke-width", t === 0 ? 1 : .5), $(a, "y", G(n)), Y(s, `${t > 0 ? "+" : ""}${t ?? ""}`);
		}), J(e, r);
	});
	var Te = V(k);
	Z(Te, 16, () => G(w), (e) => e, (e, t) => {
		let n = /* @__PURE__ */ I(() => _(t));
		var r = ja(), i = B(r);
		$(i, "y1", 0);
		var a = V(i), o = z(a, !0);
		j(a), H((e) => {
			$(i, "x1", G(n)), $(i, "x2", G(n)), $(i, "y2", G(p)), $(a, "x", G(n)), $(a, "y", G(p) + 22), Y(o, e);
		}, [() => re(t)]), J(e, r);
	});
	var A = V(Te), Ee = z(A), De = (e) => {
		var n = Ma();
		H(() => {
			$(n, "d", G(S)[0].d + ` L ${G(l)} ${G(p)} L 42 ${G(p)} Z`), $(n, "fill", `url(#bodeFill-${t.curves[0].id ?? ""})`);
		}), J(e, n);
	};
	X(Ee, (e) => {
		G(C) && G(S)[0] && e(De);
	});
	var Oe = V(Ee);
	Z(Oe, 17, () => G(S), (e) => e.c.id, (e, t) => {
		var n = wr(), r = B(n), i = (e) => {
			var n = Na();
			H((e, r) => {
				$(n, "d", e), $(n, "fill", r), $(n, "fill-opacity", G(t).c.fillOpacity);
			}, [() => G(t).d + ` L ${G(l)} ${h(0)} L 42 ${h(0)} Z`, () => y(G(t).c)]), J(e, n);
		};
		X(r, (e) => {
			G(t).c.fillOpacity && e(i);
		}), J(e, n);
	});
	var ke = V(Oe);
	Z(ke, 17, () => G(S), (e) => e.c.id, (e, t) => {
		var n = Pa();
		H((e) => {
			$(n, "d", G(t).d), $(n, "stroke", e), $(n, "stroke-width", G(t).c.width ?? 1.6), $(n, "stroke-dasharray", G(t).c.dashed ? "5 4" : void 0);
		}, [() => y(G(t).c)]), J(e, n);
	}), Z(V(ke), 19, n, (e, t) => e.id ?? t, (e, t) => {
		let n = /* @__PURE__ */ I(() => _(Math.max(20, Math.min(Li, G(t).f)))), r = /* @__PURE__ */ I(() => h(Math.max(G(u), Math.min(G(d), G(t).db)))), i = /* @__PURE__ */ I(() => G(t).channelId == null ? "color-mix(in oklab, var(--text) 85%, transparent)" : Mi(G(t).channelId, "bright"));
		var a = Ia(), o = B(a), s = V(o), c = V(s), l = (e) => {
			var i = Fa(), a = z(i, !0);
			j(i), H(() => {
				$(i, "x", G(n)), $(i, "y", G(r) - 8), Y(a, G(t).label);
			}), J(e, i);
		};
		X(c, (e) => {
			G(t).label && e(l);
		}), H(() => {
			$(o, "x1", G(n)), $(o, "x2", G(n)), $(o, "y1", G(r)), $(o, "y2", G(p)), $(o, "stroke", G(i)), $(s, "cx", G(n)), $(s, "cy", G(r)), $(s, "fill", G(i));
		}), J(e, a);
	}), j(A);
	var Ae = V(A), je = (e) => {
		var t = La(), n = B(t);
		$(n, "y1", 0);
		var r = V(n);
		$(r, "x1", 42);
		var i = V(r), a = V(z(i)), o = z(a);
		j(a), j(i), H((e, t, a) => {
			$(n, "x1", G(se)), $(n, "x2", G(se)), $(n, "y2", G(p)), $(r, "x2", G(l)), $(r, "y1", G(T)), $(r, "y2", G(T)), $(i, "transform", e), Y(o, `${t ?? ""} · ${a ?? ""}`);
		}, [
			() => `translate(${ge(G(se))} ${_e(G(T))})`,
			() => ie(G(me)),
			() => ae(G(he))
		]), J(e, t);
	};
	X(Ae, (e) => {
		a() && G(se) != null && G(T) != null && G(me) != null && G(he) != null && e(je);
	}), j(ye), xi(ye, (e) => R(E, e), () => G(E)), j(ve), H(() => {
		be = Q(ye, 0, "bode svelte-mggv3i", null, be, {
			pannable: !!t.onRangeChange,
			dragging: !!G(ce)
		}), $(ye, "viewBox", `0 0 ${G(c)} ${i()}`), $(ye, "height", i()), $(xe, "id", oe), $(Se, "width", G(f)), $(Se, "height", G(p)), $(A, "clip-path", `url(#${oe})`);
	}), K("pointerdown", ye, le), K("pointermove", ye, ue), K("pointerup", ye, de), pr("pointercancel", ye, de), pr("lostpointercapture", ye, () => R(ce, null)), pr("pointerleave", ye, pe), yi(ve, "clientWidth", (e) => R(s, e)), J(e, ve), Le();
}
mr([
	"pointerdown",
	"pointermove",
	"pointerup"
]);
//#endregion
//#region src/components/eq/loudnessReferencePoints.json
var Va = /* @__PURE__ */ JSON.parse("[[22.0,21.998,21.9959,21.9939,21.9919,21.9898,21.9878,21.9858,21.9837,21.9817,21.9797,21.9776,21.9756,21.9736,21.9715,21.9695,21.9674,21.9654,21.9634,21.9613,21.9593,21.9573,21.9552,21.9532,21.9512,21.9491,21.9471,21.9451,21.943,21.941,21.939,21.9369,21.9349,21.9329,21.9308,21.9288,21.9268,21.9247,21.9227,21.9207,21.9186,21.9166,21.9146,21.9125,21.9105,21.9084,21.9064,21.9044,21.9023,21.9003,21.8983,21.8962,21.8942,21.8922,21.8901,21.8881,21.8861,21.884,21.882,21.88,21.8779,21.8759,21.8739,21.8718,21.8698,21.8678,21.8657,21.8637,21.8617,21.8596,21.8576,21.8556,21.8535,21.8515,21.8494,21.8474,21.8454,21.8433,21.8413,21.8393,21.8372,21.8352,21.8332,21.8311,21.8291,21.8271,21.825,21.823,21.821,21.8189,21.8169,21.8149,21.8128,21.8108,21.8088,21.8067,21.8047,21.8027,21.8006,21.7986,21.7965,21.7945,21.7925,21.7904,21.7884,21.7864,21.7843,21.7823,21.7803,21.7782,21.7762,21.7742,21.7721,21.7701,21.7681,21.766,21.764,21.762,21.7599,21.7579,21.7559,21.7538,21.7518,21.7498,21.7477,21.7457,21.7437,21.7416,21.7396,21.7375,21.7355,21.7335,21.7314,21.7294,21.7274,21.7253,21.7233,21.7213,21.7192,21.7172,21.7152,21.7131,21.7111,21.7091,21.707,21.705,21.703,21.7009,21.6989,21.6969,21.6948,21.6928,21.6908,21.6887,21.6867,21.6847,21.6826,21.6806,21.6785,21.6765,21.6745,21.6724,21.6704,21.6684,21.6663,21.6643,21.6623,21.6602,21.6582,21.6562,21.6541,21.6521,21.6501,21.648,21.646,21.644,21.6419,21.6399,21.6379,21.6358,21.6338,21.6318,21.6297,21.6277,21.6257,21.6236,21.6216,21.6195,21.6175,21.6155,21.6134,21.6114,21.6094,21.6073,21.6053,21.6033,21.6012,21.5992,21.5972,21.5951,21.5931,21.5911,21.589,21.587,21.585,21.5829,21.5809,21.5789,21.5768,21.5748,21.5728,21.5707,21.5687,21.5667,21.5646,21.5626,21.5605,21.5585,21.5565,21.5544,21.5524,21.5504,21.5483,21.5463,21.5443,21.5422,21.5402,21.5382,21.5361,21.5341,21.5321,21.53,21.528,21.526,21.5239,21.5219,21.5199,21.5178,21.5158,21.5138,21.5117,21.5097,21.5076,21.5056,21.5036,21.5015,21.4995,21.4975,21.4954,21.4934,21.4914,21.4893,21.4873,21.4853,21.4832,21.4812,21.4792,21.4771,21.4751,21.4731,21.471,21.469,21.467,21.4649,21.4629,21.4609,21.4588,21.4568,21.4548,21.4527,21.4507,21.4486,21.4466,21.4446,21.4425,21.4405,21.4385,21.4364,21.4344,21.4324,21.4303,21.4283,21.4263,21.4242,21.4222,21.4202,21.4181,21.4161,21.4141,21.412,21.41,21.408,21.4059,21.4039,21.4019,21.3998,21.3978,21.3958,21.3937,21.3917,21.3896,21.3876,21.3856,21.3835,21.3815,21.3795,21.3774,21.3754,21.3734,21.3713,21.3693,21.3673,21.3652,21.3632,21.3612,21.3591,21.3571,21.3551,21.353,21.351,21.349,21.3469,21.3449,21.3429,21.3408,21.3388,21.3368,21.3347,21.3327,21.3306,21.3286,21.3266,21.3245,21.3225,21.3205,21.3184,21.3164,21.3144,21.3123,21.3103,21.3083,21.3062,21.3042,21.3022,21.3001,21.2981,21.2961,21.294,21.292,21.29,21.2879,21.2859,21.2839,21.2818,21.2798,21.2778,21.2757,21.2737,21.2716,21.2696,21.2676,21.2655,21.2635,21.2615,21.2594,21.2574,21.2554,21.2533,21.2513,21.2493,21.2472,21.2452,21.2432,21.2411,21.2391,21.2371,21.235,21.233,21.231,21.2289,21.2269,21.2249,21.2228,21.2208,21.2188,21.2167,21.2147,21.2126,21.2106,21.2086,21.2065,21.2045,21.2025,21.2004,21.1984,21.1964,21.1943,21.1923,21.1903,21.1882,21.1862,21.1842,21.1821,21.1801,21.1781,21.176,21.174,21.172,21.1699,21.1679,21.1659,21.1638,21.1618,21.1597,21.1577,21.1557,21.1536,21.1516,21.1496,21.1475,21.1455,21.1435,21.1414,21.1394,21.1374,21.1353,21.1333,21.1313,21.1292,21.1272,21.1252,21.1231,21.1211,21.1191,21.117,21.115,21.113,21.1109,21.1089,21.1069,21.1048,21.1028,21.1007,21.0987,21.0967,21.0946,21.0926,21.0906,21.0885,21.0865,21.0845,21.0824,21.0804,21.0784,21.0763,21.0743,21.0723,21.0702,21.0682,21.0662,21.0641,21.0621,21.0601,21.058,21.056,21.054,21.0519,21.0499,21.0479,21.0458,21.0438,21.0417,21.0397,21.0377,21.0356,21.0336,21.0316,21.0295,21.0275,21.0255,21.0234,21.0214,21.0194,21.0173,21.0153,21.0133,21.0112,21.0092,21.0072,21.0051,21.0031,21.0011,20.999,20.997,20.9949,20.9929,20.9909,20.9888,20.9868,20.9847,20.9827,20.9806,20.9786,20.9765,20.9745,20.9724,20.9703,20.9683,20.9662,20.9641,20.9621,20.96,20.9579,20.9558,20.9538,20.9517,20.9496,20.9475,20.9454,20.9434,20.9413,20.9392,20.9371,20.935,20.9329,20.9308,20.9287,20.9266,20.9245,20.9224,20.9203,20.9182,20.9161,20.914,20.9119,20.9098,20.9076,20.9055,20.9034,20.9013,20.8992,20.8971,20.8949,20.8928,20.8907,20.8886,20.8864,20.8843,20.8822,20.88,20.8779,20.8758,20.8736,20.8715,20.8694,20.8672,20.8651,20.8629,20.8608,20.8586,20.8565,20.8544,20.8522,20.8501,20.8479,20.8458,20.8436,20.8414,20.8393,20.8371,20.835,20.8328,20.8307,20.8285,20.8263,20.8242,20.822,20.8198,20.8177,20.8155,20.8133,20.8112,20.809,20.8068,20.8047,20.8025,20.8003,20.7981,20.796,20.7938,20.7916,20.7894,20.7873,20.7851,20.7829,20.7807,20.7785,20.7764,20.7742,20.772,20.7698,20.7676,20.7654,20.7632,20.7611,20.7589,20.7567,20.7545,20.7523,20.7501,20.7479,20.7457,20.7435,20.7414,20.7392,20.737,20.7348,20.7326,20.7304,20.7282,20.726,20.7238,20.7216,20.7194,20.7172,20.715,20.7128,20.7106,20.7084,20.7062,20.704,20.7018,20.6996,20.6974,20.6952,20.693,20.6908,20.6886,20.6864,20.6842,20.682,20.6798,20.6776,20.6754,20.6732,20.671,20.6688,20.6666,20.6644,20.6622,20.66,20.6578,20.6556,20.6533,20.6511,20.6489,20.6467,20.6445,20.6423,20.6401,20.6379,20.6357,20.6335,20.6313,20.6291,20.6269,20.6247,20.6225,20.6203,20.6181,20.6159,20.6137,20.6115,20.6093,20.6071,20.6049,20.6027,20.6005,20.5983,20.5961,20.5939,20.5917,20.5895,20.5873,20.5851,20.5829,20.5807,20.5785,20.5763,20.5741,20.5719,20.5697,20.5675,20.5653,20.5631,20.5609,20.5587,20.5565,20.5543,20.5521,20.5499,20.5478,20.5456,20.5434,20.5412,20.539,20.5368,20.5346,20.5324,20.5302,20.5281,20.5259,20.5237,20.5215,20.5193,20.5171,20.515,20.5128,20.5106,20.5084,20.5062,20.5041,20.5019,20.4997,20.4975,20.4954,20.4932,20.491,20.4889,20.4867,20.4845,20.4823,20.4802,20.478,20.4758,20.4737,20.4715,20.4694,20.4672,20.465,20.4629,20.4607,20.4586,20.4564,20.4542,20.4521,20.4499,20.4478,20.4456,20.4435,20.4413,20.4392,20.437,20.4349,20.4328,20.4306,20.4285,20.4263,20.4242,20.4221,20.4199,20.4178,20.4157,20.4135,20.4114,20.4093,20.4071,20.405,20.4029,20.4008,20.3986,20.3965,20.3944,20.3923,20.3902,20.3881,20.3859,20.3838,20.3817,20.3796,20.3775,20.3754,20.3733,20.3712,20.3691,20.367,20.3649,20.3628,20.3607,20.3586,20.3565,20.3544,20.3524,20.3503,20.3482,20.3461,20.344,20.3419,20.3399,20.3378,20.3357,20.3337,20.3316,20.3295,20.3275,20.3254,20.3233,20.3213,20.3192,20.3172,20.3151,20.313,20.311,20.3089,20.3069,20.3049,20.3028,20.3008,20.2987,20.2967,20.2947,20.2926,20.2906,20.2886,20.2866,20.2845,20.2825,20.2805,20.2785,20.2765,20.2744,20.2724,20.2704,20.2684,20.2664,20.2644,20.2624,20.2604,20.2584,20.2564,20.2544,20.2525,20.2505,20.2485,20.2465,20.2445,20.2426,20.2406,20.2386,20.2366,20.2347,20.2327,20.2308,20.2288,20.2268,20.2249,20.2229,20.221,20.219,20.2171,20.2152,20.2132,20.2113,20.2093,20.2074,20.2055,20.2036,20.2016,20.1997,20.1978,20.1959,20.194,20.1921,20.1902,20.1883,20.1864,20.1845,20.1826,20.1807,20.1788,20.1769,20.175,20.1731,20.1713,20.1694,20.1675,20.1656,20.1638,20.1619,20.16,20.1582,20.1563,20.1545,20.1526,20.1508,20.1489,20.1471,20.1453,20.1434,20.1416,20.1398,20.138,20.1361,20.1343,20.1325,20.1307,20.1289,20.1271,20.1253,20.1235,20.1217,20.1199,20.1181,20.1163,20.1145,20.1127,20.111,20.1092,20.1074,20.1057,20.1039,20.1021,20.1004,20.0986,20.0969,20.0951,20.0934,20.0916,20.0899,20.0882,20.0864,20.0847,20.083,20.0813,20.0796,20.0778,20.0761,20.0744,20.0727,20.071,20.0693,20.0676,20.066,20.0643,20.0626,20.0609,20.0593,20.0576,20.0559,20.0543,20.0526,20.0509,20.0493,20.0476,20.046,20.0444,20.0427,20.0411,20.0395,20.0378,20.0362,20.0346,20.033,20.0314,20.0298,20.0282,20.0266,20.025,20.0234,20.0218,20.0202,20.0187,20.0171,20.0155,20.014,20.0124,20.0108,20.0093,20.0077,20.0062,20.0047,20.0031,20.0016,20.0001,19.9985,19.997,19.9955,19.994,19.9925,19.991,19.9895,19.988,19.9865,19.985,19.9835,19.982,19.9806,19.9791,19.9776,19.9762,19.9747,19.9733,19.9718,19.9704,19.9689,19.9675,19.966,19.9646,19.9632,19.9617,19.9603,19.9589,19.9575,19.9561,19.9547,19.9533,19.9519,19.9505,19.9491,19.9477,19.9463,19.9449,19.9436,19.9422,19.9408,19.9395,19.9381,19.9367,19.9354,19.934,19.9327,19.9313,19.93,19.9287,19.9273,19.926,19.9247,19.9234,19.922,19.9207,19.9194,19.9181,19.9168,19.9155,19.9142,19.9129,19.9116,19.9103,19.909,19.9078,19.9065,19.9052,19.9039,19.9027,19.9014,19.9001,19.8989,19.8976,19.8964,19.8951,19.8939,19.8926,19.8914,19.8901,19.8889,19.8877,19.8865,19.8852,19.884,19.8828,19.8816,19.8804,19.8792,19.8779,19.8767,19.8755,19.8743,19.8732,19.872,19.8708,19.8696,19.8684,19.8672,19.866,19.8649,19.8637,19.8625,19.8614,19.8602,19.859,19.8579,19.8567,19.8556,19.8544,19.8533,19.8522,19.851,19.8499,19.8487,19.8476,19.8465,19.8453,19.8442,19.8431,19.842,19.8409,19.8398,19.8386,19.8375,19.8364,19.8353,19.8342,19.8331,19.832,19.8309,19.8298,19.8288,19.8277,19.8266,19.8255,19.8244,19.8234,19.8223,19.8212,19.8201,19.8191,19.818,19.8169,19.8159,19.8148,19.8138,19.8127,19.8117,19.8106,19.8096,19.8085,19.8075,19.8064,19.8054,19.8044,19.8033,19.8023,19.8013,19.8003,19.7992,19.7982,19.7972,19.7962,19.7952,19.7941,19.7931,19.7921,19.7911,19.7901,19.7891,19.7881,19.7871,19.7861,19.7851,19.7841,19.7831,19.7821,19.7811,19.7802,19.7792,19.7782,19.7772,19.7762,19.7753,19.7743,19.7733,19.7723,19.7714,19.7704,19.7694,19.7685,19.7675,19.7665,19.7656,19.7646,19.7637,19.7627,19.7618,19.7608,19.7599,19.7589,19.758,19.757,19.7561,19.7551,19.7542,19.7532,19.7523,19.7514,19.7504,19.7495,19.7486,19.7476,19.7467,19.7458,19.7449,19.7439,19.743,19.7421,19.7412,19.7403,19.7393,19.7384,19.7375,19.7366,19.7357,19.7348,19.7339,19.733,19.732,19.7311,19.7302,19.7293,19.7284,19.7275,19.7266,19.7257,19.7248,19.7239,19.723,19.7221,19.7212,19.7204,19.7195,19.7186,19.7177,19.7168,19.7159,19.715,19.7141,19.7133,19.7124,19.7115,19.7106,19.7097,19.7088,19.708,19.7071,19.7062,19.7053,19.7045,19.7036,19.7027,19.7018,19.701,19.7001,19.6992,19.6984,19.6975,19.6966,19.6957,19.6949,19.694,19.6931,19.6923,19.6914,19.6906,19.6897,19.6888,19.688,19.6871,19.6862,19.6854,19.6845,19.6837,19.6828,19.682,19.6811,19.6802,19.6794,19.6785,19.6777,19.6768,19.676,19.6751,19.6743,19.6734,19.6725,19.6717,19.6708,19.67,19.6691,19.6683,19.6674,19.6666,19.6657,19.6649,19.664,19.6632,19.6623,19.6615,19.6606,19.6598,19.6589,19.6581,19.6572,19.6564,19.6555,19.6547,19.6538,19.653,19.6521,19.6513,19.6505,19.6496,19.6488,19.6479,19.6471,19.6462,19.6454,19.6445,19.6437,19.6428,19.642,19.6411,19.6403,19.6394,19.6386,19.6377,19.6369,19.636,19.6352,19.6343,19.6335,19.6326,19.6318,19.6309,19.6301,19.6292,19.6284,19.6275,19.6267,19.6258,19.625,19.6241,19.6233,19.6224,19.6216,19.6207,19.6199,19.619,19.6181,19.6173,19.6164,19.6156,19.6147,19.6139,19.613,19.6121,19.6113,19.6104,19.6096,19.6087,19.6078,19.607,19.6061,19.6053,19.6044,19.6035,19.6027,19.6018,19.6009,19.6001,19.5992,19.5983,19.5975,19.5966,19.5957,19.5948,19.594,19.5931,19.5922,19.5913,19.5905,19.5896,19.5887,19.5878,19.587,19.5861,19.5852,19.5843,19.5834,19.5826,19.5817,19.5808,19.5799,19.579,19.5781,19.5772,19.5763,19.5754,19.5745,19.5737,19.5728,19.5719,19.571,19.5701,19.5692,19.5683,19.5674,19.5665,19.5656,19.5647,19.5637,19.5628,19.5619,19.561,19.5601,19.5592,19.5583,19.5574,19.5564,19.5555,19.5546,19.5537,19.5528,19.5518,19.5509,19.55,19.5491,19.5481,19.5472,19.5463,19.5453,19.5444,19.5435,19.5425,19.5416,19.5406,19.5397,19.5388,19.5378,19.5369,19.5359,19.535,19.534,19.5331,19.5321,19.5311,19.5302,19.5292,19.5283,19.5273,19.5263,19.5254,19.5244,19.5234,19.5224,19.5215,19.5205,19.5195,19.5185,19.5176,19.5166,19.5156,19.5146,19.5136,19.5126,19.5116,19.5106,19.5096,19.5086,19.5076,19.5066,19.5056,19.5046,19.5036,19.5026,19.5016,19.5006,19.4996,19.4985,19.4975,19.4965,19.4955,19.4945,19.4935,19.4925,19.4914,19.4904,19.4894,19.4884,19.4874,19.4864,19.4854,19.4844,19.4834,19.4824,19.4814,19.4804,19.4794,19.4784,19.4774,19.4764,19.4754,19.4744,19.4734,19.4724,19.4714,19.4704,19.4694,19.4684,19.4674,19.4664,19.4654,19.4644,19.4634,19.4625,19.4615,19.4605,19.4595,19.4585,19.4575,19.4565,19.4555,19.4546,19.4536,19.4526,19.4516,19.4506,19.4496,19.4487,19.4477,19.4467,19.4457,19.4447,19.4438,19.4428,19.4418,19.4408,19.4398,19.4389,19.4379,19.4369,19.4359,19.435,19.434,19.433,19.432,19.4311,19.4301,19.4291,19.4282,19.4272,19.4262,19.4253,19.4243,19.4233,19.4223,19.4214,19.4204,19.4194,19.4185,19.4175,19.4165,19.4156,19.4146,19.4137,19.4127,19.4117,19.4108,19.4098,19.4088,19.4079,19.4069,19.406,19.405,19.404,19.4031,19.4021,19.4011,19.4002,19.3992,19.3983,19.3973,19.3964,19.3954,19.3944,19.3935,19.3925,19.3916,19.3906,19.3897,19.3887,19.3877,19.3868,19.3858,19.3849,19.3839,19.383,19.382,19.3811,19.3801,19.3792,19.3782,19.3772,19.3763,19.3753,19.3744,19.3734,19.3725,19.3715,19.3706,19.3696,19.3687,19.3677,19.3668,19.3658,19.3649,19.3639,19.363,19.362,19.3611,19.3601,19.3592,19.3582,19.3573,19.3563,19.3554,19.3544,19.3535,19.3525,19.3516,19.3506,19.3497,19.3487,19.3478,19.3468,19.3459,19.3449,19.344,19.343,19.3421,19.3411,19.3402,19.3392,19.3383,19.3373,19.3364,19.3354,19.3345,19.3335,19.3326,19.3316,19.3307,19.3297,19.3288,19.3278,19.3269,19.3259,19.325,19.324,19.3231,19.3221,19.3212,19.3202,19.3193,19.3183,19.3174,19.3164,19.3155,19.3145,19.3136,19.3126,19.3117,19.3107,19.3098,19.3088,19.3079,19.3069,19.306,19.305,19.304,19.3031,19.3021,19.3012,19.3002,19.2993,19.2983,19.2974,19.2964,19.2955,19.2945,19.2935,19.2926,19.2916,19.2907,19.2897,19.2888,19.2878,19.2868,19.2859,19.2849,19.284,19.283,19.2821,19.2811,19.2801,19.2792,19.2782,19.2773,19.2763,19.2753,19.2744,19.2734,19.2725,19.2715,19.2705,19.2696,19.2686,19.2676,19.2667,19.2657,19.2647,19.2638,19.2628,19.2618,19.2609,19.2599,19.2589,19.258,19.257,19.256,19.2551,19.2541,19.2531,19.2522,19.2512,19.2502,19.2492,19.2483,19.2473,19.2463,19.2453,19.2444,19.2434,19.2424,19.2414,19.2405,19.2395,19.2385,19.2375,19.2366,19.2356,19.2346,19.2336,19.2326,19.2317,19.2307,19.2297,19.2287,19.2277,19.2267,19.2257,19.2248,19.2238,19.2228,19.2218,19.2208,19.2198,19.2188,19.2178,19.2169,19.2159,19.2149,19.2139,19.2129,19.2119,19.2109,19.2099,19.2089,19.2079,19.2069,19.2059,19.2049,19.2039,19.2029,19.2019,19.2009,19.1999,19.1989,19.1979,19.1969,19.1959,19.1949,19.1939,19.1929,19.1919,19.1908,19.1898,19.1888,19.1878,19.1868,19.1858,19.1848,19.1838,19.1827,19.1817,19.1807,19.1797,19.1787,19.1777,19.1766,19.1756,19.1746,19.1736,19.1725,19.1715,19.1705,19.1695,19.1684,19.1674,19.1664,19.1653,19.1643,19.1633,19.1622,19.1612,19.1602,19.1591,19.1581,19.1571,19.156,19.155,19.1539,19.1529,19.1519,19.1508,19.1498,19.1487,19.1477,19.1466,19.1456,19.1445,19.1435,19.1424,19.1414,19.1403,19.1393,19.1382,19.1372,19.1361,19.135,19.134,19.1329,19.1319,19.1308,19.1297,19.1287,19.1276,19.1265,19.1255,19.1244,19.1233,19.1223,19.1212,19.1201,19.119,19.118,19.1169,19.1158,19.1147,19.1136,19.1126,19.1115,19.1104,19.1093,19.1082,19.1071,19.106,19.105,19.1039,19.1028,19.1017,19.1006,19.0995,19.0984,19.0973,19.0962,19.0951,19.094,19.0929,19.0918,19.0907,19.0896,19.0885,19.0873,19.0862,19.0851,19.084,19.0829,19.0818,19.0807,19.0795,19.0784,19.0773,19.0762,19.075,19.0739,19.0728,19.0717,19.0705,19.0694,19.0683,19.0671,19.066,19.0649,19.0637,19.0626,19.0614,19.0603,19.0592,19.058,19.0569,19.0557,19.0546,19.0534,19.0523,19.0511,19.05,19.0488,19.0477,19.0465,19.0453,19.0442,19.043,19.0418,19.0407,19.0395,19.0383,19.0372,19.036,19.0348,19.0336,19.0325,19.0313,19.0301,19.0289,19.0277,19.0266,19.0254,19.0242,19.023,19.0218,19.0206,19.0194,19.0182,19.017,19.0158,19.0146,19.0134,19.0122,19.011,19.0098,19.0086,19.0074,19.0062,19.005,19.0038,19.0025,19.0013,19.0001,18.9989,18.9977,18.9965,18.9953,18.9941,18.9929,18.9917,18.9905,18.9893,18.9882,18.987,18.9858,18.9847,18.9835,18.9824,18.9812,18.9801,18.979,18.9778,18.9767,18.9756,18.9745,18.9734,18.9722,18.9711,18.97,18.9689,18.9678,18.9668,18.9657,18.9646,18.9635,18.9624,18.9614,18.9603,18.9592,18.9582,18.9571,18.9561,18.955,18.9539,18.9529,18.9519,18.9508,18.9498,18.9487,18.9477,18.9467,18.9456,18.9446,18.9436,18.9426,18.9415,18.9405,18.9395,18.9385,18.9375,18.9365,18.9355,18.9344,18.9334,18.9324,18.9314,18.9304,18.9294,18.9284,18.9274,18.9264,18.9254,18.9244,18.9234,18.9224,18.9214,18.9204,18.9194,18.9185,18.9175,18.9165,18.9155,18.9145,18.9135,18.9125,18.9115,18.9105,18.9095,18.9085,18.9075,18.9065,18.9056,18.9046,18.9036,18.9026,18.9016,18.9006,18.8996,18.8986,18.8976,18.8966,18.8956,18.8946,18.8936,18.8926,18.8916,18.8906,18.8895,18.8885,18.8875,18.8865,18.8855,18.8845,18.8835,18.8824,18.8814,18.8804,18.8794,18.8783,18.8773,18.8763,18.8752,18.8742,18.8731,18.8721,18.8711,18.87,18.8689,18.8679,18.8668,18.8658,18.8647,18.8636,18.8626,18.8615,18.8604,18.8593,18.8582,18.8572,18.8561,18.855,18.8539,18.8528,18.8516,18.8505,18.8494,18.8483,18.8472,18.846,18.8449,18.8438,18.8426,18.8415,18.8403,18.8392,18.838,18.8368,18.8357,18.8345,18.8333,18.8321,18.8309,18.8297,18.8285,18.8273,18.8261,18.8249,18.8237,18.8224,18.8212,18.82,18.8187,18.8175,18.8162,18.8149,18.8137,18.8124,18.8111,18.8098,18.8085,18.8072,18.8059,18.8046,18.8033,18.8019,18.8006,18.7993,18.7979,18.7966,18.7952,18.7938,18.7924,18.7911,18.7897,18.7883,18.7869,18.7854,18.784,18.7826,18.7812,18.7797,18.7782,18.7768,18.7753,18.7738,18.7723,18.7709,18.7694,18.7678,18.7663,18.7648,18.7633,18.7617,18.7602,18.7586,18.757,18.7554,18.7538,18.7522,18.7506,18.749,18.7474,18.7458,18.7441,18.7424,18.7408,18.7391,18.7374,18.7357,18.734,18.7323,18.7306,18.7289,18.7271,18.7254,18.7236,18.7218,18.72,18.7182,18.7164,18.7146,18.7128,18.711,18.7091,18.7072,18.7054,18.7035,18.7016,18.6997,18.6978,18.6959,18.6939,18.692,18.69,18.688,18.6861,18.6841,18.6821,18.68,18.678,18.676,18.6739,18.6718,18.6698,18.6677,18.6656,18.6635,18.6613,18.6592,18.657,18.6549,18.6527,18.6505,18.6483,18.6461,18.6438,18.6416,18.6393,18.6371,18.6348,18.6325,18.6302,18.6279,18.6255,18.6232,18.6208,18.6184,18.6161,18.6137,18.6112,18.6088,18.6064,18.6039,18.6014,18.5989,18.5964,18.5939,18.5914,18.5888,18.5863,18.5837,18.5811,18.5785,18.5759,18.5732,18.5706,18.5679,18.5653,18.5626,18.5598,18.5571,18.5544,18.5516,18.5488,18.5461,18.5433,18.5404,18.5376,18.5347,18.5319,18.529,18.5261,18.5232,18.5203,18.5173,18.5143,18.5114,18.5084,18.5053,18.5023,18.4993,18.4962,18.4932,18.4901,18.487,18.4839,18.4809,18.4778,18.4747,18.4716,18.4685,18.4654,18.4623,18.4592,18.4561,18.4529,18.4498,18.4467,18.4435,18.4404,18.4372,18.4341,18.4309,18.4277,18.4246,18.4214,18.4182,18.415,18.4118,18.4086,18.4054,18.4022,18.399,18.3957,18.3925,18.3893,18.386,18.3828,18.3795,18.3762,18.373,18.3697,18.3664,18.3631,18.3598,18.3565,18.3532,18.3499,18.3466,18.3432,18.3399,18.3366,18.3332,18.3299,18.3265,18.3231,18.3197,18.3164,18.313,18.3096,18.3062,18.3027,18.2993,18.2959,18.2925,18.289,18.2856,18.2821,18.2786,18.2752,18.2717,18.2682,18.2647,18.2612,18.2577,18.2542,18.2507,18.2471,18.2436,18.24,18.2365,18.2329,18.2293,18.2257,18.2221,18.2186,18.2149,18.2113,18.2077,18.2041,18.2004,18.1968,18.1931,18.1895,18.1858,18.1821,18.1784,18.1747,18.171,18.1673,18.1635,18.1598,18.1561,18.1523,18.1485,18.1448,18.141,18.1372,18.1334,18.1296,18.1258,18.1219,18.1181,18.1142,18.1104,18.1065,18.1026,18.0988,18.0949,18.091,18.087,18.0831,18.0792,18.0752,18.0713,18.0673,18.0633,18.0594,18.0554,18.0514,18.0473,18.0433,18.0393,18.0352,18.0312,18.0271,18.023,18.019,18.0149,18.0108,18.0066,18.0025,17.9984,17.9942,17.9901,17.9859,17.9817,17.9775,17.9733,17.9691,17.9649,17.9606,17.9564,17.9521,17.9478,17.9436,17.9393,17.935,17.9306,17.9263,17.922,17.9176,17.9133,17.9089,17.9045,17.9001,17.8957,17.8913,17.8868,17.8824,17.8779,17.8735,17.869,17.8645,17.86,17.8555,17.8509,17.8464,17.8419,17.8373,17.8327,17.8281,17.8235,17.8189,17.8143,17.8096,17.805,17.8003,17.7956,17.791,17.7862,17.7815,17.7768,17.7721,17.7673,17.7625,17.7578,17.753,17.7482,17.7433,17.7385,17.7337,17.7288,17.7239,17.7191,17.7142,17.7092,17.7043,17.6994,17.6944,17.6895,17.6845,17.6795,17.6745,17.6695,17.6644,17.6594,17.6543,17.6492,17.6441,17.639,17.6339,17.6288,17.6236,17.6185,17.6133,17.6081,17.6029,17.5977,17.5925,17.5872,17.582,17.5767,17.5714,17.5661,17.5608,17.5554,17.5501,17.5447,17.5393,17.5339,17.5285,17.5231,17.5177,17.5122,17.5068,17.5013,17.4958,17.4903,17.4847,17.4792,17.4736,17.4681,17.4625,17.4569,17.4512,17.4456,17.4399,17.4343,17.4286,17.4229,17.4172,17.4114,17.4057,17.3999,17.3942,17.3884,17.3826,17.3767,17.3709,17.365,17.3592,17.3533,17.3474,17.3414,17.3355,17.3295,17.3236,17.3176,17.3116,17.3055,17.2995,17.2934,17.2874,17.2813,17.2752,17.2691,17.2629,17.2568,17.2506,17.2444,17.2382,17.232,17.2257,17.2195,17.2132,17.2069,17.2006,17.1943,17.1879,17.1815,17.1752,17.1688,17.1624,17.1559,17.1495,17.143,17.1365,17.13,17.1235,17.117,17.1104,17.1038,17.0972,17.0906,17.084,17.0773,17.0707,17.064,17.0573,17.0506,17.0438,17.0371,17.0303,17.0235,17.0167,17.0099,17.003,16.9961,16.9892,16.9823,16.9753,16.9683,16.9613,16.9542,16.947,16.9399,16.9327,16.9255,16.9182,16.9109,16.9036,16.8962,16.8888,16.8813,16.8739,16.8664,16.8588,16.8513,16.8437,16.836,16.8284,16.8207,16.8129,16.8052,16.7974,16.7895,16.7817,16.7738,16.7659,16.7579,16.7499,16.7419,16.7339,16.7258,16.7177,16.7096,16.7014,16.6932,16.685,16.6768,16.6685,16.6602,16.6519,16.6435,16.6351,16.6267,16.6183,16.6098,16.6013,16.5928,16.5843,16.5757,16.5671,16.5585,16.5498,16.5412,16.5325,16.5237,16.515,16.5062,16.4974,16.4886,16.4798,16.4709,16.462,16.4531,16.4442,16.4352,16.4263,16.4173,16.4083,16.3992,16.3902,16.3811,16.372,16.3628,16.3537,16.3445,16.3353,16.3261,16.3169,16.3077,16.2984,16.2891,16.2798,16.2705,16.2612,16.2518,16.2424,16.233,16.2236,16.2142,16.2048,16.1953,16.1858,16.1763,16.1668,16.1573,16.1477,16.1382,16.1286,16.119,16.1094,16.0998,16.0902,16.0805,16.0709,16.0612,16.0515,16.0418,16.0321,16.0223,16.0126,16.0028,15.9931,15.9833,15.9735,15.9637,15.9539,15.9441,15.9342,15.9244,15.9145,15.9047,15.8948,15.8849,15.875,15.8651,15.8552,15.8452,15.8353,15.8254,15.8154,15.8054,15.7955,15.7855,15.7755,15.7655,15.7555,15.7455,15.7355,15.7255,15.7154,15.7054,15.6954,15.6853,15.6753,15.6652,15.6551,15.6451,15.635,15.6249,15.6149,15.6048,15.5947,15.5846,15.5745,15.5644,15.5543,15.5442,15.5341,15.524,15.5139,15.5037,15.4936,15.4835,15.4734,15.4633,15.4532,15.443,15.4329,15.4228,15.4127,15.4025,15.3924,15.3823,15.3722,15.3621,15.352,15.3418,15.3317,15.3216,15.3115,15.3014,15.2913,15.2812,15.2711,15.261,15.2509,15.2408,15.2307,15.2206,15.2106,15.2005,15.1904,15.1804,15.1703,15.1602,15.1502,15.1401,15.1301,15.1201,15.1101,15.1,15.09,15.08,15.07,15.06,15.0501,15.0401,15.0301,15.0202,15.0102,15.0003,14.9903,14.9804,14.9705,14.9606,14.9507,14.9408,14.931,14.9211,14.9112,14.9014,14.8916,14.8818,14.8719,14.8622,14.8524,14.8426,14.8328,14.8231,14.8134,14.8036,14.7939,14.7842,14.7745,14.7649,14.7552,14.7456,14.736,14.7264,14.7168,14.7072,14.6976,14.6881,14.6785,14.669,14.6595,14.65,14.6406,14.6311,14.6217,14.6123,14.6029,14.5935,14.5841,14.5748,14.5654,14.5561,14.5468,14.5376,14.5283,14.5191,14.5099,14.5007,14.4915,14.4823,14.4732,14.4641,14.455,14.4459,14.4369,14.4279,14.4189,14.4099,14.4009,14.392,14.383,14.3742,14.3653,14.3564,14.3476,14.3388,14.33,14.3213,14.3125,14.3038,14.2952,14.2865,14.2779,14.2693,14.2607,14.2521,14.2436,14.2351,14.2266,14.2182,14.2098,14.2014,14.193,14.1847,14.1764,14.1681,14.1598,14.1516,14.1434,14.1352,14.1271,14.119,14.1109,14.1028,14.0948,14.0868,14.0788,14.0709,14.063,14.0551,14.0473,14.0395,14.0317,14.024,14.0162,14.0086,14.0009,13.9933,13.9856,13.9778,13.97,13.9621,13.9542,13.9462,13.9381,13.93,13.9219,13.9137,13.9054,13.8971,13.8888,13.8804,13.8719,13.8634,13.8548,13.8463,13.8376,13.8289,13.8202,13.8114,13.8026,13.7937,13.7848,13.7758,13.7668,13.7578,13.7487,13.7396,13.7305,13.7213,13.712,13.7028,13.6935,13.6841,13.6747,13.6653,13.6559,13.6464,13.6369,13.6273,13.6178,13.6082,13.5985,13.5888,13.5791,13.5694,13.5597,13.5499,13.5401,13.5302,13.5204,13.5105,13.5006,13.4906,13.4807,13.4707,13.4607,13.4507,13.4406,13.4306,13.4205,13.4104,13.4002,13.3901,13.38,13.3698,13.3596,13.3494,13.3392,13.3289,13.3187,13.3084,13.2982,13.2879,13.2776,13.2673,13.257,13.2467,13.2364,13.226,13.2157,13.2053,13.195,13.1846,13.1742,13.1639,13.1535,13.1431,13.1328,13.1224,13.112,13.1016,13.0912,13.0809,13.0705,13.0601,13.0498,13.0394,13.029,13.0187,13.0083,12.998,12.9876,12.9773,12.967,12.9567,12.9464,12.9361,12.9258,12.9155,12.9052,12.895,12.8847,12.8745,12.8643,12.8541,12.8439,12.8338,12.8236,12.8135,12.8034,12.7933,12.7832,12.7731,12.7631,12.7531,12.7431,12.7331,12.7232,12.7132,12.7033,12.6935,12.6836,12.6738,12.664,12.6542,12.6445,12.6347,12.6251,12.6154,12.6058,12.5962,12.5866,12.5771,12.5676,12.5581,12.5487,12.5393,12.5299,12.5206,12.5113,12.502,12.4928,12.4836,12.4745,12.4654,12.4563,12.4473,12.4383,12.4294,12.4205,12.4116,12.4028,12.3941,12.3853,12.3767,12.368,12.3595,12.3509,12.3424,12.334,12.3256,12.3173,12.309,12.3008,12.2926,12.2844,12.2764,12.2683,12.2604,12.2525,12.2446,12.2368,12.2291,12.2214,12.2137,12.2062,12.1987,12.1912,12.1838,12.1765,12.1692,12.162,12.1549,12.1478,12.1408,12.1338,12.1269,12.1201,12.1134,12.1067,12.1001,12.0935,12.087,12.0806,12.0743,12.068,12.0618,12.0557,12.0496,12.0437,12.0378,12.0319,12.0262,12.0205,12.0149,12.0094,12.0039,11.9986,11.9933,11.9881,11.9829,11.9779,11.9729,11.9681,11.9632,11.9585,11.9539,11.9494,11.9449,11.9405,11.9362,11.932,11.9279,11.9239,11.9199,11.9161,11.9123,11.9087,11.9051,11.9016,11.8982,11.8949,11.8917,11.8886,11.8856,11.8827,11.8799,11.8771,11.8745,11.872,11.8696,11.8672,11.865,11.8629,11.8608,11.8589,11.8571,11.8554,11.8538,11.8522,11.8508,11.8495,11.8483,11.8473,11.8463,11.8454,11.8446,11.844,11.8435,11.843,11.8427,11.8425,11.8424,11.8424,11.8425,11.8428,11.8432,11.8436,11.8442,11.8449,11.8458,11.8467,11.8478,11.849,11.8503,11.8517,11.8532,11.8549,11.8567,11.8586,11.8606,11.8628,11.8651,11.8675,11.87,11.8727,11.8755,11.8784,11.8815,11.8846,11.8879,11.8914,11.8949,11.8986,11.9025,11.9065,11.9106,11.9148,11.9192,11.9237,11.9283,11.9331,11.938,11.943,11.9482,11.9536,11.959,11.9647,11.9704,11.9763,11.9823,11.9885,11.9948,12.0013,12.008,12.0149,12.0221,12.0296,12.0373,12.0452,12.0534,12.0619,12.0705,12.0794,12.0886,12.098,12.1076,12.1175,12.1276,12.1379,12.1485,12.1593,12.1703,12.1816,12.193,12.2047,12.2166,12.2287,12.2411,12.2536,12.2664,12.2794,12.2926,12.306,12.3196,12.3334,12.3474,12.3617,12.3761,12.3907,12.4055,12.4205,12.4357,12.4511,12.4667,12.4825,12.4985,12.5146,12.531,12.5475,12.5642,12.5811,12.5981,12.6154,12.6328,12.6504,12.6681,12.686,12.7041,12.7224,12.7408,12.7594,12.7781,12.797,12.8161,12.8353,12.8547,12.8742,12.8939,12.9137,12.9337,12.9538,12.9741,12.9945,13.0151,13.0358,13.0566,13.0776,13.0987,13.1199,13.1413,13.1628,13.1844,13.2062,13.2281,13.2501,13.2722,13.2945,13.3169,13.3393,13.362,13.3847,13.4075,13.4304,13.4535,13.4767,13.4999,13.5233,13.5468,13.5703,13.594,13.6178,13.6417,13.6656,13.6897,13.7138,13.7381,13.7624,13.7868,13.8113,13.8359,13.8605,13.8853,13.9101,13.935,13.96,13.985,14.0101,14.0353,14.0606,14.0859,14.1113,14.1367,14.1622,14.1878,14.2134,14.2391,14.2649,14.2907,14.3165,14.3424,14.3684,14.3944,14.4204,14.4465,14.4726,14.4988,14.525,14.5513,14.5776,14.6039,14.6302,14.6566,14.683,14.7095,14.7359,14.7624,14.7889,14.8155,14.842,14.8686,14.8952,14.9218,14.9484,14.975,15.0017,15.0283,15.055,15.0816,15.1083,15.135,15.1616,15.1883,15.215,15.2416,15.2683,15.2949,15.3215,15.3482,15.3748,15.4014,15.4279,15.4545,15.481,15.5076,15.534,15.5605,15.587,15.6134,15.6398,15.6661,15.6925,15.7188,15.745,15.7712,15.7974,15.8235,15.8496,15.8757,15.9017,15.9277,15.9536,15.9794,16.0052,16.031,16.0567,16.0823,16.1079,16.1335,16.1589,16.1843,16.2097,16.2349,16.2601,16.2853,16.3103,16.3353,16.3602,16.385,16.4098,16.4345,16.4591,16.4836,16.508,16.5324,16.5566,16.5808,16.6048,16.6288,16.6527,16.6765,16.7002,16.7238,16.7473,16.7707,16.794,16.8171,16.8402,16.8632,16.886,16.9088,16.9314,16.9539,16.9763,16.9986,17.0207,17.0428,17.0647,17.0865,17.1081,17.1297,17.1511,17.1723,17.1935,17.2145,17.2353,17.256,17.2766,17.2971,17.3174,17.3375,17.3575,17.3774,17.3971,17.4167,17.4361,17.4553,17.4744,17.4933,17.5121,17.5307,17.5492,17.5675,17.5856,17.6036,17.6213,17.639,17.6564,17.6737,17.6908,17.7077,17.7244,17.741,17.7573,17.7735,17.7895,17.8054,17.821,17.8364,17.8517,17.8667,17.8816,17.8962,17.9107,17.925,17.939,17.9529,17.9665,17.98,17.9932,18.0062,18.0192,18.032,18.0447,18.0573,18.0698,18.0822,18.0945,18.1067,18.1188,18.1308,18.1427,18.1545,18.1663,18.1779,18.1894,18.2008,18.2121,18.2234,18.2345,18.2456,18.2565,18.2674,18.2782,18.2888,18.2994,18.3099,18.3203,18.3306,18.3409,18.351,18.3611,18.3711,18.3809,18.3907,18.4005,18.4101,18.4196,18.4291,18.4385,18.4478,18.457,18.4661,18.4752,18.4842,18.4931,18.5019,18.5106,18.5193,18.5279,18.5364,18.5448,18.5532,18.5615,18.5697,18.5778,18.5859,18.5939,18.6018,18.6096,18.6174,18.6251,18.6328,18.6403,18.6478,18.6553,18.6626,18.6699,18.6772,18.6843,18.6914,18.6985,18.7054,18.7124,18.7192,18.726,18.7327,18.7394,18.746,18.7525,18.759,18.7655,18.7718,18.7781,18.7844,18.7906,18.7967,18.8028,18.8089,18.8148,18.8208,18.8266,18.8325,18.8382,18.844,18.8496,18.8552,18.8608,18.8663,18.8718,18.8772,18.8826,18.8879,18.8932,18.8984,18.9036,18.9088,18.9139,18.9189,18.924,18.9289,18.9339,18.9388,18.9436,18.9484,18.9532,18.9579,18.9626,18.9673,18.9719,18.9765,18.9811,18.9856,18.9901,18.9945,18.9989,19.0033,19.0077,19.012,19.0163,19.0205,19.0247,19.0289,19.0331,19.0372,19.0413,19.0454,19.0495,19.0535,19.0575,19.0615,19.0655,19.0694,19.0733,19.0772,19.081,19.0849,19.0887,19.0925,19.0963,19.1,19.1038,19.1075,19.1112,19.1149,19.1186,19.1222,19.1259,19.1295,19.1331,19.1367,19.1403,19.1439,19.1474,19.151,19.1545,19.1581,19.1616,19.1651,19.1686,19.1721,19.1756,19.1791,19.1825,19.186,19.1895,19.1929,19.1964,19.1998,19.2033,19.2067,19.2102,19.2136,19.2171,19.2205,19.224,19.2274,19.2309,19.2343,19.2378,19.2412,19.2447,19.2482,19.2516,19.2551,19.2586,19.2621,19.2656,19.2691,19.2726,19.2761,19.2797,19.2832,19.2868,19.2903,19.2939,19.2975,19.3011,19.3047,19.3084,19.312,19.3157,19.3193,19.323,19.3268,19.3305,19.3342,19.338,19.3418,19.3456,19.3494,19.3533,19.3572,19.361,19.365,19.3689,19.3729,19.3769,19.3809,19.3849,19.389,19.3931,19.3972,19.4013,19.4055,19.4097,19.414,19.4182,19.4225,19.4269,19.4312,19.4356,19.44,19.4445,19.449,19.4535,19.4581,19.4627,19.4673,19.472,19.4767,19.4815,19.4863,19.4911,19.496,19.5009,19.5058,19.5108,19.5159,19.5209,19.5261,19.5312,19.5364,19.5417,19.547,19.5523,19.5577,19.5632,19.5687,19.5742,19.5798,19.5854,19.5911,19.5969,19.6027,19.6085,19.6144,19.6203,19.6263,19.6324,19.6385,19.6447,19.6509,19.6572,19.6635,19.6699,19.6764,19.6829,19.6894,19.6961,19.7028,19.7095,19.7163,19.7232,19.7302,19.7372,19.7442,19.7514,19.7585,19.7658,19.7731,19.7805,19.788,19.7955,19.8031,19.8108,19.8185,19.8263,19.8342,19.8422,19.8502,19.8583,19.8664,19.8747,19.883,19.8914,19.8999,19.9084,19.917,19.9257,19.9345,19.9433,19.9523,19.9613,19.9704,19.9795,19.9888,19.9981,20.0075,20.0171,20.0267,20.0364,20.0462,20.0562,20.0662,20.0763,20.0865,20.0968,20.1072,20.1177,20.1283,20.139,20.1498,20.1607,20.1717,20.1827,20.1938,20.2051,20.2164,20.2278,20.2393,20.2509,20.2625,20.2743,20.2861,20.298,20.31,20.3221,20.3343,20.3465,20.3588,20.3712,20.3837,20.3962,20.4088,20.4215,20.4343,20.4472,20.4601,20.4731,20.4861,20.4993,20.5125,20.5257,20.5391,20.5525,20.566,20.5795,20.5931,20.6068,20.6205,20.6343,20.6482,20.6621,20.6761,20.6901,20.7042,20.7183,20.7326,20.7468,20.7612,20.7755,20.79,20.8045,20.819,20.8336,20.8483,20.863,20.8777,20.8925,20.9074,20.9223,20.9372,20.9522,20.9672,20.9823,20.9975,21.0126,21.0278,21.0431,21.0584,21.0737,21.0891,21.1045,21.12,21.1355,21.151,21.1665,21.1821,21.1978,21.2134,21.2291,21.2449,21.2606,21.2764,21.2922,21.3081,21.324,21.3399,21.3558,21.3718,21.3878,21.4038,21.4198,21.4359,21.4519,21.468,21.4842,21.5003,21.5165,21.5326,21.5488,21.5651,21.5813,21.5975,21.6138,21.6301,21.6464,21.6627,21.679,21.6953,21.7116,21.728,21.7443,21.7607,21.7771,21.7934,21.8098,21.8262,21.8426,21.859,21.8754,21.8918,21.9082,21.9246,21.941,21.9574,21.9738,21.9902,22.0066,22.023,22.0394,22.0557,22.0721,22.0885,22.1048,22.1212,22.1375,22.1539,22.1702,22.1865,22.2028,22.2191,22.2353,22.2516,22.2678,22.284,22.3003,22.3164,22.3326,22.3488,22.3649,22.381,22.3971,22.4132,22.4292,22.4452,22.4612,22.4772,22.4931,22.5091,22.525,22.5408,22.5567,22.5725,22.5882,22.604,22.6197,22.6354,22.651,22.6666,22.6822,22.6978,22.7133,22.7287,22.7442,22.7596,22.7749,22.7902,22.8055,22.8207,22.8359,22.8511,22.8662,22.8812,22.8962,22.9112,22.9261,22.941,22.9558,22.9706,22.9853,23.0],[9.0,8.9939,8.9878,8.9817,8.9756,8.9695,8.9634,8.9573,8.9512,8.9451,8.939,8.9329,8.9268,8.9207,8.9146,8.9084,8.9023,8.8962,8.8901,8.884,8.8779,8.8718,8.8657,8.8596,8.8535,8.8474,8.8413,8.8352,8.8291,8.823,8.8169,8.8108,8.8047,8.7986,8.7925,8.7864,8.7803,8.7742,8.7681,8.762,8.7559,8.7498,8.7437,8.7375,8.7314,8.7253,8.7192,8.7131,8.707,8.7009,8.6948,8.6887,8.6826,8.6765,8.6704,8.6643,8.6582,8.6521,8.646,8.6399,8.6338,8.6277,8.6216,8.6155,8.6094,8.6033,8.5972,8.5911,8.585,8.5789,8.5728,8.5667,8.5605,8.5544,8.5483,8.5422,8.5361,8.53,8.5239,8.5178,8.5117,8.5056,8.4995,8.4934,8.4873,8.4812,8.4751,8.469,8.4629,8.4568,8.4507,8.4446,8.4385,8.4324,8.4263,8.4202,8.4141,8.408,8.4019,8.3958,8.3896,8.3835,8.3774,8.3713,8.3652,8.3591,8.353,8.3469,8.3408,8.3347,8.3286,8.3225,8.3164,8.3103,8.3042,8.2981,8.292,8.2859,8.2798,8.2737,8.2676,8.2615,8.2554,8.2493,8.2432,8.2371,8.231,8.2249,8.2188,8.2126,8.2065,8.2004,8.1943,8.1882,8.1821,8.176,8.1699,8.1638,8.1577,8.1516,8.1455,8.1394,8.1333,8.1272,8.1211,8.115,8.1089,8.1028,8.0967,8.0906,8.0845,8.0784,8.0723,8.0662,8.0601,8.054,8.0479,8.0417,8.0356,8.0295,8.0234,8.0173,8.0112,8.0051,7.999,7.9929,7.9868,7.9807,7.9746,7.9685,7.9624,7.9563,7.9502,7.9441,7.938,7.9319,7.9258,7.9197,7.9136,7.9075,7.9014,7.8953,7.8892,7.8831,7.877,7.8708,7.8647,7.8586,7.8525,7.8464,7.8403,7.8342,7.8281,7.822,7.8159,7.8098,7.8037,7.7976,7.7915,7.7854,7.7793,7.7732,7.7671,7.761,7.7549,7.7488,7.7427,7.7366,7.7305,7.7244,7.7183,7.7122,7.7061,7.7,7.6938,7.6877,7.6816,7.6755,7.6694,7.6633,7.6572,7.6511,7.645,7.6389,7.6328,7.6267,7.6206,7.6145,7.6084,7.6023,7.5962,7.5901,7.584,7.5779,7.5718,7.5657,7.5596,7.5535,7.5474,7.5413,7.5352,7.5291,7.5229,7.5168,7.5107,7.5046,7.4985,7.4924,7.4863,7.4802,7.4741,7.468,7.4619,7.4558,7.4497,7.4436,7.4375,7.4314,7.4253,7.4192,7.4131,7.407,7.4009,7.3948,7.3887,7.3826,7.3765,7.3704,7.3643,7.3582,7.3521,7.3459,7.3398,7.3337,7.3276,7.3215,7.3154,7.3093,7.3032,7.2971,7.291,7.2849,7.2788,7.2727,7.2666,7.2605,7.2544,7.2483,7.2422,7.2361,7.23,7.2239,7.2178,7.2117,7.2056,7.1995,7.1934,7.1873,7.1812,7.175,7.1689,7.1628,7.1567,7.1506,7.1445,7.1384,7.1323,7.1262,7.1201,7.114,7.1079,7.1018,7.0957,7.0896,7.0835,7.0774,7.0713,7.0652,7.0591,7.053,7.0469,7.0408,7.0347,7.0286,7.0225,7.0164,7.0103,7.0042,6.998,6.9919,6.9858,6.9797,6.9736,6.9675,6.9614,6.9553,6.9492,6.9431,6.937,6.9309,6.9248,6.9187,6.9126,6.9065,6.9004,6.8943,6.8882,6.8821,6.876,6.8699,6.8638,6.8577,6.8516,6.8455,6.8394,6.8333,6.8271,6.821,6.8149,6.8088,6.8027,6.7966,6.7905,6.7844,6.7783,6.7722,6.7661,6.76,6.7539,6.7478,6.7417,6.7356,6.7295,6.7234,6.7173,6.7112,6.7051,6.699,6.6929,6.6868,6.6807,6.6746,6.6685,6.6624,6.6562,6.6501,6.644,6.6379,6.6318,6.6257,6.6196,6.6135,6.6074,6.6013,6.5952,6.5891,6.583,6.5769,6.5708,6.5647,6.5586,6.5525,6.5464,6.5403,6.5342,6.5281,6.522,6.5159,6.5098,6.5037,6.4976,6.4915,6.4854,6.4792,6.4731,6.467,6.4609,6.4548,6.4487,6.4426,6.4365,6.4304,6.4243,6.4182,6.4121,6.406,6.3999,6.3938,6.3877,6.3816,6.3755,6.3694,6.3633,6.3572,6.3511,6.345,6.3389,6.3328,6.3267,6.3206,6.3145,6.3083,6.3022,6.2961,6.29,6.2839,6.2778,6.2717,6.2656,6.2595,6.2534,6.2473,6.2412,6.2351,6.229,6.2229,6.2168,6.2107,6.2046,6.1985,6.1924,6.1863,6.1802,6.1741,6.168,6.1619,6.1558,6.1497,6.1436,6.1375,6.1313,6.1252,6.1191,6.113,6.1069,6.1008,6.0947,6.0886,6.0825,6.0764,6.0703,6.0642,6.0581,6.052,6.0459,6.0398,6.0337,6.0276,6.0215,6.0154,6.0093,6.0032,5.9971,5.991,5.9849,5.9788,5.9727,5.9666,5.9604,5.9543,5.9482,5.9421,5.936,5.9299,5.9238,5.9177,5.9116,5.9055,5.8994,5.8933,5.8872,5.8811,5.875,5.8689,5.8628,5.8567,5.8506,5.8445,5.8384,5.8323,5.8262,5.8201,5.814,5.8079,5.8018,5.7957,5.7896,5.7834,5.7773,5.7712,5.7651,5.759,5.7529,5.7468,5.7407,5.7346,5.7285,5.7224,5.7163,5.7102,5.7041,5.698,5.6919,5.6858,5.6797,5.6736,5.6675,5.6614,5.6553,5.6492,5.6431,5.637,5.6309,5.6248,5.6187,5.6125,5.6064,5.6003,5.5942,5.5881,5.582,5.5759,5.5698,5.5637,5.5576,5.5515,5.5454,5.5393,5.5332,5.5271,5.521,5.5149,5.5088,5.5027,5.4966,5.4905,5.4844,5.4783,5.4722,5.4661,5.46,5.4539,5.4478,5.4417,5.4355,5.4294,5.4233,5.4172,5.4111,5.405,5.3989,5.3928,5.3867,5.3806,5.3745,5.3684,5.3623,5.3562,5.3501,5.344,5.3379,5.3318,5.3257,5.3196,5.3135,5.3074,5.3013,5.2952,5.2891,5.283,5.2769,5.2708,5.2646,5.2585,5.2524,5.2463,5.2402,5.2341,5.228,5.2219,5.2158,5.2097,5.2036,5.1975,5.1914,5.1853,5.1792,5.1731,5.167,5.1609,5.1548,5.1487,5.1426,5.1365,5.1304,5.1243,5.1182,5.1121,5.106,5.0999,5.0937,5.0876,5.0815,5.0754,5.0693,5.0632,5.0571,5.051,5.0449,5.0388,5.0327,5.0266,5.0205,5.0144,5.0083,5.0022,4.9961,4.99,4.9839,4.9778,4.9717,4.9656,4.9595,4.9534,4.9473,4.9412,4.9351,4.929,4.9229,4.9167,4.9106,4.9045,4.8984,4.8923,4.8862,4.8801,4.874,4.8679,4.8618,4.8557,4.8496,4.8435,4.8374,4.8313,4.8252,4.8191,4.813,4.8069,4.8008,4.7947,4.7886,4.7825,4.7764,4.7703,4.7642,4.7581,4.752,4.7458,4.7397,4.7336,4.7275,4.7214,4.7153,4.7092,4.7031,4.697,4.6909,4.6848,4.6787,4.6726,4.6665,4.6604,4.6543,4.6482,4.6421,4.636,4.6299,4.6238,4.6177,4.6116,4.6055,4.5994,4.5933,4.5872,4.5811,4.575,4.5688,4.5627,4.5566,4.5505,4.5444,4.5383,4.5322,4.5261,4.52,4.5139,4.5078,4.5017,4.4956,4.4895,4.4834,4.4773,4.4712,4.4651,4.459,4.4529,4.4468,4.4407,4.4346,4.4285,4.4224,4.4163,4.4102,4.4041,4.3979,4.3918,4.3857,4.3796,4.3735,4.3674,4.3613,4.3552,4.3491,4.343,4.3369,4.3308,4.3247,4.3186,4.3125,4.3064,4.3003,4.2942,4.2881,4.282,4.2759,4.2698,4.2637,4.2576,4.2515,4.2454,4.2393,4.2332,4.2271,4.2209,4.2148,4.2087,4.2026,4.1965,4.1904,4.1843,4.1782,4.1721,4.166,4.1599,4.1538,4.1477,4.1416,4.1355,4.1294,4.1233,4.1172,4.1111,4.105,4.0989,4.0928,4.0867,4.0806,4.0745,4.0684,4.0623,4.0562,4.05,4.0439,4.0378,4.0317,4.0256,4.0195,4.0134,4.0073,4.0012,3.9951,3.989,3.9829,3.9768,3.9707,3.9646,3.9585,3.9524,3.9463,3.9402,3.9341,3.928,3.9219,3.9158,3.9097,3.9036,3.8975,3.8914,3.8853,3.8792,3.873,3.8669,3.8608,3.8547,3.8486,3.8425,3.8364,3.8303,3.8242,3.8181,3.812,3.8059,3.7998,3.7937,3.7876,3.7815,3.7754,3.7693,3.7632,3.7571,3.751,3.7449,3.7388,3.7327,3.7266,3.7205,3.7144,3.7083,3.7021,3.696,3.6899,3.6838,3.6777,3.6716,3.6655,3.6594,3.6533,3.6472,3.6411,3.635,3.6289,3.6228,3.6167,3.6106,3.6045,3.5984,3.5923,3.5862,3.5801,3.574,3.5679,3.5618,3.5557,3.5496,3.5435,3.5374,3.5312,3.5251,3.519,3.5129,3.5068,3.5007,3.4946,3.4885,3.4824,3.4763,3.4702,3.4641,3.458,3.4519,3.4458,3.4397,3.4336,3.4275,3.4214,3.4153,3.4092,3.4031,3.397,3.3909,3.3848,3.3787,3.3726,3.3665,3.3604,3.3542,3.3481,3.342,3.3359,3.3298,3.3237,3.3176,3.3115,3.3054,3.2993,3.2932,3.2871,3.281,3.2749,3.2688,3.2627,3.2566,3.2505,3.2444,3.2383,3.2322,3.2261,3.22,3.2139,3.2078,3.2017,3.1956,3.1895,3.1833,3.1772,3.1711,3.165,3.1589,3.1528,3.1467,3.1406,3.1345,3.1284,3.1223,3.1162,3.1101,3.104,3.0979,3.0918,3.0857,3.0796,3.0735,3.0674,3.0613,3.0552,3.0491,3.043,3.0369,3.0308,3.0247,3.0186,3.0125,3.0063,3.0002,2.9941,2.988,2.9819,2.9758,2.9697,2.9636,2.9574,2.9513,2.9451,2.939,2.9329,2.9267,2.9206,2.9144,2.9082,2.9021,2.8959,2.8897,2.8836,2.8774,2.8712,2.865,2.8588,2.8526,2.8464,2.8402,2.834,2.8278,2.8216,2.8154,2.8092,2.803,2.7967,2.7905,2.7843,2.778,2.7718,2.7656,2.7593,2.7531,2.7468,2.7406,2.7343,2.728,2.7218,2.7155,2.7093,2.703,2.6967,2.6904,2.6841,2.6779,2.6716,2.6653,2.659,2.6527,2.6464,2.6401,2.6338,2.6275,2.6212,2.6149,2.6086,2.6023,2.5959,2.5896,2.5833,2.577,2.5706,2.5643,2.558,2.5516,2.5453,2.539,2.5326,2.5263,2.5199,2.5136,2.5072,2.5009,2.4945,2.4882,2.4818,2.4755,2.4691,2.4627,2.4564,2.45,2.4436,2.4372,2.4309,2.4245,2.4181,2.4117,2.4054,2.399,2.3926,2.3862,2.3798,2.3734,2.367,2.3606,2.3542,2.3478,2.3414,2.335,2.3286,2.3222,2.3158,2.3094,2.303,2.2966,2.2902,2.2838,2.2774,2.271,2.2646,2.2581,2.2517,2.2453,2.2389,2.2325,2.226,2.2196,2.2132,2.2068,2.2004,2.1939,2.1875,2.1811,2.1746,2.1682,2.1618,2.1554,2.1489,2.1425,2.1361,2.1296,2.1232,2.1168,2.1103,2.1039,2.0974,2.091,2.0846,2.0781,2.0717,2.0653,2.0588,2.0524,2.0459,2.0395,2.0331,2.0266,2.0202,2.0137,2.0073,2.0008,1.9944,1.988,1.9815,1.9751,1.9686,1.9622,1.9557,1.9493,1.9429,1.9364,1.93,1.9235,1.9171,1.9107,1.9042,1.8978,1.8913,1.8849,1.8784,1.872,1.8656,1.8591,1.8527,1.8462,1.8398,1.8334,1.8269,1.8205,1.8141,1.8076,1.8012,1.7948,1.7883,1.7819,1.7755,1.769,1.7626,1.7562,1.7497,1.7433,1.7369,1.7305,1.724,1.7176,1.7112,1.7048,1.6983,1.6919,1.6855,1.6791,1.6727,1.6662,1.6598,1.6534,1.647,1.6406,1.6342,1.6278,1.6214,1.615,1.6086,1.6021,1.5957,1.5893,1.5829,1.5765,1.5702,1.5638,1.5574,1.551,1.5446,1.5382,1.5318,1.5254,1.519,1.5127,1.5063,1.4999,1.4935,1.4872,1.4808,1.4744,1.468,1.4617,1.4553,1.4489,1.4426,1.4362,1.4299,1.4235,1.4172,1.4108,1.4045,1.3981,1.3918,1.3854,1.3791,1.3728,1.3664,1.3601,1.3538,1.3474,1.3411,1.3348,1.3285,1.3222,1.3158,1.3095,1.3032,1.2969,1.2906,1.2843,1.278,1.2717,1.2654,1.2591,1.2528,1.2466,1.2403,1.234,1.2277,1.2214,1.2152,1.2089,1.2026,1.1964,1.1901,1.1839,1.1776,1.1714,1.1651,1.1589,1.1526,1.1464,1.1402,1.1339,1.1277,1.1215,1.1153,1.109,1.1028,1.0966,1.0904,1.0842,1.078,1.0718,1.0656,1.0594,1.0532,1.0471,1.0409,1.0347,1.0285,1.0224,1.0162,1.01,1.0039,0.9977,0.9916,0.9854,0.9793,0.9732,0.967,0.9609,0.9548,0.9487,0.9425,0.9364,0.9303,0.9242,0.9181,0.912,0.9059,0.8998,0.8938,0.8877,0.8816,0.8755,0.8695,0.8634,0.8573,0.8513,0.8452,0.8392,0.8332,0.8271,0.8211,0.8151,0.809,0.803,0.797,0.791,0.785,0.779,0.773,0.767,0.761,0.7551,0.7491,0.7431,0.7372,0.7312,0.7252,0.7193,0.7134,0.7074,0.7015,0.6956,0.6896,0.6837,0.6778,0.6719,0.666,0.6601,0.6542,0.6483,0.6424,0.6365,0.6307,0.6248,0.6189,0.6131,0.6072,0.6014,0.5956,0.5897,0.5839,0.5781,0.5723,0.5664,0.5606,0.5548,0.549,0.5433,0.5375,0.5317,0.5259,0.5202,0.5144,0.5087,0.5029,0.4972,0.4914,0.4857,0.48,0.4743,0.4685,0.4628,0.4571,0.4515,0.4458,0.4401,0.4344,0.4287,0.4231,0.4174,0.4118,0.4061,0.4005,0.3949,0.3892,0.3836,0.378,0.3724,0.3668,0.3612,0.3556,0.3501,0.3445,0.3389,0.3334,0.3278,0.3223,0.3167,0.3112,0.3057,0.3002,0.2946,0.2891,0.2836,0.2782,0.2727,0.2672,0.2617,0.2563,0.2508,0.2454,0.2399,0.2345,0.2291,0.2236,0.2182,0.2128,0.2074,0.202,0.1967,0.1913,0.1859,0.1806,0.1752,0.1699,0.1645,0.1592,0.1539,0.1485,0.1432,0.1379,0.1326,0.1274,0.1221,0.1168,0.1115,0.1063,0.101,0.0958,0.0906,0.0853,0.0801,0.0749,0.0697,0.0645,0.0593,0.0542,0.049,0.0438,0.0387,0.0335,0.0284,0.0233,0.0182,0.013,0.0079,0.0028,-0.0022,-0.0073,-0.0124,-0.0175,-0.0225,-0.0276,-0.0326,-0.0377,-0.0427,-0.0477,-0.0527,-0.0578,-0.0628,-0.0678,-0.0728,-0.0778,-0.0827,-0.0877,-0.0927,-0.0976,-0.1026,-0.1076,-0.1125,-0.1174,-0.1224,-0.1273,-0.1322,-0.1371,-0.142,-0.1469,-0.1518,-0.1567,-0.1616,-0.1665,-0.1713,-0.1762,-0.1811,-0.1859,-0.1908,-0.1956,-0.2004,-0.2053,-0.2101,-0.2149,-0.2197,-0.2245,-0.2293,-0.2341,-0.2389,-0.2437,-0.2485,-0.2532,-0.258,-0.2627,-0.2675,-0.2722,-0.277,-0.2817,-0.2864,-0.2912,-0.2959,-0.3006,-0.3053,-0.31,-0.3147,-0.3194,-0.3241,-0.3287,-0.3334,-0.3381,-0.3427,-0.3474,-0.352,-0.3567,-0.3613,-0.3659,-0.3706,-0.3752,-0.3798,-0.3844,-0.389,-0.3936,-0.3982,-0.4028,-0.4074,-0.412,-0.4165,-0.4211,-0.4257,-0.4302,-0.4348,-0.4393,-0.4439,-0.4484,-0.4529,-0.4575,-0.462,-0.4665,-0.471,-0.4755,-0.48,-0.4845,-0.489,-0.4935,-0.498,-0.5024,-0.5069,-0.5114,-0.5158,-0.5203,-0.5247,-0.5292,-0.5336,-0.5381,-0.5425,-0.5469,-0.5513,-0.5558,-0.5602,-0.5646,-0.569,-0.5734,-0.5778,-0.5821,-0.5865,-0.5909,-0.5953,-0.5996,-0.604,-0.6084,-0.6127,-0.6171,-0.6214,-0.6258,-0.6301,-0.6344,-0.6387,-0.6431,-0.6474,-0.6517,-0.656,-0.6603,-0.6646,-0.6689,-0.6732,-0.6775,-0.6818,-0.686,-0.6903,-0.6946,-0.6988,-0.7031,-0.7073,-0.7116,-0.7158,-0.7201,-0.7243,-0.7286,-0.7328,-0.737,-0.7412,-0.7455,-0.7497,-0.7539,-0.7581,-0.7623,-0.7665,-0.7707,-0.7749,-0.779,-0.7832,-0.7874,-0.7916,-0.7957,-0.7999,-0.8041,-0.8082,-0.8124,-0.8165,-0.8207,-0.8248,-0.8289,-0.8331,-0.8372,-0.8413,-0.8454,-0.8496,-0.8537,-0.8578,-0.8619,-0.866,-0.8701,-0.8742,-0.8783,-0.8824,-0.8864,-0.8905,-0.8946,-0.8987,-0.9027,-0.9068,-0.9109,-0.9149,-0.919,-0.923,-0.9271,-0.9311,-0.9352,-0.9392,-0.9432,-0.9473,-0.9513,-0.9553,-0.9593,-0.9633,-0.9674,-0.9714,-0.9754,-0.9794,-0.9834,-0.9874,-0.9914,-0.9953,-0.9993,-1.0033,-1.0073,-1.0113,-1.0152,-1.0192,-1.0232,-1.0272,-1.0311,-1.0351,-1.039,-1.043,-1.0469,-1.0509,-1.0548,-1.0588,-1.0627,-1.0666,-1.0706,-1.0745,-1.0784,-1.0823,-1.0862,-1.0902,-1.0941,-1.098,-1.1019,-1.1058,-1.1097,-1.1136,-1.1175,-1.1214,-1.1253,-1.1292,-1.1331,-1.1369,-1.1408,-1.1447,-1.1486,-1.1524,-1.1563,-1.1602,-1.164,-1.1679,-1.1718,-1.1756,-1.1795,-1.1833,-1.1872,-1.191,-1.1949,-1.1987,-1.2025,-1.2064,-1.2102,-1.214,-1.2179,-1.2217,-1.2255,-1.2293,-1.2331,-1.237,-1.2408,-1.2446,-1.2484,-1.2522,-1.256,-1.2598,-1.2636,-1.2674,-1.2712,-1.275,-1.2788,-1.2826,-1.2864,-1.2902,-1.2939,-1.2977,-1.3015,-1.3053,-1.3091,-1.3128,-1.3166,-1.3204,-1.3241,-1.3279,-1.3317,-1.3354,-1.3392,-1.343,-1.3467,-1.3505,-1.3542,-1.358,-1.3617,-1.3655,-1.3692,-1.373,-1.3767,-1.3804,-1.3842,-1.3879,-1.3916,-1.3954,-1.3991,-1.4028,-1.4066,-1.4103,-1.414,-1.4177,-1.4215,-1.4252,-1.4289,-1.4326,-1.4363,-1.44,-1.4438,-1.4475,-1.4512,-1.4549,-1.4586,-1.4623,-1.466,-1.4697,-1.4734,-1.4771,-1.4808,-1.4845,-1.4882,-1.4919,-1.4956,-1.4993,-1.503,-1.5066,-1.5103,-1.514,-1.5177,-1.5214,-1.5251,-1.5288,-1.5324,-1.5361,-1.5398,-1.5435,-1.5472,-1.5508,-1.5545,-1.5582,-1.5618,-1.5655,-1.5692,-1.5729,-1.5765,-1.5802,-1.5839,-1.5875,-1.5912,-1.5949,-1.5985,-1.6022,-1.6058,-1.6095,-1.6132,-1.6168,-1.6205,-1.6241,-1.6278,-1.6315,-1.6351,-1.6388,-1.6424,-1.6461,-1.6497,-1.6534,-1.657,-1.6607,-1.6643,-1.668,-1.6716,-1.6753,-1.6789,-1.6826,-1.6862,-1.6899,-1.6935,-1.6972,-1.7008,-1.7045,-1.7081,-1.7117,-1.7154,-1.719,-1.7227,-1.7263,-1.73,-1.7336,-1.7372,-1.7409,-1.7445,-1.7482,-1.7518,-1.7554,-1.7591,-1.7627,-1.7664,-1.77,-1.7736,-1.7773,-1.7809,-1.7846,-1.7882,-1.7918,-1.7955,-1.7991,-1.8028,-1.8064,-1.81,-1.8137,-1.8173,-1.821,-1.8246,-1.8282,-1.8319,-1.8355,-1.8392,-1.8428,-1.8464,-1.8501,-1.8537,-1.8574,-1.861,-1.8646,-1.8683,-1.8719,-1.8756,-1.8792,-1.8829,-1.8865,-1.8901,-1.8938,-1.8974,-1.9011,-1.9047,-1.9084,-1.912,-1.9157,-1.9193,-1.923,-1.9266,-1.9303,-1.9339,-1.9376,-1.9412,-1.9449,-1.9485,-1.9522,-1.9558,-1.9595,-1.9631,-1.9668,-1.9704,-1.9741,-1.9777,-1.9814,-1.9851,-1.9887,-1.9924,-1.996,-1.9997,-2.0034,-2.007,-2.0107,-2.0144,-2.018,-2.0217,-2.0254,-2.0291,-2.0327,-2.0364,-2.0401,-2.0438,-2.0475,-2.0511,-2.0548,-2.0585,-2.0622,-2.0659,-2.0696,-2.0733,-2.0769,-2.0806,-2.0843,-2.088,-2.0917,-2.0954,-2.0991,-2.1028,-2.1065,-2.1102,-2.1139,-2.1176,-2.1213,-2.125,-2.1287,-2.1323,-2.136,-2.1397,-2.1434,-2.1471,-2.1508,-2.1545,-2.1582,-2.1619,-2.1656,-2.1693,-2.173,-2.1767,-2.1804,-2.1841,-2.1878,-2.1915,-2.1951,-2.1988,-2.2025,-2.2062,-2.2099,-2.2136,-2.2173,-2.2209,-2.2246,-2.2283,-2.232,-2.2357,-2.2393,-2.243,-2.2467,-2.2504,-2.254,-2.2577,-2.2614,-2.265,-2.2687,-2.2723,-2.276,-2.2797,-2.2833,-2.287,-2.2906,-2.2943,-2.2979,-2.3016,-2.3052,-2.3088,-2.3125,-2.3161,-2.3197,-2.3234,-2.327,-2.3306,-2.3342,-2.3379,-2.3415,-2.3451,-2.3487,-2.3523,-2.3559,-2.3595,-2.3631,-2.3667,-2.3703,-2.3739,-2.3775,-2.3811,-2.3846,-2.3882,-2.3918,-2.3953,-2.3989,-2.4025,-2.406,-2.4096,-2.4131,-2.4167,-2.4202,-2.4237,-2.4273,-2.4308,-2.4343,-2.4378,-2.4414,-2.4449,-2.4484,-2.4519,-2.4554,-2.4589,-2.4624,-2.4658,-2.4693,-2.4728,-2.4763,-2.4797,-2.4832,-2.4867,-2.4901,-2.4935,-2.497,-2.5004,-2.5039,-2.5073,-2.5107,-2.5141,-2.5175,-2.5209,-2.5243,-2.5277,-2.5311,-2.5345,-2.5379,-2.5412,-2.5446,-2.5479,-2.5513,-2.5546,-2.558,-2.5613,-2.5646,-2.568,-2.5713,-2.5746,-2.5779,-2.5812,-2.5845,-2.5878,-2.591,-2.5943,-2.5976,-2.6008,-2.6041,-2.6073,-2.6106,-2.6138,-2.617,-2.6202,-2.6234,-2.6266,-2.6298,-2.633,-2.6362,-2.6394,-2.6425,-2.6457,-2.6488,-2.652,-2.6551,-2.6583,-2.6614,-2.6645,-2.6676,-2.6707,-2.6738,-2.6769,-2.6799,-2.683,-2.6861,-2.6891,-2.6921,-2.6952,-2.6982,-2.7012,-2.7042,-2.7072,-2.7102,-2.7132,-2.7162,-2.7191,-2.7221,-2.725,-2.728,-2.7309,-2.7338,-2.7368,-2.7397,-2.7425,-2.7454,-2.7483,-2.7512,-2.754,-2.7569,-2.7597,-2.7626,-2.7654,-2.7682,-2.771,-2.7738,-2.7766,-2.7793,-2.7821,-2.7848,-2.7876,-2.7903,-2.793,-2.7958,-2.7985,-2.8012,-2.8038,-2.8065,-2.8092,-2.8118,-2.8145,-2.8171,-2.8197,-2.8223,-2.8249,-2.8275,-2.8301,-2.8327,-2.8352,-2.8378,-2.8403,-2.8428,-2.8453,-2.8478,-2.8503,-2.8528,-2.8553,-2.8577,-2.8602,-2.8626,-2.8651,-2.8675,-2.8699,-2.8723,-2.8746,-2.877,-2.8794,-2.8817,-2.884,-2.8863,-2.8887,-2.8909,-2.8932,-2.8955,-2.8978,-2.9,-2.9022,-2.9045,-2.9067,-2.9089,-2.9111,-2.9132,-2.9154,-2.9175,-2.9197,-2.9218,-2.9239,-2.926,-2.9281,-2.9302,-2.9322,-2.9343,-2.9363,-2.9383,-2.9403,-2.9423,-2.9443,-2.9463,-2.9482,-2.9502,-2.9521,-2.954,-2.9559,-2.9578,-2.9597,-2.9615,-2.9634,-2.9652,-2.967,-2.9688,-2.9706,-2.9724,-2.9741,-2.9759,-2.9776,-2.9793,-2.981,-2.9827,-2.9844,-2.9861,-2.9877,-2.9893,-2.991,-2.9926,-2.9942,-2.9957,-2.9973,-2.9988,-3.0004,-3.0019,-3.0034,-3.0048,-3.0063,-3.0077,-3.0092,-3.0106,-3.0119,-3.0133,-3.0147,-3.016,-3.0173,-3.0186,-3.0199,-3.0211,-3.0224,-3.0236,-3.0248,-3.026,-3.0272,-3.0283,-3.0295,-3.0306,-3.0317,-3.0328,-3.0339,-3.0349,-3.036,-3.037,-3.038,-3.039,-3.04,-3.041,-3.0419,-3.0428,-3.0437,-3.0446,-3.0455,-3.0464,-3.0472,-3.0481,-3.0489,-3.0497,-3.0505,-3.0513,-3.052,-3.0528,-3.0535,-3.0543,-3.055,-3.0556,-3.0563,-3.057,-3.0576,-3.0583,-3.0589,-3.0595,-3.0601,-3.0607,-3.0612,-3.0618,-3.0623,-3.0628,-3.0634,-3.0639,-3.0643,-3.0648,-3.0653,-3.0657,-3.0662,-3.0666,-3.067,-3.0674,-3.0678,-3.0681,-3.0685,-3.0688,-3.0692,-3.0695,-3.0698,-3.0701,-3.0704,-3.0707,-3.0709,-3.0712,-3.0714,-3.0717,-3.0719,-3.0721,-3.0723,-3.0725,-3.0727,-3.0728,-3.073,-3.0731,-3.0733,-3.0734,-3.0735,-3.0736,-3.0737,-3.0738,-3.0738,-3.0739,-3.074,-3.074,-3.074,-3.0741,-3.0741,-3.0741,-3.0741,-3.0741,-3.074,-3.074,-3.074,-3.0739,-3.0738,-3.0738,-3.0737,-3.0736,-3.0735,-3.0734,-3.0733,-3.0732,-3.0731,-3.0729,-3.0728,-3.0726,-3.0725,-3.0723,-3.0721,-3.072,-3.0718,-3.0716,-3.0714,-3.0712,-3.071,-3.0707,-3.0705,-3.0703,-3.07,-3.0698,-3.0695,-3.0692,-3.069,-3.0687,-3.0684,-3.0681,-3.0678,-3.0675,-3.0672,-3.0669,-3.0666,-3.0663,-3.0659,-3.0656,-3.0653,-3.0649,-3.0646,-3.0642,-3.0638,-3.0635,-3.0631,-3.0627,-3.0623,-3.062,-3.0616,-3.0612,-3.0608,-3.0604,-3.06,-3.0596,-3.0591,-3.0587,-3.0583,-3.0579,-3.0574,-3.057,-3.0566,-3.0561,-3.0557,-3.0552,-3.0548,-3.0543,-3.0539,-3.0534,-3.0529,-3.0525,-3.052,-3.0515,-3.0511,-3.0506,-3.0501,-3.0496,-3.0492,-3.0487,-3.0482,-3.0477,-3.0472,-3.0467,-3.0462,-3.0457,-3.0452,-3.0447,-3.0442,-3.0437,-3.0432,-3.0427,-3.0422,-3.0417,-3.0412,-3.0407,-3.0402,-3.0397,-3.0392,-3.0387,-3.0382,-3.0377,-3.0371,-3.0366,-3.0361,-3.0356,-3.0351,-3.0346,-3.0341,-3.0336,-3.0331,-3.0326,-3.0321,-3.0316,-3.0311,-3.0306,-3.0301,-3.0296,-3.0291,-3.0286,-3.0281,-3.0276,-3.0271,-3.0266,-3.0261,-3.0256,-3.0251,-3.0246,-3.0242,-3.0237,-3.0232,-3.0227,-3.0223,-3.0218,-3.0213,-3.0209,-3.0204,-3.0199,-3.0195,-3.019,-3.0186,-3.0181,-3.0177,-3.0173,-3.0168,-3.0164,-3.016,-3.0155,-3.0151,-3.0147,-3.0143,-3.0139,-3.0135,-3.0131,-3.0127,-3.0123,-3.0119,-3.0115,-3.0111,-3.0108,-3.0104,-3.01,-3.0097,-3.0093,-3.009,-3.0086,-3.0083,-3.0079,-3.0076,-3.0073,-3.007,-3.0067,-3.0064,-3.0061,-3.0058,-3.0055,-3.0052,-3.0049,-3.0047,-3.0044,-3.0042,-3.0039,-3.0037,-3.0034,-3.0032,-3.003,-3.0028,-3.0026,-3.0024,-3.0022,-3.002,-3.0018,-3.0017,-3.0015,-3.0013,-3.0012,-3.0011,-3.0009,-3.0008,-3.0007,-3.0006,-3.0005,-3.0004,-3.0003,-3.0003,-3.0002,-3.0001,-3.0001,-3.0001,-3.0,-3.0,-3.0,-3.0,-3.0,-3.0,-2.9999,-2.9999,-2.9999,-2.9998,-2.9997,-2.9997,-2.9996,-2.9995,-2.9994,-2.9993,-2.9992,-2.9991,-2.9989,-2.9988,-2.9986,-2.9985,-2.9983,-2.9982,-2.998,-2.9978,-2.9976,-2.9974,-2.9972,-2.997,-2.9968,-2.9965,-2.9963,-2.9961,-2.9958,-2.9956,-2.9953,-2.995,-2.9948,-2.9945,-2.9942,-2.9939,-2.9936,-2.9933,-2.993,-2.9927,-2.9923,-2.992,-2.9917,-2.9913,-2.991,-2.9906,-2.9903,-2.9899,-2.9896,-2.9892,-2.9888,-2.9884,-2.9881,-2.9877,-2.9873,-2.9869,-2.9865,-2.9861,-2.9857,-2.9853,-2.9848,-2.9844,-2.984,-2.9836,-2.9831,-2.9827,-2.9823,-2.9818,-2.9814,-2.9809,-2.9805,-2.98,-2.9795,-2.9791,-2.9786,-2.9782,-2.9777,-2.9772,-2.9767,-2.9763,-2.9758,-2.9753,-2.9748,-2.9743,-2.9738,-2.9733,-2.9729,-2.9724,-2.9719,-2.9714,-2.9709,-2.9704,-2.9699,-2.9694,-2.9689,-2.9684,-2.9679,-2.9674,-2.9669,-2.9663,-2.9658,-2.9653,-2.9648,-2.9643,-2.9638,-2.9633,-2.9628,-2.9623,-2.9618,-2.9613,-2.9608,-2.9603,-2.9597,-2.9592,-2.9587,-2.9582,-2.9577,-2.9572,-2.9567,-2.9562,-2.9557,-2.9552,-2.9547,-2.9542,-2.9537,-2.9532,-2.9527,-2.9523,-2.9518,-2.9513,-2.9508,-2.9503,-2.9498,-2.9494,-2.9489,-2.9484,-2.9479,-2.9475,-2.947,-2.9465,-2.9461,-2.9456,-2.9452,-2.9447,-2.9443,-2.9438,-2.9434,-2.9429,-2.9425,-2.9421,-2.9417,-2.9412,-2.9408,-2.9404,-2.94,-2.9396,-2.9392,-2.9388,-2.9384,-2.938,-2.9376,-2.9372,-2.9369,-2.9365,-2.9361,-2.9358,-2.9354,-2.935,-2.9347,-2.9344,-2.934,-2.9337,-2.9334,-2.9331,-2.9327,-2.9324,-2.9321,-2.9318,-2.9316,-2.9313,-2.931,-2.9307,-2.9305,-2.9302,-2.93,-2.9297,-2.9295,-2.9292,-2.929,-2.9288,-2.9286,-2.9284,-2.9282,-2.928,-2.9278,-2.9277,-2.9275,-2.9273,-2.9272,-2.927,-2.9269,-2.9268,-2.9267,-2.9266,-2.9265,-2.9264,-2.9263,-2.9262,-2.9261,-2.9261,-2.926,-2.926,-2.926,-2.9259,-2.9259,-2.9259,-2.9259,-2.9259,-2.926,-2.926,-2.926,-2.9261,-2.9262,-2.9262,-2.9263,-2.9264,-2.9265,-2.9266,-2.9268,-2.9269,-2.927,-2.9272,-2.9274,-2.9275,-2.9277,-2.9279,-2.9281,-2.9284,-2.9286,-2.9288,-2.9291,-2.9294,-2.9296,-2.9299,-2.9302,-2.9305,-2.9309,-2.9312,-2.9315,-2.9319,-2.9323,-2.9327,-2.9331,-2.9335,-2.9339,-2.9343,-2.9348,-2.9352,-2.9357,-2.9362,-2.9367,-2.9372,-2.9377,-2.9383,-2.9388,-2.9394,-2.94,-2.9406,-2.9412,-2.9418,-2.9424,-2.9431,-2.9438,-2.9444,-2.9451,-2.9458,-2.9466,-2.9473,-2.948,-2.9488,-2.9496,-2.9504,-2.9512,-2.952,-2.9529,-2.9537,-2.9546,-2.9555,-2.9564,-2.9573,-2.9582,-2.9592,-2.9601,-2.9611,-2.9621,-2.9631,-2.9641,-2.9652,-2.9662,-2.9673,-2.9684,-2.9695,-2.9707,-2.9718,-2.973,-2.9741,-2.9753,-2.9765,-2.9778,-2.979,-2.9803,-2.9816,-2.9828,-2.9842,-2.9855,-2.9868,-2.9882,-2.9896,-2.991,-2.9924,-2.9939,-2.9953,-2.9968,-2.9983,-2.9998,-3.0014,-3.003,-3.0048,-3.0066,-3.0085,-3.0105,-3.0125,-3.0147,-3.0169,-3.0192,-3.0216,-3.0241,-3.0266,-3.0292,-3.0319,-3.0347,-3.0376,-3.0405,-3.0435,-3.0466,-3.0497,-3.053,-3.0562,-3.0596,-3.063,-3.0665,-3.0701,-3.0738,-3.0775,-3.0812,-3.0851,-3.089,-3.0929,-3.097,-3.1011,-3.1052,-3.1094,-3.1137,-3.1181,-3.1225,-3.1269,-3.1314,-3.136,-3.1406,-3.1453,-3.1501,-3.1548,-3.1597,-3.1646,-3.1695,-3.1746,-3.1796,-3.1847,-3.1899,-3.1951,-3.2003,-3.2056,-3.211,-3.2163,-3.2218,-3.2273,-3.2328,-3.2383,-3.244,-3.2496,-3.2553,-3.261,-3.2668,-3.2726,-3.2785,-3.2843,-3.2903,-3.2962,-3.3022,-3.3082,-3.3143,-3.3204,-3.3265,-3.3327,-3.3388,-3.3451,-3.3513,-3.3576,-3.3639,-3.3702,-3.3766,-3.383,-3.3894,-3.3958,-3.4023,-3.4087,-3.4152,-3.4218,-3.4283,-3.4349,-3.4415,-3.4481,-3.4547,-3.4613,-3.468,-3.4747,-3.4813,-3.488,-3.4948,-3.5015,-3.5082,-3.515,-3.5217,-3.5285,-3.5353,-3.5421,-3.5489,-3.5557,-3.5625,-3.5693,-3.5762,-3.583,-3.5898,-3.5967,-3.6035,-3.6103,-3.6172,-3.624,-3.6309,-3.6377,-3.6445,-3.6514,-3.6582,-3.665,-3.6719,-3.6787,-3.6855,-3.6923,-3.6991,-3.7059,-3.7127,-3.7195,-3.7262,-3.733,-3.7397,-3.7464,-3.7532,-3.7599,-3.7665,-3.7732,-3.7799,-3.7865,-3.7931,-3.7997,-3.8063,-3.8129,-3.8194,-3.8259,-3.8324,-3.8389,-3.8454,-3.8518,-3.8582,-3.8646,-3.8709,-3.8773,-3.8836,-3.8898,-3.8961,-3.9023,-3.9085,-3.9146,-3.9208,-3.9268,-3.9329,-3.9389,-3.9449,-3.9509,-3.9568,-3.9627,-3.9685,-3.9743,-3.9801,-3.9858,-3.9915,-3.9971,-4.0027,-4.0083,-4.0138,-4.0193,-4.0247,-4.0301,-4.0355,-4.0407,-4.046,-4.0512,-4.0563,-4.0614,-4.0665,-4.0715,-4.0764,-4.0813,-4.0862,-4.091,-4.0957,-4.1004,-4.105,-4.1096,-4.1141,-4.1185,-4.1229,-4.1272,-4.1315,-4.1357,-4.1399,-4.144,-4.148,-4.152,-4.1559,-4.1597,-4.1635,-4.1672,-4.1708,-4.1744,-4.1778,-4.1813,-4.1846,-4.1879,-4.1911,-4.1943,-4.1973,-4.2003,-4.2033,-4.2061,-4.2089,-4.2116,-4.2142,-4.2167,-4.2192,-4.2216,-4.2239,-4.2261,-4.2283,-4.2303,-4.2323,-4.2342,-4.236,-4.2377,-4.2393,-4.2409,-4.2424,-4.2437,-4.245,-4.2462,-4.2473,-4.2483,-4.2493,-4.2501,-4.2508,-4.2515,-4.2521,-4.2525,-4.2529,-4.2531,-4.2533,-4.2534,-4.2534,-4.2532,-4.253,-4.2527,-4.2523,-4.2517,-4.2511,-4.2504,-4.2495,-4.2486,-4.2475,-4.2464,-4.2451,-4.2437,-4.2423,-4.2407,-4.239,-4.2372,-4.2352,-4.2332,-4.2311,-4.2288,-4.2264,-4.224,-4.2214,-4.2186,-4.2158,-4.2128,-4.2098,-4.2066,-4.2033,-4.1998,-4.1963,-4.1926,-4.1888,-4.1849,-4.1809,-4.1767,-4.1724,-4.168,-4.1634,-4.1588,-4.154,-4.149,-4.144,-4.1388,-4.1335,-4.128,-4.1224,-4.1167,-4.1108,-4.1048,-4.0987,-4.0925,-4.0861,-4.0795,-4.0729,-4.066,-4.0591,-4.052,-4.0448,-4.0374,-4.0299,-4.0222,-4.0144,-4.0065,-3.9984,-3.9901,-3.9815,-3.9727,-3.9636,-3.9543,-3.9448,-3.935,-3.925,-3.9147,-3.9043,-3.8935,-3.8826,-3.8714,-3.86,-3.8483,-3.8365,-3.8244,-3.8121,-3.7996,-3.7868,-3.7738,-3.7607,-3.7473,-3.7337,-3.7199,-3.7058,-3.6916,-3.6772,-3.6625,-3.6477,-3.6327,-3.6174,-3.602,-3.5864,-3.5706,-3.5546,-3.5384,-3.522,-3.5054,-3.4887,-3.4717,-3.4546,-3.4373,-3.4198,-3.4022,-3.3843,-3.3663,-3.3482,-3.3298,-3.3113,-3.2927,-3.2738,-3.2548,-3.2357,-3.2163,-3.1969,-3.1772,-3.1575,-3.1375,-3.1174,-3.0972,-3.0768,-3.0563,-3.0356,-3.0148,-2.9938,-2.9727,-2.9515,-2.9301,-2.9086,-2.887,-2.8652,-2.8433,-2.8213,-2.7992,-2.7769,-2.7545,-2.732,-2.7094,-2.6866,-2.6638,-2.6408,-2.6177,-2.5945,-2.5712,-2.5478,-2.5243,-2.5006,-2.4769,-2.4531,-2.4292,-2.4052,-2.3811,-2.3568,-2.3326,-2.3082,-2.2837,-2.2591,-2.2345,-2.2098,-2.1849,-2.1601,-2.1351,-2.11,-2.0849,-2.0597,-2.0345,-2.0091,-1.9837,-1.9583,-1.9327,-1.9071,-1.8815,-1.8558,-1.83,-1.8042,-1.7783,-1.7524,-1.7264,-1.7003,-1.6742,-1.6481,-1.6219,-1.5957,-1.5695,-1.5432,-1.5168,-1.4905,-1.4641,-1.4376,-1.4112,-1.3847,-1.3581,-1.3316,-1.305,-1.2784,-1.2518,-1.2252,-1.1985,-1.1719,-1.1452,-1.1185,-1.0918,-1.0651,-1.0383,-1.0116,-0.9849,-0.9582,-0.9314,-0.9047,-0.878,-0.8512,-0.8245,-0.7978,-0.7711,-0.7444,-0.7178,-0.6911,-0.6645,-0.6378,-0.6112,-0.5847,-0.5581,-0.5316,-0.5051,-0.4786,-0.4521,-0.4257,-0.3993,-0.373,-0.3467,-0.3204,-0.2942,-0.268,-0.2418,-0.2157,-0.1897,-0.1637,-0.1377,-0.1118,-0.0859,-0.0601,-0.0344,-0.0087,0.0169,0.0425,0.0679,0.0934,0.1187,0.144,0.1692,0.1944,0.2195,0.2445,0.2694,0.2942,0.319,0.3437,0.3683,0.3928,0.4172,0.4415,0.4658,0.4899,0.514,0.5379,0.5618,0.5856,0.6092,0.6328,0.6562,0.6796,0.7028,0.726,0.749,0.7719,0.7947,0.8174,0.8399,0.8624,0.8847,0.9069,0.929,0.9509,0.9727,0.9944,1.016,1.0374,1.0587,1.0798,1.1008,1.1217,1.1424,1.163,1.1835,1.2038,1.2239,1.2439,1.2638,1.2835,1.303,1.3224,1.3416,1.3607,1.3796,1.3983,1.4169,1.4353,1.4535,1.4716,1.4895,1.5072,1.5248,1.5421,1.5593,1.5763,1.5932,1.6098,1.6263,1.6426,1.6586,1.6745,1.6902,1.7057,1.7211,1.7362,1.7511,1.7658,1.7803,1.7946,1.8087,1.8226,1.8363,1.8498,1.8631,1.8761,1.8889,1.9016,1.914,1.9261,1.9381,1.9498,1.9613,1.9726,1.9837,1.9945,2.0051,2.0155,2.0258,2.0359,2.0458,2.0556,2.0653,2.0748,2.0841,2.0933,2.1023,2.1112,2.12,2.1286,2.1371,2.1454,2.1535,2.1616,2.1694,2.1772,2.1848,2.1922,2.1996,2.2067,2.2138,2.2207,2.2275,2.2341,2.2407,2.247,2.2533,2.2594,2.2654,2.2713,2.277,2.2826,2.2881,2.2935,2.2987,2.3038,2.3088,2.3137,2.3185,2.3231,2.3276,2.332,2.3363,2.3405,2.3446,2.3485,2.3523,2.3561,2.3597,2.3632,2.3666,2.3699,2.3731,2.3762,2.3791,2.382,2.3848,2.3875,2.39,2.3925,2.3949,2.3971,2.3993,2.4014,2.4034,2.4053,2.4071,2.4088,2.4104,2.4119,2.4134,2.4147,2.416,2.4172,2.4183,2.4193,2.4202,2.421,2.4218,2.4225,2.4231,2.4236,2.4241,2.4244,2.4247,2.4249,2.4251,2.4251,2.4251,2.4251,2.4249,2.4247,2.4244,2.4241,2.4237,2.4232,2.4227,2.422,2.4214,2.4206,2.4199,2.419,2.4181,2.4171,2.4161,2.415,2.4139,2.4127,2.4114,2.4101,2.4088,2.4074,2.406,2.4045,2.4029,2.4013,2.3997,2.398,2.3963,2.3945,2.3927,2.3909,2.389,2.387,2.3851,2.3831,2.381,2.379,2.3769,2.3747,2.3725,2.3703,2.3681,2.3658,2.3635,2.3612,2.3589,2.3565,2.3541,2.3517,2.3492,2.3468,2.3443,2.3418,2.3392,2.3367,2.3341,2.3316,2.329,2.3264,2.3237,2.3211,2.3185,2.3158,2.3131,2.3105,2.3078,2.3051,2.3024,2.2997,2.297,2.2943,2.2916,2.2889,2.2862,2.2834,2.2807,2.278,2.2753,2.2726,2.2699,2.2673,2.2646,2.2619,2.2592,2.2566,2.254,2.2513,2.2487,2.2461,2.2435,2.241,2.2384,2.2359,2.2334,2.2309,2.2284,2.2259,2.2235,2.2211,2.2187,2.2164,2.214,2.2117,2.2094,2.2072,2.205,2.2028,2.2006,2.1985,2.1964,2.1944,2.1924,2.1904,2.1884,2.1865,2.1847,2.1828,2.1811,2.1793,2.1776,2.176,2.1744,2.1728,2.1713,2.1698,2.1684,2.167,2.1657,2.1644,2.1632,2.1621,2.161,2.1599,2.1589,2.158,2.1571,2.1563,2.1555,2.1549,2.1542,2.1537,2.1531,2.1527,2.1523,2.152,2.1518,2.1516,2.1515,2.1515,2.1515,2.1516,2.1518,2.1521,2.1524,2.1528,2.1533,2.1539,2.1545,2.1553,2.1561,2.157,2.158,2.159,2.1602,2.1614,2.1627,2.1641,2.1656,2.1672,2.1689,2.1706,2.1725,2.1744,2.1765,2.1786,2.1808,2.1832,2.1856,2.1881,2.1908,2.1935,2.1963,2.1993,2.2023,2.2055,2.2087,2.2121,2.2155,2.2191,2.2228,2.2266,2.2305,2.2345,2.2386,2.2429,2.2472,2.2517,2.2563,2.261,2.2658,2.2708,2.2759,2.2811,2.2864,2.2918,2.2974,2.3031,2.3089,2.3148,2.3209,2.3271,2.3334,2.3399,2.3465,2.3532,2.3601,2.3671,2.3742,2.3815,2.3889,2.3964,2.4041,2.4119,2.4199,2.428,2.4363,2.4447,2.4532,2.4619,2.4707,2.4797,2.4888,2.4981,2.5076,2.5173,2.5272,2.5374,2.5479,2.5585,2.5694,2.5806,2.5919,2.6035,2.6154,2.6274,2.6397,2.6522,2.6649,2.6779,2.691,2.7044,2.718,2.7318,2.7458,2.76,2.7744,2.789,2.8039,2.8189,2.8341,2.8496,2.8652,2.881,2.897,2.9132,2.9296,2.9462,2.9629,2.9799,2.997,3.0143,3.0318,3.0495,3.0673,3.0853,3.1035,3.1218,3.1403,3.159,3.1778,3.1968,3.216,3.2353,3.2548,3.2744,3.2942,3.3141,3.3342,3.3544,3.3748,3.3953,3.416,3.4368,3.4577,3.4788,3.5,3.5213,3.5428,3.5644,3.5861,3.608,3.63,3.6521,3.6743,3.6966,3.7191,3.7416,3.7643,3.7871,3.81,3.833,3.8561,3.8794,3.9027,3.9261,3.9496,3.9732,3.997,4.0208,4.0447,4.0686,4.0927,4.1169,4.1411,4.1654,4.1898,4.2143,4.2389,4.2635,4.2882,4.313,4.3379,4.3628,4.3878,4.4128,4.4379,4.4631,4.4883,4.5136,4.539,4.5644,4.5898,4.6153,4.6409,4.6665,4.6921,4.7178,4.7435,4.7693,4.7951,4.8209,4.8468,4.8727,4.8986,4.9246,4.9505,4.9765,5.0026,5.0286,5.0547,5.0808,5.1069,5.133,5.1591,5.1853,5.2114,5.2376,5.2638,5.2899,5.3161,5.3423,5.3684,5.3946,5.4207,5.4469,5.473,5.4991,5.5253,5.5514,5.5774,5.6035,5.6295,5.6556,5.6816,5.7075,5.7335,5.7594,5.7853,5.8111,5.8369,5.8627,5.8885,5.9142,5.9398,5.9654,5.991,6.0165,6.042,6.0674,6.0928,6.1181,6.1434,6.1686,6.1937,6.2188,6.2438,6.2687,6.2936,6.3184,6.3432,6.3679,6.3925,6.417,6.4414,6.4658,6.4901,6.5143,6.5384,6.5624,6.5863,6.6102,6.6339,6.6576,6.6812,6.7046,6.728,6.7513,6.7744,6.7975,6.8204,6.8433,6.866,6.8886,6.9111,6.9335,6.9558,6.978,7.0],[1.0,0.9878,0.9756,0.9634,0.9512,0.939,0.9268,0.9147,0.9025,0.8903,0.8781,0.866,0.8538,0.8416,0.8295,0.8173,0.8052,0.7931,0.7809,0.7688,0.7567,0.7445,0.7324,0.7203,0.7082,0.6961,0.6839,0.6718,0.6597,0.6476,0.6355,0.6234,0.6114,0.5993,0.5872,0.5751,0.563,0.551,0.5389,0.5268,0.5148,0.5027,0.4906,0.4786,0.4665,0.4545,0.4424,0.4304,0.4184,0.4063,0.3943,0.3823,0.3702,0.3582,0.3462,0.3342,0.3222,0.3101,0.2981,0.2861,0.2741,0.2621,0.2501,0.2381,0.2261,0.2141,0.2021,0.1902,0.1782,0.1662,0.1542,0.1422,0.1303,0.1183,0.1063,0.0943,0.0824,0.0704,0.0584,0.0465,0.0345,0.0226,0.0106,-0.0013,-0.0133,-0.0252,-0.0372,-0.0491,-0.0611,-0.073,-0.0849,-0.0969,-0.1088,-0.1207,-0.1327,-0.1446,-0.1565,-0.1685,-0.1804,-0.1923,-0.2042,-0.2161,-0.2281,-0.24,-0.2519,-0.2638,-0.2757,-0.2876,-0.2995,-0.3114,-0.3233,-0.3352,-0.3471,-0.359,-0.3709,-0.3828,-0.3947,-0.4066,-0.4185,-0.4304,-0.4423,-0.4542,-0.4661,-0.478,-0.4899,-0.5018,-0.5137,-0.5255,-0.5374,-0.5493,-0.5612,-0.5731,-0.585,-0.5968,-0.6087,-0.6206,-0.6325,-0.6443,-0.6562,-0.6681,-0.68,-0.6918,-0.7037,-0.7156,-0.7275,-0.7393,-0.7512,-0.7631,-0.775,-0.7868,-0.7987,-0.8106,-0.8224,-0.8343,-0.8462,-0.858,-0.8699,-0.8818,-0.8937,-0.9055,-0.9174,-0.9293,-0.9411,-0.953,-0.9649,-0.9767,-0.9886,-1.0005,-1.0123,-1.0242,-1.0361,-1.0479,-1.0598,-1.0717,-1.0835,-1.0954,-1.1073,-1.1192,-1.131,-1.1429,-1.1548,-1.1666,-1.1785,-1.1904,-1.2023,-1.2141,-1.226,-1.2379,-1.2498,-1.2616,-1.2735,-1.2854,-1.2973,-1.3091,-1.321,-1.3329,-1.3448,-1.3567,-1.3685,-1.3804,-1.3923,-1.4042,-1.4161,-1.428,-1.4399,-1.4517,-1.4636,-1.4755,-1.4874,-1.4993,-1.5112,-1.5231,-1.535,-1.5469,-1.5588,-1.5707,-1.5826,-1.5945,-1.6064,-1.6183,-1.6302,-1.6421,-1.654,-1.6659,-1.6779,-1.6898,-1.7017,-1.7136,-1.7255,-1.7374,-1.7494,-1.7613,-1.7732,-1.7851,-1.7971,-1.809,-1.8209,-1.8329,-1.8448,-1.8567,-1.8687,-1.8806,-1.8926,-1.9045,-1.9165,-1.9284,-1.9404,-1.9523,-1.9643,-1.9762,-1.9882,-2.0002,-2.0121,-2.0241,-2.0361,-2.048,-2.06,-2.072,-2.084,-2.0959,-2.1079,-2.1199,-2.1319,-2.1439,-2.1559,-2.1679,-2.1799,-2.1919,-2.2039,-2.2159,-2.2279,-2.2399,-2.2519,-2.2639,-2.276,-2.288,-2.3,-2.312,-2.3241,-2.3361,-2.3481,-2.3602,-2.3722,-2.3843,-2.3963,-2.4084,-2.4204,-2.4325,-2.4445,-2.4566,-2.4687,-2.4807,-2.4928,-2.5049,-2.517,-2.5291,-2.5412,-2.5532,-2.5653,-2.5774,-2.5895,-2.6016,-2.6137,-2.6259,-2.638,-2.6501,-2.6622,-2.6743,-2.6865,-2.6986,-2.7107,-2.7229,-2.735,-2.7472,-2.7593,-2.7715,-2.7836,-2.7958,-2.808,-2.8201,-2.8323,-2.8445,-2.8567,-2.8688,-2.881,-2.8932,-2.9054,-2.9176,-2.9298,-2.942,-2.9543,-2.9665,-2.9787,-2.9909,-3.0032,-3.0154,-3.0276,-3.0399,-3.0521,-3.0644,-3.0766,-3.0889,-3.1012,-3.1134,-3.1257,-3.138,-3.1503,-3.1626,-3.1749,-3.1872,-3.1995,-3.2118,-3.2241,-3.2364,-3.2487,-3.2611,-3.2734,-3.2857,-3.2981,-3.3104,-3.3228,-3.3351,-3.3475,-3.3598,-3.3722,-3.3846,-3.397,-3.4094,-3.4218,-3.4342,-3.4466,-3.459,-3.4714,-3.4838,-3.4962,-3.5086,-3.5211,-3.5335,-3.546,-3.5584,-3.5709,-3.5833,-3.5958,-3.6083,-3.6207,-3.6332,-3.6457,-3.6582,-3.6707,-3.6832,-3.6957,-3.7082,-3.7208,-3.7333,-3.7458,-3.7584,-3.7709,-3.7835,-3.796,-3.8086,-3.8212,-3.8337,-3.8463,-3.8589,-3.8715,-3.8841,-3.8967,-3.9093,-3.9219,-3.9346,-3.9472,-3.9598,-3.9725,-3.9851,-3.9978,-4.0104,-4.0231,-4.0358,-4.0485,-4.0611,-4.0738,-4.0865,-4.0992,-4.112,-4.1247,-4.1374,-4.1501,-4.1629,-4.1756,-4.1884,-4.2011,-4.2139,-4.2267,-4.2394,-4.2522,-4.265,-4.2778,-4.2906,-4.3034,-4.3163,-4.3291,-4.3419,-4.3548,-4.3676,-4.3805,-4.3933,-4.4062,-4.4191,-4.432,-4.4449,-4.4578,-4.4707,-4.4836,-4.4965,-4.5094,-4.5224,-4.5353,-4.5483,-4.5612,-4.5742,-4.5872,-4.6001,-4.6131,-4.6261,-4.6391,-4.6521,-4.6651,-4.6782,-4.6912,-4.7042,-4.7173,-4.7303,-4.7434,-4.7565,-4.7696,-4.7826,-4.7957,-4.8088,-4.822,-4.8351,-4.8482,-4.8613,-4.8745,-4.8876,-4.9008,-4.914,-4.9271,-4.9403,-4.9535,-4.9667,-4.9799,-4.9931,-5.0063,-5.0196,-5.0328,-5.0461,-5.0594,-5.0727,-5.086,-5.0993,-5.1126,-5.1259,-5.1393,-5.1526,-5.166,-5.1794,-5.1928,-5.2062,-5.2196,-5.233,-5.2465,-5.2599,-5.2734,-5.2868,-5.3003,-5.3138,-5.3273,-5.3408,-5.3544,-5.3679,-5.3815,-5.395,-5.4086,-5.4222,-5.4358,-5.4494,-5.463,-5.4766,-5.4903,-5.5039,-5.5176,-5.5313,-5.5449,-5.5586,-5.5723,-5.586,-5.5998,-5.6135,-5.6272,-5.641,-5.6547,-5.6685,-5.6823,-5.6961,-5.7099,-5.7237,-5.7375,-5.7514,-5.7652,-5.779,-5.7929,-5.8068,-5.8207,-5.8345,-5.8484,-5.8623,-5.8763,-5.8902,-5.9041,-5.9181,-5.932,-5.946,-5.9599,-5.9739,-5.9879,-6.0019,-6.0159,-6.0299,-6.0439,-6.058,-6.072,-6.0861,-6.1001,-6.1142,-6.1283,-6.1423,-6.1564,-6.1705,-6.1846,-6.1987,-6.2129,-6.227,-6.2411,-6.2553,-6.2694,-6.2836,-6.2978,-6.3119,-6.3261,-6.3403,-6.3545,-6.3687,-6.3829,-6.3971,-6.4114,-6.4256,-6.4398,-6.4541,-6.4684,-6.4826,-6.4969,-6.5112,-6.5254,-6.5397,-6.554,-6.5683,-6.5827,-6.597,-6.6113,-6.6256,-6.64,-6.6543,-6.6687,-6.683,-6.6974,-6.7117,-6.7261,-6.7405,-6.7549,-6.7693,-6.7837,-6.7981,-6.8125,-6.8269,-6.8413,-6.8558,-6.8702,-6.8846,-6.8991,-6.9135,-6.928,-6.9425,-6.9569,-6.9714,-6.9859,-7.0004,-7.0149,-7.0293,-7.0438,-7.0583,-7.0729,-7.0874,-7.1019,-7.1164,-7.1309,-7.1455,-7.16,-7.1746,-7.1891,-7.2036,-7.2182,-7.2328,-7.2473,-7.2619,-7.2765,-7.291,-7.3056,-7.3202,-7.3348,-7.3494,-7.364,-7.3786,-7.3932,-7.4078,-7.4224,-7.437,-7.4517,-7.4663,-7.4809,-7.4955,-7.5102,-7.5248,-7.5395,-7.5541,-7.5687,-7.5834,-7.598,-7.6127,-7.6274,-7.642,-7.6567,-7.6714,-7.686,-7.7007,-7.7154,-7.7301,-7.7447,-7.7594,-7.7741,-7.7888,-7.8035,-7.8182,-7.8329,-7.8476,-7.8623,-7.877,-7.8917,-7.9064,-7.9211,-7.9358,-7.9506,-7.9653,-7.98,-7.9947,-8.0094,-8.0241,-8.0389,-8.0536,-8.0683,-8.0831,-8.0978,-8.1125,-8.1273,-8.142,-8.1567,-8.1715,-8.1862,-8.2009,-8.2157,-8.2304,-8.2452,-8.2599,-8.2746,-8.2894,-8.3041,-8.3189,-8.3336,-8.3484,-8.3631,-8.3779,-8.3926,-8.4074,-8.4221,-8.4369,-8.4516,-8.4664,-8.4811,-8.4959,-8.5106,-8.5254,-8.5401,-8.5549,-8.5696,-8.5844,-8.5991,-8.6139,-8.6286,-8.6434,-8.6581,-8.6729,-8.6876,-8.7024,-8.7171,-8.7318,-8.7466,-8.7613,-8.7761,-8.7908,-8.8055,-8.8203,-8.835,-8.8498,-8.8645,-8.8792,-8.894,-8.9087,-8.9234,-8.9382,-8.9529,-8.9676,-8.9823,-8.9971,-9.0118,-9.0265,-9.0412,-9.0559,-9.0706,-9.0853,-9.1001,-9.1148,-9.1295,-9.1442,-9.1589,-9.1736,-9.1883,-9.203,-9.2177,-9.2323,-9.247,-9.2617,-9.2764,-9.2911,-9.3057,-9.3204,-9.3351,-9.3498,-9.3644,-9.3791,-9.3937,-9.4084,-9.4231,-9.4377,-9.4523,-9.467,-9.4816,-9.4963,-9.5109,-9.5255,-9.5402,-9.5548,-9.5694,-9.584,-9.5986,-9.6132,-9.6278,-9.6424,-9.657,-9.6716,-9.6862,-9.7008,-9.7154,-9.7299,-9.7445,-9.7591,-9.7736,-9.7882,-9.8028,-9.8173,-9.8318,-9.8464,-9.8609,-9.8755,-9.89,-9.9045,-9.919,-9.9335,-9.948,-9.9625,-9.977,-9.9915,-10.006,-10.0205,-10.035,-10.0494,-10.0639,-10.0784,-10.0928,-10.1073,-10.1217,-10.1361,-10.1506,-10.165,-10.1794,-10.1938,-10.2082,-10.2227,-10.237,-10.2514,-10.2658,-10.2802,-10.2946,-10.3089,-10.3233,-10.3377,-10.352,-10.3663,-10.3807,-10.395,-10.4093,-10.4236,-10.438,-10.4523,-10.4666,-10.4808,-10.4951,-10.5094,-10.5237,-10.5379,-10.5522,-10.5664,-10.5807,-10.5949,-10.6091,-10.6233,-10.6375,-10.6517,-10.6659,-10.6801,-10.6943,-10.7085,-10.7226,-10.7368,-10.751,-10.7651,-10.7792,-10.7934,-10.8075,-10.8216,-10.8357,-10.8498,-10.8639,-10.8779,-10.892,-10.9061,-10.9201,-10.9342,-10.9482,-10.9622,-10.9762,-10.9903,-11.0043,-11.0182,-11.0322,-11.0462,-11.0602,-11.0741,-11.0881,-11.102,-11.1159,-11.1299,-11.1438,-11.1577,-11.1716,-11.1855,-11.1993,-11.2132,-11.227,-11.2409,-11.2547,-11.2686,-11.2824,-11.2962,-11.31,-11.3238,-11.3375,-11.3513,-11.3651,-11.3788,-11.3926,-11.4063,-11.42,-11.4337,-11.4474,-11.4611,-11.4748,-11.4884,-11.5021,-11.5157,-11.5294,-11.543,-11.5566,-11.5702,-11.5838,-11.5974,-11.6109,-11.6245,-11.638,-11.6516,-11.6651,-11.6786,-11.6921,-11.7056,-11.7191,-11.7326,-11.746,-11.7595,-11.7729,-11.7863,-11.7997,-11.8131,-11.8265,-11.8399,-11.8533,-11.8666,-11.88,-11.8933,-11.9066,-11.9199,-11.9332,-11.9465,-11.9597,-11.973,-11.9862,-11.9995,-12.0127,-12.0259,-12.0391,-12.0523,-12.0655,-12.0787,-12.0919,-12.1051,-12.1183,-12.1315,-12.1447,-12.1579,-12.171,-12.1842,-12.1974,-12.2105,-12.2237,-12.2368,-12.25,-12.2631,-12.2763,-12.2894,-12.3025,-12.3157,-12.3288,-12.3419,-12.355,-12.3681,-12.3812,-12.3943,-12.4074,-12.4205,-12.4336,-12.4467,-12.4598,-12.4729,-12.4859,-12.499,-12.5121,-12.5251,-12.5382,-12.5512,-12.5643,-12.5773,-12.5904,-12.6034,-12.6164,-12.6295,-12.6425,-12.6555,-12.6685,-12.6815,-12.6946,-12.7076,-12.7206,-12.7335,-12.7465,-12.7595,-12.7725,-12.7855,-12.7985,-12.8114,-12.8244,-12.8374,-12.8503,-12.8633,-12.8762,-12.8892,-12.9021,-12.915,-12.928,-12.9409,-12.9538,-12.9667,-12.9797,-12.9926,-13.0055,-13.0184,-13.0313,-13.0442,-13.0571,-13.07,-13.0828,-13.0957,-13.1086,-13.1215,-13.1343,-13.1472,-13.1601,-13.1729,-13.1858,-13.1986,-13.2114,-13.2243,-13.2371,-13.2499,-13.2628,-13.2756,-13.2884,-13.3012,-13.314,-13.3268,-13.3396,-13.3524,-13.3652,-13.378,-13.3908,-13.4036,-13.4163,-13.4291,-13.4419,-13.4546,-13.4674,-13.4802,-13.4929,-13.5057,-13.5184,-13.5311,-13.5439,-13.5566,-13.5693,-13.582,-13.5948,-13.6075,-13.6202,-13.6329,-13.6456,-13.6583,-13.671,-13.6837,-13.6964,-13.709,-13.7217,-13.7344,-13.7471,-13.7597,-13.7724,-13.785,-13.7977,-13.8103,-13.823,-13.8356,-13.8482,-13.8609,-13.8735,-13.8861,-13.8987,-13.9114,-13.924,-13.9366,-13.9492,-13.9618,-13.9744,-13.987,-13.9995,-14.0121,-14.0247,-14.0373,-14.0498,-14.0624,-14.075,-14.0875,-14.1001,-14.1126,-14.1252,-14.1377,-14.1502,-14.1628,-14.1753,-14.1878,-14.2003,-14.2128,-14.2254,-14.2379,-14.2504,-14.2629,-14.2754,-14.2878,-14.3003,-14.3128,-14.3253,-14.3378,-14.3502,-14.3627,-14.3752,-14.3876,-14.4001,-14.4125,-14.425,-14.4374,-14.4498,-14.4623,-14.4747,-14.4871,-14.4995,-14.512,-14.5244,-14.5368,-14.5492,-14.5616,-14.574,-14.5864,-14.5987,-14.6111,-14.6235,-14.6359,-14.6483,-14.6606,-14.673,-14.6853,-14.6977,-14.71,-14.7224,-14.7347,-14.7471,-14.7594,-14.7717,-14.784,-14.7964,-14.8087,-14.821,-14.8333,-14.8456,-14.8579,-14.8702,-14.8825,-14.8948,-14.9071,-14.9193,-14.9316,-14.9439,-14.9561,-14.9684,-14.9807,-14.9929,-15.0052,-15.0174,-15.0297,-15.0419,-15.0541,-15.0664,-15.0786,-15.0908,-15.103,-15.1152,-15.1274,-15.1396,-15.1518,-15.164,-15.1762,-15.1884,-15.2006,-15.2128,-15.225,-15.2371,-15.2493,-15.2615,-15.2736,-15.2858,-15.2979,-15.3101,-15.3222,-15.3343,-15.3465,-15.3586,-15.3707,-15.3829,-15.395,-15.4071,-15.4192,-15.4313,-15.4434,-15.4555,-15.4676,-15.4797,-15.4918,-15.5038,-15.5159,-15.528,-15.5401,-15.5521,-15.5642,-15.5762,-15.5883,-15.6003,-15.6124,-15.6244,-15.6365,-15.6485,-15.6605,-15.6725,-15.6845,-15.6966,-15.7086,-15.7206,-15.7326,-15.7446,-15.7566,-15.7686,-15.7805,-15.7925,-15.8045,-15.8165,-15.8284,-15.8404,-15.8524,-15.8643,-15.8763,-15.8882,-15.9002,-15.9121,-15.924,-15.936,-15.9479,-15.9598,-15.9717,-15.9836,-15.9956,-16.0075,-16.0194,-16.0313,-16.0432,-16.055,-16.0669,-16.0788,-16.0907,-16.1026,-16.1144,-16.1263,-16.1382,-16.15,-16.1619,-16.1737,-16.1856,-16.1974,-16.2092,-16.2211,-16.2329,-16.2447,-16.2565,-16.2684,-16.2802,-16.292,-16.3038,-16.3156,-16.3274,-16.3392,-16.3509,-16.3627,-16.3745,-16.3863,-16.398,-16.4098,-16.4216,-16.4333,-16.4451,-16.4568,-16.4686,-16.4803,-16.4921,-16.5038,-16.5155,-16.5272,-16.539,-16.5507,-16.5624,-16.5741,-16.5858,-16.5975,-16.6092,-16.6209,-16.6326,-16.6442,-16.6559,-16.6676,-16.6793,-16.6909,-16.7026,-16.7143,-16.7259,-16.7376,-16.7492,-16.7608,-16.7725,-16.7841,-16.7957,-16.8074,-16.819,-16.8306,-16.8422,-16.8538,-16.8654,-16.877,-16.8886,-16.9002,-16.9118,-16.9234,-16.935,-16.9465,-16.9581,-16.9697,-16.9812,-16.9928,-17.0044,-17.0159,-17.0275,-17.039,-17.0505,-17.0621,-17.0736,-17.0851,-17.0966,-17.1082,-17.1197,-17.1312,-17.1427,-17.1542,-17.1657,-17.1772,-17.1887,-17.2001,-17.2116,-17.2231,-17.2346,-17.246,-17.2575,-17.269,-17.2804,-17.2919,-17.3033,-17.3148,-17.3262,-17.3376,-17.3491,-17.3605,-17.3719,-17.3833,-17.3947,-17.4061,-17.4176,-17.429,-17.4404,-17.4517,-17.4631,-17.4745,-17.4859,-17.4973,-17.5086,-17.52,-17.5314,-17.5427,-17.5541,-17.5654,-17.5768,-17.5881,-17.5995,-17.6108,-17.6221,-17.6335,-17.6448,-17.6561,-17.6674,-17.6787,-17.69,-17.7013,-17.7126,-17.7239,-17.7352,-17.7465,-17.7578,-17.7691,-17.7803,-17.7916,-17.8029,-17.8141,-17.8254,-17.8366,-17.8479,-17.8591,-17.8704,-17.8816,-17.8928,-17.9041,-17.9153,-17.9265,-17.9377,-17.9489,-17.9601,-17.9713,-17.9825,-17.9937,-18.0049,-18.0161,-18.0273,-18.0385,-18.0497,-18.0609,-18.0721,-18.0833,-18.0946,-18.1058,-18.117,-18.1282,-18.1394,-18.1507,-18.1619,-18.1731,-18.1844,-18.1956,-18.2069,-18.2181,-18.2293,-18.2406,-18.2518,-18.2631,-18.2744,-18.2856,-18.2969,-18.3081,-18.3194,-18.3307,-18.3419,-18.3532,-18.3645,-18.3758,-18.387,-18.3983,-18.4096,-18.4209,-18.4322,-18.4434,-18.4547,-18.466,-18.4773,-18.4886,-18.4999,-18.5112,-18.5225,-18.5338,-18.5451,-18.5564,-18.5677,-18.579,-18.5903,-18.6016,-18.6129,-18.6242,-18.6355,-18.6468,-18.6581,-18.6694,-18.6807,-18.692,-18.7033,-18.7146,-18.7259,-18.7372,-18.7485,-18.7598,-18.7712,-18.7825,-18.7938,-18.8051,-18.8164,-18.8277,-18.839,-18.8503,-18.8616,-18.8729,-18.8843,-18.8956,-18.9069,-18.9182,-18.9295,-18.9408,-18.9521,-18.9634,-18.9747,-18.986,-18.9973,-19.0086,-19.0199,-19.0312,-19.0425,-19.0538,-19.0651,-19.0764,-19.0877,-19.099,-19.1103,-19.1216,-19.1329,-19.1442,-19.1555,-19.1668,-19.1781,-19.1894,-19.2007,-19.2119,-19.2232,-19.2345,-19.2458,-19.2571,-19.2683,-19.2796,-19.2909,-19.3022,-19.3134,-19.3247,-19.336,-19.3472,-19.3585,-19.3697,-19.381,-19.3922,-19.4035,-19.4147,-19.426,-19.4372,-19.4485,-19.4597,-19.4709,-19.4822,-19.4934,-19.5046,-19.5159,-19.5271,-19.5383,-19.5495,-19.5607,-19.5719,-19.5832,-19.5944,-19.6056,-19.6168,-19.628,-19.6391,-19.6503,-19.6615,-19.6727,-19.6839,-19.6951,-19.7062,-19.7174,-19.7286,-19.7397,-19.7509,-19.762,-19.7732,-19.7843,-19.7955,-19.8066,-19.8177,-19.8289,-19.84,-19.8511,-19.8622,-19.8733,-19.8845,-19.8956,-19.9067,-19.9178,-19.9288,-19.9399,-19.951,-19.9621,-19.9732,-19.9842,-19.9953,-20.0064,-20.0174,-20.0285,-20.0395,-20.0505,-20.0616,-20.0726,-20.0836,-20.0947,-20.1057,-20.1167,-20.1277,-20.1387,-20.1497,-20.1607,-20.1716,-20.1826,-20.1936,-20.2046,-20.2155,-20.2265,-20.2374,-20.2484,-20.2593,-20.2702,-20.2812,-20.2921,-20.303,-20.3139,-20.3248,-20.3357,-20.3466,-20.3575,-20.3683,-20.3792,-20.3901,-20.4009,-20.4118,-20.4226,-20.4335,-20.4443,-20.4551,-20.4659,-20.4768,-20.4876,-20.4984,-20.5091,-20.5199,-20.5307,-20.5415,-20.5522,-20.563,-20.5737,-20.5845,-20.5952,-20.606,-20.6167,-20.6274,-20.6381,-20.6488,-20.6595,-20.6702,-20.6808,-20.6915,-20.7022,-20.7128,-20.7235,-20.7341,-20.7447,-20.7553,-20.766,-20.7766,-20.7872,-20.7978,-20.8083,-20.8189,-20.8295,-20.84,-20.8506,-20.8611,-20.8716,-20.8822,-20.8927,-20.9032,-20.9137,-20.9242,-20.9347,-20.9451,-20.9556,-20.966,-20.9765,-20.9869,-20.9973,-21.0078,-21.0182,-21.0286,-21.039,-21.0493,-21.0597,-21.0701,-21.0804,-21.0908,-21.1011,-21.1114,-21.1218,-21.1321,-21.1424,-21.1526,-21.1629,-21.1732,-21.1834,-21.1937,-21.2039,-21.2142,-21.2244,-21.2346,-21.2448,-21.255,-21.2652,-21.2753,-21.2855,-21.2956,-21.3058,-21.3159,-21.326,-21.3361,-21.3462,-21.3563,-21.3664,-21.3764,-21.3865,-21.3965,-21.4066,-21.4166,-21.4266,-21.4366,-21.4466,-21.4566,-21.4665,-21.4765,-21.4864,-21.4964,-21.5063,-21.5162,-21.5261,-21.536,-21.5459,-21.5557,-21.5656,-21.5754,-21.5852,-21.5951,-21.6049,-21.6147,-21.6245,-21.6342,-21.644,-21.6537,-21.6635,-21.6732,-21.6829,-21.6926,-21.7023,-21.712,-21.7216,-21.7313,-21.7409,-21.7505,-21.7602,-21.7698,-21.7794,-21.7889,-21.7985,-21.808,-21.8176,-21.8271,-21.8366,-21.8461,-21.8556,-21.8651,-21.8746,-21.884,-21.8934,-21.9029,-21.9123,-21.9217,-21.931,-21.9404,-21.9498,-21.9591,-21.9684,-21.9778,-21.9871,-21.9964,-22.0056,-22.0149,-22.0241,-22.0334,-22.0426,-22.0518,-22.061,-22.0702,-22.0793,-22.0885,-22.0976,-22.1068,-22.1159,-22.125,-22.134,-22.1431,-22.1522,-22.1612,-22.1702,-22.1792,-22.1882,-22.1972,-22.2062,-22.2151,-22.2241,-22.233,-22.2419,-22.2508,-22.2597,-22.2685,-22.2774,-22.2862,-22.295,-22.3038,-22.3126,-22.3214,-22.3301,-22.3389,-22.3476,-22.3563,-22.365,-22.3737,-22.3824,-22.391,-22.3996,-22.4083,-22.4169,-22.4254,-22.434,-22.4426,-22.4511,-22.4596,-22.4681,-22.4766,-22.4851,-22.4936,-22.502,-22.5104,-22.5188,-22.5272,-22.5356,-22.544,-22.5523,-22.5607,-22.569,-22.5773,-22.5855,-22.5938,-22.602,-22.6103,-22.6185,-22.6267,-22.6349,-22.643,-22.6512,-22.6593,-22.6674,-22.6755,-22.6836,-22.6916,-22.6997,-22.7077,-22.7157,-22.7237,-22.7317,-22.7396,-22.7476,-22.7555,-22.7634,-22.7713,-22.7791,-22.787,-22.7948,-22.8026,-22.8104,-22.8182,-22.826,-22.8337,-22.8414,-22.8492,-22.8568,-22.8645,-22.8722,-22.8798,-22.8874,-22.895,-22.9026,-22.9101,-22.9177,-22.9252,-22.9327,-22.9402,-22.9477,-22.9551,-22.9625,-22.97,-22.9774,-22.9847,-22.9921,-22.9994,-23.0067,-23.0139,-23.0211,-23.0282,-23.0353,-23.0423,-23.0492,-23.0561,-23.0629,-23.0697,-23.0764,-23.083,-23.0896,-23.0961,-23.1026,-23.109,-23.1154,-23.1217,-23.1279,-23.1341,-23.1403,-23.1463,-23.1524,-23.1583,-23.1643,-23.1701,-23.1759,-23.1817,-23.1874,-23.1931,-23.1987,-23.2042,-23.2097,-23.2152,-23.2206,-23.2259,-23.2312,-23.2365,-23.2417,-23.2468,-23.2519,-23.257,-23.262,-23.267,-23.2719,-23.2768,-23.2816,-23.2863,-23.2911,-23.2958,-23.3004,-23.305,-23.3095,-23.314,-23.3185,-23.3229,-23.3273,-23.3316,-23.3359,-23.3401,-23.3443,-23.3485,-23.3526,-23.3567,-23.3607,-23.3647,-23.3687,-23.3726,-23.3765,-23.3803,-23.3841,-23.3879,-23.3916,-23.3953,-23.3989,-23.4025,-23.4061,-23.4097,-23.4132,-23.4166,-23.42,-23.4234,-23.4268,-23.4301,-23.4334,-23.4367,-23.4399,-23.4431,-23.4462,-23.4494,-23.4524,-23.4555,-23.4585,-23.4615,-23.4645,-23.4674,-23.4703,-23.4732,-23.476,-23.4789,-23.4816,-23.4844,-23.4871,-23.4898,-23.4925,-23.4951,-23.4978,-23.5004,-23.5029,-23.5055,-23.508,-23.5105,-23.5129,-23.5154,-23.5178,-23.5202,-23.5225,-23.5249,-23.5272,-23.5295,-23.5317,-23.534,-23.5362,-23.5384,-23.5406,-23.5428,-23.5449,-23.547,-23.5491,-23.5512,-23.5533,-23.5553,-23.5574,-23.5594,-23.5614,-23.5633,-23.5653,-23.5672,-23.5691,-23.571,-23.5729,-23.5748,-23.5767,-23.5785,-23.5803,-23.5821,-23.5839,-23.5857,-23.5875,-23.5892,-23.591,-23.5927,-23.5944,-23.5961,-23.5978,-23.5995,-23.6012,-23.6029,-23.6045,-23.6062,-23.6078,-23.6094,-23.611,-23.6126,-23.6142,-23.6158,-23.6174,-23.619,-23.6205,-23.6221,-23.6237,-23.6252,-23.6267,-23.6283,-23.6298,-23.6313,-23.6329,-23.6344,-23.6359,-23.6374,-23.6389,-23.6404,-23.6419,-23.6434,-23.6449,-23.6464,-23.6479,-23.6494,-23.6509,-23.6524,-23.6539,-23.6554,-23.6569,-23.6584,-23.6599,-23.6614,-23.6629,-23.6644,-23.6659,-23.6674,-23.6689,-23.6704,-23.6719,-23.6735,-23.675,-23.6765,-23.6781,-23.6796,-23.6812,-23.6827,-23.6843,-23.6858,-23.6874,-23.689,-23.6906,-23.6922,-23.6938,-23.6954,-23.6971,-23.6987,-23.7003,-23.702,-23.7037,-23.7053,-23.707,-23.7087,-23.7104,-23.7122,-23.7139,-23.7157,-23.7174,-23.7192,-23.721,-23.7228,-23.7246,-23.7264,-23.7283,-23.7301,-23.732,-23.7339,-23.7358,-23.7378,-23.7397,-23.7417,-23.7436,-23.7456,-23.7476,-23.7497,-23.7517,-23.7538,-23.7559,-23.758,-23.7601,-23.7623,-23.7645,-23.7667,-23.7689,-23.7711,-23.7734,-23.7756,-23.7779,-23.7803,-23.7826,-23.785,-23.7874,-23.7898,-23.7923,-23.7947,-23.7972,-23.7998,-23.8023,-23.8049,-23.8075,-23.8101,-23.8128,-23.8155,-23.8182,-23.8209,-23.8237,-23.8265,-23.8293,-23.8322,-23.835,-23.838,-23.8409,-23.8439,-23.8469,-23.8499,-23.853,-23.8561,-23.8592,-23.8624,-23.8656,-23.8689,-23.8721,-23.8754,-23.8788,-23.8821,-23.8856,-23.889,-23.8925,-23.896,-23.8995,-23.9031,-23.9068,-23.9104,-23.9141,-23.9179,-23.9216,-23.9254,-23.9293,-23.9332,-23.9371,-23.9411,-23.9451,-23.9492,-23.9533,-23.9574,-23.9616,-23.9658,-23.9701,-23.9744,-23.9787,-23.9831,-23.9875,-23.992,-23.9965,-24.0011,-24.0057,-24.0103,-24.015,-24.0197,-24.0244,-24.0291,-24.0339,-24.0387,-24.0435,-24.0483,-24.0532,-24.0581,-24.063,-24.0679,-24.0729,-24.0779,-24.0829,-24.088,-24.093,-24.0981,-24.1033,-24.1084,-24.1136,-24.1188,-24.124,-24.1292,-24.1345,-24.1398,-24.1451,-24.1504,-24.1558,-24.1612,-24.1666,-24.172,-24.1774,-24.1829,-24.1884,-24.1939,-24.1994,-24.205,-24.2105,-24.2161,-24.2218,-24.2274,-24.2331,-24.2387,-24.2444,-24.2501,-24.2559,-24.2616,-24.2674,-24.2732,-24.279,-24.2849,-24.2907,-24.2966,-24.3025,-24.3084,-24.3143,-24.3202,-24.3262,-24.3322,-24.3382,-24.3442,-24.3502,-24.3563,-24.3623,-24.3684,-24.3745,-24.3806,-24.3867,-24.3929,-24.399,-24.4052,-24.4114,-24.4176,-24.4238,-24.4301,-24.4363,-24.4426,-24.4488,-24.4551,-24.4614,-24.4678,-24.4741,-24.4804,-24.4868,-24.4932,-24.4996,-24.506,-24.5124,-24.5188,-24.5252,-24.5317,-24.5381,-24.5446,-24.5511,-24.5576,-24.5641,-24.5706,-24.5771,-24.5837,-24.5902,-24.5968,-24.6033,-24.6099,-24.6165,-24.6231,-24.6297,-24.6363,-24.643,-24.6496,-24.6562,-24.6629,-24.6696,-24.6762,-24.6829,-24.6896,-24.6963,-24.703,-24.7097,-24.7164,-24.7231,-24.7299,-24.7366,-24.7433,-24.7501,-24.7568,-24.7636,-24.7704,-24.7771,-24.7839,-24.7907,-24.7975,-24.8043,-24.8111,-24.8179,-24.8247,-24.8315,-24.8383,-24.8451,-24.852,-24.8588,-24.8656,-24.8725,-24.8793,-24.8861,-24.893,-24.8998,-24.9067,-24.9135,-24.9204,-24.9272,-24.9341,-24.941,-24.9478,-24.9547,-24.9616,-24.9684,-24.9753,-24.9821,-24.989,-24.9959,-25.0027,-25.0096,-25.0165,-25.0233,-25.0302,-25.0371,-25.0439,-25.0508,-25.0577,-25.0645,-25.0714,-25.0782,-25.0851,-25.0919,-25.0988,-25.1056,-25.1125,-25.1193,-25.1262,-25.133,-25.1398,-25.1467,-25.1535,-25.1603,-25.1671,-25.1739,-25.1808,-25.1876,-25.1944,-25.2012,-25.2079,-25.2147,-25.2215,-25.2283,-25.235,-25.2418,-25.2486,-25.2553,-25.2621,-25.2688,-25.2755,-25.2823,-25.289,-25.2957,-25.3024,-25.3091,-25.3158,-25.3224,-25.3291,-25.3358,-25.3424,-25.3491,-25.3557,-25.3623,-25.369,-25.3756,-25.3822,-25.3888,-25.3953,-25.4019,-25.4085,-25.415,-25.4216,-25.4281,-25.4346,-25.4411,-25.4476,-25.4541,-25.4606,-25.467,-25.4735,-25.4799,-25.4863,-25.4928,-25.4992,-25.5055,-25.5119,-25.5183,-25.5246,-25.531,-25.5373,-25.5436,-25.5499,-25.5562,-25.5624,-25.5687,-25.5749,-25.5812,-25.5874,-25.5936,-25.5997,-25.6059,-25.612,-25.6182,-25.6243,-25.6304,-25.6365,-25.6425,-25.6486,-25.6546,-25.6606,-25.6666,-25.6726,-25.6786,-25.6845,-25.6904,-25.6964,-25.7022,-25.7081,-25.714,-25.7198,-25.7256,-25.7314,-25.7372,-25.743,-25.7487,-25.7544,-25.7601,-25.7658,-25.7715,-25.7771,-25.7827,-25.7883,-25.7939,-25.7995,-25.805,-25.8105,-25.816,-25.8215,-25.8269,-25.8324,-25.8378,-25.8432,-25.8485,-25.8539,-25.8592,-25.8645,-25.8697,-25.875,-25.8802,-25.8854,-25.8906,-25.8957,-25.9008,-25.9059,-25.911,-25.9161,-25.9211,-25.9261,-25.9311,-25.936,-25.9409,-25.9458,-25.9507,-25.9556,-25.9604,-25.9652,-25.9699,-25.9747,-25.9794,-25.9841,-25.9887,-25.9934,-25.998,-26.0026,-26.0071,-26.0117,-26.0163,-26.0209,-26.0254,-26.03,-26.0346,-26.0392,-26.0437,-26.0483,-26.0529,-26.0575,-26.062,-26.0666,-26.0712,-26.0757,-26.0803,-26.0849,-26.0894,-26.094,-26.0986,-26.1031,-26.1077,-26.1122,-26.1168,-26.1213,-26.1259,-26.1304,-26.1349,-26.1395,-26.144,-26.1486,-26.1531,-26.1576,-26.1621,-26.1667,-26.1712,-26.1757,-26.1802,-26.1847,-26.1892,-26.1937,-26.1982,-26.2027,-26.2072,-26.2117,-26.2162,-26.2207,-26.2251,-26.2296,-26.2341,-26.2385,-26.243,-26.2474,-26.2519,-26.2563,-26.2608,-26.2652,-26.2696,-26.2741,-26.2785,-26.2829,-26.2873,-26.2917,-26.2961,-26.3005,-26.3049,-26.3093,-26.3136,-26.318,-26.3224,-26.3267,-26.3311,-26.3354,-26.3398,-26.3441,-26.3484,-26.3527,-26.357,-26.3613,-26.3656,-26.3699,-26.3742,-26.3785,-26.3828,-26.387,-26.3913,-26.3955,-26.3998,-26.404,-26.4082,-26.4124,-26.4166,-26.4208,-26.425,-26.4292,-26.4334,-26.4376,-26.4417,-26.4459,-26.45,-26.4542,-26.4583,-26.4624,-26.4665,-26.4706,-26.4747,-26.4788,-26.4828,-26.4869,-26.491,-26.495,-26.499,-26.503,-26.5071,-26.5111,-26.5151,-26.519,-26.523,-26.527,-26.5309,-26.5349,-26.5388,-26.5427,-26.5466,-26.5505,-26.5544,-26.5583,-26.5622,-26.566,-26.5699,-26.5737,-26.5775,-26.5813,-26.5851,-26.5889,-26.5927,-26.5965,-26.6002,-26.604,-26.6077,-26.6114,-26.6151,-26.6188,-26.6225,-26.6262,-26.6298,-26.6335,-26.6371,-26.6407,-26.6443,-26.6479,-26.6515,-26.655,-26.6586,-26.6621,-26.6657,-26.6692,-26.6727,-26.6762,-26.6796,-26.6831,-26.6865,-26.69,-26.6934,-26.6968,-26.7002,-26.7035,-26.7069,-26.7103,-26.7136,-26.7169,-26.7202,-26.7235,-26.7268,-26.73,-26.7333,-26.7365,-26.7397,-26.7429,-26.7461,-26.7492,-26.7524,-26.7555,-26.7586,-26.7617,-26.7648,-26.7679,-26.7709,-26.774,-26.777,-26.78,-26.783,-26.786,-26.7889,-26.7919,-26.7948,-26.7977,-26.8006,-26.8034,-26.8063,-26.8091,-26.812,-26.8148,-26.8175,-26.8203,-26.8231,-26.8258,-26.8285,-26.8312,-26.8339,-26.8365,-26.8392,-26.8418,-26.8444,-26.847,-26.8496,-26.8521,-26.8547,-26.8572,-26.8597,-26.8621,-26.8646,-26.867,-26.8694,-26.8718,-26.8742,-26.8766,-26.8789,-26.8813,-26.8836,-26.8858,-26.8881,-26.8903,-26.8926,-26.8948,-26.8969,-26.8991,-26.9012,-26.9034,-26.9055,-26.9075,-26.9096,-26.9116,-26.9137,-26.9157,-26.9176,-26.9196,-26.9215,-26.9234,-26.9253,-26.9272,-26.929,-26.9309,-26.9327,-26.9345,-26.9362,-26.938,-26.9397,-26.9414,-26.943,-26.9447,-26.9463,-26.9479,-26.9495,-26.9511,-26.9526,-26.9541,-26.9556,-26.9571,-26.9585,-26.9599,-26.9613,-26.9627,-26.9641,-26.9654,-26.9667,-26.968,-26.9692,-26.9705,-26.9717,-26.9729,-26.974,-26.9752,-26.9763,-26.9774,-26.9784,-26.9795,-26.9805,-26.9815,-26.9824,-26.9834,-26.9843,-26.9852,-26.9861,-26.9869,-26.9877,-26.9885,-26.9893,-26.99,-26.9907,-26.9914,-26.9921,-26.9927,-26.9933,-26.9939,-26.9945,-26.995,-26.9955,-26.996,-26.9964,-26.9969,-26.9973,-26.9976,-26.998,-26.9983,-26.9986,-26.9988,-26.9991,-26.9993,-26.9995,-26.9996,-26.9998,-26.9999,-26.9999,-27.0,-27.0,-27.0,-27.0,-27.0001,-27.0001,-27.0002,-27.0002,-27.0003,-27.0004,-27.0005,-27.0006,-27.0007,-27.0009,-27.001,-27.0012,-27.0013,-27.0015,-27.0017,-27.0019,-27.0021,-27.0023,-27.0025,-27.0028,-27.003,-27.0032,-27.0035,-27.0037,-27.004,-27.0042,-27.0045,-27.0048,-27.0051,-27.0053,-27.0056,-27.0059,-27.0062,-27.0065,-27.0068,-27.0071,-27.0074,-27.0077,-27.008,-27.0084,-27.0087,-27.009,-27.0093,-27.0096,-27.0099,-27.0102,-27.0106,-27.0109,-27.0112,-27.0115,-27.0118,-27.0121,-27.0124,-27.0127,-27.013,-27.0133,-27.0136,-27.0139,-27.0142,-27.0145,-27.0148,-27.015,-27.0153,-27.0156,-27.0158,-27.0161,-27.0163,-27.0165,-27.0168,-27.017,-27.0172,-27.0174,-27.0176,-27.0178,-27.018,-27.0182,-27.0183,-27.0185,-27.0186,-27.0187,-27.0189,-27.019,-27.0191,-27.0192,-27.0192,-27.0193,-27.0194,-27.0194,-27.0194,-27.0194,-27.0194,-27.0194,-27.0194,-27.0194,-27.0193,-27.0192,-27.0191,-27.019,-27.0189,-27.0188,-27.0186,-27.0185,-27.0183,-27.0181,-27.0179,-27.0176,-27.0174,-27.0171,-27.0168,-27.0165,-27.0162,-27.0158,-27.0154,-27.0151,-27.0146,-27.0142,-27.0138,-27.0133,-27.0128,-27.0123,-27.0117,-27.0112,-27.0106,-27.01,-27.0093,-27.0087,-27.008,-27.0073,-27.0065,-27.0058,-27.005,-27.0042,-27.0034,-27.0025,-27.0016,-27.0007,-26.9998,-26.9988,-26.9978,-26.9968,-26.9957,-26.9946,-26.9935,-26.9924,-26.9912,-26.99,-26.9888,-26.9876,-26.9863,-26.9849,-26.9836,-26.9822,-26.9808,-26.9794,-26.9779,-26.9764,-26.9748,-26.9732,-26.9716,-26.97,-26.9683,-26.9666,-26.9648,-26.9631,-26.9612,-26.9594,-26.9575,-26.9556,-26.9536,-26.9516,-26.9496,-26.9475,-26.9454,-26.9432,-26.9411,-26.9388,-26.9366,-26.9343,-26.9319,-26.9295,-26.9271,-26.9246,-26.9221,-26.9196,-26.917,-26.9144,-26.9117,-26.909,-26.9062,-26.9034,-26.9006,-26.8977,-26.8948,-26.8918,-26.8888,-26.8857,-26.8826,-26.8795,-26.8763,-26.873,-26.8697,-26.8664,-26.863,-26.8596,-26.8561,-26.8526,-26.849,-26.8454,-26.8417,-26.838,-26.8342,-26.8304,-26.8266,-26.8226,-26.8187,-26.8147,-26.8106,-26.8065,-26.8023,-26.7981,-26.7938,-26.7895,-26.7851,-26.7807,-26.7762,-26.7717,-26.7671,-26.7625,-26.7578,-26.753,-26.7482,-26.7433,-26.7384,-26.7334,-26.7284,-26.7233,-26.7182,-26.713,-26.7077,-26.7024,-26.697,-26.6916,-26.6861,-26.6806,-26.675,-26.6693,-26.6636,-26.6578,-26.652,-26.646,-26.6401,-26.6341,-26.628,-26.6218,-26.6156,-26.6093,-26.603,-26.5966,-26.5901,-26.5836,-26.577,-26.5704,-26.5636,-26.5569,-26.55,-26.5431,-26.5361,-26.5291,-26.522,-26.5148,-26.5075,-26.5002,-26.4928,-26.4854,-26.4779,-26.4703,-26.4626,-26.4549,-26.4471,-26.4393,-26.4314,-26.4234,-26.4153,-26.4072,-26.3989,-26.3907,-26.3823,-26.3739,-26.3654,-26.3568,-26.3482,-26.3395,-26.3307,-26.3218,-26.3129,-26.3039,-26.2948,-26.2856,-26.2764,-26.2671,-26.2577,-26.2483,-26.2387,-26.2291,-26.2194,-26.2097,-26.1998,-26.1899,-26.1799,-26.1698,-26.1597,-26.1494,-26.1391,-26.1287,-26.1183,-26.1077,-26.0971,-26.0864,-26.0756,-26.0647,-26.0537,-26.0427,-26.0316,-26.0204,-26.0091,-25.9977,-25.9862,-25.9745,-25.9626,-25.9506,-25.9384,-25.926,-25.9135,-25.9007,-25.8879,-25.8748,-25.8616,-25.8482,-25.8347,-25.8209,-25.8071,-25.793,-25.7789,-25.7645,-25.75,-25.7354,-25.7206,-25.7056,-25.6905,-25.6752,-25.6598,-25.6443,-25.6286,-25.6127,-25.5967,-25.5806,-25.5643,-25.5479,-25.5314,-25.5147,-25.4978,-25.4809,-25.4638,-25.4465,-25.4291,-25.4116,-25.394,-25.3762,-25.3584,-25.3403,-25.3222,-25.3039,-25.2855,-25.267,-25.2484,-25.2296,-25.2108,-25.1918,-25.1727,-25.1534,-25.1341,-25.1147,-25.0951,-25.0754,-25.0556,-25.0357,-25.0157,-24.9956,-24.9754,-24.9551,-24.9347,-24.9142,-24.8936,-24.8729,-24.852,-24.8311,-24.8101,-24.789,-24.7678,-24.7465,-24.7252,-24.7037,-24.6821,-24.6605,-24.6387,-24.6169,-24.595,-24.573,-24.551,-24.5288,-24.5066,-24.4843,-24.4619,-24.4394,-24.4169,-24.3943,-24.3716,-24.3489,-24.326,-24.3032,-24.2802,-24.2572,-24.2341,-24.2109,-24.1877,-24.1644,-24.1411,-24.1177,-24.0942,-24.0707,-24.0471,-24.0235,-23.9998,-23.976,-23.9522,-23.9284,-23.9045,-23.8806,-23.8566,-23.8325,-23.8085,-23.7843,-23.7602,-23.736,-23.7117,-23.6874,-23.6631,-23.6387,-23.6143,-23.5899,-23.5654,-23.5409,-23.5164,-23.4919,-23.4673,-23.4427,-23.418,-23.3933,-23.3687,-23.3439,-23.3192,-23.2944,-23.2697,-23.2449,-23.2201,-23.1952,-23.1704,-23.1455,-23.1206,-23.0958,-23.0709,-23.046,-23.0211,-22.9961,-22.9712,-22.9463,-22.9214,-22.8964,-22.8715,-22.8466,-22.8216,-22.7967,-22.7718,-22.7468,-22.7219,-22.697,-22.6721,-22.6472,-22.6223,-22.5975,-22.5726,-22.5478,-22.5229,-22.4981,-22.4733,-22.4485,-22.4238,-22.399,-22.3743,-22.3496,-22.325,-22.3003,-22.2757,-22.2511,-22.2266,-22.202,-22.1775,-22.1531,-22.1286,-22.1042,-22.0799,-22.0555,-22.0313,-22.007,-21.9828,-21.9586,-21.9345,-21.9104,-21.8864,-21.8624,-21.8385,-21.8146,-21.7907,-21.7669,-21.7432,-21.7195,-21.6959,-21.6723,-21.6488,-21.6253,-21.6019,-21.5786,-21.5553,-21.5321,-21.5089,-21.4858,-21.4628,-21.4398,-21.4169,-21.3941,-21.3714,-21.3487,-21.3261,-21.3035,-21.2811,-21.2587,-21.2364,-21.2142,-21.192,-21.17,-21.148,-21.1261,-21.1042,-21.0825,-21.0609,-21.0393,-21.0178,-20.9965,-20.9752,-20.954,-20.9329,-20.9119,-20.891,-20.8701,-20.8494,-20.8288,-20.8083,-20.7879,-20.7676,-20.7474,-20.7272,-20.7072,-20.6874,-20.6676,-20.6479,-20.6283,-20.6089,-20.5896,-20.5703,-20.5512,-20.5322,-20.5134,-20.4946,-20.476,-20.4575,-20.4391,-20.4208,-20.4027,-20.3846,-20.3668,-20.349,-20.3314,-20.3139,-20.2965,-20.2793,-20.2622,-20.2452,-20.2283,-20.2117,-20.1951,-20.1787,-20.1624,-20.1463,-20.1303,-20.1144,-20.0987,-20.0832,-20.0678,-20.0525,-20.0374,-20.0224,-20.0076,-19.993,-19.9784,-19.964,-19.9496,-19.9354,-19.9213,-19.9072,-19.8933,-19.8794,-19.8657,-19.852,-19.8385,-19.825,-19.8116,-19.7984,-19.7852,-19.7721,-19.7591,-19.7462,-19.7334,-19.7207,-19.708,-19.6955,-19.683,-19.6707,-19.6584,-19.6462,-19.6341,-19.6221,-19.6102,-19.5983,-19.5865,-19.5749,-19.5633,-19.5517,-19.5403,-19.5289,-19.5177,-19.5065,-19.4953,-19.4843,-19.4733,-19.4624,-19.4516,-19.4409,-19.4302,-19.4196,-19.4091,-19.3987,-19.3883,-19.378,-19.3678,-19.3576,-19.3475,-19.3375,-19.3276,-19.3177,-19.3079,-19.2981,-19.2884,-19.2788,-19.2692,-19.2598,-19.2503,-19.241,-19.2317,-19.2224,-19.2132,-19.2041,-19.195,-19.186,-19.1771,-19.1682,-19.1594,-19.1506,-19.1419,-19.1332,-19.1246,-19.1161,-19.1075,-19.0991,-19.0907,-19.0824,-19.0741,-19.0658,-19.0576,-19.0495,-19.0414,-19.0333,-19.0253,-19.0173,-19.0094,-19.0015,-18.9937,-18.9859,-18.9782,-18.9705,-18.9628,-18.9552,-18.9476,-18.9401,-18.9326,-18.9251,-18.9177,-18.9103,-18.903,-18.8957,-18.8884,-18.8812,-18.874,-18.8668,-18.8596,-18.8525,-18.8455,-18.8384,-18.8314,-18.8244,-18.8174,-18.8105,-18.8036,-18.7967,-18.7899,-18.7831,-18.7763,-18.7695,-18.7627,-18.756,-18.7493,-18.7426,-18.736,-18.7293,-18.7227,-18.7161,-18.7095,-18.703,-18.6964,-18.6899,-18.6834,-18.6769,-18.6704,-18.6639,-18.6575,-18.651,-18.6446,-18.6382,-18.6318,-18.6254,-18.619,-18.6126,-18.6063,-18.5999,-18.5935,-18.5872,-18.5809,-18.5745,-18.5682,-18.5619,-18.5556,-18.5492,-18.5429,-18.5366,-18.5303,-18.524,-18.5177,-18.5113,-18.505,-18.4987,-18.4924,-18.4861,-18.4797,-18.4734,-18.4671,-18.4607,-18.4544,-18.448,-18.4416,-18.4353,-18.4289,-18.4225,-18.4161,-18.4097,-18.4032,-18.3968,-18.3903,-18.3839,-18.3774,-18.3709,-18.3644,-18.3579,-18.3513,-18.3448,-18.3382,-18.3316,-18.325,-18.3183,-18.3117,-18.305,-18.2983,-18.2916,-18.2848,-18.278,-18.2712,-18.2644,-18.2576,-18.2507,-18.2438,-18.2369,-18.2299,-18.2229,-18.2159,-18.2089,-18.2018,-18.1947,-18.1876,-18.1804,-18.1732,-18.166,-18.1587,-18.1514,-18.144,-18.1366,-18.1292,-18.1218,-18.1143,-18.1068,-18.0992,-18.0916,-18.0839,-18.0762,-18.0685,-18.0607,-18.0529,-18.045,-18.0371,-18.0291,-18.0211,-18.0131,-18.005,-17.9969,-17.9887,-17.9804,-17.9721,-17.9638,-17.9554,-17.9469,-17.9384,-17.9299,-17.9213,-17.9126,-17.9039,-17.8952,-17.8863,-17.8774,-17.8685,-17.8595,-17.8504,-17.8413,-17.8322,-17.8229,-17.8136,-17.8043,-17.7948,-17.7854,-17.7758,-17.7662,-17.7565,-17.7468,-17.737,-17.7271,-17.7171,-17.7071,-17.6971,-17.6869,-17.6767,-17.6664,-17.656,-17.6456,-17.6351,-17.6245,-17.6138,-17.6031,-17.5923,-17.5814,-17.5705,-17.5594,-17.5483,-17.5371,-17.5259,-17.5145,-17.5031,-17.4916,-17.48,-17.4683,-17.4566,-17.4447,-17.4328,-17.4208,-17.4087,-17.3965,-17.3842,-17.3719,-17.3594,-17.3469,-17.3343,-17.3216,-17.3088,-17.2959,-17.2829,-17.2698,-17.2567,-17.2434,-17.23,-17.2166,-17.203,-17.1894,-17.1757,-17.1618,-17.1479,-17.1339,-17.1197,-17.1055,-17.0912,-17.0767,-17.0622,-17.0475,-17.0328,-17.018,-17.003,-16.9879,-16.9727,-16.9572,-16.9416,-16.9258,-16.9098,-16.8937,-16.8773,-16.8608,-16.8442,-16.8273,-16.8103,-16.7931,-16.7758,-16.7583,-16.7406,-16.7228,-16.7048,-16.6866,-16.6683,-16.6498,-16.6312,-16.6124,-16.5935,-16.5744,-16.5552,-16.5358,-16.5163,-16.4966,-16.4768,-16.4568,-16.4367,-16.4165,-16.3961,-16.3755,-16.3549,-16.3341,-16.3132,-16.2921,-16.2709,-16.2496,-16.2281,-16.2065,-16.1848,-16.163,-16.1411,-16.119,-16.0968,-16.0745,-16.052,-16.0295,-16.0068,-15.984,-15.9612,-15.9381,-15.915,-15.8918,-15.8685,-15.8451,-15.8215,-15.7979,-15.7741,-15.7503,-15.7263,-15.7023,-15.6782,-15.6539,-15.6296,-15.6052,-15.5807,-15.5561,-15.5314,-15.5066,-15.4818,-15.4568,-15.4318,-15.4067,-15.3815,-15.3562,-15.3309,-15.3055,-15.28,-15.2544,-15.2288,-15.2031,-15.1773,-15.1514,-15.1255,-15.0995,-15.0735,-15.0474,-15.0212,-14.995,-14.9687,-14.9424,-14.9159,-14.8895,-14.863,-14.8364,-14.8098,-14.7831,-14.7564,-14.7297,-14.7029,-14.676,-14.6491,-14.6222,-14.5952,-14.5682,-14.5412,-14.5141,-14.487,-14.4598,-14.4327,-14.4054,-14.3782,-14.3509,-14.3236,-14.2963,-14.269,-14.2416,-14.2142,-14.1868,-14.1594,-14.1319,-14.1045,-14.077,-14.0495,-14.022,-13.9945,-13.967,-13.9395,-13.9119,-13.8844,-13.8569,-13.8293,-13.8018,-13.7742,-13.7467,-13.7191,-13.6916,-13.6641,-13.6366,-13.609,-13.5815,-13.5541,-13.5266,-13.4991,-13.4717,-13.4442,-13.4168,-13.3894,-13.362,-13.3347,-13.3073,-13.28,-13.2528,-13.2255,-13.1983,-13.1711,-13.1439,-13.1168,-13.0897,-13.0626,-13.0356,-13.0086,-12.9817,-12.9547,-12.9279,-12.9011,-12.8743,-12.8475,-12.8209,-12.7942,-12.7676,-12.7411,-12.7146,-12.6882,-12.6618,-12.6355,-12.6093,-12.5831,-12.5569,-12.5308,-12.5048,-12.4789,-12.453,-12.4272,-12.4014,-12.3758,-12.3502,-12.3246,-12.2992,-12.2738,-12.2485,-12.2233,-12.1981,-12.1731,-12.1481,-12.1232,-12.0984,-12.0736,-12.049,-12.0245,-12.0]]"), Ha = /* @__PURE__ */ Sr("<path class=\"svelte-nn8tlv\"></path>"), Ua = /* @__PURE__ */ Sr("<svg class=\"mini svelte-nn8tlv\" viewBox=\"0 0 100 48\" preserveAspectRatio=\"none\" role=\"img\" aria-label=\"Eversolo loudness reference illustration\"><line class=\"zero-reference svelte-nn8tlv\" x1=\"4\" x2=\"96\"></line><!></svg>"), Wa = /* @__PURE__ */ q("<div class=\"reference-plot svelte-nn8tlv\" role=\"group\" aria-label=\"Eversolo loudness reference graph\"><!></div>"), Ga = {
	hash: "svelte-nn8tlv",
	code: ".mini.svelte-nn8tlv {display:block;width:100%;height:40px;}.zero-reference.svelte-nn8tlv {stroke:#92928d;stroke-width:1;vector-effect:non-scaling-stroke;}.mini.svelte-nn8tlv path:where(.svelte-nn8tlv) {fill:none;stroke-width:1.4;vector-effect:non-scaling-stroke;}.reference-plot.svelte-nn8tlv {width:100%;}"
};
function Ka(e, t) {
	Ie(t, !0), qr(e, Ga);
	let n = Si(t, "compact", 3, !1), r = Va.map((e, t) => ({
		id: `loudness-reference-${t}`,
		label: `Reference contour ${t + 1}`,
		points: e,
		color: Ni.loudness,
		width: 2
	}));
	function i(e) {
		return e.map((t, n) => `${n ? "L" : "M"}${4 + n / (e.length - 1) * 92},${3 + (26 - t) / 56 * 42}`).join(" ");
	}
	var a = wr(), o = B(a), s = (e) => {
		var t = Ua(), n = z(t);
		$(n, "y1", 22.5), $(n, "y2", 22.5), Z(V(n), 17, () => r, (e) => e.id, (e, t) => {
			var n = Ha();
			H((e) => {
				$(n, "d", e), $(n, "stroke", Ni.loudness);
			}, [() => i(G(t).points)]), J(e, n);
		}), j(t), J(e, t);
	}, c = (e) => {
		var t = Wa();
		Ba(z(t), {
			get curves() {
				return r;
			},
			zeroColor: "#92928d",
			height: 280,
			yRange: [-36, 30]
		}), j(t), J(e, t);
	};
	X(o, (e) => {
		n() ? e(s) : e(c, -1);
	}), J(e, a), Le();
}
//#endregion
//#region src/components/eq/PreampPanel.svelte
var qa = /* @__PURE__ */ q("<button class=\"chip hi\">Reset</button>"), Ja = /* @__PURE__ */ q("<div class=\"row svelte-15ajtes\"><span class=\"svelte-15ajtes\"> </span> <input type=\"range\" class=\"svelte-15ajtes\"/> <div class=\"value svelte-15ajtes\"><!></div></div>"), Ya = /* @__PURE__ */ q("<div class=\"balance-control svelte-15ajtes\"><div class=\"balance-value svelte-15ajtes\"><span class=\"svelte-15ajtes\">Left</span><!><span class=\"svelte-15ajtes\">Right</span></div> <input aria-label=\"PEQ balance\" type=\"range\" min=\"-6\" max=\"6\" step=\"0.1\" class=\"svelte-15ajtes\"/></div>"), Xa = /* @__PURE__ */ q("<!> <!>", 1), Za = {
	hash: "svelte-15ajtes",
	code: ".row.svelte-15ajtes {display:flex;align-items:center;gap:14px;padding:8px 22px;}.row.svelte-15ajtes > span:where(.svelte-15ajtes) {width:40px;font-size:14px;color:var(--text-dim);}.row.svelte-15ajtes > input:where(.svelte-15ajtes) {flex:1;min-width:0;}.value.svelte-15ajtes {width:112px;}input[type=range].svelte-15ajtes {appearance:none;background:transparent;height:30px;cursor:pointer;}input[type=range].svelte-15ajtes::-webkit-slider-runnable-track {height:6px;background:#4a4a46;border-radius:4px;}input[type=range].svelte-15ajtes::-webkit-slider-thumb {appearance:none;width:8px;height:24px;margin-top:-9px;background:#eeeeea;border-radius:3px;}input[type=range].svelte-15ajtes::-moz-range-track {height:6px;background:#4a4a46;border-radius:4px;}input[type=range].svelte-15ajtes::-moz-range-thumb {width:8px;height:24px;background:#eeeeea;border:0;border-radius:3px;}.balance-control.svelte-15ajtes {padding:4px 22px 14px;}.balance-value.svelte-15ajtes {display:grid;grid-template-columns:1fr 120px 1fr;align-items:center;gap:12px;}.balance-value.svelte-15ajtes > span:where(.svelte-15ajtes):last-child {text-align:right;}.balance-control.svelte-15ajtes input:where(.svelte-15ajtes) {width:100%;}"
};
function Qa(e, t) {
	Ie(t, !0), qr(e, Za), Oi(e, {
		code: "EQ.03",
		title: "Preamp & Balance",
		right: (e) => {
			var n = qa();
			K("click", n, function(...e) {
				t.onReset?.apply(this, e);
			}), J(e, n);
		},
		children: (e, n) => {
			var r = Xa(), i = B(r);
			Z(i, 17, () => t.rightPreampDb === void 0 ? [0] : [0, 1], Nr, (e, n) => {
				let r = /* @__PURE__ */ I(() => G(n) === 0 ? t.preampDb : t.rightPreampDb), i = /* @__PURE__ */ I(() => G(n) === 0 ? t.onChange : t.onRightChange);
				var a = Ja(), o = z(a), s = z(o, !0);
				j(o);
				var c = V(o, 2);
				li(c);
				var l = V(c, 2);
				ta(z(l), {
					kind: "dB-signed",
					get value() {
						return G(r);
					},
					get min() {
						return -30;
					},
					get max() {
						return 12;
					},
					get step() {
						return Vi;
					},
					tone: "signed",
					align: "right",
					get onChange() {
						return G(i);
					}
				}), j(l), j(a), H(() => {
					Y(s, t.rightPreampDb === void 0 ? "Mono" : G(n) === 0 ? "Left" : "Right"), $(c, "aria-label", G(n) === 0 ? "Left preamp" : "Right preamp"), $(c, "min", -30), $(c, "max", 12), $(c, "step", Vi), ui(c, G(r));
				}), K("input", c, (e) => G(i)(e.currentTarget.valueAsNumber)), J(e, a);
			});
			var a = V(i, 2), o = (e) => {
				var n = Ya(), r = z(n);
				ta(V(z(r)), {
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
				}), Oe(), j(r);
				var i = V(r, 2);
				li(i), j(n), H(() => ui(i, t.balance)), K("input", i, (e) => t.onBalance(e.currentTarget.valueAsNumber)), J(e, n);
			};
			X(a, (e) => {
				t.balance !== void 0 && e(o);
			}), J(e, r);
		},
		$$slots: {
			right: !0,
			default: !0
		}
	}), Le();
}
mr(["click", "input"]);
//#endregion
//#region node_modules/svelte/src/motion/utils.js
function $a(e) {
	return Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/svelte/src/easing/index.js
function eo(e) {
	return e;
}
function to(e) {
	let t = e - 1;
	return t * t * t + 1;
}
//#endregion
//#region node_modules/svelte/src/motion/tweened.js
function no(e, t) {
	if (e === t || e !== e) return () => e;
	let n = typeof e;
	if (n !== typeof t || Array.isArray(e) !== Array.isArray(t)) throw Error("Cannot interpolate values of different type");
	if (Array.isArray(e)) {
		let n = t.map((t, n) => no(e[n], t));
		return (e) => n.map((t) => t(e));
	}
	if (n === "object") {
		if (!e || !t) throw Error("Object cannot be null");
		if ($a(e) && $a(t)) {
			let n = e.getTime(), r = t.getTime() - n;
			return (e) => new Date(n + e * r);
		}
		let n = Object.keys(t), r = {};
		return n.forEach((n) => {
			r[n] = no(e[n], t[n]);
		}), (e) => {
			let t = {};
			return n.forEach((n) => {
				t[n] = r[n](e);
			}), t;
		};
	}
	if (n === "number") {
		let n = t - e;
		return (t) => e + t * n;
	}
	return () => t;
}
var ro = class e {
	#e;
	#t;
	#n;
	#r = null;
	constructor(e, t = {}) {
		this.#e = /* @__PURE__ */ L(e), this.#t = /* @__PURE__ */ L(e), this.#n = t;
	}
	static of(t, n) {
		let r = new e(t(), n);
		return yn(() => {
			r.set(t());
		}), r;
	}
	set(e, t) {
		R(this.#t, e);
		let { delay: n = 0, duration: r = 400, easing: i = eo, interpolate: a = no } = {
			...this.#n,
			...t
		};
		if (r === 0) return this.#r?.abort(), R(this.#e, e), Promise.resolve();
		let o = Wr.now() + n, s, c = !1, l = this.#r;
		return this.#r = Kr((t) => {
			if (t < o) return !0;
			if (!c) {
				c = !0;
				let t = this.#e.v;
				s = a(t, e), typeof r == "function" && (r = r(t, e)), l?.abort();
			}
			let n = t - o;
			return n > r ? (R(this.#e, e), !1) : (R(this.#e, s(i(n / r))), !0);
		}), this.#r.promise;
	}
	get current() {
		return G(this.#e);
	}
	get target() {
		return G(this.#t);
	}
	set target(e) {
		this.set(e);
	}
}, io = 48e3, ao = Math.PI * 2, oo = Math.log(10);
function so(e, t, n, r, i) {
	if (e === Ii.Flat) return null;
	let a = ao * t / i, o = Math.cos(a), s = Math.sin(a) / (2 * Math.max(.001, n));
	if (e === Ii.Peaking) {
		let e = 10 ** (r / 40), t = 1 + s / e;
		return {
			b0: (1 + s * e) / t,
			b1: -2 * o / t,
			b2: (1 - s * e) / t,
			a1: -2 * o / t,
			a2: (1 - s / e) / t
		};
	}
	let c = (e, t, n, r, i, a) => ({
		b0: e / r,
		b1: t / r,
		b2: n / r,
		a1: i / r,
		a2: a / r
	});
	if (e === 1002) return c((1 - o) / 2, 1 - o, (1 - o) / 2, 1 + s, -2 * o, 1 - s);
	if (e === 1003) return c((1 + o) / 2, -1 - o, (1 + o) / 2, 1 + s, -2 * o, 1 - s);
	if (e === 1004) return c(s, 0, -s, 1 + s, -2 * o, 1 - s);
	if (e === 1005) return c(1, -2 * o, 1, 1 + s, -2 * o, 1 - s);
	if (e === 1007 || e === 1008) {
		let t = 10 ** (r / 40), n = 2 * Math.sqrt(t) * s;
		return e === 1007 ? c(t * (t + 1 - (t - 1) * o + n), 2 * t * (t - 1 - (t + 1) * o), t * (t + 1 - (t - 1) * o - n), t + 1 + (t - 1) * o + n, -2 * (t - 1 + (t + 1) * o), t + 1 + (t - 1) * o - n) : c(t * (t + 1 + (t - 1) * o + n), -2 * t * (t - 1 + (t + 1) * o), t * (t + 1 + (t - 1) * o - n), t + 1 - (t - 1) * o + n, 2 * (t - 1 - (t + 1) * o), t + 1 - (t - 1) * o - n);
	}
	return null;
}
function co(e, t) {
	let n = Math.cos(t), r = Math.sin(t), i = Math.cos(2 * t), a = Math.sin(2 * t), o = e.b0 + e.b1 * n + e.b2 * i, s = -(e.b1 * r + e.b2 * a), c = 1 + e.a1 * n + e.a2 * i, l = -(e.a1 * r + e.a2 * a), u = o * o + s * s, d = c * c + l * l;
	return 10 / oo * Math.log(Math.max(1e-24, u) / Math.max(1e-24, d));
}
function lo(e, t) {
	let n = [];
	for (let r of e) {
		if (r.bypass) continue;
		let e = so(r.type, r.frequency, r.q, r.gain, t);
		e && n.push(e);
	}
	return n;
}
function uo(e, t) {
	let n = io, r = Array(Sa);
	for (let e = 0; e < Sa; e++) r[e] = t;
	for (let t of lo(e, n)) for (let e = 0; e < Sa; e++) {
		let i = ao * Ta[e] / n;
		r[e] += co(t, i);
	}
	return r;
}
//#endregion
//#region src/adapter.ts
var fo = (e) => e === 0 ? "audioTunningEQList" : "audioTunningEQListRight", po = (e) => e === 0 ? "enableEQ" : "enableEQRight", mo = (e) => "loudness", ho = (e) => e === 0 ? "left" : "right", go = (e) => JSON.parse(JSON.stringify(e)), _o = (e, t) => e[fo(t)] ?? [], vo = (e, t) => (_o(e, t)[0]?.volume ?? 0) / 10;
function yo(e) {
	return {
		frequency: e.fc,
		gain: e.gain,
		q: e.q,
		bypass: e.bypass,
		type: e.type === 6 ? Ii.Peaking : 1e3 + e.type
	};
}
var bo = (e, t, n = 0, r = e.type) => ({
	...e,
	type: t ? r : 6,
	gain: t ? n : 0
}), xo = (e) => ({
	...e,
	gain: 0,
	q: 1,
	type: 6
});
function So(e, t) {
	let n = { ...e };
	if (t.frequency !== void 0 && (n.fc = t.frequency), t.gain !== void 0 && (n.gain = t.gain), t.q !== void 0 && (n.q = t.q), t.bypass !== void 0 && (n.bypass = t.bypass), t.type !== void 0) {
		let e = t.type === Ii.Peaking ? 6 : t.type - 1e3;
		if (e < 2 || e > 9) throw Error("Unverified Eversolo filter type");
		n.type = e;
	}
	return n;
}
function Co(e, t) {
	return e.settingType !== 0 || t === 0 ? e : {
		...e,
		audioTunningEQListRight: e.audioTunningEQList,
		enableEQRight: e.enableEQ,
		eqGeqGainBeansRight: e.eqGeqGainBeans,
		enableGeqRight: e.enableGeq
	};
}
function wo(e) {
	if (!e?.loaded || e.error || e.coordinate !== "log10_hz") return null;
	let t = e.points.filter((e) => Number.isFinite(e.x) && Number.isFinite(e.y)).sort((e, t) => e.x - t.x);
	return t.length < 2 || t[0].x === t.at(-1).x ? null : Ta.map((e) => {
		let n = Math.log10(e);
		if (n <= t[0].x) return t[0].y;
		if (n >= t.at(-1).x) return t.at(-1).y;
		let r = t.findIndex((e) => e.x >= n), i = t[r - 1], a = t[r];
		return i.y + (a.y - i.y) * ((n - i.x) / (a.x - i.x));
	});
}
function To(e) {
	if (!e?.length) return null;
	let t = [...e].sort((e, t) => e.freq - t.freq);
	return Ta.map((e) => {
		if (e <= t[0].freq) return t[0].gain;
		if (e >= t.at(-1).freq) return t.at(-1).gain;
		let n = t.findIndex((t) => t.freq >= e), r = t[n - 1], i = t[n], a = Math.log(e / r.freq) / Math.log(i.freq / r.freq), o = (1 - Math.cos(Math.PI * a)) / 2;
		return r.gain + (i.gain - r.gain) * o;
	});
}
function Eo(e, t, n, r, i = !1) {
	e = Co(e, t);
	let a = [], o = _o(e, t), s = e[po(t)] !== !1 && o.length > 0;
	if (o.length) {
		let n = vo(e, t);
		a.push({
			id: "preamp",
			label: "Preamp",
			color: Ni.preamp,
			detail: `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`,
			points: Array(Sa).fill(n)
		});
	}
	let c = e.balance ?? 0;
	if (e.balance !== void 0) {
		let e = t === 1 ? Math.min(0, c) : -Math.max(0, c);
		a.push({
			id: "balance",
			label: "Balance",
			color: Ni.balance,
			detail: c < 0 ? `${Math.abs(c).toFixed(1)} dB left` : `${c.toFixed(1)} dB right`,
			points: Array(Sa).fill(e)
		});
	}
	if (s || i && o.length > 0) {
		let e = o.every((e) => e.bypass || e.type >= 2 && e.type <= 9);
		a.push({
			id: "peq",
			label: "PEQ",
			color: Ni.peq,
			detail: e ? `${o.filter((e) => !e.bypass).length} active bands · Provisional 48 kHz preview` : "Unmapped filter · curve unavailable",
			points: e ? uo(o.filter((e) => e.type !== 9).map(yo), 0) : null
		});
	}
	if (i || e[t === 0 ? "enableGeq" : "enableGeqRight"]) {
		let n = e[t === 0 ? "eqGeqGainBeans" : "eqGeqGainBeansRight"];
		a.push({
			id: "geq",
			label: "Graphic EQ",
			color: Ni.peq,
			detail: `${n?.length ?? 0} bands`,
			points: To(n)
		});
	}
	if (i || e[t === 0 ? "enablePeqLeftFir" : "enablePeqRightFir"]) {
		let n = e[t === 0 ? "peqFirList" : "peqFirListRight"] ?? [], r = uo(n.map(yo), 0), i = (n[0]?.volume ?? 0) / 10;
		a.push({
			id: "correction",
			label: "Correction PEQ",
			color: Ni.peq,
			detail: `${n.length} Bands`,
			points: r?.map((e) => e + i) ?? null
		});
	}
	(i || (e[t === 0 ? "enableLeftFir" : "enableRightFir"] ?? n?.firEnabled[ho(t)])) && a.push({
		id: "fir",
		label: "FIR",
		color: Ni.fir,
		detail: r?.loaded ? "Device response · read only" : "Device curve unavailable",
		points: wo(r)
	}), e[mo(t)] === 1 && a.push({
		id: "loudness",
		label: "Loudness",
		color: Ni.loudness,
		detail: "Eversolo reference illustration",
		points: null,
		illustrative: !0
	});
	let l = [
		"preamp",
		"balance",
		"geq",
		"peq",
		"correction",
		"fir",
		"loudness"
	];
	return a.sort((e, t) => l.indexOf(e.id) - l.indexOf(t.id));
}
function Do(e) {
	let t = Array(Sa).fill(0), n = [];
	for (let r of e) {
		if (!r.points || r.illustrative) {
			n.push(r.label);
			continue;
		}
		for (let e = 0; e < Sa; e++) t[e] += r.points[e];
	}
	return {
		points: t,
		omitted: n
	};
}
function Oo(e) {
	let t = go(e);
	for (let e of [
		"audioTunningEQList",
		"audioTunningEQListRight",
		"peqFirList",
		"peqFirListRight"
	]) t[e] && (t[e] = t[e].map((e) => [
		2,
		3,
		4,
		5
	].includes(e.type) ? {
		...e,
		gain: 0
	} : e));
	return t;
}
function ko(e, t) {
	let n = go(e);
	for (let e of [
		"audioTunningEQList",
		"audioTunningEQListRight",
		"peqFirList",
		"peqFirListRight"
	]) n[e] && (n[e] = n[e].map((n, r) => {
		let i = t[e]?.[r];
		return i && i.type === n.type && [
			2,
			3,
			4,
			5
		].includes(n.type) ? {
			...n,
			gain: i.gain
		} : n;
	}));
	return n;
}
//#endregion
//#region src/components/eq/ProcessingResponse.svelte
var Ao = /* @__PURE__ */ q("<span class=\"response-controls svelte-1k65run\"><button type=\"button\" class=\"chip hi preview-channel svelte-1k65run\"> </button><button type=\"button\" class=\"chip hi mode-cycle svelte-1k65run\"> </button></span>"), jo = /* @__PURE__ */ q("<input class=\"mini-slider svelte-1k65run\" aria-label=\"Preview Balance\" type=\"range\" min=\"-6\" max=\"6\" step=\"0.1\" disabled=\"\"/> <p class=\"svelte-1k65run\"> </p>", 1), Mo = /* @__PURE__ */ q("<input class=\"mini-slider svelte-1k65run\" type=\"range\" disabled=\"\"/>"), No = /* @__PURE__ */ q("<div class=\"preamp-sliders svelte-1k65run\"></div> <p class=\"svelte-1k65run\"> </p>", 1), Po = /* @__PURE__ */ q("<div role=\"button\" tabindex=\"0\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span> </div> <!></div>"), Fo = /* @__PURE__ */ q("<div class=\"stage reference-stage svelte-1k65run\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span>Loudness</div> <!></div>"), Io = /* @__PURE__ */ Sr("<path class=\"svelte-1k65run\"></path>"), Lo = /* @__PURE__ */ Sr("<path class=\"svelte-1k65run\"></path>"), Ro = /* @__PURE__ */ Sr("<svg viewBox=\"0 0 100 48\" preserveAspectRatio=\"none\" role=\"img\" class=\"svelte-1k65run\"><line class=\"zero-reference svelte-1k65run\" x1=\"4\" x2=\"96\" y1=\"24\" y2=\"24\"></line><!></svg>"), zo = /* @__PURE__ */ q("<div class=\"unavailable svelte-1k65run\">Curve Unavailable</div>"), Bo = /* @__PURE__ */ q("<button type=\"button\"><div class=\"stage-name svelte-1k65run\"><span class=\"dot svelte-1k65run\"></span> </div> <!></button>"), Vo = /* @__PURE__ */ q("<p class=\"flat svelte-1k65run\">No enabled processing contributions · flat response</p>"), Ho = /* @__PURE__ */ q("<option hidden=\"\" disabled=\"\">Custom</option>"), Uo = /* @__PURE__ */ q("<div class=\"plot-key svelte-1k65run\" aria-label=\"Response Line Key\"><span class=\"svelte-1k65run\"><svg width=\"26\" height=\"12\" viewBox=\"0 0 26 12\" aria-hidden=\"true\" class=\"svelte-1k65run\"><line x1=\"1\" x2=\"25\" y1=\"6\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\"></line></svg>Left Channel</span> <span class=\"svelte-1k65run\"><svg width=\"26\" height=\"12\" viewBox=\"0 0 26 12\" aria-hidden=\"true\" class=\"svelte-1k65run\"><line x1=\"1\" x2=\"25\" y1=\"6\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-dasharray=\"5 4\"></line></svg>Right Channel</span></div>"), Wo = /* @__PURE__ */ q("<div class=\"stages svelte-1k65run\" aria-label=\"Enabled processing stages\"></div> <div class=\"plot-controls svelte-1k65run\"><label class=\"svelte-1k65run\">Vertical Scale <select aria-label=\"Response vertical scale\" class=\"svelte-1k65run\"><option>Auto</option><option>±6 dB</option><option>±12 dB</option><option>±24 dB</option><option>±20 dB</option><!><option>±48 dB</option></select></label><button class=\"chip svelte-1k65run\" aria-label=\"Reset graph scale\">Reset</button></div> <div class=\"plot svelte-1k65run\"><!> <!></div>", 1), Go = {
	hash: "svelte-1k65run",
	code: ".slider-stage.svelte-1k65run {cursor:pointer;}.preamp-sliders.svelte-1k65run {position:relative;height:20px;}.mini-slider.svelte-1k65run {appearance:none;background:transparent;width:100%;min-width:0;height:20px;margin:0;cursor:default;opacity:1;pointer-events:none;}.preamp-sliders.svelte-1k65run .mini-slider:where(.svelte-1k65run) {position:absolute;inset:0;pointer-events:none;}.mini-slider.svelte-1k65run::-webkit-slider-runnable-track {height:3px;background:color-mix(in srgb, var(--stage-color) 60%, #444);border-radius:3px;}.mini-slider.svelte-1k65run::-webkit-slider-thumb {appearance:none;width:8px;height:15px;margin-top:-6px;border-radius:3px;background:var(--thumb-color, var(--stage-color));pointer-events:none;}.mini-slider.svelte-1k65run::-moz-range-track {height:3px;background:var(--stage-color);}.mini-slider.svelte-1k65run::-moz-range-thumb {width:8px;height:15px;border:0;background:var(--thumb-color, var(--stage-color));pointer-events:none;}.response-controls.svelte-1k65run {display:inline-flex;align-items:center;gap:8px;}.preview-channel.svelte-1k65run {width:140px;min-width:140px;flex:0 0 140px;white-space:nowrap;}.mode-cycle.svelte-1k65run {width:80px;min-width:80px;flex:0 0 80px;}.stages.svelte-1k65run {display:flex;flex-wrap:wrap;justify-content:center;gap:8px;padding:6px 14px 0;}.stage.svelte-1k65run {position:relative;display:grid;grid-template-rows:20px 20px 18px;align-content:start;height:72px;text-align:left;cursor:pointer;color:var(--text);font:inherit;min-width:150px;max-width:150px;flex:0 0 150px;padding:6px 10px;border:1px solid var(--stage-color);background:color-mix(in srgb, var(--stage-color) 12%, var(--panel-solid));border-radius:10px;}.reference-stage.svelte-1k65run {cursor:default;grid-template-rows:20px 40px;}.stage.svelte-1k65run:not(.reference-stage):hover {background:color-mix(in srgb, var(--stage-color) 22%, var(--panel-solid));}.stage.selected.svelte-1k65run {background:color-mix(in srgb, var(--stage-color) 42%, var(--panel-solid));box-shadow:inset 0 0 0 2px var(--stage-color), 0 0 0 1px var(--stage-color);}.stage.svelte-1k65run:focus-visible {outline:2px solid var(--accent);outline-offset:2px;}.stage-name.svelte-1k65run {align-self:start;display:flex;gap:7px;align-items:center;flex-wrap:nowrap;white-space:nowrap;color:var(--text);font:14px var(--font-sans);}.dot.svelte-1k65run {flex-shrink:0;height:5px;width:5px;background:var(--stage-color);border-radius:50%;}.stage.svelte-1k65run svg:where(.svelte-1k65run) {align-self:center;display:block;width:100%;height:20px;margin-top:0;}.stage.svelte-1k65run path:where(.svelte-1k65run) {fill:none;stroke:var(--stage-color);stroke-width:1.3;vector-effect:non-scaling-stroke;}.stage.svelte-1k65run line:where(.svelte-1k65run) {stroke:#92928d;stroke-width:1;vector-effect:non-scaling-stroke;}.stage.svelte-1k65run p:where(.svelte-1k65run) {font:14px/1.5 var(--font-sans);color:var(--text-dim);margin:2px 0 0;}.unavailable.svelte-1k65run {height:28px;display:grid;place-items:center;color:var(--text-faint);font:14px var(--font-sans);}.flat.svelte-1k65run {color:var(--text-dim);font:14px var(--font-sans);}.plot-controls.svelte-1k65run {display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:6px 14px 0;}\n @media (max-width: 900px) {.plot-controls.svelte-1k65run {justify-content:center;} }.plot-controls.svelte-1k65run .chip:where(.svelte-1k65run) {min-height:30px;padding:4px 10px;font-size:13px;}.plot-controls.svelte-1k65run label:where(.svelte-1k65run) {display:flex;align-items:center;gap:8px;color:var(--text-dim);font:13px var(--font-sans);}.plot-controls.svelte-1k65run select:where(.svelte-1k65run) {min-height:30px;border:1px solid var(--border-hi);background-color:var(--panel-solid);color:var(--text);border-radius:7px;padding:4px 10px;font:inherit;}.plot.svelte-1k65run {position:relative;padding:6px 14px 0 6px;}.plot-key.svelte-1k65run {position:absolute;right:24px;top:14px;max-width:calc(100% - 80px);max-height:92px;overflow:auto;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:4px 14px;padding:6px 9px;border-radius:6px;background:color-mix(in srgb, var(--panel-solid) 88%, transparent);color:var(--text);font:12px var(--font-sans);}.plot-key.svelte-1k65run > span:where(.svelte-1k65run) {display:inline-flex;align-items:center;gap:6px;}.plot-key.svelte-1k65run svg:where(.svelte-1k65run) {flex-shrink:0;}\n  @media(max-width: 600px) {.stages.svelte-1k65run {padding:12px 12px 0;gap:8px;} }"
};
function Ko(e, t) {
	Ie(t, !0), qr(e, Go);
	let n = /* @__PURE__ */ L(Ut([])), r = /* @__PURE__ */ L(!1), i = /* @__PURE__ */ L("auto"), a = /* @__PURE__ */ L(Ut([-20, 20]));
	function o(e) {
		R(a, e, !0), R(i, "custom");
	}
	function s() {
		R(i, "auto"), R(a, [-20, 20], !0);
	}
	let c = !1, l = null;
	mn(() => {
		let e = t.profile.id;
		e !== l && (l = e, R(n, [], !0), c = !1);
	}), mn(() => {
		let e = t.previewRequest;
		e.serial && or(() => {
			e.stage && (!G(n).length || c) ? (R(n, [e.stage], !0), c = !0) : !e.stage && c && (R(n, [], !0), c = !1);
		});
	});
	function u(e) {
		e !== "loudness" && (c = !1, R(n, G(n).includes(e) ? G(n).filter((t) => t !== e) : [...G(n), e], !0));
	}
	function d(e) {
		let t = e.composedPath();
		t.find((e) => e instanceof HTMLElement && e.matches("section.panel"))?.querySelector(".stages") && (t.some((e) => e instanceof Element && e.matches("button, select, input, label, svg, [data-stage], header")) || (R(n, [], !0), c = !1));
	}
	let f = /* @__PURE__ */ I(() => t.fir?.profile_id === t.profile.id && t.fir.revision === t.profile.revision ? t.fir : null), p = /* @__PURE__ */ I(() => Eo(t.settings, 0, t.profile.processing, G(f)?.left)), m = /* @__PURE__ */ I(() => Eo(t.settings, 1, t.profile.processing, G(f)?.right)), h = [
		"preamp",
		"balance",
		"geq",
		"peq",
		"correction",
		"fir",
		"loudness"
	], g = /* @__PURE__ */ I(() => (G(r) ? [...G(p), ...G(m).filter((e) => !G(p).some((t) => t.id === e.id))] : t.channel === 0 ? G(p) : G(m)).slice().sort((e, t) => h.indexOf(e.id) - h.indexOf(t.id))), _ = /* @__PURE__ */ I(() => [
		G(g).find((e) => e.id === "preamp") ?? {
			id: "preamp",
			label: "Preamp",
			color: "#e8b857",
			points: null
		},
		...t.settings.balance === void 0 ? [] : [G(g).find((e) => e.id === "balance") ?? {
			id: "balance",
			label: "Balance",
			color: "#b49cde",
			points: null
		}],
		...G(g).filter((e) => e.id !== "preamp" && e.id !== "balance")
	]);
	function v(e) {
		let r = G(n).length ? Eo(t.settings, e, t.profile.processing, G(f)?.[e === 0 ? "left" : "right"], !0) : G(e === 0 ? p : m), i = G(n).length ? r.filter((e) => G(n).includes(e.id)) : r, a = Do(i);
		if (!G(n).length) return [{
			id: "composite",
			label: "Composite response",
			points: Do(r.filter((e) => !e.illustrative)).points,
			color: "#f1f0eb",
			width: 2.4,
			dashed: !1
		}];
		if (G(n).length === 1 && (G(n)[0] === "peq" || G(n)[0] === "correction")) {
			let r = Co(t.settings, e);
			return (G(n)[0] === "correction" ? r[e === 0 ? "peqFirList" : "peqFirListRight"] ?? [] : _o(r, e)).flatMap((e, t) => !e.bypass && e.type >= 2 && e.type <= 9 ? [{
				id: `band-${t}`,
				label: `Band ${t + 1}`,
				color: Fi(t),
				points: uo([yo(e)], 0),
				width: 1.8,
				fillOpacity: .2
			}] : []);
		}
		let o = [], s = Array(Sa).fill(0);
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
	let y = /* @__PURE__ */ I(() => G(r) ? [0, 1].flatMap((e) => v(e).map((t) => ({
		...t,
		id: `${e}-${t.id}`,
		label: `${e === 0 ? "Left" : "Right"} · ${t.label}`,
		color: e === 0 ? t.color : `color-mix(in srgb, ${t.color} 45%, #69b9eb)`,
		dashed: e === 1
	}))) : v(t.channel).map((e) => ({
		...e,
		dashed: t.channel === 1
	}))), b = /* @__PURE__ */ I(() => {
		if (G(i) === "default") return [-20, 20];
		if (G(i) === "custom") return G(a);
		if (G(i) !== "auto") {
			let e = Number(G(i));
			return [-e, e];
		}
		let e = G(y).flatMap((e) => e.points).filter(Number.isFinite), t = Math.min(0, ...e), n = Math.max(0, ...e), r = Math.max(1, (n - t) * .15);
		return [t - r, n + r];
	}), x = new ro([-1, 1], { easing: to }), S = !1, C = "";
	mn(() => {
		let e = G(b), a = JSON.stringify([
			t.profile.id,
			G(n),
			G(r),
			t.channel,
			t.settings.settingType
		]), o = a !== C;
		if (C = a, G(i) !== "auto" || !S || o) {
			x.set(e, { duration: 0 }), S = !0;
			return;
		}
		let s = or(() => x.target), c = Math.floor(e[0] / 2) * 2, l = Math.ceil(e[1] / 2) * 2;
		(e[0] < s[0] || e[1] > s[1]) && x.set([Math.min(c, s[0]), Math.max(l, s[1])], { duration: 180 });
		let u = setTimeout(() => {
			x.set([c, l], { duration: 300 });
		}, 700);
		return () => clearTimeout(u);
	});
	function ee(e) {
		return e.points?.map((t, n) => `${n === 0 ? "M" : "L"}${4 + n / (e.points.length - 1) * 92},${24 - Math.max(-24, Math.min(24, t)) * (e.id === "fir" ? 2.2 : .75)}`).join(" ") ?? "";
	}
	pr("click", Kt, d), Oi(e, {
		stackActions: !0,
		title: "",
		titleControl: (e) => {
			var n = Ao(), i = z(n), a = z(i, !0);
			j(i);
			var o = V(i), s = z(o, !0);
			j(o), j(n), H(() => {
				$(i, "aria-label", `Preview Channel: ${G(r) ? "Both Channels" : t.channel === 0 ? "Left Channel" : "Right Channel"}`), Y(a, G(r) ? "Both Channels" : t.channel === 0 ? "Left Channel" : "Right Channel"), $(o, "aria-label", `Profile mode: ${t.settings.settingType === 1 ? "Stereo" : "Mono"}`), o.disabled = t.busy, Y(s, t.settings.settingType === 1 ? "Stereo" : "Mono");
			}), K("click", i, () => {
				G(r) ? (R(r, !1), t.onChannelChange(0)) : t.channel === 0 ? t.onChannelChange(1) : R(r, !0);
			}), K("click", o, () => t.onModeChange(t.settings.settingType === 1 ? 0 : 1)), J(e, n);
		},
		right: (e) => {
			var n = wr();
			Hr(B(n), () => t.actions), J(e, n);
		},
		children: (e, a) => {
			var c = Wo(), l = B(c);
			Z(l, 21, () => G(_), (e) => e.id, (e, i) => {
				var a = wr(), o = B(a), s = (e) => {
					var a = Po();
					let o, s;
					var c = z(a), l = V(z(c), 1, !0);
					j(c);
					var d = V(c, 2), f = (e) => {
						var n = jo(), r = B(n);
						li(r);
						var i = V(r, 2), a = z(i);
						j(i), H(() => {
							ui(r, t.settings.balance ?? 0), Y(a, `${t.settings.balance ?? 0 ?? ""} dB`);
						}), J(e, n);
					}, p = (e) => {
						var n = No(), a = B(n);
						Z(a, 21, () => t.settings.settingType === 1 ? G(r) ? [0, 1] : [t.channel] : [0], Nr, (e, n) => {
							var r = Mo();
							li(r);
							let a;
							H((e) => {
								$(r, "aria-label", `${G(n) === 0 ? "Left" : "Right"} Preview Preamp`), $(r, "min", -30), $(r, "max", 12), $(r, "step", Vi), ui(r, e), a = ei(r, "", a, { "--thumb-color": G(n) === 0 ? G(i).color : "#fff0be" });
							}, [() => vo(Co(t.settings, G(n)), G(n))]), J(e, r);
						}), j(a);
						var o = V(a, 2), s = z(o, !0);
						j(o), H((e) => Y(s, e), [() => G(r) && t.settings.settingType === 1 ? `L ${vo(Co(t.settings, 0), 0).toFixed(1)} · R ${vo(Co(t.settings, 1), 1).toFixed(1)} dB` : `${vo(Co(t.settings, t.channel), t.channel).toFixed(1)} dB`]), J(e, n);
					};
					X(d, (e) => {
						G(i).id === "balance" ? e(f) : e(p, -1);
					}), j(a), H((e, t) => {
						o = Q(a, 1, "stage slider-stage svelte-1k65run", null, o, e), $(a, "data-response-stage", G(i).id), $(a, "data-stage", G(i).id), $(a, "aria-label", `${G(i).label} curve`), $(a, "aria-pressed", t), s = ei(a, "", s, { "--stage-color": G(i).color }), Y(l, G(i).label);
					}, [() => ({ selected: G(n).includes(G(i).id) }), () => G(n).includes(G(i).id)]), K("click", a, () => u(G(i).id)), K("keydown", a, (e) => {
						(e.key === "Enter" || e.key === " ") && (e.preventDefault(), u(G(i).id));
					}), J(e, a);
				}, c = (e) => {
					var t = Fo();
					let n;
					Ka(V(z(t), 2), { compact: !0 }), j(t), H(() => {
						$(t, "data-stage", G(i).id), n = ei(t, "", n, { "--stage-color": G(i).color });
					}), J(e, t);
				}, l = (e) => {
					var a = Bo();
					let o, s;
					var c = z(a), l = V(z(c), 1, !0);
					j(c);
					var d = V(c, 2), f = (e) => {
						var n = Ro(), a = V(z(n)), o = (e) => {
							var t = wr();
							Z(B(t), 17, () => [G(p).find((e) => e.id === G(i).id), G(m).find((e) => e.id === G(i).id)], Nr, (e, t, n) => {
								var r = wr(), a = B(r), o = (e) => {
									var r = Io();
									$(r, "stroke-dasharray", n === 1 ? "5 4" : void 0);
									let a;
									H((e) => {
										$(r, "d", e), a = ei(r, "", a, { stroke: n === 0 ? G(i).color : `color-mix(in srgb, ${G(i).color} 45%, #69b9eb)` });
									}, [() => ee(G(t))]), J(e, r);
								};
								X(a, (e) => {
									G(t)?.points && e(o);
								}), J(e, r);
							}), J(e, t);
						}, s = (e) => {
							var n = Lo();
							H((e) => {
								$(n, "d", e), $(n, "stroke-dasharray", t.channel === 1 ? "5 4" : void 0);
							}, [() => ee(G(i))]), J(e, n);
						};
						X(a, (e) => {
							G(r) ? e(o) : e(s, -1);
						}), j(n), H(() => $(n, "aria-label", `${G(i).label} contribution`)), J(e, n);
					}, h = /* @__PURE__ */ I(() => G(i).points || G(r) && G(m).find((e) => e.id === G(i).id)?.points), g = (e) => {
						J(e, zo());
					};
					X(d, (e) => {
						G(h) ? e(f) : e(g, -1);
					}), j(a), H((e, t) => {
						o = Q(a, 1, "stage svelte-1k65run", null, o, e), $(a, "data-response-stage", G(i).id), $(a, "data-stage", G(i).id), $(a, "aria-label", `${G(i).label} curve`), $(a, "aria-pressed", t), s = ei(a, "", s, { "--stage-color": G(i).color }), Y(l, G(i).label);
					}, [() => ({ selected: G(n).includes(G(i).id) }), () => G(n).includes(G(i).id)]), K("click", a, () => u(G(i).id)), J(e, a);
				};
				X(o, (e) => {
					G(i).id === "preamp" || G(i).id === "balance" ? e(s) : G(i).illustrative ? e(c, 1) : e(l, -1);
				}), J(e, a);
			}, (e) => {
				J(e, Vo());
			}), j(l);
			var d = V(l, 2), f = z(d), h = V(z(f)), g = z(h);
			g.value = g.__value = "auto";
			var v = V(g);
			v.value = v.__value = "6";
			var b = V(v);
			b.value = b.__value = "12";
			var S = V(b);
			S.value = S.__value = "24";
			var C = V(S);
			C.value = C.__value = "default";
			var w = V(C), te = (e) => {
				var t = Ho();
				t.value = t.__value = "custom", J(e, t);
			};
			X(w, (e) => {
				G(i) === "custom" && e(te);
			});
			var ne = V(w);
			ne.value = ne.__value = "48", j(h), j(f);
			var re = V(f);
			j(d);
			var ie = V(d, 2), ae = z(ie);
			Ba(ae, {
				get curves() {
					return G(y);
				},
				height: 280,
				get yRange() {
					return x.current;
				},
				onRangeChange: o
			});
			var oe = V(ae, 2), se = (e) => {
				J(e, Uo());
			};
			X(oe, (e) => {
				G(y).length && e(se);
			}), j(ie), ri(h, () => G(i), (e) => R(i, e)), K("click", re, s), J(e, c);
		},
		$$slots: {
			titleControl: !0,
			right: !0,
			default: !0
		}
	}), Le();
}
mr(["click", "keydown"]);
//#endregion
//#region src/Editor.svelte
var qo = /* @__PURE__ */ q("<option disabled=\"\">Select A Profile</option>"), Jo = /* @__PURE__ */ q("<option> </option>"), Yo = /* @__PURE__ */ q("<div class=\"notice error svelte-1jdjhi\" role=\"alert\"> </div>"), Xo = /* @__PURE__ */ q("<div class=\"notice warning svelte-1jdjhi\" role=\"alert\">This profile changed on the device. Discard And Reload before saving.</div>"), Zo = /* @__PURE__ */ q("<div class=\"savebar svelte-1jdjhi\"><span> </span><div class=\"actions svelte-1jdjhi\"><button class=\"chip md svelte-1jdjhi\">↻ Reload</button> <button class=\"chip md svelte-1jdjhi\">Discard</button> <button class=\"chip md accent svelte-1jdjhi\">Save Profile</button> <button><span class=\"auto-save-size svelte-1jdjhi\" aria-hidden=\"true\">Auto Save Off</span><span class=\"auto-save-label svelte-1jdjhi\"> </span></button></div></div>"), Qo = /* @__PURE__ */ q("<p class=\"hint\"> </p>"), $o = /* @__PURE__ */ q("<button> </button>"), es = /* @__PURE__ */ q("<option></option>"), ts = /* @__PURE__ */ q("<select class=\"band-picker svelte-1jdjhi\" aria-label=\"Band to tune\"></select>"), ns = /* @__PURE__ */ q("<div class=\"sliders svelte-1jdjhi\"><label class=\"svelte-1jdjhi\">Frequency <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band frequency slider\" type=\"range\" min=\"0\" max=\"1000\" step=\"1\" class=\"svelte-1jdjhi\"/></label> <label>Gain <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band gain slider\" type=\"range\" min=\"-15\" max=\"15\" step=\"0.1\" class=\"svelte-1jdjhi\"/></label> <label class=\"svelte-1jdjhi\">Q <span class=\"svelte-1jdjhi\"> </span><input aria-label=\"Band Q slider\" type=\"range\" min=\"0.1\" max=\"100\" step=\"0.01\" class=\"svelte-1jdjhi\"/></label></div>"), rs = /* @__PURE__ */ q("<label class=\"toggle-label svelte-1jdjhi\"><input class=\"switch\" type=\"checkbox\" role=\"switch\" aria-label=\"Enable graphic EQ\"/></label>"), is = /* @__PURE__ */ q("<!> <button class=\"chip hi\" aria-label=\"Reset graphic EQ\">Reset</button>", 1), as = /* @__PURE__ */ q("<div class=\"geq-band svelte-1jdjhi\"><input class=\"geq-gain svelte-1jdjhi\" type=\"number\" min=\"-20\" max=\"20\" step=\"0.1\"/> <input class=\"geq-slider svelte-1jdjhi\" aria-orientation=\"vertical\" type=\"range\" min=\"-20\" max=\"20\" step=\"0.1\"/> <span> </span></div>"), os = /* @__PURE__ */ q("<div class=\"geq-bands svelte-1jdjhi\"></div>"), ss = /* @__PURE__ */ q("<label class=\"toggle-label svelte-1jdjhi\"><input aria-label=\"Loudness enabled\" class=\"switch\" role=\"switch\" type=\"checkbox\"/></label>"), cs = /* @__PURE__ */ q("<div class=\"loudness-reference svelte-1jdjhi\"><!></div>"), ls = /* @__PURE__ */ q("<label class=\"toggle-label svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\" aria-label=\"Enable FIR\"/></label>"), us = /* @__PURE__ */ q("<span class=\"import-name svelte-1jdjhi\"> </span>"), ds = /* @__PURE__ */ q("<div class=\"output svelte-1jdjhi\"><span class=\"svelte-1jdjhi\"> </span> <button class=\"chip\">Select On Device File</button> <!> <label class=\"svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/> Enable</label> <div class=\"fir-stats svelte-1jdjhi\"><span> </span></div></div>"), fs = /* @__PURE__ */ q("<div class=\"outputs fir-assignments svelte-1jdjhi\"></div>"), ps = /* @__PURE__ */ q("<option> </option>"), ms = /* @__PURE__ */ q("<option> </option>"), hs = /* @__PURE__ */ q("<div class=\"output svelte-1jdjhi\"><span class=\"svelte-1jdjhi\"> </span> <select class=\"svelte-1jdjhi\"><!><!></select> <label class=\"svelte-1jdjhi\"><input class=\"switch\" role=\"switch\" type=\"checkbox\"/> Enable</label></div>"), gs = /* @__PURE__ */ q("<div class=\"outputs svelte-1jdjhi\"></div>"), _s = /* @__PURE__ */ q("<!> <!> <nav class=\"sections svelte-1jdjhi\" aria-label=\"Processing controls\"></nav> <fieldset class=\"edit-grid svelte-1jdjhi\"><div><!> <!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div></fieldset>", 1), vs = /* @__PURE__ */ q("<div class=\"empty svelte-1jdjhi\">Select or create a profile to start shaping your sound.</div>"), ys = /* @__PURE__ */ q("<option> </option>"), bs = /* @__PURE__ */ Sr("<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path d=\"m8 5 9 7-9 7Z\" fill=\"currentColor\"></path></svg>"), xs = /* @__PURE__ */ q("<tr><td class=\"svelte-1jdjhi\"><button class=\"file-entry svelte-1jdjhi\"><span class=\"file-icon svelte-1jdjhi\" aria-hidden=\"true\"><!></span> </button></td><td class=\"svelte-1jdjhi\"> </td><td class=\"file-size svelte-1jdjhi\"> </td></tr>"), Ss = /* @__PURE__ */ q("<tr class=\"svelte-1jdjhi\"><td colspan=\"3\" class=\"file-empty svelte-1jdjhi\"> </td></tr>"), Cs = /* @__PURE__ */ q("<div class=\"file-pagination svelte-1jdjhi\"><button class=\"chip\">Previous</button><span> </span><button class=\"chip\">Next</button></div>"), ws = /* @__PURE__ */ q("<p role=\"alert\" class=\"svelte-1jdjhi\"> </p>"), Ts = /* @__PURE__ */ q("<p class=\"svelte-1jdjhi\"> </p>"), Es = /* @__PURE__ */ q("<label class=\"svelte-1jdjhi\">Profile Name<input aria-label=\"Profile Name\" type=\"text\" required=\"\" maxlength=\"100\" class=\"svelte-1jdjhi\"/></label>"), Ds = /* @__PURE__ */ q("<div class=\"shell svelte-1jdjhi\"><header class=\"topbar svelte-1jdjhi\"><div><h1 class=\"svelte-1jdjhi\"> </h1></div></header> <div><label class=\"profile-select svelte-1jdjhi\"><span>Profile</span> <select aria-label=\"Profile\" class=\"svelte-1jdjhi\"><!><!></select></label> <div class=\"actions profile-actions svelte-1jdjhi\"><button class=\"chip md svelte-1jdjhi\">＋ New</button> <button class=\"chip md svelte-1jdjhi\">Save As</button> <button class=\"chip md svelte-1jdjhi\">Rename</button> <button class=\"chip md danger svelte-1jdjhi\">Delete</button></div></div> <!> <!> <!></div> <dialog class=\"file-picker svelte-1jdjhi\" aria-label=\"Internal FIR File Browser\"><div class=\"file-heading svelte-1jdjhi\"><h2 class=\"svelte-1jdjhi\">Import FIR Filter</h2><span class=\"svelte-1jdjhi\"> </span></div> <div class=\"file-location svelte-1jdjhi\"><button class=\"chip hi directory-action svelte-1jdjhi\" aria-label=\"Parent Folder\">↑</button> <div class=\"file-path svelte-1jdjhi\"><input type=\"text\" aria-label=\"Directory Path\" class=\"svelte-1jdjhi\"/> <button class=\"chip hi directory-action svelte-1jdjhi\" aria-label=\"Open Directory\" type=\"button\"><svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" aria-hidden=\"true\"><path d=\"M19 5v10H5m5-5-5 5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></button></div></div> <div class=\"file-tools svelte-1jdjhi\"><input type=\"text\" aria-label=\"Search\" placeholder=\"Search\" class=\"svelte-1jdjhi\"/> <label class=\"svelte-1jdjhi\">Sort<select aria-label=\"File Sort\" class=\"svelte-1jdjhi\"></select></label></div> <div class=\"file-list svelte-1jdjhi\" aria-label=\"Folder Contents\"><table class=\"svelte-1jdjhi\"><thead><tr class=\"svelte-1jdjhi\"><th class=\"svelte-1jdjhi\">Name</th><th class=\"svelte-1jdjhi\">Type</th><th class=\"file-size svelte-1jdjhi\">Size</th></tr></thead><tbody></tbody></table></div> <!> <label class=\"file-selection svelte-1jdjhi\">File Name<input type=\"text\" aria-label=\"Selected File Name\" readonly=\"\" placeholder=\"Select A WAV File\" class=\"svelte-1jdjhi\"/></label> <!> <div class=\"file-footer svelte-1jdjhi\"><span class=\"svelte-1jdjhi\">WAV Files (*.wav)</span><div class=\"svelte-1jdjhi\"><button class=\"chip hi\">Cancel</button><button class=\"chip accent\">Import</button></div></div></dialog> <dialog aria-label=\"Unsaved Changes\" class=\"svelte-1jdjhi\"><h2 class=\"svelte-1jdjhi\">Unsaved Changes</h2> <p class=\"svelte-1jdjhi\">Discard changes that have not been saved to the device?</p> <div class=\"actions svelte-1jdjhi\"><button class=\"chip md\">Keep Editing</button><button class=\"chip md danger\"> </button></div></dialog> <dialog class=\"svelte-1jdjhi\"><form><h2 class=\"svelte-1jdjhi\"> </h2> <!> <div class=\"actions svelte-1jdjhi\"><button type=\"button\" class=\"chip md\">Cancel</button><button type=\"submit\"> </button></div></form></dialog>", 1), Os = {
	hash: "svelte-1jdjhi",
	code: ".auto-save.svelte-1jdjhi {display:inline-grid;place-items:center;align-content:center;flex-shrink:0;white-space:nowrap;}.auto-save-size.svelte-1jdjhi, .auto-save-label.svelte-1jdjhi {grid-area:1 / 1;}.auto-save-size.svelte-1jdjhi {visibility:hidden;}.gain-disabled.svelte-1jdjhi {opacity:var(--dim-disabled);}dialog.file-picker.svelte-1jdjhi {width:720px;max-height:88vh;padding:20px;}.file-heading.svelte-1jdjhi {display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:18px;}.file-heading.svelte-1jdjhi h2:where(.svelte-1jdjhi) {margin:0;font-size:21px;}.file-heading.svelte-1jdjhi > span:where(.svelte-1jdjhi), .file-footer.svelte-1jdjhi > span:where(.svelte-1jdjhi) {font-size:13px;color:var(--text-dim);}.file-location.svelte-1jdjhi {display:grid;grid-template-columns:auto minmax(0,1fr);align-items:stretch;gap:10px;margin-bottom:12px;}.file-tools.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:5px;font-size:13px;}.file-tools.svelte-1jdjhi select:where(.svelte-1jdjhi) {width:100%;font-size:14px;}.directory-action.svelte-1jdjhi {width:40px;min-width:40px;padding:0;font-size:22px;flex-shrink:0;display:grid;place-items:center;line-height:1;}.file-path.svelte-1jdjhi {display:flex;gap:8px;min-width:0;}.file-path.svelte-1jdjhi input:where(.svelte-1jdjhi) {min-width:0;width:100%;font-size:14px;}.file-location.svelte-1jdjhi .chip:where(.svelte-1jdjhi), .file-path.svelte-1jdjhi input:where(.svelte-1jdjhi) {height:44px;box-sizing:border-box;}.file-tools.svelte-1jdjhi {display:flex;align-items:end;gap:12px;margin-bottom:12px;}.file-tools.svelte-1jdjhi > input:where(.svelte-1jdjhi) {flex:1;min-width:0;font-size:14px;}.file-tools.svelte-1jdjhi label:where(.svelte-1jdjhi) {grid-template-columns:auto auto;align-items:center;gap:8px;}.file-list.svelte-1jdjhi {height:260px;overflow:auto;border:1px solid var(--border-hi);border-radius:7px;background:var(--panel);}.file-list.svelte-1jdjhi table:where(.svelte-1jdjhi) {width:100%;border-collapse:collapse;font-size:14px;}.file-list.svelte-1jdjhi th:where(.svelte-1jdjhi) {position:sticky;top:0;background:var(--panel-solid);color:var(--text-dim);text-align:left;font-size:12px;font-weight:500;padding:9px 12px;border-bottom:1px solid var(--border-hi);}.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi) {padding:0 12px;height:40px;border-bottom:1px solid var(--border);white-space:nowrap;}.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi):first-child {width:100%;white-space:normal;}.file-list.svelte-1jdjhi tr.selected:where(.svelte-1jdjhi) {background:color-mix(in srgb, var(--accent) 22%, var(--panel));}.file-list.svelte-1jdjhi tr:where(.svelte-1jdjhi):hover {background:var(--wash-strong);}.file-entry.svelte-1jdjhi {display:flex;align-items:center;gap:10px;text-align:left;width:100%;min-height:40px;padding:6px 0;background:transparent;border:0;font:inherit;color:var(--text);cursor:pointer;overflow-wrap:anywhere;}.file-entry.svelte-1jdjhi:disabled {opacity:.45;cursor:default;}.file-icon.svelte-1jdjhi {color:var(--text-dim);width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;flex-shrink:0;}.file-size.svelte-1jdjhi {text-align:right !important;}.file-empty.svelte-1jdjhi {text-align:center;color:var(--text-dim);padding:30px !important;}.file-selection.svelte-1jdjhi {display:grid;grid-template-columns:78px minmax(0,1fr);align-items:center;gap:10px !important;margin-top:14px;font-size:14px;}.file-selection.svelte-1jdjhi input:where(.svelte-1jdjhi) {font-size:14px;}.file-footer.svelte-1jdjhi {display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;}.file-footer.svelte-1jdjhi > div:where(.svelte-1jdjhi), .file-pagination.svelte-1jdjhi {display:flex;align-items:center;gap:8px;}.file-pagination.svelte-1jdjhi {justify-content:center;margin-top:10px;font-size:13px;}\n  @media (max-width: 480px) {dialog.file-picker.svelte-1jdjhi {padding:14px;}.file-location.svelte-1jdjhi {grid-template-columns:auto minmax(0,1fr);}.file-tools.svelte-1jdjhi {align-items:stretch;flex-direction:column;}.file-list.svelte-1jdjhi th:where(.svelte-1jdjhi):nth-child(2),.file-list.svelte-1jdjhi td:where(.svelte-1jdjhi):nth-child(2) {display:none;}.file-heading.svelte-1jdjhi {align-items:start;}.file-list.svelte-1jdjhi {height:220px;} }.geq-bands.svelte-1jdjhi {display:flex;gap:8px;padding:20px 14px;overflow-x:auto;}.geq-band.svelte-1jdjhi {display:flex;flex:1 0 44px;flex-direction:column;align-items:center;gap:12px;font-size:13px;}.geq-gain.svelte-1jdjhi {width:52px;padding:4px 0;text-align:center;color:var(--text);background:transparent;border:1px solid transparent;border-radius:5px;font:inherit;font-variant-numeric:tabular-nums;appearance:textfield;}.geq-gain.svelte-1jdjhi::-webkit-inner-spin-button, .geq-gain.svelte-1jdjhi::-webkit-outer-spin-button {appearance:none;margin:0;}.geq-gain.svelte-1jdjhi:hover {border-color:var(--border-hi);}.geq-gain.svelte-1jdjhi:focus {outline:1px solid var(--accent);background:var(--wash);}.geq-slider.svelte-1jdjhi {appearance:none;writing-mode:vertical-lr;direction:rtl;width:32px;height:210px;margin:0;cursor:ns-resize;background:transparent;}.geq-slider.svelte-1jdjhi::-webkit-slider-runnable-track {width:6px;height:100%;border-radius:4px;background:#4a4a46;}.geq-slider.svelte-1jdjhi::-webkit-slider-thumb {appearance:none;width:30px;height:10px;margin-left:-12px;border:1px solid #a5a59f;border-radius:3px;background:#eeeeea;box-shadow:0 2px 3px #0005;}.geq-slider.svelte-1jdjhi::-moz-range-track {width:6px;height:100%;border-radius:4px;background:#4a4a46;}.geq-slider.svelte-1jdjhi::-moz-range-thumb {width:30px;height:10px;border:1px solid #a5a59f;border-radius:3px;background:#eeeeea;}.geq-slider.svelte-1jdjhi:focus-visible {outline:1px solid var(--accent);outline-offset:3px;border-radius:4px;}.import-name.svelte-1jdjhi {grid-column:2 / -1;overflow-wrap:anywhere;}* {box-sizing:border-box;}.shell.svelte-1jdjhi {padding:12px 16px;max-width:1500px;margin:auto;min-height:100%;}.topbar.svelte-1jdjhi {display:flex;align-items:center;gap:18px;margin-bottom:10px;}.brand.svelte-1jdjhi {flex:1;display:flex;justify-content:flex-start;text-align:left;align-items:baseline;gap:16px;}.brand.centered.svelte-1jdjhi {justify-content:center;text-align:center;}h1.svelte-1jdjhi {margin:0;font-size:23px;font-weight:600;letter-spacing:0;}.toolbar.svelte-1jdjhi, .savebar.svelte-1jdjhi {display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}.toolbar.svelte-1jdjhi {margin-bottom:12px;}.profile-actions.svelte-1jdjhi {flex-wrap:wrap;justify-content:flex-end;margin-left:auto;}.toolbar.wrapped.svelte-1jdjhi {justify-content:center;}.toolbar.wrapped.svelte-1jdjhi .profile-actions:where(.svelte-1jdjhi) {justify-content:center;margin-inline:auto;}.profile-select.svelte-1jdjhi {display:grid;grid-template-columns:60px auto;align-items:center;gap:12px;}label.svelte-1jdjhi, .savebar.svelte-1jdjhi {font:16px var(--font-sans);letter-spacing:0;color:var(--text-dim);}select.svelte-1jdjhi, input[type=text].svelte-1jdjhi {background:var(--panel-solid);color:var(--text);border:1px solid var(--border-hi);border-radius:9px;min-height:36px;padding:6px 10px;font:17px var(--font-sans);max-width:100%;}.actions.svelte-1jdjhi {display:flex;flex-wrap:wrap;gap:8px;}.edit-grid.svelte-1jdjhi {border:0;padding:0;margin:8px 0 8px;min-width:0;display:grid;grid-template-columns:minmax(0, 1fr);align-items:start;}.loudness-reference.svelte-1jdjhi {padding:16px;max-width:680px;margin:auto;width:100%;}.sections.svelte-1jdjhi {display:flex;justify-content:center;flex-wrap:wrap;gap:6px;margin-top:12px;}.tab-pane.svelte-1jdjhi {grid-area:1 / 1;min-width:0;}.tab-pane.inactive.svelte-1jdjhi {visibility:hidden;pointer-events:none;}.bands-wrap.svelte-1jdjhi {min-width:0;display:flex;flex-direction:column;gap:18px;}.bands-wrap.svelte-1jdjhi .panel {min-width:0;}input[type=range].svelte-1jdjhi {width:100%;}.band-picker.svelte-1jdjhi {min-height:32px;padding:2px 24px 2px 8px;}.sliders.svelte-1jdjhi {padding:8px 14px;display:grid;gap:2px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:12px;grid-template-columns:80px 80px minmax(0, 1fr);align-items:center;min-height:34px;font-size:14px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) span:where(.svelte-1jdjhi) {text-align:right;color:var(--text);font-variant-numeric:tabular-nums;}.sliders.svelte-1jdjhi input:where(.svelte-1jdjhi) {min-width:0;margin:0;height:28px;}\n  @media (max-width: 480px) {.sliders.svelte-1jdjhi {padding:6px 10px;}.sliders.svelte-1jdjhi label:where(.svelte-1jdjhi) {grid-template-columns:64px 64px minmax(0, 1fr);gap:8px;} }.savebar.svelte-1jdjhi {margin:0;padding:0;border:0;font-size:13px;gap:8px;}.savebar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {justify-content:flex-end;}\n  @media (max-width: 900px) {.savebar.svelte-1jdjhi {flex-direction:column;align-items:stretch;width:max-content;max-width:100%;gap:5px;}.savebar.svelte-1jdjhi > span:where(.svelte-1jdjhi) {text-align:center;width:100%;}.savebar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {width:100%;justify-content:center;}\n  }.savebar.svelte-1jdjhi .chip:where(.svelte-1jdjhi) {min-height:34px;padding:6px 10px;font-size:13px;}.unsaved.svelte-1jdjhi {color:var(--warn);}.outputs.svelte-1jdjhi {display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);}.output.svelte-1jdjhi {padding:4px 14px;background:var(--panel-solid);display:grid;grid-template-columns:140px minmax(0, 1fr) auto;gap:12px;align-items:center;}.output.svelte-1jdjhi > span:where(.svelte-1jdjhi) {font-size:16px;}.output.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:flex;align-items:center;gap:6px;}.notice.svelte-1jdjhi {padding:14px;border-radius:5px;margin:10px 0;font-size:14px;background:var(--wash);}.error.svelte-1jdjhi {color:var(--err);border:1px solid var(--err);}.warning.svelte-1jdjhi {color:var(--warn);}.fir-stats.svelte-1jdjhi {grid-column:3;grid-row:1;display:flex;flex-wrap:wrap;gap:8px 24px;margin:0;font-size:13px;color:var(--text-dim);}.fir-assignments.svelte-1jdjhi {grid-template-columns:1fr;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) {grid-template-columns:70px minmax(0, 1fr) auto auto;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > label:where(.svelte-1jdjhi) {grid-column:4;grid-row:1;}.empty.svelte-1jdjhi {padding:50px 0;color:var(--text-dim);}dialog.svelte-1jdjhi {color:var(--text);background:var(--panel-solid);border:1px solid var(--border-hi);border-radius:10px;width:440px;max-width:92vw;padding:25px;}dialog.svelte-1jdjhi::backdrop {background:#000a;backdrop-filter:blur(6px);}dialog.svelte-1jdjhi h2:where(.svelte-1jdjhi) {margin-top:0;font-weight:500;}dialog.svelte-1jdjhi label:where(.svelte-1jdjhi) {display:grid;gap:12px;}dialog.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {margin-top:24px;justify-content:flex-end;}dialog.svelte-1jdjhi p:where(.svelte-1jdjhi) {line-height:1.6;}\n  @media (max-width: 1100px) {.edit-grid.svelte-1jdjhi {grid-template-columns:1fr;}.outputs.svelte-1jdjhi {grid-template-columns:1fr;}.shell.svelte-1jdjhi {padding:16px;} }\n  @media (max-width: 600px) {.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) {grid-template-columns:42px minmax(0, 1fr) auto;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > span:where(.svelte-1jdjhi) {grid-column:1;}.fir-assignments.svelte-1jdjhi .output:where(.svelte-1jdjhi) > label:where(.svelte-1jdjhi) {grid-column:3;}.fir-stats.svelte-1jdjhi {grid-column:2;grid-row:2;}.output.svelte-1jdjhi {grid-template-columns:minmax(0, 1fr) auto;gap:4px 10px;}.output.svelte-1jdjhi > span:where(.svelte-1jdjhi) {grid-column:1 / -1;}.topbar.svelte-1jdjhi {margin-bottom:10px;}.brand.svelte-1jdjhi {min-width:0;flex-wrap:wrap;gap:0 12px;}.brand.svelte-1jdjhi h1:where(.svelte-1jdjhi) {font-size:26px;line-height:1.25;margin-top:6px;}.toolbar.svelte-1jdjhi .profile-select:where(.svelte-1jdjhi) {gap:12px;width:auto;}.profile-select.svelte-1jdjhi select:where(.svelte-1jdjhi) {max-width:100%;}.toolbar.svelte-1jdjhi .actions:where(.svelte-1jdjhi) {display:flex;justify-content:flex-end;width:100%;gap:8px;}.toolbar.svelte-1jdjhi .chip:where(.svelte-1jdjhi) {padding:10px 6px;font-size:14px;}\n  }"
};
function ks(e, t) {
	Ie(t, !0), qr(e, Os);
	let n = /* @__PURE__ */ L(Ut({
		profiles: [],
		outputs: []
	})), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(Ut({})), a = /* @__PURE__ */ L(0), o = /* @__PURE__ */ L(0), s = /* @__PURE__ */ L(0), c = /* @__PURE__ */ L(0), l = /* @__PURE__ */ I(() => G(i).settingType === 1), u = /* @__PURE__ */ L(!1), d = /* @__PURE__ */ I(() => G(u) ? G(s) : G(l) ? G(o) : 0), f = /* @__PURE__ */ I(() => !G(l) || G(c) === 0 ? "eqGeqGainBeans" : "eqGeqGainBeansRight"), p = /* @__PURE__ */ I(() => !G(l) || G(c) === 0 ? "enableGeq" : "enableGeqRight"), h = /* @__PURE__ */ I(() => G(u) ? G(d) === 0 ? "peqFirList" : "peqFirListRight" : fo(G(d))), g = /* @__PURE__ */ I(() => G(u) ? G(d) === 0 ? "enablePeqLeftFir" : "enablePeqRightFir" : po(G(d))), _ = /* @__PURE__ */ L(Ut([])), v = /* @__PURE__ */ L(Ut([])), y = /* @__PURE__ */ L("/"), b = /* @__PURE__ */ L(0), x = /* @__PURE__ */ L(0), S = /* @__PURE__ */ L(0), C = /* @__PURE__ */ L(""), ee = /* @__PURE__ */ L(""), w = /* @__PURE__ */ I(() => G(_).find((e) => e.url === G(C) && e.fileType !== 0 && e.name.toLowerCase().endsWith(".wav"))), te = /* @__PURE__ */ I(() => G(_).filter((e) => e.name.toLowerCase().includes(G(ee).toLowerCase()))), ne = /* @__PURE__ */ L("/");
	async function re() {
		let e = G(ne).trim(), t = e === "/" ? "/" : e === "flash://" || e.startsWith("flash:///") ? e : "flash:///" + e.replace(/^\/+/, "");
		await le(t);
		let n = t.startsWith("flash:///") ? t.slice(9).split("/").filter(Boolean) : [];
		R(v, t === "/" ? [] : [
			"/",
			...t === "flash://" ? [] : ["flash://"],
			...n.slice(0, -1).map((e, t) => "flash:///" + n.slice(0, t + 1).join("/"))
		], !0);
	}
	function ie(e) {
		if (e.target !== G(E) || !G(E)) return;
		let t = G(E).getBoundingClientRect();
		(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && G(E).close();
	}
	async function ae(e) {
		let t = G(y);
		await le(e), R(v, [...G(v), t], !0);
	}
	async function oe(e) {
		let t = G(v)[e];
		t && (await le(t), R(v, G(v).slice(0, e), !0));
	}
	function se(e) {
		return e === void 0 ? "—" : e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(0)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
	}
	let T = /* @__PURE__ */ L(0), E = /* @__PURE__ */ L(void 0), ce = Ut({});
	async function le(e = "/", t = 0) {
		let n = await F("files", {
			url: e,
			sort: G(b),
			start: t
		});
		R(_, n.list.filter((e) => e.url === "flash://" || e.url.startsWith("flash:///")), !0), R(y, e, !0), R(ne, e, !0), R(x, t, !0), R(S, n.total, !0), R(C, ""), R(ee, "");
	}
	async function ue(e) {
		if (G(Ye)) {
			R(Ne, "Save or discard profile edits before importing FIR.");
			return;
		}
		R(T, e, !0), R(v, [], !0), await $e(async () => {
			await le(), G(E)?.showModal();
		});
	}
	async function de(e) {
		if (!G(r)) return;
		let t = G(r).id, n = await F("import_fir", {
			profile_id: t,
			revision: G(r).revision,
			channel: G(T),
			path: e.url
		});
		ce[`${t}:${G(T)}`] = e.name, nt(n), await rt(), G(E)?.close(), R(M, "FIR Imported");
	}
	let fe = /* @__PURE__ */ L("peq"), pe = /* @__PURE__ */ L(Ut({
		stage: null,
		serial: 0
	}));
	function me(e) {
		(e === "peq" || e === "correction") && (Fe[G(h)] = G(N), R(u, e === "correction"), R(N, Fe[G(u) ? G(s) === 0 ? "peqFirList" : "peqFirListRight" : fo(G(l) ? G(o) : 0)] ?? 0, !0)), R(fe, e, !0), R(pe, {
			stage: e === "peq" ? "peq" : e === "correction" ? "correction" : e === "fir" ? "fir" : e === "geq" ? "geq" : null,
			serial: G(pe).serial + 1
		}, !0);
	}
	let he = /* @__PURE__ */ L(""), ge = /* @__PURE__ */ L(void 0), _e = /* @__PURE__ */ L(void 0), ve = /* @__PURE__ */ L(void 0), ye = /* @__PURE__ */ L(!1), be = /* @__PURE__ */ L(void 0), D = null, xe = /* @__PURE__ */ L("Discard And Reload");
	function Se(e, t = "Discard And Reload") {
		if (!G(O)) {
			if (!G(Ye)) {
				e();
				return;
			}
			D = e, R(xe, t, !0), G(be)?.showModal();
		}
	}
	function Ce() {
		D = null, G(be)?.close();
	}
	function we() {
		let e = D;
		D = null, G(be)?.close(), e?.();
	}
	let O = /* @__PURE__ */ L(!1), k = or(() => `eversolo:${t.panel.config.entry_id}:auto-save`);
	function Te() {
		try {
			return localStorage.getItem(k) === "true";
		} catch {
			return !1;
		}
	}
	let A = /* @__PURE__ */ L(Ut(Te()));
	mn(() => {
		let e = G(A);
		try {
			localStorage.setItem(k, String(e));
		} catch {}
	});
	let Ee = /* @__PURE__ */ L(!1);
	mn(() => {
		let e = JSON.stringify(Oo(G(i))), t = G(r)?.id;
		if (!G(A) || !G(Ye) || G(O) || G(Ve) || G(Ee)) return;
		let n = setTimeout(() => {
			or(() => {
				!G(A) || !G(Ye) || G(O) || G(Ve) || G(Ee) || G(r)?.id !== t || JSON.stringify(Oo(G(i))) !== e || $e(async () => {
					try {
						await gt();
					} catch (e) {
						throw R(A, !1), e;
					}
				});
			});
		}, 200);
		return () => clearTimeout(n);
	});
	let De = !1, ke = 0, Ae = /* @__PURE__ */ L(Ut({})), je = (e, t) => `${G(r)?.id}:${e}:${t}`, Me = /* @__PURE__ */ I(() => {
		let e = go(G(i));
		for (let t of [
			"audioTunningEQList",
			"audioTunningEQListRight",
			"peqFirList",
			"peqFirListRight"
		]) e[t] = e[t]?.map((e, n) => ({
			...e,
			bypass: je(t, n) in G(Ae)
		}));
		return e;
	}), Ne = /* @__PURE__ */ L(""), M = /* @__PURE__ */ L("Loading Profile…");
	mn(() => {
		if (G(M) !== "Saved And Verified On Device") return;
		let e = setTimeout(() => R(M, "No Unsaved Changes"), 3e3);
		return () => clearTimeout(e);
	});
	function Pe() {
		R(A, !G(A)), R(M, G(A) ? "Auto Save On" : "Auto Save Off", !0);
	}
	let N = /* @__PURE__ */ L(0), Fe = Ut({}), Re = /* @__PURE__ */ L(void 0), ze = /* @__PURE__ */ L("create"), Be = /* @__PURE__ */ L(""), Ve = /* @__PURE__ */ L(!1), He = /* @__PURE__ */ L(null), Ue = /* @__PURE__ */ L(""), We = /* @__PURE__ */ L(!1), Ge = /* @__PURE__ */ L(Ut({
		left: !1,
		right: !1
	}));
	function P(e) {
		G(O) || (e || R(Ge, {
			left: G(i).enableLeftFir ?? !1,
			right: G(i).enableRightFir ?? !1
		}, !0), R(We, e, !0), G(i).enableLeftFir !== void 0 && (G(i).enableLeftFir = e && G(Ge).left), G(i).enableRightFir !== void 0 && (G(i).enableRightFir = e && G(Ge).right));
	}
	function Ke(e, t) {
		G(O) || !G(We) || (G(Ge)[e] = t, G(i)[e === "left" ? "enableLeftFir" : "enableRightFir"] = t);
	}
	let qe = !0, Je = /* @__PURE__ */ I(() => G(He)?.profile_id === G(r)?.id && G(He)?.revision === G(r)?.revision ? G(He) : null), Ye = /* @__PURE__ */ I(() => G(r) !== null && JSON.stringify(Oo(G(i))) !== JSON.stringify(Oo(G(r).settings))), Xe = /* @__PURE__ */ I(() => G(i)[G(h)] ?? []), Ze = /* @__PURE__ */ I(() => G(Xe).map((e, t) => yo({
		...e,
		...G(Ae)[je(G(h), t)],
		bypass: je(G(h), t) in G(Ae)
	}))), Qe = /* @__PURE__ */ I(() => G(Xe)[G(N)] ? {
		...G(Xe)[G(N)],
		...G(Ae)[je(G(h), G(N))]
	} : void 0);
	function F(e, n = {}) {
		return t.hass.callWS({
			type: "eversolo/eq",
			entry_id: t.panel.config.entry_id,
			operation: e,
			payload: n
		});
	}
	async function $e(e) {
		if (!G(O)) {
			ke++, R(O, !0), R(Ne, "");
			try {
				await e();
			} catch (e) {
				R(Ne, e instanceof Error ? e.message : String(e?.message ?? e), !0), R(M, "Request Needs Attention");
			} finally {
				R(O, !1);
			}
		}
	}
	async function et() {
		R(n, await F("snapshot"), !0);
		try {
			let e = (await t.hass.callWS({ type: "config/entity_registry/list" })).find((e) => e.config_entry_id === t.panel.config.entry_id && e.entity_id.startsWith("media_player."));
			e && R(he, (await t.hass.callWS({ type: "get_states" })).find((t) => t.entity_id === e.entity_id)?.attributes.friendly_name || e.name || e.original_name || e.entity_id, !0);
		} catch {}
	}
	function tt() {
		Se(() => void $e(ot));
	}
	function nt(e, t = !1, n = !1) {
		t && G(r)?.id === e.id && !G(We) || (R(Ge, {
			left: e.settings.enableLeftFir ?? !1,
			right: e.settings.enableRightFir ?? !1
		}, !0), R(We, G(Ge).left || G(Ge).right, !0)), t || R(Ae, {}, !0);
		let o = n ? ko(e.settings, G(i)) : go(e.settings);
		R(r, e, !0), R(i, o, !0), R(Ve, !1), R(He, null), R(Ue, ""), R(N, 0), _o(G(i), G(a)).length || R(a, 0), R(M, "Read From Device");
	}
	async function rt(e = G(r)) {
		if (!(!qe || document.hidden || !e || e.processing?.hasFir === !1)) try {
			let t = await F("curves", { profile_id: e.id });
			qe && G(r)?.id === e.id && (R(He, t, !0), R(Ue, ""));
		} catch {
			G(r)?.id === e.id && (R(He, null), R(Ue, "FIR curve request failed. PEQ editing remains available."));
		}
	}
	async function it(e) {
		nt(await F("read", { profile_id: e })), await rt();
	}
	function at(e) {
		let t = e.currentTarget, n = Number(t.value);
		t.value = String(G(r)?.id ?? ""), Se(() => void $e(async () => {
			await it(n);
		}), "Discard And Switch");
	}
	async function ot() {
		await et();
		let e = G(n).profiles.some((e) => e.id === G(r)?.id) ? G(r).id : G(n).profiles[0]?.id;
		e === void 0 ? (R(r, null), R(i, {}, !0), R(M, "Create Your First Profile")) : await it(e);
	}
	async function st() {
		if (G(O) || De || !qe || document.hidden || G(Re)?.open || G(E)?.open || G(be)?.open) return;
		De = !0;
		let e = ke, t = G(r)?.id;
		try {
			let i = await F("snapshot");
			if (!qe || document.hidden || G(O) || e !== ke || G(r)?.id !== t) return;
			if (JSON.stringify(G(n)) !== JSON.stringify(i) && R(n, i, !0), G(r)) {
				let n = await F("read", { profile_id: t });
				if (!qe || document.hidden || G(O) || e !== ke || G(r)?.id !== t) return;
				if (G(Ye)) R(Ve, n.revision !== G(r).revision);
				else if (n.revision !== G(r).revision) {
					let e = document.activeElement?.shadowRoot?.activeElement ?? document.activeElement;
					if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement) return;
					nt(n);
				}
				(!G(He) || G(He).revision !== n.revision) && await rt(n);
			}
		} catch {} finally {
			De = !1;
		}
	}
	Ci(() => {
		$e(ot);
		let e = new ResizeObserver(() => {
			if (!G(_e) || !G(ve)) return;
			let e = G(_e).getBoundingClientRect();
			R(ye, G(ve).getBoundingClientRect().top >= e.bottom - 1);
		});
		for (let t of [
			G(ge),
			G(_e),
			G(ve)
		]) t && e.observe(t);
		let t, n = () => {
			t !== void 0 && clearInterval(t), t = void 0, qe && !document.hidden && (t = setInterval(() => void st(), 15e3));
		};
		n(), document.addEventListener("visibilitychange", n);
		let r = (e) => {
			G(Ye) && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", r), () => {
			qe = !1, e.disconnect(), clearInterval(t), document.removeEventListener("visibilitychange", n), window.removeEventListener("beforeunload", r);
		};
	});
	function ct(e, t) {
		if (G(O)) return;
		let n = je(G(h), e);
		if (t.bypass !== void 0) {
			t.bypass && (G(Ae)[n] = {
				gain: G(Xe)[e].gain,
				type: G(Xe)[e].type
			});
			let r = t.bypass ? 0 : G(Ae)[n]?.gain ?? 0, a = G(Ae)[n]?.type ?? G(Xe)[e].type;
			t.bypass || delete G(Ae)[n], G(i)[G(h)] = G(Xe).map((n, i) => i === e ? bo(n, !t.bypass, r, a) : n);
		} else t.gain !== void 0 && delete G(Ae)[n], G(i)[G(h)] = G(Xe).map((n, r) => r === e ? So(n, t) : n);
		R(N, e, !0);
	}
	function lt(e, t) {
		if (G(O) || !Number.isFinite(t)) return;
		let n = Math.round(Math.max(-20, Math.min(20, t)) * 10) / 10;
		G(i)[G(f)] = G(i)[G(f)]?.map((t, r) => r === e ? {
			...t,
			gain: n
		} : t);
	}
	function ut(e, t = 0) {
		if (G(O)) return;
		let n = fo(t);
		G(i)[n] = G(i)[n]?.map((t) => ({
			...t,
			volume: Math.round(e * 10)
		}));
	}
	function dt(e) {
		!G(u) && !G(l) || (Fe[G(h)] = G(N), G(u) ? R(s, e, !0) : R(o, e, !0), R(N, Fe[G(u) ? e === 0 ? "peqFirList" : "peqFirListRight" : fo(e)] ?? 0, !0));
	}
	function ft() {
		if (G(O) || !G(u) && !G(l)) return;
		let e = +(G(d) === 0), t = G(u) ? e === 0 ? "peqFirList" : "peqFirListRight" : fo(e);
		if (G(i)[t]?.length !== G(Xe).length) {
			R(Ne, "Channel band counts differ; reload the profile before setting both channels.");
			return;
		}
		G(i)[t] = go(G(Xe)), G(Xe).forEach((e, n) => {
			let r = G(Ae)[je(G(h), n)], i = je(t, n);
			r ? G(Ae)[i] = { ...r } : delete G(Ae)[i];
		});
	}
	function pt() {
		G(Xe).forEach((e, t) => delete G(Ae)[je(G(h), t)]), G(i)[G(h)] = G(Xe).map(xo);
	}
	function mt(e) {
		if (G(O)) return;
		let t = () => {
			R(ze, e, !0), R(Be, e === "rename" || e === "save_as" ? G(r)?.name ?? "" : "", !0), G(Re)?.showModal();
		};
		e === "create" ? Se(t, "Discard And Continue") : t();
	}
	async function ht(e) {
		e.preventDefault();
		let t = G(r);
		G(Re)?.close(), await $e(async () => {
			G(ze) === "create" ? (nt(await F("create", { name: G(Be) })), await rt(), await et(), R(M, "Profile Created")) : t && G(ze) === "save_as" ? (nt(await F("save_as", {
				profile_id: t.id,
				revision: t.revision,
				name: G(Be),
				settings: Oo(G(i))
			}), !1, !0), await rt(), await et(), R(M, "Profile Copied And Verified On Device")) : t && G(ze) === "rename" ? (R(r, await F("rename", {
				profile_id: t.id,
				revision: t.revision,
				name: G(Be)
			}), !0), await rt(), await et(), R(M, "Profile Renamed")) : t && (await F("delete", {
				profile_id: t.id,
				revision: t.revision,
				expected_name: t.name
			}), R(r, null), R(i, {}, !0), await ot(), R(M, "Profile Deleted"));
		});
	}
	async function gt() {
		if (!G(r)) return;
		let e = await F("save", {
			profile_id: G(r).id,
			revision: G(r).revision,
			settings: Oo(G(i))
		}), t = G(N);
		nt(e, !0, !0), R(N, t, !0), await rt(), await et(), R(M, "Saved And Verified On Device");
	}
	function _t(e, t, n, r) {
		let a = Number(e.currentTarget.value);
		t === "frequency" && (a = Math.round(20 * 1e3 ** (a / 1e3))), !G(O) && t === "gain" && delete G(Ae)[je(n, r)], G(O) || (G(i)[n] = G(i)[n]?.map((e, n) => n === r ? So(e, { [t]: a }) : e));
	}
	var vt = Ds();
	pr("pointerdown", Kt, (e) => {
		e.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range") && R(Ee, !0);
	}), pr("pointerup", Kt, () => R(Ee, !1)), pr("pointercancel", Kt, () => R(Ee, !1)), pr("blur", Kt, () => R(Ee, !1));
	var yt = B(vt), bt = z(yt), xt = z(bt);
	let St;
	var Ct = z(xt), wt = z(Ct, !0);
	j(Ct), j(xt), j(bt);
	var Tt = V(bt, 2);
	let Et;
	var Dt = z(Tt), Ot = V(z(Dt), 2), kt = z(Ot), At = (e) => {
		var t = qo();
		t.value = t.__value = "", J(e, t);
	};
	X(kt, (e) => {
		G(r) || e(At);
	}), Z(V(kt), 17, () => G(n).profiles, (e) => e.id, (e, t) => {
		var n = Jo(), r = z(n);
		j(n);
		var i = {};
		H(() => {
			Y(r, `${(G(t).name || "Unnamed") ?? ""} · #${G(t).id ?? ""}`), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
		}), J(e, n);
	}), j(Ot);
	var jt;
	ni(Ot), j(Dt), xi(Dt, (e) => R(_e, e), () => G(_e));
	var Mt = V(Dt, 2), Nt = z(Mt), Pt = V(Nt, 2), Ft = V(Pt, 2), It = V(Ft, 2);
	j(Mt), xi(Mt, (e) => R(ve, e), () => G(ve)), j(Tt), xi(Tt, (e) => R(ge, e), () => G(ge));
	var Lt = V(Tt, 2), Rt = (e) => {
		var t = Yo(), n = z(t, !0);
		j(t), H(() => Y(n, G(Ne))), J(e, t);
	};
	X(Lt, (e) => {
		G(Ne) && e(Rt);
	});
	var zt = V(Lt, 2), Bt = (e) => {
		J(e, Xo());
	};
	X(zt, (e) => {
		G(Ve) && e(Bt);
	});
	var Vt = V(zt, 2), Ht = (e) => {
		let t = (e) => {
			var t = Zo(), n = z(t);
			let r;
			var i = z(n, !0);
			j(n);
			var a = V(n), o = z(a), s = V(o, 2), c = V(s, 2), l = V(c, 2);
			let u;
			var d = V(z(l)), f = z(d, !0);
			j(d), j(l), j(a), j(t), H(() => {
				r = Q(n, 1, "svelte-1jdjhi", null, r, { unsaved: G(Ye) }), Y(i, G(Ye) ? "Unsaved Changes" : G(M)), o.disabled = G(O), s.disabled = G(O) || !G(Ye), c.disabled = G(O) || !G(Ye) || G(Ve), u = Q(l, 1, "chip md auto-save svelte-1jdjhi", null, u, { on: G(A) }), $(l, "aria-pressed", G(A)), l.disabled = G(O) || G(Ve), Y(f, G(A) ? "Auto Save On" : "Auto Save Off");
			}), K("click", o, tt), K("click", s, tt), K("click", c, () => void $e(gt)), K("click", l, Pe), J(e, t);
		};
		var o = _s(), s = B(o);
		Ko(s, {
			get busy() {
				return G(O);
			},
			onModeChange: (e) => G(i).settingType = e,
			onChannelChange: (e) => R(a, e, !0),
			get settings() {
				return G(Me);
			},
			get profile() {
				return G(r);
			},
			get fir() {
				return G(He);
			},
			get channel() {
				return G(a);
			},
			get actions() {
				return t;
			},
			get previewRequest() {
				return G(pe);
			}
		});
		var _ = V(s, 2), v = (e) => {
			var t = Qo(), n = z(t, !0);
			j(t), H(() => Y(n, G(Ue))), J(e, t);
		};
		X(_, (e) => {
			G(Ue) && e(v);
		});
		var y = V(_, 2);
		Z(y, 20, () => [
			["preamp", "Preamp & Balance"],
			["geq", "Graphic EQ"],
			["peq", "PEQ"],
			["correction", "Correction PEQ"],
			["fir", "FIR"],
			["loudness", "Loudness"],
			["outputs", "Outputs"]
		], Nr, (e, t) => {
			var n = /* @__PURE__ */ I(() => m(t, 2));
			let r = () => G(n)[0], i = () => G(n)[1];
			var a = $o();
			let o;
			var s = z(a, !0);
			j(a), H(() => {
				o = Q(a, 1, "chip", null, o, { on: G(fe) === r() }), $(a, "aria-pressed", G(fe) === r()), Y(s, i());
			}), K("click", a, () => me(r())), J(e, a);
		}), j(y);
		var b = V(y, 2), x = z(b);
		let S;
		var C = z(x);
		{
			let e = /* @__PURE__ */ I(() => G(u) ? "Correction PEQ" : "PEQ"), t = /* @__PURE__ */ I(() => !G(u) && !G(l)), n = /* @__PURE__ */ I(() => [
				1002,
				1003,
				1004,
				1005,
				Ii.Peaking,
				1007,
				1008,
				1009
			]);
			xa(C, {
				get stageLabel() {
					return G(e);
				},
				get mono() {
					return G(t);
				},
				get bankChannel() {
					return G(d);
				},
				onBankChannel: dt,
				get selectedBand() {
					return G(N);
				},
				onSelect: (e) => R(N, e, !0),
				get enabled() {
					return G(i)[G(g)];
				},
				onEnable: (e) => G(i)[G(g)] = e,
				get bands() {
					return G(Ze);
				},
				onPatch: ct,
				onReset: pt,
				onSetBoth: ft,
				get types() {
					return G(n);
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
		Mr(V(C, 2), () => `${G(h)}:${G(N)}`, (e) => {
			let t = /* @__PURE__ */ I(() => G(h)), n = /* @__PURE__ */ I(() => G(N));
			var r = wr(), i = B(r), a = (e) => {
				Oi(e, {
					code: "EQ.05",
					title: "Band Sliders",
					right: (e) => {
						var t = ts();
						Z(t, 21, () => G(Xe), Nr, (e, t, n) => {
							var r = es();
							r.textContent = `Band ${n + 1}`, r.value = r.__value = n, J(e, r);
						}), j(t), ri(t, () => G(N), (e) => R(N, e)), J(e, t);
					},
					children: (e, r) => {
						var i = ns(), a = z(i), o = V(z(a)), s = z(o);
						j(o);
						var c = V(o);
						li(c), j(a);
						var l = V(a, 2);
						let u;
						var d = V(z(l)), f = z(d);
						j(d);
						var p = V(d);
						li(p), j(l);
						var m = V(l, 2), h = V(z(m)), g = z(h, !0);
						j(h);
						var _ = V(h);
						li(_), j(m), j(i), H((e, t, n) => {
							Y(s, `${G(Qe).fc ?? ""} Hz`), ui(c, e), u = Q(l, 1, "svelte-1jdjhi", null, u, t), Y(f, `${G(Qe).gain ?? ""} dB`), p.disabled = n, ui(p, G(Qe).gain), Y(g, G(Qe).q), ui(_, G(Qe).q);
						}, [
							() => Math.log(G(Qe).fc / 20) / Math.log(1e3) * 1e3,
							() => ({ "gain-disabled": [
								2,
								3,
								4,
								5
							].includes(G(Qe).type) }),
							() => [
								2,
								3,
								4,
								5
							].includes(G(Qe).type)
						]), K("input", c, (e) => _t(e, "frequency", G(t), G(n))), K("input", p, (e) => _t(e, "gain", G(t), G(n))), K("input", _, (e) => _t(e, "q", G(t), G(n))), J(e, i);
					},
					$$slots: {
						right: !0,
						default: !0
					}
				});
			};
			X(i, (e) => {
				G(Qe) && e(a);
			}), J(e, r);
		}), j(x);
		var ee = V(x, 2);
		let w;
		Oi(z(ee), {
			code: "EQ.06",
			title: "Graphic EQ",
			titleControl: (e) => {
				var t = rs(), n = z(t);
				li(n), j(t), H(() => {
					di(n, G(i)[G(p)] ?? !1), n.disabled = G(i)[G(p)] === void 0;
				}), K("change", n, (e) => G(i)[G(p)] = e.currentTarget.checked), J(e, t);
			},
			right: (e) => {
				var t = is(), n = B(t);
				{
					let e = /* @__PURE__ */ I(() => !G(l));
					ji(n, {
						get mono() {
							return G(e);
						},
						label: "Graphic EQ bank",
						get value() {
							return G(c);
						},
						onChange: (e) => R(c, e, !0)
					});
				}
				K("click", V(n, 2), () => G(i)[G(f)] = G(i)[G(f)]?.map((e) => ({
					...e,
					gain: 0
				}))), J(e, t);
			},
			children: (e, t) => {
				var n = os();
				Z(n, 21, () => G(i)[G(f)] ?? [], Nr, (e, t, n) => {
					var r = as(), a = z(r);
					li(a);
					var o = V(a, 2);
					li(o);
					var s = V(o, 2), c = z(s, !0);
					j(s), j(r), H((e) => {
						$(a, "aria-label", `Graphic EQ ${G(t).freq} Hz gain value`), ui(a, e), $(o, "aria-label", `Graphic EQ ${G(t).freq} Hz gain`), ui(o, G(t).gain), Y(c, G(t).freq >= 1e3 ? `${G(t).freq / 1e3}k` : G(t).freq);
					}, [() => G(t).gain.toFixed(1)]), K("change", a, (e) => {
						lt(n, e.currentTarget.valueAsNumber), e.currentTarget.value = G(i)[G(f)][n].gain.toFixed(1);
					}), K("input", o, (e) => lt(n, e.currentTarget.valueAsNumber)), J(e, r);
				}), j(n), J(e, n);
			},
			$$slots: {
				titleControl: !0,
				right: !0,
				default: !0
			}
		}), j(ee);
		var te = V(ee, 2);
		let ne;
		var re = z(te), ie = (e) => {
			Oi(e, {
				code: "DSP.02",
				title: "Loudness Compensation",
				titleControl: (e) => {
					var t = ss(), n = z(t);
					li(n), j(t), H((e) => di(n, e), [() => G(i)[mo(G(a))] === 1]), K("change", n, (e) => G(i)[mo(G(a))] = +!!e.currentTarget.checked), J(e, t);
				},
				children: (e, t) => {
					var n = cs();
					Ka(z(n), {}), j(n), J(e, n);
				},
				$$slots: {
					titleControl: !0,
					default: !0
				}
			});
		}, ae = /* @__PURE__ */ I(() => G(i)[mo(G(a))] !== void 0 && G(r).processing?.hasLoudness !== !1);
		X(re, (e) => {
			G(ae) && e(ie);
		}), j(te);
		var oe = V(te, 2);
		let se;
		var T = z(oe), E = (e) => {
			{
				let t = /* @__PURE__ */ I(() => vo(G(i), 0)), n = /* @__PURE__ */ I(() => G(l) && G(i).audioTunningEQListRight?.length ? vo(G(i), 1) : void 0);
				Qa(e, {
					get balance() {
						return G(i).balance;
					},
					onBalance: (e) => G(i).balance = e,
					get preampDb() {
						return G(t);
					},
					get rightPreampDb() {
						return G(n);
					},
					accentChannelId: 0,
					onChange: (e) => ut(e, 0),
					onRightChange: (e) => ut(e, 1),
					onReset: () => {
						ut(0, 0), G(l) && ut(0, 1), G(i).balance !== void 0 && (G(i).balance = 0);
					}
				});
			}
		};
		X(T, (e) => {
			G(i).audioTunningEQList?.length && e(E);
		}), j(oe);
		var le = V(oe, 2);
		let de;
		var he = z(le), ge = (e) => {
			Oi(e, {
				code: "DSP.03",
				title: "FIR Filters",
				titleControl: (e) => {
					var t = ls(), n = z(t);
					li(n), j(t), H(() => {
						di(n, G(We)), n.disabled = G(i).enableLeftFir === void 0 && G(i).enableRightFir === void 0;
					}), K("change", n, (e) => P(e.currentTarget.checked)), J(e, t);
				},
				children: (e, t) => {
					var n = fs();
					Z(n, 20, () => ["left", "right"], Nr, (e, t) => {
						let n = /* @__PURE__ */ I(() => t === "left" ? 0 : 1);
						var a = ds(), o = z(a), s = z(o, !0);
						j(o);
						var c = V(o, 2), l = V(c, 2), u = (e) => {
							var t = us(), i = z(t, !0);
							j(t), H(() => Y(i, ce[`${G(r).id}:${G(n)}`])), J(e, t);
						};
						X(l, (e) => {
							ce[`${G(r).id}:${G(n)}`] && e(u);
						});
						var d = V(l, 2), f = z(d);
						li(f), Oe(), j(d);
						var p = V(d, 2), m = z(p), h = z(m, !0);
						j(m), j(p), j(a), H((e) => {
							Y(s, t === "left" ? "Left" : "Right"), c.disabled = G(O) || G(Ye), $(f, "aria-label", `${t === "left" ? "Left" : "Right"} FIR Enabled`), di(f, G(i)[t === "left" ? "enableLeftFir" : "enableRightFir"] ?? !1), f.disabled = !G(We) || G(i)[t === "left" ? "enableLeftFir" : "enableRightFir"] === void 0, $(p, "aria-label", `${t === "left" ? "Left" : "Right"} FIR Status`), Y(h, e);
						}, [() => G(Je)?.[t]?.loaded && G(Je)[t].points.length > 0 && G(Je)[t].points.every((e) => Number.isFinite(e.x) && Number.isFinite(e.y)) ? "Filter Imported" : "Filter Not Imported"]), K("click", c, () => void ue(G(n))), K("change", f, (e) => Ke(t, e.currentTarget.checked)), J(e, a);
					}), j(n), J(e, n);
				},
				$$slots: {
					titleControl: !0,
					default: !0
				}
			});
		};
		X(he, (e) => {
			G(r).processing?.hasFir !== !1 && e(ge);
		}), j(le);
		var _e = V(le, 2);
		let ve;
		Oi(z(_e), {
			code: "IO.01",
			title: "Output Assignments",
			children: (e, t) => {
				var r = gs();
				Z(r, 21, () => G(n).outputs, (e) => e.id, (e, t) => {
					var r = hs(), i = z(r), a = z(i, !0);
					j(i);
					var o = V(i, 2), s = z(o), c = (e) => {
						var n = ps(), r = z(n);
						j(n);
						var i = {};
						H(() => {
							Y(r, `Unknown Profile #${G(t).eqId ?? ""}`), i !== (i = G(t).eqId) && (n.value = (n.__value = G(t).eqId) ?? "");
						}), J(e, n);
					}, l = /* @__PURE__ */ I(() => !G(n).profiles.some((e) => e.id === G(t).eqId));
					X(s, (e) => {
						G(l) && e(c);
					}), Z(V(s), 17, () => G(n).profiles, (e) => e.id, (e, t) => {
						var n = ms(), r = z(n);
						j(n);
						var i = {};
						H(() => {
							Y(r, `${G(t).name ?? ""} · #${G(t).id ?? ""}`), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
						}), J(e, n);
					}), j(o);
					var u;
					ni(o);
					var d = V(o, 2), f = z(d);
					li(f), Oe(), j(d), j(r), H(() => {
						Y(a, G(t).name), $(o, "aria-label", `${G(t).name} assigned profile`), o.disabled = G(O), u !== (u = G(t).eqId) && (o.value = (o.__value = G(t).eqId) ?? "", ti(o, G(t).eqId)), di(f, G(t).enable), f.disabled = G(O);
					}), K("change", o, (e) => {
						let n = Number(e.currentTarget.value);
						e.currentTarget.value = String(G(t).eqId), $e(async () => {
							await F("output", {
								output_id: G(t).id,
								profile_id: n
							}), await et();
						});
					}), K("change", f, (e) => {
						let n = e.currentTarget.checked;
						e.currentTarget.checked = G(t).enable, $e(async () => {
							await F("output", {
								output_id: G(t).id,
								enabled: n
							}), await et();
						});
					}), J(e, r);
				}), j(r), J(e, r);
			},
			$$slots: { default: !0 }
		}), j(_e), j(b), H(() => {
			b.disabled = G(O), S = Q(x, 1, "tab-pane bands-wrap svelte-1jdjhi", null, S, { inactive: G(fe) !== "peq" && G(fe) !== "correction" }), x.inert = G(fe) !== "peq" && G(fe) !== "correction", w = Q(ee, 1, "tab-pane svelte-1jdjhi", null, w, { inactive: G(fe) !== "geq" }), ee.inert = G(fe) !== "geq", ne = Q(te, 1, "tab-pane svelte-1jdjhi", null, ne, { inactive: G(fe) !== "loudness" }), te.inert = G(fe) !== "loudness", se = Q(oe, 1, "tab-pane svelte-1jdjhi", null, se, { inactive: G(fe) !== "preamp" }), oe.inert = G(fe) !== "preamp", de = Q(le, 1, "tab-pane svelte-1jdjhi", null, de, { inactive: G(fe) !== "fir" }), le.inert = G(fe) !== "fir", ve = Q(_e, 1, "tab-pane output-panel svelte-1jdjhi", null, ve, { inactive: G(fe) !== "outputs" }), _e.inert = G(fe) !== "outputs";
		}), J(e, o);
	}, Wt = (e) => {
		J(e, vs());
	};
	X(Vt, (e) => {
		G(r) ? e(Ht) : G(O) || e(Wt, 1);
	}), j(yt);
	var Gt = V(yt, 2), qt = z(Gt), Jt = V(z(qt)), Yt = z(Jt);
	j(Jt), j(qt);
	var Xt = V(qt, 2), Zt = z(Xt), Qt = V(Zt, 2), $t = z(Qt);
	li($t);
	var en = V($t, 2);
	j(Qt), j(Xt);
	var tn = V(Xt, 2), nn = z(tn);
	li(nn);
	var rn = V(nn, 2), an = V(z(rn));
	Z(an, 20, () => [
		"Name ↑",
		"Name ↓",
		"Size ↑",
		"Size ↓",
		"Time ↑",
		"Time ↓",
		"Type ↑",
		"Type ↓"
	], Nr, (e, t, n) => {
		var r = ys(), i = z(r, !0);
		j(r), r.value = r.__value = n, H(() => Y(i, t)), J(e, r);
	}), j(an), j(rn), j(tn);
	var on = V(tn, 2), sn = z(on), cn = V(z(sn));
	Z(cn, 21, () => G(te), (e) => e.url, (e, t) => {
		var n = xs();
		let r;
		var i = z(n), a = z(i), o = z(a), s = z(o), c = (e) => {
			J(e, bs());
		}, l = (e) => {
			J(e, Cr("♫"));
		};
		X(s, (e) => {
			G(t).fileType === 0 ? e(c) : e(l, -1);
		}), j(o);
		var u = V(o, 1, !0);
		j(a), j(i);
		var d = V(i), f = z(d, !0);
		j(d);
		var p = V(d), m = z(p, !0);
		j(p), j(n), H((e, i, o) => {
			r = Q(n, 1, "svelte-1jdjhi", null, r, { selected: G(C) === G(t).url }), $(a, "aria-label", `${G(t).fileType === 0 ? "Open Folder" : "Select File"}: ${G(t).name}`), $(a, "aria-pressed", G(t).fileType === 0 ? void 0 : G(C) === G(t).url), a.disabled = e, Y(u, G(t).name), Y(f, i), Y(m, o);
		}, [
			() => G(O) || G(t).fileType !== 0 && !G(t).name.toLowerCase().endsWith(".wav"),
			() => G(t).fileType === 0 ? "Folder" : G(t).name.toLowerCase().endsWith(".wav") ? "WAV Audio" : "File",
			() => G(t).fileType === 0 ? "—" : se(G(t).size)
		]), K("click", a, () => {
			G(t).fileType === 0 ? $e(() => ae(G(t).url)) : R(C, G(t).url, !0);
		}), J(e, n);
	}, (e) => {
		var t = Ss(), n = z(t), r = z(n, !0);
		j(n), j(t), H(() => Y(r, G(ee) ? "No Matching Files" : "This Folder Is Empty")), J(e, t);
	}), j(cn), j(sn), j(on);
	var ln = V(on, 2), un = (e) => {
		var t = Cs(), n = z(t), r = V(n), i = z(r);
		j(r);
		var a = V(r);
		j(t), H((e) => {
			n.disabled = G(O) || G(x) === 0, Y(i, `${G(x) + 1}–${e ?? ""} / ${G(S) ?? ""}`), a.disabled = G(O) || G(x) + 1e3 >= G(S);
		}, [() => Math.min(G(x) + 1e3, G(S))]), K("click", n, () => void $e(() => le(G(y), Math.max(0, G(x) - 1e3)))), K("click", a, () => void $e(() => le(G(y), G(x) + 1e3))), J(e, t);
	};
	X(ln, (e) => {
		G(S) > 1e3 && e(un);
	});
	var dn = V(ln, 2), fn = V(z(dn));
	li(fn), j(dn);
	var pn = V(dn, 2), hn = (e) => {
		var t = ws(), n = z(t, !0);
		j(t), H(() => Y(n, G(Ne))), J(e, t);
	};
	X(pn, (e) => {
		G(Ne) && e(hn);
	});
	var gn = V(pn, 2), _n = V(z(gn)), vn = z(_n), yn = V(vn);
	j(_n), j(gn), j(Gt), xi(Gt, (e) => R(E, e), () => G(E));
	var bn = V(Gt, 2), xn = V(z(bn), 4), Sn = z(xn), Cn = V(Sn), wn = z(Cn, !0);
	j(Cn), j(xn), j(bn), xi(bn, (e) => R(be, e), () => G(be));
	var Tn = V(bn, 2), En = z(Tn), Dn = z(En), On = z(Dn, !0);
	j(Dn);
	var kn = V(Dn, 2), An = (e) => {
		var t = Ts(), n = z(t);
		j(t), H((e) => Y(n, `Permanently delete “${e ?? ""}” (#${G(r)?.id ?? ""}) from this device? Any unsaved edits will be discarded.`), [() => G(r)?.name.trim()]), J(e, t);
	}, jn = (e) => {
		var t = Es(), n = V(z(t));
		li(n), j(t), hi(n, () => G(Be), (e) => R(Be, e)), J(e, t);
	};
	X(kn, (e) => {
		G(ze) === "delete" ? e(An) : e(jn, -1);
	});
	var Mn = V(kn, 2), Nn = z(Mn), Pn = V(Nn);
	let Fn;
	var In = z(Pn, !0);
	j(Pn), j(Mn), j(En), j(Tn), xi(Tn, (e) => R(Re, e), () => G(Re)), H((e, t) => {
		St = Q(xt, 1, "brand svelte-1jdjhi", null, St, { centered: G(ye) }), Y(wt, G(he)), Et = Q(Tt, 1, "toolbar svelte-1jdjhi", null, Et, { wrapped: G(ye) }), Ot.disabled = G(O) || !G(n).profiles.length, jt !== (jt = G(r)?.id ?? "") && (Ot.value = (Ot.__value = G(r)?.id ?? "") ?? "", ti(Ot, G(r)?.id ?? "")), Nt.disabled = G(O), Pt.disabled = G(O) || !G(r) || G(Ve), Ft.disabled = G(O) || !G(r), It.disabled = G(O) || !G(r), Y(Yt, `${G(T) === 0 ? "Left" : "Right"} Channel`), Zt.disabled = G(O) || !G(v).length, $t.disabled = G(O), en.disabled = G(O), an.disabled = G(O), ui(fn, G(w)?.name ?? ""), yn.disabled = G(O) || !G(w), Y(wn, G(xe)), Y(On, G(ze) === "create" ? "Create Profile" : G(ze) === "save_as" ? "Save Profile As" : G(ze) === "rename" ? "Rename Profile" : "Delete Profile"), Fn = Q(Pn, 1, "chip md", null, Fn, {
			danger: G(ze) === "delete",
			accent: G(ze) !== "delete"
		}), Pn.disabled = e, Y(In, t);
	}, [() => G(O) || G(ze) !== "delete" && !G(Be).trim(), () => G(ze) === "save_as" ? "Save As" : G(ze)[0].toUpperCase() + G(ze).slice(1)]), K("change", Ot, at), K("click", Nt, () => mt("create")), K("click", Pt, () => mt("save_as")), K("click", Ft, () => mt("rename")), K("click", It, () => mt("delete")), K("click", Gt, ie), K("click", Zt, () => void $e(() => oe(G(v).length - 1))), K("keydown", $t, (e) => {
		e.key === "Enter" && (e.preventDefault(), $e(re));
	}), hi($t, () => G(ne), (e) => R(ne, e)), K("click", en, () => void $e(re)), hi(nn, () => G(ee), (e) => R(ee, e)), K("change", an, () => void $e(() => le(G(y)))), ri(an, () => G(b), (e) => R(b, e)), K("click", vn, () => G(E)?.close()), K("click", yn, () => {
		let e = G(w);
		e && $e(() => de(e));
	}), pr("cancel", bn, () => D = null), K("click", Sn, Ce), K("click", Cn, we), pr("submit", En, ht), K("click", Nn, () => G(Re)?.close()), J(e, vt), Le();
}
mr([
	"change",
	"click",
	"input",
	"keydown"
]);
//#endregion
//#region src/theme.css?inline
var As = ":host{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;--bg:#050505;--bg-glow:var(--bg);--panel:#1a1a19;--panel-hi:#292927;--panel-solid:#20201e;--text:#f1f0ed;--text-dim:#cbc9c4;--text-faint:#a6a49f;--border:#30302d;--border-hi:#4b4b46;--wash-faint:#1f1f1d;--wash:#262624;--wash-strong:#333330;--accent:#70bdce;--ok:#e3e2de;--warn:#d2bfa0;--err:#d8948b;--number-positive:var(--text);--number-negative:var(--text);--dim-disabled:.5;--pad:20px;--radius-s:7px;--radius-m:12px;--radius:18px;--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;--font-mono:var(--font-sans);height:100%;font-family:var(--font-sans);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;font-size:17px;line-height:1.5;display:block;overflow:auto}button,input,select{font-family:inherit}button{color:var(--text)}button,select,input{-webkit-tap-highlight-color:transparent}input[type=checkbox]{accent-color:#d9d8d3;flex-shrink:0;width:20px;height:20px}input[type=range]{appearance:none;cursor:pointer;background:0 0;height:44px;margin:0;padding:0;display:block}input[type=range]::-webkit-slider-runnable-track{background:#4a4a46;border-radius:4px;height:6px}input[type=range]::-webkit-slider-thumb{appearance:none;background:#eeeeea;border:0;border-radius:3px;width:8px;height:24px;margin-top:-9px}input[type=range]::-moz-range-track{background:#4a4a46;border-radius:4px;height:6px}input[type=range]::-moz-range-thumb{background:#eeeeea;border:0;border-radius:3px;width:8px;height:24px}input[type=range]:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:6px}.chip{font-family:var(--font-sans);letter-spacing:0;background:var(--wash);border:1px solid var(--border-hi);min-height:40px;color:var(--text);cursor:pointer;border-radius:9px;padding:9px 14px;font-size:15px;font-weight:500;line-height:1.3}.chip:hover:not(:disabled){background:var(--wash-strong)}.chip:focus-visible{outline:2px solid var(--accent);outline-offset:3px}.chip:disabled{opacity:var(--dim-disabled);cursor:default}.chip.md{min-height:44px;padding:11px 16px;font-size:15px}.chip.hi{background:0 0}.chip.accent{color:#f5f4f0;background:#3d4548;border-color:#687275}.chip.accent:hover:not(:disabled){background:#4b5558}.chip.danger{color:#e0aaa2;background:0 0;border-color:#71514b}.chip.warn{color:var(--warn)}.chip.on{color:var(--accent);border-color:var(--accent)}.microlbl{font:500 15px/1.5 var(--font-sans);color:var(--text-dim)}.hint{font:14px/1.6 var(--font-sans);color:var(--text-faint);margin:0}.ch-left,.ch-right{--ch-glow:#dddad3}.toggle-label{min-height:44px;font:16px var(--font-sans);color:var(--text-dim);align-items:center;gap:12px;display:inline-flex}input.switch[type=checkbox]{appearance:none;border:1px solid var(--border-hi);cursor:pointer;vertical-align:middle;background:#494945;border-radius:18px;flex:0 0 54px;width:54px;height:30px;min-height:30px;margin:7px 0;padding:3px;position:relative}input.switch[type=checkbox]:after{content:\"\";background:#eee;border-radius:50%;width:22px;height:22px;transition:transform .15s;display:block}input.switch[type=checkbox]:checked{background:#8baba6}input.switch[type=checkbox]:checked:after{transform:translate(24px)}input.switch[type=checkbox]:focus-visible{outline:2px solid var(--accent);outline-offset:3px}input.switch[type=checkbox]:disabled{opacity:.5;cursor:default}select{appearance:none!important;background-image:linear-gradient(45deg, transparent 50%, var(--text-faint) 50%), linear-gradient(135deg, var(--text-faint) 50%, transparent 50%)!important;background-position:calc(100% - 17px),calc(100% - 13px)!important;background-repeat:no-repeat!important;background-size:4px 4px,4px 4px!important;padding-right:34px!important}", js = class extends HTMLElement {
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
		this.instance = void 0, this.resetting = !0, (e ? kr(e) : Promise.resolve()).then(() => {
			this.root.replaceChildren(), this.resetting = !1, this.start();
		});
	}
	start() {
		if (this.resetting || !this.isConnected || this.instance || !this.currentHass || !this.currentPanel) return;
		let e = document.createElement("style");
		e.textContent = As, this.root.append(e), this.instance = Tr(ks, {
			target: this.root,
			props: {
				hass: { callWS: (e) => this.currentHass.callWS(e) },
				panel: this.currentPanel
			}
		});
	}
};
customElements.get("eversolo-peq-panel") || customElements.define("eversolo-peq-panel", js);
//#endregion
