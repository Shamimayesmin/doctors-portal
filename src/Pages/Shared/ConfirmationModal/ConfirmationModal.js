import React from "react";

const ConfirmationModal = ({title,message ,closeModal,handleDeleteDoctor,modalData,deleteBtnName}) => {
	return (
		<div>
			{/* The button to open modal */}
			

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="confirm-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						{title}
					</h3>
					<p className="py-4">
						{message}
					</p>
					<div className="modal-action">
						<label onClick={() =>handleDeleteDoctor(modalData)} htmlFor="confirm-modal" className="btn btn-primary">
							{deleteBtnName}
						</label>
                        <button onClick={closeModal} className="btn btn-outline">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
