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
        <main className="flex items-center justify-center bg-white py-20 ">
            <div className="max-w-lg w-full space-y-8 bg-stone-400 p-10 rounded-xl shadow-2xl">
                <h2 className="text-center text-4xl font-serif font-extrabold text-white">Register</h2>
                <form action={addUser}>
                    <div className="rounded-md -space-y-px">
                        <div className="py-3">
                            <label htmlFor="name" className="block text-sm font-medium font-serif text-amber-50">Name</label>
                            <input type="text" name="name" id="name" required placeholder="Your full name"
                                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="py-3">
                            <label htmlFor="email" className="block text-sm font-medium font-serif text-amber-50">Email</label>
                            <input type="email" name="email" id="email" required placeholder="Your email"
                                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="py-3">
                            <label htmlFor="tel" className="block text-sm font-medium font-serif text-amber-50">Phone Number</label>
                            <input type="tel" name="tel" id="tel" required placeholder="Your phone number"
                                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="py-3">
                            <label htmlFor="role" className="block text-sm font-medium font-serif text-amber-50">Role</label>
                            <input type="text" name="role" id="role" required placeholder="Your role (e.g., user, admin)"
                                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="py-3">
                            <label htmlFor="password" className="block text-sm font-medium font-serif text-amber-50">Password</label>
                            <input type="password" name="password" id="password" required placeholder="Create a password"
                                   className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-serif text-m font-large rounded-md text-gray-500 font-bold bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}