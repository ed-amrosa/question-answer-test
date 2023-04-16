import agent from "../api/agent/agent";
import React, {useState} from "react";

const ShareModal = (contentUrl) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const handleShareSubmit = () => {
      setLoading(true);
      agent.Questions.share({content_url: contentUrl, destination_email: email}).then(res => {
        console.log(res); 
      setLoading(false);}).catch(error => alert("Failed to send email"));
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Share</h2>
          </div>
          <div className="modal-body">
            <label>Share with:</label>
            <input type="text" onChange={handleEmailChange}/>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={handleClose}>Cancel</button>
            <button className="submit-button" onClick={handleShareSubmit}>Share</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShareModal;

