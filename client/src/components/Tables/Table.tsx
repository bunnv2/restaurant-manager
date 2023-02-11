import { MouseEvent, useState } from "react"
import Modal from "react-modal"

import { AddReceipt, CloseReceipt } from "components"

import "./styles.scss"

Modal.setAppElement("#root")

type Props = {
  table: {
    number: number
    capacity: string
    isOccupied: boolean
  }
  refetch: () => void
}

const Table = ({ table, refetch }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const { number, isOccupied } = table

  const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <div className="table" onClick={() => setShowModal(true)}>
      <span>{number}</span>
      {isOccupied && <div className="table__occupied" />}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        className="modal"
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <button className="modal__close-button" onClick={closeModal}>
          &times;
        </button>
        {isOccupied ? (
          <CloseReceipt
            tableNumber={number}
            refetch={refetch}
            close={() => setShowModal(false)}
          />
        ) : (
          <AddReceipt
            tableNumber={number}
            refetch={refetch}
            close={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  )
}

export default Table
