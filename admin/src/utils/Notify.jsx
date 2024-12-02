import { toast } from "react-toastify";
import wavFile from "../assets/notifysound.wav";

const audio = new Audio(wavFile);
export const NotifyWarning = (text) => {
  toast.warning(text);
  audio.play();
};

export const NotifyError = (text) => {
  toast.error(text);
  audio.play();
};

export const NotifySuccess = (text) => {
  toast.success(text);
  audio.play();
};
