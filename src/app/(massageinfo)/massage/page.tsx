import getMassages from "@/libs/getMassages"
import MassageCatalog from "@/components/MassageCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import MassagePanel from "@/components/MassagePanel"

export default async function Massage() {

    const massages = await getMassages()

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Massage Shop</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <MassageCatalog massageJson={massages} />
            </Suspense>

            {/* <hr className="my-10"/>
            <h1 className="text-xl font-medium">Try Client-Side Massage Panel</h1>
            <MassagePanel/> */}

        </main>
    )
}