"use strict";

import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="w-[25.6rem] border pt-12">
      <nav>
        <ul className="flex flex-col gap-12 mx-8 text-text-foreground">
          <li>
            <Link> Dashboard </Link>
          </li>
          <li>
            <Link>Users</Link>
          </li>
          <li>
            <Link>Orders</Link>
          </li>
          <li>
            <Link>Bookings</Link>
          </li>
          <li>
            <Link>Complaints</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;