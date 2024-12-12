/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";



export interface WEditorProps {
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
}

export interface Anchor {
  id: string,
  type: string,
  text: string
}


export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

