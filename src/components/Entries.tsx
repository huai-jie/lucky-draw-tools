import { useEffect, useState } from 'react';
import '../style/entries.scss';
import '../style/picker.scss';
import { Table } from './Table';
import { TextArea } from './Textarea';
import uploadLogo from '~/assets/upload.svg';
import tableLogo from '~/assets/table.svg';
import textLogo from '~/assets/text.svg';

interface Data {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
  dateTime?: string;
  bgColor?: string;
  color?: string;
}
interface EntriesProps {
  onTextAreaChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    arr?: Data[]
  ) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveWinnerSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPointChange: (e: React.ChangeEvent<HTMLInputElement>, el: Data) => void;
  onClickRemove: (e: Data, t: string) => void;
  textAreaNames: string | undefined;
  shouldRemoveWinner: boolean;
  title: string;
  fileName: string;
  data: Data[];
  type: string;
  handleChangeColor: (e: string, t: Data) => void;
}

export const Entries: React.FC<EntriesProps> = (props) => {
  useEffect(() => {
    // const uploadFileInput = document.getElementById('upload-file');
    // const uploadBtn = document.getElementById('upload-button');
    // console.log(uploadFileInput, uploadBtn);
    // uploadBtn?.addEventListener('click', function () {
    //   console.log('rets');
    //   uploadFileInput?.click();
    // });
    // return uploadBtn?.removeEventListener('click', function () {
    //   uploadFileInput?.click();
    // });
  }, []);
  const [isTableMode, setIsTableMode] = useState(false);
  const handleClickUpload = () => {
    const uploadFileInput = document.getElementById('upload-file');
    uploadFileInput && uploadFileInput.click();
  };
  const handleClickMode = () => {
    setIsTableMode(!isTableMode);
    console.log('tablemode', isTableMode);
  };
  return (
    <div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title" className="form-label d-block mb-0">
            Title
          </label>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="title"
            value={props.title}
            placeholder="Lucky Draw"
            onChange={(e) => props.onTitleChange(e)}
          />
        </div>
      </div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title" className="form-label d-block mb-0">
            Entries
          </label>
          <section>
            <input
              className="form-control"
              type="file"
              accept=".csv"
              id="upload-file"
              onChange={(e) => props.onFileChange(e)}
              hidden
            />
            <button
              id="upload-button"
              className="btn btn-link btn-sm active mx-5"
              onClick={() => handleClickUpload()}
            >
              <img
                src={uploadLogo}
                alt="upload-logo"
                height="14px"
                style={{
                  paddingRight: '5px',
                  cursor: 'pointer',
                }}
                id="upload-logo"
              />
              Upload CSV file
            </button>
            <button
              id="mode-button"
              className="btn btn-link btn-sm active"
              onClick={() => handleClickMode()}
            >
              <img
                src={isTableMode ? textLogo : tableLogo}
                alt="mode-logo"
                height="14px"
                style={{
                  paddingRight: '5px',
                  cursor: 'pointer',
                }}
                id="mode-logo"
              />
              {isTableMode ? 'Texts' : 'Table'} mode
            </button>
          </section>
        </div>
        {!isTableMode && (
          // <div className="input-group">
          //   <textarea
          //     className="form-control"
          //     id="names-text-area"
          //     rows={10}
          //     value={props.textAreaNames}
          //     onChange={(e) => props.onTextAreaChange(e)}
          //   ></textarea>
          // </div>
          <TextArea
            textAreaNames={props.textAreaNames}
            type={props.type}
            onTextAreaChange={(e, arr) => props.onTextAreaChange(e, arr)}
            tableData={props.data}
          />
        )}
      </div>
      {props.type !== 'spin-the-wheel' && (
        <section style={{ display: 'none' }}>
          <div className="form-group col-12 mb-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label htmlFor="title" className="form-label d-block mb-0">
                Import names from CSV file [max-size: 5MB]
              </label>
            </div>
            <div className="input-group">
              {/* <p className="m-0 p-0">
                <button
                  type="button"
                  id="upload-button"
                  className="btn btn-primary btn-sm active"
                >
                  CHOOSE A FILE
                </button>
                <span id="custom-text">
                  {props.fileName || 'No file chosen, yet.'}
                </span>
              </p> */}
            </div>
          </div>
        </section>
      )}
      {isTableMode && (
        <div className="row" style={{ marginTop: '-30px' }}>
          <Table
            value={props.data}
            onClickRemove={(e, t) => props.onClickRemove(e, t)}
            onPointChange={(e, el) => props.onPointChange(e, el)}
            type={props.type}
            handleChangeColor={(e, t) => props.handleChangeColor(e, t)}
          />
        </div>
      )}
      <div className="separator separator-dashed my-3"></div>
      <div className="form-group col-12 mb-6">
        <div className="form-check form-switch form-check-custom form-check-solid">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={props.shouldRemoveWinner}
            onChange={(e) => props.onRemoveWinnerSwitch(e)}
            style={{ width: '50px', height: '30px', marginRight: '7px' }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Remove winner from list
          </label>
        </div>
      </div>
    </div>
  );
};
