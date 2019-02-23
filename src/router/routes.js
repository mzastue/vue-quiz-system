import pages from '../../pages';

export default [
  { path: '/', component: pages.Home },
  { path: '/quiz/:slug', component: pages.Quiz },
  { path: '/quiz/edit/:slug', component: pages.QuizEdit },
  { path: '/creator', component: pages.Creator },
];
