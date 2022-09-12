import { useEffect, useState, useRef, useCallback } from 'react';
import { Entries } from './Entries';
import { Table } from './Table';

interface Table {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
  dateTime?: string;
  bgColor?: string;
  color?: string;
}
interface SettingsOffcanvaProps {
  onClickSave: (e: React.FormEvent<HTMLButtonElement>) => void;
  onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>, arr?: Table[]) => void;
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
export const SettingsOffcanva: React.FC<SettingsOffcanvaProps> = (props) => {
  const [width, setWidth] = useState(400);
  const dragging = useRef(false);
  useEffect(() => {
    const element = document.body;
    // function initResize(e: any) {
    //   setScreenX(Math.abs(e.screenX));
    // }
    if (element) {
      // element.addEventListener('mousemove', initResize, false);
      element.addEventListener('mousemove', handleMouseMove, false);
      element.addEventListener('mouseup', handleMouseUp, false);
    }
  }, []);
  const handleMouseDown = (e: any) => {
    dragging.current = true;
  };
  const handleMouseMove = useCallback((e: any) => {
    if (!dragging.current) {
      return;
    }
    function getWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    }
    const browserWidth = getWidth();
    setWidth(() => {
      return browserWidth - e.clientX;
    });
  }, []);
  const handleMouseUp = useCallback((e: any) => {
    dragging.current = false;
  }, []);
  return (
    <div
      className="offcanvas offcanvas-end"
      id="settings-offcanvas"
      aria-labelledby="settings-offcanvas-label"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      style={{ width: width, minWidth: '400px' }}
    >
      <div>
        <button
          style={{
            position: 'absolute',
            height: '100%',
            padding: '1',
            margin: '0',
            border: 'transparent',
            background: '#F5F8FA',
            cursor: 'col-resize',
          }}
          onMouseDown={(e) => handleMouseDown(e)}
        ></button>
      </div>
      <div className="offcanvas-header">
        <h2 className="offcanvas-title" id="settings-offcanvas-title">
          Settings
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Entries
          onTextAreaChange={(e, arr) => props.onTextAreaChange(e, arr)}
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
          handleChangeColor={(e, t) => props.handleChangeColor(e, t)}
        />
      </div>
      <div className="offcanvas-footer text-center p-15">
        <button
          type="button"
          className="btn btn-light btn-md active me-3"
          data-bs-dismiss="offcanvas"
        >
          Dismiss
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
  );
};
