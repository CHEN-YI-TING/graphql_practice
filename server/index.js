const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

//!類型定義typeDefs-所有的資料，所有查詢，所有的資料型態都使用這個變數功能
//!解析器resolvers->而所有的處理資料的函式，呼叫api、呼叫database並傳送資料回來(just a function deal with data)
server.listen().then(({ url }) => {
  console.log(`your api is running on ${url} :")`);
});
