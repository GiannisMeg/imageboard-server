const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

const app = express();
const port = 4000;

app.use(express.json()); // parse the body

//---- Routers ----//
app.use("/login", authRouter);
app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`port listen on ${port}`));
