import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import React from "react";
function utils(req) {
  const { cookies } = req;
  const jwt = cookies.OurSite;
  return <div>utils</div>;
}

export default utils;
