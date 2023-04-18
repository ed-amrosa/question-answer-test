import {createContext, useState } from "react";
import ShareModal from "../../app/common/ShareModal";

//used context to control ModalStore 
const ModalContext = createContext([{}, () => {}]);

const ModalProvider = (props) => {
  const [state, setState] = useState({ isOpen: false, contentUrl: null });

  return (
    <ModalContext.Provider value={[state, setState]}>
        {state.isOpen ? <ShareModal contentUrl={state.contentUrl}></ShareModal> : null}
        {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };