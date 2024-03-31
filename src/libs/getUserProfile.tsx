import * as dotenv from "dotenv";
dotenv.config();
export default async function getUserProfile(token: string) {
  console.log("Get User Profile", token);
  const response = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const stuff = await response.json();
  console.log("User Me:", stuff);
  return stuff;
}
