import './css/style.css';
import routes from './routes';

const root = document.querySelector('#root');
let app;

const router = () => {
  // check which route got matched
  const routesObject = routes.map((route) => ({
    route,
    isMatched: location.pathname === route.path,
  }));

  let matchedRoute = routesObject.find((route) => route.isMatched);

  if (!matchedRoute) {
    matchedRoute = {
      route: routes[0],
      isMatched: true,
    };
  }
  return matchedRoute.route.view();
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  const appContainer = document.querySelector('.app');

  if (app.destroy) {
    app.destroy();
  }

  app = router();
  appContainer.innerHTML = '';
  appContainer.append(app.init());
};

function init() {
  console.log('initasd');
  root.innerHTML = '';
  const sideBar = document.createElement('div');

  // app header
  const appHeader = document.createElement('h2');
  appHeader.classList.add('app__header');
  appHeader.innerText = 'Dev Tooling';
  sideBar.classList.add('nav');
  const navBar = document.createElement('nav');
  navBar.innerHTML = `<a href="/" class="nav__link" data-link>Home</a>
  <a href="/jsonview" class="nav__link" data-link>Json Previewer</a>
  <a href="/notes" class="nav__link" data-link>Notes</a>`;

  sideBar.append(appHeader);
  sideBar.append(navBar);
  const body = document.createElement('div');
  body.classList.add('app');

  app = router();
  body.append(app.init());
  root.append(sideBar);
  root.append(body);

  root.querySelectorAll('a[data-link]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(e.target.href);
    });
  });
}
window.addEventListener('popstate', init);
document.addEventListener('DOMContentLoaded', init);
