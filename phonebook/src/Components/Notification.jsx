const Notification = ({ message, success }) => {
  if (message == null) {
    return;
  }

  return (
    <div className={`notification ${success ? "success" : "failure"}`}>
      {message}
    </div>
  );
};

export default Notification;
