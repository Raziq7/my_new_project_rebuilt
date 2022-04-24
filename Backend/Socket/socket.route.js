const { Server } = require("socket.io");
const { SocketEvent } = require("./socketConstant");
const addProductModel = require("../Models/addProductModel");

const { CONNECTION } = SocketEvent;

module.exports = {
  setupSocket: (server) => {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["*"],
        credentials: true,
      },
    });

    io.on(CONNECTION, (socket) => {
      console.log("kjdfhkj", socket.id);

      addProductModel.watch().on("change", (data) => {
        console.log("===========>", data);
        if (data.operationType === "insert")
          socket.emit("user", data.fullDocument);
      });
    });
  },
};
