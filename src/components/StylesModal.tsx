import { StyleEntries } from './StyleEntries';
import { StylesModalProps } from '../state/type';

export const StylesModal: React.FC<StylesModalProps> = (props) => {
  return (
    <div
      className="modal fade"
      id="styles-modal"
      aria-labelledby="styles-modal-label"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="styles-modal-title">
              Style Customization
            </h2>
            <button
              type="button"
              id="style-modal-close-btn"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <StyleEntries
              onColorChange={(e, t) => props.onColorChange(e, t)}
              onSizeChange={(e, t) => props.onSizeChange(e, t)}
              styles={props.styles}
            />
          </div>
          <div className="modal-footer flex-center">
            <button
              type="button"
              className="btn btn-light btn-md active me-3"
              data-bs-dismiss="modal"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={(e) => {
                props.onClickSaveStyle(e);
              }}
              className="btn btn-primary btn-md active"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
