
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: #08130f;
  color: #f4f7f5;
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
}

/* =========================
   LOGIN PAGE
========================= */

.snooker-login-page {
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 50px 9%;
  position: relative;
  background:
    linear-gradient(90deg, rgba(3,13,9,.15), rgba(3,13,9,.25)),
    url('/snooker-login.png') center/cover no-repeat;
}

.login-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
}

.snooker-login-box {
  width: 100%;
  max-width: 390px;
  position: relative;
  z-index: 1;
  padding: 35px;
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 18px;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

.login-logo {
  font-size: 48px;
  text-align: center;
  margin-bottom: 8px;
}

.login-small {
  text-align: center;
  letter-spacing: 4px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.snooker-login-box h1 {
  text-align: center;
  font-size: 32px;
  margin: 9px 0;
  color: white;
}

.snooker-login-box h1 span {
  color: #62e58c;
}

.login-description {
  text-align: center;
  color: white;
  font-size: 13px;
  margin-bottom: 30px;
}

.snooker-login-box label,
.data-form label {
  display: block;
  margin: 15px 0 8px;
  font-size: 13px;
  color: white;
  font-weight: 600;
}

.snooker-login-box input {
  width: 100%;
  padding: 13px 14px;
  border-radius: 9px;
  border: 1px solid rgba(255,255,255,.65);
  background: rgba(0,0,0,.15);
  color: white;
  outline: none;
}

.snooker-login-box input::placeholder {
  color: rgba(255,255,255,.75);
}

.snooker-login-box input:focus {
  border-color: #62e58c;
  background: rgba(0,0,0,.25);
}

.login-button {
  width: 100%;
  margin-top: 25px;
  padding: 14px;
  background: #39b968;
  color: #06170d;
  border: 0;
  border-radius: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

.login-button:hover,
.primary-button:hover {
  background: #65e28d;
}

.login-error {
  color: #ff8585;
  font-size: 13px;
  margin-top: 12px;
}

.login-footer {
  text-align: center;
  color: white;
  font-size: 9px;
  letter-spacing: 2px;
  margin-top: 25px;
}

/* =========================
   DASHBOARD LAYOUT
========================= */

.snooker-app {
  min-height: 100vh;
  display: flex;
  background: #09140f;
}

.sidebar {
  width: 245px;
  min-width: 245px;
  background: #0d1d14;
  border-right: 1px solid #20372a;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 28px;
  border-bottom: 1px solid #294333;
}

.brand > span {
  font-size: 34px;
}

.brand h2 {
  font-size: 17px;
  letter-spacing: 2px;
}

.brand small {
  font-size: 9px;
  color: #71d693;
  letter-spacing: 2px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 28px;
}

.sidebar nav button {
  background: transparent;
  color: #a9b9ae;
  border: 0;
  border-radius: 9px;
  padding: 13px 12px;
  text-align: left;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: .2s;
}

.sidebar nav button:hover,
.sidebar nav button.nav-active {
  color: #70e094;
  background: #1a3525;
}

.sidebar nav button span {
  font-size: 19px;
  width: 20px;
}

.nav-count {
  margin-left: auto;
  background: #e34e4e;
  color: white;
  padding: 3px 7px;
  border-radius: 20px;
  font-size: 10px;
}

.logout-button {
  margin-top: auto;
  padding: 13px;
  border: 1px solid #653b3b;
  color: #ff9292;
  background: #281919;
  border-radius: 9px;
}

.main-content {
  min-width: 0;
  flex: 1;
  padding: 28px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 30px;
}

.topbar p {
  font-size: 10px;
  color: #7ecb94;
  letter-spacing: 2px;
  margin-bottom: 6px;
}

.topbar h1 {
  font-size: 27px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #b8c8bd;
  font-size: 12px;
}

.live-dot {
  width: 9px;
  height: 9px;
  background: #51d77e;
  border-radius: 50%;
  box-shadow: 0 0 12px #51d77e;
}

.top-logout {
  background: #1b3023;
  border: 1px solid #345440;
  border-radius: 7px;
  color: white;
  padding: 9px 12px;
  margin-left: 8px;
}

.toast-message {
  position: fixed;
  top: 20px;
  right: 25px;
  z-index: 10;
  padding: 14px 20px;
  border-radius: 9px;
  background: #23683c;
  color: white;
  box-shadow: 0 10px 30px #0006;
  font-size: 13px;
}

/* =========================
   DASHBOARD STATISTICS
========================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 21px;
  border: 1px solid #263d2e;
  background: #112219;
  border-radius: 13px;
}

.stat-card span {
  font-size: 12px;
  color: #a8b9ad;
}

.stat-card h2 {
  margin: 12px 0 7px;
  font-size: 25px;
  color: #6de091;
}

.stat-card small {
  color: #75877a;
  font-size: 11px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 17px;
}

.section-heading h2,
.content-panel h2 {
  font-size: 19px;
  margin-bottom: 6px;
}

.section-heading p,
.content-panel > p {
  font-size: 12px;
  color: #8fa195;
}

.table-total {
  color: #70dc91;
  border: 1px solid #31563d;
  background: #173021;
  border-radius: 20px;
  padding: 7px 13px;
  font-size: 10px;
  font-weight: 700;
}

/* =========================
   SNOOKER TABLE CARDS
========================= */

.tables-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;
}

.table-card {
  background: #112219;
  border: 1px solid #294333;
  border-radius: 14px;
  padding: 17px;
  min-width: 0;
}

.table-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-number {
  color: #6bd88e;
  font-size: 9px;
  letter-spacing: 2px;
  font-weight: 800;
}

.table-card h3 {
  margin-top: 5px;
  font-size: 17px;
}

.status {
  font-size: 9px;
  font-weight: 800;
  padding: 6px 9px;
  border-radius: 20px;
}

.status.active {
  color: #6de995;
  background: #1b4a2b;
}

.status.inactive {
  color: #b6c2b9;
  background: #28342c;
}

.table-visual {
  padding: 18px 0;
}

.pool-table {
  height: 105px;
  border: 9px solid #67452d;
  border-radius: 12px;
  background: #087044;
  box-shadow: inset 0 0 15px #003b25;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
}

.pool-table::before,
.pool-table::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #06170e;
  top: -6px;
}

.pool-table::before {
  left: -6px;
}

.pool-table::after {
  right: -6px;
}

.ball {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: inset -3px -3px 4px #0007, inset 2px 2px 3px #fff8;
}

.ball-white { background: white; }
.ball-red { background: #e22e32; }
.ball-yellow { background: #f6d62e; }
.ball-blue { background: #2876ed; }
.ball-pink { background: #f38eb6; }

.game-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.game-options button {
  padding: 10px 5px;
  border: 1px solid #365340;
  background: #1a3022;
  color: #d7e4da;
  border-radius: 8px;
  font-size: 11px;
}

.game-options button b {
  display: block;
  color: #70dc91;
  margin-top: 5px;
}

.game-options button.selected-game {
  border-color: #54cf7a;
}

.game-options button:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.table-timer {
  text-align: center;
  background: #09170f;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
}

.table-timer small {
  display: block;
  color: #8da294;
  font-size: 9px;
  letter-spacing: 2px;
}

.table-timer strong {
  display: block;
  font-size: 23px;
  margin-top: 6px;
  color: #75e498;
  font-variant-numeric: tabular-nums;
}

.discount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  font-size: 11px;
  color: #b9c8bd;
}

.discount-row input {
  width: 90px;
  padding: 7px;
  background: #0a180f;
  color: white;
  border: 1px solid #34523d;
  border-radius: 6px;
}

.table-price {
  border-top: 1px solid #2a4032;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.table-price strong {
  color: #6de091;
  font-size: 17px;
}

.stop-button {
  width: 100%;
  border: 0;
  background: #bd3939;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 800;
  margin-top: 14px;
}

.stop-button:hover {
  background: #e14d4d;
}

.table-hint {
  text-align: center;
  color: #819488;
  font-size: 11px;
  padding: 13px 0 2px;
}

/* =========================
   CONTENT PANELS & FORMS
========================= */

.content-panel {
  background: #112219;
  border: 1px solid #294333;
  border-radius: 13px;
  padding: 23px;
  margin-bottom: 20px;
}

.content-panel > p {
  margin-bottom: 15px;
}

.data-form {
  max-width: 600px;
  margin-top: 15px;
}

.data-form input,
.data-form select {
  width: 100%;
  padding: 13px 14px;
  border-radius: 9px;
  border: 1px solid #344a3c;
  background: #12231a;
  color: white;
  outline: none;
  margin-bottom: 8px;
}

.data-form input:focus,
.data-form select:focus {
  border-color: #55d47e;
}

.primary-button {
  margin-top: 18px;
  border: 0;
  border-radius: 8px;
  background: #42c875;
  color: #06170d;
  font-size: 12px;
  font-weight: 800;
  padding: 13px 18px;
}

.booking-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #293e30;
}

.booking-row:last-child {
  border-bottom: 0;
}

.booking-row strong {
  font-size: 13px;
}

.booking-row small {
  display: block;
  color: #8da194;
  font-size: 11px;
  margin-top: 6px;
}

.booking-status {
  display: inline-block;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 10px;
  font-weight: 700;
}

.booking-status.pending {
  background: #55431d;
  color: #ffda75;
}

.booking-status.accepted {
  background: #1c4d2e;
  color: #75e89a;
}

.booking-status.rejected {
  background: #512727;
  color: #ff9999;
}

.booking-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
}

.accept-button,
.reject-button {
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
}

.accept-button {
  background: #287a42;
  color: white;
}

.reject-button {
  background: #8c3535;
  color: white;
}

.empty-message {
  padding: 20px 0;
  color: #91a397;
  font-size: 13px;
}

/* =========================
   NUMBRI GAME
========================= */

.numbri-panel {
  text-align: center;
  padding: 45px 20px;
}

.numbri-icon {
  font-size: 55px;
  margin-bottom: 15px;
}

.numbri-clock {
  font-size: 55px;
  color: #6de091;
  font-weight: 800;
  margin: 25px 0;
  font-variant-numeric: tabular-nums;
}

.numbri-panel h3 {
  margin-bottom: 15px;
  color: #d5e5da;
}

/* =========================
   UDHAAR LEDGER
========================= */

.ledger-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid #294333;
}

.ledger-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.ledger-card p {
  font-size: 12px;
  color: #9fb1a4;
  margin: 6px 0;
}

.ledger-card strong {
  display: block;
  margin-top: 9px;
  color: #72e094;
  font-size: 13px;
}

.ledger-return {
  width: 190px;
}

.ledger-return label {
  font-size: 10px;
  color: #9fb1a4;
  display: block;
  margin-bottom: 7px;
}

.ledger-return input {
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #365340;
  background: #09170f;
  color: white;
}

/* =========================
   INCOME & EXPENSES
========================= */

.income-amount {
  color: #6de091;
}

.expense-amount {
  color: #ff9999;
}

.view-button {
  border: 1px solid #42644b;
  background: #183322;
  color: #8ce5a7;
  padding: 8px 13px;
  border-radius: 7px;
  font-size: 11px;
}

/* =========================
   BACKUP & RESTORE
========================= */

.backup-panel {
  text-align: center;
  padding: 45px 20px;
}

.backup-icon {
  font-size: 55px;
  margin-bottom: 15px;
}

.backup-panel > p {
  max-width: 500px;
  margin: 10px auto;
  line-height: 1.7;
}

.restore-area {
  border-top: 1px solid #304535;
  max-width: 500px;
  margin: 30px auto 0;
  padding-top: 25px;
}

.restore-area h3 {
  margin-bottom: 10px;
}

.restore-area p {
  color: #9aaca0;
  font-size: 12px;
  margin-bottom: 15px;
}

.restore-area input {
  max-width: 100%;
  color: #dce9df;
}

/* =========================
   FOOTER
========================= */

.dashboard-footer {
  text-align: center;
  color: #66796c;
  font-size: 9px;
  letter-spacing: 2px;
  padding: 30px 0 10px;
}

/* =========================
   RESPONSIVE DESIGN
========================= */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tables-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 750px) {
  .snooker-login-page {
    justify-content: center;
    padding: 25px;
    background-position: center;
  }

  .snooker-login-box {
    padding: 25px 20px;
  }

  .snooker-app {
    display: block;
  }

  .sidebar {
    width: 100%;
    min-width: 0;
    min-height: auto;
    padding: 15px;
  }

  .brand {
    padding-bottom: 15px;
  }

  .sidebar nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;
  }

  .sidebar nav button {
    font-size: 11px;
    padding: 10px 7px;
  }

  .logout-button {
    margin-top: 15px;
  }

  .main-content {
    padding: 18px 13px;
  }

  .topbar {
    align-items: flex-start;
  }

  .topbar h1 {
    font-size: 21px;
  }

  .topbar-right {
    font-size: 10px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }

  .stat-card {
    padding: 14px;
  }

  .stat-card h2 {
    font-size: 19px;
  }

  .tables-grid {
    grid-template-columns: 1fr;
  }

  .booking-row,
  .ledger-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .booking-actions {
    width: 100%;
  }

  .ledger-return {
    width: 100%;
  }
}

