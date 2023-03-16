import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function Header ({toggle, user}) {

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
			<span className="d-inline-block p-1" role="button"
			onClick={toggle}>
				<FontAwesomeIcon icon={['fas', 'bars']} size="xl" />
			</span>

			<div className="navbar-collapse collapse">
				<ul className="navbar-nav navbar-align">
					<li className="nav-item pe-4">
						<a className="nav-icon" href="#">
							<div className="position-relative">
								<FontAwesomeIcon icon={['far', 'bell']} size="xl" />
								<span className="indicator">4</span>
							</div>
						</a>
					</li>
					<li className="nav-item">
						<Link to='/profile' className="nav-link d-sm-inline-block">
							<strong className="text-dark">{user.name}</strong> 
							<img src="img/avatar.png" className="avatar img-fluid rounded ms-2" alt="Charles Hall" />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
    )
};

export default Header;