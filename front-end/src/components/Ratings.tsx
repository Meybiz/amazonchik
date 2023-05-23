function Ratings (props: {
    ratings: number,
    numReview?: number,
    captions?: string,
    children?:React.ReactNode
}) {
  const { ratings, numReview, captions, } = props;
  return <div className="ratings">
    <span>
        <i className={
            ratings >= 1
            ? "fas fa-star"
            : ratings >= 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }/>
    </span>
    <span>
        <i className={
            ratings >= 2
            ? "fas fa-star"
            : ratings >= 1.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }/>
    </span>
    <span>
        <i className={
            ratings >= 3
            ? "fas fa-star"
            : ratings >= 2.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }/>
    </span>
    <span>
        <i className={
            ratings >= 4
            ? "fas fa-star"
            : ratings >= 3.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }/>
    </span>
    <span>
        <i className={
            ratings >= 5
            ? "fas fa-star"
            : ratings >= 4.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }/>
    </span>
    {
        captions ? (
            <span>{captions}</span>
        ) : numReview != 0 ? (
            <span>{' ' + numReview + ' отзывов'}</span>
        ) : (
            ''
        )
    }
  </div>
  
}

export default Ratings
