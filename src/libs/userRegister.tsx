export default async function userRegister(userEmail: string, userPassword: string) {
    // Change the endpoint to the one provided for registration by your backend
    const response = await fetch("http://localhost:5001/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        // Optionally, you can enhance error handling here by checking response status codes
        // and providing more detailed error messages based on those codes
        throw new Error("Failed to register");
    }
    return await response.json();
}
