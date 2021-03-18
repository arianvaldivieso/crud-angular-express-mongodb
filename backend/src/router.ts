import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { User } from './../models/user';

dotenv.config();

function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};


export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	//await User.deleteMany({});

  const users = await User.find({});
  return res.status(200).send(users);
});

router.post("/", async (req: Request, res: Response) => {

	const { name, email, password } = req.body;

	let user = new User({
		name:name,
		email:email,
		password:password,
		ip: getClientIp(req)
	});

	await user.save();

  res.status(201).json({data:user});
});

router.post("/login", async (req: Request, res: Response) => {

	const secret = process.env.TOKEN_SECRET;
	const { email, password } = req.body;

	let user:any = await User.findOne({
		email:email,
		password:password
	});



	let status:number = user ? 200 : 404;
	let token = user ? jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60),
		data: user
	}, secret+'') : null;

	let last_login = Date.now();
	if (user.last_login) {
		last_login = user.last_login;
	}

	user.last_login = Date.now();

	await user.save();


  res.status(status).json({
  	data:user,
  	last_login:last_login,
  	token: token
  });
});