@media (max-width: 380px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .topbar-right span:nth-child(2) {
    display: none;
  }
}
/* 3D TABLE CARDS */
.table-card {
  position: relative;
  transform: perspective(1000px) rotateX(3deg);
  transform-style: preserve-3d;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  background: linear-gradient(145deg, #164b36, #09291e);
  box-shadow:
    0 12px 0 #061b14,
    0 18px 30px rgba(0, 0, 0, 0.55),
    inset 0 2px 5px rgba(255, 255, 255, 0.12);
}

.table-card:hover {
  transform: perspective(1000px) rotateX(0deg) translateY(-10px);
  box-shadow:
    0 16px 0 #061b14,
    0 25px 40px rgba(0, 0, 0, 0.65),
    inset 0 2px 8px rgba(255, 255, 255, 0.15);
}

/* TABLE SURFACE 3D */
.pool-table,
.table-visual {
  border: 7px solid #704321;
  border-radius: 12px;
  background: linear-gradient(145deg, #08764b, #03452c);
  box-shadow:
    inset 0 5px 12px rgba(0, 0, 0, 0.5),
    0 8px 15px rgba(0, 0, 0, 0.4);
}

/* REMOVE ALL BALLS */
.table-balls,
.snooker-balls,
.pool-balls,
.snooker-ball,
.pool-ball,
.ball {
  display: none !important;
}
/* ===== PREMIUM 3D NAVBAR ===== */

.sidebar {
  background: linear-gradient(160deg, #102f25, #071a14) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 8px 0 25px rgba(0, 0, 0, 0.4);
  padding: 25px 16px !important;
}

.sidebar h2,
.sidebar h3 {
  color: #d7b56d !important;
  text-shadow: 0 2px 8px rgba(215, 181, 109, 0.3);
}

.sidebar button,
.sidebar a {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 13px 16px;
  margin: 8px 0;
  border: 1px solid transparent;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  color: #e8eee9;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sidebar button:hover,
.sidebar a:hover {
  background: linear-gradient(135deg, #176343, #0b3b29);
  border-color: rgba(215, 181, 109, 0.5);
  color: #f3d28d;
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sidebar button.active,
.sidebar a.active {
  background: linear-gradient(135deg, #c49a50, #8b642d);
  color: #10251b;
  border-color: #e6c47e;
  box-shadow:
    0 5px 0 #63451f,
    0 9px 18px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);
}

/* NAVBAR BRAND */
.sidebar .logo,
.sidebar .brand {
  color: #e8c477;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* MOBILE NAVBAR */
@media (max-width: 750px) {
  .sidebar {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}