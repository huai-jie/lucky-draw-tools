import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Table } from './Table';
import { NamePicker } from './NamePicker';
// import { SettingsModal } from './SettingsModal';
import { SettingsOffcanva } from './SettingsOffcanva';
// import { StylesModal } from './StylesModal';
import { StylesOffcanva } from './StylesOffcanva';
// import { WinnersModal } from './WinnersModal';
import { WinnersOffcanva } from './WinnersOffcanva';
import { Header } from './Header';
import { Modal, Offcanvas } from 'bootstrap';
import { Styles } from '../state/type';

import confetti from 'canvas-confetti';
import React from 'react';
import { play, pause } from '../assets/js/useAudioEffect';
import rollingEffect from '../assets/sounds/rolling.mp3';
import winningEffect from '../assets/sounds/winner.mp3';
declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}
interface CSV {
  data: object[];
  meta: {
    fields?: string[];
  };
}

interface Table {
  id: number | string;
  name: string;
  chance?: string | number;
  email: string;
  dateTime?: string;
  bgColor?: string;
  color?: string;
}

interface AnimateFilter {
  easing?: string | string[] | undefined;
  offset?: number | Array<number | null> | null | undefined;
  opacity?: number | number[] | undefined;
  transform?: string | string[] | undefined;
  filter: string | string[] | undefined;
}

interface NamePicker {
  title: string;
  shouldRemoveWinner: boolean;
  fileName: string;
}

interface TitleStyles {
  color: string;
  size: number;
}

interface BaseLayoutProps {
  children: JSX.Element;
  type: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const [namePicker, setNamePicker] = useState<NamePicker>({
    title: 'Lucky Draw',
    shouldRemoveWinner: true,
    fileName: '',
  });
  const [titleStyles, setTitleStyles] = useState<TitleStyles>({
    color: '#aabbcc',
    size: 62,
  });
  const [buttonStyles, setButtonStyles] = useState({
    color: '#bcde0d',
  });
  const [textAreaNames, setTextAreaNames] = useState<string>();
  const [title, setTitle] = useState<string>('Lucky Draw');
  const [data, setData] = useState<Table[] | undefined>();
  const [candidates, setCandidates] = useState<Table[] | undefined>();
  const [winner, setWinner] = useState<Table>();
  const [winnerList, setWinnerList] = useState<Table[]>([]);
  const [shouldRemoveWinner, setShouldRemoveWinner] = useState<boolean>(true);
  const [havePreviousWinner, setHavePreviousWinner] = useState<boolean>(false);
  const [fileName, setFileName] = useState<any>();
  const [confettiAnimationId, setConfettiAnimationId] = useState<any>();
  const [tadaAnimate, setTadaAnimate] = useState<any>();
  const [styles, setStyles] = useState<Styles>({
    titleColor: '#aabbcc',
    titleSize: 62,
    buttonColor: '#bcde0d',
    backgroundColor: '#fff',
  });
  useEffect(() => {
    const settingsModalElem = document.getElementById('settings-modal');
    settingsModalElem?.addEventListener('hidden.bs.modal', () => {
      const candidatesName = candidates?.map((el) => el.name);
      setTextAreaNames(
        candidatesName?.length ? candidatesName?.join('\n') : ''
      );
      setShouldRemoveWinner(namePicker.shouldRemoveWinner);
      setTitle(namePicker.title);
      setFileName(namePicker.fileName);
      setData(candidates);
    });
  }, [namePicker]);

