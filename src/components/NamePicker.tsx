import reactLogo from '~/assets/react.svg';
import '../style/picker.scss';
import { StylesModal } from './StylesModal';

interface Table {
  id: number;
  name: string;
  chance?: string | number;
  email: string;
  dateTime?: string;
}

interface NamePickerProps {
  candidates?: Table[] | undefined;
  buttonStyles?: any;
  spin?: () => void;
  isRotating?: boolean;
}

export const NamePicker: React.FC<NamePickerProps> = (props) => {
  return (
    <div
      className="d-flex"
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className="card"
        style={{
          height: '200px',
          overflow: 'hidden',
          border: '2px solid #D3D3D3	',
          borderRadius: '10px',
          borderWidth: '0.5em',
          minWidth: '300px',
          maxWidth: '800px',
          width: '95%',
          textAlign: 'center',
        }}
      >
        <div className="reel"></div>
      </div>

      <button
        className="solid-button"
        id="draw-button"
        onClick={() => (props.spin ? props.spin() : console.log('error'))}
        style={{
          backgroundColor: props.buttonStyles.color,
          opacity: props.isRotating ? 0.7 : 1,
          cursor: props.isRotating ? 'not-allowed' : 'pointer',
        }}
        disabled={props.isRotating}
      >
        Draw
      </button>
    </div>
  );
};
