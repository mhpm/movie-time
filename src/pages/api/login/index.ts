import type { NextApiRequest, NextApiResponse } from "next";
import { ERequestMethods } from "@/utils/constant";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === ERequestMethods.POST) {
    // const auth = req.headers.authorization;
    // const token = auth?.substring(7);

    const token = await getToken({ req, secret });
    console.log("token: ", token);

    try {
      res.status(200).json({ login: token });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ login: false });
    }
  } else {
    res.send({ login: false });
  }
}
