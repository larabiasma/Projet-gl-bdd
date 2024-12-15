
const CartService = ({img,type ,rounded}) => {
  return (
    <div className="flex flex-col items-center hover:scale-90 transition-all w-52 h-52 gap-3">
        <img className={`w-full h-full ${rounded}`}  src={img} alt="" />
        <p className="font-bold text-lg font-bigLines">{type}</p>
      
    </div>
  )
}

export default CartService;
