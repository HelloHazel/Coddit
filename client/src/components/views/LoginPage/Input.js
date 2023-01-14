export default function Input(props) {
  return (
    <input
      {...props}
      className={
        "bg-reddit_gray p-2 border border-reddit_gray rounded-full block " +
        props.className
      }
    />
  );
}
