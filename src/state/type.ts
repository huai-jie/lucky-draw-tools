export interface Styles {
  titleColor: string,
  titleSize: number,
  buttonColor: string,
  backgroundColor: string,
}

export interface StyleEntriesProps {
  onSizeChange: (e: React.ChangeEvent<HTMLInputElement>,t: string) => void;
  onColorChange: (e: string, t: string) => void;
  styles: Styles;
}

export interface StylesModalProps extends StyleEntriesProps {
  onClickSaveStyle: (e: React.FormEvent<HTMLButtonElement>) => void;
}
export interface StylesOffcanvaProps extends StyleEntriesProps {
  onClickSaveStyle: (e: React.FormEvent<HTMLButtonElement>) => void;
}

