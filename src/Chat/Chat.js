import classes from "./Chat.css";
import { FaUserAlt, FaSmile } from "react-icons/fa";
import {
	BsCameraVideoFill,
	BsArrowLeftShort,
	BsFillCameraFill,
} from "react-icons/bs";
import { HiPhone, HiMicrophone, HiLockClosed } from "react-icons/hi";
import { RxDotsVertical } from "react-icons/rx";
import { MdAttachFile, MdSend } from "react-icons/md";
import ChatBody from "./ChatBody/ChatBody";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as contactsActions from "../store/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import test from "../DB/contacts.json";

export default function Chat({ socket, win }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const chatHistory = useSelector((state) => {
		const index = state.contactsSlice.findIndex(
			(cont) => cont.name == localStorage.getItem("contact")
		);
		if (!location.hash) return state.contactsSlice[index].userChatHistory;
		else return state.contactsSlice[index].contactChatHistory;
	});

	const [message, setMessage] = useState(null);

	const [fullChat, setFullChat] = useState(chatHistory);

	const textField = useRef("");

	useEffect(() => {
		if (location.hash) {
			const contact = JSON.parse(localStorage.getItem("selected"));
			socket.emit("join", { name: contact.name });
		}
	}, []);

	useEffect(() => {
		socket.on("receive", (data) => {
			// functional update veryyy important
			setFullChat((prev) => [...prev, { content: data, you: false }]);
		});
	}, [socket]);

	const sendHandler = () => {
		socket.emit("send", { message, name: localStorage.getItem("contact") });
		textField.current.value = "";

		// functional update veryyy important
		setFullChat((prev) => [...prev, { content: message, you: true }]);
	};

	useEffect(() => {
		socket.emit("fullChat", fullChat);
	}, [fullChat]);

	const backHandler = () => {
		win.close();
		navigate(-1);
		dispatch(
			contactsActions.updateChatHistory({
				name: localStorage.getItem("contact"),
				chatHistory: fullChat,
			})
		);
	};

	const [height, setHeight] = useState(window.innerHeight);
	window.onresize = () => {
		setHeight(window.innerHeight);
	};

	return (
		<div className={classes.chat} style={{ height: `${height}px` }}>
			<div className={classes.toolbar}>
				<span
					className={classes.arrow}
					onClick={backHandler}
					style={location.hash ? { opacity: "0" } : null}
				>
					<div className={classes.back}>
						<BsArrowLeftShort />
					</div>
				</span>

				<div className={classes.image}>
					<FaUserAlt />
				</div>

				<span>
					{location.hash
						? localStorage.getItem("user")
						: localStorage.getItem("contact")}
				</span>

				<div className={classes.toolbarIco}>
					<span>
						<BsCameraVideoFill />
					</span>
					<span>
						<HiPhone />
					</span>
					<span>
						<RxDotsVertical />
					</span>
				</div>
			</div>

			<ChatBody fullChat={fullChat} />

			<div className={classes.controls}>
				<div className={classes.message}>
					<span>
						<FaSmile />
					</span>

					<input
						type="text"
						placeholder="Message"
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						ref={textField}
						onKeyUp={(e) => {
							if (e.key === "Enter" && textField.current.value) sendHandler();
						}}
					/>
					<div className={classes.rightItems}>
						<div className={classes.attach}>
							<MdAttachFile />
						</div>

						<div>
							<BsFillCameraFill />
						</div>
					</div>
				</div>

				<span
					className={classes.microSend}
					onClick={textField.current.value ? sendHandler : null}
				>
					{textField.current.value ? <MdSend /> : <HiMicrophone />}
				</span>
			</div>
		</div>
	);
}
