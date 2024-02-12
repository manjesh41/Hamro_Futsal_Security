import { rest } from "msw";

const API_BASE_URL = "http://localhost:3001";

export const handlers = [
  //user registration

  rest.post(`${API_BASE_URL}/users/register`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        status: "success",
        message: "User registered successfully",
      })
    )
  ),

  //User login
  rest.post(`${API_BASE_URL}/users/login`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        status: "success",
        message: "User logged in successfully",
      })
    )
  ),
];
