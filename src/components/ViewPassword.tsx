// import { BsEye, BsEyeFill, BsEyeSlash } from "react-icons/bs";

interface CompProps {
	setOpen: any;
	open: boolean;
	styles: string;
}

const ViewPassword: React.FC<CompProps> = ({ setOpen, open, styles }) => {
	const handletoggle = () => {
		setOpen(!open);
	};
	return (
		<div>
			<button
				type="button"
				className={`absolute ${styles}  z-10  w-11 h-10 flex justify-center items-center cursor-pointer `}
				onClick={handletoggle}
			>
				<span className="flex  min-h-[28px] min-w-[28px] max-h-[28px] max-w-[28px] rounded-[8px] justify-center items-center">
					{open ? (
						<img src={`/eyeOpened.png`} alt="" />
					) : (
						<img src={`/eyeclosed.png`} alt="" />
					)}
				</span>
			</button>
		</div>
	);
};

export default ViewPassword;
