import pages from '../../pages';

export default [
  {
    path: '/',
    name: 'home',
    component: pages.Home,
  },
  {
    path: '/quiz/:slug',
    component: pages.Quiz,
  },
  {
    path: '/quiz/edit/:slug',
    name: 'quiz-edit',
    component: pages.QuizEdit,
  },
  {
    path: '/creator',
    name: 'create-quiz',
    component: pages.Creator,
  },
  {
    path: '/creator/result',
    name: 'creator-result',
    component: pages.CreatorResult,
  },
];
