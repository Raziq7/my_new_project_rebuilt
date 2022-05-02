const { Server } = require("socket.io");
const { SocketEvent } = require("./socketConstant");
const product = require("../Models/productModel");
const staffModel = require("../Models/staffModel");

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

      product.watch().on("change", (data) => {
        console.log("===========>", data);
        switch (data.operationType) {
          case "insert":
            return socket.emit("user", data.fullDocument);
          case "delete":
            return socket.emit("deletePro", data.documentKey);
          case "update":
            return socket.emit("updatePro", data.documentKey);
          default:
            break;
        }
      });
      staffModel.watch().on("change", (data) => {
        console.log("changed,status======", data);
        switch (data.operationType) {
          case "update":
            return socket.emit("userUpdate", data.documentKey);
        }
      });
    });
  },
};
