function Navbar({ title, price }) {
    return (<div classNanme="navbar">
        <b>{title} , </b>
        <b> price = {price ? price : "price is not defined"}</b>
        </div>)
}
export default Navba;