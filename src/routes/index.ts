import dotenv from "dotenv";
import * as express from "express";
import { Duffel } from "@duffel/api";

export const register = (app: express.Application) => {
  const duffelAPI = new Duffel({
    token: process.env.DUFFEL_API_TOKEN || "",
    debug: { verbose: true },
  });

  // define a route handler for the default home page
  app.get("/", async (req: any, res) => {
    const aircraft = await duffelAPI.aircraft.get("arc_00009VMF8AhXSSRnQDI6Hi");
    res.json(aircraft);
  });

  // app.get("/offers", async (req: any, res) => {
  //   try {
  //     const offers = await duffelAPI.offers.list("orq_0000A7c06omTLTe4jzO760");
  //     res.json(offers);
  //   } catch (error) {
  //     console.log("Caught while generating", error);
  //     res.json(error);
  //   }
  // });

  app.get(`/orders`, async (req: any, res) => {
    try {
      const order = await duffelAPI.orders.get("ord_0000A95jhFhaJAvX2666HQ");
      res.json(order);
    } catch (error) {
      console.log("Caught while generating", error);
      res.json(error);
    }
  });

  // app.get("/offers-paginated", async (req: any, res) => {
  //   try {
  //     const offers = duffelAPI.offers.listWithGenerator(
  //       "orq_0000A7c06omTLTe4jzO760"
  //     );
  //     for await (const offer of offers) {
  //       console.log(offer);
  //       res.json(offer);
  //     }
  //   } catch (error) {
  //     console.log("Caught while generating", error);
  //     res.json(error);
  //   }
  // });
};
