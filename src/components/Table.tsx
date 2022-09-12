import { useEffect, useState } from 'react';
import { PopoverPicker } from '../components/PopOverPicker';
import removeLogo from '~/assets/remove.svg';
import '../style/entries.scss';
import '../style/table.scss';
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

interface TableProps {
  value: Table[] | undefined;
  isWinner?: boolean;
  onPointChange?: (e: React.ChangeEvent<HTMLInputElement>, el: Table) => void;
  onClickRemove?: (e: Table, t: string) => void;
  type?: string;
  handleChangeColor?: (e: string, t: Table) => void;
}

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const [totalChances, setTotalChances] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleClickAdd = () => {
    props.onClickRemove
      ? props.onClickRemove(
          {
            id: nanoid(),
            name: name,
            chance: 1,
            email: '-',
            bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            color: '#fff',
          },
          'add'
        )
      : null;
    setName('');
  };
  useEffect(() => {
    if (props.value) {
      let chances = 0;
      props.value.map((el) => {
        chances += +(el?.chance ?? 1);
      });
      setTotalChances(chances);
    }
  }, [props.value]);
  return (
    <div className="card-body row p-3 px-0 mx-0">
      <div
        className="table-responsive px-0"
        style={{
          height: props.isWinner ? '600px' : '300px',
          overflowY: 'scroll',
        }}
      >
        <table
          className="align-middle dataTable fs-6 gy-5 no-footer table table-row-dashed"
          style={{ border: 'transparent' }}
        >
          <thead>
            <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
              {props.type === 'spin-the-wheel' && !props.isWinner && (
                <th scope="col">Color</th>
              )}
              {props.isWinner && <th scope="col">Round</th>}
              <th scope="col">
                Name
                <span className="badge rounded-pill bg-danger mx-2">
                  {props.value?.length ?? 0}
                </span>
              </th>
              {!props.isWinner && (
                <th
                  scope="col"
                  style={{
                    width: '130px',
                  }}
                >
                  Chance
                </th>
              )}
              {props.type !== 'spin-the-wheel' && <th scope="col">Email</th>}
              {props.isWinner && <th scope="col">Date & Time</th>}
              <th className="text-end" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="fw-bold text-gray-600">
            {props.value?.map((el, index) => {
              return (
                <tr key={`${el?.name}-${index}`}>
                  {props.type === 'spin-the-wheel' && !props.isWinner && (
                    <td>
                      <PopoverPicker
                        color={el.bgColor}
                        onChange={(e: string) =>
                          props.handleChangeColor
                            ? props.handleChangeColor(e, el)
                            : console.log('no props function')
                        }
                      />
                    </td>
                  )}
                  {props.isWinner && <td>{index + 1}</td>}
                  <th
                    scope="row"
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '30px',
                    }}
                  >
                    {el?.name}
                  </th>
                  {!props.isWinner && (
                    <td className="d-flex">
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        value={el?.chance}
                        style={{ marginRight: '5px' }}
                        onChange={(e) =>
                          props.onPointChange
                            ? props.onPointChange(e, el)
                            : null
                        }
                      />
                      <span style={{ fontSize: '13px' }}>
                        (
                        {el?.chance
                          ? (
                              ((el.chance as number) / totalChances) *
                              100
                            ).toFixed()
                          : null}
                        %)
                      </span>
                    </td>
                  )}
                  {props.type !== 'spin-the-wheel' && (
                    <td
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '15px',
                      }}
                    >
                      {el?.email}
                    </td>
                  )}
                  {props.isWinner && (
                    <td
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '30px',
                      }}
                    >
                      {el?.dateTime}
                    </td>
                  )}
                  <td className="text-end">
                    <img
                      src={removeLogo}
                      alt="remove-logo"
                      id="remove-logo"
                      className="svg-icon"
                      onClick={() =>
                        props.onClickRemove
                          ? props.onClickRemove(
                              el,
                              props.isWinner ? 'winners' : 'names'
                            )
                          : null
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!props.isWinner && (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="title"
            value={name}
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          <span
            style={{ background: '#0095E8', color: '#fff', cursor: 'pointer' }}
            className="input-group-text"
            onClick={() => handleClickAdd()}
          >
            Add
          </span>
        </div>
      )}
    </div>
  );
};
