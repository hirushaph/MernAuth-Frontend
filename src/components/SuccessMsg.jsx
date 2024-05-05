import './SuccessMsg.css';
function SuccessMsg({ msg }) {
  return (
    <div className='success'>
      <p>{msg}</p>
    </div>
  );
}

export default SuccessMsg;
