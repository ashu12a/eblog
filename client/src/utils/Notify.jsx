import { toast } from "react-toastify";
import wavFile from "../assets/notifysound.wav";

const audio = new Audio(wavFile);
export const NotifyWarning = (text) => {
  toast.warning(text);
  audio.play();
};
