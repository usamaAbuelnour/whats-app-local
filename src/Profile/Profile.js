import classes from "./Profile.css";
import { TbCameraPlus } from "react-icons/tb";
import { FaSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userAction from "../store/userSlice";
import { useEffect, useRef, useState } from "react";

export default function Profile({ socket }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice);
	const [userInfo, setUserInfo] = useState({ name: null, image: null });
	const textField = useRef();

	const clickHandler = () => {
		if (textField.current.value) {
			dispatch(userAction.addName(userInfo.name));
			localStorage.setItem("user", userInfo.name);
		}
	};

	useEffect(() => {
		textField.current.focus();
	});

	const mount = useRef(true);
	useEffect(() => {
		if (mount.current) mount.current = false;
		else {
			socket.emit("initUser", user);
			navigate("/chats");
		}
	}, [user]);

	return (
		<div className={classes.profile}>
			<h3>Profile info</h3>

			<p>Please provide your name and an optional profile photo</p>

			<div className={classes.camera}>
				<TbCameraPlus style={{ fontSize: "60px" }} />
			</div>
			<div className={classes.input}>
				<input
					type="text"
					placeholder="Type your name here"
					ref={textField}
					onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
					onKeyUp={(e) => (e.key === "Enter" ? clickHandler() : null)}
				/>

				<span className={classes.smile}>
					<FaSmile style={{ fontSize: "30px" }} />
				</span>
			</div>

			<button onClick={clickHandler} className={classes.myButton}>
				OK
			</button>
		</div>
	);
}
