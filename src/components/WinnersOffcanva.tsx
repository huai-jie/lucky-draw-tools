import { useEffect, useState, useRef, useCallback } from 'react';
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
  onClickExport: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: string;
}

export const WinnersOffcanva: React.FC<Winners> = (props) => {
  const [isExporting, setIsExporting] = useState(false);
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

  const handleClickExport = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    props.onClickExport(e);
    setIsExporting(true);
  };
  useEffect(()=>{
    if(isExporting){
      setTimeout(()=>{
        setIsExporting(false);
      }, 2500)
    }
  },[isExporting])
  return (
    <div
      className="offcanvas offcanvas-end"
      id="winners-offcanvas"
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
        <h2 className="offcanvas-title" id="winners-offcanvas-title">
          Winners
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Table
          value={props.winners}
          isWinner={true}
          onClickRemove={(e, t) => props.onClickRemove(e, t)}
          type={props.type}
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
            handleClickExport(e);
          }}
          className="btn btn-primary"
          disabled={props.winners.length && !isExporting ? false : true}
        >
          {!isExporting ? 'Export to CSV' : ' Exporting ...'}
        </button>
      </div>
    </div>
  );
};
