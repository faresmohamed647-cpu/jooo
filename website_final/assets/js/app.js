const API_BASE = "http://127.0.0.1:8000/api";
const state = { page: "dashboard" };

const menu = [
  ["dashboard", "Dashboard"],
  ["donors", "Donors"],
  ["donations", "Donations"],
  ["campaigns", "Campaigns"],
  ["volunteers", "Volunteers"],
  ["reports", "Reports"],
  ["users", "Users"],
  ["notifications", "Notifications"],
  ["messages", "Messages"],
  ["media", "Media"],
  ["content", "Content"],
  ["settings", "Settings"],
];

function toast(message) {
  const root = document.getElementById("toast-root");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function money(v) {
  return `$${Number(v || 0).toLocaleString()}`;
}

async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }
  return res.status === 204 ? null : res.json();
}

function renderMenu() {
  const wrap = document.getElementById("menu");
  wrap.innerHTML = menu
    .map(([id, label]) => `<button class="menu-btn ${state.page === id ? "active" : ""}" data-page="${id}">${label}</button>`)
    .join("");
}

function pageCard(title, content) {
  return `<div class="card"><h3>${title}</h3><p class="muted">${content}</p></div>`;
}

async function renderDashboard() {
  try {
    const payload = await api("/dashboard/analytics");
    const data = payload.data || payload;
    return `
      <div class="cards">
        <div class="card"><div class="muted">Total Donations</div><div class="stat">${money(data.total_donations)}</div></div>
        <div class="card"><div class="muted">Active Campaigns</div><div class="stat">${data.active_campaigns}</div></div>
        <div class="card"><div class="muted">New Donors (30d)</div><div class="stat">${data.new_donors}</div></div>
        <div class="card"><div class="muted">Total Volunteers</div><div class="stat">${data.total_volunteers}</div></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Month</th><th>Amount</th><th>Progress</th></tr></thead>
          <tbody>
            ${data.monthly_chart.map((row) => `
              <tr>
                <td>${row.month}</td>
                <td>${money(row.total)}</td>
                <td><div class="bar"><span style="width:${Math.min((row.total / (data.max_monthly || 1)) * 100, 100)}%"></span></div></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  } catch {
    return pageCard("Dashboard", "Backend is not running yet. Start Laravel API to load analytics.");
  }
}

async function renderSimpleTable(resource, title, columns) {
  try {
    const data = await api(`/${resource}`);
    const list = data.data || data;
    return `
      <div class="page-head">
        <h3>${title}</h3>
        <button class="btn btn-primary" data-action="create-${resource}">Add New</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>${columns.map((c) => `<th>${c}</th>`).join("")}<th>Actions</th></tr></thead>
          <tbody>
            ${list.map((row) => `
              <tr>
                ${columns.map((c) => `<td>${row[c] ?? "-"}</td>`).join("")}
                <td><button class="btn btn-soft">Edit</button> <button class="btn btn-danger">Delete</button></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  } catch {
    return pageCard(title, "Unable to load records from API.");
  }
}

function renderPlaceholder(title, details) {
  return `<div class="card"><h3>${title}</h3><p class="muted">${details}</p></div>`;
}

async function renderPage() {
  const title = document.getElementById("page-title");
  const content = document.getElementById("content");
  title.textContent = menu.find((x) => x[0] === state.page)?.[1] || "Dashboard";

  const views = {
    dashboard: () => renderDashboard(),
    donors: () => renderSimpleTable("donors", "Donor Management", ["name", "email", "phone", "city"]),
    donations: () => renderSimpleTable("donations", "Donation Management", ["reference", "amount", "status", "donated_at"]),
    campaigns: () => renderSimpleTable("campaigns", "Campaign Management", ["name", "target_amount", "current_amount", "status"]),
    volunteers: () => renderSimpleTable("volunteers", "Volunteer Management", ["name", "email", "phone", "status"]),
    reports: () => Promise.resolve(renderPlaceholder("Reports", "Use /reports/monthly, /reports/campaign-performance, /reports/export/excel, /reports/export/pdf.")),
    users: () => Promise.resolve(renderPlaceholder("Users", "User/role management is handled through backend auth + policies.")),
    notifications: () => Promise.resolve(renderPlaceholder("Notifications", "Connected to email notifications and admin alerts from API.")),
    messages: () => Promise.resolve(renderPlaceholder("Messages", "Inbox module ready for future integration.")),
    media: () => Promise.resolve(renderPlaceholder("Media", "Campaign image upload endpoint available on backend.")),
    content: () => Promise.resolve(renderPlaceholder("Content", "CMS content endpoints can be added on top of this API base.")),
    settings: () => Promise.resolve(renderPlaceholder("Settings", "Manage system configuration and API keys securely from backend settings module.")),
  };

  content.innerHTML = await (views[state.page] ? views[state.page]() : views.dashboard());
}

document.addEventListener("click", async (e) => {
  const pageBtn = e.target.closest("[data-page]");
  if (pageBtn) {
    state.page = pageBtn.getAttribute("data-page");
    renderMenu();
    await renderPage();
  }
});

document.getElementById("theme-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  toast("Logged out");
});

async function boot() {
  renderMenu();
  await renderPage();
}

boot();
