import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import cookieParser from "cookie-parser"
import cors from 'cors';
import dotenv from "dotenv"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
dotenv.config()
import 'reflect-metadata'
import { GraphQLTimestamp, buildSchema } from "type-graphql"
import { resolvers } from "../resolvers"
import { connectToMongo } from "../utils/mongo"
import Context from "../types/context"
import { User } from "../schema/user.schema";
import { verifyJwt } from "../utils/jwt";
import authChecker from "../utils/authChecker";

import Redis, { RedisOptions } from "ioredis"
import { RedisPubSub } from "graphql-redis-subscriptions"
import path from "path"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"

async function bootstrapServer(){
  // Configure Redis Connection Options
  const options: RedisOptions = {
    // host: process.env.REDIS_HOST!,
    // port: Number.parseInt(process.env.REDIS_PORT!),
    retryStrategy: times => Math.max(times * 100, 3000)
  }

  // Create Redis-Based Pub-Sub
  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })

  // Build the TypeGraphQL schema
  const schema = await buildSchema({
    resolvers,
    authChecker,  
    // scalarsMap: [{ type: Date, scalar: GraphQLISODateTime }] ----Default----
    scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
    pubSub,  // provide redis-based instance of PubSub
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  })

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = http.createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  })      

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer)

  // Create and run apollo server
  const server = new ApolloServer<Context>({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
       // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart(){
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      },
      // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })
  await server.start();

  // Apply middlewares
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json({ limit: "50mb" }),
    cookieParser(),
    expressMiddleware(server, {
      context: async (ctx: Context) => {
        const context = ctx

        // if(ctx.req.cookies.access_token){
        //   const user = verifyJwt<User>(ctx.req.cookies.access_token)
        //   context.user = user
        // }
        if(ctx.req.headers.authorization){
          const token = ctx.req.headers.authorization.replace("Bearer ","")
          const user = verifyJwt<User>(token)
          // console.log(token)
          // console.log(user);
          
          context.user = user
        }
        return context
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  // Connect to DB
  connectToMongo()

  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  //   context: async ({ req, res }) => ({
      
  //   })
  // })
}

bootstrapServer()