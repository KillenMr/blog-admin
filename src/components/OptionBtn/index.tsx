import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { memo } from 'react';
import useStyles from './style.style';

const OptionBtn = memo((props: ButtonProps & { src: string }) => {
  const { src, ...btnProps } = props;
  const { styles } = useStyles();
  return (
    <Button className={styles.btn} type="link" {...btnProps}>
      <img className={styles.btn} src={src} />
    </Button>
  );
});

export default OptionBtn;
