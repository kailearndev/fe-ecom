
interface ModalConfirmProps {
    modalRef: React.RefObject<HTMLDialogElement>;
    content: any
}

const ModalConfirm = ({ modalRef, content }: ModalConfirmProps) => {
    return (
        <dialog ref={modalRef} id="modal_payment" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg"></h3>
                <p className="py-4">Quét để thanh toán</p>
                <div className="modal-action flex  justify-center">

                    <div className="">
                        {content}
                    </div>


                </div>
            </div>
        </dialog>
    );
};

export default ModalConfirm;
