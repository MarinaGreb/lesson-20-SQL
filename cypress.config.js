const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "db4free.net",
      user: "marina",
      password: "password",
      database: "it_switcher_m",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        //когда срабатывает нод евент таск
        queryDb: (query) => {
          return queryTestDB(query, config)
        },
      });
      // implement node event listeners here
    },
  },
});
const mysql = require("mysql"); //импорт mysql
function queryTestDB(query, config) {
  const connection = mysql.createConnection(config.env.db); //готовим соединение
  connection.connect();//установить соединение с нашей бд
  return new Promise((resolve, reject) => {
  connection.query(query,(error, results) => {
    if (error) reject(error); //если ошибка то реджек ерор
    else {
      connection.end();
      return resolve(results);
    }
  })
})
}