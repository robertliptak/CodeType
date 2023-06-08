import "../styles/pageSpinner.scss";

const PageSpinner: React.FC = () => {
  return (
    <div className="spinner_background">
      <div className="spinner_container">
        <div className="spinner" />
      </div>
    </div>
  );
};

export default PageSpinner;
