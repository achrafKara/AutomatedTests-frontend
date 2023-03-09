import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function Header ({toggle}) {

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
						<a className="nav-link d-sm-inline-block" href="#" >
							<span className="text-dark">Achraf Karabila</span> <img src="img/avatar.png" className="avatar img-fluid rounded me-1" alt="Charles Hall" />
						</a>
					</li>
				</ul>
			</div>
		</nav>
    )
};

export default Header;