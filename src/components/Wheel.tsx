import { useState, useEffect, TransitionEventHandler } from 'react';
import '../style/wheel.scss';
interface Canvas {
  radius: number;
  textRadius: number;
  textLength: number;
  textDirection: string;
  lineHeight: number;
  borderWidth: number;
  borderColor: string;
  btnText: string;
  btnWidth: number;
  fontSize: number;
}

interface WheelCandidates {
  id: number;
  name: string;
  chance?: string | number;
  email?: string;
  dateTime?: string;
  bgColor: string;
  color: string;
}

interface WheelProps {
  rotate?: () => void;
  onRotateEnd?: () => TransitionEventHandler<HTMLCanvasElement> | undefined;
  candidates?: WheelCandidates[] | undefined;
  rotateEndDeg?: number;
  isRotating?: boolean;
  buttonStyles?: any;
  winner?: WheelCandidates | undefined;
}

export const Wheel: React.FC<WheelProps> = (props) => {
  const [screenwidth, setScreenWidth] = useState<number>();
  useEffect(() => {
    const width = document.body.clientWidth
    setScreenWidth(document.body.clientWidth);
    setCanvasConfig({
      radius: width > 700 ? 280 : 200,
      textRadius: width > 700 ? 240 : 180,
      textLength: 25,
      textDirection: 'vertical',
      lineHeight: 20,
      borderWidth: 5,
      borderColor: '#E4E6EF',
      btnText: 'GO!',
      btnWidth: 140,
      fontSize: 15,
    })
  }, []);
  const [labels, setLabels] = useState<WheelCandidates[]>([
    {
      id: 1, //* The unique id of each prize, an integer greater than 0
      name: 'Blue', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
      bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
      color: '#ffffff', // Font color (this parameter is not required when type is image)
      chance: 1, //* Probability, up to 4 decimal places (the sum of the probabilities of all labels
    },
    {
      id: 2,
      name: 'Red',
      bgColor: '#dd3832',
      color: '#ffffff',
      chance: 1,
    },
    {
      id: 3,
      name: 'Yellow',
      bgColor: '#fef151',
      color: '#ffffff',
      chance: 1,
    },
  ]);

  const [isWinning, setIsWinning] = useState<boolean>(false);

  useEffect(() => {
    if (props.candidates && props.candidates?.length) {
      setLabels(props.candidates);
    }
  }, [props.candidates]);
  useEffect(() => {
    if (labels && labels.length) {
      drawCanvas();
    }
  }, [labels]);
  useEffect(() => {
    if (screenwidth) {
      drawCanvas();
    }
  }, [screenwidth]);
  useEffect(() => {
    if (props.winner && !props.isRotating) {
      setIsWinning(true);
      setTimeout(() => {
        setIsWinning(false);
      }, 3500);
    }
  }, [props.isRotating]);

  const [timingFun, setTimingFun] = useState<string>(
    'cubic-bezier(0.36, 0.95, 0.64, 1)'
  );

  const [duration, setDuration] = useState<number>(5);
  const [canvasConfig, setCanvasConfig] = useState<Canvas>({
    radius: 280,
    textRadius: 240,
    textLength: 25,
    textDirection: 'vertical',
    lineHeight: 20,
    borderWidth: 5,
    borderColor: '#E4E6EF',
    btnText: 'GO!',
    btnWidth: 140,
    fontSize: 15,
  });
  const drawCanvas = () => {
    const canvasEl = document.getElementById('wheel') as HTMLCanvasElement;
    if (canvasEl.getContext) {
      const { radius, textRadius, borderWidth, borderColor, fontSize } =
        canvasConfig;

      const arc = Math.PI / (labels.length / 2);
      const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

      ctx.clearRect(0, 0, radius * 2, radius * 2);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth * 2;

      ctx.font = `${fontSize}px Arial`;
      labels.forEach((row, i) => {
        const angle = i * arc - Math.PI / 2;
        ctx.fillStyle = row.bgColor;
        ctx.beginPath();

        ctx.arc(
          radius,
          radius,
          radius - borderWidth,
          angle,
          angle + arc,
          false
        );
        ctx.stroke();
        ctx.arc(radius, radius, 0, angle + arc, angle, true);
        ctx.fill();

        ctx.save();

        ctx.fillStyle = row.color;

        ctx.translate(
          radius + Math.cos(angle + arc / 2) * textRadius,
          radius + Math.sin(angle + arc / 2) * textRadius
        );

        drawLabelText(ctx, angle, arc, row.name);

        ctx.restore();
      });
    }
  };
  const getStrArray = (str: string, len: number) => {
    const arr = [];
    while (str !== '') {
      let text = str.substr(0, len);
      if (str.charAt(len) !== '' && str.charAt(len) !== ' ') {
        const index = text.lastIndexOf(' ');
        if (index !== -1) text = text.substr(0, index);
      }
      str = str.replace(text, '').trim();
      arr.push(text);
    }
    return arr;
  };

  const drawLabelText = (
    ctx: CanvasRenderingContext2D,
    angle: number,
    arc: number,
    name: string
  ) => {
    const { lineHeight, textLength, textDirection } = canvasConfig;
    const content = getStrArray(name, textLength);
    // const content = labels.map((el)=>el.name);
    if (content === null) return;
    textDirection === 'vertical'
      ? ctx.rotate(angle + arc / 2 + Math.PI)
      : ctx.rotate(angle + arc / 2 + Math.PI / 2);
    content.forEach((text, idx) => {
      let textX = -ctx.measureText(text).width / 2;
      let textY = (idx + 1) * lineHeight;
      if (textDirection === 'vertical') {
        textX = 0;
        textY = (idx + 1) * lineHeight - (content.length * lineHeight) / 2;
      }
      ctx.fillText(text, textX, textY);
    });
  };

  return (
    <div className="mb-20">
      <div className="fw-wrapper">
        <canvas
          id="wheel"
          width={`${canvasConfig.radius * 2}`}
          height={`${canvasConfig.radius * 2}`}
          style={{
            WebkitTransform: `rotateZ(${props.rotateEndDeg}deg)`,
            transform: `rotateZ(${props.rotateEndDeg}deg)`,
            WebkitTransitionDuration: `${props.isRotating ? duration : 0}s`,
            transitionDuration: `${props.isRotating ? duration : 0}s`,
            WebkitTransitionTimingFunction: timingFun,
            transitionTimingFunction: timingFun,
            zIndex: 0,
            opacity: !props.isRotating && isWinning && props.winner ? 0.3 : 1,
          }}
          onTransitionEnd={() =>
            props.onRotateEnd
              ? props.onRotateEnd()
              : console.log('missing props function')
          }
        />
        <div className="fw-btn">
          <div
            className="fw-btn__btn"
            style={
              {
                width: canvasConfig.btnWidth + 'px',
                height: canvasConfig.btnWidth + 'px',
                '--btnColor': props.buttonStyles.color,
                opacity: !props.isRotating && isWinning && props.winner ? 0.3 : 1,
                cursor: !props.isRotating && ! isWinning ? 'pointer' : 'not-allowed',
              } as React.CSSProperties
            }
            onClick={() =>
              props.rotate && !props.isRotating && !isWinning
                ? props.rotate()
                : console.log('missing prop function or rotating')
            }
          >
            {canvasConfig.btnText}
          </div>
        </div>

        <div
          className="fw-winner"
          style={{
            border: '4px solid rgb(170, 187, 204)',
            borderRadius: '7px',
            background: `${props.winner?.bgColor}`,
            width: '300px',
            height: '60px',
            display: `${!props.isRotating && props.winner ? 'block' : 'none'}`
          }}
        >
          <div
            className="fw-winner__name"
            style={{
              borderRadius: '7px',
            }}
          >
            {props.winner?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
