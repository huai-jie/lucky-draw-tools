import fullScreenLogo from '~/assets/fullscreen.svg';
import settingsLogo from '~/assets/settings.svg';
import paletteLogo from '~/assets/palette.svg';
import resultsLogo from '~/assets/results.svg';
import mutedLogo from '~/assets/muted.svg';
import unmuteLogo from '~/assets/unmute.svg';
import { useEffect, useState } from 'react';

interface HeaderProps {
  muted?: boolean;
  onSpeakerChange: () =>void;
  isRotating?: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [screenwidth, setScreenWidth] = useState<number>();
  useEffect(() => {
    setScreenWidth(document.body.clientWidth);
  }, []);
  const handleClickFullScreen = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    // Click handler for "Fullscreen" button
    let elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen();
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        justifyContent: 'end',
        width: screenwidth && screenwidth > 700 ? `${screenwidth-25}px` : '100%',
        maxWidth: '1800px',
      }}
    >
      <img
        src={fullScreenLogo}
        alt="full-screen-logo"
        height="30px"
        style={{ margin: '15px', cursor: props.isRotating ? 'not-allowed' :'pointer', opacity: props.isRotating ? 0.5 : 1,}}
        id="full-screen-logo"
        onClick={(e) => !props.isRotating ? handleClickFullScreen(e) : console.log('rotating')}
      />
      {/* <img
        src={settingsLogo}
        alt="settings-logo"
        height="30px"
        style={{ margin: '15px', cursor: 'pointer' }}
        id="settings-logo"
        data-bs-toggle="modal"
        data-bs-target="#settings-modal"
      /> */}
      <img
        src={settingsLogo}
        alt="settings-logo"
        height="30px"
        style={{ margin: '15px', cursor: props.isRotating ? 'not-allowed' :'pointer', opacity: props.isRotating ? 0.5 : 1,}}
        id="settings-logo"
        data-bs-toggle="offcanvas"
        data-bs-target={!props.isRotating ? '#settings-offcanvas' : ''}
        aria-controls="settings-offcanvas"
      />
      <img
        src={paletteLogo}
        alt="palette-logo"
        height="30px"
        style={{ margin: '15px', cursor: props.isRotating ? 'not-allowed' :'pointer', opacity: props.isRotating ? 0.5 : 1,}}
        id="pallete-logo"
        data-bs-toggle="offcanvas"
        data-bs-target={!props.isRotating ? '#styles-offcanvas' : ''}
      />
      <img
        src={resultsLogo}
        alt="results-logo"
        height="30px"
        style={{ margin: '15px', cursor: props.isRotating ? 'not-allowed' :'pointer', opacity: props.isRotating ? 0.5 : 1,}}
        id="results-logo"
        data-bs-toggle="offcanvas"
        data-bs-target={!props.isRotating ? '#winners-offcanvas' : ''}
      />
      <img
        src={props.muted ? mutedLogo : unmuteLogo}
        alt="speaker-logo"
        height="30px"
        style={{ margin: '15px', cursor: props.isRotating ? 'not-allowed' :'pointer', opacity: props.isRotating ? 0.5 : 1,}}
        id="speaker-logo"
        onClick={()=> !props.isRotating ? props.onSpeakerChange() : console.log('rotating')}
      />
    </div>
  );
};
