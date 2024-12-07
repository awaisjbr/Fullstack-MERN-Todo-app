
const Navbar = () => {
  return (
    <div className="flex py-3 flex-wrap justify-around">
      <h1 className="text-xl font-semibold">Todo APP</h1>
      <ul className="flex items-center gap-[40px] text-md">
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}

export default Navbar