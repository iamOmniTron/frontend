import { Modal } from "antd";





export default function PopupModal({title,open,closeHandler,children,...rest}){

    return(
        <Modal title={title} open={open} onCancel={closeHandler} footer={null} {...rest}>
            {children}
        </Modal>
    )
}