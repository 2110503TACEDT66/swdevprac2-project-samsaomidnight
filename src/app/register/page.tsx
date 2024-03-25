import User from "@/db/models/User";
import { dbConnect } from "@/db/dbConnect";

export default function RegisterPage() {

    const addUser = async (addUserForm:FormData) => {
        "use server"
        const name = addUserForm.get("name")
        const email = addUserForm.get("email")
        const tel = addUserForm.get("tel")
        const role = addUserForm.get("role")
        const password = addUserForm.get("password")

        try{
            dbConnect()
            const user = await User.create({
                "name": name,
                "email": email,
                "tel": tel,
                "role": role,
                "password": password,
            })
        } catch(error){
            console.log(error)
        }

    }

    return (
        <main className="bg-slate-100 m-5 p-5">
                <form action={addUser}>
                <div className="text=xl text-blue-700">Register User</div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-grey-700 pr-4" htmlFor="name">Name</label>
                    <input type="text" required id="name" name="name" placeholder="Name"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-grey-700 pr-4" htmlFor="email">Email</label>
                    <input type="email" required id="email" name="email" placeholder="Email"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-grey-700 pr-4" htmlFor="tel">Phone Number</label>
                    <input type="tel" required id="tel" name="tel" placeholder="Phone Number"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-grey-700 pr-4" htmlFor="role">Role</label>
                    <input type="text" required id="role" name="role" placeholder="Role"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-grey-700 pr-4" htmlFor="password">Password</label>
                    <input type="password" required id="password" name="password" placeholder="Password"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Register User</button>
            </form>
        </main>
    );
}