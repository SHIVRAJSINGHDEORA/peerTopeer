export function verifyUser(socket, next) {
  const token = socket.handshake.headers.cookie;

  if (!token) {
    const err = new Error("not authorized");
    err.data = { content: { status: false } };
    next(err);
    return;
  }

  const secretString = process.env.SECRET;

  jwt.verify(token, secretString, async (err, data) => {
    if (err) {
      const err = new Error("not authorized");
      err.data = { content: { status: false } };
      next(err);
      return;
    }

    const user = await User.findById(data.id);

    if (!user) {
      const err = new Error("not authorized");
      err.data = { content: { status: false } };
      next(err);
      return;
    }

    socket.data.username = user.username;
    next();
  });
}
