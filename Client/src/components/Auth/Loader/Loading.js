import { Button } from "react-bootstrap";

const Loading = ({ isSending, loadingText, buttonText }) => {
  return (
    <div className="d-grid gap-2">
      {!isSending && (
        <Button variant="primary" type="submit" className="mt-3">
          {buttonText}
        </Button>
      )}
      {isSending && <p style={{ textAlign: "center" }}>{loadingText}</p>}
    </div>
  );
};

export default Loading;
