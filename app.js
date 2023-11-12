import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";

// 1. whsat view show to user based on Route?
function router(params) {
  //   dashboard - products - posts;
  console.log(location.pathname);
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];
  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = potentialRoutes.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }

  document.querySelector("#app").innerHTML = match.route.view();
}

// 2. push user to new url
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

// browser history for Bach and Forward
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  console.log("hey im here");
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

// SIDEBAR TOGGLER
const sidebarToggler = document.querySelector(".sidebar-toggler");
// console.log(sidebarToggler);
const sidebar = document.querySelector(".nav");
const root = document.documentElement;
sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  if (sidebar.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 220 + "px");
  }
});

//  for refresh based on this solution:
// https://stackoverflow.com/questions/61163202/error-when-refreshing-the-same-page-twice

//i used server.js file and run it by node => node server.js
