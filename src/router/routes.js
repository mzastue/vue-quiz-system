import pages from '../../pages';

export default [
  {
    path: '/',
    name: 'home',
    component: pages.Home,
  },
  {
    path: '/quiz',
    name: 'quiz-pre',
    component: pages.QuizPre,
  },
  {
    path: '/quiz/edit',
    name: 'quiz-pre-edit',
    component: pages.QuizPreEdit,
  },
  {
    path: '/quiz/:slug',
    name: 'quiz-start',
    component: pages.Quiz,
    props: true,
  },
  {
    path: '/quiz/edit/:slug',
    name: 'quiz-edit',
    component: pages.QuizEdit,
    props: true,
  },
  {
    path: '/creator',
    name: 'quiz-create',
    component: pages.Creator,
  },
  {
    path: '/creator/result',
    name: 'creator-result',
    component: pages.CreatorResult,
  },
];
