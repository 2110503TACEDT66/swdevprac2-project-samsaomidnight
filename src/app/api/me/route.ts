import * as dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();

export async function GET(request: Request) {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const u_profile = process.env.BACKEND_URL + "/api/v1/auth/me";
    const response = await fetch(u_profile, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        console.log("Failed to fetch user profile");
        throw new Error("Failed to fetch user profile");
    } 
    console.log("User Profile fetched");
    const stuff = await response.json();
    console.log("User Fetched From Express Backend:", stuff);
    return NextResponse.json(stuff)
}