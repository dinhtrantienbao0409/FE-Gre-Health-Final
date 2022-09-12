import { Link } from "react-router-dom";

const NavLink = ({ path, name }) => {
  return (
    <li className="md:ml-8 text-xl md:my-0 my-7">
      <a className="text-white cursor-pointer hover:text-cyan-500 duration-500">
        {path && <Link to={path}>{name}</Link>}
      </a>
    </li>
  );
};

export default NavLink;
