import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    rightContent: {
      marginLeft: 16,
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      // padding: ,
      width: '100%',
      '.ant-tabs-nav': {
        marginBottom: 0,
        '&::before': {
          borderBottomWidth: 0,
        },
      },
    },
    tabsCard: {
      height: 50,
      marginBottom: 10,
    },
    tabsBody: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    rightBody: {
      padding: 0,
    },
    tabCard: {
      width: 560,
    },
    tabs: {
      backgroundColor: '#fff',
    },
    bottomBtns: {
      position: 'fixed',
      bottom: 20,
      right: 40,
    },
    bottomBtn: {
      width: 150,
      height: 50,
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
    },
  };
});

export default useStyles;
