import { useRef } from "react"
import Banner from "../banner/Banner"
import TraindingList from "../trending/TraindingList"
import CategoryList from "../categories/CategoryList"
import Footer from "../footer/Footer"


const Home = () => {
    const catRef = useRef<HTMLElement>(null)
    return (
        <>
            <Banner catRef={catRef} />
            <TraindingList />
            <CategoryList catRef={catRef} />
            <Footer />
        </>
    )
}

export default Home
