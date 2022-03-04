import JsonPreviewer from './components/JsonPreviewer';
import Notes from './components/Notes';
import Home from './components/Home';

const routes = [
  { path: '/', view: Home },
  { path: '/jsonview', view: JsonPreviewer },
  { path: '/notes', view: Notes },
];

export default routes;
