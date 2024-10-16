import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#165DFE',
  
  layout: 'mix',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  collapsed: false,
  siderWidth: 240,
  title: '机场勤务系统',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    sider: {
      colorMenuBackground: '#0E42D2', // menu 的背景颜色
      colorTextMenu: '#E9F3FF',
      colorBgMenuItemSelected: '#E7F3FF', // 菜单项选中颜色
      colorTextMenuSelected: '#0E42D2',
      colorTextMenuActive: '#E7F3FF', // 菜单项 hover 颜色
      colorTextMenuItemHover: '#E7F3FF',
    },
  },
};

export default Settings;
