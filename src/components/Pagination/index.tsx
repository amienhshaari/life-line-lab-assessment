import Button from '../Button';
import './style.css';

type PaginationProps = {
  currentPage: string | number;
  onClickNext: any;
  onClickPrevious: any;
  goToValue: string;
  onChangeGoTo: any;
  onClickGo: any;
  loading: boolean;
};

const Pagination = ({
  currentPage,
  onClickNext,
  onClickPrevious,
  goToValue,
  onChangeGoTo,
  onClickGo,
  loading,
}: PaginationProps): JSX.Element => (
  <div className="pagination">
    <div className="header">
      <h2>{`page ${currentPage}.`}</h2>
    </div>
    <Button onClick={onClickNext} disabled={loading}>
      next page.
    </Button>
    <Button onClick={onClickPrevious} disabled={loading}>
      previous page.
    </Button>
    <div className="go-to">
      <label>
        go to page...
        <input
          type="number"
          value={goToValue}
          min={1}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            onChangeGoTo(ev.target.value);
          }}
        />
      </label>
      <Button onClick={onClickGo} disabled={loading}>
        go.
      </Button>
    </div>
  </div>
);

export default Pagination;
