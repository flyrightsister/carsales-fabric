"use strict";

const http = require("http");
const plugin = {};

/* eslint-disable no-console */
plugin.register = (server, options1, next) => {
  server.route({
    method: "POST",
    path: "/create-login",
    handler: (request, reply) => {
      const postData = JSON.stringify({
        username: request.payload.username
      });

      const options = {
        host: "10.117.163.109",
        path: "/users",
        port: request.payload.portNumber,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      };

      const req = http.request(options, res => {
        const bodyChunks = [];
        res
          .on("data", chunk => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", e => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });
      req.write(postData);
      req.end();
    }
  });

  next();
};

plugin.register.attributes = {
  name: "loginPlugin",
  version: "0.0.1"
};

module.exports = plugin;
/* eslint-enable */
