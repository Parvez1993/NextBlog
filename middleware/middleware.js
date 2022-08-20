import nextConnect from "next-connect";
import adminAuth from "./adminAuth";
import auth from "./auth";

const middleware = nextConnect();

middleware.use(auth);
// middleware.use(adminAuth);

export default middleware;
