import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/">Home</Link>
        <Link to="/todolist/ABC">ABC's To Do List</Link>
        <Link to="/todolist/DEF">DEF's To Do List</Link>
      </nav>
    </div>
  );
};