  useEffect(() => {
    if (
      winner &&
      namePicker.shouldRemoveWinner &&
      props.type !== 'spin-the-wheel'
    ) {
      removeWinner();
    }
  }, [winner]);

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    t: string
  ) => {
    let sizeInput = +e.target.value < 5 ? 5 : +e.target.value;
    sizeInput = +e.target.value > 120 ? 120 : +e.target.value;
    setStyles({
      titleColor: styles.titleColor,
      titleSize: t === 'title' ? sizeInput : styles.titleSize,
      buttonColor: styles.buttonColor,
      backgroundColor: styles.backgroundColor,
    });
  };

  const CONFETTI_COLORS = [
    '#26ccff',
    '#a25afd',
    '#ff5e7e',
    '#88ff5a',
    '#fcff42',
    '#ffa62d',
    '#ff36ff',
  ];

  const confettiCanvas = document.getElementById('confetti-canvas') as
    | HTMLCanvasElement
    | undefined;
  /** Confeetti animation instance */
  const customConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  /** Triggers cconfeetti animation until animation is canceled */
  const confettiAnimation = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;
    const confettiScale = Math.max(0.5, Math.min(1, windowWidth / 1100));

    customConfetti({
      particleCount: 3,
      gravity: 0.8,
      spread: 90,
      origin: { y: 0.6 },
      colors: [
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      ],
      scalar: confettiScale,
    });

    setConfettiAnimationId(window.requestAnimationFrame(confettiAnimation));
  };

  const handleRemoveWinnerSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShouldRemoveWinner(!shouldRemoveWinner);
  };

  const shuffleDeck = async (array?: Table[]) => {
    const result = [];
    if (array) {
      const keys = Object.keys(array) as unknown[] as number[];
      for (let k = 0, n = keys.length; k < array.length && n > 0; k += 1) {
        // randomize the key value
        // pipeline <bitwise or> to convert floating point to interger
        const i = (Math.random() * n) | 0;
        const key = keys[i];
        result.push(array[key]);
        n -= 1;
        // To standardize the duplicates in deck
        const temp = keys[n];
        keys[n] = key;
        keys[i] = temp;
      }
    }
    return result;
  };

  /** Function to stop the winning animation */
  const stopWinningAnimation = () => {
    window.cancelAnimationFrame(confettiAnimationId);
  };

  const onSpinStart = () => {
    if (tadaAnimate) tadaAnimate.pause();
    stopWinningAnimation();
    // drawButton.disabled = true;
    // settingsButton.disabled = true;
    // soundEffects.spin((MAX_REEL_ITEMS - 1) / 10);
    setIsRotating(true);
    console.log('start spin...');
  };

  const tadaAnimation = (elem: any) => {
    var keyframes = [
      { transform: 'scale3d(1, 1, 1)', offset: 0 },
      {
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.1,
      },
      {
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.2,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.3,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.4,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.5,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.6,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.7,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        offset: 0.8,
      },
      {
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.9,
      },
      { transform: 'scale3d(1, 1, 1)', offset: 1 },
    ];
    var timing = { duration: 900, iterations: Infinity };
    return elem.animate(keyframes, timing);
  };

  /**  Functions to be trigger after spinning */
  const onSpinEnd = async () => {
    await pause('rolling-audio');
    const reelContainer = document.querySelector('.reel');
    setTadaAnimate(tadaAnimation(reelContainer));
    confettiAnimation();
    await play('winning-audio');
    // sunburstSvg.style.display = 'block';
    // await soundEffects.win();
    // drawButton.disabled = false;
    // settingsButton.disabled = false;
    setIsRotating(false);
    console.log('end spin');
  };

  const removeWinner = async () => {
    const remain = candidates
      ?.filter((e) => e.id !== winner?.id)
      ?.map((el) => el?.name);
    if (remain) {
      setCandidates(candidates?.filter((e) => e.id !== winner?.id));
      setTextAreaNames(remain.join('\n'));
      setData(candidates?.filter((e) => e.id !== winner?.id));
    }
  };
  /**
   * Function for spinning the slot
   * @returns Whether the spin is completed successfully
   */
  const maxDeckSize = 40;
  const spin = async (): Promise<boolean> => {
    if (candidates && candidates?.length > 0) {
      await play('rolling-audio');
    }
    const reelContainer = document.querySelector('.reel');
    const reelAnimation = reelContainer?.animate(
      [
        { transform: 'none', filter: 'blur(0)' } as AnimateFilter,
        { filter: 'blur(1px)', offset: 0.5 },
        // Here we transform the reel to move up and stop at the top of last item
        // "(Number of item - 1) * height of reel item" of wheel is the amount of pixel to move up
        // 7.5rem * 16 = 120px, which equals to reel item height
        {
          transform: `translateY(-${(maxDeckSize - 1) * (7.5 * 16)}px)`,
          filter: 'blur(0)',
        },
      ],
      {
        duration: maxDeckSize * 100, // 100ms for 1 item
        easing: 'ease-in-out',
        iterations: 1,
      }
    );
    // if (!this.nameList.length) {
    //   console.error('Name List is empty. Cannot start spinning.');
    //   return false;
    // }

    if (!reelContainer || !reelAnimation) {
      return false;
    }

    onSpinStart();

    if (!candidates?.length) {
      setIsRotating(false);
      // new Modal(document.getElementById('settings-modal') as Element).show();
      new Offcanvas(
        document.getElementById('settings-offcanvas') as Element
      ).show();
      return false;
    }

    // Shuffle names and create reel items
    let randomNames = await shuffleDeck(candidates);
    while (randomNames?.length && randomNames.length < maxDeckSize) {
      randomNames = [...randomNames, ...randomNames];
    }

    randomNames = randomNames?.slice(
      0,
      maxDeckSize - Number(havePreviousWinner)
    );

    const fragment = document.createDocumentFragment();

    let deck = new Array();
    candidates?.map((el) => {
      const arr = new Array(el.chance).fill(el.id);
      deck = [...deck, ...arr];
    });
    const winnerId = deck[Math.floor(Math.random() * deck.length)];
    const lastResult = randomNames[randomNames.length - 1];
    const newResult = randomNames.filter((e) => e.id !== lastResult.id);
    const winnerIndex = newResult.findIndex((e) => e.id === winnerId);
    const winnerInfo = candidates?.find((el) => el.id === winnerId);
    if (winnerIndex !== -1) {
      for (let j = 0; j < randomNames.length; j++) {
        if (randomNames[j]?.id === winnerId) {
          randomNames[j] = { ...lastResult };
          continue;
        }
        if (randomNames[j]?.id === lastResult?.id && winnerInfo) {
          randomNames[j] = { ...winnerInfo };
          continue;
        }
      }
    } else {
      for (let j = 0; j < randomNames.length; j++) {
        if (randomNames[j]?.id === lastResult?.id && winnerInfo) {
          randomNames[j] = winnerInfo;
        }
      }
    }

    randomNames?.forEach((el) => {
      const newReelItem = document.createElement('div');
      newReelItem.classList.add('reel-item');
      newReelItem.innerHTML = el.name;
      fragment.appendChild(newReelItem);
    });

    reelContainer.appendChild(fragment);
    const preWinner = randomNames[randomNames.length - 1];
    setWinner(preWinner);
    setWinnerList(() => {
      const list = winnerList?.filter((w: any) => w?.id !== preWinner?.id);
      const d = new Date();
      let text = d.toLocaleString('en-GB');
      preWinner.dateTime = text;
      preWinner && list.push(preWinner);
      return list;
    });

    setHavePreviousWinner(true);

    // Play the spin animation
    const animationPromise = new Promise((resolve) => {
      reelAnimation.onfinish = resolve;
    });

    reelAnimation.play();

    await animationPromise;

    reelAnimation.finish();

    Array.from(reelContainer.children)
      .slice(0, reelContainer.children.length - 1)
      .forEach((element) => element.remove());

    onSpinEnd();

    return true;
  };
  const [rotateEndDeg, setRotateEndDeg] = useState<number>(0);
  const rotate = () => {
    if (!candidates?.length) {
      // new Modal(document.getElementById('settings-modal') as Element).show();
      new Offcanvas(
        document.getElementById('settings-offcanvas') as Element
      ).show();
      return false;
    }
    stopWinningAnimation();
    setIsRotating(true);
    onRotateStart();
  };

  const getRandomLabel = (): number => {
    let deck = new Array();
    candidates?.map((el) => {
      const arr = new Array(el.chance).fill(el.id);
      deck = [...deck, ...arr];
    });
    const winnerId = deck[Math.floor(Math.random() * deck.length)];
    let winnerInfo = candidates?.find((el) => el.id === winnerId);
    setWinner(winnerInfo);
    setWinnerList(() => {
      const list = winnerList?.filter((w: any) => w?.id !== winnerInfo?.id);
      const d = new Date();
      let text = d.toLocaleString('en-GB');
      if (winnerInfo) {
        winnerInfo.dateTime = text;
        list.push(winnerInfo);
      }
      return list;
    });

    return winnerId;
  };
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [angleBase, setAngleBase] = useState<number>(10);
  const getTargetDeg = (selectedLabelId: number): number => {
    const angle = candidates ? 360 / candidates.length : 0;
    const num = candidates?.findIndex((row) => row.id === selectedLabelId);
    return 360 - (angle * (num || 0) + angle / 2);
  };

  const onRotateStart = async (): Promise<void> => {
    const selectedId = getRandomLabel();
    let angle = angleBase * 360;
    if (angleBase < 0) angle -= 360;
    await play('rolling-audio');
    setRotateEndDeg(angle + getTargetDeg(selectedId));
  };

  const onRotateEnd = async (): Promise<void> => {
    setIsRotating(false);
    const nameContainer = document.querySelector('.fw-winner__name');
    setTadaAnimate(tadaAnimation(nameContainer));
    confettiAnimation();
    await pause('rolling-audio');
    await play('winning-audio');
    let deg = rotateEndDeg;
    setRotateEndDeg((deg %= 360));
  };

  const handleClickSave = async (e: React.FormEvent<HTMLButtonElement>) => {
    setCandidates(data);
    setNamePicker({
      title: title,
      shouldRemoveWinner: shouldRemoveWinner,
      fileName: fileName ?? '',
    });
    setHavePreviousWinner(false);

    Offcanvas.getInstance(
      document.getElementById('settings-offcanvas') as HTMLElement
    )?.hide();
    // Modal.getInstance(
    //   document.getElementById('settings-modal') as HTMLElement
    // )?.hide();
  };

  const handleClickSaveStyles = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    setTitleStyles({
      color: styles.titleColor,
      size: styles.titleSize,
    });
    setButtonStyles({
      color: styles.buttonColor,
    });

    document.body.style.backgroundColor = styles.backgroundColor;

    // Modal.getInstance(
    //   document.getElementById('styles-modal') as HTMLElement
    // )?.hide();
    Offcanvas.getInstance(
      document.getElementById('styles-offcanvas') as HTMLElement
    )?.hide();
  };

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    arr?: Table[]
  ) => {
    let textValue = e.target.value;
    if (
      props.type === 'spin-the-wheel' &&
      e.target.value &&
      e.target.value?.split('\n').length > 36
    ) {
      alert('A wheel can show up to 36 slices only');
      textValue = e.target.value
        ?.split('\n')
        .filter((e, i) => i < 36)
        .join('\n');
    }
    setTextAreaNames(textValue);
    // const transformed = transform(textValue.split('\n'));
    if (arr) setData(arr);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const validNameKeys = (fields: string[]) => {
    const nameFields = fields.filter(
      (el) =>
        el === 'first_name' ||
        el === 'name' ||
        el === 'fname' ||
        el === 'first name'
    );
    !nameFields.length &&
      alert('the CSV file should have one column called "Name"');
    return nameFields;
  };

  const validChanceKeys = (fields: string[]) => {
    const chanceFields = fields.filter(
      (el) => el === 'chance' || el === 'points'
    );
    return chanceFields;
  };

  const setNamesFromCSV = (csvNames: string[]) => {
    setTextAreaNames(csvNames.join('\n'));
  };

  const transform = (data: object[] | string[], keyFields?: string[]) => {
    const nameKey = keyFields ? keyFields[0] : null;
    const chanceKey = keyFields ? keyFields[1] : null;
    const emailKey = keyFields ? keyFields[2] : null;
    const transfomred = data.map(
      (t: object | string, index): Table => ({
        id: index,
        name: typeof t === 'object' ? t[nameKey as keyof object] : t,
        chance: t[chanceKey as keyof object] ?? 1,
        email: t[emailKey as keyof object] ?? '-',
        bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        color: '#fff',
      })
    );
    transfomred[0].name === '' &&
      transfomred.length === 1 &&
      transfomred.shift();
    return transfomred;
  };

  const setCSVData = (data: object[], keyFields: string[]) => {
    function toLowerKeys(obj: object) {
      return Object.keys(obj).reduce((accumulator: object, key: string) => {
        accumulator[key.toLowerCase() as keyof object] =
          obj[key as keyof object];
        return accumulator;
      }, {});
    }

    const transformed = transform(
      data.map((el) => toLowerKeys(el)),
      keyFields
    );
    setData(transformed);
    setNamesFromCSV(transformed.map((el) => el.name));
  };

  const handleUploadedFile = (results: CSV) => {
    const { data } = results;
    const { meta } = results;
    if (meta?.fields) {
      const { fields } = meta;
      const lowerCaseFields = fields.map((el) => el.toLocaleLowerCase());
      const [nameKey] = validNameKeys(lowerCaseFields);
      const [chanceKey] = validChanceKeys(lowerCaseFields);
      const emailKey = 'email';
      const keyFields = [nameKey, chanceKey, emailKey];
      const csvData = data.filter(
        (el: any) => Object.keys(el).length === fields.length
      );
      nameKey && setCSVData(csvData, keyFields);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const size = (e.target.files[0].size / 1024 / 1024).toFixed(2);
      if (+size > 5) {
        alert('The csv file should not greater than 5 MB');
        return (e.target.value = '');
      }

      const config = {
        header: true,
        dynamicTyping: true,
        complete: (results: CSV) => {
          if (results) handleUploadedFile(results);
        },
      };
      Papa.parse(e.target.files[0], config);
      setFileName(e.target.files[0].name);
      e.target.value = '';
    }
  };

  const handleColorChange = (e: string, t: string) => {
    setStyles({
      titleColor: t === 'title' ? e : styles.titleColor,
      titleSize: styles.titleSize,
      buttonColor: t === 'button' ? e : styles.buttonColor,
      backgroundColor: t === 'background' ? e : styles.backgroundColor,
    });
  };

  const handlePointChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    el: Table
  ) => {
    let tempData = data?.slice();
    let key = 0;
    if (tempData) key = tempData?.findIndex((a) => a.id === el.id);
    if (key !== -1 && tempData) tempData[key].chance = +e.target.value;
    tempData && setData(tempData);
  };

  const handleClickRemove = (e: Table, t: string) => {
    switch (t) {
      case 'winners': {
        const confirmed = confirm('Are you sure want to delete this record?');
        if (confirmed) {
          const temp = winnerList?.filter((el) => el.id !== e.id);
          setWinnerList(temp);
        }
        return;
      }
      case 'add': {
        const temp = data?.slice() ?? [];
        temp?.push(e);
        setData(temp);
        temp && setNamesFromCSV(temp.map((el) => el.name));
        return;
      }
      default: {
        const temp = data?.filter((el) => el.id !== e.id);
        setData(temp);
        temp && setNamesFromCSV(temp.map((el) => el.name));
        return;
      }
    }
  };

  const handleChangeColor = (e: string, t: Table) => {
    let tempData = data?.slice();
    let key = 0;
    if (tempData) key = tempData?.findIndex((a) => a.id === t.id);
    if (key !== -1 && tempData) tempData[key].bgColor = e;
    tempData && setData(tempData);
  };
  const [muted, setMuted] = useState(false);
  const handleSpeakerChange = () => {
    setMuted(!muted);
  };

  const handleClickExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // console.log(winnerList);
    const winnerCSV =
      props.type === 'spin-the-wheel'
        ? winnerList.map((el, i) => ({
            ROUND: i + 1,
            NAME: el.name,
            DATETIME: el.dateTime,
          }))
        : winnerList.map((el, i) => ({
            ROUND: i + 1,
            NAME: el.name,
            EMAIL: el.email,
            DATETIME: el.dateTime,
          }));

    const csv = Papa.unparse(winnerCSV);

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let csvURL = null;
    if (navigator.msSaveBlob) {
      csvURL = navigator.msSaveBlob(csvData, 'winners.csv');
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }

    const tempLink = document.createElement('a');
    tempLink.href = csvURL as string;
    tempLink.setAttribute('download', 'winners.csv');
    tempLink.click();
    tempLink.remove();
  };

  const [screenHeight, setScreenHeight] = useState<number>();
  const [screenWidth, setScreenWidth] = useState<number>();
  useEffect(() => {
    setScreenHeight(document.body.clientHeight);
    setScreenWidth(document.body.clientWidth);
  }, []);

  return (
    <div style={{ minWidth: '300px' }}>
      <Header
        muted={muted}
        onSpeakerChange={() => handleSpeakerChange()}
        isRotating={isRotating}
      />
      <audio
        id="rolling-audio"
        src={rollingEffect}
        style={{ display: 'none', width: '0px', height: '0px' }}
        muted={muted}
      ></audio>
      <audio
        id="winning-audio"
        src={winningEffect}
        style={{ display: 'none', width: '0px', height: '0px' }}
        muted={muted}
      ></audio>
      <canvas className="confetti" id="confetti-canvas"></canvas>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: screenHeight ? screenHeight - 60 : screenHeight + 'px',
          marginTop: '-50px',
          paddingTop:
            screenWidth && screenWidth > 700 && props.type === 'spin-the-wheel'
              ? '100px'
              : 0,
        }}
      >
        <div style={{ margin: '26px' }}>
          <h1
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: titleStyles.size,
              fontWeight: '800',
              lineHeight: '72px',
              margin: '0 0 24px',
              textAlign: 'center',
              color: titleStyles.color,
              textTransform: 'uppercase',
            }}
          >
            {namePicker.title}
          </h1>
        </div>
        {props.children &&
          React.cloneElement(props.children, {
            candidates: candidates,
            buttonStyles: buttonStyles,
            spin: () => spin(),
            rotate: () => rotate(),
            rotateEndDeg: rotateEndDeg,
            onRotateEnd: () => onRotateEnd(),
            isRotating: isRotating,
            winner: winner,
          })}
      </div>
      {/* <SettingsModal
        onClickSave={(e) => {
          handleClickSave(e);
        }}
        onTextAreaChange={(e, arr) => handleTextAreaChange(e, arr)}
        onTitleChange={(e) => handleTitleChange(e)}
        onFileChange={(e) => handleFileChange(e)}
        onPointChange={(e, el) => handlePointChange(e, el)}
        onRemoveWinnerSwitch={(e) => handleRemoveWinnerSwitch(e)}
        onClickRemove={(e, t) => handleClickRemove(e, t)}
        textAreaNames={textAreaNames}
        title={title}
        shouldRemoveWinner={shouldRemoveWinner}
        fileName={fileName ?? ''}
        data={data}
        type={props.type}
        handleChangeColor={(e, t) => handleChangeColor(e, t)}
      /> */}
      <SettingsOffcanva
        onClickSave={(e) => {
          handleClickSave(e);
        }}
        onTextAreaChange={(e, arr) => handleTextAreaChange(e, arr)}
        onTitleChange={(e) => handleTitleChange(e)}
        onFileChange={(e) => handleFileChange(e)}
        onPointChange={(e, el) => handlePointChange(e, el)}
        onRemoveWinnerSwitch={(e) => handleRemoveWinnerSwitch(e)}
        onClickRemove={(e, t) => handleClickRemove(e, t)}
        textAreaNames={textAreaNames}
        title={title}
        shouldRemoveWinner={shouldRemoveWinner}
        fileName={fileName ?? ''}
        data={data}
        type={props.type}
        handleChangeColor={(e, t) => handleChangeColor(e, t)}
      />
      {/* <StylesModal
        onClickSaveStyle={(e) => {
          handleClickSaveStyles(e);
        }}
        onColorChange={(e, t) => handleColorChange(e, t)}
        onSizeChange={(e, t) => handleSizeChange(e, t)}
        styles={styles}
      /> */}
      <StylesOffcanva
        onClickSaveStyle={(e) => {
          handleClickSaveStyles(e);
        }}
        onColorChange={(e, t) => handleColorChange(e, t)}
        onSizeChange={(e, t) => handleSizeChange(e, t)}
        styles={styles}
      />
      {/* <WinnersModal
        winners={winnerList}
        onClickRemove={(e, t) => handleClickRemove(e, t)}
      /> */}
      <WinnersOffcanva
        winners={winnerList}
        onClickRemove={(e, t) => handleClickRemove(e, t)}
        onClickExport={(e) => handleClickExport(e)}
        type={props.type}
      />
    </div>
  );
};
