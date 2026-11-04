import React, { useEffect, useState } from "react";

const DEFAULT_TABLES = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  status: "UNACTIVE",
  game: "6 Red",
  rate: 100,
  discount: 0,
  startedAt: null,
}));

const readData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString()}`;

function Snooker() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("snookerLoggedIn") === "true"
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tables, setTables] = useState(() =>
    readData("snookerTables", DEFAULT_TABLES)
  );
  const [bookings, setBookings] = useState(() =>
    readData("snookerBookings", [])
  );
  const [expenses, setExpenses] = useState(() =>
    readData("snookerExpenses", [])
  );
  const [ledger, setLedger] = useState(() =>
    readData("snookerLedger", [])
  );
  const [history, setHistory] = useState(() =>
    readData("snookerHistory", [])
  );

  const [now, setNow] = useState(Date.now());
  const [notice, setNotice] = useState("");

  const [bookingForm, setBookingForm] = useState({
    customer: "",
    table: "1",
    date: "",
    time: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
  });

  const [ledgerForm, setLedgerForm] = useState({
    name: "",
    given: "",
    returned: "",
  });

  const [numbriRunning, setNumbriRunning] = useState(false);
  const [numbriStarted, setNumbriStarted] = useState(null);
  const [numbriElapsed, setNumbriElapsed] = useState(0);

  const [transferFrom, setTransferFrom] = useState("1");
  const [transferTo, setTransferTo] = useState("2");

  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("snookerTables", JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem("snookerBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("snookerExpenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("snookerLedger", JSON.stringify(ledger));
  }, [ledger]);

  useEffect(() => {
    localStorage.setItem("snookerHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timeout);
  }, [notice]);

  const login = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      localStorage.setItem("snookerLoggedIn", "true");
      setLoggedIn(true);
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Username ya password ghalat hai!");
    }
  };

  const logout = () => {
    localStorage.removeItem("snookerLoggedIn");
    setLoggedIn(false);
    setActiveSection("dashboard");
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  };

  const getElapsed = (startedAt) => {
    if (!startedAt) return 0;
    return Math.max(0, Math.floor((now - startedAt) / 1000));
  };

  const addHistory = (item) => {
    setHistory((old) => [
      {
        id: Date.now() + Math.random(),
        date: new Date().toISOString(),
        ...item,
      },
      ...old,
    ]);
  };

  const startTable = (id, game, rate) => {
    setTables((old) =>
      old.map((table) =>
        table.id === id
          ? {
              ...table,
              status: "ACTIVE",
              game,
              rate,
              startedAt: Date.now(),
            }
          : table
      )
    );

    setNotice(`Table ${id} start ho gaya!`);
  };

  const stopTable = (id) => {
    const table = tables.find((t) => t.id === id);
    if (!table || table.status !== "ACTIVE") return;

    const elapsed = getElapsed(table.startedAt);
    const discount = Number(table.discount || 0);
    const total = Math.max(0, Number(table.rate) - discount);

    addHistory({
      type: "Table Game",
      title: `${table.name} - ${table.game}`,
      amount: total,
      duration: formatTime(elapsed),
    });

    setTables((old) =>
      old.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "UNACTIVE",
              startedAt: null,
              discount: 0,
            }
          : t
      )
    );

    setNotice(`${table.name} band ho gaya. Income ${money(total)}`);
  };

  const updateDiscount = (id, value) => {
    setTables((old) =>
      old.map((t) =>
        t.id === id ? { ...t, discount: Math.max(0, Number(value)) } : t
      )
    );
  };

  const addBooking = (e) => {
    e.preventDefault();

    if (
      !bookingForm.customer.trim() ||
      !bookingForm.date ||
      !bookingForm.time
    ) {
      setNotice("Booking ki tamam details fill karo.");
      return;
    }

    const conflict = bookings.some(
      (b) =>
        b.table === bookingForm.table &&
        b.date === bookingForm.date &&
        b.time === bookingForm.time &&
        b.status !== "Rejected"
    );

    if (conflict) {
      setNotice("Is table ki ye date aur time pehle se booked hai!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...bookingForm,
      status: "Pending",
    };

    setBookings((old) => [newBooking, ...old]);

    setBookingForm({
      customer: "",
      table: "1",
      date: "",
      time: "",
    });

    setNotice("New booking request receive ho gayi!");
  };

  const updateBooking = (id, status) => {
    setBookings((old) =>
      old.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setNotice(`Booking ${status} kar di gayi.`);
  };

  const addExpense = (e) => {
    e.preventDefault();

    const amount = Number(expenseForm.amount);

    if (!expenseForm.title.trim() || amount <= 0) {
      setNotice("Expense ki sahi details enter karo.");
      return;
    }

    setExpenses((old) => [
      {
        id: Date.now(),
        title: expenseForm.title,
        amount,
        date: new Date().toISOString(),
      },
      ...old,
    ]);

    setExpenseForm({ title: "", amount: "" });
    setNotice("Expense save ho gaya!");
  };

  const addLedger = (e) => {
    e.preventDefault();

    const name = ledgerForm.name.trim();
    const given = Number(ledgerForm.given || 0);
    const returned = Number(ledgerForm.returned || 0);

    if (!name || given < 0 || returned < 0) {
      setNotice("Customer ki details sahi enter karo.");
      return;
    }

    setLedger((old) => [
      {
        id: Date.now(),
        name,
        given,
        returned,
        date: new Date().toISOString(),
      },
      ...old,
    ]);

    setLedgerForm({ name: "", given: "", returned: "" });
    setNotice("Customer ledger save ho gaya!");
  };

  const updateReturned = (id, value) => {
    setLedger((old) =>
      old.map((item) =>
        item.id === id
          ? { ...item, returned: Number(value) }
          : item
      )
    );
  };

  const transferTable = () => {
    const from = Number(transferFrom);
    const to = Number(transferTo);

    if (from === to) {
      setNotice("Dono tables alag select karo.");
      return;
    }

    const source = tables.find((t) => t.id === from);
    const destination = tables.find((t) => t.id === to);

    if (!source || !destination) return;

    if (source.status !== "ACTIVE") {
      setNotice("Source table active nahi hai.");
      return;
    }

    if (destination.status === "ACTIVE") {
      setNotice("Destination table pehle se active hai.");
      return;
    }

    setTables((old) =>
      old.map((t) => {
        if (t.id === from) {
          return {
            ...t,
            status: "UNACTIVE",
            startedAt: null,
            discount: 0,
          };
        }

        if (t.id === to) {
          return {
            ...t,
            status: "ACTIVE",
            game: source.game,
            rate: source.rate,
            discount: source.discount,
            startedAt: source.startedAt,
          };
        }

        return t;
      })
    );

    setNotice(`Game Table ${from} se Table ${to} par transfer ho gaya.`);
  };

  const startNumbri = () => {
    if (numbriRunning) return;
    setNumbriStarted(Date.now());
    setNumbriRunning(true);
    setNotice("Numbri game start ho gayi!");
  };

  const stopNumbri = () => {
    if (!numbriRunning || !numbriStarted) return;

    const elapsed = Math.floor((Date.now() - numbriStarted) / 1000);
    const minutes = Math.ceil(elapsed / 60);
    const amount = minutes * 12;

    addHistory({
      type: "Numbri Game",
      title: "Numbri Game",
      amount,
      duration: formatTime(elapsed),
    });

    setNumbriElapsed(0);
    setNumbriStarted(null);
    setNumbriRunning(false);
    setNotice(`Numbri band. Total ${minutes} minute = ${money(amount)}`);
  };

  useEffect(() => {
    if (!numbriRunning || !numbriStarted) return;

    const interval = setInterval(() => {
      setNumbriElapsed(Math.floor((Date.now() - numbriStarted) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [numbriRunning, numbriStarted]);

  const today = new Date().toLocaleDateString();

  const todayIncome = history
    .filter((item) => new Date(item.date).toLocaleDateString() === today)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const todayExpenses = expenses
    .filter((item) => new Date(item.date).toLocaleDateString() === today)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalIncome = history.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const totalBalance = ledger.reduce(
    (sum, item) =>
      sum + Math.max(0, Number(item.given) - Number(item.returned)),
    0
  );

  const downloadBackup = () => {
    const backup = {
      tables,
      bookings,
      expenses,
      ledger,
      history,
      backupDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snooker-backup.json";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Backup download ho gaya!");
  };

  const restoreBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const backup = JSON.parse(event.target.result);

        if (
          !Array.isArray(backup.tables) ||
          !Array.isArray(backup.bookings) ||
          !Array.isArray(backup.history)
        ) {
          throw new Error("Invalid backup");
        }

        setTables(backup.tables);
        setBookings(backup.bookings);
        setExpenses(Array.isArray(backup.expenses) ? backup.expenses : []);
        setLedger(Array.isArray(backup.ledger) ? backup.ledger : []);
        setHistory(backup.history);
        setNotice("Backup successfully restore ho gaya!");
      } catch {
        setNotice("Backup file sahi nahi hai.");
      }
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  if (!loggedIn) {
    return (
      <div className="snooker-login-page">
        <div className="login-overlay"></div>

        <form className="snooker-login-box" onSubmit={login}>
          <div className="login-logo">🎱</div>
          <p className="login-small">OWNER ACCESS</p>
          <h1>SNooker <span>CLUB</span></h1>
          <p className="login-description">
            Welcome back! Login to manage your club.
          </p>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginError && <p className="login-error">{loginError}</p>}

          <button className="login-button" type="submit">
            LOGIN TO DASHBOARD
          </button>

          <p className="login-footer">OWNER PANEL • SNOOKER MANAGEMENT</p>
        </form>
      </div>
    );
  }

  return (
    <div className="snooker-app">
      <aside className="sidebar">
        <div className="brand">
          <span>🎱</span>
          <div>
            <h2>SNOOKER</h2>
            <small>CLUB MANAGER</small>
          </div>
        </div>

        <nav>
          {[
            ["dashboard", "▦", "Dashboard"],
            ["bookings", "▣", "Bookings"],
            ["numbri", "◷", "Numbri Game"],
            ["income", "▤", "Income Report"],
            ["expenses", "−", "Expenses"],
            ["ledger", "◉", "Udhaar Ledger"],
            ["transfer", "⇄", "Table Transfer"],
            ["backup", "↓", "Backup & Restore"],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={activeSection === id ? "nav-active" : ""}
              onClick={() => setActiveSection(id)}
            >
              <span>{icon}</span> {label}
              {id === "bookings" && pendingBookings > 0 && (
                <b className="nav-count">{pendingBookings}</b>
              )}
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={logout}>
          ⇥ Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p>WELCOME TO YOUR CLUB</p>
            <h1>
              {activeSection === "dashboard"
                ? "Dashboard"
                : activeSection === "bookings"
                ? "Booking Management"
                : activeSection === "numbri"
                ? "Numbri Game"
                : activeSection === "income"
                ? "Income Report"
                : activeSection === "expenses"
                ? "Expense Manager"
                : activeSection === "ledger"
                ? "Udhaar Ledger"
                : activeSection === "transfer"
                ? "Table Transfer"
                : "Backup & Restore"}
            </h1>
          </div>

          <div className="topbar-right">
            <span className="live-dot"></span>
            <span>Owner Panel</span>
            <button className="top-logout" onClick={logout}>Logout</button>
          </div>
        </header>

        {notice && <div className="toast-message">{notice}</div>}

        {activeSection === "dashboard" && (
          <>
            <section className="stats-grid">
              <div className="stat-card">
                <span>Today's Income</span>
                <h2>{money(todayIncome)}</h2>
                <small>Today's collection</small>
              </div>
              <div className="stat-card">
                <span>Today's Expenses</span>
                <h2>{money(todayExpenses)}</h2>
                <small>Today's spending</small>
              </div>
              <div className="stat-card">
                <span>Net Income Today</span>
                <h2>{money(todayIncome - todayExpenses)}</h2>
                <small>Income minus expenses</small>
              </div>
              <div className="stat-card">
                <span>Pending Bookings</span>
                <h2>{pendingBookings}</h2>
                <small>Requests to review</small>
              </div>
            </section>

            <section className="section-heading">
              <div>
                <h2>Snooker Tables</h2>
                <p>Manage your five tables</p>
              </div>
              <span className="table-total">5 TABLES</span>
            </section>

            <section className="tables-grid">
              {tables.map((table) => (
                <div className="table-card" key={table.id}>
                  <div className="table-card-top">
                    <div>
                      <span className="table-number">TABLE {table.id}</span>
                      <h3>{table.name}</h3>
                    </div>
                    <span
                      className={
                        table.status === "ACTIVE"
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {table.status}
                    </span>
                  </div>

                  <div className="table-visual">
                    <div className="pool-table">
                      <span className="ball ball-white"></span>
                      <span className="ball ball-red"></span>
                      <span className="ball ball-yellow"></span>
                      <span className="ball ball-blue"></span>
                      <span className="ball ball-pink"></span>
                    </div>
                  </div>

                  <div className="game-options">
                    <button
                      className={table.game === "6 Red" ? "selected-game" : ""}
                      disabled={table.status === "ACTIVE"}
                      onClick={() => startTable(table.id, "6 Red", 100)}
                    >
                      6 Red <b>Rs.100</b>
                    </button>

                    <button
                      className={table.game === "10 Red" ? "selected-game" : ""}
                      disabled={table.status === "ACTIVE"}
                      onClick={() => startTable(table.id, "10 Red", 150)}
                    >
                      10 Red <b>Rs.150</b>
                    </button>
                  </div>

                  <div className="table-timer">
                    <small>PLAYING TIME</small>
                    <strong>
                      {table.status === "ACTIVE"
                        ? formatTime(getElapsed(table.startedAt))
                        : "00:00:00"}
                    </strong>
                  </div>

                  <div className="discount-row">
                    <label>Discount (Rs.)</label>
                    <input
                      type="number"
                      min="0"
                      value={table.discount}
                      disabled={table.status !== "ACTIVE"}
                      onChange={(e) =>
                        updateDiscount(table.id, e.target.value)
                      }
                    />
                  </div>

                  <div className="table-price">
                    <span>Final Amount</span>
                    <strong>
                      {money(
                        table.status === "ACTIVE"
                          ? Math.max(0, table.rate - table.discount)
                          : 0
                      )}
                    </strong>
                  </div>

                  {table.status === "ACTIVE" ? (
                    <button
                      className="stop-button"
                      onClick={() => stopTable(table.id)}
                    >
                      STOP TABLE
                    </button>
                  ) : (
                    <p className="table-hint">Select a game to start</p>
                  )}
                </div>
              ))}
            </section>

            <section className="section-heading">
              <div>
                <h2>Recent Bookings</h2>
                <p>Latest customer requests</p>
              </div>
              <button
                className="view-button"
                onClick={() => setActiveSection("bookings")}
              >
                View All
              </button>
            </section>

            <div className="content-panel">
              {bookings.length === 0 ? (
                <p className="empty-message">Abhi koi booking nahi hai.</p>
              ) : (
                bookings.slice(0, 5).map((b) => (
                  <div className="booking-row" key={b.id}>
                    <div>
                      <strong>{b.customer}</strong>
                      <small>
                        Table {b.table} • {b.date} • {b.time}
                      </small>
                    </div>
                    <span className={`booking-status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeSection === "bookings" && (
          <>
            <section className="content-panel">
              <h2>New Table Booking</h2>
              <p>Customer ki booking request enter karo.</p>

              <form className="data-form" onSubmit={addBooking}>
                <label>Customer Name</label>
                <input
                  value={bookingForm.customer}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, customer: e.target.value })
                  }
                  placeholder="Customer name"
                  required
                />

                <label>Select Table</label>
                <select
                  value={bookingForm.table}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, table: e.target.value })
                  }
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      Table {t.id}
                    </option>
                  ))}
                </select>

                <label>Booking Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, date: e.target.value })
                  }
                  required
                />

                <label>Booking Time</label>
                <input
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, time: e.target.value })
                  }
                  required
                />

                <button className="primary-button" type="submit">
                  ADD BOOKING REQUEST
                </button>
              </form>
            </section>

            <section className="content-panel">
              <h2>All Booking Requests</h2>

              {bookings.length === 0 && (
                <p className="empty-message">No booking requests found.</p>
              )}

              {bookings.map((b) => (
                <div className="booking-row" key={b.id}>
                  <div>
                    <strong>{b.customer}</strong>
                    <small>
                      Table {b.table} • {b.date} • {b.time}
                    </small>
                  </div>

                  <div className="booking-actions">
                    <span className={`booking-status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>

                    {b.status === "Pending" && (
                      <>
                        <button
                          className="accept-button"
                          onClick={() => updateBooking(b.id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => updateBooking(b.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {activeSection === "numbri" && (
          <section className="content-panel numbri-panel">
            <div className="numbri-icon">🎱</div>
            <h2>Numbri Game Timer</h2>
            <p>Rate: Rs.12 per minute</p>
            <div className="numbri-clock">
              {formatTime(numbriElapsed)}
            </div>
            <h3>
              Total: {money(Math.ceil(numbriElapsed / 60) * 12)}
            </h3>

            {!numbriRunning ? (
              <button className="primary-button" onClick={startNumbri}>
                START NUMBRI
              </button>
            ) : (
              <button className="stop-button" onClick={stopNumbri}>
                STOP NUMBRI
              </button>
            )}
          </section>
        )}

        {activeSection === "income" && (
          <>
            <section className="stats-grid">
              <div className="stat-card">
                <span>Total Income</span>
                <h2>{money(totalIncome)}</h2>
              </div>
              <div className="stat-card">
                <span>Total Expenses</span>
                <h2>{money(totalExpenses)}</h2>
              </div>
              <div className="stat-card">
                <span>Net Balance</span>
                <h2>{money(totalIncome - totalExpenses)}</h2>
              </div>
            </section>

            <section className="content-panel">
              <h2>Income History</h2>

              {history.length === 0 && (
                <p className="empty-message">Abhi income history nahi hai.</p>
              )}

              {history.map((item) => (
                <div className="booking-row" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {new Date(item.date).toLocaleString()} • {item.duration}
                    </small>
                  </div>
                  <strong className="income-amount">{money(item.amount)}</strong>
                </div>
              ))}
            </section>
          </>
        )}

        {activeSection === "expenses" && (
          <>
            <section className="content-panel">
              <h2>Add New Expense</h2>
              <form className="data-form" onSubmit={addExpense}>
                <label>Expense Details</label>
                <input
                  placeholder="e.g. Electricity bill"
                  value={expenseForm.title}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, title: e.target.value })
                  }
                  required
                />

                <label>Amount (Rs.)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e.target.value })
                  }
                  required
                />

                <button className="primary-button" type="submit">
                  SAVE EXPENSE
                </button>
              </form>
            </section>

            <section className="content-panel">
              <h2>Expense History</h2>
              <h3>Total: {money(totalExpenses)}</h3>

              {expenses.map((item) => (
                <div className="booking-row" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{new Date(item.date).toLocaleString()}</small>
                  </div>
                  <strong className="expense-amount">
                    {money(item.amount)}
                  </strong>
                </div>
              ))}
            </section>
          </>
        )}

        {activeSection === "ledger" && (
          <>
            <section className="content-panel">
              <h2>Add Customer Udhaar</h2>
              <form className="data-form" onSubmit={addLedger}>
                <label>Customer Name</label>
                <input
                  placeholder="Customer name"
                  value={ledgerForm.name}
                  onChange={(e) =>
                    setLedgerForm({ ...ledgerForm, name: e.target.value })
                  }
                  required
                />

                <label>Kitna Paisa Diya (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={ledgerForm.given}
                  onChange={(e) =>
                    setLedgerForm({ ...ledgerForm, given: e.target.value })
                  }
                  required
                />

                <label>Kitna Wapas Mila (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={ledgerForm.returned}
                  onChange={(e) =>
                    setLedgerForm({ ...ledgerForm, returned: e.target.value })
                  }
                />

                <button className="primary-button" type="submit">
                  SAVE CUSTOMER
                </button>
              </form>
            </section>

            <section className="content-panel">
              <h2>Customer Balance</h2>
              <h3>Total Remaining: {money(totalBalance)}</h3>

              {ledger.map((item) => {
                const balance = Math.max(
                  0,
                  Number(item.given) - Number(item.returned)
                );

                return (
                  <div className="ledger-card" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>Diya: {money(item.given)}</p>
                      <p>Wapas Mila: {money(item.returned)}</p>
                      <strong>Remaining: {money(balance)}</strong>
                    </div>

                    <div className="ledger-return">
                      <label>Update returned amount</label>
                      <input
                        type="number"
                        min="0"
                        max={item.given}
                        value={item.returned}
                        onChange={(e) =>
                          updateReturned(item.id, e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}

        {activeSection === "transfer" && (
          <section className="content-panel">
            <h2>Transfer Active Game</h2>
            <p>Ek table ka active game doosri khaali table par shift karo.</p>

            <div className="data-form">
              <label>From Table</label>
              <select
                value={transferFrom}
                onChange={(e) => setTransferFrom(e.target.value)}
              >
                {tables.map((t) => (
                  <option value={t.id} key={t.id}>
                    Table {t.id} — {t.status}
                  </option>
                ))}
              </select>

              <label>To Table</label>
              <select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              >
                {tables.map((t) => (
                  <option value={t.id} key={t.id}>
                    Table {t.id} — {t.status}
                  </option>
                ))}
              </select>

              <button className="primary-button" onClick={transferTable}>
                TRANSFER GAME
              </button>
            </div>
          </section>
        )}

        {activeSection === "backup" && (
          <section className="content-panel backup-panel">
            <div className="backup-icon">💾</div>
            <h2>Backup & Restore</h2>
            <p>
              Apne tables, bookings, expenses, ledger aur income history ka
              backup download karo.
            </p>

            <button className="primary-button" onClick={downloadBackup}>
              DOWNLOAD BACKUP
            </button>

            <div className="restore-area">
              <h3>Restore Backup</h3>
              <p>Apni pehle download ki hui JSON backup file select karo.</p>
              <input
                type="file"
                accept=".json,application/json"
                onChange={restoreBackup}
              />
            </div>
          </section>
        )}

        <footer className="dashboard-footer">
          SNOOKER CLUB MANAGEMENT SYSTEM • FRONTEND VERSION
        </footer>
      </main>
    </div>
  );
}

export default Snooker;