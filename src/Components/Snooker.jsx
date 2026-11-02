
import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_PRICES = {
  single6: 100,
  single10: 150,
  double6: 200,
  double10: 300,
  numbri: 12
};

const makeTables = () => Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  active: false,
  startedAt: null,
  elapsed: 0,
  game: "single6",
  discount: 0,
  customer: ""
}));

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const money = n => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;
const dayKey = value => new Date(value).toISOString().slice(0, 10);

export default function Snooker() {
  const [owner, setOwner] = useState(() => read("snookerOwner", null));
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("snookerLoggedIn") === "yes");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tables, setTables] = useState(() => read("snookerTables", makeTables()));
  const [prices, setPrices] = useState(() => read("snookerPrices", DEFAULT_PRICES));
  const [history, setHistory] = useState(() => read("snookerHistory", []));
  const [expenses, setExpenses] = useState(() => read("snookerExpenses", []));
  const [udhaar, setUdhaar] = useState(() => read("snookerUdhaar", []));
  const [payments, setPayments] = useState(() => read("snookerPayments", []));
  const [now, setNow] = useState(Date.now());

  const [page, setPage] = useState("dashboard");
  const [message, setMessage] = useState("");

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [udhaarAmount, setUdhaarAmount] = useState("");
  const [returnAmounts, setReturnAmounts] = useState({});
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayKey(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => localStorage.setItem("snookerTables", JSON.stringify(tables)), [tables]);
  useEffect(() => localStorage.setItem("snookerPrices", JSON.stringify(prices)), [prices]);
  useEffect(() => localStorage.setItem("snookerHistory", JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem("snookerExpenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("snookerUdhaar", JSON.stringify(udhaar)), [udhaar]);
  useEffect(() => localStorage.setItem("snookerPayments", JSON.stringify(payments)), [payments]);

  const notify = text => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const login = e => {
    e.preventDefault();

    if (!owner) {
      if (username.trim().length < 3 || password.length < 6) {
        notify("Username kam az kam 3 aur password 6 characters ka hona chahiye.");
        return;
      }

      const newOwner = { username: username.trim(), password };
      localStorage.setItem("snookerOwner", JSON.stringify(newOwner));
      setOwner(newOwner);
      sessionStorage.setItem("snookerLoggedIn", "yes");
      setLoggedIn(true);
      return;
    }

    if (username === owner.username && password === owner.password) {
      sessionStorage.setItem("snookerLoggedIn", "yes");
      setLoggedIn(true);
    } else {
      notify("Username ya password ghalat hai.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("snookerLoggedIn");
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const updateTable = (id, changes) => {
    setTables(old => old.map(t => t.id === id ? { ...t, ...changes } : t));
  };

  const secondsFor = table =>
    table.elapsed + (table.active ? Math.floor((now - table.startedAt) / 1000) : 0);

  const timeFor = table => {
    const seconds = secondsFor(table);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
  };

  const rawBill = table => table.game === "numbri"
    ? Math.ceil(secondsFor(table) / 60) * Number(prices.numbri)
    : Number(prices[table.game]);

  const billFor = table => Math.max(0, rawBill(table) - Number(table.discount || 0));

  const startTable = id => {
    const table = tables.find(t => t.id === id);
    if (!table || table.active) return;
    updateTable(id, { active: true, startedAt: Date.now() });
  };

  const stopTable = id => {
    const table = tables.find(t => t.id === id);
    if (!table || !table.active) return;

    const seconds = secondsFor(table);
    const raw = table.game === "numbri"
      ? Math.ceil(seconds / 60) * Number(prices.numbri)
      : Number(prices[table.game]);

    const amount = Math.max(0, raw - Number(table.discount || 0));

    setHistory(old => [{
      id: Date.now(),
      table: id,
      customer: table.customer || "Walk-in Customer",
      game: table.game,
      seconds,
      amount,
      discount: Number(table.discount || 0),
      date: new Date().toISOString()
    }, ...old]);

    updateTable(id, {
      active: false,
      startedAt: null,
      elapsed: 0,
      discount: 0,
      customer: ""
    });

    notify(`Table ${id} stopped. Bill: ${money(amount)}`);
  };

  const transferTable = (fromId, toId) => {
    const from = tables.find(t => t.id === fromId);
    const to = tables.find(t => t.id === Number(toId));

    if (!toId || !from?.active || !to || to.active) {
      notify("Doosra table free hona chahiye.");
      return;
    }

    setTables(old => old.map(t => {
      if (t.id === fromId) {
        return { ...t, active: false, startedAt: null, elapsed: 0, customer: "", discount: 0 };
      }
      if (t.id === Number(toId)) {
        return { ...from, id: t.id };
      }
      return t;
    }));

    notify(`Game Table ${fromId} se Table ${toId} par transfer ho gaya.`);
  };

  const today = dayKey(new Date());
  const todayHistory = history.filter(h => dayKey(h.date) === today);
  const todayIncome = todayHistory.reduce((s, h) => s + Number(h.amount), 0);
  const todayExpense = expenses.filter(e => e.date === today).reduce((s, e) => s + Number(e.amount), 0);
  const totalUdhaar = udhaar.reduce((s, u) => s + u.given - u.returned, 0);

  const addExpense = e => {
    e.preventDefault();
    if (!expenseName.trim() || Number(expenseAmount) <= 0) return;

    setExpenses(old => [{
      id: Date.now(),
      name: expenseName.trim(),
      amount: Number(expenseAmount),
      date: today
    }, ...old]);

    setExpenseName("");
    setExpenseAmount("");
    notify("Expense add ho gaya.");
  };

  const addUdhaar = e => {
    e.preventDefault();
    if (!customerName.trim() || Number(udhaarAmount) <= 0) return;

    setUdhaar(old => [...old, {
      id: Date.now(),
      name: customerName.trim(),
      given: Number(udhaarAmount),
      returned: 0,
      entries: [{
        type: "given",
        amount: Number(udhaarAmount),
        date: new Date().toISOString()
      }]
    }]);

    setCustomerName("");
    setUdhaarAmount("");
    notify("Udhaar record add ho gaya.");
  };

  const repayUdhaar = id => {
    const amount = Number(returnAmounts[id]);
    const customer = udhaar.find(u => u.id === id);
    if (!customer || amount <= 0) return;

    const balance = customer.given - customer.returned;
    if (amount > balance) {
      notify("Amount baqi udhaar se zyada nahi ho sakti.");
      return;
    }

    setUdhaar(old => old.map(u => u.id === id ? {
      ...u,
      returned: u.returned + amount,
      entries: [...(u.entries || []), {
        type: "returned",
        amount,
        date: new Date().toISOString()
      }]
    } : u));

    setReturnAmounts(old => ({ ...old, [id]: "" }));
    notify("Payment receive record ho gayi.");
  };

  const exportBackup = () => {
    const backup = { tables, prices, history, expenses, udhaar, payments };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snooker-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.tables) setTables(data.tables);
        if (data.prices) setPrices(data.prices);
        if (data.history) setHistory(data.history);
        if (data.expenses) setExpenses(data.expenses);
        if (data.udhaar) setUdhaar(data.udhaar);
        if (data.payments) setPayments(data.payments);
        notify("Backup restore ho gaya.");
      } catch {
        notify("Backup file sahi JSON format mein nahi hai.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const lastSevenDays = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = dayKey(d);
    return {
      label: d.toLocaleDateString("en", { weekday: "short" }),
      amount: history.filter(h => dayKey(h.date) === key)
        .reduce((s, h) => s + Number(h.amount), 0)
    };
  }), [history]);

  const maxGraph = Math.max(1, ...lastSevenDays.map(d => d.amount));

  /* LOGIN SCREEN */
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">♛</div>
          <h1>JASS SNOOKER CLUB</h1>
          <p>{owner ? "Welcome Back, Owner" : "Create Your Owner Account"}</p>

          <form onSubmit={login}>
            <input
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={owner ? "current-password" : "new-password"}
              required
            />

            <button type="submit" className="primary-btn">
              {owner ? "LOGIN TO DASHBOARD" : "CREATE OWNER ACCOUNT"}
            </button>
          </form>

          <small>♛ OWNER ACCESS ONLY · JASS SNOOKER CLUB</small>
        </div>

        {message && <div className="toast">{message}</div>}
      </div>
    );
  }

  /* MAIN DASHBOARD */
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>♛ JASS SNOOKER CLUB</h1>
          <span>Snooker Management System</span>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <nav className="nav-menu">
        {[
          ["dashboard", "Dashboard"],
          ["report", "Income Report"],
          ["expenses", "Expenses"],
          ["udhaar", "Udhaar Ledger"],
          ["calendar", "Calendar / History"],
          ["prices", "Price Settings"],
          ["backup", "Backup & Restore"],
          ["payments", "JazzCash Tracker"]
        ].map(([id, label]) => (
          <button
            key={id}
            className={page === id ? "nav-active" : ""}
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="main-content">

        {page === "dashboard" && <>
          <section className="stats-grid">
            <div className="stat-card">
              <span>Today's Income</span>
              <strong>{money(todayIncome)}</strong>
            </div>
            <div className="stat-card">
              <span>Today's Expenses</span>
              <strong>{money(todayExpense)}</strong>
            </div>
            <div className="stat-card">
              <span>Net Income</span>
              <strong>{money(todayIncome - todayExpense)}</strong>
            </div>
            <div className="stat-card">
              <span>Total Udhaar Balance</span>
              <strong>{money(totalUdhaar)}</strong>
            </div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Snooker Tables</h2>
              <p>5 tables · Live game management</p>
            </div>
            <span className="live-tag">● LIVE</span>
          </div>

          <section className="tables-grid">
            {tables.map(table => (
              <article
                className={`table-card ${table.active ? "table-active" : ""}`}
                key={table.id}
              >
                <div className="table-card-head">
                  <h3>TABLE {table.id}</h3>
                  <span className={table.active ? "status-active" : "status-inactive"}>
                    {table.active ? "ACTIVE" : "UNACTIVE"}
                  </span>
                </div>

                <div className="mini-table">
                  <div className="mini-ball red-ball" />
                  <div className="mini-ball yellow-ball" />
                  <div className="mini-ball blue-ball" />
                  <div className="mini-ball pink-ball" />
                </div>

                <label>Customer Name</label>
                <input
                  placeholder="Customer name"
                  value={table.customer}
                  disabled={table.active}
                  onChange={e => updateTable(table.id, { customer: e.target.value })}
                />

                <label>Game / Price</label>
                <select
                  value={table.game}
                  disabled={table.active}
                  onChange={e => updateTable(table.id, { game: e.target.value })}
                >
                  <option value="single6">Single Frame · 6 Red · {money(prices.single6)}</option>
                  <option value="single10">Single Frame · 10 Red · {money(prices.single10)}</option>
                  <option value="double6">Double Frame · 6 Red · {money(prices.double6)}</option>
                  <option value="double10">Double Frame · 10 Red · {money(prices.double10)}</option>
                  <option value="numbri">Numbri · {money(prices.numbri)} / minute</option>
                </select>

                <label>Discount (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={table.discount}
                  disabled={table.active}
                  onChange={e => updateTable(table.id, { discount: Number(e.target.value) })}
                />

                <div className="timer-box">
                  <span>GAME TIME</span>
                  <strong>{timeFor(table)}</strong>
                </div>

                <div className="bill-line">
                  <span>Estimated Bill</span>
                  <b>{money(billFor(table))}</b>
                </div>

                {!table.active ? (
                  <button className="start-btn" onClick={() => startTable(table.id)}>
                    ▶ START GAME
                  </button>
                ) : (
                  <button className="stop-btn" onClick={() => stopTable(table.id)}>
                    ■ STOP & BILL
                  </button>
                )}

                {table.active && (
                  <div className="transfer-row">
                    <select id={`transfer-${table.id}`} defaultValue="">
                      <option value="">Transfer to table...</option>
                      {tables.filter(t => !t.active && t.id !== table.id).map(t => (
                        <option key={t.id} value={t.id}>Table {t.id}</option>
                      ))}
                    </select>
                    <button onClick={() => transferTable(
                      table.id,
                      document.getElementById(`transfer-${table.id}`).value
                    )}>
                      Transfer
                    </button>
                  </div>
                )}
              </article>
            ))}
          </section>
        </>}

        {page === "report" && <>
          <h2>Daily Income Report</h2>
          <div className="stat-card report-total">
            <span>Today's Total Income</span>
            <strong>{money(todayIncome)}</strong>
          </div>

          <h3>Last 7 Days Income</h3>
          <div className="graph-card">
            {lastSevenDays.map((d, i) => (
              <div className="graph-column" key={i}>
                <strong>{money(d.amount)}</strong>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: `${(d.amount / maxGraph) * 100}%` }}
                  />
                </div>
                <span>{d.label}</span>
              </div>
            ))}
          </div>

          <h3>Completed Games Today</h3>
          <div className="data-list">
            {todayHistory.map(h => (
              <div className="data-row" key={h.id}>
                <span>Table {h.table} · {h.customer} · {h.game}</span>
                <b>{money(h.amount)}</b>
              </div>
            ))}
            {!todayHistory.length && <p>No games recorded today.</p>}
          </div>
        </>}

        {page === "expenses" && <>
          <h2>Expense Manager</h2>
          <form className="inline-form" onSubmit={addExpense}>
            <input
              placeholder="Expense detail"
              value={expenseName}
              onChange={e => setExpenseName(e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Amount Rs."
              value={expenseAmount}
              onChange={e => setExpenseAmount(e.target.value)}
              required
            />
            <button className="primary-btn">Add Expense</button>
          </form>

          <div className="stat-card">
            <span>Today's Expenses</span>
            <strong>{money(todayExpense)}</strong>
          </div>

          <div className="data-list">
            {expenses.map(e => (
              <div className="data-row" key={e.id}>
                <span>{e.name} · {e.date}</span>
                <b>{money(e.amount)}</b>
              </div>
            ))}
            {!expenses.length && <p>No expenses added.</p>}
          </div>
        </>}

        {page === "udhaar" && <>
          <h2>Customer Udhaar Ledger</h2>
          <p>Customer ka naam, diya gaya paisa, wapas mila paisa aur baqi balance.</p>

          <form className="inline-form" onSubmit={addUdhaar}>
            <input
              placeholder="Customer name"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Udhaar diya (Rs.)"
              value={udhaarAmount}
              onChange={e => setUdhaarAmount(e.target.value)}
              required
            />
            <button className="primary-btn">Add Udhaar</button>
          </form>

          <div className="stat-card">
            <span>Total Remaining Udhaar</span>
            <strong>{money(totalUdhaar)}</strong>
          </div>

          <div className="udhaar-grid">
            {udhaar.map(u => (
              <div className="udhaar-card" key={u.id}>
                <h3>{u.name}</h3>
                <p>Diya gaya: <b>{money(u.given)}</b></p>
                <p>Wapas mila: <b>{money(u.returned)}</b></p>
                <p className="balance-text">
                  Baqi balance: {money(u.given - u.returned)}
                </p>

                {u.given - u.returned > 0 && (
                  <div className="repay-row">
                    <input
                      type="number"
                      min="1"
                      placeholder="Wapas amount"
                      value={returnAmounts[u.id] || ""}
                      onChange={e => setReturnAmounts(old => ({
                        ...old,
                        [u.id]: e.target.value
                      }))}
                    />
                    <button type="button" onClick={() => repayUdhaar(u.id)}>
                      Receive
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!udhaar.length && <p>Abhi koi udhaar record nahi hai.</p>}
          </div>
        </>}

        {page === "calendar" && <>
          <h2>Calendar & Game History</h2>
          <div className="inline-form">
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="data-list">
            {history.filter(h => dayKey(h.date) === selectedDate).map(h => (
              <div className="data-row" key={h.id}>
                <span>
                  Table {h.table} · {h.customer} · {new Date(h.date).toLocaleTimeString()}
                </span>
                <b>{money(h.amount)}</b>
              </div>
            ))}
            {!history.some(h => dayKey(h.date) === selectedDate) &&
              <p>Is date ka koi game record nahi mila.</p>}
          </div>
        </>}

        {page === "prices" && <>
          <h2>Price Management</h2>
          <div className="price-settings">
            {[
              ["single6", "Single Frame · 6 Red"],
              ["single10", "Single Frame · 10 Red"],
              ["double6", "Double Frame · 6 Red"],
              ["double10", "Double Frame · 10 Red"],
              ["numbri", "Numbri · Per Minute"]
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  type="number"
                  min="0"
                  value={prices[key]}
                  onChange={e => setPrices(old => ({
                    ...old,
                    [key]: Number(e.target.value)
                  }))}
                />
              </label>
            ))}
          </div>
          <p className="hint">Updated prices naye games par apply hongi.</p>
        </>}

        {page === "backup" && <>
          <h2>Backup & Restore</h2>
          <p>Tables, prices, history, expenses, udhaar aur payments ka backup save karein.</p>
          <button className="primary-btn backup-btn" onClick={exportBackup}>
            Download Backup JSON
          </button>

          <div className="restore-box">
            <h3>Restore Backup</h3>
            <p>Apni pehle save ki hui JSON backup file select karein.</p>
            <input type="file" accept=".json,application/json" onChange={importBackup} />
          </div>
        </>}

        {page === "payments" && <>
          <h2>JazzCash Payment Tracker</h2>

          <div className="jazz-card">
            <h3>JazzCash Account</h3>
            <p>Account Holder: Muzamil Rasheed</p>
            <p>Number: 03051394181</p>
            <p className="hint">
              Payment receive hone ke baad hi Paid mark karein.
              App payment automatically verify nahi karti.
            </p>
          </div>

          <form className="inline-form" onSubmit={e => {
            e.preventDefault();
            if (Number(paymentAmount) <= 0) return;
            setPayments(old => [{
              id: Date.now(),
              amount: Number(paymentAmount),
              paid: false,
              date: today
            }, ...old]);
            setPaymentAmount("");
          }}>
            <input
              type="number"
              min="1"
              placeholder="Payment amount Rs."
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              required
            />
            <button className="primary-btn">Add Payment</button>
          </form>

          <div className="data-list">
            {payments.map(p => (
              <div className="data-row" key={p.id}>
                <span>
                  {money(p.amount)} · {p.date} · {p.paid ? "Paid" : "Pending"}
                </span>
                <button onClick={() => setPayments(old => old.map(x =>
                  x.id === p.id ? { ...x, paid: !x.paid } : x
                ))}>
                  {p.paid ? "Mark Pending" : "Mark Paid"}
                </button>
              </div>
            ))}
            {!payments.length && <p>No payment entries.</p>}
          </div>
        </>}
      </main>

      {message && <div className="toast">{message}</div>}

      <footer>JASS SNOOKER CLUB · Management Dashboard</footer>
    </div>
  );
}
