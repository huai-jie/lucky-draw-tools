import { useEffect, useState, useRef, useCallback } from 'react';
import { StyleEntries } from './StyleEntries';
import { StylesOffcanvaProps } from '../state/type';

export const StylesOffcanva: React.FC<StylesOffcanvaProps> = (props) => {
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
      id="styles-offcanvas"
      aria-labelledby="styles-offcanvas-label"
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
          Styles Customization
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <StyleEntries
          onColorChange={(e, t) => props.onColorChange(e, t)}
          onSizeChange={(e, t) => props.onSizeChange(e, t)}
          styles={props.styles}
        />
      </div>
      <div className="offcanvas-footer text-center p-15">
        <button
          type="button"
          className="btn btn-light btn-md active me-3"
          data-bs-dismiss="offcanvas"
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
  );
};
