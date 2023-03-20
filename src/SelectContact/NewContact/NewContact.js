import { RxCross1, RxPerson } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgOrganisation } from "react-icons/cg";
import classes from "./NewContact.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewContact(props) {
	const navigate = useNavigate();
	const [info, setInfo] = useState({ name: null, org: null });

	const [height, setHeight] = useState(window.innerHeight);
	window.onresize = () => {
		setHeight(window.innerHeight);
	};

	return (
		<div className={classes.newcontact} style={{ height: `${height}px` }}>
			<header>
				<span onClick={() => navigate(-1)} className={classes.discard}>
					<RxCross1 />
				</span>

				<span>New Contact</span>

				<span
					className={classes.save}
					style={info.name && info.org ? null : { color: "#8596A0" }}
					onClick={
						info.name && info.org
							? () => {
									props.addContact(info.name);
									navigate("/chats");
							  }
							: null
					}
				>
					<AiOutlineCheck />
				</span>
			</header>
			<div className={classes.photo}>
				<span>
					<FaUserAlt />
				</span>
				<span>Save to Phone</span>
				<span>
					<IoMdArrowDropdown />
				</span>
				<p>Will only be saved on the Phone</p>
			</div>
			<form>
				<div>
					<span>
						<RxPerson />
					</span>
					<input
						type="text"
						placeholder="Name"
						onChange={(e) => setInfo({ ...info, name: e.target.value })}
					/>
				</div>

				<div>
					<span>
						<CgOrganisation />
					</span>
					<input
						type="text"
						placeholder="Organization"
						onChange={(e) => setInfo({ ...info, org: e.target.value })}
					/>
				</div>
			</form>
		</div>
	);
}
