export default async function getMassages() {

    await new Promise((resolve)=>setTimeout(resolve, 1000))

    const response = await fetch("http://localhost:5001/api/v1/massages", {next: {tags:['massages']}})
    if(!response.ok) {
        throw new Error("Failed to fetch hospitals")
    }
    return await response.json()
}