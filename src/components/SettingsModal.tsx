import { Entries } from './Entries';
import { Table } from './Table';

interface Table {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
}
interface SettingsModalProps {
  onClickSave: (e: React.FormEvent<HTMLButtonElement>) => void;
  onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveWinnerSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPointChange: (e: React.ChangeEvent<HTMLInputElement>, el: Table) => void;
  onClickRemove: (e: Table, t: string) => void;
  textAreaNames: string | undefined;
  shouldRemoveWinner: boolean;
  title: string;
  fileName: string;
  data: any;
  type: string;
  handleChangeColor: (e: string, t: Table) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  return (
    <div
      className="modal fade"
      id="settings-modal"
      aria-labelledby="settings-modal-label"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="settings-modal-title">
              Settings
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Entries
              onTextAreaChange={(e) => props.onTextAreaChange(e)}
              onTitleChange={(e) => props.onTitleChange(e)}
              onFileChange={(e) => props.onFileChange(e)}
              onRemoveWinnerSwitch={(e) => props.onRemoveWinnerSwitch(e)}
              onPointChange={(e, el) => props.onPointChange(e, el)}
              onClickRemove={(e, t) => props.onClickRemove(e, t)}
              textAreaNames={props.textAreaNames}
              shouldRemoveWinner={props.shouldRemoveWinner}
              title={props.title}
              fileName={props.fileName}
              data={props.data}
              type={props.type}
              handleChangeColor={(e,t)=>props.handleChangeColor(e,t)}
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
                props.onClickSave(e);
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
