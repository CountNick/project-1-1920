import { Router } from "./modules/router.js";

const App = {
  init: (() => {
    Router.handle();
  })()
};
