interface CardViewProps {
    title: string;
    children?: React.ReactNode;
    style?: React.CSSProperties; 
  }

const CardView = (props: CardViewProps) => {
  const { title, children, style } = props;
  return (
    <div style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: '12px 22px', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ width: 2, height: 14, marginRight: 4, backgroundColor: '#165CFE', borderRadius: 2 }} />
        <span
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1D2129',
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};

export default CardView;
