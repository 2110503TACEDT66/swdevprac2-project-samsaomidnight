import * as dotenv from "dotenv";
dotenv.config();
interface ClientPutRequestBody {
    id: string,
    updateData: Object
}

export async function GET(request: Request) {
    try {
        const header = request.headers;
        const bookingId = header.get("Booking-Id");
        let data;
        if (bookingId) {
            console.log("Fetch some random shit", bookingId)
            const result = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${bookingId}`);
            data = await result.json();
        } else {
            console.log("Fetch all shit")
            const result = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments`);
            data = await result.json();
        }
        return new Response(JSON.stringify(data), { // Send 'data' instead of 'result'
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function PUT(request: Request) {
    try {
        const body: ClientPutRequestBody = await request.json()
        const result = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${body.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body.updateData)
        })
        const data = await result.json()
        console.log(data)
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log("back",body)
        const result = await fetch(`${process.env.BACKEND_URL}/api/v1/massages/${body.massage}/appointments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await result.json()
        console.log(data)
        return new Response(JSON.stringify({ success: true, data: data }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error)
    }
}


export async function DELETE(request: Request) {
    try {
        const header = request.headers;
        const id = header.get("Book-Id")
        console.log(id)
        const result = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${id}`, {
            method: "DELETE",
        })
        const data = await result.json()
        console.log(data)
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error)
    }
}

