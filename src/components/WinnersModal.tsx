import { Table } from './Table';
interface Table {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
}
interface Winners {
  winners: Table[];
  onClickRemove: (e: Table, t: string) => void;
}

export const WinnersModal: React.FC<Winners> = (props) => {
  return (
    <div
      className="modal fade"
      id="winners-modal"
      aria-labelledby="winners-modal-label"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="winners-modal-title">
              Winners
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Table
              value={props.winners}
              isWinner={true}
              onClickRemove={(e, t) => props.onClickRemove(e, t)}
            />
          </div>
          <div className="modal-footer flex-center">
            <button
              type="button"
              className="btn btn-light btn-md active me-3"
              data-bs-dismiss="modal"
            >
              Dismiss
            </button>
            {/* <button
              type="button"
              // onClick={(e) => {
              //   props.onClickSave(e);
              // }}
              className="btn btn-primary"
            >
              Export to CSV
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
