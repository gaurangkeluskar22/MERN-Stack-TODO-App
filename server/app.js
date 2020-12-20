var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const TODO = require("./models/TodoApp_model");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://gaurang:G@9870208616gk@cluster0.qp5ai.mongodb.net/TodoApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

app.get("/", function (req, res) {
  res.send("This is backend");
});

app.post("/todos", async (req, res) => {
  const title = req.body.todoname;
  const content = req.body.tododescription;
  console.log(title);
  console.log(content);

  const Todo = new TODO({
    todoName: title,
    todoDescription: content,
  });
  try {
    await Todo.save();
    res.send("added");
  } catch (err) {
    console.log(err);
  }
});

app.get("/readtodos", async (req, res) => {
  await TODO.find({}, (err, result) => {
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const update_todo = req.body.update_todo;
  const id = req.body.id;
  console.log(update_todo);
  console.log("id:", id);

  await TODO.updateOne({ _id: id }, { todoName: update_todo }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("updated");
    }
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TODO.deleteOne({ _id: mongoose.Types.ObjectId(id) });
  res.send("deleted");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
