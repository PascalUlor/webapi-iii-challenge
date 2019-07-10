// code away!
const app = require("./server.js");
const router = require("./users/userRouter");

const port = process.env.PORT || 8000;

app.use("/api", router);

/**
 * All wrong routes
 */
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Wrong route"
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
