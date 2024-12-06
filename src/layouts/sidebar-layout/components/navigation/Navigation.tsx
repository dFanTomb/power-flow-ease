import List from '@mui/material/List';
import { NavigationItem } from './components/navigation-item/NavigationItem';
import { NavigationItemType } from './components/navigation-item/types';
import { routes } from '../../../../contants/routes';
import {
  Abc,
  AccountBoxOutlined,
  CalendarMonthOutlined,
  ConstructionOutlined,
  DashboardOutlined,
  DesignServicesOutlined,
  ListAltOutlined,
  Login,
  Notes,
  QuestionMarkOutlined,
  ShapeLineOutlined,
  SystemUpdate,
  ViewStreamOutlined,
  FormatListBulleted,
} from '@mui/icons-material';
import { useMemo } from 'react';
import { useNotifications } from '../../../../hooks/api/use-notifications/useNotifications';
import { SvgIconProps } from '@mui/material';

export function Navigation() {
  const { data: notifications } = useNotifications();

  const navigationItems: NavigationItemType[] = useMemo(
    () => [
      {
        header: 'Dashboards',
      },
      {
        path: routes.dashboard,
        label: 'Dashboard',
        icon: (props: SvgIconProps) => <DashboardOutlined {...props} />,
      },
      {
        header: 'Pages',
      },
      {
        label: 'User',
        icon: (props: SvgIconProps) => <AccountBoxOutlined {...props} />,
        description: 'User management',
        items: [
          {
            path: routes.userAccount,
            label: 'Account',
          },
          {
            path: routes.userProfile,
            label: 'Profile',
          },
          {
            path: routes.userList,
            label: 'List',
          },
          {
            path: routes.userEdit,
            label: 'Edit',
          },
          {
            path: routes.userCreate,
            label: 'Create',
          },
        ],
      },
      {
        label: 'Blog',
        icon: (props: SvgIconProps) => <Notes {...props} />,
        description: 'Blog management',
        items: [
          {
            path: routes.blog,
            label: 'List',
          },
          {
            path: routes.blogPost,
            label: 'Details',
          },
          {
            path: routes.blogEditPost,
            label: 'Edit',
          },
          {
            path: routes.blogCreatePost,
            label: 'Create',
          },
        ],
      },
      {
        label: 'Orders',
        icon: (props: SvgIconProps) => <Abc {...props} />,
        description: 'Order management',
        items: [
          {
            path: routes.ordersList,
            label: 'List',
          },
          {
            path: routes.ordersDetails,
            label: 'Details',
          },
        ],
      },
      {
        label: 'Jobs',
        icon: (props: SvgIconProps) => <Abc {...props} />,
        description: 'Job management',
        items: [
          {
            path: routes.jobsCreate,
            label: 'Create',
          },
          {
            path: routes.jobsEdit,
            label: 'Edit',
          },
          {
            path: routes.jobsList,
            label: 'List',
          },
          {
            path: routes.jobsDetails,
            label: 'Details',
          },
        ],
      },
      {
        label: 'Forms',
        icon: (props: SvgIconProps) => <FormatListBulleted {...props} />,
        description: 'Form management',
        items: [
          {
            path: routes.formsCreate,
            label: 'Create',
          },
          {
            path: routes.formsEdit,
            label: 'Edit',
          },
          {
            path: routes.formsList,
            label: 'List',
          },
        ],
      },
      {
        label: 'Templates',
        icon: (props: SvgIconProps) => <Abc {...props} />,
        description: 'Templates management',
        items: [
          {
            path: routes.templatesCreate,
            label: 'Create',
          },
          {
            path: routes.templatesEdit,
            label: 'Edit',
          },
          {
            path: routes.templatesList,
            label: 'List',
          },
          {
            path: routes.templatesDetails,
            label: 'Details',
          },
        ],
      },
      {
        label: 'System',
        icon: (props: SvgIconProps) => <SystemUpdate {...props} />,
        description: 'System pages',
        items: [
          {
            path: routes.notFound,
            label: '(404) Page not found',
            icon: (props: SvgIconProps) => <QuestionMarkOutlined {...props} />,
          },
          {
            path: routes.maintenance,
            label: 'Under construction',
            icon: (props: SvgIconProps) => <ConstructionOutlined {...props} />,
          },
        ],
      },
      {
        label: 'Authentication',
        icon: (props: SvgIconProps) => <Login {...props} />,
        description: 'Authentication pages',
        items: [
          {
            path: routes.login,
            label: 'Login',
          },
          {
            path: routes.register,
            label: 'Register',
          },
          {
            path: routes.resetPassword,
            label: 'Reset password',
          },
          {
            path: routes.verifyCode,
            label: 'Verify code',
          },
        ],
      },
      {
        header: 'Apps',
      },
      {
        path: routes.calendar,
        label: 'Calendar',
        icon: (props: SvgIconProps) => <CalendarMonthOutlined {...props} />,
      },
      {
        path: routes.todoList,
        label: 'Tasks',
        icon: (props: SvgIconProps) => <ListAltOutlined {...props} />,
      },
      {
        header: 'Documentation',
      },
      {
        label: 'Theme',
        icon: (props: SvgIconProps) => <DesignServicesOutlined {...props} />,
        items: [
          {
            path: routes.themeTypography,
            label: 'Typography',
          },
          {
            path: routes.themeColors,
            label: 'Colors',
          },
        ],
      },
      {
        label: 'Components',
        icon: (props: SvgIconProps) => <ShapeLineOutlined {...props} />,
        items: [
          {
            path: routes.componentsButton,
            label: 'Button',
          },
        ],
      },
      {
        header: 'Navigation',
      },
      {
        path: '',
        label: 'Number',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: `${notifications?.notifications?.length}`,
        badgeColor: 'primary',
      },
      {
        path: '',
        label: 'Description',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
        description: 'This is a description',
      },
      {
        path: '',
        label: 'Disabled',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeColor: 'info',
        disabled: true,
        description: 'This is a disabled item',
      },
      {
        path: '',
        label: 'Color primary',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'primary',
      },
      {
        path: '',
        label: 'Color secondary',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'secondary',
      },
      {
        path: '',
        label: 'Color info',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
      },
      {
        path: '',
        label: 'Very long text as a link text',
        icon: (props: SvgIconProps) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
        external: true,
      },
    ],
    [notifications?.notifications?.length],
  );

  const navigationItemsList = navigationItems.map((item) => {
    return <NavigationItem key={Object.values(item).toString()} item={item} />;
  });

  return (
    <List sx={{ width: '100%', maxWidth: 360, padding: 2 }} component='nav' aria-labelledby='nested-list-subheader'>
      {navigationItemsList}
    </List>
  );
}
