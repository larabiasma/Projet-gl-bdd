import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'; // Font Awesome Star icons
const FeedBackCart = () => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <img src="" alt="" />
      <div className="nametemoin font-bold"></div>
      <div className="feedbackComment"></div>
      <div className="rate flex gap-2 items-center">
        <FaStar/>
        <FaStar/>
        <FaStar/>
        <FaStar/>
        <FaStar/>
      </div>
    </div>
  );
};

export default FeedBackCart;
