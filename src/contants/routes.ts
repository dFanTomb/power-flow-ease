const themePrefix = '/theme';
const userPrefix = '/user';
const blogPrefix = '/blog';
const componentPrefix = `${themePrefix}/component`;
const orderPrefix = '/order';
const jobsPrefix = '/jobs';
const templatesPrefix = '/templates';

export const ROUTES_WITHOUT_THEMECONFIG = ['/home', '/login'];

export const routes = {
  homepage: '/home',
  dashboard: '/',
  user: userPrefix,
  userAccount: `${userPrefix}/account`,
  userProfile: `${userPrefix}/profile`,
  userList: `${userPrefix}/list`,
  userCreate: `${userPrefix}/create`,
  userEdit: `${userPrefix}/edit`,
  blog: `${blogPrefix}/list`,
  blogCreatePost: `${blogPrefix}/create`,
  blogEditPost: `${blogPrefix}/edit`,
  blogPost: `${blogPrefix}/post`,
  themeTypography: `${themePrefix}/typography`,
  themeColors: `${themePrefix}/colors`,
  componentsButton: `${componentPrefix}/button`,
  calendar: `/calendar`,
  notFound: '/404',
  maintenance: '/maintenance',
  todoList: '/todo-list',
  formBuilder: '/form-builder',
  ordersList: `${orderPrefix}/list`,
  ordersDetails: `${orderPrefix}/details`,
  templatesList: `${templatesPrefix}/list`,
  templatesDetails: `${templatesPrefix}/details`,
  templatesCreate: `${templatesPrefix}/create`,
  templatesEdit: `${templatesPrefix}/edit`,
  jobsList: `${jobsPrefix}/list`,
  jobsDetails: `${jobsPrefix}/details`,
  jobsCreate: `${jobsPrefix}/create`,
  jobsEdit: `${jobsPrefix}/edit`,
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  verifyCode: '/verify-code',
};
