import { useState, useRef, useEffect } from 'react';
import '../style/entries.scss';
import '../style/picker.scss';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { StyleEntriesProps } from '../state/type';

export const StyleEntries: React.FC<StyleEntriesProps> = (props) => {
  const [isTitleColorOpen, setIsTitleColorOpen] = useState(false);
  const [isBtnColorOpen, setIsBtnColorOpen] = useState(false);
  const [isBgColorOpen, setIsBgColorOpen] = useState(false);
  const tileColorBtnRef = useRef<HTMLButtonElement>(null);
  const btnColorcBtnRef = useRef<HTMLButtonElement>(null);
  const bgColorBtnRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   const closeColorInput = (e: any) => {
  //     console.log(e.path[0]);
  //     if (
  //       e.path[0] !== colorBtnRef.current
  //        && e.path[0].value !== props.styles.titleColor
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.body.addEventListener('click', closeColorInput);
  //   return () => document.body.removeEventListener('click', closeColorInput);
  // }, []);

  return (
    <div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title-color" className="form-label d-block mb-0">
            Title Color
          </label>
        </div>
        <div className="input-group">
          <button
            className="color-picker-button col-3 d-flex"
            ref={tileColorBtnRef}
            style={{
              height: '38px',
              width: '38px',
              backgroundColor: `${props.styles.titleColor}`,
              border: `1px solid #E4E6EF`,
            }}
            onClick={() => setIsTitleColorOpen((prev) => !prev)}
          ></button>
          <HexColorInput
            color={props.styles.titleColor}
            className="col-9 form-control"
            onChange={(e) => props.onColorChange(e, 'title')}
            placeholder="Type a color"
            prefixed
            alpha
            style={{ height: '38px' }}
          />
        </div>
        <section
          className={
            'resposive example ' + (isTitleColorOpen ? 'open' : 'closed')
          }
        >
          <HexColorPicker
            color={props.styles.titleColor}
            onChange={(e) => props.onColorChange(e, 'title')}
          />
        </section>
      </div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="tilte-font-size" className="form-label d-block mb-0">
            Title Font Size
          </label>
        </div>
        <div className="d-flex range-size">
          <input
            type="range"
            className="form-range"
            id="title-font-size-range"
            value={props.styles.titleSize}
            min={5}
            max={120}
            onChange={(e) => props.onSizeChange(e, 'title')}
            style={{ maxWidth: '200px' }}
          />
          <div>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="title-font-size-number"
                value={props.styles.titleSize}
                min={5}
                max={120}
                onChange={(e) => props.onSizeChange(e, 'title')}
              />
              <span className="input-group-text">px</span>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title-color" className="form-label d-block mb-0">
            Button Color
          </label>
        </div>
        <div className="input-group">
          <button
            className="color-picker-button col-3 d-flex"
            ref={btnColorcBtnRef}
            style={{
              height: '38px',
              width: '38px',
              backgroundColor: `${props.styles.buttonColor}`,
              border: `1px solid #E4E6EF`,
            }}
            onClick={() => setIsBtnColorOpen((prev) => !prev)}
          ></button>
          <HexColorInput
            color={props.styles.buttonColor}
            className="form-control"
            onChange={(e) => props.onColorChange(e, 'button')}
            placeholder="Type a color"
            prefixed
            alpha
            style={{ height: '38px' }}
          />
        </div>
        <section
          className={
            'resposive example ' + (isBtnColorOpen ? 'open' : 'closed')
          }
        >
          <HexColorPicker
            color={props.styles.buttonColor}
            onChange={(e) => props.onColorChange(e, 'button')}
          />
        </section>
      </div>
      <div className="form-group col-12 mb-6">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title-color" className="form-label d-block mb-0">
            Background Color
          </label>
        </div>
        <div className="input-group">
          <button
            className="color-picker-button col-3 d-flex"
            ref={bgColorBtnRef}
            style={{
              height: '38px',
              width: '38px',
              backgroundColor: `${props.styles.backgroundColor}`,
              border: `1px solid #E4E6EF`,
            }}
            onClick={() => setIsBgColorOpen((prev) => !prev)}
          ></button>
          <HexColorInput
            color={props.styles.backgroundColor}
            className="col-9 form-control"
            onChange={(e) => props.onColorChange(e, 'backgorund')}
            placeholder="Type a color"
            prefixed
            alpha
            style={{ height: '38px' }}
          />
        </div>
        <section
          className={'resposive example ' + (isBgColorOpen ? 'open' : 'closed')}
        >
          <HexColorPicker
            color={props.styles.backgroundColor}
            onChange={(e) => props.onColorChange(e, 'background')}
          />
        </section>
      </div>
    </div>
  );
};
