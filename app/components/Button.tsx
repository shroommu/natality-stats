type propTypes = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: propTypes) {
  return <button onClick={onClick}>{text}</button>;
}
