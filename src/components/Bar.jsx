export default function Bar({ height, color }) {
  return (
    <div
      className="bar"
      style={{
        height: `${height + 4}vh`,
        backgroundColor: color || '#4ea217',
      }}
    />
  );
}