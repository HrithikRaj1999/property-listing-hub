interface ModalPropsType {
  showModal: boolean;
  title?: string;
  info?: string;
  okLabel?: string;
  showOkLabel?: boolean;
  cancelLabel?: string;
  showCancelLabel?: boolean;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onOk?: () => void;
  onCancel?: () => void;
}
const Modal = (props: ModalPropsType) => {
  const {
    showModal = false,
    title = "",
    info = "",
    okLabel = "ok",
    showOkLabel = "",
    setShowModal = () => {},
    cancelLabel = "cancel",
    showCancelLabel = "",
    children,
    onOk = () => {},
    onCancel = () => {},
    showHeader = "",
    showFooter = "",
  } = props;

  return showModal ? (
    <dialog className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{info}</p>
        <div className="modal-action">
          {children ? (
            children
          ) : (
            <form method="dialog">
              {showOkLabel ? (
                <button type="submit" onClick={onOk} className="btn">
                  {props.okLabel}
                </button>
              ) : null}
              <button type="button" onClick={onCancel} className="btn">
                {props.cancelLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  ) : null;
};

export default Modal;
