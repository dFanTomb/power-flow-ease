import React, { Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './store/hooks.ts';
import { Analytics } from '@vercel/analytics/react';
import { CssBaseline, Fade, ThemeProvider } from '@mui/material';
import { routes } from './contants/routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useCurrentUser } from './hooks/api/use-current-user/useCurrentUser';
import { Loader } from './components/loader/Loader';
import { SidebarLayout } from './layouts/sidebar-layout/SidebarLayout.tsx';
import { shadTheme } from './theme/shad-theme/shadTheme.ts';
import { setUserFromLocalStorage } from './store/app/authSlice.ts';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
// import { StatWidget } from './pages/dashboard/components/stat-widget/StatWidget.tsx';

const HomePage = React.lazy(() => import('./pages/homepage/HomePage'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const UserAccountPage = React.lazy(() => import('./pages/user/user-account-page/UserAccountPage'));
const UserProfilePage = React.lazy(() => import('./pages/user/user-profile-page/UserProfilePage'));
const UserListPage = React.lazy(() => import('./pages/user/user-list-page/UserListPage'));
const UserEditPage = React.lazy(() => import('./pages/user/user-edit-page/UserEditPage'));
const UserCreatePage = React.lazy(() => import('./pages/user/user-create-page/UserCreatePage'));
const BlogPage = React.lazy(() => import('./pages/blog/blog-page/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/blog/blog-post-page/BlogPostPage'));
const CreatePostBlogPage = React.lazy(() => import('./pages/blog/create-post-blog-page/CreatePostBlogPage'));
const EditPostBlogPage = React.lazy(() => import('./pages/blog/edit-post-blog-page/EditPostBlogPage'));
const ColorsPage = React.lazy(() => import('./docs/pages/colors-page/ColorsPage'));
const TypographyPage = React.lazy(() => import('./docs/pages/typography-page/TypographyPage'));
const ButtonPage = React.lazy(() => import('./docs/pages/button-page/ButtonPage'));
const CalendarPage = React.lazy(() => import('./pages/calendar/Calendar'));
const TodoList = React.lazy(() => import('./pages/todo-list/TodoList'));
const OrderList = React.lazy(() => import('./pages/orders/orders-list/OrdersList'));
const OrderDetails = React.lazy(() => import('./pages/orders/order-details/OrderDetails'));
const TemplatesList = React.lazy(() => import('./pages/templates/templates-list/TemplatesListPage'));
const TemplatesDetails = React.lazy(() => import('./pages/templates/templates-details/TemplatesDetails'));
const TemplatesCreate = React.lazy(() => import('./pages/templates/templates-create/TemplatesCreate'));
const TemplatesEdit = React.lazy(() => import('./pages/templates/templates-edit/TemplatesEdit'));
const JobsList = React.lazy(() => import('./pages/jobs/jobs-list/JobsListPage'));
const JobsDetails = React.lazy(() => import('./pages/jobs/jobs-details/JobsDetails'));
const JobsCreate = React.lazy(() => import('./pages/jobs/jobs-create/JobsCreate'));
const JobsEdit = React.lazy(() => import('./pages/jobs/jobs-edit/JobsEdit'));
const FormsList = React.lazy(() => import('./pages/forms/FormsList'));
const FormsCreate = React.lazy(() => import('./pages/forms/forms-create/FormsCreate.tsx'));
const FormsEdit = React.lazy(() => import('./pages/forms/FormsEdit'));
const NotFoundPage = React.lazy(() => import('./pages/not-found/NotFoundPage'));
const MaintenancePage = React.lazy(() => import('./pages/maintenance/MaintenancePage'));
const LoginPage = React.lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/register/RegisterPage'));
const ResetPassword = React.lazy(() => import('./pages/reset-password/ResetPassword'));
const VerifyCode = React.lazy(() => import('./pages/verify-code/VerifyCode'));

const router = createBrowserRouter([
  // Public routes
  {
    path: routes.homepage,
    element: (
      <Suspense>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: routes.login,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: routes.register,
    element: (
      <Suspense>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: routes.maintenance,
    element: (
      <Suspense>
        <MaintenancePage />
      </Suspense>
    ),
  },

  {
    path: routes.resetPassword,
    element: (
      <Suspense>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: routes.verifyCode,
    element: (
      <Suspense>
        <VerifyCode />
      </Suspense>
    ),
  },

  // Protected routes
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <SidebarLayout>
            <Suspense>
              <Fade in={true} timeout={500}>
                <div>
                  <Outlet />
                </div>
              </Fade>
            </Suspense>
          </SidebarLayout>
        ),
        children: [
          {
            path: routes.dashboard,
            element: <Dashboard />,
          },
          {
            path: routes.userAccount,
            element: <UserAccountPage />,
          },
          {
            path: routes.userProfile,
            element: <UserProfilePage />,
          },
          {
            path: routes.userList,
            element: <UserListPage />,
          },
          {
            path: routes.userEdit,
            element: <UserEditPage />,
          },
          {
            path: routes.userCreate,
            element: <UserCreatePage />,
          },
          {
            path: routes.blog,
            element: <BlogPage />,
          },
          {
            path: routes.blogPost,
            element: <BlogPostPage />,
          },
          {
            path: routes.blogCreatePost,
            element: <CreatePostBlogPage />,
          },
          {
            path: routes.blogEditPost,
            element: <EditPostBlogPage />,
          },
          {
            path: routes.themeColors,
            element: <ColorsPage />,
          },
          {
            path: routes.themeTypography,
            element: <TypographyPage />,
          },
          {
            path: routes.componentsButton,
            element: <ButtonPage />,
          },
          {
            path: routes.calendar,
            element: <CalendarPage />,
          },
          {
            path: routes.todoList,
            element: <TodoList />,
          },
          {
            path: routes.ordersList,
            element: <OrderList />,
          },
          {
            path: routes.ordersDetails,
            element: <OrderDetails />,
          },
          {
            path: routes.jobsList,
            element: <JobsList />,
          },
          {
            path: routes.jobsDetails,
            element: <JobsDetails />,
          },
          {
            path: routes.jobsCreate,
            element: <JobsCreate />,
          },
          {
            path: routes.jobsEdit,
            element: <JobsEdit />,
          },
          {
            path: routes.formsList,
            element: <FormsList />,
          },
          {
            path: routes.formsCreate,
            element: <FormsCreate />,
          },
          {
            path: routes.formsEdit,
            element: <FormsEdit />,
          },
          {
            path: routes.templatesList,
            element: <TemplatesList />,
          },
          {
            path: routes.templatesDetails,
            element: <TemplatesDetails />,
          },
          {
            path: routes.templatesCreate,
            element: <TemplatesCreate />,
          },
          {
            path: routes.templatesEdit,
            element: <TemplatesEdit />,
          },
        ],
      },
    ],
  },

  // 404 route must be last
  {
    path: routes.notFound,
    element: (
      <Suspense fallback={<Loader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

const queryClient = new QueryClient();

export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light' as 'light' | 'dark' });

const AppRouter = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Initializing auth StatWidget...');
    dispatch(setUserFromLocalStorage());
    setIsInitializing(false);
  }, [dispatch]);

  console.log('AppRouter render - isAuthenticated:', isAuthenticated, 'isInitializing:', isInitializing);

  if (isInitializing) {
    return <Loader />;
  }

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('App component mounting - checking localStorage');

    const user = localStorage.getItem('currentUser');

    console.log('Found user in localStorage:', user);

    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = React.useMemo(() => shadTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
