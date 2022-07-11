const express = require("express");
const connectDB = require("./config/db");
const app = express();
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const io = require("socket.io")(http);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use(
  cors({
    origin: "*",
  })
);

const User = require("./model/User");
connectDB();
app.use(express.json({ extended: false }));
let num = 0;
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  // console.log("hi");
  res.json({ msg: "h bro" });
});
io.on("connection", (socket) => {
  //Socket is a Link to the Client
  console.log("New Client is Connected!");
  //Here the client is connected and we can exchanged
});
app.post("/upload", upload.single("imageFile"), (req, res) => {
  num++;
  console.log("hi");
  console.log(req);
  console.log(num, req.file);
  res.status(400).json({ msg: "received image" });
});
app.use("/api/fetchAccountInfo", require("./routes/api/fetchAccountInfos"));
//API Routes
app.use(
  "/api/fetchAdminOrganization",
  require("./routes/api/fetchOrganizations")
);
app.use(
  "/api/OrganizationAccountInfo",
  require("./routes/api/fetchAccountInfos")
);
app.use(
  "/api/internalFundTransfer",
  require("./routes/api/FundTransferInternal")
);
app.use("/api/passbook", require("./routes/api/accountStatement"));
app.use("/api/approveAccount", require("./routes/api/approveAccount"));
app.use("/api/joinOrganization", require("./routes/api/createAccount"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/signUp", require("./routes/api/register"));
app.use("/api/createOrganization", require("./routes/api/createOrganization"));

http.createServer(app).listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
