import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

interface Table {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
  dateTime?: string;
  bgColor?: string;
  color?: string;
}

interface TextAreaProps {
  onTextAreaChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    arr?: Table[]
  ) => void;
  textAreaNames: string | undefined;
  tableData: Table[]
  type: string;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const [text, setText] = useState<string>();
  const [prevText, setPrevText] = useState<string>();
  const [textLibrary, setTextLibrary] = useState<any[]>();
  const [lineRows, setLineRows] = useState<number[]>([0]);
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setPrevText(text);
    setText(e.target.value);
  };
  const [eventLogs, setEventLogs] = useState<string[]>(['v']);
  const highlightText = (event: any) => {
    let textarea = event.target;
    let selection = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    const selectionStartRow = textarea.value
      .substr(0, textarea.selectionStart)
      .split(/\n/).length;
    const selectionEndRow = textarea.value
      .substr(0, textarea.selectionEnd)
      .split(/\n/).length;
    let arr = [selectionStartRow - 1, selectionEndRow - 1];

    setIsSelecting(true);
    setLineRows(arr);
  };

  const clickHandler = (event: any) => {
    if (isSelecting) return;
    setIsSelecting(false);
    const ta = document.getElementById('ta') as HTMLTextAreaElement;
    const idx =
      ta.innerHTML.substr(0, ta.selectionStart).split(/\n/).length - 1;

    setLineIndex(idx);
    let rows = [idx, idx];

    setLineRows(rows);
    handleShift(event, idx, rows);
  };
  const [ctrlLogs, setCtrlLogs] = useState<boolean[]>([false]);
  const keyUpHandler = (event: any) => {
    let logs = eventLogs.slice(-2);
    logs.push(event.code);
    setEventLogs(logs.slice(-2));

    let clogs = ctrlLogs.slice(-2);
    clogs.push(event.code.includes('Control'));
    setCtrlLogs(clogs);

    const ta = document.getElementById('ta') as HTMLTextAreaElement;
    const idx =
      ta.innerHTML.substr(0, ta.selectionStart).split(/\n/).length - 1;
    if (event.code.includes('Enter')) {
      setLineIndex(lineIndex + 1);
      handleShift(event, lineIndex + 1, lineRows);
    } else {
      setLineIndex(idx);

      handleShift(event, idx, lineRows, logs, clogs);
    }
  };
  const handleShift = (
    e: any,
    idx: number,
    rows: number[],
    logs?: any,
    clogs?: any
  ) => {
    setIsSelecting(false);

    const textvalue = e.target.value;
    const lineIdx = idx;

    const values = textvalue.split('\n');

    const prevValues = prevText?.split('\n') ?? [];
    let erows = rows.slice();

    if (!isSelecting && !clogs?.includes(true)) erows.push(lineIdx);
    else {
      let right = erows[1] < erows[0] ? erows[1] : erows[0];
      let left = right === erows[0] ? erows[1] : erows[1];
      erows = [left, right];
    }
    erows = erows.slice(-2);
    setLineRows(erows);
    let arr = textLibrary?.slice(0) ?? [];
    let info;
    const a = erows[1];
    const b = erows[0];

    if (!e?.code?.includes('Arrow') && !clogs?.includes(true)) {
      if (!arr[0] && a === 0 && b === 0) {
        let info = {
          id: nanoid(),
          name: values[0],
          chance: 1,
          email: '-',
          bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          color: '#fff',
        };
        arr[0] = info;
      }
      if (a === b) {
        arr[a].name = values[a];
      }

      if (a > b) {
        info = {
          id: nanoid(),
          name: '',
          chance: 1,
          email: '-',
          bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          color: '#fff',
        };
        arr.splice(a, 0, info);
      }

      if (a < b && textLibrary) {
        for (let i = b; i > a; i--) {
          arr.splice(i, 1);
        }
      }
    }
    if (values.length > 0) {
      for (let x = 0; x < values.length; x++) {
        if (typeof values[x] !== 'string') arr.splice(x, 1);
        else {
          if (!arr[x]) {
            arr[x] = {
              id: nanoid(),
              name: '',
              chance: 1,
              email: '-',
              bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              color: '#fff',
            };
          }
          arr[x].name = values[x];
        }
      }
    }

    setTextLibrary(
      JSON.parse(JSON.stringify(arr.filter((e, i) => e && i < values.length)))
    );
    props.onTextAreaChange(
      e,
      JSON.parse(JSON.stringify(arr.filter((e, i) => e && i < values.length)))
    );
  };
  useEffect(() => {
    setText(props.textAreaNames);
  }, [props.textAreaNames]);
  useEffect(() => {
    setTextLibrary(props.tableData);
  }, [props.tableData]);
  useEffect(() => {
    const ta = document.getElementById('ta') as HTMLTextAreaElement;
    ta.addEventListener('select', highlightText);

    const removeListeners = () => {
      removeEventListener('select', highlightText);
    };
    return removeListeners;
  }, []);
  return (
    <div className="input-group">
      <textarea
        id="ta"
        className="form-control"
        value={text}
        rows={10}
        onKeyUp={keyUpHandler}
        onClick={clickHandler}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
};
