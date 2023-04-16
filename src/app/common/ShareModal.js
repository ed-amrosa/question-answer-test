import agent from "../api/agent/agent";
import React, {useState, useContext} from "react";
import { ModalContext } from "../store/ModalStore";
import Loader from "../layout/Loader";

const ShareModal = (contentUrl) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(ModalContext);
    const [message, setMessage] = useState(null);
 
    const handleClose = () => {
      setState({isOpen: false});
    }

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const handleShareSubmit = () => {
      setLoading(true);
      agent.Questions.share({content_url: contentUrl, destination_email: email}).then(res => {
        setLoading(false);
        setMessage('Email sent successfully');
      })
      .catch(error => setMessage('Failed to share content'));
    }
  
    return (
      <>
        <div className="modal-overlay">
          <div className="modal">
            {loading ? <div className="loader-container-xs"><Loader/></div> :
              <>
                <div className="modal-header">
                  <h2>Share with:</h2>
                </div>
                <div className="modal-body">
                  <label>Email</label>
                  <input type="text" onChange={handleEmailChange}/>
                </div>
                {message ? <div>{message}</div> : null}
                <div className="modal-footer">
                  <button className="cancel-button" onClick={handleClose}>Cancel</button>
                  <button className="submit-button" onClick={handleShareSubmit}>Share</button>
                </div>
              </>
            }
          </div>
        </div>
      </>
    );
  };
  
  export default ShareModal;

