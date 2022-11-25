import { Link } from "react-router-dom";

const SideLink = ({ path, name }) => {
  return (
    <div>
      <div className="text-white cursor-pointer hover:text-cyan-500 duration-500">
        {path && <Link to={path}>{name}</Link>}
      </div>
    </div>
  );
};

export default SideLink;
