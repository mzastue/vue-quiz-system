import pages from '../../pages';

export default [
  { path: '/', component: pages.Home },
  { path: '/quiz/:slug', component: pages.Quiz },
  { path: '/creator', component: pages.Creator },
];
